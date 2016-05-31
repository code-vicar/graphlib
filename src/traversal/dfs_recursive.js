import StateBag from './statebag'

export default function DFS_recursive(graph, startId) {
    let dfs = DFS_recursive_generator(graph, startId)
    return dfs.next().value
}

export function* DFS_recursive_generator(graph, startId, opts) {
    if (!graph.hasVertex(startId)) {
        throw new Error(`Vertex ${startId} is not in the graph`)
    }

    let stateBag = new StateBag(['Status', 'Parent', 'EntryTime', 'ExitTime'])
    let clock = 0

    // set initial state of all vertices
    for (let vertex of graph.getVertices()) {
        stateBag.setStatus(vertex, STATUS.undiscovered)
    }

    yield* _dfs(graph.getVertex(startId))

    function* _dfs(vertex) {
        clock++
        stateBag.setEntryTime(vertex, clock)

        if (opts && opts.yieldVertexEarly === true) {
            if ((yield { opt: 'yieldVertexEarly', vertex }) === true) {
                return true
            }
        }

        stateBag.setStatus(vertex, STATUS.discovered)

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            if (opts && opts.yieldEdge === true) {
                if ((stateBag.getParent(vertex) !== neighbor) || graph.directed === true) {
                    if ((yield { opt: 'yieldEdge', vertex, edge, neighbor }) === true) {
                        return true
                    }
                }
            }

            let neighborStatus = stateBag.getStatus(neighbor)

            if (neighborStatus === STATUS.undiscovered) {
                stateBag.setParent(neighbor, vertex)
                if ((yield* _dfs(neighbor)) === true) {
                    return true
                }
            }
        }

        if (opts && opts.yieldVertexLate === true) {
            if ((yield { opt: 'yieldVertexLate', vertex }) === true) {
                return true
            }
        }

        stateBag.setStatus(vertex, STATUS.processed)
        stateBag.setExitTime(vertex, clock)
        clock++

    }

    return stateBag
}

const STATUS = {
    discovered: 'discovered',
    undiscovered: 'undiscovered',
    processed: 'processed'
}
