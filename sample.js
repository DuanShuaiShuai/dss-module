// 从模块的引用中导出。
// module.exports.hello = true; 
console.log(module)
module.exports.hello = true ;
exports.hello = false ;  // 不导出，仅在模块中可用。
// module.exports=exports