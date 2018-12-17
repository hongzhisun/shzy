MCloud.namespace("MCloud.util");

/**
 * 断言工具类
 */
MCloud.util.AssertUtil = {};
/**
 * 同名
 */
AssertUtil = MCloud.util.AssertUtil;
mc.assert = MCloud.util.AssertUtil;

/**
 * 全局开关
 */
MCloud.util.AssertUtil.enable = true;

/**
 * 验证表达式，如果不满足则提示
 */
MCloud.util.AssertUtil.assert = function(expression, msg)
{
	if (! MCloud.util.AssertUtil.enable)
	{
		return;
	}

	if (! expression)
	{
		alert("assert false, msg : \r\n" + msg);
	}
};
mc.assert = MCloud.util.AssertUtil.assert;

/**
 * 验证dom id存在
 */
MCloud.util.AssertUtil.assert_domid_exist = function(id, msg)
{
	if (! MCloud.util.AssertUtil.enable)
	{
		return;
	}

	var $dom = $("#" + id);
	if ($dom == undefined || $dom == null || typeof($dom) != "object"
		|| $dom.size() <= 0)
	{
		if (MCloud.util.StringUtil.isEmpty(msg))
		{
			alert("页面上不存在id=[" + id + "]的元素");
		}
		else
		{
			alert(msg.replace("@id", id));
		}
	}
};
mc.assert_domid_exist = MCloud.util.AssertUtil.assert_domid_exist;

/**
 * 验证dom id不存在
 */
MCloud.util.AssertUtil.assert_domid_notexist = function(id, msg)
{
	if (! MCloud.util.AssertUtil.enable)
	{
		return;
	}

	var $dom = $("#" + id);
	if ($dom == undefined || $dom == null || typeof($dom) != "object"
		|| $dom.size() > 0)
	{
		if (MCloud.util.StringUtil.isEmpty(msg))
		{
			alert("页面上已存在id=[" + id + "]的元素");
		}
		else
		{
			alert(msg.replace("@id", id));
		}
	}
};
mc.assert_domid_notexist = MCloud.util.AssertUtil.assert_domid_notexist;

/**
 * 验证是一个jQuery对象
 */
MCloud.util.AssertUtil.assert_jquery = function($object, obj_name, msg)
{
	if (! MCloud.util.AssertUtil.enable)
	{
		return;
	}

	if ($object == undefined || $object == null || typeof($object) != "object"
		|| ! ($object instanceof jQuery) || $object.size() <= 0)
	{
		if (MCloud.util.StringUtil.isEmpty(msg))
		{
			if (MCloud.util.StringUtil.isEmpty(obj_name))
			{
				alert("不是一个jQuery对象");
			}
			else
			{
				alert(obj_name + "不是一个jQuery对象");
			}
		}
		else
		{
			alert(msg.replace("@objname", obj_name));
		}
	}		
};
mc.assert_jquery = MCloud.util.AssertUtil.assert_jquery;
