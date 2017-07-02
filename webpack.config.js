const path = require('path')
const webpack = require('webpack')
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, '/'),
    filename: 'git-token-api-ui.dist.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }, {
        test : /.json?$/,
        loader : "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    ,new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    })
    // ,new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, 'sw.js'),
    // })
  ]
}
