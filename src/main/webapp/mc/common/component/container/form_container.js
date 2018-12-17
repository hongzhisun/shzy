(function($)
{
	/**
	 * form容器
	 */
	$.widget("mc.FormContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "form",
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

			this._createFieldContainer();

			this.resize();
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
		 * div，且拥有class=mc-form-container
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("div"))
			{
				return false;
			}

			if (! $element.hasClass("mc-form-container"))
			{
				return false;
			}

			return true;	
		},

		/**
		 * 创建字段容器
		 */
		_createFieldContainer : function()
		{
			var $arrayTD = $("td", this.element);

			$arrayTD.each(function(index, dom)
			{
				var $td = $(this);

//				var wg_field_container_fullname = $td.data("mc-field-container-fullname");
				
//				if (wg_field_container_fullname != undefined || wg_field_container_fullname != null || wg_field_container_fullname != "")
//				{
//					return;
//				}

				if ($.mc.ComboBoxContainer.prototype.checkHtml($td))
				{
					$td.ComboBoxContainer();
					return;
				}

				if ($.mc.DialogFieldContainer.prototype.checkHtml($td))
				{
					$td.DialogFieldContainer();
					return;
				}

				if ($.mc.DateFieldContainer.prototype.checkHtml($td))
				{
					$td.DateFieldContainer();
					return;
				}

				if ($.mc.TextAreaContainer.prototype.checkHtml($td))
				{
					$td.TextAreaContainer();
					return;
				}

				if ($.mc.MoneyFieldContainer.prototype.checkHtml($td))
				{
					$td.MoneyFieldContainer();
					return;
				}

				if ($.mc.TextFieldContainer.prototype.checkHtml($td))
				{
					$td.TextFieldContainer();
					return;
				}
			});

			this.parserLabel();
		},
		parserLabel : function()
		{
			var $arrayTH = $("th", this.element);
			$arrayTH.each(function(index, dom)
			{
				var $th = $(this);

				var str = $th.text();
				if ($.trim(str).length <= 0)
				{
					return;
				}

				var isKey = false;
				if (str.indexOf("*") >= 0 || str.indexOf("×") >= 0)
				{
					isKey = true
				}
				str = str.replace("*", "");
				str = str.replace("×", "");

				str = str.replace(":", "");
				str = str.replace("：", "");
				var title = str;
				if (isKey)
				{
					title += "<span style='font-size:12px; color:red; vertical-align:middle; font-family: tahoma,arial,helvetica,sans-serif;'>*</span>";
				}
				title += "：";
				$th.html(title);
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

			var $arrayTD = $("td", this.element);

			$arrayTD.each(function(index, dom)
			{
				var $td = $(this);

				var wg_field_container_fullname = $td.data("mc-field-container-fullname");
				var $wg_field_container_inst = $td.data(wg_field_container_fullname);

				if ($wg_field_container_inst != null && $.isFunction($wg_field_container_inst.resize))
				{
					$wg_field_container_inst.resize();
				}
			});
		},
		/**
		 * @public
		 * 获取原生数据
		 * @return	object
		 */
		getRawData : function()
		{
			var data = {};

			var $arrayTD = $("td", this.element);

			$arrayTD.each(function(index, dom)
			{
				var $td = $(this);

				var wg_field_container_fullname = $td.data("mc-field-container-fullname");
				var $wg_field_container_inst = $td.data(wg_field_container_fullname);
				if ($wg_field_container_inst == null)
				{
					return;
				}

				if (wg_field_container_fullname == "mc-TextFieldContainer"
					|| wg_field_container_fullname == "mc-MoneyFieldContainer"
					|| wg_field_container_fullname == "mc-TextAreaContainer"
					|| wg_field_container_fullname == "mc-DateFieldContainer"
					|| wg_field_container_fullname == "mc-ComboBoxContainer"
					|| wg_field_container_fullname == "mc-DialogFieldContainer")
				{
					var fieldId = $wg_field_container_inst.getFieldId();
					if (fieldId != null && fieldId != undefined && typeof(fieldId) == "string")
					{
						var value = $wg_field_container_inst.getRawValue();
						data[fieldId] = value;
					}
				}
			});

			return data;
		},
		/**
		 * @public
		 * 设置原生数据
		 * @return	object
		 */
		setRawData : function(data)
		{
			
		},
		/**
		 * @public
		 * 获取数据
		 * @return	object
		 */
		getData : function()
		{
			var data = {};

			var $arrayTD = $("td", this.element);

			$arrayTD.each(function(index, dom)
			{
				var $td = $(this);

				var wg_field_container_fullname = $td.data("mc-field-container-fullname");
				var $wg_field_container_inst = $td.data(wg_field_container_fullname);
				if ($wg_field_container_inst == null)
				{
					return;
				}

				if (wg_field_container_fullname == "mc-TextFieldContainer"
					|| wg_field_container_fullname == "mc-MoneyFieldContainer"
					|| wg_field_container_fullname == "mc-TextAreaContainer"
					|| wg_field_container_fullname == "mc-DateFieldContainer"
					|| wg_field_container_fullname == "mc-ComboBoxContainer"
					|| wg_field_container_fullname == "mc-DialogFieldContainer")
				{
					var fieldId = $wg_field_container_inst.getFieldId();
					if (fieldId != null && fieldId != undefined && typeof(fieldId) == "string")
					{
						var value = $wg_field_container_inst.getValue();
						data[fieldId] = value;
					}
				}
			});

			return data;
		},
		/**
		 * @public
		 * 设置数据
		 * @param	data	数据对象
		 */
		setData : function(data)
		{
			
		},
		/**
		 * @public
		 * 设置数据
		 * @param	config
		 * @return	boolean
		 */
		validate : function(config)
		{
			return true;
		}
	});

	MCloud.layout.ContainerMgr.register($.mc.FormContainer.prototype.getWidgetFullName(),
	{
		fullName : "mc.FormContainer",
		name : $.mc.FormContainer.prototype.getWidgetName()
	});
})(jQuery);