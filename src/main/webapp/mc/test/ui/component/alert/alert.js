initAlert_Layer = function()
{
	/**
	 * 仅提示
	 */
	$("#btnAlert_L1").button().click(function()
	{
		layer.alert("提示信息");
	});

	/**
	 * 提示+标题
	 */
	$("#btnAlert_L2").button().click(function()
	{
		layer.alert("提示信息 + 提示标题",
		{
			title : "提示标题"
		});
	});

	/**
	 * 提示+标题+执行回调函数
	 */
	$("#btnAlert_L3").button().click(function()
	{
		layer.alert("提示信息 + 提示标题 + 回调函数",
		{
			title : "提示标题"
		},
		function(index, dom)
		{
			$("#inputResult_L").val($("#inputResult_L").val() + "abc");
			layer.close(index);
		});
	});

	/**
	 * 提示+标题+执行回调函数(使用mc.alert)
	 */
	$("#btnAlert_MsgUtil_1").button().click(function()
	{
		mc.alert("MsgUtil 提示信息 + 提示标题 + 回调函数", function()
		{
			$("#inputResult_L").val($("#inputResult_L").val() + "abc");
		});
	});
};

initConfirm_Layer = function()
{
	/**
	 * 仅确认
	 */
	$("#btnConfirm_L1").button().click(function()
	{
		layer.confirm("确认信息");
	});

	/**
	 * 确认+标题
	 */
	$("#btnConfirm_L2").button().click(function()
	{
		layer.confirm("确认信息 + 确认标题",
		{
			title : "确认标题"
		});
	});

	/**
	 * 确认+标题+执行回调函数
	 */
	$("#btnConfirm_L3").button().click(function()
	{
		layer.confirm("确认信息 + 确认标题",
		{
			title : "确认标题"
		},
		function(index, dom)
		{
			$("#inputResult_L").val($("#inputResult_L").val() + "; result=ok");
			layer.alert("我选择了：ok");
			layer.close(index);
		},
		function(index, dom)
		{
			$("#inputResult_L").val($("#inputResult_L").val() + "; result=cancel");
			layer.alert("我选择了：cancel");
		});
	});

	/**
	 * 确认+标题+执行回调函数(使用mc.confirm)
	 */
	$("#btnConfirm_MsgUtil_1").button().click(function()
	{
		mc.confirm("MsgUtil 确认信息 + 确认标题 + 回调函数", function(result)
		{
			if (result)
			{
				$("#inputResult_L").val($("#inputResult_L").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_L").val($("#inputResult_L").val() + "; result=" + result);
			}

			mc.alert("我选择了：" + result);
		});
	});

	/**
	 * 确认+标题+执行回调函数(使用mc.prompt)
	 */
	$("#btnConfirm_MsgUtil_2").button().click(function()
	{
		mc.prompt("MsgUtil 确认信息 + 确认标题 + 回调函数", function(result)
		{
			if (result)
			{
				$("#inputResult_L").val($("#inputResult_L").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_L").val($("#inputResult_L").val() + "; result=" + result);
			}

			mc.alert("我选择了：" + result);
		});
	});
};


function initAlert_JAlert()
{
	/**
	 * 仅提示
	 */
	$("#btnAlert_J1").button().click(function()
	{
		jAlert("提示信息");
	});

	/**
	 * 提示+标题
	 */
	$("#btnAlert_J2").button().click(function()
	{
		jAlert("提示信息 + 提示标题", "提示标题");
	});

	/**
	 * 提示+标题+执行回调函数
	 */
	$("#btnAlert_J3").button().click(function()
	{
		jAlert("提示信息 + 提示标题 + 回调函数", "提示标题", function()
		{
			$("#inputResult_J").val($("#inputResult_J").val() + "abc");
		});
	});

	/**
	 * 提示+标题+执行回调函数(使用MsgUtil2.alert)
	 */
	$("#btnAlert_MsgUtil2_1").button().click(function()
	{
		MsgUtil2.alert("MsgUtil 提示信息 + 提示标题 + 回调函数", function()
		{
			$("#inputResult_J").val($("#inputResult_J").val() + "abc");
		});
	});

};
	
function initConfirm_JAlert()
{
	/**
	 * 仅确认
	 */
	$("#btnConfirm_J1").button().click(function()
	{
		jConfirm("确认信息");
	});

	/**
	 * 确认+标题
	 */
	$("#btnConfirm_J2").button().click(function()
	{
		jConfirm("确认信息 + 确认标题", "确认标题");
	});

	/**
	 * 确认+标题+执行回调函数
	 */
	$("#btnConfirm_J3").button().click(function()
	{
		jConfirm("确认信息 + 确认标题 + 回调函数", "确认标题", function(result)
		{
			if (result)
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
		});
	});

	/**
	 * 确认+标题+执行回调函数(使用MsgUtil2.confirm)
	 */
	$("#btnConfirm_MsgUtil2_1").button().click(function()
	{
		MsgUtil2.confirm("确认信息 + 确认标题 + 回调函数", function(result)
		{
			if (result)
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}

			mc.alert2("我选择了：" + result);
		});
	});


	/**
	 * 确认+标题+执行回调函数(使用MsgUtil2.prompt)
	 */
	$("#btnConfirm_MsgUtil2_2").button().click(function()
	{
		MsgUtil2.prompt("确认信息 + 确认标题 + 回调函数", function(result)
		{
			if (result)
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
		});
	});
};

initParent = function()
{
	$("#btnTopAlert").button().click(function()
	{
		jAlert_mc("(顶层)提示信息 + 提示标题 + 回调函数", "提示标题", function()
		{
			$("#inputResult_J").val($("#inputResult_J").val() + "abc");
		});
	});

	$("#btnTopConfirm").button().click(function()
	{
		jConfirm_mc("(顶层)确认信息 + 确认标题 + 回调函数", "确认标题", function(result)
		{
			if (result)
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
			else
			{
				$("#inputResult_J").val($("#inputResult_J").val() + "; result=" + result);
			}
		});
	});
};


$(function()
{
	initAlert_Layer();

	initConfirm_Layer();

	initAlert_JAlert();

	initConfirm_JAlert();

	initParent();
});