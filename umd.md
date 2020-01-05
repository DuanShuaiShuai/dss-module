# Universal Module Definition
通用解决方案

UMD提供了支持多种风格的“通用”模式，在兼容CommonJS和AMD规范的同时，还兼容全局引用的方式

AMD模块以浏览器第一的原则发展，异步加载模块。
CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。
这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。

UMD先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。
在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。
//slick-carousel
```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('b'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
    }
}(this, function (b) {
    //use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));

```

https://webpack.toobug.net/zh-cn/chapter2/umd.html
https://webpack.toobug.net/zh-cn/chapter3/advanced-config.html