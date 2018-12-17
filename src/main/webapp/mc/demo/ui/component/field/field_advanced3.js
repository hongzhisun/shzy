init_FieldVies = function()
{
	$("#gridFieldDept_Name").DeptGridField();

	$("#gridFieldDept_Code").DeptGridField(
	{
		field_text : "deptCode",
		changeCallback : function(id, data, id_old, data_old)
		{
			$("#deptName").val(data.deptName);
		},
		clearCallback : function(id_old, data_old)
		{
			$("#deptName").val();
		}
	});

	$("#cmbDept_CodeName").DeptComboBox(
	{
		width : 300,
		field_text : "deptText",
		dataFilterCallback : function(responseData)
		{
			if (responseData.success && mc.isArray(responseData.data))
			{
				for (var i = 0; i < responseData.data.length; i++)
				{
					var row = responseData.data[i];
					row.deptText = row.deptCode + "/" + row.deptName;
				}
			}
		}
	});


	$("#gridFieldDept_CodeName").DeptGridField(
	{
		multi_mode : true,
		field_text : "deptText",
		dataFilterCallback : function(responseData)
		{
			if (responseData.success && mc.isArray(responseData.data))
			{
				for (var i = 0; i < responseData.data.length; i++)
				{
					var row = responseData.data[i];
					row.deptText = row.deptCode + "/" + row.deptName;
				}
			}
		}
	});

	$("#treeFieldDept_CodeName").DeptTreeField(
	{
		multi_mode : true,
		field_text : "deptText",
		dataFilterCallback : function(responseData)
		{
			if (responseData.success && mc.isArray(responseData.data))
			{
				for (var i = 0; i < responseData.data.length; i++)
				{
					var row = responseData.data[i];
					row.deptText = row.deptCode + "/" + row.deptName;
				}
			}
		}
	});
};

init_StaticComboBox = function()
{
	$("#cmbStaticData").ComboBox();

	$("#cmbStatus").StatusComboBox();

	$("#cmbYesNo").YesNoComboBox();
	
	/**
	 * 获取数据
	 */
	$("#btnStaticData_getData").click(function(event)
	{
		var combobox = $("#cmbStaticData");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + combobox.ComboBox("isSelect") + "<br>";
		msg += "获取索引号(getIndex)=" + combobox.ComboBox("index") + "<br>";
		msg += "获取id(getId)=" + combobox.ComboBox("id") + "<br>";
		msg += "获取显示文本(getText)=" + combobox.ComboBox("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(combobox.ComboBox("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置id(id/setId)
	 */
	$("#btnStaticData_setID").click(function(event)
	{
		$("#cmbStaticData").ComboBox("id", "pc3");
		mc.msg("已设置ID=pc3的省份，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});

	/**
	 * 获取数据
	 */
	$("#btnStatus_getData").click(function(event)
	{
		var combobox = $("#cmbStatus");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + combobox.StatusComboBox("isSelect") + "<br>";
		msg += "获取索引号(getIndex)=" + combobox.StatusComboBox("index") + "<br>";
		msg += "获取id(getId)=" + combobox.StatusComboBox("id") + "<br>";
		msg += "获取显示文本(getText)=" + combobox.StatusComboBox("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(combobox.StatusComboBox("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置id(id/setId)
	 */
	$("#btnStatus_setID").click(function(event)
	{
		$("#cmbStatus").StatusComboBox("id", 1);
		mc.msg("已设置ID=1，表示启用状态，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});

	/**
	 * 获取数据
	 */
	$("#btnYesNo_getData").click(function(event)
	{
		var combobox = $("#cmbYesNo");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + combobox.YesNoComboBox("isSelect") + "<br>";
		msg += "获取索引号(getIndex)=" + combobox.YesNoComboBox("index") + "<br>";
		msg += "获取id(getId)=" + combobox.YesNoComboBox("id") + "<br>";
		msg += "获取显示文本(getText)=" + combobox.YesNoComboBox("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(combobox.YesNoComboBox("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置id(id/setId)
	 */
	$("#btnYesNo_setID").click(function(event)
	{
		$("#cmbYesNo").YesNoComboBox("id", 1);
		mc.msg("已设置ID=1，表示“是”，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
};

init_DynamicComboBox = function()
{
	$("#cmbDynamicData").DynamicComboBox(
	{
		url : "demo/province/list",
		field_id : "id",
		field_text : "name",
	});
	$("#cmbDept").DeptComboBox();

	/**
	 * 获取数据
	 */
	$("#btnDynamicData_getData").click(function(event)
	{
		var combobox = $("#cmbDynamicData");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + combobox.DynamicComboBox("isSelect") + "<br>";
		msg += "获取索引号(getIndex)=" + combobox.DynamicComboBox("index") + "<br>";
		msg += "获取id(getId)=" + combobox.DynamicComboBox("id") + "<br>";
		msg += "获取显示文本(getText)=" + combobox.DynamicComboBox("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(combobox.DynamicComboBox("data")) + "<br>";
		msg += "获取属性code(getAttr('code'))=" + combobox.DynamicComboBox("attr", "code") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnDynamicData_setData").click(function(event)
	{
		var data = { id : "id320000", code : "code320000", name : "江苏省" }
		$("#cmbDynamicData").DynamicComboBox("data", data);
		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnDynamicData_setInitData").click(function(event)
	{
		var id = "id330000";
		var text = "浙江省";
		$("#cmbDynamicData").DynamicComboBox("setInitData", id, text);
		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	
	/**
	 * 获取数据
	 */
	$("#btnComboBoxDept_getData").click(function(event)
	{
		var combobox = $("#cmbDept");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + combobox.DeptComboBox("isSelect") + "<br>";
		msg += "获取索引号(getIndex)=" + combobox.DeptComboBox("index") + "<br>";
		msg += "获取id(getId)=" + combobox.DeptComboBox("id") + "<br>";
		msg += "获取显示文本(getText)=" + combobox.DeptComboBox("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(combobox.DeptComboBox("data")) + "<br>";
		msg += "获取属性code(getAttr('deptCode'))=" + combobox.DeptComboBox("attr", "deptCode") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnComboBoxDept_setData").click(function(event)
	{
		var data = { deptID : "id0003", deptCode : "code0003", deptName : "财务部" }
		$("#cmbDept").DeptComboBox("data", data);
		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnComboBoxDept_setInitData").click(function(event)
	{
		var id = "id0004";
		var text = "人力资源部";
		$("#cmbDept").DeptComboBox("setInitData", id, text);
		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
};

init_GridField = function()
{
	$("#gridFieldDept_Single").DeptGridField();
	$("#gridFieldDept_Multi").DeptGridField(
	{
		multi_mode : true
	});

	/**
	 * 获取数据
	 */
	$("#btnGridFieldDept_Single_getData").click(function(event)
	{
		var field = $("#gridFieldDept_Single");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + field.DeptGridField("isSelect") + "<br>";
		msg += "获取id(getId)=" + field.DeptGridField("id") + "<br>";
		msg += "获取显示文本(getText)=" + field.DeptGridField("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(field.DeptGridField("data")) + "<br>";
		msg += "获取属性code(getAttr('deptCode'))=" + field.DeptGridField("attr", "deptCode") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnGridFieldDept_Single_setData").click(function(event)
	{
		var data = { deptID : "id0003", deptCode : "code0003", deptName : "财务部" }
		$("#gridFieldDept_Single").DeptGridField("data", data);

		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnGridFieldDept_Single_setInitData").click(function(event)
	{
		var id = "id0004";
		var text = "人力资源部";
		$("#gridFieldDept_Single").DeptGridField("setInitData", id, text);

		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});

	/**
	 * 获取数据
	 */
	$("#btnGridFieldDept_Multi_getData").click(function(event)
	{
		var field = $("#gridFieldDept_Multi");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + field.DeptGridField("isSelect") + "<br>";
		msg += "获取id(getId)=" + field.DeptGridField("id") + "<br>";
		msg += "获取显示文本(getText)=" + field.DeptGridField("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(field.DeptGridField("data")) + "<br>";
		msg += "获取属性code(getAttr('deptCode'))=" + field.DeptGridField("attr", "deptCode") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnGridFieldDept_Multi_setData").click(function(event)
	{
		var data =
		[ 
		 	{ deptID : "id0003", deptCode : "code0003", deptName : "财务部" },
		 	{ deptID : "id0005", deptCode : "code0005", deptName : "市场部" }
		];
		$("#gridFieldDept_Multi").DeptGridField("data", data);

		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnGridFieldDept_Multi_setInitData").click(function(event)
	{
		var id = "id0004, id0006";
		var text = "人力资源部, 采购部";
		$("#gridFieldDept_Multi").DeptGridField("setInitData", id, text);

		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
};

init_TreeField = function()
{
	$("#treeFieldDept_Single").DeptTreeField();

	$("#treeFieldDept_Multi").DeptTreeField(
	{
		multi_mode : true
	});

	/**
	 * 获取数据
	 */
	$("#btnTreeFieldDept_Single_getData").click(function(event)
	{
		var field = $("#treeFieldDept_Single");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + field.DeptTreeField("isSelect") + "<br>";
		msg += "获取id(getId)=" + field.DeptTreeField("id") + "<br>";
		msg += "获取显示文本(getText)=" + field.DeptTreeField("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(field.DeptTreeField("data")) + "<br>";
		msg += "获取属性code(getAttr('deptCode'))=" + field.DeptTreeField("attr", "deptCode") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnTreeFieldDept_Single_setData").click(function(event)
	{
		var data = { deptID : "id0003", deptCode : "code0003", deptName : "财务部" }
		$("#treeFieldDept_Single").DeptTreeField("data", data);

		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnTreeFieldDept_Single_setInitData").click(function(event)
	{
		var id = "id0004";
		var text = "人力资源部";
		$("#treeFieldDept_Single").DeptTreeField("setInitData", id, text);

		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});

	/**
	 * 获取数据
	 */
	$("#btnTreeFieldDept_Multi_getData").click(function(event)
	{
		var field = $("#treeFieldDept_Multi");
		var msg = "读取已选择项数据：<br>";
		msg += "是否已选择(isSelect)=" + field.DeptTreeField("isSelect") + "<br>";
		msg += "获取id(getId)=" + field.DeptTreeField("id") + "<br>";
		msg += "获取显示文本(getText)=" + field.DeptTreeField("text") + "<br>";
		msg += "获取json数据对象(getData)=" + mc.encode(field.DeptTreeField("data")) + "<br>";
		msg += "获取属性code(getAttr('deptCode'))=" + field.DeptTreeField("attr", "deptCode") + "<br>";

		mc.alert(msg);
	});
	/**
	 * setData
	 */
	$("#btnTreeFieldDept_Multi_setData").click(function(event)
	{
		var data =
		[ 
		 	{ deptID : "id0003", deptCode : "code0003", deptName : "财务部" },
		 	{ deptID : "id0005", deptCode : "code0005", deptName : "市场部" }
		];
		$("#treeFieldDept_Multi").DeptTreeField("data", data);

		mc.msg("已设置data=" + mc.encode(data) + "的选项，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
	/**
	 * setInitData
	 */
	$("#btnTreeFieldDept_Multi_setInitData").click(function(event)
	{
		var id = "id0004, id0006";
		var text = "人力资源部, 采购部";
		$("#treeFieldDept_Multi").DeptTreeField("setInitData", id, text);

		mc.msg("已设置setInitData('" + id + "', '" + text + "')，之后请点击【获取数据】按钮，检查取数接口是否能正常工作。");
	});
};

$(function()
{
	init_FieldVies();

	init_StaticComboBox();

	init_DynamicComboBox();

	init_GridField();

	init_TreeField();

	mc.layout.init();
});