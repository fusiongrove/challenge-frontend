const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'build');
const mainPath = path.resolve(__dirname, 'app', 'app.js');

const pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');
const pathToReactDom = path.resolve(nodeModulesPath, 'react-dom/dist/react-dom.min.js');
const pathToReactObj = path.resolve(nodeModulesPath, 'react/lib/Object.assign');

const appConfig = require('./app/config/app.config.production.json');

const config = {
  // Normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js'],
    alias: {
      'react/lib/Object.assign': pathToReactObj,
      'react': pathToReact,
      'react-dom': pathToReactDom
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
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
    new ExtractTextPlugin('/build/styles.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.ejs'),
      hash: true,
      filename: 'index.html',
      inject: 'body', // Inject all scripts into the body
      config: appConfig
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};

module.exports = config;
