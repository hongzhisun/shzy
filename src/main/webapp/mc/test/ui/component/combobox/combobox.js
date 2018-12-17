initStaticComboBox = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbStaticData").ComboBox();

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
		msg += "key=" + combobox.ComboBox("key") + "<br>";
		msg += "文本=" + combobox.ComboBox("text") + "<br>";
		msg += "数据(json)=" + mc.encode(combobox.ComboBox("data")) + "<br>";
		msg += "属性name=" + combobox.ComboBox("attr", "name") + "<br>";

		mc.alert(msg);
	});

	/**
	 * 设置选择项(按照序号)
	 */
	$("#btnStaticData_setIndex").click(function(event)
	{
		$("#cmbStaticData").ComboBox("index", 2);
		mc.alert("已设置选中第2个选项");
	});

	/**
	 * 设置选择项(按照ID)
	 */
	$("#btnStaticData_setID").click(function(event)
	{
		$("#cmbStaticData").ComboBox("key", "pc3");
		mc.alert("已设置ID=pc3的选项");
	});

	/**
	 * 设置为不选中
	 */
	$("#btnStaticData_clear").click(function(event)
	{
		$("#cmbStaticData").ComboBox("clear");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnJQueryData_isHidden").click(function(event)
	{
		mc.alert($("#cmbStaticData").ComboBox("isHidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnJQueryData_Hidden").click(function(event)
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
	$("#btnJQueryData_isEnable").click(function(event)
	{
		mc.alert($("#cmbStaticData").ComboBox("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnJQueryData_Enable").click(function(event)
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
	$("#cmbDynamicData").ComboBox(
	{
		url : "demo/ui/province/list",
		data_key : "id",
		data_text : "name"		
	});

	/**
	 * 重新获取后台数据
	 */
	$("#btnDynamicData_reloadData").click(function(event)
	{
		$("#cmbDynamicData").ComboBox("reloadData");
	});

	/**
	 * 是否已选择
	 */
	$("#btnDynamicData_isSelect").click(function(event)
	{
		mc.alert("已选择=" + $("#cmbDynamicData").ComboBox("isSelect"));
	});

	/**
	 * 获取已选择项数据
	 */
	$("#btnDynamicData_getData").click(function(event)
	{
		var combobox = $("#cmbDynamicData");
		var msg = "读取已选择项数据：<br>";
		msg += "索引号=" + combobox.ComboBox("index") + "<br>";
		msg += "key=" + combobox.ComboBox("key") + "<br>";
		msg += "文本=" + combobox.ComboBox("text") + "<br>";
		msg += "数据(json)=" + mc.encode(combobox.ComboBox("data")) + "<br>";
		msg += "属性name=" + combobox.ComboBox("attr", "name") + "<br>";

		mc.alert(msg);
	});
};

initMulitLevel = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbProvince").ComboBox(
	{
		url : "demo/ui/province/list",
		data_key : "id",
		data_text : "name",
		change : function(event, ui)
		{
			var param =
			{
				provinceid : $("#cmbProvince").ComboBox("key")
			};

			$("#cmbCity").ComboBox("reloadData", param);
		}
	});

	$("#cmbCity").ComboBox(
	{
		url : "demo/ui/city/list",
		data_key : "id",
		data_text : "name"
	});
};

$.widget("mc.ProvinceComboBox", $.mc.ComboBox,
{
	options :
	{
		/**
		 * 获取数据url
		 */
		url : "demo/ui/province/list",
		/**
		 * id字段
		 */
		data_key : "id",
		/**
		 * 显示字段
		 */
		data_text : "name"
	}
});

initBusiComponent = function()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbBusiProvince").ProvinceComboBox();
};

$(function()
{
	initStaticComboBox();

	initDynamicDataComboBox();

	initMulitLevel();

	initBusiComponent();
});