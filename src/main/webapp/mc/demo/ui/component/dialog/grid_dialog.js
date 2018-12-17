init_GridDialog = function()
{
	$("#gridDialog").GridDialog(
	{
		title : "选择部门",		/* 对话框标题 */
		width : 600,			/* 对话框宽度 */
		height : 400,			/* 对话框高度 */
		resize : true,			/* 对话框是否可拉伸 */
		maxmin : true,			/* 对话框是否可最大化最小化 */
		multi_mode : true,		/* 复选模式 */
		pager_mode : false,		/* 分页模式 */
		col_model : [
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
		query_param	 : null,				/* 查询参数(对象) */
		param_serialize : "jsonCondition",	/* 参数序列化 */
		search_option :
		[
		    { id : "deptcode", text : "部门编码" },
		    { id : "deptname", text : "部门名称" }
   		],
   		
		data_root : "data",		
		data_rows : "total",
		data_pages : "total_page",
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
		beforeOpenCallback : $.noop,
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "id=" + $("#gridDialog").GridDialog("id") + "<br>";
				msg += "text=" + mc.encode($("#gridDialog").GridDialog("text")) + "<br>";
				msg += "data=" + mc.encode($("#gridDialog").GridDialog("data")) + "<br>";
				mc.alert(msg);
			}
		}
	});

	$("#btnGridDialog").click(function(event)
	{
		$("#gridDialog").GridDialog("open");
	});
};

$(function()
{
	init_GridDialog();

	mc.layout.init();
});