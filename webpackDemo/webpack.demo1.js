const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common=require('./webpack.base')
const merge= require('webpack-merge');
module.exports =merge(common,{
  mode: "development", 
  // mode: "production", 
  entry: {test: './src/demo1.js'},
 devServer: {
  contentBase: './dist',
  hot: true,
  port: 80,
  watchOptions: {
    poll: true
  },
  writeToDisk: (filePath) => {
    return true;
  }
},
target: "web", 
plugins:[
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
      title: 'webpack 4 modules',
      template: 'index.html',
      filename: 'index.html'
  })
]
}); 