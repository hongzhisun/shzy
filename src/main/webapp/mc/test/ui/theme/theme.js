init_Test = function()
{
	$("#btnThemeTest").click(function(event)
	{
//		<link rel="stylesheet" type="text/css" href="resources/themes/default/css/mc-core.css"/>

		var themeid = $.cookie("MC_THEMEID");
		console.log("themeid=" + themeid);
		if (themeid == "default")
		{
			themeid = "blue";
//			$.cookie("MC_THEMEID", "blue");
		}
		else
		{
			themeid = "default";
//			$.cookie("MC_THEMEID", "default");
		}

		$.ajax(
		{
			url : "platform/theme/switch",
			type : "post",
			data : 
			{
				themeid : themeid
			},
			success :  function(data, status)
			{
				if (data.success)
				{
					$("head").find("link").each(function(index)
					{
						//console.log($(this).attr("href"));
						if ($(this).attr("href") == "resources/themes/default/css/mc-core.css")
						{
							$(this).attr("href", "mc/test/ui/theme/mc-core.css");
						}
						else if ($(this).attr("href") == "mc/test/ui/theme/mc-core.css")
						{
							$(this).attr("href", "resources/themes/default/css/mc-core.css");
						}
					});
					mc.msg("主题已更换");
				}
				else
				{
					mc.msg("主题更换失败：", data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.alert("主题更换失败：" + error);
			}
		});
	});
};

init_Button = function()
{

	/**
	 * 示例按钮事件
	 */
/*	$("[class*='mc-btn'").click(function(event)
	{
		alert("当前点击的按钮为：" + $(event.target).text());
	});*/
	
	/**
	 * 获取默认按钮文本
	 */
	$("#btnButton_getText").click(function(event)
	{
		alert($("#btnDefaultIcon").text());
	});

	/**
	 * 设置默认按钮文本
	 */
	$("#btnButton_setText").click(function(event)
	{
		$("#btnDefaultIcon").text("取消(示例按钮)");
	});

	/**
	 * 是否隐藏默认按钮
	 */
	$("#btnButton_isHidden").click(function(event)
	{
		alert($("#btnDefaultIcon").is(":hidden"));
	});

	/**
	 * 显示/隐藏默认按钮
	 */
	$("#btnButton_Hide").click(function(event)
	{
		var button = $("#btnDefaultIcon");
		if (button.is(":hidden"))
		{
			button.show();
		}
		else
		{
			button.hide();
		}
	});

	/**
	 * 默认按钮是否已禁用
	 */
	$("#btnButton_isDisable").click(function(event)
	{
		alert($("#btnDefaultIcon").prop("disabled"));

		alert($("#btnDefaultIcon").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用默认按钮
	 */
	$("#btnButton_DisableDefault").click(function(event)
	{
		var button = $("#btnDefaultIcon");
		if (button.prop("disabled"))
		{
			button.prop("disabled", false);
		}
		else
		{
			button.prop("disabled", true);
		}

/*另一种实现
		if (button.attr("disabled") == "disabled")
		{
			button.removeAttr("disabled");
		}
		else
		{
			button.attr("disabled", "disabled");
		}
*/
	});

	/**
	 * 启用/禁用增加按钮
	 */
	$("#btnButton_DisableAdd").click(function(event)
	{
		var button = $("#btnAdd");
		if (button.prop("disabled"))
		{
			button.prop("disabled", false);
		}
		else
		{
			button.prop("disabled", true);
		}
	});

	/**
	 * 启用/禁用删除按钮
	 */
	$("#btnButton_DisableDelete").click(function(event)
	{
		var button = $("#btnDelete");
		if (button.prop("disabled"))
		{
			button.prop("disabled", false);
		}
		else
		{
			button.prop("disabled", true);
		}
	});
};

init_Msg = function()
{
	/**
	 * 仅提示
	 */
	$("#btnAlert1").click(function()
	{
		mc.alert("提示信息");
	});

	/**
	 * 提示 + 执行回调函数
	 */
	$("#btnAlert2").click(function()
	{
		mc.alert("提示信息 + 回调函数", function()
		{
			$("#textAreaCallback").val($("#textAreaCallback").val() + "mc.alert点击了确定。\r\n");
		});
	});

	$("#btnMsg1").click(function()
	{
		mc.msg("请先选择一条记录");
	});

	/**
	 * 仅确认
	 */
	$("#btnConfirm1").click(function()
	{
		mc.confirm("确认信息");
	});

	/**
	 * 确认 + 执行回调函数
	 */
	$("#btnConfirm2").click(function()
	{
		mc.confirm("确认信息  + 回调函数", function(result)
		{
			if (result)
			{
				$("#textAreaCallback").val($("#textAreaCallback").val() + "mc.confirm点击了确定。\r\n");
			}
			else
			{
				$("#textAreaCallback").val($("#textAreaCallback").val() + "mc.confirm点击了取消。\r\n");
			}
		});
	});
};

init_LoadMask = function()
{
	/**
	 * 双击解除遮罩
	 */
	$("body").dblclick(function(event)
	{
		mc.hideMask();
	});

	top.$("body").dblclick(function(event)
	{
		mc.hideMaskTop();
	});

	/**
	 * 显示遮罩
	 */
	$("#btnMask_Show").click(function(event)
	{
		mc.showMask();
	});

	/**
	 * 显示遮罩（定时5秒关闭）
	 */
	$("#btnMask_ShowTime").click(function(event)
	{
		mc.showMask(
		{
			time : 5 * 1000
		});
	});

	/**
	 * 显示顶层遮罩
	 */
	$("#btnMaskFull_Show").click(function(event)
	{
		mc.showMaskTop();
	});

	/**
	 * 显示顶层遮罩（定时5秒关闭）
	 */
	$("#btnMaskFull_ShowTime").click(function(event)
	{
		mc.showMaskTop(
		{
			time : 5 * 1000
		});
	});
};

$(function()
{
	init_Test();

	init_Button();

	init_Msg();

	init_LoadMask();
});