init_ComboBox = function()
{
	$("#combobox").DynamicComboBox(
	{
		id : "gridfield1_id",
		place_text : "请选择部门...",/* 初始占位文本 */
		url : "sm/dept/list",			/* 数据url */
		type : "post",
		query_param	:
		{
			a1 : "aaaa",
			a2 : "bbbb"
		},								/* 查询参数(对象) */
//		param_serialize : "filter",		/* 参数序列化 */
//		param_serialize : "jsonCondition",	/* 参数序列化 */
		param_serialize : function(param)	/* 参数序列化 */
		{
			var param =
			{
				jsonCondition : mc.encode(param)
			}
			return param;
		},
		data_root : "data",		
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
//		beforeOpenCallback : function()
//		{
//			var param =
//			{
//				a2 : "cccc",
//				a3 : "dddd",
//				deptName : "财务部"
//			};
//			return param;
//		}		
	});
};

init_GridField = function()
{
	$("#gridField").GridField(
	{
		id : "gridfield1_id",
		place_text : "请选择部门...",/* 初始占位文本 */
		allowClear : true,		/* 是否显示清除按钮 */
		title : "选择部门",		/* 对话框标题 */
		width : 600,			/* 对话框宽度 */
		height : 400,			/* 对话框高度 */
		resize : true,			/* 对话框是否可拉伸 */
		maxmin : true,			/* 对话框是否可最大化最小化 */
		multi_mode : false,		/* 复选模式 */
		pager_mode : true,		/* 分页模式 */
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
		url : "sm/dept/list",			/* 数据url */
		type : "post",
		query_param	:
		{
			a1 : "aaaa",
			a2 : "bbbb"
		},									/* 查询参数对象 */
//		param_serialize : "filter",			/* 参数序列化 */
		param_serialize : "jsonCondition",	/* 参数序列化 */
//		param_serialize : function(param)	/* 参数序列化 */
//		{
//			var param =
//			{
//				jsonCondition : mc.encode(param)
//			}
//			return param;
//		},
		search_option :
		[
			{ id : "deptCode", text : "部门编码" },
			{ id : "deptName", text : "部门名称" }
		],
		param_page : "page",		/* 开始页数 */
		param_startrow : "start",	/* 开始行数 */
		param_rows : "limit",		/* 每页行数 */		
		data_root : "data",		
		data_rows : "total",
		data_pages : "total_page",
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
		beforeOpenCallback : function()
		{
			var param =
			{
				a2 : "cccc",
				a3 : "dddd",
				deptName1 : "财务部"
			};
			return param;
		}
	});
};

init_GridDialog = function()
{
	$("#gridDialogWrap").GridDialog(
	{
		id : "griddialog1_id",
		title : "选择部门",		/* 对话框标题 */
		width : 600,			/* 对话框宽度 */
		height : 400,			/* 对话框高度 */
		resize : true,			/* 对话框是否可拉伸 */
		maxmin : true,			/* 对话框是否可最大化最小化 */
		multi_mode : false,		/* 复选模式 */
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
		url : "sm/dept/list",			/* 数据url */
		type : "post",
		query_param	 : null,			/* 查询参数(对象) */
		data_root : "data",		
		data_rows : "total",
		data_pages : "total_page",
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
		beforeOpenCallback : $.noop,
		search_option : [
 		{ id : "deptcode", text : "部门编码" },
 		{ id : "deptname", text : "部门名称" } ],
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "id=" + $("#gridDialogWrap").GridDialog("id") + "<br>";
				msg += "text=" + mc.encode($("#gridDialogWrap").GridDialog("text")) + "<br>";
				msg += "data=" + mc.encode($("#gridDialogWrap").GridDialog("data")) + "<br>";
				mc.alert(msg);
			}
		}
	});

	$("#btnGridDialog").click(function(event)
	{
		$("#gridDialogWrap").GridDialog("open");
	});
};

init_TreeField = function()
{
	$("#treeField").TreeField(
	{
		id : "treefield1_id",
		place_text : "请选择部门...",/* 初始占位文本 */
		allowClear : true,		/* 是否显示清除按钮 */
		title : "选择部门",		/* 对话框标题 */
		width : 600,			/* 对话框宽度 */
		height : 400,			/* 对话框高度 */
		resize : true,			/* 对话框是否可拉伸 */
		maxmin : true,			/* 对话框是否可最大化最小化 */
		multi_mode : false,		/* 复选模式 */
		root_name : "部门",		/* 根节点名称 */
		url : "sm/dept/list",			/* 数据url */
		type : "post",
		query_param	:
		{
			a1 : "aaaa",
			a2 : "bbbb"
		},								/* 查询参数(对象) */
//		param_serialize : "filter",		/* 参数序列化 */
//		param_serialize : "jsonCondition",	/* 参数序列化 */
//		param_serialize : function(param)	/* 参数序列化 */
//		{
//			var param =
//			{
//				jsonCondition : mc.encode(param)
//			}
//			return param;
//		},
		data_root : "data",				/* 返回数据节点root */
		field_id : "deptID",			/* id字段 */
		field_text : "deptName",		/* text字段 */
		field_parentid : "parentID",	/* 上级id字段 */
		beforeOpenCallback : function()
		{
			var param =
			{
				a2 : "cccc",
				a3 : "dddd",
				deptName : "财务部"
			};
			return param;
		}
	});
};

init_TreeDialog = function()
{
	$("#treeDialogWrap").TreeDialog(
	{
		id : "treedialog1_id",
		title : "选择部门",		/* 对话框标题 */
		width : 600,			/* 对话框宽度 */
		height : 400,			/* 对话框高度 */
		resize : true,			/* 对话框是否可拉伸 */
		maxmin : true,			/* 对话框是否可最大化最小化 */
		multi_mode : true,		/* 复选模式 */
		root_name : "部门",		/* 根节点名称 */
		url : "sm/dept/list",			/* 数据url */
		type : "post",
		query_param	 : null,			/* 查询参数(对象) */
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
				var msg = "id=" + $("#treeDialogWrap").TreeDialog("id") + "<br>";
				msg += "text=" + mc.encode($("#treeDialogWrap").TreeDialog("text")) + "<br>";
				msg += "data=" + mc.encode($("#treeDialogWrap").TreeDialog("data")) + "<br>";
				mc.alert(msg);
			}
		}
	});

	$("#btnTreeDialog").click(function(event)
	{
		$("#treeDialogWrap").TreeDialog("open");
	});
};

$(function()
{
	init_ComboBox();
	
	init_GridField();

	init_GridDialog();

	init_TreeField();

	init_TreeDialog();
});