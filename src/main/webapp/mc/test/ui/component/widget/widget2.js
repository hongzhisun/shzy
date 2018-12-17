$.widget("mc.aaa",
{
	options :
	{
		aaa : "aaa"
	},
	x : 0,
	y : 0,
	/**
	 * 构造
	 */
	_create : function()
	{
		this.x += 1;
	},
	/**
	 * 初始化
	 */
	_init : function()
	{
		this.y += 1;
	},
	/**
	 * 析构
	 */
	destory : function()
	{
		$.Widget.prototype.destroy.call(this);
	},
	getAAA : function()
	{
		return this.options.aaa;
	},
	getX : function()
	{
		return "x=" + this.x + ", y=" + this.y;
	}
});

$.widget("mc.bbb",
{
	options :
	{
		aaa : "aaa"
	},
	destory : function()
	{
		$.Widget.prototype.destroy.call(this);
	},
	getAAA : function()
	{
		return "bbb";
	}	
});


$(function()
{
	$("#input1").aaa(
	{
		aaa : "ccc"
	});
	
	$("#input1").aaa(
	{
		aaa : "ddd"
	});

	var js = "$('#input1').aaa({aaa:'fff'});";
	eval(js);
	
	$("#btnTest1").click(function(event)
	{
		//alert($("#input1").aaa("getAAA"));
		alert($("#input1").aaa("getX"));
		alert($("#input1").aaa("getX"));
		alert($("#input1").aaa("getX"));
	});

	$("#btnTest2").click(function(event)
	{
		var js = "alert(11);";
		eval(js);
	});
});