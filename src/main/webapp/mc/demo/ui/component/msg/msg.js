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
			$("#txtAlertCallback").val($("#txtAlertCallback").val() + "mc.alert点击了确定。\r\n");
		});
	});

	$("#btnMsg1").click(function()
	{
		mc.msg("请先选择一条记录");
	});
	$("#btnMsg2").click(function()
	{
		mc.msg("请先选择一条记录", null, function()
		{
			$("#txtMsgCallback").val($("#txtMsgCallback").val() + "mc.msg已关闭。\r\n");
		});
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
				$("#txtConfirmCallback").val($("#txtConfirmCallback").val() + "mc.confirm点击了确定。\r\n");
			}
			else
			{
				$("#txtConfirmCallback").val($("#txtConfirmCallback").val() + "mc.confirm点击了取消。\r\n");
			}
		});
	});

	mc.tips("查询", "btnRefresh",
	{
		tips : 4
	});
	mc.tips("新增", "btnAdd",
	{
		tips : 1
	});
	mc.tips("修改", "btnUpdate",
	{
		tips : 3
	});
	mc.tips("删除", "btnDelete");
};

$(function()
{
	init_Msg();
});