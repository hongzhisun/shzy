mc.namespace("demo.render");

/**
 * 隐藏/显示列render
 */
demo.render.ProvinceType = function(cellValue, options, rowObject)
{
	var value = MCloud.util.RenderUtil.render_value(cellValue, options, rowObject);
	return mc.render.MapRender(value, demo.render.data.ProvinceType);
};

mc.namespace("demo.render.data");

/**
 * 省份类型
 */
demo.render.data.ProvinceType = [ [ 0, "省" ],
                                [ 1, "自治区" ],
                                [ 2, "直辖市" ],
                                [ 3, "新疆生产建设兵团" ],
                                [ 4, "特别行政区" ] ];
