initStaticComboBox = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbStaticData").ComboBox(
	{
		height : 150,		/* 下拉列表高度。默认为200。如设置为undefined，则下拉列表不限制高度。 */
		/**
		 * 选择后回调函数
		 */
		selectCallback : function(index, id, data, event, ui)
		{
			var text = $("#textStaticData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textStaticData").val(text + "触发选择后回调函数(selectCallback)，当前选择为=" + mc.encode(data));
		},
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			var text = $("#textStaticData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textStaticData").val(text + "触发值变化后回调函数(changeCallback)，当前选择为=" + mc.encode(data) + "，之前选择为=" + mc.encode(data_old));
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			var text = $("#textStaticData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textStaticData").val(text + "触发清除选中回调函数(clearCallback)");
		}
	});

	/**
	 * 是否已选择
	 */
	$("#btnStaticData_isSelect").click(function(event)
	{
		mc.alert("已选择=" + $("#cmbStaticData").ComboBox("isSelect"));
	});

	/**
	 * 获取已选择项数据
	 */
	$("#btnStaticData_getData").click(function(event)
	{
		var combobox = $("#cmbStaticData");
		var msg = "读取已选择项数据：<br>";
		msg += "索引号=" + combobox.ComboBox("index") + "<br>";
		msg += "id=" + combobox.ComboBox("id") + "<br>";
		msg += "文本=" + combobox.ComboBox("text") + "<br>";
		msg += "数据对象(json)=" + mc.encode(combobox.ComboBox("data")) + "<br>";

		mc.alert(msg);
	});

	/**
	 * 重新加载数据
	 */
	$("#btnStaticData_reloadData").click(function(event)
	{
		var data = 
		[
		 	{ id : "pc10", name : "四川"},
		 	{ id : "pc11", name : "贵州"},
		 	{ id : "pc12", name : "云南"},
		 	{ id : "pc13", name : "西藏"}
		];

		$("#cmbStaticData").ComboBox("reloadData", data);

		mc.alert("下拉选项已更换为其他数据");
	});

	/**
	 * 清除已选择项
	 */
	$("#btnStaticData_clear").click(function(event)
	{
		$("#cmbStaticData").ComboBox("clear");
	});

	/**
	 * 清除已选择项
	 */
	$("#btnStaticData_clear2").click(function(event)
	{
		$("#cmbStaticData").ComboBox("clear", false);
	});

	/**
	 * 按序号-设置选择项(index/setIndex)
	 */
	$("#btnStaticData_setIndex").click(function(event)
	{
		$("#cmbStaticData").ComboBox("index", 2);
		mc.alert("已设置选中第2个选项");
	});

	/**
	 * 按ID-设置选择项(id/setID)
	 */
	$("#btnStaticData_setID").click(function(event)
	{
		$("#cmbStaticData").ComboBox("id", "pc3");
		mc.alert("已设置ID=pc3的选项");
	});

	/**
	 * 按date-设置选择项(data/setData)
	 */
	$("#btnStaticData_setData").click(function(event)
	{
		var data = { id : "pc4", name : "广东" }
		$("#cmbStaticData").ComboBox("data", data);
		mc.alert("已设置data=" + mc.encode(data) + "的选项");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnStaticData_isHidden").click(function(event)
	{
		mc.alert($("#cmbStaticData").ComboBox("isHidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnStaticData_Hidden").click(function(event)
	{
		var combobox = $("#cmbStaticData");
		if (combobox.ComboBox("isHidden"))
		{
			combobox.ComboBox("show");
		}
		else
		{
			combobox.ComboBox("hide");
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnStaticData_isEnable").click(function(event)
	{
		mc.alert($("#cmbStaticData").ComboBox("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnStaticData_Enable").click(function(event)
	{
		var combobox = $("#cmbStaticData");

		if (combobox.ComboBox("option", "disabled"))
		{
			combobox.ComboBox("enable");
		}
		else
		{
			combobox.ComboBox("disable");
		}
	});
};

initDynamicDataComboBox = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbDynamicData").DynamicComboBox(
	{
		url : "demo/province/list",
		field_id : "id",
		field_text : "name",
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			var param =
			{
				param1 : "100"	
			};

			return true;
		},
		/**
		 * 选择后回调函数
		 */
		selectCallback : function(index, id, data, event, ui)
		{
			var text = $("#textDynamicData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textDynamicData").val(text + "触发选择后回调函数(selectCallback)，当前选择为=" + index + ", " + mc.encode(data));
		},
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			var text = $("#textDynamicData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textDynamicData").val(text + "触发值变化后回调函数(changeCallback)，当前选择为=" + index + ", " + mc.encode(data));
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			var text = $("#textDynamicData").val();
			if ($.trim(text).length > 0)
			{
				text += "\r\n";
			}
			$("#textDynamicData").val(text + "触发清除选中回调函数(clearCallback)");
		}
	});

	/**
	 * 重新获取后台数据
	 */
	$("#btnDynamicData_reloadData").click(function(event)
	{
		$("#cmbDynamicData").DynamicComboBox("reloadData");
	});

	/**
	 * 是否已选择
	 */
	$("#btnDynamicData_isSelect").click(function(event)
	{
		mc.alert("已选择=" + $("#cmbDynamicData").DynamicComboBox("isSelect"));
	});

	/**
	 * 获取已选择项数据
	 */
	$("#btnDynamicData_getData").click(function(event)
	{
		var combobox = $("#cmbDynamicData");
		var msg = "读取已选择项数据：<br>";
		msg += "索引号=" + combobox.DynamicComboBox("index") + "<br>";
		msg += "id=" + combobox.DynamicComboBox("id") + "<br>";
		msg += "文本=" + combobox.DynamicComboBox("text") + "<br>";
		msg += "数据对象(json)=" + mc.encode(combobox.DynamicComboBox("data")) + "<br>";
		msg += "属性name=" + combobox.DynamicComboBox("attr", "name") + "<br>";

		mc.alert(msg);
	});

	/**
	 * 清除已选择项
	 */
	$("#btnDynamicData_clear").click(function(event)
	{
		$("#cmbDynamicData").DynamicComboBox("clear");
	});

	/**
	 * 清除但不触发回调
	 */
	$("#btnDynamicData_clear2").click(function(event)
	{
		$("#cmbDynamicData").DynamicComboBox("clear", false);
	});

	/**
	 * 按序号-设置选择项(index/setIndex)
	 */
	$("#btnDynamicData_setIndex").click(function(event)
	{
		$("#cmbDynamicData").DynamicComboBox("index", 2);
		mc.alert("已设置选中第2个选项");
	});

	/**
	 * 按ID-设置选择项(id/setID)
	 */
	$("#btnDynamicData_setID").click(function(event)
	{
		$("#cmbDynamicData").DynamicComboBox("id", "310000");
		mc.alert("已设置ID=310000的选项");
	});

	/**
	 * 按date-设置选择项(data/setData)
	 */
	$("#btnDynamicData_setData").click(function(event)
	{
		var data = { id : "pc4", name : "广东" }
		$("#cmbDynamicData").DynamicComboBox("data", data);
		mc.alert("已设置data=" + mc.encode(data) + "的选项");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnDynamicData_isHidden").click(function(event)
	{
		mc.alert($("#cmbDynamicData").DynamicComboBox("isHidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnDynamicData_Hidden").click(function(event)
	{
		var combobox = $("#cmbDynamicData");
		if (combobox.DynamicComboBox("isHidden"))
		{
			combobox.DynamicComboBox("show");
		}
		else
		{
			combobox.DynamicComboBox("hide");
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnDynamicData_isEnable").click(function(event)
	{
		mc.alert($("#cmbDynamicData").DynamicComboBox("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnDynamicData_Enable").click(function(event)
	{
		var combobox = $("#cmbDynamicData");

		if (combobox.DynamicComboBox("option", "disabled"))
		{
			combobox.DynamicComboBox("enable");
		}
		else
		{
			combobox.DynamicComboBox("disable");
		}
	});
};


initBusiComponent = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbProvince").ProvinceComboBox(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#cmbCity").CityComboBox("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#cmbCity").CityComboBox("clear");
		}
	});

	$("#cmbCity").CityComboBox(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#cmbProvince").ProvinceComboBox("isSelect"))
			{
				mc.alert("请先选择省份");
				return false;
			}

			var provinceId = $("#cmbProvince").ProvinceComboBox("id");

			var param =
			{
				filter : mc.encode({ provinceid : provinceId })	
			};

			return param;
		}
	});
};

$(function()
{
	initStaticComboBox();

	initDynamicDataComboBox();

	initBusiComponent();
});