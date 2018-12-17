(function($)
{
	/**
	 * 文本域字段容器
	 * 匹配textarea元素
	 */
	$.widget("mc.TextAreaContainer", $.mc.FieldContainer,
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
		 * @override
		 * 检查field容器内html结构是否符合创建组件要求，由子类实现
		 * 由FormContainer调用检查
		 * 应当有且仅有一个textarea
		 * @param	$element	td元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("td"))
			{
				return false;
			}

			var $arrayTextArea = $element.children("textarea");
			if ($arrayTextArea.size() != 1)
			{
				return false;
			}

			return true;
		},

		/**
		 * @override
		 * 解析field组件
		 * 解析field组件Html dom，存放this_fieldHtmlDom
		 * 解析field widget组件instance，存放在this._fieldComponentInstance
		 * @return	void
		 */
		_parseFieldComponent : function()
		{
			this._fieldHtmlDom = this.element.children("textarea").eq(0);
		},

		/**
		 * @override
		 * 调整容器内field组件尺寸，由子类实现
		 * @return	void
		 */
		resize : function()
		{
			var $textarea = this.getFieldHtmlDom();

			var padding_left = $textarea.css("padding-left").replace("px", "");
			var padding_right = $textarea.css("padding-right").replace("px", "");
			var border_left_width = $textarea.css("border-left-width").replace("px", "");
			var border_right_width = $textarea.css("border-right-width").replace("px", "");

			var textarea_width = this.element.width() - padding_left - padding_right - border_left_width - border_right_width;
			$textarea.width(textarea_width);
		},
		/**
		 * @override
		 * 取字段id，由子类实现
		 * @return	string
		 */
		getFieldId : function()
		{
			return this.getFieldHtmlDom().attr("id");
		},
		/**
		 * @override
		 * 获取原生值
		 * @return	string
		 */
		getRawValue : function()
		{
			return this.getValue();
		},
		/**
		 * @override
		 * 设置原生值
		 * @param	value	string
		 * @return	void
		 */
		setRawValue : function(value)
		{
			this.setValue(value);
		},
		/**
		 * @override
		 * 取值
		 * @return	string
		 */
		getValue : function()
		{
			return this.getFieldHtmlDom().val();
		},
		/**
		 * @override
		 * 设值
		 * @param	value	string
		 * @return	void
		 */
		setValue : function(value)
		{
			this.getFieldHtmlDom().val(value); 
		}
	});
})(jQuery);