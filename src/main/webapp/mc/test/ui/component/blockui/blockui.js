$(function()
{
	/**
	 * 显示整页遮罩
	 */
	$("#btnMaskBody").button().click(function(event)
	{
		$.blockUI(
		{
			message : "<h1>加载中...(双击页面任何一处可解除遮罩)</h1>"
		});
	});

	/**
	 * 双击解除遮罩
	 */
	$("body").dblclick(function(event)
	{
		$.unblockUI();
		MaskUtil.hide();
	});

	/**
	 * 显示区域遮罩
	 */
	$("#btnMaskDiv").button().click(function(event)
	{
		$("#loadmask_area").block(
		{
			message : "<h1>加载中...</h1>"
		});
	});

	/**
	 * 显示区域遮罩(带图标)
	 */
	$("#btnMaskDiv_Img").button().click(function(event)
	{
		$("#loadmask_area").block(
		{
			message : "<h1><img src='jquery/blockui/images/loading.gif' /> 加载中...(需整理默认样式)</h1>",
		});
	});

	/**
	 * 隐藏区域遮罩
	 */
	$("#btnUnMaskDiv").button().click(function(event)
	{
		$("#loadmask_area").unblock();
	});

	/**
	 * 显示区域遮罩(使用自定义样式)
	 */
	$("#btnMaskDiv_CSS").button().click(function(event)
	{
		$("#loadmask_area").block(
		{
			message : "<div> </div>",
			css : 
			{
				"border" : "none",
				"width" : "32px",
		    	"height" : "32px",
		    	"background-color" : "transparent",
		    	"background-image" : "url(jquery/layer/3.1.0/theme/default/loading-2.gif)",
		    	"background-repeat" : "no-repeat",
		        "background-attachment" : "scroll",
		        "background-clip" : "border-box",
		        "background-origin" : "padding-box",
		        "background-position-x" : "0%",
		        "background-position-y" : "0%",
		        "background-size" : "auto",
		        "background-color" : "rgb(0, 0, 0)",
				"opacity" : "0.1"
			}
//			css :
//			{
//				"width" : "32px",
//		    	"height" : "32px",
//		    	"background-color" : "transparent",
//		    	"background-image" : "url(jquery/layer/3.1.0/theme/default/loading-2.gif)",
//		    	"background-repeat" : "no-repeat",
//		        "background-attachment" : "scroll",
//		        "background-clip" : "border-box",
//		        "background-origin" : "padding-box",
//		        "background-position-x" : "0%",
//		        "background-position-y" : "0%",
//		        "background-size" : "auto"
//			}
		});
	});

	$("#btnMask1BodyOpen").button().click(function(event)
	{
		MaskUtil2.show();
	});
	$("#btnMask1BodyClose").button().click(function(event)
	{
		MaskUtil2.hide();
	});
	$("#btnMask1AreaOpen").button().click(function(event)
	{
		MaskUtil2.show($("#loadmask_area"));
	});
	$("#btnMask1AreaClose").button().click(function(event)
	{
		MaskUtil2.hide($("#loadmask_area"));
	});
	$("#btnMask2BodyOpen").button().click(function(event)
	{
		MaskUtil.show();
	});
	$("#btnMask2BodyClose").button().click(function(event)
	{
		MaskUtil.hide();
	});
});