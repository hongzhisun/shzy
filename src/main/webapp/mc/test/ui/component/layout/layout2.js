initLayout = function()
{
//	$("body").layout(
//	{
//		west__size : 400,			/* 允许设置 */
//		west__minSize : 400,		/* 允许设置 */
//		west__maxSize : 600,		/* 允许设置 */
//		east__size : 300,
//		east__resizable : false,	/* 允许设置 */
//		closable : false, 			/* 应当强制取消关闭按钮 */
//		resizerTip : "",			/*强制取消提示*/
//		onresize : function(panel_name, $panel, panel_state, panel_options, layout_name)
//		{
//			alert(panel_name);
//		}
//	});

	mc.layout.init();
};

$(function()
{
	initLayout();
});