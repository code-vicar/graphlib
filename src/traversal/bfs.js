import StateBag from './statebag'
import Graph from '../graph'

export default function BFS(graph, startId) {
    let bfs = BFS_generator(graph, startId)
    return bfs.next().value
}

export function* BFS_generator(graph, start, opts) {
    let stateBag = new StateBag(['Status', 'Parent'])

    // set initial state of all vertices
    for (let vertex of graph.getVertices()) {
        stateBag.setStatus(vertex, STATUS.undiscovered)
    }

    // set starting node state to discovered
    if (Graph.isVertex(start) && !graph.hasVertex(start)) {
        throw new Error('Source vertex is not in the graph')
    }
    if (!Graph.isVertex(start)) {
        start = graph.getVertex(start)
        if (!start) {
            throw new Error('Source vertex is not in the graph')
        }
    }

    stateBag.setStatus(start, STATUS.discovered)

    // push starting node into queue
    var queue = [start]

    do {
        let vertex = queue.shift()
        if (opts && opts.yieldVertexEarly === true) {
            if ((yield { opt: 'yieldVertexEarly', vertex, state: stateBag }) === true) {
                return stateBag
            }
        }

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            let neighborStatus = stateBag.getStatus(neighbor)

            if (neighborStatus === STATUS.undiscovered) {
                stateBag.setStatus(neighbor, STATUS.discovered)
                stateBag.setParent(neighbor, vertex)
                queue.push(neighbor)
            }

            if (neighborStatus !== STATUS.processed || graph.directed === true) {
                if (opts && opts.yieldEdge === true) {
                    if ((yield { opt: 'yieldEdge', vertex, edge, neighbor, state: stateBag }) === true) {
                        return stateBag
                    }
                }
            }
        }

        stateBag.setStatus(vertex, STATUS.processed)

        if (opts && opts.yieldVertexLate === true) {
            if ((yield { opt: 'yieldVertexLate', vertex, state: stateBag }) === true) {
                return stateBag
            }
        }
    }
    while (queue.length > 0)

    return stateBag
}

const STATUS = {
    discovered: 'discovered',
    undiscovered: 'undiscovered',
    processed: 'processed'
}
