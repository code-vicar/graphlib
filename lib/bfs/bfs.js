/* jshint loopfunc:true */
(function () {
    'use strict';

    var Graph = require('../graph');
    var Queue = require('svutils/queue');

    var BFS = function BFS(graph, startId, cbs) {
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

        var cycles = 0;

        var next;
        while ((next = queue.dequeue()) !== null) {
            if (cbs && typeof cbs.processVertexEarly === 'function') {
                cbs.processVertexEarly(next);
            }
            if (graph.adjacencies[next]) {
                graph.adjacencies[next].forEach(function (edge) {
                    if (state[edge.v] !== 'processed' || graph.directed === true) {
                        if (state[edge.v] === 'processed') {
                            cycles++;
                        }
                        if (cbs && typeof cbs.processEdge === 'function') {
                            cbs.processEdge(next, edge);
                        }
                    }
                    if (state[edge.v] === 'undiscovered') {
                        state[edge.v] = 'discovered';
                        parent[edge.v] = next;
                        queue.enqueue(edge.v);
                    }
                });
            }
            if (cbs && typeof cbs.processVertexLate === 'function') {
                cbs.processVertexLate(next);
            }
            state[next] = 'processed';
        }

        return {
            state: state,
            parent: parent,
            cycles: cycles
        };
    };

    module.exports = BFS;
}());
