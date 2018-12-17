/**
 * 数值输入组件
 * 基于jQuery-UI.widget
 * 只允许输入数字和小数点
 * 显示为靠右对齐，千分位
 * 允许设置千分位开关
 */
(function($)
{
	$.widget("mc.NumberField", $.mc.MoneyField,
	{
		version: "1.12.1",
		defaultElement : "<input>",
		/**
		 * 默认设置
		 */
		options :
		{
			decimal : 0,			/* 小数位数据 */
			thousands : false		/* 千分位开关 */
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this.options.currency_sign = "";

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
		 * 实际值转为显示值
		 * 增加千分位，四舍五入保留2位
		 */
//		valueToDisplay : function(value)
//		{
//			/* 获取小数型数据 */
//			var s = value; 
//			var b = parseFloat(s);
//			if ( (! _.isNumber(b)) || _.isNaN(b))
//			{
//				b = 0;
//			}
//			s = Number(b).toFixed(2);
//
//			s += "";
//			if (s.indexOf(".") == -1)
//			{
//				s += ".0"; 	/* 如果没有小数点，在后面补个小数点和0 */
//			}
//
//			if (/\.\d$/.test(s))
//			{
//				s += "0"; 			/* 正则判断 */
//			}
//
//			if (this.options.thousands)
//			{
//				while (/\d{4}(\.|,)/.test(s))
//				{
//					/* 符合条件则进行替换 */
//					s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); /* 每隔3位添加一个 */
//				}
//			}
//
//			return s;
//		},
	});
})(jQuery);