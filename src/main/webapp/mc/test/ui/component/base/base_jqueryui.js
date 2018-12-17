function initRadioGroup()
{
	/**
	 * 初始化单选框组
	 */
	$("#rag1").controlgroup();

	/**
	 * 获取选中id
	 */
	$("#btnRadio_getID").button().click(function()
	{
		alert($("input[name='radiogroup']:checked").val());
	});

	/**
	 * 获取选中文本
	 * 根据label.for属性，找到对应的label标签得到文本
	 */
	$("#btnRadio_getText").button().click(function()
	{
		var id = $("input[name='radiogroup']:checked").attr("id");
		alert($("label[for='" + id + "']").text());
	});

	/**
	 * 设置选中项
	 * 直接指定组件设置
	 */
	$("#btnRadio_setChecked").button().click(function()
	{
		$("#radio2").prop("checked", true);

		$("input[type='radio'][name='radiogroup']").each(function()
		{
			$(this).checkboxradio("refresh");
		})
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnRadio_getVisibleStatus").button().click(function(event)
	{
		alert($("#radio1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnRadio_Visible").button().click(function(event)
	{
		var radio = $("#radio1");
		var label = $("label[for='radio1']");
		if (radio.is(":hidden"))
		{
			radio.show();
			label.show();
		}
		else
		{
			radio.hide();
			label.hide();
		}
		radio.checkboxradio("refresh");
	});

	/**
	 * 是否已禁用
	 */
	$("#btnRadio_getEnableStatus").button().click(function(event)
	{
		alert($("#radio1").checkboxradio("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnRadio_Enable").button().click(function(event)
	{
		var radio = $("#radio1");
		if (radio.checkboxradio("option", "disabled"))
		{
			radio.checkboxradio("enable");
		}
		else
		{
			radio.checkboxradio("disable");
		}

	});
};

function initCheckBox()
{
	/**
	 * 初始化复选框
	 */
	$("#checkbox1").checkboxradio();

	/**
	 * 是否选中
	 */
	$("#btnCheckBox_getChecked").button().click(function()
	{
		alert("选中状态为：" + $("#checkbox1").is(":checked"));
	});

	/**
	 * 获取选中id
	 */
	$("#btnCheckBox_getID").button().click(function()
	{
		if ($("#checkbox1").is(":checked"))
		{
			alert($("#checkbox1:checked").val());
		}
		else
		{
			alert("未选中");
		}
	});

	/**
	 * 获取选中文本
	 */
	$("#btnCheckBox_getText").button().click(function()
	{
		if ($("#checkbox1").is(":checked"))
		{
			var id = $("#checkbox1:checked").attr("id");
			alert($("label[for='" + id + "']").text());
		}
		else
		{
			alert("未选中");
		}
	});

	/**
	 * 设置/取消选中项
	 * 直接指定组件设置
	 */
	$("#btnCheckBox_setChecked").button().click(function()
	{
		if ($("#checkbox1").is(":checked"))
		{
			$("#checkbox1").prop("checked", false);
		}
		else
		{
			$("#checkbox1").prop("checked", true);
		}

		$("#checkbox1").checkboxradio("refresh");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnCheckBox_getVisibleStatus").button().click(function(event)
	{
		alert($("#checkbox1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnCheckBox_Visible").button().click(function(event)
	{
		var checkbox = $("#checkbox1");
		var label = $("label[for='checkbox1']");
		if (checkbox.is(":hidden"))
		{
			checkbox.show();
			label.show();
		}
		else
		{
			checkbox.hide();
			label.hide();
		}
		checkbox.checkboxradio("refresh");
	});

	/**
	 * 是否已禁用
	 */
	$("#btnCheckBox_getEnableStatus").button().click(function(event)
	{
		alert($("#checkbox1").checkboxradio("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnCheckBox_Enable").button().click(function(event)
	{
		var checkbox = $("#checkbox1");

		if (checkbox.checkboxradio("option", "disabled"))
		{
			checkbox.checkboxradio("enable");
		}
		else
		{
			checkbox.checkboxradio("disable");
		}
	});
};

function initCheckBoxGroup()
{
	/**
	 * 初始化复选框组
	 */
	$("#chg1").controlgroup();

	/**
	 * 获取选择ID
	 */
	$("#btnCheckBoxGroup_getID").button().click(function()
	{
		var id = "";
		var array = $("input[type='checkbox'][name='brand']:checked");
		for (var i = 0; i < array.length; i++)
		{
			var htmlDOM = array[i];
			id += $(htmlDOM).val() + ", ";
		}
		alert(id);
	});

	/**
	 * 获取选择文本
	 */
	$("#btnCheckBoxGroup_getText").button().click(function()
	{
		var text = "";
		var array = $("input[type='checkbox'][name='brand']:checked");
		for (var i = 0; i < array.length; i++)
		{
			var htmlDOM = array[i];
			var id = $(htmlDOM).attr("id");
			text += $("label[for='" + id + "']").text() + ", ";
		}
		alert(text);
	});

	/**
	 * 设置选择项
	 */
	$("#btnCheckBoxGroup_setChecked").button().click(function()
	{
		$("input[type='checkbox'][name='brand']").each(function()
		{
			$(this).prop("checked", false);
		})
		
		$("#checkbox4").prop("checked", true);
		$("#checkbox5").prop("checked", true);

		$("input[type='checkbox'][name='brand']").each(function()
		{
			$(this).checkboxradio("refresh");
		})

		alert("已选中华为和小米");
	});
};

function initButton()
{
	/**
	 * 初始化按钮
	 */	
	$("#btnGroup").controlgroup();



	$("#btnOK").button();

	/**
	 * 获取按钮文本
	 */
	$("#btnButton_getText").button().click(function()
	{
		alert($("#btnOK").text());
	});

	/**
	 * 设置按钮文本
	 */
	$("#btnButton_setText").button().click(function()
	{
		$("#btnOK").text("取消(示例按钮)");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnButton_getVisibleStatus").button().click(function(event)
	{
		alert($("#btnOK").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnButton_Visible").button().click(function(event)
	{
		var button = $("#btnOK");
		if (button.is(":hidden"))
		{
			button.show();
		}
		else
		{
			button.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnButton_getEnableStatus").button().click(function(event)
	{
		alert($("#btnOK").button("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnButton_Enable").button().click(function(event)
	{
		var button = $("#btnOK");
		if (button.button("option", "disabled"))
		{
			button.button("enable");
		}
		else
		{
			button.button("disable");
		}
	});
};

$(function()
{
	initRadioGroup();

	initCheckBox();

	initCheckBoxGroup();

	initButton();
});

