const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./app/config/app.config.json');

module.exports = {
  devtool: 'eval',
  entry: [
    path.join(process.cwd(), './app/app.js')
  ],
  output: {
    path: path.join(process.cwd(), '/build'),
    filename: '[name].js',
    chunkFilename: '[name].cluster.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['*', '.js']
  },
  bail: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        loader: 'css-loader!style-loader'
      },
      {
        test: /\.scss/,
        exclude: '/node_modules/',
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
      config: config
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    overlay: true,
    stats: {
      colors: true
    },
    historyApiFallback: {
      disableDotRule: true
    }
  }
};