init_Widget = function()
{
	$.widget("mc.A",
	{
		options :
		{
			x : 100,
			y : 200,
			pos : { m : 1000, n : 2000, p : 3000, h : { i : "i", k : "k"} }
		},
		fun1 : function(x)
		{
			return 100 + x;
		},
		fun2 : function(x)
		{
			return 100 * x;
		},
		fun3 : function()
		{
			return "fun3";
		}
	});

	$.widget("mc.B", $.mc.A,
	{
		options :
		{
			x : 100,
			y : 300,
			pos : { m : 2000, n : 2000, h : { k : "kkk"} }
		},
		fun1 : function(x)
		{
			var value = this._super(x);
			return value + 200;
		}
	});

	$.widget("mc.C", $.mc.B,
	{
		fun1 : function(x)
		{
			var value = this._super(x);
			return value + 300;
		},
		fun3 : function()
		{
			return $.mc.A.prototype.fun1.call(this, 30);
		}
	});
};

init_Button = function()
{
	$("body").A();
	$("body").B();
	$("body").C();

	$("#btnTest").click(function(event)
	{
		var a = $("body").A("instance");
		var b = $("body").B("instance");
		var c = $("body").C("instance");

		/**
		 * 测试结果：通过
		 * 结论：继承体系的初始化参数options是深度复制的，因此可以设置复杂参数体系
		 */
/*		alert("a.options=" + mc.encode(a.options));
		alert("b.options=" + mc.encode(b.options));
		alert("c.options=" + mc.encode(c.options));
*/
		/**
		 * 测试结果：通过
		 * 两种获取选项方式一致
		 */
/*		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));*/

		/**
		 * 测试结果：通过
		 * 测试创建对象时的初始化参数是否深度复制？
		 * 结论：创建对象的初始化参数options是深度复制的，因此支持复杂参数体系
		 */
		$("body").A("destroy");
		$("body").B("destroy");
		$("body").C("destroy");
		$("body").A(
		{
			y : 300
		});
		$("body").B(
		{
			pos : { m : 3000 }
		});
		$("body").C(
		{
			pos : { m : 4000, h : { k2 : "kkk2"} }
		});
		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));

		/**
		 * 测试结果：通过
		 * 修改参数后，再显示父类和子类的参数
		 * 结论：只修改了当前实例的参数，没有影响父类和子类
		 */
/*		$("body").B("option", "myParam1", "myValue1");
		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));*/

		/**
		 * 测试结果：通过
		 * 先修改父类对象的参数，再创建子类，
		 * 结论：仅影响了父类对象参数，子类实例不受影响
		 */
/*		$("body").B("destroy");
		$("body").C("destroy");
		$("body").A("option", "myParam1", "myValue1");
		$("body").B();
		$("body").C();
		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));
*/

		/**
		 * 测试结果：通过
		 * 先修改父类原型的参数，再创建子类，
		 * 结论：子类原型已经定义，临时修改无效
		 */
/*		$("body").B("destroy");
		$("body").C("destroy");
		var a = $("body").A("instance");
		$.mc.A.prototype.options["myParam2"] = "myValue2";
		$("body").B();
		$("body").C();
		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));*/

		/**
		 * 测试结果：通过
		 * 先修改父类原型的参数，再重新创建父类，
		 * 结论：父类新建对象能正确体现参数变化；子类原型已经定义，临时修改无效
		 */
/*		$("body").A("destroy");
		$("body").B("destroy");
		$("body").C("destroy");
		var a = $("body").A("instance");
		$.mc.A.prototype.options["myParam2"] = "myValue2";
		$("body").A();
		$("body").B();
		$("body").C();
		alert("a.options=" + mc.encode($("body").A("option")));
		alert("b.options=" + mc.encode($("body").B("option")));
		alert("c.options=" + mc.encode($("body").C("option")));*/

		/**
		 * 测试结果：通过
		 * 测试：this._super与$.Widget.prototype.destroy，是否相同
		 * 结论：
		 */

		/**
		 * 测试结果：通过
		 * _super可以继承，传入参数可行
		 */
/*		alert("a.fun1()=" + mc.encode(a.fun1(15)));
		alert("b.fun1()=" + mc.encode(b.fun1(15)));
		alert("c.fun1()=" + mc.encode(c.fun1(15)));*/

		/**
		 * 测试结果：通过
		 * 两种访问方式一致
		 */
/*		alert("a.fun1()=" + mc.encode($("body").A("instance").fun1(15)));
		alert("b.fun1()=" + mc.encode($("body").B("instance").fun1(15)));
		alert("c.fun1()=" + mc.encode($("body").C("instance").fun1(15)));*/

/*		alert("a.fun1()=" + mc.encode($("body").A("fun1", 15)));
		alert("b.fun1()=" + mc.encode($("body").B("fun1", 15)));
		alert("c.fun1()=" + mc.encode($("body").C("fun1", 15)));*/

		/**
		 * 测试结果：通过
		 * 隔代继承，传入参数可行
		 */
/*		alert("a.fun2()=" + mc.encode(a.fun2(2)));
		alert("b.fun2()=" + mc.encode(b.fun2(2)));
		alert("c.fun2()=" + mc.encode(c.fun2(2)));*/

		/**
		 * 测试结果：通过
		 * prototype，可行
		 * 可用于强制调用父类的非同名函数，甚至任意函数
		 */
/*		alert("c.fun2()=" + mc.encode($("body").C("fun3", 30)));*/

	});
};

$(function()
{
	init_Widget();

	init_Button();
});