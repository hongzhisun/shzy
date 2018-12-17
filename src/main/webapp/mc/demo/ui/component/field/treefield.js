init_TreeField = function()
{
	$("#fieldTree").TreeField(
	{
		id : "tree_field_id",
		place_text : "请选择部门...",/* 初始占位文本 */
		allowClear : true,			/* 是否显示清除按钮 */
		title : "选择",				/* 对话框标题 */
		width : "400",				/* 对话框宽度 */
		height : "400",				/* 对话框高度 */
		resize : true,				/* 对话框是否可拉伸 */
		maxmin : true,				/* 对话框是否可最大化最小化 */
		multi_mode : false,			/* 复选模式 */
		root_name : "部门",			/* 根节点名称 */
		url : "sm/dept/list",		/* 数据url */
		query_param	 : null,		/* 查询参数对象。 */
		data_root : "data",			/* 返回数据节点root */
		field_id : "deptID",		/* id字段 */
		field_text : "deptName",	/* text字段 */
		field_parentid : "parentID",/* 上级id字段 */
		/**
		 * 打开弹窗前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不打开弹窗/不下拉；返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : $.noop,
		/**
		 * 选择后回调
		 */
		selectCallback : function(id, data)
		{
			var text = $("#textFieldTree").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldTree").val(text + "触发选择后回调函数(selectCallback)，当前选择为=" + mc.encode(data["deptName"]));
		},
		/**
		 * 选择值变化后回调
		 */
		changeCallback : function(id, data, id_old, data_old)
		{
			var text = $("#textFieldTree").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldTree").val(text + "触发值变化后回调函数(changeCallback)，当前选择为=" + mc.encode(data["deptName"]) + "，之前选择为=" + mc.encode(data_old ? data_old["deptName"] : ""));
		},
		/**
		 * 清除后回调
		 */
		clearCallback : function(id_old, data_old)
		{
			var text = $("#textFieldTree").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldTree").val(text + "触发清除选中回调函数(clearCallback)，之前选择为=" + mc.encode(data_old ? data_old["deptName"] : ""));
		}
	});

	/**
	 * 是否已选择
	 */
	$("#btnTree_isSelect").click(function(event)
	{
		mc.alert("已选择=" + $("#fieldTree").TreeField("isSelect"));
	});

	/**
	 * 获取已选择项数据
	 */
	$("#btnTree_getData").click(function(event)
	{
		var field = $("#fieldTree");
		var msg = "读取已选择项数据：<br>";
		msg += "id=" + field.TreeField("id") + "<br>";
		msg += "文本=" + field.TreeField("text") + "<br>";
		msg += "数据对象(json)=" + mc.encode(field.TreeField("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置数据
	 */
	$("#btnTree_setData").click(function(event)
	{
		var data =
		{
			id : "320000",
			code : "320000",
			name : "江苏省"
		};
		$("#fieldTree").TreeField("data", data);
		mc.alert("已设置数据, data=" + mc.encode(data));
	});

	/**
	 * 清除数据
	 */
	$("#btnTree_clear").click(function(event)
	{
		$("#fieldTree").TreeField("clear");
	});

	/**
	 * 清除但不触发回调
	 */
	$("#btnGrid_clear2").click(function(event)
	{
		$("#fieldTree").TreeField("clear", false);
	});

	/**
	 * 是否隐藏
	 */
	$("#btnTree_isHidden").click(function(event)
	{
		alert($("#fieldTree").TreeField("isHidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnTree_Hidden").click(function(event)
	{
		if ($("#fieldTree").TreeField("isHidden"))
		{
			$("#fieldTree").TreeField("show");
		}
		else
		{
			$("#fieldTree").TreeField("hide");
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnTree_isEnable").click(function(event)
	{
		alert($("#fieldTree").TreeField("isDisable"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnTree_Enable").click(function(event)
	{
		if ($("#fieldTree").TreeField("isDisable"))
		{
			$("#fieldTree").TreeField("enable")
		}
		else
		{
			$("#fieldTree").TreeField("disable")
		}
	});
};

init_TreeField_Component = function()
{
	$("#fieldUnitTree").UnitTreeField(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(id, data, id_old, data_old)
		{
			$("#fieldDeptTree").DeptTreeField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function(id_old, data_old)
		{
			$("#fieldDeptTree").DeptTreeField("clear");
		}
	});

	$("#fieldDeptTree").DeptTreeField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnitTree").UnitTreeField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			var unitid = $("#fieldUnitTree").UnitTreeField("id");

			var param =
			{
				unitID : unitid
			};

			return param;
		}
	});
};

$(function()
{
	init_TreeField();

	init_TreeField_Component();

	mc.layout.init();
});