$(function()
{
	$("body").layout(
	{
		closable : false, 	/* 取消分隔条上的关闭按钮 */
		resizerTip : "",		/* 分隔条取消提示 */
		north__size : 200,
		north__spacing_open : 6,
		north__resizable : true,
		south__size : 100,
		south__spacing_open : 16,
		south__resizable : true,
	});
});