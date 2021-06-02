const path = require('path');

module.exports = {
    entry: './main.js',
    mode: 'development',
    output: {
        path: path.resolve(path.join(__dirname, '../../public/js')),
        filename: 'bundle.min.js',
    },
};

