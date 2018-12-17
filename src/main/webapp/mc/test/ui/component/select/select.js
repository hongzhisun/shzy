function initHtml()
{
	/**
	 * 获取已选择项ID
	 */
	$("#btnHtml_getID").button().click(function(event)
	{
		alert($("#cmbHtml").val());
	});

	/**
	 * 获取已选择项显示文本
	 */
	$("#btnHtml_getText").button().click(function(event)
	{
		alert($("#cmbHtml").find("option:selected").text());
	});

	/**
	 * 获取已选择项序号
	 */
	$("#btnHtml_getItemIndex").button().click(function(event)
	{
		alert($("#cmbHtml")[0].selectedIndex);
	});

	/**
	 * 设置选择项(按照ID)
	 */
	$("#btnHtml_setItemByID").button().click(function(event)
	{
		$("#cmbHtml").val("p02");
		alert("已设置ID=p02的选项");
	});

	/**
	 * 设置选择项(按照序号)
	 */
	$("#btnHtml_setItemByIndex").button().click(function(event)
	{
		$("#cmbHtml")[0].selectedIndex = 1;
		alert("已设置选中第2个选项");
	});

	/**
	 * 设置为不选中
	 */
	$("#btnHtml_clearItemSelect").button().click(function(event)
	{
		$("#cmbHtml")[0].selectedIndex = -1;
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnHtml_getVisibleStatus").button().click(function(event)
	{
		alert($("#cmbHtml").is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnHtml_Visible").button().click(function(event)
	{
		var combobox = $("#cmbHtml");
		if (combobox.is(":hidden"))
		{
			combobox.show();
		}
		else
		{
			combobox.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnHtml_getEnableStatus").button().click(function(event)
	{
		alert($("#cmbHtml").prop("disabled"));

		alert($("#cmbHtml").attr("disabled") == "disabled");
	});

	/**
	 * 启用/禁用
	 */
	$("#btnHtml_Enable").button().click(function(event)
	{
		var combobox = $("#cmbHtml");

		if (combobox.prop("disabled"))
		{
			combobox.prop("disabled", false);
		}
		else
		{
			combobox.prop("disabled", true);
		}

/*另一种实现
		if (combobox.attr("disabled") == "disabled")
		{
			combobox.removeAttr("disabled");
		}
		else
		{
			combobox.attr("disabled", "disabled");
		}
*/
	});
};

function initJQueryUI()
{
	/**
	 * 初始化combobox组件
	 */
	$("#cmbJQueryUI").selectmenu();

	/**
	 * 获取已选择项ID
	 */
	$("#btnJQueryUI_getID").button().click(function(event)
	{
		alert($("#cmbJQueryUI").val());
	});

	/**
	 * 获取已选择项显示文本
	 */
	$("#btnJQueryUI_getText").button().click(function(event)
	{
		alert($("#cmbJQueryUI").find("option:selected").text());
	});

	/**
	 * 获取已选择项序号
	 */
	$("#btnJQueryUI_getItemIndex").button().click(function(event)
	{
		alert($("#cmbJQueryUI")[0].selectedIndex);
	});

	/**
	 * 设置选择项(按照ID)
	 */
	$("#btnJQueryUI_setItemByID").button().click(function(event)
	{
		$("#cmbJQueryUI").val("p02");

		/**
		 * jQueryUI的SelectMenu组件，实际显示文本的DOM ID等于原ID + "-button"
		 */
		var jQueryUISelectMenuID = "cmbJQueryUI" + "-button";

		$("#" + jQueryUISelectMenuID + " > .ui-selectmenu-text").text($("#cmbJQueryUI").find("option:selected").text());
		alert("已设置ID=p02的选项");
	});

	/**
	 * 设置选择项(按照序号)
	 */
	$("#btnJQueryUI_setItemByIndex").button().click(function(event)
	{
		$("#cmbJQueryUI")[0].selectedIndex = 2;

		/**
		 * jQueryUI的SelectMenu组件，实际显示文本的DOM ID等于原ID + "-button"
		 */
		var jQueryUISelectMenuID = "cmbJQueryUI" + "-button";

		$("#" + jQueryUISelectMenuID + " > .ui-selectmenu-text").text($("#cmbJQueryUI").find("option:selected").text());
		alert("已设置选中第2个选项");
	});

	/**
	 * 设置为不选中
	 */
	$("#btnJQueryUI_clearItemSelect").button().click(function(event)
	{
		/**
		 * JQuery-UI的SelectMenu组件不支持不选中状态，
		 * 应当增加一个表示未选择的选项
		 */
		$("#cmbJQueryUI")[0].selectedIndex = -1;

		var jQueryUISelectMenuID = "cmbJQueryUI" + "-button";
		$("#" + jQueryUISelectMenuID + " > .ui-selectmenu-text").text("");
	});

	/**
	 * 是否已隐藏
	 */
	$("#btnJQueryUI_getVisibleStatus").button().click(function(event)
	{
		/**
		 * jQueryUI的SelectMenu组件，实际显示文本的DOM ID等于原ID + "-button"
		 */
		var jQueryUISelectMenuID = "cmbJQueryUI" + "-button";

		var combobox = $("#" + jQueryUISelectMenuID);
		alert(combobox.is(":hidden"));
	});

	/**
	 * 显示/隐藏
	 */
	$("#btnJQueryUI_Visible").button().click(function(event)
	{
		/**
		 * jQueryUI的SelectMenu组件，实际显示文本的DOM ID等于原ID + "-button"
		 */
		var jQueryUISelectMenuID = "cmbJQueryUI" + "-button";

		var combobox = $("#" + jQueryUISelectMenuID);
		if (combobox.is(":hidden"))
		{
			combobox.show();
		}
		else
		{
			combobox.hide();
		}
	});

	/**
	 * 是否已禁用
	 */
	$("#btnJQueryUI_getEnableStatus").button().click(function(event)
	{
		alert($("#cmbJQueryUI").selectmenu("option", "disabled"));
	});

	/**
	 * 启用/禁用
	 */
	$("#btnJQueryUI_Enable").button().click(function(event)
	{
		var combobox = $("#cmbJQueryUI");

		if (combobox.selectmenu("option", "disabled"))
		{
			combobox.selectmenu("enable");
		}
		else
		{
			combobox.selectmenu("disable");
		}
	});

	$("#btnJQueryUI_getData").button().click(function(event)
	{
		$.ajax(
		{
			url : "demo/ui/province/list",
			type : "post",
			data : 
			{
				jsonCondition : JSON.stringify({})
			},
			success : function(data, status)
			{
				if (data.success)
				{
					var combobox = $("#cmbJQueryUI");
					combobox.empty();

					for (var i = 0; i < data.data.length; i++)
					{
						var row = data.data[i];
						combobox.append("<option value=\"" + row.id + "\">" + row.name + "</option>");
					}
					$("#cmbJQueryUI").selectmenu("refresh");
				}
				else
				{
					alert(data.msg);
				}
			}.bind(this),
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 初始化级联下拉框
	 */
	$("#cmbProvince").selectmenu();
	$("#cmbCity").selectmenu();

	$.ajax(
	{
		url : "demo/ui/province/list",
		type : "post",
		data : 
		{
			jsonCondition : JSON.stringify({})
		},
		success : function(data, status)
		{
			if (data.success)
			{
				var combobox = $("#cmbProvince");
				combobox.empty();

				for (var i = 0; i < data.data.length; i++)
				{
					var row = data.data[i];
					combobox.append("<option value=\"" + row.id + "\">" + row.name + "</option>");
				}
				$("#cmbProvince").selectmenu("refresh");
			}
			else
			{
				alert(data.msg);
			}
		}.bind(this),
		error : function(request, error, ex)
		{
			alert("获取数据失败: " + error);
		}
	});

	$("#cmbProvince").selectmenu(
	{
		change : function(event, ui)
		{
			$.ajax(
			{
				url : "demo/ui/city/list",
				type : "post",
				data : 
				{
					provinceid : $("#cmbProvince").val()
				},
				success : function(data, status)
				{
					if (data.success)
					{
						var combobox = $("#cmbCity");
						combobox.empty();
						combobox.append("<option value=\"\">请选择...</option>");

						for (var i = 0; i < data.data.length; i++)
						{
							var row = data.data[i];
							combobox.append("<option value=\"" + row.id + "\">" + row.name + "</option>");
						}
						$("#cmbCity").selectmenu("refresh");
					}
					else
					{
						alert(data.msg);
					}
				}.bind(this),
				error : function(request, error, ex)
				{
					alert("获取数据失败: " + error);
				}
			});
		}
	});
};

$(function()
{
	initHtml();

	initJQueryUI();
});