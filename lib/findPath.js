(function () {
    'use strict';

    module.exports = function findPath(start, end, parents) {
        var path;

        if (end === -1) {
            return null;
        }
        if (start === end) {
            return [end];
        }

        path = findPath(start, parents[end], parents);
        if (!path) {
            return null;
        }
        path.push(end);
        return path;
    };
}());
