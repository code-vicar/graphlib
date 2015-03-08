(function () {
    'use strict';

    var VertexFactory = function VertexFactory() {};

    module.exports = new VertexFactory();

    VertexFactory.prototype.defineVertex = function (props) {
        var Vertex = function Vertex(id) {
            Object.defineProperty(this, 'id', {
                enumerable: true,
                writable: false,
                value: id
            });
        };

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
