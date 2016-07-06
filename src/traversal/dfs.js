import StateBag from './statebag'
import Graph from '../graph'

export default function DFS(graph, startId) {
    let dfs = DFS_generator(graph, startId)
    return dfs.next().value
}

export function* DFS_generator(graph, start, opts) {
    if (Graph.isVertex(start) && !graph.hasVertex(start)) {
        throw new Error('Source vertex is not in the graph')
    }

    if (!Graph.isVertex(start)) {
        start = graph.getVertex(start)
        if (!start) {
            throw new Error('Source vertex is not in the graph')
        }
    }

    let stateBag = new StateBag(['Status', 'Parent', 'EntryTime', 'ExitTime'])
    let clock = 0

    // set initial state of all vertices
    for (let vertex of graph.getVertices()) {
        stateBag.setStatus(vertex, STATUS.undiscovered)
    }

    yield* _dfs(start)

    function* _dfs(vertex) {
        clock++
        stateBag.setEntryTime(vertex, clock)

        stateBag.setStatus(vertex, STATUS.discovered)

        if (opts && opts.yieldVertexEarly === true) {
            if ((yield { opt: 'yieldVertexEarly', vertex, state: stateBag }) === true) {
                return true
            }
        }

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            let neighborStatus = stateBag.getStatus(neighbor)

            // update search stage before yielding the edge
            let mustGoDeeper = false
            if (neighborStatus === STATUS.undiscovered) {
                stateBag.setParent(neighbor, vertex)
                mustGoDeeper = true
            }

            if (opts && opts.yieldEdge === true) {
                if ((neighborStatus !== STATUS.processed && stateBag.getParent(vertex) !== neighbor) || graph.directed === true) {
                    if ((yield { opt: 'yieldEdge', vertex, edge, neighbor, state: stateBag }) === true) {
                        return true
                    }
                }
            }

            // if the neighbor was discovered by this edge then start processing the neighbor
            if (mustGoDeeper) {
                if ((yield* _dfs(neighbor)) === true) {
                    return true
                }
            }
        }

        stateBag.setStatus(vertex, STATUS.processed)
        stateBag.setExitTime(vertex, clock)
        clock++

        if (opts && opts.yieldVertexLate === true) {
            if ((yield { opt: 'yieldVertexLate', vertex, state: stateBag }) === true) {
                return true
            }
        }
    }

    return stateBag
}

const STATUS = {
    discovered: 'discovered',
    undiscovered: 'undiscovered',
    processed: 'processed'
}
