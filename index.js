(function () {
    'use strict';

    var EdgeFactory = require('./lib/edge');
    var VertexFactory = require('./lib/vertex');
    var Graph = require('./lib/graph');
    var findPath = require('./lib/findPath');
    var BFS = require('./lib/bfs/bfs');
    var DFS = require('./lib/dfs/dfs');

    module.exports = {
        EdgeFactory: EdgeFactory,
        VertexFactory: VertexFactory,
        Graph: Graph,
        findPath: findPath,
        BFS: BFS,
        DFS: DFS
    };

}());
