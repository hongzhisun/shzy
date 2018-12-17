init_GridField = function()
{
	$("#fieldGrid").GridField(
	{
		id : "grid_field_id",
		place_text : "请选择省份...",/* 初始占位文本 */
		allowClear : true,			/* 是否显示清除按钮 */
		title : "选择",				/* 对话框标题 */
		width : "400",				/* 对话框宽度 */
		height : "400",				/* 对话框高度 */
		resize : false,				/* 对话框是否可拉伸 */
		maxmin : false,				/* 对话框是否可最大化最小化 */
		multi_mode : false,			/* 复选模式 */
		pager_mode : false,			/* 分页模式 */
		col_model : [				/* 列模式 */
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
		} ],						
		url : "demo/province/list",	/* 数据url */
		query_param	 : null,		/* 查询参数对象。 */
		data_root : "data",			/* 返回数据节点root */
		data_rows : "total",		/* 返回分页数据总行数 */
		data_pages : "total_page",	/* 返回分页数据总页数 */
		field_id : "id",			/* id字段 */
		field_text : "name",		/* text字段 */
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
			var text = $("#textFieldGrid").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldGrid").val(text + "触发选择后回调函数(selectCallback)，当前选择为=" + mc.encode(data));
		},
		/**
		 * 选择值变化后回调
		 */
		changeCallback : function(id, data, id_old, data_old)
		{
			var text = $("#textFieldGrid").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldGrid").val(text + "触发值变化后回调函数(changeCallback)，当前选择为=" + mc.encode(data) + "，之前选择为=" + mc.encode(data_old));
		},
		/**
		 * 清除后回调
		 */
		clearCallback : function(id_old, data_old)
		{
			var text = $("#textFieldGrid").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textFieldGrid").val(text + "触发清除选中回调函数(clearCallback)，之前选择为=" + mc.encode(data_old));
		}
	});

	/**
	 * 是否已选择
	 */
	$("#btnGrid_isSelect").click(function(event)
	{
		mc.alert("已选择=" + $("#fieldGrid").GridField("isSelect"));
	});

	/**
	 * 获取已选择项数据
	 */
	$("#btnGrid_getData").click(function(event)
	{
		var field = $("#fieldGrid");
		var msg = "读取已选择项数据：<br>";
		msg += "id=" + field.GridField("id") + "<br>";
		msg += "文本=" + field.GridField("text") + "<br>";
		msg += "数据对象(json)=" + mc.encode(field.GridField("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置数据
	 */
	$("#btnGrid_setData").click(function(event)
	{
		var data =
		{
			id : "320000",
			code : "320000",
			name : "江苏省"
		};
		$("#fieldGrid").GridField("data", data);
		mc.alert("已设置数据, data=" + mc.encode(data));
	});

	/**
	 * 清除数据
	 */
	$("#btnGrid_clear").click(function(event)
	{
		$("#fieldGrid").GridField("clear");
	});

	/**
	 * 是否隐藏
	 */
	$("#btnGrid_isHidden").click(function(event)
	{
		alert($("#fieldGrid").GridField("isHidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnGrid_Hidden").click(function(event)
	{
		if ($("#fieldGrid").GridField("isHidden"))
		{
			$("#fieldGrid").GridField("show");
		}
		else
		{
			$("#fieldGrid").GridField("hide");
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnGrid_isEnable").click(function(event)
	{
		alert($("#fieldGrid").GridField("isDisable"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnGrid_Enable").click(function(event)
	{
		if ($("#fieldGrid").GridField("isDisable"))
		{
			$("#fieldGrid").GridField("enable")
			mc.alert("省份弹窗选择组件已启用, 允许选择");
		}
		else
		{
			$("#fieldGrid").GridField("disable")
			mc.alert("省份弹窗选择组件已禁用, 不允许选择");
		}
	});

	/**
	 * 清除但不触发回调
	 */
	$("#btnGrid_clear2").click(function(event)
	{
		$("#fieldGrid").GridField("clear", false);
	});
};

init_GridField_Component = function()
{
	$("#fieldProvince").ProvinceField(
	{
		id : "province_field_id",
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(id, data, id_old, data_old)
		{
			$("#fieldCity").CityField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function(id_old, data_old)
		{
			$("#fieldCity").CityField("clear");
		}
	});

	$("#fieldCity").CityField(
	{
		id : "city_field_id",
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldProvince").ProvinceField("isSelect"))
			{
				mc.alert("请先选择省份");
				return false;
			}

			var provinceId = $("#fieldProvince").ProvinceField("id");

			var param =
			{
				filter : mc.encode({ provinceid : provinceId })	
			};

			return param;
		}
	});
};

init_GridField_Search = function()
{
	$("#fieldProvince2").GridField(
	{
		id : "grid_field_id2",
		place_text : "请选择省份...",/* 初始占位文本 */
		allowClear : true,			/* 是否显示清除按钮 */
		title : "选择",				/* 对话框标题 */
		width : "400",				/* 对话框宽度 */
		height : "400",				/* 对话框高度 */
		resize : false,				/* 对话框是否可拉伸 */
		maxmin : false,				/* 对话框是否可最大化最小化 */
		multi_mode : false,			/* 复选模式 */
		pager_mode : false,			/* 分页模式 */
		col_model : [				/* 列模式 */
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
		} ],						
		url : "demo/province/list",	/* 数据url */
		data_root : "data",			/* 返回数据节点root */
		data_rows : "total",		/* 返回分页数据总行数 */
		data_pages : "total_page",	/* 返回分页数据总页数 */
		field_id : "id",			/* id字段 */
		field_text : "name",		/* text字段 */
		beforeOpenCallback : $.noop,
		param_serialize : "filter",	/* 参数序列化 */
		search_option : 			/* 搜索选项 */
		[
		 	{ id : "code", text : "省份编码" },
		 	{ id : "name", text : "省份名称" }
		]
	});
};

$(function()
{
	init_GridField();

	init_GridField_Component();

	init_GridField_Search();

	mc.layout.init();
});