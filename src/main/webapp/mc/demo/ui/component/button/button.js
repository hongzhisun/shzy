init_Button = function()
{	
	/**
	 * 获取【示例按钮】的文本
	 */
	$("#btnButton_getText").click(function(event)
	{
		mc.alert($("#btnDemo").text());
	});

	/**
	 * 设置【示例按钮】的文本
	 */
	$("#btnButton_setText").click(function(event)
	{
		$("#btnDemo").text($("#btnDemo").text() + "A");
	});

	/**
	 * 是否隐藏【示例按钮】
	 */
	$("#btnButton_isHidden").click(function(event)
	{
		mc.alert($("#btnDemo").is(":hidden"));
	});

	/**
	 * 显示/隐藏【示例按钮】
	 */
	$("#btnButton_Hide").click(function(event)
	{
		var button = $("#btnDemo");
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
	 * 【示例按钮】是否已禁用
	 */
	$("#btnButton_isDisable").click(function(event)
	{
		mc.alert($("#btnDemo").prop("disabled"));

		mc.alert($("#btnDemo").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用【示例按钮】
	 */
	$("#btnButton_DisableDefault").click(function(event)
	{
		var button = $("#btnDemo");
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

	$("#startdate_begin").DateField();

	$("#startdate_end").DateField();

	mc.tips("查询", "btnSearchIcon",
	{
		tips : 1
	});
	mc.tips("清除条件", "btnClearIcon",
	{
		tips : 1
	});
	mc.tips("增加", "btnAddIcon",
	{
		tips : 1
	});
	mc.tips("修改", "btnUpdateIcon",
	{
		tips : 1
	});
	mc.tips("删除", "btnDeleteIcon",
	{
		tips : 1
	});

	mc.layout.init();
};

$(function()
{
	init_Button();
});