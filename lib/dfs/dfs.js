/* jshint loopfunc:true */
(function () {
    'use strict';

    var Graph = require('../graph');

    var DFS = function DFS(graph, startId, cbs) {
        if (!(graph instanceof Graph)) {
            throw new TypeError('first argument must be an instance of Graph');
        }

        var state = {};
        var parent = {};
        var entryTime = {};
        var exitTime = {};
        var clock = 0;

        var vertexIds = graph.vertexIds();
        vertexIds.forEach(function (vertexId) {
            state[vertexId] = 'undiscovered';
            parent[vertexId] = -1;
        });

        var rdfs = function rdfs(graph, v, cbs) {
            clock++;
            entryTime[v] = clock;
            state[v] = 'discovered';

            if (cbs && typeof cbs.processVertexEarly === 'function') {
                if (cbs.processVertexEarly(v) === false) {
                    return;
                }
            }

            if (graph.adjacencies[v]) {
                graph.adjacencies[v].forEach(function (edge) {
                    if (state[edge.v] === 'undiscovered') {
                        parent[edge.v] = v;
                        state[edge.v] = 'discovered';
                        rdfs(graph, edge.v, cbs);
                    } else if ((state[edge.v] !== 'processed' && parent[v] !== edge.v) || graph.directed === true) {
                        if (cbs && typeof cbs.processEdge === 'function') {
                            if (cbs.processEdge(v, edge) === false) {
                                return;
                            }
                        }
                    }
                });
            }

            if (cbs && typeof cbs.processVertexLate === 'function') {
                if (cbs.processVertexLate(v) === false) {
                    return;
                }
            }

            clock++;
            exitTime[v] = clock;
            state[v] = 'processed';
        };

        rdfs(graph, startId, cbs);

        return {
            state: state,
            parent: parent,
            entryTime: entryTime,
            exitTime: exitTime,
            clock: clock
        };
    };

    module.exports = DFS;
}());
