const HtmlWebPackPlugin = require("html-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

//This plugin generates an HTML file with <script> injected, 
//writes this to dist
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/../dist'),
        publicPath: '/',
        filename: '[hash].js',
    },
    devServer: {
        historyApiFallback: true,
        port: process.env.PORT || 4001
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            { //Note that the order of adding these loaders is important. First, we need to resolve 
                //the CSS files before adding them to the DOM with the style-loader. By default, 
                //webpack uses the loaders from the right (last element in the array) to the left 
                //(first element in the array).
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,  "css-loader"], 
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader",  "sass-loader"]
            }
        ]
    },
    plugins: [htmlPlugin, new MiniCssExtractPlugin({
        filename: '[hash]_styles.css'
    })],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {
            appConfig: path.join(__dirname, '/../src/config/prod.js')
        }
    }
};
