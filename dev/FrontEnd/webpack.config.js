const path = require('path');

module.exports = {
    entry: './src/AccueilComp.tsx',
    output: {
        filename: 'accueil_bundled.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },]
    },

}