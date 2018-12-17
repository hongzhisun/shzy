(function($)
{
	/**
	 * 普通布局容器
	 * 仅包含下级容器，无布局。用于传递控制信息。
	 * 支持自适应布局和滚动布局，内部可包含任意布局容器
	 * 可包含其他布局容器，如边界布局容器、对话框容器、选项卡容器
	 * 也可包含组件容器，如工具栏容器、表单容器、表格组件容器、树组件容器
	 * <div><div></div></div>
	 */
	$.widget("mc.PlainContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "plain",
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

			this._layout_self();

			this._layout_inner();
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
		 * div或body即可
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if ((! $element.is("div")) && (! $element.is("body")))
			{
				return false;
			}

			return true;
		},
		/**
		 * @private
		 * 自身布局
		 */
		_layout_self : function()
		{
			if (this.element.hasClass("mc-dialog-container"))
			{
				this._isDialog = true;
			}
		},
		/**
		 * @private
		 * 子容器布局
		 * 递归
		 */
		_layout_inner : function()
		{
			var _self = this;
			var $children = this.element.children("div");
			$children.each(function(index)
			{
				var $div_child = $(this);

				mc.layout.layout_core($div_child, _self, _self.options, false);
			});
		},

		/**
		 * @override		实现接口
		 * 调整容器尺寸方法
		 * 递归调整下级容器的resize方法
		 */
		resize : function()
		{
			mc.console.log("resize, " + this.getWidgetFullName() + ", " + this.element[0].tagName + ", " + this.element[0].id);

			/**
			 * 遍历子容器
			 */
			if (this.getChildrenContainerInstance() != null && $.isArray(this.getChildrenContainerInstance()))
			{
				for (var i = 0; i < this.getChildrenContainerInstance().length; i++)
				{
					var $wd_child_container_inst = this.getChildrenContainerInstance()[i];
					$wd_child_container_inst.resize();
				}
			}
		}
	});
})(jQuery);