import StateBag from './statebag'

export default function BFS(graph, startId) {
    let bfs = BFS_generator(graph, startId)
    return bfs.next().value
}

export function *BFS_generator(graph, startId, opts) {
    let stateBag = new StateBag(['Status', 'Parent'])

    // set initial state of all vertices
    for (let vertex of graph.getVertices()) {
        stateBag.setStatus(vertex, STATUS.undiscovered)
    }

    // set starting node state to discovered
    let start = graph.getVertex(startId)
    stateBag.setStatus(start, STATUS.discovered)

    // push starting node into queue
    var queue = [start]

    do {
        let vertex = queue.shift()
        if (opts && opts.yieldVertexEarly === true) {
            if ((yield { opt: 'yieldVertexEarly', vertex }) === true) {
                return stateBag
            }
        }

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            let status = stateBag.getStatus(neighbor)

            if (status !== STATUS.processed || graph.directed === true) {
                if (opts && opts.yieldEdge === true) {
                    if ((yield { opt: 'yieldEdge', vertex, edge, neighbor }) === true) {
                        return stateBag
                    }
                }
            }

            if (status === STATUS.undiscovered) {
                stateBag.setStatus(neighbor, STATUS.discovered)
                stateBag.setParent(neighbor, vertex)
                queue.push(neighbor)
            }
        }

        if (opts && opts.yieldVertexLate === true) {
            if ((yield { opt: 'yieldVertexLate', vertex }) === true) {
                return stateBag
            }
        }

        stateBag.setStatus(vertex, STATUS.processed)
    }
    while (queue.length > 0)

    return stateBag
}

const STATUS = {
    discovered: 'discovered',
    undiscovered: 'undiscovered',
    processed: 'processed'
}
