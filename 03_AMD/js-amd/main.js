(function() {
  //使用前配置一下
    require.config({
      baseUrl: 'js-amd/', //基本路径 出发点在根目录下
      paths: {
        //映射: 模块标识名: 路径
        alerter: './modules/alerter', //此处不能写成alerter.js,会报错
        dataService: './modules/dataService',
        // 第三方库模块
        jquery: './libs/jquery-3.4.1' //注意：写成jQuery会报错
      }
    })
    require(['alerter'], function(alerter) {
      alerter.showMsg()
    })
  })()