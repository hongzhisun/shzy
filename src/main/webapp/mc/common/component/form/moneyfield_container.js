(function($)
{
	/**
	 * 文本字段容器
	 */
	$.widget("mc.MoneyFieldContainer", $.mc.FieldContainer,
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
		 * 检查field容器内html结构是否符合创建组件要求
		 * 由FormContainer调用检查
		 * 应当有且仅有一个input，且type不是radio或checkbox
		 * input上已创建NumberField或MoneyField
		 * @param	$element	td元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("td"))
			{
				return false;
			}

			var $arrayInput = $element.children("input");
			if ($arrayInput.size() != 1)
			{
				return false;
			}

			var $input = $arrayInput.eq(0);
			var inputType = $input.attr("type");
			if (inputType == "radio" || inputType == "checkbox")
			{
				return false;
			}
			
			var wgFullName = $input.data("mc-wg-fullname");
			if (wgFullName == "mc-MoneyField" || wgFullName == "mc-NumberField")
			{
				return true;
			}
			else
			{
				return false;
			}
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
			this._fieldHtmlDom = this.element.children("input").eq(0);

			var wgFullName = this._fieldHtmlDom.data("mc-wg-fullname");
			this._fieldComponentInstance = this._fieldHtmlDom.data(wgFullName);
		},

		/**
		 * @override
		 * 调整容器内field组件尺寸
		 * @return	void
		 */
		resize : function()
		{
			var $input = this.getFieldHtmlDom();

			var padding_left = $input.css("padding-left").replace("px", "");
			var padding_right = $input.css("padding-right").replace("px", "");
			var border_left_width = $input.css("border-left-width").replace("px", "");
			var border_right_width = $input.css("border-right-width").replace("px", "");

			var input_width = this.element.width() - padding_left - padding_right - border_left_width - border_right_width;
			$input.width(input_width);
		},
		/**
		 * @override
		 * 取字段id
		 * @return	string
		 */
		getFieldId : function()
		{
			return this.getFieldHtmlDom().attr("id");
		},
		/**
		 * @override
		 * 获取原生值
		 * @return	number
		 */
		getRawValue : function()
		{
			return this.getValue();
		},
		/**
		 * @override
		 * 设置原生值
		 * @param	value	number/string
		 * @return	void
		 */
		setRawValue : function(value)
		{
			this.setValue(value);
		},
		/**
		 * @override
		 * 取值
		 * @return	number
		 */
		getValue : function()
		{
			return this.getFieldComponentInstance().getValue();
		},
		/**
		 * @override
		 * 设值
		 * @param	value	number/string
		 * @return	void
		 */
		setValue : function(value)
		{
			this.getFieldComponentInstance().setValue(value);
		}
	});
})(jQuery);