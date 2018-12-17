init_Label = function()
{
	/**
	 * 获取文本框值
	 */
	$("#btnLabel_getText").click(function(event)
	{
		alert($("#label1").text());
	});

	/**
	 * 获取文本框值
	 */
	$("#btnLabel_setText").click(function(event)
	{
		$("#label1").text("文本标签内容(新)");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnLabel_isVisible").click(function(event)
	{
		alert($("#label1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnLabel_Hide").click(function(event)
	{
		var label = $("#label1");
		if (label.is(":hidden"))
		{
			label.show();
		}
		else
		{
			label.hide();
		}
	});
};

init_Text = function()
{
	/**
	 * 获取文本
	 */
	$("#btnText_getText").click(function(event)
	{
		alert($("#inputUserName").val());
	});

	/**
	 * 设置文本
	 */
	$("#btnText_setText").click(function(event)
	{
		$("#inputUserName").val("abc123");
		alert("已设值abc123");
	});

	/**
	 * 是否隐藏
	 */
	$("#btnText_isHidden").click(function(event)
	{
		alert($("#inputUserName").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnText_Hide").click(function(event)
	{
		var input = $("#inputUserName");
		if (input.is(":hidden"))
		{
			input.show();
		}
		else
		{
			input.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnText_isDisable").click(function(event)
	{
		alert($("#inputUserName").prop("disabled"));

		alert($("#inputUserName").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnText_Disable").click(function(event)
	{
		var input = $("#inputUserName");
		if (input.prop("disabled"))
		{
			input.prop("disabled", false);
		}
		else
		{
			input.prop("disabled", true);
		}

/*另一种实现
		if (input.attr("disabled") == "disabled")
		{
			input.removeAttr("disabled");
		}
		else
		{
			input.attr("disabled", "disabled");
		}
*/
	});

	$("#btnText_isReadOnly").click(function(event)
	{
		alert($("#inputUserName").prop("readonly"));
	});

	$("#btnText_ReadOnly").click(function(event)
	{
		var input = $("#inputUserName");
		if (input.prop("readonly"))
		{
			input.prop("readonly", false);
		}
		else
		{
			input.prop("readonly", true);
		}
	});
};

init_Password = function()
{
	/**
	 * 获取文本
	 */
	$("#btnPassword_getText").click(function(event)
	{
		alert($("#inputPassword").val());
	});

	/**
	 * 设置文本
	 */
	$("#btnPassword_setText").click(function(event)
	{
		$("#inputPassword").val("abc123");
		alert("已设值abc123");
	});

	/**
	 * 是否隐藏
	 */
	$("#btnPassword_isHidden").click(function(event)
	{
		alert($("#inputPassword").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnPassword_Hide").click(function(event)
	{
		var input = $("#inputPassword");
		if (input.is(":hidden"))
		{
			input.show();
		}
		else
		{
			input.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnPassword_isDisable").click(function(event)
	{
		alert($("#inputPassword").prop("disabled"));

		alert($("#inputPassword").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnPassword_Disable").click(function(event)
	{
		var input = $("#inputPassword");
		if (input.prop("disabled"))
		{
			input.prop("disabled", false);
		}
		else
		{
			input.prop("disabled", true);
		}

/*另一种实现
		if (input.attr("disabled") == "disabled")
		{
			input.removeAttr("disabled");
		}
		else
		{
			input.attr("disabled", "disabled");
		}
*/
	});
};

init_NumberField = function()
{
	$("#inputNumber").NumberField(
	{
		decimal : 4,
		thousands : true
	});

	$("#btnNumber_getNumber").click(function(event)
	{
		alert("element.val()=" + $("#inputNumber").val());
		alert("element.NumberField(\"getValue\")=" + $("#inputNumber").NumberField("getValue"));
	});

	$("#btnNumber_setNumber").click(function(event)
	{
		$("#inputNumber").NumberField("setValue", $("#inputNumberValue").val());
	});

	$("#btnNumber_setDecimal").click(function(event)
	{
		$("#inputNumber").NumberField("option", "decimal", $("#inputNumberDecimal").val());
	});

	/**
	 * 是否隐藏
	 */
	$("#btnNumber_isHidden").click(function(event)
	{
		alert($("#inputNumber").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnNumber_Hide").click(function(event)
	{
		var input = $("#inputNumber");
		if (input.is(":hidden"))
		{
			input.show();
		}
		else
		{
			input.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnNumber_isDisable").click(function(event)
	{
		alert($("#inputNumber").prop("disabled"));

		alert($("#inputNumber").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnNumber_Disable").click(function(event)
	{
		var input = $("#inputNumber");
		if (input.prop("disabled"))
		{
			input.prop("disabled", false);
		}
		else
		{
			input.prop("disabled", true);
		}

/*另一种实现
		if (input.attr("disabled") == "disabled")
		{
			input.removeAttr("disabled");
		}
		else
		{
			input.attr("disabled", "disabled");
		}
*/
	});
};

init_MoneyField = function()
{
	$("#inputMoney").MoneyField();

	$("#btnMoney_getMoney").click(function(event)
	{
		alert("element.val()=" + $("#inputMoney").val());
		alert("element.MoneyField(\"getValue\")=" + $("#inputMoney").MoneyField("getValue"));
	});

	$("#btnMoney_setMoney").click(function(event)
	{
		$("#inputMoney").MoneyField("setValue", $("#inputMoneyValue").val());
	});

	$("#btnMoney_setSign").click(function(event)
	{
		$("#inputMoney").MoneyField("option", "currency_sign", $("#inputMoneySign").val());
	});

	$("#btnMoney_setDecimal").click(function(event)
	{
		$("#inputMoney").MoneyField("option", "decimal", $("#inputMoneyDecimal").val());
	});

	/**
	 * 是否隐藏
	 */
	$("#btnMoney_isHidden").click(function(event)
	{
		alert($("#inputMoney").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnMoney_Hide").click(function(event)
	{
		var input = $("#inputMoney");
		if (input.is(":hidden"))
		{
			input.show();
		}
		else
		{
			input.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnMoney_isDisable").click(function(event)
	{
		alert($("#inputMoney").prop("disabled"));

		alert($("#inputMoney").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnMoney_Disable").click(function(event)
	{
		var input = $("#inputMoney");
		if (input.prop("disabled"))
		{
			input.prop("disabled", false);
		}
		else
		{
			input.prop("disabled", true);
		}

/*另一种实现
		if (input.attr("disabled") == "disabled")
		{
			input.removeAttr("disabled");
		}
		else
		{
			input.attr("disabled", "disabled");
		}
*/
	});
};

init_TextArea = function()
{
	/**
	 * 获取文本
	 */
	$("#btnTextArea_getText").click(function(event)
	{
		alert($("#textarea").val());
	});

	/**
	 * 设置文本
	 */
	$("#btnTextArea_setText").click(function(event)
	{
		$("#textarea").val("abc123\r\nbbbbb\r\nccccc");
		alert("已设值abc123\r\nbbbbb\r\nccccc");
	});

	/**
	 * 是否隐藏
	 */
	$("#btnTextArea_isHidden").click(function(event)
	{
		alert($("#textarea").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnTextArea_Hide").click(function(event)
	{
		var input = $("#textarea");
		if (input.is(":hidden"))
		{
			input.show();
		}
		else
		{
			input.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnTextArea_isDisable").click(function(event)
	{
		alert($("#textarea").prop("disabled"));

		alert($("#textarea").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnTextArea_Disable").click(function(event)
	{
		var input = $("#textarea");
		if (input.prop("disabled"))
		{
			input.prop("disabled", false);
		}
		else
		{
			input.prop("disabled", true);
		}

/*另一种实现
		if (input.attr("disabled") == "disabled")
		{
			input.removeAttr("disabled");
		}
		else
		{
			input.attr("disabled", "disabled");
		}
*/
	});
};

init_RadioGroup = function()
{
	/**
	 * 获取选中id
	 */
	$("#btnRadio_getID").click(function(event)
	{
		alert($("input[name='sex']:checked").val());
	});

	/**
	 * 获取选中文本
	 * 根据label.for属性，找到对应的label标签得到文本
	 */
	$("#btnRadio_getText").click(function(event)
	{
		var id = $("input[name='sex']:checked").attr("id");
		alert($("label[for='" + id + "']").text());
	});

	/**
	 * 设置选中项
	 * 直接指定组件设置
	 */
	$("#btnRadio_setChecked").click(function(event)
	{
		$("#radio2").prop("checked", true);
	});

	/**
	 * 是否隐藏
	 */
	$("#btnRadio_isHidden").click(function(event)
	{
		alert($("#radio1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnRadio_Hide").click(function(event)
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
	});

	/**
	 * 是否禁用
	 */
	$("#btnRadio_isDisable").click(function(event)
	{
		alert($("#radio1").prop("disabled"));

		alert($("#radio1").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnRadio_Disable").click(function(event)
	{
		var radio = $("#radio1");
		if (radio.prop("disabled"))
		{
			radio.prop("disabled", false);
		}
		else
		{
			radio.prop("disabled", true);
		}

/*另一种实现
		if (radio.attr("disabled") == "disabled")
		{
			radio.removeAttr("disabled");
		}
		else
		{
			radio.attr("disabled", "disabled");
		}
*/
	});
};

init_CheckBox = function()
{
	/**
	 * 是否选中
	 */
	$("#btnCheckBox_getChecked").click(function(event)
	{
		alert("选中状态为：" + $("#checkbox1").is(":checked"));
	});

	/**
	 * 获取选中id
	 */
	$("#btnCheckBox_getID").click(function(event)
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
	$("#btnCheckBox_getText").click(function(event)
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
	$("#btnCheckBox_setChecked").click(function(event)
	{
		if ($("#checkbox1").is(":checked"))
		{
			$("#checkbox1").prop("checked", false);
		}
		else
		{
			$("#checkbox1").prop("checked", true);
		}
	});

	/**
	 * 是否隐藏
	 */
	$("#btnCheckBox_isHidden").click(function(event)
	{
		alert($("#checkbox1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnCheckBox_Hide").click(function(event)
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
	});

	/**
	 * 是否禁用
	 */
	$("#btnCheckBox_isDisable").click(function(event)
	{
		alert($("#checkbox1").prop("disabled"));

		alert($("#checkbox1").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnCheckBox_Disable").click(function(event)
	{
		var checkbox = $("#checkbox1");
		if (checkbox.prop("disabled"))
		{
			checkbox.prop("disabled", false);
		}
		else
		{
			checkbox.prop("disabled", true);
		}

/*另一种实现
		if (checkbox.attr("disabled") == "disabled")
		{
			checkbox.removeAttr("disabled");
		}
		else
		{
			checkbox.attr("disabled", "disabled");
		}
*/
	});
};

init_CheckBoxGroup = function()
{
	/**
	 * 获取选择ID
	 */
	$("#btnCheckBoxGroup_getID").click(function(event)
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
	$("#btnCheckBoxGroup_getText").click(function(event)
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
	$("#btnCheckBoxGroup_setChecked").click(function(event)
	{
		$("input[type='checkbox'][name='brand']").each(function()
		{
			$(this).prop("checked", false);
		})
		
		$("#checkbox5").prop("checked", true);
		$("#checkbox6").prop("checked", true);
		alert("已选中华为和小米");
	});
};

init_DateField = function()
{
	$("#inputDate").DateField();

	/**
	 * 获取日期文本
	 */
	$("#btnDate_getDateText").click(function(event)
	{
		alert($("#inputDate").val());
	});

	/**
	 * 获取日期对象
	 */
	$("#btnDate_getDate").click(function(event)
	{
		alert($("#inputDate").DateField("getDate"));
	});

	/**
	 * 设置日期文本
	 */
	$("#btnDate_setDateText").click(function(event)
	{
		$("#inputDate").val("2017-10-03");
	});

	/**
	 * 设置日期对象
	 */
	$("#btnDate_setDate").click(function(event)
	{
		var date = new Date();
		date.setDate(date.getDate() - 3);
		$("#inputDate").DateField("setDate", date);
	});

	/**
	 * 设置显示格式
	 */
	$("#btnDate_setFormat").click(function(event)
	{
		$("#inputDate").DateField("option", "dateFormat", "yy/mm/dd");
		alert("已设置显示格式为yy/mm/dd");
	});

	/**
	 * 允许选择年份月份
	 */
	$("#btnDate_setYearMonth").click(function(event)
	{
		$("#inputDate").DateField("option",
		{
			changeYear : true,
			changeMonth : true
		});
	});

	/**
	 * 限制选择时间范围
	 */
	$("#btnDate_Range").click(function(event)
	{
		$("#inputDate").DateField("option", 
		{
			minDate : new Date(2017, 8 - 1 , 1),
			maxDate : new Date(2017, 12 - 1, 31)
		});
		alert("已设置选择范围从2017-08-01到2017-12-31");
	});

	/**
	 * 是否禁用
	 */
	$("#btnDate_isDisable").click(function(event)
	{
		alert($("#inputDate").DateField("isDisabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnDate_Disable").click(function(event)
	{
		var inputDate = $("#inputDate");
		if (inputDate.DateField("isDisabled"))
		{
			inputDate.DateField("enable");
		}
		else
		{
			inputDate.DateField("disable");
		}
	});
};

$(function()
{
	init_Label();

	init_Text();

	init_Password();

	init_NumberField();

	init_MoneyField();

	init_TextArea();

	init_RadioGroup();

	init_CheckBox();

	init_CheckBoxGroup();

	init_DateField();
});