+function($){
	function ScrollSpy(element,option){
		var process = $.proxy(this.process,this)

		this.$body = $("body")
		this.$scrollElement = $(element).is('body')?$(window) : $(element)
		this.options = $.extend({},ScrollSpy.DEFAULT,options)
		this.selector = (this.options.target || '')+' .nav li>a'//这是点击后跳转到相应位置的链接
		this.offsets = []
		this.targets = []
		thia.activeTarget = null
		this.scrollHeight = 0

		this.$scrollElement.on('scroll.bs.scrollspy',process);//滚动时会一直触发这个事件。
		this.refresh();
		this.process()
	}

	ScrollSpy.DEFAULT = {
		offset : 10;
	}

	ScrollSpy.prototype.getScrollHeight = function(){
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)
	}

	ScrollSpy.refresh = function(){
		var offsetMethod = 'offset'; //offset方法可返回top,left只对可见元素有效，offset是相对于当前视口的偏移
		var offsetBase = 0;
		if(!$.isWindow(this.$scrollElement)){
			offsetMethod = 'position'
			offsetBase = this.$scrollElement.scrollTop();//初始滚动高度
		}
		this.offsets = []
		this.targets = []//refresh之后这两个重新定义为空
		this.scrollHeight = this.getScrollHeight()
		var self = this
		this.$body
		.find(this.$selector)
		.map(function(){
			var $el = $(this)
			var href = $el.data('target') || $el.attr('href')
			var $href = /^#./.test(href) && $(href)

			return (
				$href
				&& $href.length
				&& $href.is(':visible')
				&& [[$href[offsetMethod]().top+offsetBase,href]]) || null
		})
		.sort(function(a,b){ return a[0] - b[0] })
		.each(function(){
			self.offsets.push(this[0])
			self.targets.push(this[1])
		})

	}

	ScrollSpy.prototype.process = function(){
		var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
		var scrollHeight = this.getScrollHeight()
		var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
		var offsets = this.offsets
		var targets = this.targets
		var activeTarget = this.activeTarget
		var i

		if(this.scrollHeight != scrollHeight){
			this.refresh();
		}

		if(scrollTop >= maxScroll){
			return activeTarget != (i = targets[targets.length -1]) && this.activate(i)
		}

		if(activeTarget && scrollTop < offsets[0]){
			this.activeTarget = null;
			return this.clear()
		}

		for(i = offsets.length; i--;){
			activeTarget != targets[i]
			&& scrollTop >= offsets[i]
			&& (!offsets[i + 1] || scrollTop <=offsets[i + 1])//i+1是最后一个
			&& this.activate(targets[i])
		}

	}
	ScrollSpy.prototype.activate = function(target){
		this.activeTarget = target;
		this.clear();
		var selector = this.selector + '[data-target = "'+target+'"],'+
		this.selector+'[href="'+target+'"]'

		var active = $(selector)//属性css查询
					.parents("li")
					.addClass("active")
		if(acitve.parent('.dropdown-menu').length){//如果是下拉菜单里的滚动监听，就要给这个下拉菜单也加上状态。
			active = active
				.closest("li.dropdown")
				.addClass('active')
			}
		active.trigger('active.bs.scrollspy')//触发事件这里可以添加一些可以做的动作。
	}

	ScrollSpy.prototype.clear = function(){
		$(this.selector)
		.parentsUntil(this.options.target,'.active')//this.options.target值得所有href="#XX"的父级元素。
		.removeClass('active');
	}


	function Plugin(option){
		return this.each(function(){//可能传入的是多个对象？
			var $this = $(this)
			var data = $this.data('bs.scrollspy')
			var options = typeof option == 'object' && option
			if(!data) $this.data('bs.scrollspy',(data = new ScrollSpy(this,options)))//直接生成
			if(typeof option == 'string') data[option]()//直接调用ScrollSpy的某个方法
		})
	}

	var old = $.fn.scrollspy
	$.fn.scrollspy  = Plugin
	$.fn.scrollspy.Constructor = ScrollSpy;
}(jQuery)