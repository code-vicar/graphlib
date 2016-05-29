import StateBag from './statebag'

export default function BFS(graph, startId, cbs) {
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
        if (cbs && typeof cbs.processVertexEarly === 'function') {
            cbs.processVertexEarly(vertex)
        }

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            let status = stateBag.getStatus(neighbor)

            if (status !== STATUS.processed || graph.directed === true) {
                if (cbs && typeof cbs.processEdge === 'function') {
                    cbs.processEdge(vertex, edge)
                }
            }

            if (status === STATUS.undiscovered) {
                stateBag.setStatus(neighbor, STATUS.discovered)
                stateBag.setParent(neighbor, vertex)
                queue.push(neighbor)
            }
        }

        if (cbs && typeof cbs.processVertexLate === 'function') {
            cbs.processVertexLate(vertex)
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
