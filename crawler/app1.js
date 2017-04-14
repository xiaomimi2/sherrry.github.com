//乐文小说爬虫过程。哈哈哈
var http = require('http')
var superagent=require('superagent-charset')
var fs=require('fs')
var Promise = require('bluebird')
var superagent=require('superagent')
var cheerio=require('cheerio')
// var str = '';
var fetchchapter = {
	title:'',
	chapter:[]
};
var fetchArticle = [];
// var fetchchapter = {
// 	title:title,
// 	chapter:[{
// 		title:title,
// 		url:url;
// 	}]
// }

function getCatalog(){
	 return new Promise(function(resolve,reject){
	 	console.log("正在爬取目录消息");
	 	superagent
	 		.get("http://www.lwxiaoshuo.com/68/68858/index.html")
	 		.charset('gbk')
	 		.end(function(err,sres){
	 			if(err)
				{
				    console.error(err);
				    return;
				}
				var $=cheerio.load(sres.text,{decodeEntities:false});
				fetchchapter.title = $("#defaulthtml4 .j_title").text().trim();  	
				$('#defaulthtml4 .dccss>a').each(function(index,element){
					var $ele=$(element);
					fetchchapter.chapter.push({
					  title:$ele.text().trim(),
					  url:'http://www.lwxiaoshuo.com'+$ele.attr('href')
					})
				})
				// console.log(fetchchapter);
				resolve();
	 		})
	 })

}

	


function getPageAsync(item){
	return new Promise(function(resolve,reject){
		console.log("正在爬取");
		superagent
		.get(item.url)
		.charset('gbk')
		.end(function(err,sres){
			if(err)
			{
				console.error(err);
				return ;
			}
			var $=cheerio.load(sres.text,{decodeEntities:false});
			var str='';
			str+=$("#content").text().trim().replace(/(&nbsp;){1,}/g,'\r\n');
			resolve(str);
			// fs.writeFile('index.txt',str,function(err){
			// 	if(err) throw err;
			// 	console.log('数据已保存')
			// })
			// res.send(str);
		})
	})
}

getCatalog()
.then(function(){
	console.log(fetchchapter);
	fetchchapter.chapter.forEach(function(item){
		fetchArticle.push(getPageAsync(item))
	})
})
.then(function(){
	console.log("最后的文件整理");
	var str='';
	return Promise
		.all(fetchArticle)
		.then(function(pages){
			pages.forEach(function(page){
				str += page;
			})
			fs.writeFile(fetchchapter.title.slice('')+'.txt',str,function(err){
				if(err) console.log("文件写入失败");
				console.log("书籍生成成功");
			})
		})

})
