const path = require('path');

module.exports = {
    entry: './src/LoggedIn.tsx',
    output: {
        filename: 'accueil_bundled.js',
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