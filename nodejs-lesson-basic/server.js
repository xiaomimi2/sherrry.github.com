var http = require('http');
var read = require('./fs.js')
http.createServer(function(req,res){
	read.read();
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end("hello")
}).listen('5600')

console.log("服务器已经运行");


