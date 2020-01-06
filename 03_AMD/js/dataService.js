// dataService.js文件
(function (window) {
    let msg = 'www.baidu.com'
    function getMsg() {
      return msg.toUpperCase()
    }
    window.dataService = {getMsg}
  })(window)