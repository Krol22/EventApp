'use strict';

var fs = require('fs');

module.exports = {
    init: function init() {
        require.extensions['.graphql'] = function (module, filename) {
            module.exports = fs.readFileSync(filename, 'utf8');
        };
    }
};