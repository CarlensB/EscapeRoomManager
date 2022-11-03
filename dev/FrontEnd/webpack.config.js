const path = require('path');

module.exports = {
    entry: './src/loginComp.tsx',
    output: {
        filename: 'login_bundled.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js", ".tsx"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },]
    },

}