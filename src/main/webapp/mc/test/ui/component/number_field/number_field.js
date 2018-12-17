(function($)
{
	$.widget("mc.NumberField",
	{
		version : "1.0.0",
		defaultElement : "<input>",
		/**
		 * 默认设置
		 */
		options : {},
		_create : function()
		{
		},
		_init : function()
		{
			var _this = this;

			this.element.bind("input propertychange", function(event)
			{
				_this.numbox_propertychange(event.target);
			});
			
			/**
			 * 获得焦点，取消千分位
			 */
			this.element.focus(function()
			{
				var $a = $(this).val().replace(/,|\s/g, '');
				$(this).val($a);
			});

			/**
			 * 失去焦点，增加千分位
			 */
			this.element.blur(function()
			{
				var $b = _this.convertThousand($(this).val());
				$(this).val($b);
			});
		},
		destory : function()
		{
			$.Widget.prototype.destroy.call(this);
		},
		// 属性值变化事件，约束输入
		numbox_propertychange : function(numbox)
		{
			if (numbox.value == '-' || numbox.value == numbox.oldvalue) return;
			var numvalue = Number(numbox.value);
			if (isNaN(numvalue))
			{
				/**
				 * 不合法，恢复原值
				 */
				numbox.value = numbox.oldvalue;
			}
			else
			{
				/**
				 * 合法数字值
				 */
				numbox.oldvalue = numbox.value;
			}
		},
		/**
		 * 增加千分位，四舍五入保留2位
		 */
		convertThousand : function(money)
		{
			var s = money; // 获取小数型数据

			var b = parseFloat(s);
			s = Number(b).toFixed(2);

			s += "";
			if (s.indexOf(".") == -1) s += ".0"; // 如果没有小数点，在后面补个小数点和0
			if (/\.\d$/.test(s)) s += "0"; // 正则判断
			while (/\d{4}(\.|,)/.test(s))
			{
				// 符合条件则进行替换
				s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); // 每隔3位添加一个
			}

			return s;
		}
	});
})(jQuery);


(function($)
{
	// 数值输入框
	$.fn.numbox = function(options)
	{
		var type = (typeof options);
		if (type == 'object')// 创建numbox对象
		{
			if (options.width) this.width(options.width);
			if (options.height) this.height(options.height);
			this.bind("input propertychange", function(obj)
			{
				numbox_propertychange(obj.target);
			});
			this.bind("change", function(obj)
			{
				var onChange = options.onChange;
				if (!onChange) return;
				var numValue = Number(obj.target.value);
				onChange(numValue);
			});
			this.bind("hide", function(obj)
			{
				var onHide = options.onHide;
				if (!onHide) return;
				var numValue = Number(obj.target.value);
				onHide(numValue);
			});
			return this;
		}
		else if (type == 'string')
		{
			/* type为字符串类型，代表调用numbox对象中的方法 */
			var method = eval(options);
			if (method) return method(this, arguments);
		};
		getValue = function()
		{
			return 100;
		}
	}
	// 属性值变化事件
	function numbox_propertychange(numbox)
	{
		alert("numbox_propertychange");
		
		if (numbox.value == '-' || numbox.value == numbox.oldvalue) return;
		var numvalue = Number(numbox.value);
		if (isNaN(numvalue))
		{
			numbox.value = numbox.oldvalue;
		}
		else
		{
			numbox.oldvalue = numbox.value;
		}
	}
	// 获取值
	function getValue(numbox)
	{
		var value = numbox.val();
		return Number(value);
	}
	// 设置值
	function setValue(numbox, params)
	{
		if (params[1] == undefined) return;
		var numvalue = Number(params[1]);
		if (!isNaN(numvalue))
		{
			for (var i = 0; i < numbox.length; i++)
			{
				numbox[i].focus();
				numbox[i].value = numvalue;
				numbox[i].oldvalue = numvalue;
			}
		}
	}
})(jQuery);

$(function()
{
	$("#number1").NumberField();

	$("#number2").numbox(
	{
		width : 200,
		height : 30
	});

	$("#number3").MoneyField();

	$("#datefield").datepicker();

//	$.fn.numbox().setValue($("#number2"), 100);

	$("#btnHtml_getID").click(function(event)
	{
		alert($("#number1").val());
		
//		var x = $("#number2").numbox({
//			width : 200,
//			height : 30
//		});
//
//		var y = x.getValue();
//
//		alert(x);
	})

	$("#btnHtml_getText").click(function(event)
	{
		$("#number1").val("111.2222");
		$("#number1").trigger("input");
		$("#number1").trigger("propertychange");
//		$("#btnHtml_getID").trigger("click");
	})
});