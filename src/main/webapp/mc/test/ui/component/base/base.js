function initLabel()
{
	/**
	 * 获取文本框值
	 */
	$("#btnLabel_getText").button().click(function()
	{
		alert($("#label1").text());
	});

	/**
	 * 获取文本框值
	 */
	$("#btnLabel_setText").button().click(function()
	{
		$("#label1").text("文本标签内容(新)");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnLabel_getVisibleStatus").button().click(function(event)
	{
		alert($("#label1").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnLabel_Visible").button().click(function(event)
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

	/**
	 * 点击事件
	 */
	$("#label2").click(function(event)
	{
		/**
		 * 事件内部this指向出发对象的dmo
		 */
		alert("事件内部this.innerHTML=" + this.innerHTML);

		/**
		 * 事件传入参数event.currentTarget获取当前触发对象的dom
		 * 事件传入参数event.currentTarget，使用$()包装后，可使用jquery api
		 */
		alert("事件传入参数event.currentTarget.innerHTML=" + event.currentTarget.innerHTML);
		alert("事件传入参数$(event.currentTarget).text()=" + $(event.currentTarget).text());

		/**
		 * 全局搜索获取组件
		 */
		alert("$(\"#label2\").text()=" + $("#label2").text());
	});
};
	
function initRadioGroup()
{
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
	});

	/**
	 * 是否已禁用
	 */
	$("#btnRadio_getEnableStatus").button().click(function(event)
	{
		alert($("#radio1").prop("disabled"));

		alert($("#radio1").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnRadio_Enable").button().click(function(event)
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

function initCheckBox()
{
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
	});

	/**
	 * 是否已禁用
	 */
	$("#btnCheckBox_getEnableStatus").button().click(function(event)
	{
		alert($("#checkbox1").prop("disabled"));

		alert($("#checkbox1").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnCheckBox_Enable").button().click(function(event)
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

function initCheckBoxGroup()
{
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
		alert("已选中华为和小米");
	});
};

function initButton()
{
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
		alert($("#btnOK").prop("disabled"));

		alert($("#btnOK").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnButton_Enable").button().click(function(event)
	{
		var button = $("#btnOK");
		if (button.prop("disabled"))
		{
			button.prop("disabled", false);
		}
		else
		{
			button.prop("disabled", true);
		}

/*另一种实现
		if (button.attr("disabled") == "disabled")
		{
			button.removeAttr("disabled");
		}
		else
		{
			button.attr("disabled", "disabled");
		}
*/
	});
};

function initInput()
{
	/**
	 * 获取文本
	 */
	$("#btnText_getText").button().click(function()
	{
		alert($("#inputUserName").val());
	});

	/**
	 * 设置文本
	 */
	$("#btnText_setText").button().click(function()
	{
		$("#inputUserName").val("abc123");
		alert("已设值abc123");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnText_getVisibleStatus").button().click(function(event)
	{
		alert($("#inputUserName").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnText_Visible").button().click(function(event)
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
	$("#btnText_getEnableStatus").button().click(function(event)
	{
		alert($("#inputUserName").prop("disabled"));

		alert($("#inputUserName").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnText_Enable").button().click(function(event)
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

	$("#inputEnter1").keydown(function(event)
	{  
	    if(event.which == "13")
	    {
	    	$("#inputEnter2").focus();
	    }
	});
	$("#inputEnter2").keydown(function(event)
	{  
	    if(event.which == "13")
	    {
	    	$("#inputEnter1").focus();
	    }
	});

	/**
	 * 获取密码文本
	 */
	$("#btnPassword_getText").button().click(function()
	{
		alert($("#inputPassword").val());
	});

	/**
	 * 设置密码文本
	 */
	$("#btnPassword_setText").button().click(function()
	{
		$("#inputPassword").val("abc123");
		alert("已设值abc123");
	});
};

$(function()
{
	initLabel();

	initRadioGroup();

	initCheckBox();

	initCheckBoxGroup();

	initButton();

	initInput();
});