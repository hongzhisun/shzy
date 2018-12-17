(function($)
{
	/**
	 * 文本字段容器
	 */
	$.widget("mc.DialogFieldContainer", $.mc.FieldContainer,
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
		 * 应当有且仅有一个div，class='mc-dialog-field'或'mc-dialog-field2'，内部有一个input
		 * @param	$element	td元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("td"))
			{
				return false;
			}

			var $arrayDiv = $element.children("div");
			var $div = null;
			var find = false;
			for (var i = 0; i < $arrayDiv.size(); i++)
			{
				var $div = $arrayDiv.eq(i);
				if ($div.hasClass("mc-dialog-field") || $div.hasClass("mc-dialog-field2"))
				{
					find = true;
					break;
				}
			}
			if (! find)
			{
				return false;
			}

			var $arrayInput = $div.children("input");
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
			this._fieldHtmlDom = this.element.find("input").eq(0);

			var wgFullName = this._fieldHtmlDom.data("mc-wg-fullname");
			this._fieldComponentInstance = this._fieldHtmlDom.data(wgFullName);
		},

		/**
		 * @override
		 * 调整容器内field组件尺寸，由子类实现
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
		 * 获取field组件id
		 * @return	string
		 */
		getFieldId : function()
		{
			return this.getFieldHtmlDom().attr("id");
		},
		/**
		 * @override
		 * 获取原生值
		 * @return	object
		 */
		getRawValue : function()
		{
			return this.getFieldComponentInstance().data();
		},
		/**
		 * @override
		 * 设置原生值
		 * @param	value	object
		 * @return	void
		 */
		setRawValue : function(value)
		{
			this.getFieldComponentInstance().data(value);
		},
		/**
		 * @override
		 * 取值
		 * @return	string
		 */
		getValue : function()
		{
			return this.getFieldComponentInstance().id();
		},
		/**
		 * @override
		 * 设值
		 * @param	value	object
		 * @return	void
		 */
		setValue : function(value)
		{
			this.setRawValue(value);
		}
	});
})(jQuery);