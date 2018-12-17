/**
 * 系统管理模块 - 用户弹窗选择组件
 */
(function($)
{
	/**
	 * 用户表格弹窗选择组件
	 */
	$.widget("sm.UserGridField", $.mc.GridField,
	{
		options :
		{
			place_text : "请选择用户...",	/* 初始占位文本 */
			title : "选择用户",				/* 对话框标题 */
			col_model : [					/* 列模式 */
			{
				name : "userID",
				hidden : true,
				key : true,
			},
			{
				name : "userCode",
				label : "登录名",
				width : 150
			},
			{
				name : "userName",
				label : "姓名",
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
				formatter : sm.render.UserStatus
			} ],
			url : "sm/user/list",				/* 数据url */
			type : "post",						/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			search_option :						/* 搜索选项 */
			[
				{ id : "userCode", text : "登录名" },
				{ id : "userName", text : "姓名" }
			],
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "userID",		/* id字段 */
			field_text : "userName"		/* text字段 */
		}
	});

})(jQuery);