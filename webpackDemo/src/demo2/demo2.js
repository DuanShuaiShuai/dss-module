// //当用require 的时候 添加一个方法
// export const add=(num0,num1)=>{
//     return num0+num1
// }
// //当用require 的时候 覆盖对应的default字段
function addDefalut(num0,num1){
    return num0+num1+num1
}
export default  {
    addDefalut
}

// const add=(num0,num1)=>{
//         return num0+num1
// }

// module.exports={
//     add
// }