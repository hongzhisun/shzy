init_TreeDialog = function()
{
	$("#treeDialog").TreeDialog(
	{
		title : "选择部门",				/* 对话框标题 */
		width : 600,					/* 对话框宽度 */
		height : 400,					/* 对话框高度 */
		resize : true,					/* 对话框是否可拉伸 */
		maxmin : true,					/* 对话框是否可最大化最小化 */
		multi_mode : true,				/* 复选模式 */
		root_name : "部门",				/* 根节点名称 */
		url : "sm/dept/list",				/* 数据url */
		type : "post",						/* http方法 */
		query_param	 : null,				/* 查询参数对象 */
		param_serialize : "jsonCondition",	/* 参数序列化 */
		data_root : "data",				/* 返回数据节点root */
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
		field_parentid : "parentID",	/* 上级id字段 */
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "id=" + $("#treeDialog").TreeDialog("id") + "<br>";
				msg += "text=" + mc.encode($("#treeDialog").TreeDialog("text")) + "<br>";
				msg += "data=" + mc.encode($("#treeDialog").TreeDialog("data")) + "<br>";
				mc.alert(msg);
			}
		}
	});

	$("#btnTreeDialog").click(function(event)
	{
		$("#treeDialog").TreeDialog("open");
	});
};

$(function()
{
	init_TreeDialog();

	mc.layout.init();
});