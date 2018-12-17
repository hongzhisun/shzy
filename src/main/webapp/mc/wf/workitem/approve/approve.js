G_DataStore = new DataStore();

init_QueryPanel = function()
{
	$("#startdate_begin").DateField(
	{
		onSelect : function(dateText, inst)
		{
			queryByParam();
		}
	});
	$("#startdate_end").DateField(
	{
		onSelect : function(dateText, inst)
		{
			queryByParam();
		}
	});

	$("#serialno").keypress(inputEnterEvent);
	$("#startusername").keypress(inputEnterEvent);
	$("#abstract").keypress(inputEnterEvent);

	$("#btnQuery").click(queryByParam);
	$("#btnClear").click(function(event)
	{
		$("#serialno").val("");
		$("#startdate_begin").val("");
		$("#startdate_end").val("");
		$("#startusername").val("");
		$("#abstract").val("");

		queryByParam();
	});
};

inputEnterEvent = function(event)
{
	if(event.keyCode == "13")
	{
		queryByParam();
	}
};

queryByParam = function()
{
	var param =
	{
		serialno : $("#serialno").val(),
		startdate_begin : $("#startdate_begin").val(),
		startdate_end : $("#startdate_end").val(),
		startusername : $("#startusername").val(),
		abstract : $("#abstract").val()
	}

	reloadApproveGrid(param);
};

init_Toolbar = function()
{
	$("#dialogCheckHistory").CheckHistoryDialog();
	$("#dialogProcessChart").ProcessChartDialog();

	$("#btnApprove").click(btnApproveEvent);

	$("#btnTransWith").click(btnTransWithEvent);

	$("#btnTransmit").click(btnTransmitEvent);

	$("#btnDelete").click(btnDeleteEvent);

	$("#btnShowHistory").click(btnShowHistoryEvent);

	$("#btnShowProcessChart").click(btnShowProcessChartEvent);

	$("#btnExport").click(btnExportEvent);

	/**
	 * to-do
	 * 暂时隐藏，敬请期待
	 */
	$("#btnExport").hide();
};

btnApproveEvent = function(event)
{
	if (! $("#gridApprove").isSelect())
	{
		mc.msg("请先选择一个待办事项");
		return;
	}

	var id = $("#gridApprove").getId();
	var data = G_DataStore.get(id);

	if ("3" != $("#gridApprove").getAttr("pistatus"))
	{
		var workItemID = data.workitemid;
		var basePath = $("#basePath").val();

		wf.workitem.formopen.approveForm(basePath, workItemID);
	}
	else
	{
		mc.confirm("该事项已挂起，不能继续审批。<br>是否用只读方式打开?", function(result)
		{
			if (result)
			{
				var basePath = $("#basePath").val();
				var processInstID = data.processinstid;

				wf.workitem.formopen.viewForm(basePath, processInstID);
			}
		});
	}
};

btnTransWithEvent = function(event)
{
	mc.msg("敬请期待：转发");
};

btnTransmitEvent = function(event)
{
	mc.msg("敬请期待：转拟办");
};

btnDeleteEvent = function(event)
{
	if (! $("#gridApprove").isSelect())
	{
		mc.msg("请先选择一个待办事项");
		return;
	}

	if ("3" == $("#gridApprove").getAttr("pistatus"))
	{
		mc.alert("该工作项目前处于挂起状态，不能删除。");
		return;
	}

	var userID = $("#userID").val();
	var id = $("#gridApprove").getId();
	var data = G_DataStore.get(id);

	if (userID != data.startuserid)
	{
		mc.alert("只能删除自己发起的报账单");
		return;
	}

	mc.confirm("您确定要删除当前待办事项吗？待办事项一旦删除无法恢复。<br>选择【确定】执行删除操作，选【取消】取消删除。", function(result)
	{
		if (result)
		{
			doDelete(data.processinstid, userID);
		}
	}, this);
};

doDelete = function(processInstID, userID)
{
	mc.showMask();

	wf.workitem.service.deleteOwnerProcessinst(processInstID, userID,
		function(response, options)
		{
			mc.hideMask();

			if (response.success)
			{
				mc.alert("删除成功", function()
				{
					$("#gridApprove").trigger("reloadGrid");
				});
			}
			else
			{
				mc.alert(response.msg);
			}
		},
		function(response, options)
		{
			mc.hideMask();

			mc.alert("删除发生错误");
		},
		this);
};

btnShowHistoryEvent = function(event)
{
	if (! $("#gridApprove").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridApprove").getId();
	var data = G_DataStore.get(id);

	$("#dialogCheckHistory").CheckHistoryDialog("initData", data.processinstid);
	$("#dialogCheckHistory").CheckHistoryDialog("open");
};

btnShowProcessChartEvent = function(event)
{
	if (! $("#gridApprove").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridApprove").getId();
	var data = G_DataStore.get(id);

	$("#dialogProcessChart").ProcessChartDialog("setProcessInstID", data.processinstid);
	$("#dialogProcessChart").ProcessChartDialog("open");
};

btnExportEvent = function(event)
{
	mc.msg("敬请期待：导出");
};

init_ProcessInstGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "wf/workitem/approve/list",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_DataStore.load("id", data.data);
			}
		},
		gridComplete : function()
		{
			var data = $("#gridApprove").getRowData();
			for (var i = 0; i < data.length; i++)
			{
				var row = data[i];
				if (row.isreject == 1)
				{
					$("#" + row.id).find("td").addClass("wf-approve-reject");
				}
				else
				{
					$("#" + row.id).find("td").removeClass("wf-approve-reject");
				}
			}
		},
		pager : "#gridApprovePager",
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "serialno",
			label : "表单编号",
			width : 180
		},
		{
			name : "abstract",
			label : "申请事项",
			width : 200
		},
		{
			name : "amount",
			label : "金额",
			width : 80,
			align : "right",
			formatter : "currency"
		},
		{
			name : "activityname",
			label : "当前审批环节",
			width : 100,
			align : "center"
		},
		{
			name : "startusername",
			label : "申请人",
			width : 80,
			align : "center"
		},
		{
			name : "pistartdate",
			label : "申请时间",
			width : 130,
			align : "center"
		},
		{
			name : "deptname",
			label : "申请部门",
			width : 100
		},
		{
			name : "unitname",
			label : "申请公司",
			width : 120
		},
		{
			name : "processname",
			label : "流程名称",
			width : 150
		},
		{
			name : "isreject",
			label : "是否退回",
			hidden : true
		},
		{
			name : "isreject_text",
			label : "是否退回",
			width : 60,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.isreject == 1)
				{
					return "退回";
				}
				else
				{
					return "";
				}				
			}
		} ],
		ondblClickRow : btnApproveEvent
	});

	$("#gridApprove").jqGrid(gridOption);

	reloadApproveGrid();
};

reloadApproveGrid = function(param)
{
	$("#gridApprove").setGridParam(
	{
		datatype : "json",		/* 查询前设置datatype */
		postData :
		{
			jsonCondition : mc.encode(param)
		}
	}).trigger("reloadGrid");
};

/**
 * 表单审批界面操作完成后回调
 */
callbackAfterOperation = function()
{
	$("#gridApprove").trigger("reloadGrid");
};

$(function()
{
	init_QueryPanel();

	init_Toolbar();

	init_ProcessInstGrid();

	mc.layout.init();
});