MCloud.namespace("MCloud.util");

/**
 * 消息工具类
 * 封装了layer组件的alert和confirm方法
 */
MCloud.util.MsgUtil = {};

/**
 * 缩写定义
 */
MsgUtil = MCloud.util.MsgUtil;

/**
 * 提示信息
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil.alert = function(msg, callbackFun, scope)
{
	layer.alert(msg + "",
	{
		title : "提示",
		icon : 0,
		anim : -1
	},
	MCloud.util.MsgUtil.alertCallbackFunOK.createDelegate(scope, callbackFun, true));
};

mc.alert = MCloud.util.MsgUtil.alert;

/**
 * 提示回调代理函数
 */
MCloud.util.MsgUtil.alertCallbackFunOK = function(index, dom, callbackFun)
{
	if (callbackFun != undefined && callbackFun != null
		&& typeof(callbackFun) == "function")
	{
		callbackFun();
	}

	layer.close(index);
};

/**
 * 确认信息，是否
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil.confirm = function(msg, callbackFun, scope)
{
	layer.confirm(msg + "",
	{
		title : "确认",
		icon : 3,
		anim : -1
	},
	MCloud.util.MsgUtil.confirmCallbackFunOK.createDelegate(scope, callbackFun, true),
	MCloud.util.MsgUtil.confirmCallbackFunCancel.createDelegate(scope, callbackFun, true));
};

mc.confirm = MCloud.util.MsgUtil.confirm;

/**
 * 确认回调代理函数
 */
MCloud.util.MsgUtil.confirmCallbackFunOK = function(index, dom, callbackFun)
{
	if (callbackFun != undefined && callbackFun != null
		&& typeof(callbackFun) == "function")
	{
		callbackFun(true);
	}

	layer.close(index);
};

/**
 * 取消回调代理函数
 */
MCloud.util.MsgUtil.confirmCallbackFunCancel = function(index, dom, callbackFun)
{
	if (callbackFun != undefined && callbackFun != null
		&& typeof(callbackFun) == "function")
	{
		callbackFun(false);
	}
};

/**
 * 确认信息，确定取消
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil.prompt = function(msg, callbackFun, scope)
{
	MCloud.util.MsgUtil.confirm(msg, callbackFun, scope);
};

mc.prompt = MCloud.util.MsgUtil.prompt;

MCloud.util.MsgUtil.id = 0;

/**
 * 轻量化提示，默认3秒自动消失
 */
MCloud.util.MsgUtil.msg = function(msg, options, end)
{
	MCloud.util.MsgUtil.id ++;
	var id = "mc-msg-id-" + MCloud.util.MsgUtil.id;
	var options_new = $.extend(true, {}, options,
	{
		id : id,
		skin : "layui-layer-lan",
		icon : 0
	});

	var index = layer.msg(msg, options_new, end);

	$("#" + id).click(function(event)
	{
		layer.close(index);
	});
};
mc.msg = MCloud.util.MsgUtil.msg;

/**
 * 吸附提示
 * 默认绑定移出区域自动关闭功能
 * @param	msg			提示信息
 * 						如果不是非空字符串，则不显示提示
 * @param	follow		提示吸附对象
 * 						如果follow是字符串，则按Id方式查找dom，吸附提示
 * 						如果follow是jQuery对象，则直接吸附提示。
 * @param	options		设置
 */
MCloud.util.MsgUtil.tips = function(msg, follow, options)
{
	if (mc.str.isEmpty(msg))
	{
		return;
	}

	var $follow = null;
	if (mc.isString(follow) && mc.str.notEmpty(follow))
	{
		$follow = $("#" + follow);
		if (! mc.isJQuery($follow))
		{
			return;
		}
	}
	else if (mc.isJQuery(follow))
	{
		$follow = follow;
	}
	else
	{
		return;
	}

	MCloud.util.MsgUtil.clearTips($follow);

	$follow.mouseenter(function(event)
	{
		layer.tips(msg, $follow, options);
	});

	$follow.mouseleave(function(event)
	{
		layer.closeAll("tips");
	});
};
mc.tips = MCloud.util.MsgUtil.tips;

/**
 * 取消吸附提示(未完成)
 * 取消经由mc.tips绑定的吸附提示
 * @param	follow		提示吸附对象
 * 						如果follow是字符串，则按Id方式查找dom，吸附提示
 * 						如果follow是jQuery对象，则直接吸附提示。
 */
MCloud.util.MsgUtil.clearTips = function(follow)
{
	var $follow = null;
	if (mc.isString(follow) && mc.str.notEmpty(follow))
	{
		$follow = $("#" + follow);
		if (! mc.isJQuery($follow))
		{
			return;
		}
	}
	else if (mc.isJQuery(follow))
	{
		$follow = follow;
	}
	else
	{
		return;
	}

	$follow.off("mouseenter");
	$follow.off("mouseleave");
};
mc.clearTips = MCloud.util.MsgUtil.clearTips;

/**
 * 消息工具类
 * 封装了jAlert组件
 */
MCloud.util.MsgUtil2 = {};

/**
 * 缩写定义
 */
MsgUtil2 = MCloud.util.MsgUtil2;

/**
 * 提示信息
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil2.alert = function(msg, callbackFun, scope)
{
	if (callbackFun != undefined && scope != undefined)
	{
		jAlert(msg + "", "提示", callbackFun.createDelegate(scope));
	}
	else
	{
		jAlert(msg + "", "提示", callbackFun);
	}
};

/**
 * 确认信息，确定取消
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil2.confirm = function(msg, callbackFun, scope)
{
	$.alerts.okButton = "&nbsp;确定&nbsp;";
	$.alerts.cancelButton = "&nbsp;取消&nbsp;";

	if (callbackFun != undefined && scope != undefined)
	{
		jConfirm(msg + "", "确认", callbackFun.createDelegate(scope));
	}
	else
	{
		jConfirm(msg + "", "确认", callbackFun);
	}

	$.alerts.okButton = "&nbsp;是&nbsp;";
	$.alerts.cancelButton = "&nbsp;否&nbsp;";
};

/**
 * 确认信息，是否
 * @msg			提示信息
 * @callbackFun	回调函数
 */
MCloud.util.MsgUtil2.prompt = function(msg, callbackFun, scope)
{
	if (callbackFun != undefined && scope != undefined)
	{
		jConfirm(msg + "", "确认", callbackFun.createDelegate(scope));
	}
	else
	{
		jConfirm(msg + "", "确认", callbackFun);
	}
};