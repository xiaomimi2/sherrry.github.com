var util = require('util')
console.log('%s:%s','foo')
console.log('%s:%s','foo','bar')

util.log("这是一个带有时间的输出")


// function Person(){
// 	this.name = "byvoid";
// 	this.toString = function(){
// 		return this.name
// 	}
// }

// var obj = new Person()
// console.log(util.inspect(obj,true))





// console.log(util.inspect(util,{showHidden:true,depth:null}))


//自定义对象的inspect方法
var obj = {name : 'nate'};
obj.inspect = function(){
	return "{"+this.name+"}"
}

console.log(util.inspect(obj));