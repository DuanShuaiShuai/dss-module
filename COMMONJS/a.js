const EventEmitter = require('events');

module.exports = new EventEmitter();

// 处理一些工作，并在一段时间后从模块自身触发 'ready' 事件。
setTimeout(() => {
    console.log('触发。。。。。')
  module.exports.emit('ready');

}, 1000);