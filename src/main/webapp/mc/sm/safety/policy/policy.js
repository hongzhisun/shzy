initUI = function()
{
	$("#btnSave").click(btnSaveEvent);
	$("#btnRevert").click(btnRevertEvent);

	$("#LoginName_CaseIngore_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#MoreInfo_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});

	$("#Password_ErrorCount_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_ErrorCount_Value").NumberField(
	{
		decimal : 0
	});

	$("#Password_ErrorCountLock_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});

	$("#Password_Period_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_Period_Value").NumberField(
	{
		decimal : 0
	});

	$("#Password_OverPeriodLock_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});

	$("#Password_PeriodHint_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_PeriodHint_Value").NumberField(
	{
		decimal : 0
	});

	$("#Password_CreateNeedActive_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_ResetNeedActive_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Login_UpdatePwd_Unactive_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Login_Allow_Locked_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});

	$("#Password_Length_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_Length_Value").NumberField(
	{
		decimal : 0
	});

	$("#Password_Mix_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_CharBegin_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});

	$("#Password_Remenber_Status").StatusComboBox(
	{
		selectCallback : ComboBoxSelectCallback
	});
	$("#Password_Remenber_Value").NumberField(
	{
		decimal : 0
	});
};

ComboBoxSelectCallback = function(index, id, data, event, ui)
{
	if (id == 1)
	{
		this.element.next("span").children("span.ui-selectmenu-text").css("color", "blue");
	}
	else if (id == 0)
	{
		this.element.next("span").children("span.ui-selectmenu-text").css("color", "red");
	}
	else
	{
		this.element.next("span").children("span.ui-selectmenu-text").css("color", "black");
	}

	var valueId = this.element.attr("id").replace("_Status", "_Value");
	var $value = $("#" + valueId);
	if (mc.isJQuery($value))
	{
		$value.prop("disabled", (id != 1));
	}
};

var m_Data = [];
loadData = function()
{
	mc.showMask();

	$.ajax(
	{
		url : "security/policy/list",
		type : "post",
		data : 
		{
			param : ""
		},
		success : function(data, status)
		{
			mc.hideMask();

			if (data.success)
			{
				m_Data = data.data;
				initData(data.data);
			}
			else
			{
				mc.alert("获取数据失败: " + data.msg);
			}
		},
		error : function(request, error, ex)
		{
			mc.hideMask();
			mc.alert("获取数据失败: " + error);
		}
	});
};

initData = function(data)
{
	for (var i = 0; i < data.length; i++)
	{
		var row = data[i];

		var $status = $("#" + row.code + "_Status");
		if (mc.isJQuery($status))
		{
			$status.StatusComboBox("setId", row.status);
			if (row.status == 1)
			{
				$status.next("span").children("span.ui-selectmenu-text").css("color", "blue");
			}
			else if (row.status == 0)
			{
				$status.next("span").children("span.ui-selectmenu-text").css("color", "red");
			}
			else
			{
				$status.next("span").children("span.ui-selectmenu-text").css("color", "black");
			}
		}

		var $value = $("#" + row.code + "_Value");
		if (mc.isJQuery($value))
		{
			$value.val(row.config);
		}
	}

	$("#Password_ErrorCount_Value").prop("disabled", ($("#Password_ErrorCount_Status").StatusComboBox("getId") != 1));
	$("#Password_Period_Value").prop("disabled", ($("#Password_Period_Status").StatusComboBox("getId") != 1));
	$("#Password_PeriodHint_Value").prop("disabled", ($("#Password_PeriodHint_Status").StatusComboBox("getId") != 1));
	$("#Password_Length_Value").prop("disabled", ($("#Password_Length_Status").StatusComboBox("getId") != 1));
	$("#Password_Remenber_Value").prop("disabled", ($("#Password_Remenber_Status").StatusComboBox("getId") != 1));
};

btnSaveEvent = function(event)
{
	if (! checkData())
	{
		return;
	}

	mc.confirm("请确认是否保存？", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		var data = readData();
		$.ajax(
		{
			url : "security/policy/update",
			type : "post",
			data : 
			{
				param : mc.encode(data)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					mc.msg("保存成功");
				}
				else
				{
					mc.alert("保存失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("保存失败: " + data.msg);
			}
		});
	});
};

checkData = function()
{
	for (var i = 0; i < m_Data.length; i++)
	{
		var row = m_Data[i];

		var $status = $("#" + row.code + "_Status");
		if (mc.isJQuery($status))
		{
			if (! $status.StatusComboBox("isSelect"))
			{
				mc.alert("请先选择所有的选项");
				return false;
			}
		}

		var $value = $("#" + row.code + "_Value");
		if (mc.isJQuery($value))
		{
			if ($.trim($value.val()).length <= 0)
			{
				mc.alert("请先填写所有的内容");
				return false;
			}
		}
	}

	return true;
};

readData = function()
{
	for (var i = 0; i < m_Data.length; i++)
	{
		var row = m_Data[i];

		var $status = $("#" + row.code + "_Status");
		if (mc.isJQuery($status))
		{
			row.status = $status.StatusComboBox("getId");
		}

		var $value = $("#" + row.code + "_Value");
		if (mc.isJQuery($value))
		{
			row.config = $value.val();
		}
	}

	return m_Data;
};

btnRevertEvent = function(event)
{
	loadData();
};

$(function()
{
	initUI();

	mc.layout.init();

	loadData();
});