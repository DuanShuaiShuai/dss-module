# 前言 

随着前端技术的层出不穷 前端项目代码日益膨胀  Js的开发者随着也会考虑使用模块化规范来管理 下面将从前端的模块化发展历程依次讲解一些流行的模块化规范 

## 全局
- 将不同的功能分装成不同的全局函数
- 问题: 
    - 污染全局命名空间(冲突)  
    - 加载顺序  
    - 看不出各个模块之间的关系 
    - 外部直接可以访问(不安全)
```javascript
function a1(){
  //...
}
function a2(){
  //...
}
```
## 命名空间-namespace
- 简单的对象的封装  减少全局变量 解决了命名冲突（webpack2）
- 问题：
    - 多人协作 容易被覆盖（全局） 提前约定商量好
    - 必须点点(记住路径名)  
    - 暴露所有模块成员 外部直接可以访问(不安全)
    - 加载顺序

库名.类名.方法名
```javascript
var NameSpace = { }
 NameSpace.type=  NameSpace.type || {}
 NameSpace.type.method= function(){
 }
```
弊端：1. 2  3     

## IIFE模式-闭包

- 内部函数总是可以访问其所在的外部函数中声明的参数和变量
- 利用闭包来封装 数据是私有的 外部只能通过暴露的方法操作
- 将数据和行为封装到一个函数内部, 通过给window添加属性来向外暴露接口
- 通过传参将依赖引入（这也就成就了js现在模块化的基石）
- 问题：
    - 需要指定依赖顺序
    - 对代码有一定的了解

```javascrit
<!-- example02 -->
<script type="text/javascript" src="./js/libs/jquery-3.4.1.js"></script>
<script type="text/javascript" src="./js/module2.js"></script>
```

### 比较有名的库 - YUI（Yahoo）

```javascrit
   //YUI 沙箱机制
    <script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>
    <script src="/module1.js"></script>
    <script src="/module2.js"></script>
    <script src="/a.js"></script>

```

### 随之而来的问题（多个script引入）
- 请求过多
    - 浏览器对并发是有限制的
- 依赖模糊
    - 不了解或者不看库的api 很难确定他们的依赖关系 也就导致页面的加载顺序报错
- 难以维护
    - 以上两问题造就了项目大了 难以维护  牵一发而动全身

## COMMONJS  后端
随着在服务端[NODE](http://nodejs.cn/api/modules.html#modules_the_module_wrapper)的兴起，模块化进一步发展

url：
modules/1.1.1
   - 一个文件为一个模块
   - 通过module.exports 暴漏模块接口
   - 通过require引入模块 文件内通过require对象引入指定模块
   - 所有文件加载均是同步完成
   - 原生Module对象，每个文件都是一个Module实例
   - 通过module关键字暴露内容
   - 每个模块加载一次之后就会被缓存
   - 模块编译本质上是沙箱编译
   - 由于使用了Node的api，只能在服务端环境上运行
require{
   extensions:指示要求如何处理某些文件扩展名的对应的方法 ,
   main：模块对象，表示Node.js进程启动时加载的入口脚本对象，
   cache：缓存,
   resolve:解析路径 
}

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
- 何时使用export/module.export

```javascript
    //代码1
    //export是对于 module.exports 的更简短的引用形式
    // let export=module.exports
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
   module.exports // 的赋值必须立即完成 值传递
    //代码3
   module.exports // 导出的是对象引用  不是copy 
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
# AMD - Async Module Definition
- 前端的模块化
- 使用define 定义模块
- 使用require 加载模块
- 比较有名的库  就是RequireJs
- 依赖前置 提前执行
- 缺点 ：开发者必须显式得指明依赖——这会使得开发工作量变大 比如：当你写到函数体内部几百上千行的时候，忽然发现需要增加一个依赖，你不得不回到函数顶端来将这个依赖添加进数组

AMD 优先照顾浏览器的模块加载场景，使用了异步加载和回调的方式。
异步模块定义（AMD）API指定了一种定义模块的机制，以便可以异步加载模块及其依赖项。这特别适用于浏览器环境，其中模块的同步加载会导致性能，可用性，调试和跨域访问问题。

## 客户端与服务端执行的区别
CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

### 比较有名的库 - RequireJS（Demo）
- RequireJS的基本思想是，通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载。
- 不会污染全局环境，能够清楚地显示依赖关系。
- AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。

```javascript
define(id?, dependencies?, factory);
require(['alerter'], function(alerter) {
    alerter.showMsg()
})
```
 
# CMD - Common Module Definition （Demo）
- 一个文件为一个模块
- 使用define 定义模块 使用require 加载模块
- 比较有名的库  就是SeaJS
- 尽可能懒执行  和 AMD 不一样的地方(前置)
CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点
amd与cmd的区别 https://blog.csdn.net/u013782762/article/details/51882388
```javascript
    <script type="text/javascript" src="js/libs/sea.js"></script>
    <script type="text/javascript" >
        seajs.use('./js/modules/main')
    </script>
```
# UMD - Universal Module Definition

通用解决方案

- UMD提供了支持多种风格的“通用”模式，在兼容CommonJS和AMD规范的同时，还兼容全局引用的方式
- AMD模块以浏览器第一的原则发展，异步加载模块。
- CommonJS模块以服务器第一原则发展，选择同步加载，这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。
- UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。
在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。 //slick-carousel
```javascript
;(function() {
    var runInContext = (function runInContext(context) {
      function lodash(){
        //  ...
      }
      //...
          // Add chain sequence methods to the `lodash` wrapper.
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
  
      // Add lazy aliases.
      lodash.prototype.first = lodash.prototype.head;
  
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    });
  
    /*--------------------------------------------------------------------------*/
  
    // Export lodash.
    var _ = runInContext();
  
    // Some AMD build optimizers, like r.js, check for condition patterns like:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      // Expose Lodash on the global object to prevent errors when Lodash is
      // loaded by a script tag in the presence of an AMD loader.
      // See http://requirejs.org/docs/errors.html#mismatch for more details.
      // Use `_.noConflict` to remove Lodash from the global object.
      root._ = _;
  
      // Define as an anonymous module so, through path mapping, it can be
      // referenced as the "underscore" module.
      define(function() {
        return _;
      });
    }
    // Check for `exports` after `define` in case a build optimizer adds it.
    else if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = _)._ = _;
      // Export for CommonJS support.
      freeExports._ = _;
    }
    else {
      // Export to the global object.
      root._ = _;
    }
  }.call(this));
  

```

## ES6 module

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

``` javascript
//写法一    
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
export function add(num0,num1){ 
    return num0+num1
}

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
export {
  firstName as v1,
  lastName as v2,
  year as v3
};
//对应的导入
import { year, lastName } from '...'
// 整体导入
import * as utils from '...'
import  utils from '...'  //报错
// 1.弊端 用户需要知道所要加载的变量名或函数名 看api 为了给用户提供方便，让他们不用阅读文档就能加载模块  export default 
//写法二
export default function () {
  console.log('foo');
}

export default function foo() { //视同匿名函数加载
  console.log('foo');
}

import utils from '......';
utils();

//区别：第一组是不使用export default时，对应的import语句需要使用大括号；第二组是使用export default时，对应的import语句不需要使用大括号 本质上，export default就是输出一个叫做default的字段，然后系统允许你为它取任意名字。所以，下面的写法是有效的。如下

function add(x, y) {
  return x * y;
}
export {add as default}; // 等同于// export default add;

import { default as xxx } from 'modules'; // 等同于 import xxx from 'modules';

//两种写法不冲突  但是export default 只能一次
export {firstName, lastName, year};
export default function foo() { //视同匿名函数加载
  console.log('foo');
}
import foo, { firstName, lastName, year } from '...';
//更多了解http://caibaojian.com/es6/module.html

```

## import
上面的所讲的 import语句会被JavaScript引擎静态（编译期间）执行,所以下面代码报错（不是执行错误）

```javascript
  // 报错
if (x === 2) {
  import MyModual from './myModual';
}

```
## import() - 打包后的代码分析(其实就是一个Promise)

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。从长远来看，import语句会取代 Node 的require方法，但是require是运行时加载模块，import语句显然无法取代这种动态加载功能。
因此，有一个[提案](https://github.com/tc39/proposal-dynamic-import),实现动态加载
```javascript
import(`......js`)
  .then(module => {
    ....
  })
  .catch(err => {
    ....
  });
    //webpackDemo/src/demo1.js
  setTimeout(()=>{
      console.log('------------------')
      import('./demo1/cancelApply.js').then(data=>{
          console.log(data.cancelApply())
      })
  },2000)
  //打包后的代码分析
```

//import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，也会加载指定的模块。另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的 CommonJS 和 AMD 规范

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


## PC-WEB---分析对比一下打包后的代码（webpackDemo）
#### commonjs commonjs
#### es6 es6
#### es6 commonjs  plugin-transform-modules-commonjs (以commonjs的方式导出)
#### commonjs es6   

```javascript
Object.defineProperty(exports, "__esModule", {  value: true});
exports["default"] = void 0;
function addDefalut(num0, num1) {  return num0 + num1 + num1;}
var _default = {  addDefalut: addDefalut};exports["default"] = _default;
//---------------------------------------------------------------

Object.defineProperty(exports, "__esModule", {  value: true});
exports["default"] = void 0;
function addDefalut(num0, num1) {  return num0 + num1 + num1;}
var _default = {  addDefalut: addDefalut};exports["default"] = _default;
module.exports = exports.default;
```

### imports-loader  分析一下；lodash打包方式
```javascript
var define = false; //禁止使用amd规范

```

