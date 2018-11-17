import { describe, it } from 'mocha'
import { expect } from 'chai'

import Graph from '../src/graph'

describe('graph', function () {
    describe('constructor', function () {
        it('should not throw with valid arguments', function () {
            expect(() => {
                let g = new Graph()
            }, 'no arguments').to.not.throw(Error)

            expect(() => {
                let g = new Graph([])
            }, 'empty vertices').to.not.throw(Error)

            expect(() => {
                let g = new Graph([], true)
            }, 'empty vertices and directed flag true').to.not.throw(Error)

            expect(() => {
                let g = new Graph([{
                    '@@vertexId': 1
                }], true)
            }, 'valid vertex and directed flag true').to.not.throw(Error)

            expect(() => {
                let g = new Graph([], false)
            }, 'valid vertex and directed flag false').to.not.throw(Error)

            expect(() => {
                let g = new Graph([{
                    '@@vertexId': 100
                }], false)
            }, 'valid vertex and directed flag false').to.not.throw(Error)

            expect(() => {
                let g = new Graph([
                    {
                        '@@vertexId': 100,
                    },
                    {
                        '@@vertexId': -1,
                    },
                    {
                        '@@vertexId': NaN,
                    },
                    {
                        '@@vertexId': null,
                    },
                    {
                        '@@vertexId': {},
                    }
                ], false)
            }, 'valid vertex various id types').to.not.throw(Error)
        })

        it('should throw on invalid arguments', function () {
            expect(() => {
                let g = new Graph(null)
            }, 'vertices not iterable 1').to.throw(Error)

            expect(() => {
                let g = new Graph({})
            }, 'vertices not iterable 2').to.throw(Error)

            expect(() => {
                let g = new Graph([
                    false
                ])
            }, 'vertices with invalid vertex 1').to.throw(Error, /Cannot insert vertex/)

            expect(() => {
                let g = new Graph([
                    {
                        id: 12
                    }
                ])
            }, 'vertices with invalid vertex 2').to.throw(Error, /Cannot insert vertex/)
        })

        it('should throw error on duplicate vertex', function () {
            expect(() => {
                let g = new Graph([
                    {
                        '@@vertexId': 0
                    },
                    {
                        '@@vertexId': 1
                    },
                    {
                        '@@vertexId': 0
                    }
                ])
            }, 'case 1').to.throw(Error, /^Vertex .* already exists/)

            expect(() => {
                let g = new Graph([
                    {
                        '@@vertexId': 0
                    },
                    {
                        '@@vertexId': NaN
                    },
                    {
                        '@@vertexId': NaN
                    },
                    {
                        '@@vertexId': 2
                    }
                ])
            }, 'case 2').to.throw(Error, /^Vertex .* already exists/)
        })
    })

    describe('vertex count', function () {
        it('should count the number of vertices', function () {
            let g = new Graph([
                {
                    '@@vertexId': 1
                }, {
                    '@@vertexId': 2
                }, {
                    '@@vertexId': 3
                }, {
                    '@@vertexId': 4
                }
            ])

            expect(g.getVertexCount()).to.equal(4)

            g.addVertex({
                '@@vertexId': 5
            })

            expect(g.getVertexCount()).to.equal(5)
        })
    })

    describe('add vertex', function() {
        it('should throw error when given a duplicate', function() {
            let g = new Graph()

            expect(() => {
                g.addVertex({
                    '@@vertexId': 1
                })
            }).to.not.throw(Error)

            expect(() => {
                g.addVertex({
                    '@@vertexId': 1
                })
            }).to.throw(/^Vertex \(1\) already exists/)
        })
    })

    describe('has vertex', function() {
        it('should find vertex given an id', function() {
            let v = {
                '@@vertexId': 1
            }
            let g = new Graph([v])

            expect(g.hasVertex(), 'no id').to.equal(false)
            expect(g.hasVertex(null), 'invalid id').to.equal(false)
            expect(g.hasVertex(0), 'wrong id').to.equal(false)
            expect(g.hasVertex(1), 'correct id').to.equal(true)
        })
    })
})
