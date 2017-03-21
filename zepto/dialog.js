;(function($){
	var Dialog = function(config){
		var _this = this;
	
		//默认配置参数
		this.config = {
			//对话框类型
			type:'loading',
			//弹出框延时关闭时间
			delay:null,
			buttons:null,
			message:null,
			width:'auto',
			maskOpacity:null,
			effect:false
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			this.config = $.extend(this.config,config);
		}else{
			this.isConfig = true;
		}

		//创建基本的dom
		this.body = $("body");
		//创建遮罩层
		this.mask = $('<div class="g-dialog-container">');
		this.win = $('<div class="dialog-window">');
		this.winHeader= $('<div class="dialog-header">');
		this.winContent= $('<div class="dialog-content">');
		this.winFooter = $('<div class="dialog-footer">');
		this.create();
	}

	Dialog.prototype = {
		animation:function(){
			this.win.css("-webkit-transform","scale(0,0)");
			var _this = this;
			setTimeout(function(){
				_this.win.css("-webkit-transform","scale(1,1)");
			},100)
			
		},
		create:function(){
			var _this = this,
			config = this.config,
			mask = this.mask,
			win = this.win,
			header = this.winHeader,
			content = this.winContent,
			footer = this.winFooter,
			body = this.body;
			if(this.width !== "auto"){
				win.width(this.width);
			}
			if(this.isConfig){
				header.addClass("loading");
				if(config.effect){
					this.animation()
				}
				win.append(header);
				mask.append(win);
				body.append(mask);
			}else{
				header.addClass(config.type);
				win.append(header);
				if(config.message){
					content.text(config.message);
					win.append(content);
				}
				if(config.buttons){
					this.createButtons(footer,config.buttons);
					win.append(footer);
				}

				if(config.delay){
					setTimeout(function(){
						_this.close();
					},config.delay)
				}
				if(config.maskOpacity){
					mask.css(backgroundColor,"rgb(0,0,0,"+config.maskOpacity+")")
				}

				mask.append(win);
				body.append(mask);
				if(config.effect){
					this.animation()
				}

			}
			
		},
		createButtons:function(footer,buttons){
			var _this = this;
			$(buttons).each(function(i){
				var type = this.type?this.type:"button"+(++i);
				var text = this.text?this.text:"";
				var callback = this.callback?this.callback:null;
				var button = $("<button class='"+type+"'>"+text+"</button>");
				if(callback){
					button.tap(function(){
						var isClose = callback();
						if(isClose !== false){
							_this.close();
						}
					})
				}else{
					button.tap(function(){
						_this.close();
					})
				}
				footer.append(button);

			})
		},
		close:function(){
			this.mask.remove();
		},
		doIt:function(button,callback){
			button.tap(function(){
				callback();
			})
		}

	}

	window.Dialog = Dialog;
	$.dialog = function(config){
		return new Dialog(config);
	}
})(Zepto)