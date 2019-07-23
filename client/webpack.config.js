/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './js/index.js',
  },
  // TODO: This needs to be an env variable.
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // TODO: These should also be configurable.
    new HtmlWebpackPlugin({
      title: 'ToDo',
      template: '!!ejs-loader!./index.ejs',
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.ejs',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
