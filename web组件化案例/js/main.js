require.config({
	paths:{
		jquery:'jquery.min',
		jqueryUI:'http://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui'
	}
})

require(['jquery','window_1'],function($,w){
	var win = new w.Window();
	$("#btn1").click(function(){
		
		win.alert({
			content:'welcome',
			handlerForBtn:function(){
				alert("you click")
			},
			handlerForCloseBtn:function(){
				alert("关闭")
			},
			y:50,
			width:300,
			title:'大家好',
			hasCloseBtn:true,
			
			hasMask:true,
			isDraggable:true,
			dragHandle:'.window_header',
		
		});
		console.log(win);
		win.on("alert",function(){console.log("second")});
		win.on("alert",function(){console.log("third")});
		win.on("alert",function(){console.log("fourth")});
	})

	$("#btn2").click(function(){
		win.confirm({
			content:'这是confirm表格',
			y:50,
			width:250,
			title:'confirm',
			hasCloseBtn:false,
			hasMask:true,
			isDraggable:true,
			dragHandle:'.window_header',
			handlerForConfirmBtn:function(){
				alert("confirm");
			},
			handlerForCancelBtn:function(){
				alert("cancel button")
			}
		})
	})
	$("#btn3").click(function(){
		win.prompt({
			content:'这是confirm表格',
			y:50,
			width:250,
			title:'confirm',
			hasCloseBtn:false,
			hasMask:true,
			isDraggable:true,
			dragHandle:'.window_header',
		   	handlerForPormpt:function(){
		   		alert("prompt");
		   	},
		   	handerForCancelPrompt:function(){
		   		alert("prompt cancel")
		   	},
		})
	})
	
})