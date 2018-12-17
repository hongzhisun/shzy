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
	init_LoadMask();
});