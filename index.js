(function () {
    'use strict';

    var EdgeFactory = require('./lib/edge');
    var VertexFactory = require('./lib/vertex');
    var Graph = require('./lib/graph');
    var BFS = require('./lib/bfs/bfs');

    module.exports = {
        EdgeFactory: EdgeFactory,
        VertexFactory: VertexFactory,
        Graph: Graph,
        BFS: BFS
    };

}());
