// import { foo } from './module.js'

// console.log(foo)
// console.log('---------1---------')
// setTimeout(() => {
//     console.log(foo)
//     console.log('---------2---------')
// }, 1500);


setTimeout(()=>(
  import(`./module.js`)
  .then(module => {
      console.log('module')
      console.log(module)
      console.log('-------------------------')
  })
  .catch(err => {
    main.textContent = err.message;
  })
),4000)

console.log(this)


// import {bar} from './b.js';

// export function foo() {
//   // 执行时第一行输出 foo
//   console.log('foo');
//   // 到 b.js 执行 bar
//   bar();
//   console.log('执行完毕');
// }
// foo();