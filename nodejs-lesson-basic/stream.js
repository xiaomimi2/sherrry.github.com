var fs = require('fs')
// var data = '';
// var readStream = fs.createReadStream("./test.txt");
// readStream.setEncoding('utf-8');
// readStream.on('data',function(chunk){
// 	data += chunk
// })


// readStream.on('end',function(){
// 	console.log(data)
// })


// readStream.on("error",function(){
// 	console.log(err.stack);
// })

// console.log("程序写入流执行完毕");


//改进版。一次读对应一次写
// var rs = fs.createReadStream('./[阳光电影www.ygdy8.com].名侦探柯南：纯黑的噩梦.BD.720p.日语中字.rmvb')
// var ws = fs.createWriteStream('电影.rmvb')
// var time = 0;
// rs.on("data",function(chunk){
// 	console.log("data read chunk ok")
// 	console.log(time++);
// 	if(ws.write(chunk,function(){
// 		console.log('data chunk write ok')
// 	})===false){
// 		rs.pause();
// 	}
// })

// rs.on('end',function(){
// 	ws.end();
// 	console.log("文件copy成功")
// })

// ws.on('drain',function(){
// 	rs.resume();
// })


//上述代码可以直接简写成
// function copy(src,dest){
// 	fs.createReadStream(src).pipe(fs.createWriteStream(dest))
// }

// copy('./[阳光电影www.ygdy8.com].名侦探柯南：纯黑的噩梦.BD.720p.日语中字.rmvb','我的电影.rmvb')



//链式流的使用方式,这个不就是gulp的链式操作吗
var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('./test.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('output.txt.gz'))
	console.log("文件压缩完成")