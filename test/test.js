(function () {
    'use strict';
    var util = require('util');
    var lib = require('../');
    var VertexFactory = lib.VertexFactory;
    var EdgeFactory = lib.EdgeFactory;
    var Graph = lib.Graph;
    var BFS = lib.BFS;

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

    // console.log(util.inspect(directed, {
    //     depth: 4
    // }));

    // var bfs = new BFS(directed, 2, {
    //     processEdge: function (v, edge) {
    //         console.log(v, util.inspect(edge, {
    //             depth: 4
    //         }));
    //     }
    // });

    // console.log(util.inspect(bfs, {
    //     depth: 4
    // }));

    // unweighted undirected graph
    var undirected = new Graph(vertices);

    undirected.insertEdge(vertices[0], vertices[1]);
    undirected.insertEdge(vertices[0], vertices[2]);
    undirected.insertEdge(vertices[2], vertices[3]);
    undirected.insertEdge(vertices[0], vertices[3]);
    undirected.insertEdge(vertices[3], vertices[4]);
    undirected.insertEdge(vertices[2], vertices[5]);
    undirected.insertEdge(vertices[7], vertices[8]);

    console.log(util.inspect(undirected, {
        depth: 4
    }));

    var bfs = new BFS(undirected, 4, {
        processEdge: function (v, edge) {
            console.log(v, util.inspect(edge, {
                depth: 4
            }));
        }
    });

    console.log(util.inspect(bfs, {
        depth: 4
    }));

    console.log(bfs.findPathTo(2));

})();
