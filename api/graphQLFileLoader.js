const fs = require('fs');

module.exports = {
    init: () => {
        require.extensions['.graphql'] = function (module, filename) {
            module.exports = fs.readFileSync(filename, 'utf8');
        };
    }
};