# JS模块化

## 命名空间

库名.类名.方法名
```javascript
var NameSpace = { }
 NameSpace.type=  NameSpace.type || {}
 NameSpace.type.method= function(){
 }
```
弊端：1.容易被覆盖 全局  2 必须点点 路径名 3 多人协作 商量使用哪种  约定 webpack2使用的就是这种 

## YUI

```javascrit
   YUI 沙箱机制
```
## COMMONJS  后端
http://nodejs.cn/api/modules.html#modules_the_module_wrapper
url：http://wiki.commonjs.org/wiki/Modules/1.1.1
modules/1.1.1
    一个文件为一个模块
    通过module.exports 暴漏模块接口
    通过require引入模块 文件内通过require对象引入指定模块
    所有文件加载均是同步完成
    原生Module对象，每个文件都是一个Module实例
    通过module关键字暴露内容
    每个模块加载一次之后就会被缓存
    模块编译本质上是沙箱编译
    由于使用了Node的api，只能在服务端环境上运行
require{
   extensions:指示要求如何处理某些文件扩展名的对应的方法 ,
   main：模块对象，表示Node.js进程启动时加载的入口脚本对象，
   cache：缓存,
   resolve:解析路径 
}
- require.main === module  
```javascrit
    require.main === module
```
-  cache
```javascrit
   多次调用 require(foo) 不会导致模块的代码被执行多次,重要特性
```
-  文件模块
```javascrit
   /   绝对路径根目录
   ./ ../  相对路径
   其他  核心模块(优先)或加载自 node_modules 
```
- 模块封装器
```javascrit
    //IIFE
   (function(exports, require, module, __filename, __dirname){
    // 模块的代码实际上在这里
    });
   优点
    1. 保持了顶层的变量 
    2. 有助于提供一些看似全局的但实际上是模块特定的变量 exports, require, module, __filename, __dirname
```
- export 与 module.export 

```javascript
    //代码1
    //export是对于 module.exports 的更简短的引用形式
   // 何时使用export/module.export
    //http://nodejs.cn/api/modules.html#modules_exports_shortcut
    //区别：
    function require(/* ... */) {
        const module = { exports: {} };
        ((module, exports,require, __filename, __dirname) => {
            // 模块代码在这。在这个例子中，定义了一个函数。
            function someFunc() {}
            exports = someFunc;
            // 此时，exports 不再是一个 module.exports 的快捷方式，
            // 且这个模块依然导出一个空的默认对象。
            module.exports = someFunc;
            // 此时，该模块导出 someFunc，而不是默认对象。
        })(module, module.exports);
        return module.exports;
    }

    //反例：
    module.exports.hello = true; // 从模块的引用中导出。
    exports = { hello: false };  // 不导出，仅在模块中可用。
```

- module
  不是全局对象  而是每个模块本地的
- module.children
  被该模块引用的模块对象
- module.exports
```javascript
   //代码2
   module.exports // 的赋值必须立即完成
   //代码3
   module.exports // 导出的是对象 引用  不是copy 
```
- module 属性
```javascript
   //代码4
    filename  //模块的完全解析后的文件名。
    id  //模块的标识符。 通常是完全解析后的文件名 与filename 相似
    loaded //模块是否已经加载完成，或正在加载中
    parent  //区分是该文件是直接运行还是require
    paths //模块的搜索路径。
    //require(id)
```
- require 
```javascript
   //代码5
   require.cache
   //删除键值对将会导致下一次 require 重新加载被删除的模块
   require.main  //启动时加载的入口脚本
   require.resolve //   需要解析的模块路径。

  // import { createRequire } from 'module'; 就是require
  // const require = createRequire(import.meta.url);

```
## AMD/CMD/UMD 前端

## ES6 module