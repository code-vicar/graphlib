(function(){
    'use strict';

    module.exports = function isNullOrUndefined(val) {
        return (typeof val === 'undefined' || val === null);
    };

}());
