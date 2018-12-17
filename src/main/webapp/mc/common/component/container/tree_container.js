(function($)
{
	/**
	 * 树组件容器
	 */
	$.widget("mc.TreeContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "tree",
		/**
		 * 默认设置
		 */
		options :
		{
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destory : function()
		{
			this._super();
		},


		/**
		 * @override	实现接口
		 * 检查当前html元素是否符合创建容器要求
		 * div，且拥有class=mc-tree-container
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("div"))
			{
				return false;
			}

			if (! $element.hasClass("mc-tree-container"))
			{
				return false;
			}

			return true;	
		},

		/**
		 * 调整容器内组件尺寸，由各子类实现
		 */
		resize : function()
		{
			mc.console.log("resize, " + this.getWidgetFullName() + ", " + this.element[0].tagName + ", " + this.element[0].id);
		}
	});

	MCloud.layout.ContainerMgr.register($.mc.TreeContainer.prototype.getWidgetFullName(),
	{
		fullName : "mc.TreeContainer",
		name : $.mc.TreeContainer.prototype.getWidgetName()
	});
})(jQuery);