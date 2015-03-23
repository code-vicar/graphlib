/* jshint loopfunc:true */
(function () {
    'use strict';

    var Graph = require('../graph');
    var Queue = require('svutils/queue');

    var BFS = function BFS(graph, startId) {
        if (!(graph instanceof Graph)) {
            throw new TypeError('first argument must be an instance of Graph');
        }

        var state = {};
        var parent = {};

        var vertexIds = graph.vertexIds();
        vertexIds.forEach(function (vertexId) {
            state[vertexId] = 'undiscovered';
            parent[vertexId] = -1;
        });

        state[startId] = 'discovered';

        var queue = new Queue();
        queue.enqueue(startId);

        var next;
        while ((next = queue.dequeue()) !== null) {
            // process next
            if (graph.adjacencies[next]) {
                graph.adjacencies[next].forEach(function (edge) {
                    if (state[edge.v] === 'undiscovered') {
                        state[edge.v] = 'discovered';
                        parent[edge.v] = next;
                        queue.enqueue(edge.v);
                    }
                });
            }

            state[next] = 'process';
        }

        return {
            state: state,
            parent: parent
        };
    };

    module.exports = BFS;
}());
