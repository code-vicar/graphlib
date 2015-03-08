(function () {
    'use strict';

    var VertexFactory = function VertexFactory() {};
    var VertexBase = function VertexBase() {};

    var isNullOrUndefined = require('isNullOrUndefined');

    module.exports = new VertexFactory();

    VertexFactory.prototype.VertexBase = VertexBase;

    // check if v implements a vertex
    VertexFactory.prototype.isVertex = function isVertex(v) {
        return !isNullOrUndefined(v) && !isNullOrUndefined(v.id);
    };

    VertexFactory.prototype.defineVertex = function (props) {
        var Vertex = function Vertex(id) {
            VertexBase.call(this);
            Object.defineProperty(this, 'id', {
                enumerable: true,
                writable: false,
                value: id
            });
        };

        Vertex.prototype = Object.create(VertexBase.prototype);
        Vertex.prototype.constructor = Vertex;

        props = props || [];

        props.forEach(function (prop) {
            if (typeof prop === 'undefined' || prop === null) {
                return;
            }

            if (typeof prop !== 'string' || !(typeof prop === 'object' && prop.name)) {
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

            Object.defineProperty(Vertex.prototype, def.name, def.config);
        });

        return Vertex;
    };

})();
