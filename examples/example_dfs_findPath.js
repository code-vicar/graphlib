const Graph = require('../lib/Graph').default
const { default: findPath, SEARCH_TYPE } = require('../lib/findPath')

const findPathDFS = (...args) => findPath(...args, SEARCH_TYPE.DFS)

let vertices = []
for (let i = 0; i < 10; i++) {
    vertices.push({ '@@vertexId': i })
}

var directedGraph = new Graph(vertices, true)
directedGraph.connect(0, 1)
directedGraph.connect(0, 2)
directedGraph.connect(2, 3)
directedGraph.connect(0, 3)
directedGraph.connect(3, 4)
directedGraph.connect(2, 5)
directedGraph.connect(5, 2)

console.log('*** DFS find path ***')

console.log('*** directed ***')
try {
    console.log(`*** 0 to 5 ***`)
    console.log(findPathDFS(directedGraph, 0, 5))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** 3 to 5 ***`)
    console.log(findPathDFS(directedGraph, 3, 5))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** 2 to 4 ***`)
    console.log(findPathDFS(directedGraph, 2, 4))
} catch (e) {
    console.log(e)
}

var undirectedGraph = new Graph(vertices)
undirectedGraph.connect(0, 1)
undirectedGraph.connect(0, 2)
undirectedGraph.connect(2, 3)
undirectedGraph.connect(0, 3)
undirectedGraph.connect(3, 4)
undirectedGraph.connect(2, 5)
undirectedGraph.connect(7, 8)

console.log('*** undirected ***')
try {
    console.log(`*** 0 to 5 ***`)
    console.log(findPathDFS(undirectedGraph, 0, 5))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** 3 to 5 ***`)
    console.log(findPathDFS(undirectedGraph, 3, 5))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** 4 to 0 ***`)
    console.log(findPathDFS(undirectedGraph, 4, 0))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** 0 to 0 ***`)
    console.log(findPathDFS(undirectedGraph, 0, 0))
} catch (e) {
    console.log(e)
}

try {
    console.log(`*** -1 to 100 ***`)
    console.log(findPathDFS(undirectedGraph, -1, 100))
} catch (e) {
    console.log(e)
}
