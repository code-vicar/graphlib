import { DFS_recursive_generator } from '../src/traversal/dfs_recursive'

export default function findPathDFS(graph, startId, endId) {
    if (!graph.hasVertex(startId) || !graph.hasVertex(endId)) {
        throw new Error('startId and endId must be contained in the graph')
    }

    if (startId === endId) {
        return [graph.getVertex(startId)]
    }

    let dfs = DFS_recursive_generator(graph, startId, {
        yieldEdge: true
    })

    let found
    let step
    let opt
    do {
        opt = (step && step.value) ? step.value : null
        found = opt && opt.edge && opt.edge.vertexId === endId
        step = dfs.next(found)
    } while (!step.done)

    if (!found) {
        throw new Error('These nodes cannot be connected')
    }

    // backtrack from the end node following parents
    let path = [opt.neighbor]
    let dfs_state = step.value

    let p = opt.vertex
    while (p['@@vertexId'] !== startId) {
        path.unshift(p)

        p = dfs_state.getParent(p)
    }
    path.unshift(p)

    return path
}