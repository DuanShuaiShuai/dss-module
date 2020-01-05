const path = require('path');
module.exports = {
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  
    entry: "./src/main.js",
    output: {
      // webpack 如何输出结果的相关选项
  
      path: path.resolve(__dirname, "dist"), // string

      filename: "main.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
  
      publicPath: "/dist/",
  
      library: "MyLibrary", 
  
      libraryTarget: "umd", 
   },
    context: __dirname, // string（绝对路径！）
    target: "web", // 枚举  // 包(bundle)应该运行的环
  }