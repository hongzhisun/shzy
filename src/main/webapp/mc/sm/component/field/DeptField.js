/**
 * 系统管理模块 - 部门弹窗选择组件
 */
(function($)
{
	/**
	 * 部门表格弹窗选择组件
	 */
	$.widget("sm.DeptGridField", $.mc.GridField,
	{
		options :
		{
			place_text : "请选择部门...",	/* 初始占位文本 */
			title : "选择部门",				/* 对话框标题 */
			col_model : [					/* 列模式 */
			{
				name : "deptID",
				hidden : true,
				key : true,
			},
			{
				name : "deptCode",
				label : "部门编号",
				width : 150
			},
			{
				name : "deptName",
				label : "部门名称",
				width : 150
			},
			{
				name : "status",
				hidden : true
			},
			{
				name : "status_text",
				label : "状态",
				width : 60,
				align : "center",
				mc_source_col : "status",
				formatter : mc.render.Status
			} ],
			url : "sm/dept/list",				/* 数据url */
			type : "post",						/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			search_option :						/* 搜索选项 */
			[
				{ id : "deptCode", text : "部门编码" },
				{ id : "deptName", text : "部门名称" }
			],
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "deptID",		/* id字段 */
			field_text : "deptName"		/* text字段 */
		}
	});

	/**
	 * 部门树弹窗选择组件
	 */
	$.widget("sm.DeptTreeField", $.mc.TreeField,
	{
		options :
		{
			place_text : "请选择部门...",	/* 初始占位文本 */
			title : "选择部门",				/* 对话框标题 */
			root_name : "部门",				/* 根节点名称 */
			url : "sm/dept/list",				/* 数据url */
			type : "post",						/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			data_root : "data",			/* 返回数据节点root */
			field_id : "deptID",		/* id字段 */
			field_text : "deptName",	/* text字段 */
			field_parentid : "parentID",/* 上级id字段 */
			field_leaf : "isLeaf",		/* 是否末级字段 */
			field_level : "level"		/* 级别字段 */
		}
	});
})(jQuery);