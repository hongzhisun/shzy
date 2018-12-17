mc.namespace("wf.render");

/**
 * 隐藏/显示列render
 */
wf.render.ProcessInstStatus = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, wf.render.data.ProcessInstStatus);
};

/**
 * render map data
 * 显示render数据map
 */
wf.render.data = {};
wf.render.data.ProcessInstStatus = [ [ 1, "在途" ], [ 4, "完成" ], [ 5, "已删除" ] ];
