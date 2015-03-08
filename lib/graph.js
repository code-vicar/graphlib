(function () {
    'use strict';

    var isNullOrUndefined = require('isNullOrUndefined');

    var Graph = function Graph(nvertices, opts) {
        var graph = this;

        // unwrap the options
        var optsEdgeClass = null,
            optsDirected = false;
        if (!isNullOrUndefined(opts) && !isNullOrUndefined(opts.EdgeClass)) {
            optsEdgeClass = opts.EdgeClass;
        }
        if (!isNullOrUndefined(opts) && !isNullOrUndefined(opts.directed)) {
            optsDirected = opts.directed;
        }

        // property 'directed' is privately read/write
        // but publicly read only
        var isGraphDirected = !!optsDirected;
        Object.defineProperty(graph, 'directed', {
            enumerable: true,
            configurable: false,
            get: function () {
                return isGraphDirected;
            }
        });

        graph.adjacencies = {};
        graph.degrees = {};
        if (isGraphDirected) {
            graph.degreesOut = {};
            graph.degreesIn = {};
        }
        graph.nvertices = nvertices;

        var privateInsertEdge = function privateInsertEdge(x, y, directed, edgeArgs) {
            var degX, degY, degXOut, degYIn;
            // increment counts
            graph.nedges++;

            if (isGraphDirected) {
                //inc x total
                degX = graph.degrees[x.id] || 0;
                degX++;
                graph.degrees[x.id] = degX;
                //inc x out
                degXOut = graph.degreesOut[x.id] || 0;
                degXOut++;
                graph.degreesOut[x.id] = degXOut;
                // inc y total
                degY = graph.degrees[y.id] || 0;
                degY++;
                graph.degrees[y.id] = degY;
                // inc y in
                degYIn = graph.degreesIn[y.id] || 0;
                degYIn++;
                graph.degreesIn[y.id] = degYIn;
            } else {
                degX = graph.degrees[x.id] || 0;
                degX++;
                graph.degrees[x.id] = degX;
            }

            // fetch the adjacency list
            var listX = graph.adjacencies[x.id] || [];

            // create the edge and add it to the list
            if (!optsEdgeClass) {
                listX.push(y);
            } else {
                listX.push(new optsEdgeClass(y, edgeArgs));
            }

            graph.adjacencies[x.id] = listX;

            // if this is an undirected edge, then add the opposite edge
            if (!directed) {
                privateInsertEdge(y, x, true, edgeArgs);
            }
        };

        graph.insertEdge = function insertEdge(x, y, edgeArgs) {
            privateInsertEdge(x, y, isGraphDirected, edgeArgs);
        };
    };

    Object.defineProperty(Graph.prototype, 'nvertices', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: 0
    });

    Object.defineProperty(Graph.prototype, 'nedges', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: 0
    });

    Object.defineProperty(Graph.prototype, 'degrees', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: {}
    });

    module.exports = Graph;

})();
