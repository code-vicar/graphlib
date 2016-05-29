import StateBag from './statebag'

export default function DFS(graph, startId, cbs) {
    let stateBag = new StateBag(['Status', 'Parent', 'EntryTime', 'ExitTime'])
    let clock = 0

    // set initial state of all vertices
    for (let vertex of graph.getVertices()) {
        stateBag.setStatus(vertex, STATUS.undiscovered)
    }

    let start = graph.getVertex(startId)

    let _dfs = function _dfs(graph, vertex, cbs) {
        clock++
        stateBag.setEntryTime(vertex, clock)
        stateBag.setStatus(vertex, STATUS.discovered)

        if (cbs && typeof cbs.processVertexEarly === 'function') {
            if (cbs.processVertexEarly(vertex) === false) {
                return
            }
        }

        for (let edge of graph.getEdges(vertex) || []) {
            let neighbor = graph.getVertex(edge.vertexId)

            let neighborStatus = stateBag.getStatus(neighbor)

            if ((neighborStatus !== STATUS.processed && stateBag.getParent(vertex) !== neighbor) || graph.directed === true) {
                if (cbs && typeof cbs.processEdge === 'function') {
                    if (cbs.processEdge(vertex, edge) === false) {
                        return
                    }
                }
            }

            if (neighborStatus === STATUS.undiscovered) {
                stateBag.setStatus(neighbor, STATUS.discovered)
                stateBag.setParent(neighbor, vertex)
                _dfs(graph, neighbor, cbs)
            }
        }

        if (cbs && typeof cbs.processVertexLate === 'function') {
            if (cbs.processVertexLate(vertex) === false) {
                return
            }
        }

        clock++
        stateBag.setExitTime(vertex, clock)
        stateBag.setStatus(vertex, STATUS.processed)
    }

    _dfs(graph, start, cbs)

    return stateBag
}

const STATUS = {
    discovered: 'discovered',
    undiscovered: 'undiscovered',
    processed: 'processed'
}
