YUI.add('module1', function (Y) { 
    Y.module1 = {}; 
    Y.module1.name = 'module1';
    Y.module1.add2 = function(a,b){
        return a+b
    };
    console.log(Y)
    console.log('我是module1')
 }, '1.0.0');