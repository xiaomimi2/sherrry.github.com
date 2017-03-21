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
			dragHandle:null,
			textForAlertBtn:'确定',
			textConfirmBtn:'确定',
			textCancelBtn:'取消',
			handlerForConfirmBtn:null,
			handlerForCancelBtn:null,
		   	textPromptBtn:'是的',
		   	textPromptCancel:'不是',
		   	handlerForPormpt:null,
		   	handerForCancelPrompt:null,
		};
		
	}
	Window.prototype = $.extend({},new Wig.Widget(),{
		renderUI:function(){
			var footerContent='';
			switch(this.cfg.winType){
				case "alert":
				footerContent = "<button class='window_close'>"+this.cfg.textForAlertBtn+"</button>";
				bodyContent = this.cfg.content;
				break;
				case "confirm":
				footerContent = "<button class='window_confirmBtn'>"+this.cfg.textConfirmBtn+"</button>"+
								"<button class='window_cancelBtn'>"+this.cfg.textCancelBtn+"</button>";
				bodyContent = this.cfg.content;
				break;
				case "prompt":
				bodyContent = "<input placeholder='请输入你的姓名'>";
				footerContent = "<button class='window_promptBtn'>"+this.cfg.textPromptBtn+"</button>"+
								"<button class='window_cancelprompt'>"+this.cfg.textPromptCancel+"</button>";
			}
			console.log(this.cfg.winType);
			this.boundingBox = $("<div class='window_alert'>"+
									"<div class='window_header'>"+this.cfg.title+"</div>"+
									"<div class='window_body'>"+bodyContent+"</div>"+
									"<div class='window_footer'>"+footerContent+"</div>"+
						       "</div>");
			if(this.cfg.hasMask){
				this._mask=$("<div class='window_mask'></div>");
				this._mask.appendTo($("body"));
			};
			if(this.cfg.hasCloseBtn){
				var closeBtn = $("<span class='window_closeBtn'>x</span>");
				closeBtn.appendTo(this.boundingBox);
			}
			this.boundingBox.appendTo('body');
		},
		bindUI:function(){
			var that = this;
			this.boundingBox.delegate(".window_close","click",function(){
				that.fire("alert");
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.fire("close");
				that.destroy();
			}).delegate('.window_confirmBtn','click',function(){
					that.fire('confirm');
					that.destroy();
			}).delegate('.window_cancelBtn','click',function(){
					that.fire('cancle');
					that.destroy();
			}).delegate(".window_promptBtn",'click',function(){
					that.fire("prompt");
					that.destroy();
			}).delegate('.window_cancelprompt','click',function(){
				that.fire("promptClose");
				that.destroy();
			})
			if(this.cfg.handlerForBtn){
				this.on("alert",this.cfg.handlerForBtn);
			}
			if(this.cfg.handlerForCloseBtn){
				this.on("close",this.cfg.handlerForCloseBtn);
			}
			if(this.cfg.handlerForConfirmBtn){
				this.on("confirm",this.cfg.handlerForConfirmBtn)
			}
			if(this.cfg.handlerForCancelBtn){
				this.on("cancle",this.cfg.handlerForCancelBtn)
			}
			if(this.cfg.handlerForPormpt){
				this.on("prompt",this.cfg.handlerForPormpt)
			}
			if(this.cfg.handerForCancelPrompt){
				this.on("promptClose",this.cfg.handerForCancelPrompt);
			}

		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+"px",
				left:this.cfg.x || ($(window).width()-this.cfg.width)/2+"px",
				top:this.cfg.y || ($(window).height()-this.cfg.height)/2+"px"
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass("window_skin_"+this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
				
			}

		},
		destructor:function(){
			this._mask && this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt:function(cfg){
			$.extend(this.cfg,cfg,{winType:'prompt'});
			this.render();
			return this;
		}
	})

	return {
		Window:Window
	}
})