import _ from 'lodash'

export default class Graph {
    constructor(vertices = [], directed = false) {
        this.directed = directed

        this.degrees = new Map()
        this.degreesOut = new Map()
        this.degreesIn = new Map()

        this.edgeCount = 0
        this.adjacencies = new Map()

        this.vertices = new Map()
        for (let vertex of vertices) {
            this.addVertex(vertex)
            this.degrees.set(unwrapId(vertex), 0)
        }
    }

    getVertexCount() {
        return this.vertices.size
    }

    getVertex(id) {
        return this.vertices.get(id)
    }

    getVertexIds() {
        return this.vertices.keys()
    }

    getVertices() {
        return this.vertices.values()
    }

    hasVertex(v) {
        return this.vertices.has(unwrapId(v))
    }

    getEdges(v) {
        return this.adjacencies.get(unwrapId(v))
    }

    getEdgesBetween(fromVertex, toVertex) {
        if (!this.hasVertex(fromVertex) || !this.hasVertex(toVertex)) {
            return []
        }

        let toVertexId = unwrapId(toVertex)

        let edges = this.getEdges(fromVertex) || []
        return _.filter(edges, (edge) => {
            return edge.vertexId === toVertexId
        })
    }

    hasEdge(fromVertex, toVertex) {
        let edges = this.getEdgesBetween(fromVertex, toVertex)
        return (edges.length > 0)
    }

    addVertex(v) {
        if (this.hasVertex(v)) {
            throw new Error(`Vertex (${unwrapId(v)}) already exists, vertex ids must be unique`)
        }

        if (!isVertex(v)) {
            throw new Error(`Cannot insert vertex ${v}, is not a valid vertex`)
        }

        this.vertices.set(unwrapId(v), v)
        return this
    }

    /*
        x: vertex
        y: vertex
        data: optional data to associate with new edges
    */
    insertConnect(x, y, data) {
        for (let vertex of [x, y]) {
            if (!this.hasVertex(vertex)) {
                this.addVertex(vertex)
            }
        }
        this.connect(x, y, data)
    }

    /*
        x: vertexId
        y: vertexId
        data: optional data to associate with new edges
    */
    connect(x, y, data) {
        let xId = unwrapId(x)
        let yId = unwrapId(y)
        for (let vertexId of [xId, yId]) {
            if (!this.hasVertex(vertexId)) {
                throw new Error(`Cannot find vertex with id ${vertexId}`)
            }
        }

        // track degrees
        this._addEdgeDegree(xId, 'total')
        this._addEdgeDegree(xId, 'out')
        this._addEdgeDegree(yId, 'total')
        this._addEdgeDegree(yId, 'in')

        this._edge(xId, yId, data) // add y to x's adjacency list

        // if this is an undirected graph then make a reciprocal edge from yId to xId
        if (!this.directed) {
            this._addEdgeDegree(xId, 'in')
            this._addEdgeDegree(yId, 'out')
            this._edge(yId, xId, data) // add x to y's adjacency list
        }

        this.edgeCount++
    }

    _edge(xId, yId, data) {
        // fetch the adjacency list
        var listX = this.adjacencies.get(xId) || []

        // create the edge and add it to the list
        listX.push({ id: this.edgeCount, vertexId: yId, ext: data })

        this.adjacencies.set(xId, listX)
    }

    _addEdgeDegree(vertexId, direction) {
        let map = new Map()
        switch (direction) {
            case 'total': {
                map = this['degrees']
                break;
            }
            case 'out': {
                map = this['degreesOut']
                break;
            }
            case 'in': {
                map = this['degreesIn']
                break;
            }
        }

        let vertexDegrees = map.get(vertexId) || 0
        vertexDegrees++
        map.set(vertexId, vertexDegrees)
    }
}

function isVertex(vertex) {
    return vertex && Object.prototype.hasOwnProperty.call(vertex, '@@vertexId')
}

function unwrapId(vertex) {
    if (isVertex(vertex)) {
        return vertex['@@vertexId']
    }
    return vertex
}
