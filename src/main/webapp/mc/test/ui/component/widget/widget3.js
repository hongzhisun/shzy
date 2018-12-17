initLayout = function()
{
	mc.layout.init();
	
//	var $a = $("#panel_center");
//	alert($a instanceof jQuery);
//	var $b = $a.BorderContainer();
//	alert($b instanceof jQuery);
//	alert($a[0] == $b[0]);
};

init = function()
{
	$.widget("mc.A", $.mc.BaseWidget,
	{
		_money : 100,
		money : function(money)
		{
			if (money == undefined)
			{
				return this._money;
			}
			else
			{
				this._money = money;
			}
		},
		kk : function()
		{
			return this.widgetName;
		}
	});

	$.widget("mc.B", $.mc.A,
	{
	});

//	var $A = $("#panel_left").A();
//	alert($A.A("money"));
//	$A.A("money", 200);
//	alert($A.A("money"));

	var $wg_B = $("#panel_left").B();
	var $element = $("#panel_left");
//	alert($wg_B.B("money"));
//	$wg_B.B("money", 300);
//	var $wg_common = $wg_B;
//	alert($B.B("money"));

//	$B.A("money", 500);
//	alert($B.B("money"));
//	alert($B.B("kk"))

//	alert($("body").widget(""));
//	alert($.mc.A.prototype.widgetName);
//	alert($("body").data("B").kk()); 

	//获取widget实例
//	var fullName = "mc-B";
//	var instance = $.data( $("#panel_left")[0], fullName );
//	alert(typeof(instance))
//	alert(instance.widgetName);
//	alert(instance.money()); 
	
//	alert($wg_common.B("money"));

//	alert($("#panel_left").Widget("kk"));
//	return;

//	var fullName = "mc-B";
//	var instance = $.data( $("#panel_left")[0], fullName );
//	$wg_common = instance;
//	var widgetName = $wg_common.widgetName;
//	alert($wg_common.money());
//	return;
//	var js = "var money = $wg_common." + widgetName + "('money')";
//	eval(js);
//	alert(moeny);

//	alert($wg_B.B("getNamespace"));
//	alert($wg_B.B("getWidgetName"));
//	alert($wg_B.B("getWidgetFullName"));

//	var instance1 = $wg_B.B("getInstance");

//	var fullName = $wg_B.B("getWidgetFullName");
//	alert("fullName=" + fullName);
//	var instance2 = $.data($wg_B[0], fullName);
//	var instance3 = instance2.getInstance();

//	alert(instance1 == null);
//	alert(instance2 == null);
	
//	alert(instance1.getWidgetFullName());
//	alert(instance2.getWidgetFullName());

//	var i = 1;
//	var fullName = $wg_B.B("getWidgetFullName");
//	alert(fullName);
//	var instance = $.data($wg_B[0], this.widgetFullName);
//	alert(instance.getWidgetFullName());

	$("#btnTest").click(function(event)
	{
		var instance1 = $wg_B.B("getInstance");
		var instance2 = $element.B("getInstance");

		var fullName = $wg_B.B("getWidgetFullName");
		var instance3 = $.data($wg_B[0], fullName);
		var instance4 = instance2.getInstance();
		var instance5 = $wg_B.B("option", "instance")
		
		alert(instance1.getWidgetFullName());
		alert(instance2.getWidgetFullName());
		alert($wg_B[0] == $element[0]);
		var i = 1;
	});
};

init2 = function()
{
	$("body").BorderContainer();
	var $inst1 = $("body").BorderContainer("instance");

	$("#panel_center").BorderContainer();
	var $inst2 = $("#panel_center").BorderContainer("instance");

//	alert("$inst1.x=" + $inst1.x);
//	alert("$inst2.x=" + $inst2.x);
//	$inst1.x = 10;
//	alert("$inst1.x=" + $inst1.x);
//	alert("$inst2.x=" + $inst2.x);

	
	alert("$inst1.c.length=" + $inst1._childrenContainerInstance.length);
	alert("$inst2.c.length=" + $inst2._childrenContainerInstance.length);
	$inst1._childrenContainerInstance.push({a : 1});
//	$inst1._childrenContainerInstance = [1, 2];
	alert("$inst1.c.length=" + $inst1._childrenContainerInstance.length);
	alert("$inst2.c.length=" + $inst2._childrenContainerInstance.length);

//	alert("$inst1.c.length=" + $inst1.options.childrenContainerInstance.length);
//	alert("$inst2.c.length=" + $inst2.options.childrenContainerInstance.length);
////	$inst1._childrenContainerInstance.push({a : 1});
//	$inst1.options.childrenContainerInstance.push({a : 1});
//	alert("$inst1.c.length=" + $inst1.options.childrenContainerInstance.length);
//	alert("$inst2.c.length=" + $inst2.options.childrenContainerInstance.length);

//	alert("$inst1.y=" + $inst1.y);
//	alert("$inst2.y=" + $inst2.y);
//	$inst1.y = 10;
//	alert("$inst1.y=" + $inst1.y);
//	alert("$inst2.y=" + $inst2.y);

//	$("body").BorderContainer("getChildrenContainerInstance").push({a : 1});
//	alert($("body").BorderContainer("getWidgetFullName"));
//
//	$("#panel_center").BorderContainer();
//	alert($("panel_center").BorderContainer("getWidgetFullName"));
//
//	$("#panel_right").GridContainer();
//	alert($("panel_right").GridContainer("getWidgetFullName"));
};

$(function()
{
	initLayout();

//	init();

//	init2();
});