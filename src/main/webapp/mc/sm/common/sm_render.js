mc.namespace("sm.render");

/**
 * 隐藏/显示列render
 */
sm.render.Hidden = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, sm.render.data.Hidden);
};
/**
 * 隐藏/显示列Render
 * 隐藏为红色
 */
sm.render.Hidden_RedHidden = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, sm.render.data.Hidden_RedHidden);
};

sm.render.Internal_FocusInternal = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, sm.render.data.Internal_FocusInternal);
};

sm.render.UserStatus = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, sm.render.data.UserStatus);
};

/**
 * render map data
 * 显示render数据map
 */
sm.render.data = {};
sm.render.data.Hidden = [ [ 1, "隐藏" ], [ 0, "显示" ] ];
sm.render.data.Hidden_RedHidden = [ [ 1, "<span style='color:red;'>隐藏</span>" ], [ 0, "" ] ];

sm.render.data.Internal = [ [ 1, "系统内置" ], [ 0, "自定义" ] ];
sm.render.data.Internal_FocusInternal = [ [ 1, "系统内置" ], [ 0, "" ] ];

/**
 * 用户状态
 */
sm.render.data.UserStatus = [ [ 0, "正常" ], [ 1, "未激活" ], [ 2, "锁定" ] ];

/**
 * 模块权限分配模式
 */
sm.render.data.AllocMode = [ [ 0, "整体分配" ], [ 1, "部分分配" ] ];
