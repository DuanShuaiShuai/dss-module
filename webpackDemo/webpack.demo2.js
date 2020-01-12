const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack=require('webpack')

module.exports = {
    mode: "development", 
    // mode: "production", 
    entry: {test: './src/demo2.js'},
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
  
  module: {
    rules: [
        {
            test: /\.js$/,
            use:{
              loader: "babel-loader",
              options: {
                  presets: [
                      "@babel/preset-env",
                  ],
                  // "plugins": [],
                  "plugins": ["@babel/plugin-transform-modules-commonjs","add-module-exports"],
                  "comments": false,
              },
             
          },
          exclude: /node_modules/
      },
    ]
},
  // target: "web", 
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'webpack 4 modules',
        template: 'index.html',
        filename: 'index.html'
    })
  ]
}