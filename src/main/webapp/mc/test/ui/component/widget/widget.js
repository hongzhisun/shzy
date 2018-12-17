/**
 * 自调用匿名函数
 */
;(function()
{
	$.fn.setColor = function(options)
	{
		var defaultSettings =
		{
			color : "red",
			fontSize : "12px"
		};

		var settings = $.extend({}, defaultSettings, options);

		this.css(
		{
			color : settings.color,
			fontSize : settings.fontSize
		});
	};
})();


(function($)
{
	// ui默认采用jquery的ui前缀，后面的是widget名称
	$.widget("ui.textboxdecorator",
	{
		// 此widget中没有options
		options : {},
		_init : function()
		{
			// 验证是否是需要装饰的元素
			if (!(this.element.attr("tagName").toLowerCase() === "input" || this.element.attr("tagName")
					.toLowerCase() === "textarea"))
			{
				return;
			}

			if (!(this.element.attr("type").toLowerCase() === "text" || this.element.attr("type")
					.toLowerCase() === "password"))
			{
				if (this.element.attr("tagName").toLowerCase() === "input") return;
			}

			// this.element也就是调用此widget的元素
			var e = this.element;

			// ui-widget widget基本的样式，ui-state-default。默认状态的样式；ui-
			// corner-all 圆角（基于css3，ie下不起作用）
			this.element.addClass("ui-widget ui-state-default ui-corner-all");
			// 添加hover效果和active效果
			this.element.mouseover(function()
			{
				e.addClass("ui-state-hover");
			}).mouseout(function()
			{
				e.removeClass("ui-state-hover");
			}).mousedown(function()
			{
				e.addClass("ui-state-active");
			}).mouseup(function()
			{
				e.removeClass("ui-state-active");
			});
		},
		// 销毁时，移除widget增加的样式
		destroy : function()
		{
			this.element
					.removeClass("ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active");
		}
	});
})(jQuery);
	

$(function()
{
	$("#btnTest1").click(function(event)
	{
		$("#aaa > span").setColor();
	});

	$("#btnTest2").click(function(event)
	{
		$("#aaa > span").setColor(
		{
			color : "yellow"
		});
	});

	$("#btnTest3").click(function(event)
	{
		$("#aaa > span").setColor(
		{
			color : "blue",
			fontSize : "20px"
		});
	});

	$("#combobox").combobox(
	{
		url : "../../../../../demo/ui/province/list",
/*		url : "demo/ui/province/list",*/
		data_key : "id",
		data_text : "name"	
	});

	$("#combobox2").combobox(
	{
		url : "../../../../../demo/ui/province/list2",
		data_key : "id",
		data_text : "name"
	});

	$("#btnTest4").click(function(event)
	{
		var combobox = $("#combobox");
		combobox.combobox("key");
	});

	$("#btnTest5").click(function(event)
	{
		var combobox = $("#combobox2");
		combobox.combobox("refresh");

	});

	$("#btnTest6").click(function(event)
	{
		alert($("#combobox").combobox("option", "url"));
		alert($("#combobox2").combobox("option", "url"));

		alert($("#combobox").combobox("loaded"));
		alert($("#combobox2").combobox("loaded"));
	});
});


