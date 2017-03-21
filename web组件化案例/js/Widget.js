define(function(){
	function Widget(){
	 this.boundingBox = null;
	};

	Widget.prototype={
		on: function(type,handler){
			if(typeof this.handlers[type] === "undefined"){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0, len = handlers.length; i < len; i++){
					handlers[i](data);
				}
			}
			return this;
		},
		renderUI:function(){},//接口，添加dom节点
		bindUI:function(){},//监听事件
		syncUI:function(){},//初始化组件属性
		render:function(container){ //渲染组件。
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || "body").append(this.boundingBox)
		},
		destructor:function(){},//销毁前处理函数
		destroy:function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}//销毁组件方法。
	}

	return {
		Widget: Widget
	}
})

//Widget设计统一生命周期。这是为了多人开发写出的组件一致。