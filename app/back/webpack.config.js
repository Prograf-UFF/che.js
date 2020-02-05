const path = require('path');

// webpack plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        front: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
