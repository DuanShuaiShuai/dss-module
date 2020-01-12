import { mainList  } from './demo1/mainList.js'
mainList()
setTimeout(()=>{
    console.log('----------22--------')
    import('./demo1/cancelApply.js').then(data=>{
        console.log(data.cancelApply())
    })
},2000)