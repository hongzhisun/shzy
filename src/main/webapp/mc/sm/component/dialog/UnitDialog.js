/**
 * 系统管理模块 - 公司弹窗选择组件
 */
(function($)
{
	/**
	 * 公司表格选择对话框
	 */
	$.widget("sm.UnitGridDialog", $.mc.GridDialog,
	{
		options :
		{
			title : "选择公司",				/* 对话框标题 */
			col_model : [					/* 列模式 */
			{
				name : "unitID",
				hidden : true,
				key : true,
			},
			{
				name : "unitCode",
				label : "公司编号",
				width : 150
			},
			{
				name : "unitName",
				label : "公司名称",
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
			url : "sm/unit/list",				/* 数据url */
			type : "post",						/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			search_option :						/* 搜索选项 */
			[
				{ id : "unitCode", text : "公司编码" },
				{ id : "unitName", text : "公司名称" }
			],
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "unitID",		/* id字段 */
			field_text : "unitName"		/* text字段 */
		}
	});

	/**
	 * 公司树选择对话框
	 */
	$.widget("sm.UnitTreeDialog", $.mc.TreeDialog,
	{
		options :
		{
			title : "选择公司",				/* 对话框标题 */
			root_name : "公司",				/* 根节点名称 */
			url : "sm/unit/list",				/* 数据url */
			type : "post",						/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			data_root : "data",			/* 返回数据节点root */
			field_id : "unitID",		/* id字段 */
			field_text : "unitName",	/* text字段 */
			field_parentid : "parentID",/* 上级id字段 */
			field_leaf : "isLeaf",		/* 是否末级字段 */
			field_level : "level"		/* 级别字段 */
		}
	});
})(jQuery);