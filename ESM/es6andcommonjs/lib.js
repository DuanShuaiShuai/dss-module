// lib.js
var counter = 3;
var t=function(){
    console.log(counter)
}
function incCounter(tt) {
  counter++;

  console.log(counter,'kkkkkkkkkkkkkk')
}
setTimeout(()=>{
    console.log(counter,'-------------------')
},2000)
module.exports = {
  counter: counter,
  incCounter: incCounter,
  t:t
};