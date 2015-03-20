(function () {
    'use strict';

    var EdgeFactory = module.exports = {};

    // allow creation of edge classes with extra properties
    //  e.g. weight, label, etc...
    EdgeFactory.defineEdge = function (props) {
        var Edge = function Edge(v, args) {
            this.v = v;

            if (typeof args === 'object') {
                var keys = Object.keys(args);
                var i = 0,
                    len = keys.length;
                for (i = 0; i < len; i++) {
                    this[keys[i]] = args[keys[i]];
                }
            }
        };

        props = props || [];
        props.forEach(function (prop) {
            if (typeof prop === 'undefined' || prop === null) {
                return;
            }

            if (typeof prop !== 'string' && !(typeof prop === 'object' && typeof prop.name === 'string')) {
                return;
            }

            var def = prop;
            if (typeof def === 'string') {
                def = {
                    name: def
                };
            }

            if (!def.config) {
                def.config = {
                    writable: true
                };
            }
            Object.defineProperty(Edge.prototype, def.name, def.config);
        });

        Object.defineProperty(Edge.prototype, 'v', {
            enumerable: true,
            writable: true
        });

        return Edge;
    };

}());
