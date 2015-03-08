(function () {
    'use strict';

    var isNullOrUndefined = require('isNullOrUndefined');
    var Graph = require('../graph');

    var BFS = function BFS(graph) {
        if (isNullOrUndefined(graph)) {
            throw new TypeError('Missing argument "graph"');
        }

        if (!(graph instanceof Graph)) {
            throw new TypeError('BFS argument must be an instance of Graph');
        }
    };

    module.exports = BFS;
})();
