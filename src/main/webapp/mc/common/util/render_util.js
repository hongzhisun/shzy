MCloud.namespace("MCloud.util");

/**
 * Render工具类
 * 适用于jQGrid的formatter
 * 需要在jQGrid的colModel列设置上增加属性mc_source_col，指定数据来源列
 */
MCloud.util.RenderUtil = {};

/**
 * 缩写定义
 */
RenderUtil = MCloud.util.RenderUtil;
mc.render = MCloud.util.RenderUtil;

/**
 * 获取来源字段值
 * 前提，colModel列设置上增加属性mc_source_col，指定数据来源列
 */
MCloud.util.RenderUtil.render_value = function(cellValue, options, rowObject)
{
	if (cellValue != undefined)
	{
		return cellValue;
	}

	var source_col = options.colModel["mc_source_col"];
	return rowObject[source_col];
};

/**
 * 启用停用状态Render
 */
MCloud.util.RenderUtil.Status = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return MCloud.util.RenderUtil.MapRender(value, mc.render.data.Status);
};

/**
 * 启用停用状态Render
 * 停用为红色
 */
MCloud.util.RenderUtil.Status_Color = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "启用" : "<font color='red'>停用</font>");
};
/**
 * 启用停用状态Render
 * 强调启用，隐藏停用
 */
MCloud.util.RenderUtil.Status_FocusEnable = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "启用" : "");
};
/**
 * 启用停用状态Render
 * 强调停用，隐藏启用
 */
MCloud.util.RenderUtil.Status_FocusDisable = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "" : "停用");
};

/**
 * 是否Render
 */
MCloud.util.RenderUtil.YesNo = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return MCloud.util.RenderUtil.MapRender(value, mc.render.data.YesNo);
};
/**
 * 是否Render
 * 强调是，隐藏否
 */
MCloud.util.RenderUtil.YesNo_FocusYes = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "是" : "");
};
/**
 * 是否Render
 * 强调否，隐藏是
 */
MCloud.util.RenderUtil.YesNo_FocusNo = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "" : "否");
};
/**
 * 是否Render
 * 是为红色
 */
MCloud.util.RenderUtil.YesNo_RedYes = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "<font color='red'>是</font>" : "否");
};
/**
 * 是否Render
 * 否为红色
 */
MCloud.util.RenderUtil.YesNo_RedNo = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "是" : "<font color='red'>否</font>");
};
/**
 * 是否Render
 * 是为红色，隐藏否
 */
MCloud.util.RenderUtil.YesNo_FocusRedYes = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "<font color='red'>是</font>" : "");
};
/**
 * 是否Render
 * 否为红色，隐藏是
 */
MCloud.util.RenderUtil.YesNo_FocusRedNo = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "" : "<font color='red'>否</font>");
};

/**
 * 开启关闭
 */
MCloud.util.RenderUtil.OpenClose = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return MCloud.util.RenderUtil.MapRender(value, mc.render.data.OpenClose);
};
MCloud.util.RenderUtil.OpenClose_ColorOpen = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "<font color='red'>开启</font>" : "关闭");
};
MCloud.util.RenderUtil.OpenClose_ColorClose = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return (value == "1" ? "开启" : "<font color='red'>关闭</font>");
};

/**
 * 根据render map data，进行render
 */
MCloud.util.RenderUtil.MapRender = function(value, rmd)
{
	if (! $.isArray(rmd))
	{
		return "";
	}

	for (var i = 0; i < rmd.length; i++)
	{
		var row = rmd[i];
		if (! $.isArray(row))
		{
			continue;
		}

		if (row.length < 2)
		{
			continue;
		}

		if (value == row[0])
		{
			return row[1];
		}
	}

	return "";
};

/**
 * render map data
 * 显示render数据map
 */
mc.render.data = {};
mc.render.data.Status = [ [ 1, "启用" ], [ 0, "停用" ] ]; 
mc.render.data.YesNo = [ [ 1, "是" ], [ 0, "否" ] ];
mc.render.data.OpenClose = [ [ 1, "开启" ], [ 0, "关闭" ] ];
mc.render.data.Month = [ [ 1, "1月份" ], [ 2, "2月份" ], [ 3, "3月份" ], [ 4, "4月份" ], [ 5, "5月份" ], [ 6, "6月份" ],
                        [ 7, "7月份" ], [ 8, "8月份" ], [ 9, "9月份" ], [ 10, "10月份" ], [ 11, "11月份" ], [ 12, "12月份" ] ];

