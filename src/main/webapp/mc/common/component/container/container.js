(function($)
{
	/**
	 * 布局容器基类
	 * 抽象类
	 * 定义了布局容器的行为动作
	 * 支持容器嵌套
	 * 需子类实现以下接口：
	 * checkHtml($element)：检查当前html元素是否符合创建容器要求，由子类实现
	 * resize()：支持调整尺寸外部接口
	 */
	$.widget("mc.Container", $.mc.BaseWidget,
	{
		version: "1.12.1",
		defaultElement: "<div>",
		/**
		 * 初始化参数root
		 */
		options_root : "",
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

			this.element.data("mc-container-fullname", this.getWidgetFullName());
			this.element.data("mc-container-name", this.getWidgetName());

			/**
			 * 子容器集合初始化
			 */
			this._childrenContainer = new Array();
			this._childrenContainerInstance = new Array();
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
		 * 父容器widget实例
		 */
		_parentContainerInstance : null,
		/**
		 * 访问父容器widget实例
		 */
		parentContainerInstance : function(parentContainerInstance)
		{
			if (parentContainerInstance == undefined)
			{
				return this._parentContainerInstance;
			}
			else
			{
				this._parentContainerInstance = parentContainerInstance;
			}
		},

		/**
		 * 子容器dom集合
		 */
		_childrenContainer : null,
		/**
		 * 访问子容器dom集合
		 */
		getChildrenContainer : function()
		{
			return this._childrenContainer;
		},
		/**
		 * 子容器widget实例集合
		 */
		_childrenContainerInstance : null,
		/**
		 * 访问子容器widget实例集合
		 */
		getChildrenContainerInstance : function()
		{
			return this._childrenContainerInstance;
		},

		/**
		 * 是否对话框
		 */		
		_isDialog : false,
		isDialog : function()
		{
			return this._isDialog;
		},

		/**
		 * @abstract
		 * 检查当前html元素是否符合创建容器要求，由子类实现
		 * 由LayoutUitl调用检查
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : $.noop,

		/**
		 * @abstract
		 * 调整容器尺寸方法
		 * 应当调整容器内组件尺寸、或递归调整下级容器的resize方法
		 * 由各子类实现
		 */
		resize : $.noop
	});
})(jQuery);