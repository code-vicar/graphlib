(function () {
    'use strict';
    var util = require('util');
    var lib = require('../');
    var findPath = lib.findPath;
    var VertexFactory = lib.VertexFactory;
    var EdgeFactory = lib.EdgeFactory;
    var Graph = lib.Graph;
    var BFS = lib.BFS;
    var DFS = lib.DFS;

    var Vertex = VertexFactory.defineVertex();
    var WeightedEdge = EdgeFactory.defineEdge([{
        name: 'weight',
        config: {
            enumerable: true,
            value: 0,
            writable: true
        }
    }]);

    var vertices = [];
    var i = 0,
        len = 10;
    for (i = 0; i < len; i++) {
        vertices.push(new Vertex(i));
    }

    var directed = function () {
        // weighted directed graph
        var directed = new Graph(vertices, {
            EdgeClass: WeightedEdge,
            directed: true
        });

        directed.insertEdge(vertices[0], vertices[1], {
            weight: 10
        });
        directed.insertEdge(vertices[0], vertices[2], {
            weight: 2
        });
        directed.insertEdge(vertices[2], vertices[3]);
        directed.insertEdge(vertices[0], vertices[3]);
        directed.insertEdge(vertices[3], vertices[4]);
        directed.insertEdge(vertices[2], vertices[5]);
        directed.insertEdge(vertices[5], vertices[2]);

        return directed;
    };

    var undirected1 = function () {
        // unweighted undirected graph
        var undirected = new Graph(vertices);

        undirected.insertEdge(vertices[0], vertices[1]);
        undirected.insertEdge(vertices[0], vertices[2]);
        undirected.insertEdge(vertices[2], vertices[3]);
        undirected.insertEdge(vertices[0], vertices[3]);
        undirected.insertEdge(vertices[3], vertices[4]);
        undirected.insertEdge(vertices[2], vertices[5]);
        undirected.insertEdge(vertices[7], vertices[8]);

        return undirected;
    };

    var undirected2 = function () {
        var subset = vertices.filter(function (vertex) {
            if (vertex.id !== 0 && vertex.id !== 1 && vertex.id !== 4) {
                return vertex;
            }
        });
        var undirected = new Graph(subset);

        undirected.insertEdge(vertices[5], vertices[9]);
        undirected.insertEdge(vertices[5], vertices[6]);
        undirected.insertEdge(vertices[5], vertices[2]);
        undirected.insertEdge(vertices[6], vertices[3]);
        undirected.insertEdge(vertices[3], vertices[8]);
        undirected.insertEdge(vertices[3], vertices[2]);
        undirected.insertEdge(vertices[2], vertices[7]);
        undirected.insertEdge(vertices[9], vertices[7]);

        return undirected;
    };

    var g, bfs, dfs, which = 3;
    switch (which) {
        case 0:
            g = directed();
            console.log(util.inspect(g, {
                depth: 4
            }));

            bfs = new BFS(g, 2, {
                processEdge: function (v, edge) {
                    console.log(v, util.inspect(edge, {
                        depth: 4
                    }));
                }
            });

            console.log(util.inspect(bfs, {
                depth: 4
            }));
            break;
        case 1:
            g = undirected1();

            console.log(util.inspect(g, {
                depth: 4
            }));

            bfs = new BFS(g, 8, {
                processEdge: function (v, edge) {
                    console.log(v, util.inspect(edge, {
                        depth: 4
                    }));
                }
            });

            console.log(util.inspect(bfs, {
                depth: 4
            }));

            console.log(findPath(8, 7, bfs.parent));

            break;
        case 2:
            g = undirected2();

            console.log(util.inspect(g, {
                depth: 4
            }));

            bfs = new BFS(g, 9, {
                processEdge: function (v, edge) {
                    console.log(v, util.inspect(edge, {
                        depth: 4
                    }));
                }
            });

            console.log(util.inspect(bfs, {
                depth: 4
            }));

            console.log(findPath(9, 3, bfs.parent));
            break;
        case 3:
            g = undirected1();

            console.log(util.inspect(g, {
                depth: 4
            }));

            dfs = new DFS(g, 0, {
                processEdge: function (v, edge) {
                    console.log(v, util.inspect(edge, {
                        depth: 4
                    }));
                }
            });

            console.log(util.inspect(dfs, {
                depth: 4
            }));

            console.log(findPath(0, 5, dfs.parent));

            break;
    }

})();
