
//特别注意，这里只能使用0.1.1版本的superagent-charset才有用
var express=require('express')
var superagent=require('superagent-charset')
var fs=require('fs')
// var superagent=require('superagent')
var cheerio=require('cheerio')
var app=express();
var items=[];
// app.get('/',function(req,res,next){
	superagent
	.get('http://www.lwxiaoshuo.com/66/66576/index.html')
	.charset('gbk')
	.end(function(err,sres){
		if(err)
		{
			return next(err);
		}
		var $=cheerio.load(sres.text,{decodeEntities:false});
		
		$('#defaulthtml4 .dccss>a').each(function(index,element){
			var $ele=$(element);
			items.push({
			  title:$ele.text(),
			  href:'http://www.lwxiaoshuo.com'+$ele.attr('href')
			})
		})
		var str="";
			// for(var i=0; i<5; i++){
	    items.forEach(function(item){
	    	console.log(item)
	    	superagent
	    	.get(item.href)
	    	.charset('gbk')
	    	.end(function(err,sres){
	    		if(err)
	    		{
	    			return next(err);
	    		}
	    		var $=cheerio.load(sres.text,{decodeEntities:false});
	    		
	    		str+=$("#content").text().replace(/(&nbsp;){1,}/g,'\r\n')
	    		

	    	})
	    })
		fs.writeFile('助理建筑师.txt',str,function(err){
	    			if(err) throw err;
	    			console.log("书籍已经生成")
	    })
	})
	
		// }
			

		
		
		
		// res.send(str)
	
// })

// app.listen('3005',function(){
// 	console.log('app is running at port 3005');
// })