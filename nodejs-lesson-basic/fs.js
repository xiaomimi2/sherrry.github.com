var fs = require('fs')

function read(){
	var data = fs.readFileSync('./test.txt');
	console.log(data.toString());
	console.log("文件读取成功")
}

exports.read = read;