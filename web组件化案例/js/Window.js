define(['Widget','jquery','jqueryUI'],function(Wig,$,$UI){
	function Window(){
		this.cfg = {
			width:250,
			height:200,
			content:"",
			handlerForBtn:null,
			handlerForCloseBtn:null,
			title:'',
			hasCloseBtn:false,
			skinClassName:null,
			hasMask:false,
			isDraggable:false,
			dragHandle:null
		};
		this.handlers={

		}
	}
	Window.prototype = $.extend({},new Wig.Widget(),{
		alert:function(cfg){
			that = this;
			var CFG=$.extend(this.cfg,cfg);
			var $boundingBox = $("<div class='window_alert'>"+
									"<div class='window_header'>"+CFG.title+"</div>"+
									"<div class='window_body'>"+CFG.content+"</div>"+
									"<div class='window_footer'></div>"+
						       "</div>");
			$boundingBox.css({
				width:CFG.width+"px",
				height:CFG.height+"px",
				left:CFG.x || ($(window).width()-CFG.width)/2+"px",
				top:CFG.y || ($(window).height()-CFG.height)/2+"px"
			})
			
			
			if(CFG.handlerForBtn){
				this.on("alert",CFG.handlerForBtn);
			}
			if(CFG.handlerForCloseBtn){
				this.on("close",CFG.handlerForCloseBtn);
			}
			$("body").append($boundingBox);
			var $button = $("<button class='window_close'>确定</button>");
			$button.appendTo($boundingBox.find(".window_footer"));
			if(CFG.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>x</span>");
				closeBtn.click(function(){
					// CFG.handlerForCloseBtn && CFG.handlerForCloseBtn();
					mask && mask.remove();
					$boundingBox.remove();
					that.fire("close");
				})
				closeBtn.appendTo($boundingBox);
			}
			if(CFG.skinClassName){
				$boundingBox.addClass("window_skin_"+CFG.skinClassName);
			}
			if(CFG.isDraggable){
				if(CFG.dragHandle){
					$boundingBox.draggable({handle:CFG.dragHandle});
				}else{
					$boundingBox.draggable();
				}
				
			}

			$button.click(function(){
				// CFG.handlerForBtn && CFG.handlerForBtn();
				mask && mask.remove();
				$boundingBox.remove();
				that.fire("alert");
			})
			
			return this;
		},
		confirm:function(cfg){
			


		},
		prompt:function(){}
	})

	return {
		Window:Window
	}
})