(function($)
{
	/**
	 * 字段容器基类
	 * 提供字段组件初始化和调整尺寸的功能
	 * 对外开放：
	 * 	1)检查html接口
	 * 	2)调整尺寸外部接口resize()
	 */
	$.widget("mc.FieldContainer", $.mc.Container,
	{
		/**
		 * @override
		 */
		version: "1.12.1",
		/**
		 * @override
		 */
		defaultElement: "<td>",
		/**
		 * @override
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

			this._parseFieldComponent();

			this.element.data("mc-field-container-fullname", this.getWidgetFullName());
			this.element.data("mc-field-container-name", this.getWidgetName());
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
		 * @abstract
		 * 检查field容器内html结构是否符合创建组件要求，由子类实现
		 * 由FormContainer调用检查
		 * @param	$element	td元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : $.noop,

		/**
		 * @abstract
		 * 解析field组件，由子类实现
		 * 解析field组件Html dom，存放this_fieldHtmlDom
		 * 解析field widget组件instance，存放在this._fieldComponentInstance
		 * @return	void
		 */
		_parseFieldComponent : $.noop,
		/**
		 * field组件html dom
		 */
		_fieldHtmlDom : null,
		getFieldHtmlDom : function()
		{
			return this._fieldHtmlDom;
		},
		/**
		 * field组件实例对象
		 */
		_fieldComponentInstance : null,
		getFieldComponentInstance : function()
		{
			return this._fieldComponentInstance;
		},

		/**
		 * @abstract
		 * 调整容器内field组件尺寸，由子类实现
		 * @return	void
		 */
		resize : $.noop,
		/**
		 * @abstract
		 * 获取field组件id，由子类实现
		 * @return	string
		 */
		getFieldId : $.noop,
		/**
		 * @abstract
		 * 获取原生值，由子类实现
		 * @return	mix
		 */
		getRawValue : $.noop,
		/**
		 * @abstract
		 * 设置原生值，由子类实现
		 * @return	mix
		 */
		setRawValue : $.noop,
		/**
		 * @abstract
		 * 取值，由子类实现
		 * @return	mix
		 */
		getValue : $.noop,
		/**
		 * @abstract
		 * 设值，由子类实现
		 * @param	value	mix
		 * @return	void
		 */
		setValue : $.noop
	});
})(jQuery);