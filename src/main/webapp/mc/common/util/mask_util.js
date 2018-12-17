MCloud.namespace("MCloud.util");

/**
 * 遮罩工具类
 * 封装layer.load组件
 * 目前只能遮挡当前页面
 */
MCloud.util.MaskUtil = {};

/**
 * 缩写定义
 */
MaskUtil = MCloud.util.MaskUtil;

MCloud.util.MaskUtil.defaultMaskOption = 
{
	shade : 0.2
};

/**
 * 打开遮罩
 * @return 		创建的mask_index，关闭遮罩时需要使用
 */
MCloud.util.MaskUtil.show = function(option)
{
	var maskOption = $.extend(true, {}, MCloud.util.MaskUtil.defaultMaskOption, option);

	return layer.load(2, maskOption);
};
MCloud.showMask = MCloud.util.MaskUtil.show;

/**
 * 关闭遮罩
 * @mask_index	需要清除遮罩的索引，如果不指定则清除所有遮罩
 */
MCloud.util.MaskUtil.hide = function(mask_index)
{
	if (mask_index == undefined || mask_index == null)
	{
		layer.closeAll("loading");
	}
	else
	{
		layer.close(mask_index);
	}
};
MCloud.hideMask = MCloud.util.MaskUtil.hide;

/**
 * 打开顶层遮罩
 * 如果顶层页面不存在或未引入layer，则仍然打开当前页面遮罩
 * @return 		创建的mask_index，关闭遮罩时需要使用
 */
MCloud.util.MaskUtil.showTop = function(option)
{
	if (top && top.$ && top.layer)
	{
		var maskOption = $.extend(true, {}, MCloud.util.MaskUtil.defaultMaskOption, option);

		return top.layer.load(2, maskOption);
	}
	else
	{
		return MCloud.util.MaskUtil.show(option);
	}
};
MCloud.showMaskTop = MCloud.util.MaskUtil.showTop;

/**
 * 关闭顶层遮罩
 * 如果顶层页面不存在或未引入layer，则仍然打开当前页面遮罩
 * @mask_index	需要清除遮罩的索引，如果不指定则清除所有遮罩
 */
MCloud.util.MaskUtil.hideTop = function(mask_index)
{
	if (top && top.$ && top.layer)
	{
		if (mask_index == undefined || mask_index == null)
		{
			top.layer.closeAll("loading");
		}
		else
		{
			top.layer.close(mask_index);
		}
	}
	else
	{
		MCloud.util.MaskUtil.hide(mask_index);
	}
};
MCloud.hideMaskTop = MCloud.util.MaskUtil.hideTop;

/**
 * 遮罩工具类2
 * 封装unblockUI组件
 */
MCloud.util.MaskUtil2 = {};

/**
 * 缩写定义
 */
MaskUtil2 = MCloud.util.MaskUtil2;

MCloud.util.MaskUtil2.image_url = "jquery/layer/3.1.0/theme/default/loading-2.gif";

MCloud.util.MaskUtil2.css =
{
	border : "0px",
	"align-content" : "center",
	background : "transparent"
};

MCloud.util.MaskUtil2.content =
{
	message : "<img src='" + MCloud.util.MaskUtil2.image_url + "' />",
	css : MCloud.util.MaskUtil2.css
};

/**
 * 打开遮罩
 * @area_dom	需要放置遮罩的dom，如果不传递则整页遮罩
 */
MCloud.util.MaskUtil2.show = function(area_dom)
{
	if (area_dom == undefined || area_dom == null)
	{
		$.blockUI(MCloud.util.MaskUtil2.content);
	}
	else
	{
		area_dom.block(MCloud.util.MaskUtil2.content);
	}
};
MCloud.showMask2 = MCloud.util.MaskUtil2.show;

/**
 * 关闭遮罩
 * @area_dom	需要清除遮罩所在的dom，如果不指定则清除整页遮罩
 */
MCloud.util.MaskUtil2.hide = function(area_dom)
{
	if (area_dom == undefined || area_dom == null)
	{
		$.unblockUI();
	}
	else
	{
		area_dom.unblock();
	}
};
MCloud.hideMask2 = MCloud.util.MaskUtil2.hide;