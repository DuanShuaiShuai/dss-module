// module4.js文件
define(function (require, exports, module) {
    //引入依赖模块(同步) cmd  尽可能懒执行
    var module2 = require('./module2')
    function show() {
      console.log('module4 show() ' + module2.msg)
    }
    
    exports.show = show
    console.log('----------------------')
    //引入依赖模块(异步)  类似AMD  依赖前置
    require.async('./module3', function (m3) {
      console.log('异步引入依赖模块3  ' + m3.API_KEY)
    })
  })