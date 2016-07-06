import * as search_generators from './traversal'

export const SEARCH_TYPE = {
    BFS: 'BFS',
    DFS: 'DFS'
}

export default function findPath(graph, startId, endId, type = SEARCH_TYPE.BFS) {
    if (!graph.hasVertex(startId) || !graph.hasVertex(endId)) {
        throw new Error('startId and endId must be contained in the graph')
    }

    if (startId === endId) {
        return [graph.getVertex(startId)]
    }

    let search = resolveSearchType(type)

    let iter = search(graph, startId, {
        yieldEdge: true
    })

    let found
    let step
    let opt
    do {
        opt = (step && step.value) ? step.value : null
        found = opt && opt.edge && opt.edge.vertexId === endId
        step = iter.next(found)
    } while (!step.done)

    if (!found) {
        throw new Error('These nodes cannot be connected')
    }

    // backtrack from the end node following parents
    let path = [opt.neighbor]
    let search_state = step.value

    let p = opt.vertex
    while (p['@@vertexId'] !== startId) {
        path.unshift(p)

        p = search_state.getParent(p)
    }
    path.unshift(p)

    return path
}

function resolveSearchType(type) {
    return search_generators[`${type}_generator`]
}
