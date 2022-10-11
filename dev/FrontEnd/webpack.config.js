const path = require('path');

module.exports = {
    entry: './src/login.js',
    output: {
        filename: 'login_bundled.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        contentBase: path.join(__dirname,'public')
        // port: 6000
    }
}