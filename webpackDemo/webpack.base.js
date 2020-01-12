const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack=require('webpack')

module.exports = {
    mode: "development", 
    // mode: "production", 
    entry: {test: './src/main.js'},
    output: {
      path: path.resolve(__dirname, "dist"), // string
      publicPath: "./",
   },
    module: {
      rules: [
          {
              test: /\.js$/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: [
                          "@babel/preset-env",
                      ],
                      "comments": false,
                  }
              },
              exclude: /node_modules/
          },
      ]
  },
  plugins:[
    new CleanWebpackPlugin(),
  ]
  }