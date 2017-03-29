var buf = new Buffer(256)
len = buf.write("68kejian.com")
console.log("写入字节数" + len);



var buf = new Buffer(26)

for(var i=0; i < 26; i++){
	buf[i] = i + 97;
}

console.log(buf.toString('ascii',0,5))
console.log(buf.toString('utf-8',0,5))
console.log(buf.toString(undefined,0,5))

var json=buf.toJSON()
console.log(json)
/*{ type: 'Buffer',
  data:
   [ 97,
     98,
     99,
     100,
     101,
     102,
     103,
     104,
     105,
     106,
     107,
     108,
     109,
     110,
     111,
     112,
     113,
     114,
     115,
     116,
     117,
     118,
     119,
     120,
     121,
     122 ] }
*/



var buffer1 = new Buffer('hello')
var buffer2 = new Buffer('nodejs')
var buffer3 = Buffer.concat([buffer1,buffer2],9);
console.log(buffer3.toString())

var result = buffer1.compare(buffer2);
console.log(result)
if(result<0){
	console.log("buffer1在前面")
}else if(result > 0){
	console.log("buffer1在后面")
}else{
	console.log("相同")
}


var buffer1 = new Buffer('ABCDEF')
var buffer2 = new Buffer(3)
buffer1.copy(buffer2,0,3)
console.log('buffer2 content ' + buffer2.toString())
