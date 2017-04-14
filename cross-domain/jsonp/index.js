var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join("../",'/public')))

app.get('/jsonp',function(req,res){
	 // res.jsonp({name:'test1'});
	// res.json({name:'test1'})
	var result = {name:'test1'};
	res.jsonp(result);
})

app.listen('8080',function(){
	console.log("port is 8080")
})