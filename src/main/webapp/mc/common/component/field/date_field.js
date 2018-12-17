/**
 * mc框架组件
 * DateField日期选择组件
 * 基于jQuery，包含了jQuery-UI.datepicker
 * 原始dom为<input class='mc-input'>
 * 生成的dom为<>
 * 	<div class="mc-date-field">
 *		<input id="date" type="text" class="mc-input" title="">
 *		<i class="fa fa-calendar"></i>
 *	</div>
 */
(function($)
{
	/**
	 * 中文化
	 */
	$.datepicker.regional["zh-CN"] =
	{
		closeText : "关闭",
		prevText : "&#x3c;上月",
		nextText : "下月&#x3e;",
		currentText : "今天",
		monthNames : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
		monthNamesShort : [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ],
		dayNames : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
		dayNamesShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
		dayNamesMin : [ "日", "一", "二", "三", "四", "五", "六" ],
		weekHeader : "周",
		dateFormat : "yy-mm-dd",
		firstDay : 1,
		isRTL : !1,
		showMonthAfterYear : !0,
		yearSuffix : "年"
	};

	$.datepicker.setDefaults($.datepicker.regional["zh-CN"]);

	$.widget("mc.DateField", $.mc.BaseWidget,
	{
		version: "1.12.1",
		defaultElement: "<input>",
		/**
		 * 默认设置
		 */
		options :
		{
			dateFormat : "yy-mm-dd"		/* 日期显示格式 */
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			this.element.wrap("<div class='mc-date-field'></div>");
			this.element.after("<i class='fa fa-calendar'></i>");
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();

			this.element.datepicker(this.options);
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destory : function()
		{
			this.element.datepicker("destroy");

			/**
			 * to-do删除dom
			 */
			this._super();
		},
		getDate : function()
		{
			return this.element.datepicker("getDate");
		},
		setDate : function(date)
		{
			this.element.datepicker("setDate", date);

			return this;
		},
		dialog : function(date, onSelect, options, pos)
		{
			return this.element.datepicker("dialog", date, onSelect, options, pos);
		},
		hide : function()
		{
			this.element.datepicker("hide");
		},
		show : function()
		{
			this.element.datepicker("show");
		},
		option : function(optionName, value)
		{
			return this.element.datepicker("option", optionName, value);
		},
		isDisabled : function()
		{
			return this.element.datepicker("isDisabled");
		},
		disable : function()
		{
			this.element.parent().attr("disabled", "disabled");
			this.element.datepicker("option", "disabled", true);
			this.element.next().attr("disabled", "disabled");

			return this;
		},
		enable : function()
		{
			this.element.parent().removeAttr("disabled");
			this.element.datepicker("option", "disabled", false);
			this.element.next().removeAttr("disabled");

			return this;
		},
		refresh : function()
		{
			this.element.datepicker("refresh");
		}
	});
})(jQuery);