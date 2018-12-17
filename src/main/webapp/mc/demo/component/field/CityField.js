(function($)
{
	/**
	 * 城市选择组件
	 */
	$.widget("demo.CityField", $.mc.GridField,
	{
		options :
		{
			id : "",
			place_text : "请选择城市...",/* 初始占位文本 */
			title : "选择城市",		/* 对话框标题 */
			width : "400",			/* 对话框宽度 */
			height : "400",			/* 对话框高度 */
			resize : false,			/* 对话框是否可拉伸 */
			maxmin : false,			/* 对话框是否可最大化最小化 */
			allowClear : true,		/* 是否显示清除按钮 */
			multi_mode : false,		/* 复选模式 */
			pager_mode : false,		/* 分页模式 */
			col_model : [
			{
				name : "id",
				hidden : true,
				key : true,
			},
			{
				name : "code",
				label : "编号",
				width : 90
			},
			{
				name : "name",
				label : "名称",
				width : 100
			} ],						/* 列模式 */
			url : "demo/city/list",		/* 数据url */
			query_param	 : null,		/* 查询参数。查询参数对象。 */
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "id",			/* id字段 */
			field_text : "name"			/* text字段 */		
		}
	});
})(jQuery);