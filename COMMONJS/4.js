if (!module.parent) { //node 直接运行这份文件
    console.log("I'm parent");
} else { //require
    console.log("I'm child");
}
