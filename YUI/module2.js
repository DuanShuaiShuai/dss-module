YUI.add('module2', function (Y) {
    Y.module2 = {}; 
    Y.module2.name = 'module2';
    Y.module2.add3 = function(a,b,c){
        return Y.module1.add2(a,b)+c
    };
 },
 '1.0.0',{
    requires:['module1']
})