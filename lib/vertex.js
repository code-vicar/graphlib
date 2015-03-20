(function () {
    'use strict';

    var VertexFactory = module.exports = {};

    VertexFactory.VertexBase = function VertexBase() {};

    VertexFactory.defineVertex = function (props) {
        var Vertex = function Vertex(id) {
            VertexFactory.VertexBase.call(this);
            Object.defineProperty(this, 'id', {
                enumerable: true,
                writable: false,
                value: id
            });
        };

        Vertex.prototype = Object.create(VertexFactory.VertexBase.prototype);
        Vertex.prototype.constructor = Vertex;

        props = props || [];

        props.forEach(function (prop) {
            // is prop null?
            if (typeof prop === 'undefined' || prop === null) {
                return;
            }

            // is prop either a string, or an object?
            if (typeof prop !== 'string' || !(typeof prop === 'object' && prop.name)) {
                return;
            }

            var def = prop;
            // if prop was a string, make it an object
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

}());
