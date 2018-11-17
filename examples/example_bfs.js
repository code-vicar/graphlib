const Graph = require('../lib/Graph').default
const { BFS_generator } = require('../lib/traversal/bfs')

let vertices = []
for (let i = 0; i < 10; i++) {
    vertices.push({ '@@vertexId': i })
}

// weighted directed graph
function directed() {
    var g = new Graph(vertices, true)
    g.connect(0, 1, {
        weight: 10
    })
    g.connect(0, 2, {
        weight: 2
    })
    g.connect(2, 3)
    g.connect(0, 3)
    g.connect(3, 4)
    g.connect(2, 5)
    g.connect(5, 2)
    return g
}

// unweighted undirected graph
function undirected1() {
    var g = new Graph(vertices)

    g.connect(0, 1)
    g.connect(0, 2)
    g.connect(2, 3)
    g.connect(0, 3)
    g.connect(3, 4)
    g.connect(2, 5)
    g.connect(7, 8)

    return g
}

function undirected2() {
    let subset = vertices.filter(function (vertex) {
        if (vertex['@@vertexId'] !== 0 && vertex['@@vertexId'] !== 1 && vertex['@@vertexId'] !== 4) {
            return vertex
        }
    })

    var g = new Graph(subset)

    g.connect(5, 9)
    g.connect(5, 6)
    g.connect(5, 2)
    g.connect(6, 3)
    g.connect(3, 8)
    g.connect(3, 2)
    g.connect(2, 7)
    g.connect(9, 7)

    return g
}

let traversals = [
    {
        title: 'Directed', start: 0, g: directed()
    }, {
        title: 'Undirected', start: 0, g: undirected1()
    }, {
        title: 'Undirected2', start: 2, g: undirected2()
    }
]

for (let t of traversals) {
    console.log(`*** RUNNING BFS ON ${t.title} ***`)

    let bfs = BFS_generator(t.g, t.start, {
        yieldVertexEarly: true,
        yieldEdge: true,
        yieldVertexLate: true
    })

    let step
    do {
        step = bfs.next()

        if (!step.done) {
            let data = {opt: step.value.opt, vertex: step.value.vertex}
            if (step.value.opt === 'yieldEdge') {
                delete data.vertex
                data.neighbor = step.value.neighbor
            }
            console.log(data)
        }
    }
    while (step && !step.done)

    console.log('*** DONE ***')
}
