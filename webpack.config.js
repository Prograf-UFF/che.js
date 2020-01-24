const path = require('path');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        che: path.join(__dirname, 'src/che', 'che.js'),
        app: path.join(__dirname, 'src/app', 'app.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },            
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
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(jpg|png|json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                        }
                    }
                ]
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/app/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ]    
}