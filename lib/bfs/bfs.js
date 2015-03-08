(function () {
    'use strict';

    var Graph = require('../graph');

    var VertexBase = require('../vertex').VertexBase;

    var BFS = function BFS(graph, start) {
        if (!(graph instanceof Graph)) {
            throw new TypeError('first argument must be an instance of Graph');
        }

        if (!(start instanceof VertexBase)) {
            throw new TypeError('second argument must be an instance of Vertex');
        }

    };

    module.exports = BFS;
})();
