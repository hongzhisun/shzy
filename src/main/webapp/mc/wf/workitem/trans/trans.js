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
	$("#pistatus").ProcessInstStatusComboBox(
	{
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			queryByParam();
		}
	});
	$("#pistatus").ProcessInstStatusComboBox("id", 0);

	$("#serialno").keypress(inputEnterEvent);
	$("#startusername").keypress(inputEnterEvent);
	$("#abstract").keypress(inputEnterEvent);

	$("#btnQuery").click(queryByParam);
	$("#btnClear").click(function(event)
	{
		$("#serialno").val("");
		$("#startdate_begin").val("");
		$("#startdate_end").val("");
		$("#pistatus").ProcessInstStatusComboBox("id", 0);
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
		pistatus : $("#pistatus").ProcessInstStatusComboBox("id"),
		startusername : $("#startusername").val(),
		abstract : $("#abstract").val()
	}

	reloadTransGrid(param);
};

init_Toolbar = function()
{
	$("#dialogCheckHistory").CheckHistoryDialog();
	$("#dialogProcessChart").ProcessChartDialog();

	$("#btnUndo").click(btnUndoEvent);

	$("#btnShowForm").click(btnShowFormEvent);

	$("#btnShowHistory").click(btnShowHistoryEvent);

	$("#btnShowProcessChart").click(btnShowProcessChartEvent);

	$("#btnExport").click(btnExportEvent);

	/**
	 * to-do
	 * 暂时隐藏，敬请期待
	 */
	$("#btnExport").hide();
};

btnUndoEvent = function(event)
{
	if (! $("#gridTrans").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridTrans").getId();
	var data = G_DataStore.get(id);

	var userID = $("#userID").val();
	var processInstID = data.processinstid;

	if (processInstID == null || processInstID.length == 0)
	{
		mc.alert("流程实例值不存在，请与系统管理员联系");
		return;
	}

	if (userID == null || userID.length == 0)
	{
		mc.alert("用户信息缺失，请重新登陆");
		return;
	}

	if (userID != data.startuserid)
	{
		mc.alert("只能撤回自己发起的申请事项");
		return;
	}

	if (data.pistatus == 4)
	{
		mc.alert("该申请事项已审批结束，不可撤回");
		return;
	}

	if (data.pistatus == 5)
	{
		mc.alert("该申请事项已删除，不可撤回");
		return;
	}

	mc.confirm("您确定要把当前申请事项撤回到发起环节吗？", function(result)
	{
		if (result)
		{
			doUndo(data.processinstid, userID);
		}
	}, this);
};

doUndo = function(processInstID, userID)
{
	mc.showMask();

	wf.workitem.service.undo(processInstID, userID,
		function(response, options)
		{
			mc.hideMask();

			if (response.success)
			{
				mc.alert("撤回完成，请到您的待办事项中删除或修改提交", queryByParam);
			}
			else
			{
				mc.alert(response.msg);
			}
		},
		function(response, options)
		{
			mc.hideMask();

			mc.alert("撤回发生错误");
		},
		this);
};

btnShowFormEvent = function(event)
{
	if (! $("#gridTrans").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridTrans").getId();
	var data = G_DataStore.get(id);

	var basePath = $("#basePath").val();
	var processInstID = data.processinstid;

	wf.workitem.formopen.viewForm(basePath, processInstID);
};

btnShowHistoryEvent = function(event)
{
	if (! $("#gridTrans").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridTrans").getId();
	var data = G_DataStore.get(id);

	$("#dialogCheckHistory").CheckHistoryDialog("initData", data.processinstid);
	$("#dialogCheckHistory").CheckHistoryDialog("open");
};

btnShowProcessChartEvent = function(event)
{
	if (! $("#gridTrans").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridTrans").getId();
	var data = G_DataStore.get(id);

	$("#dialogProcessChart").ProcessChartDialog("setProcessInstID", data.processinstid);
	$("#dialogProcessChart").ProcessChartDialog("open");
};

btnExportEvent = function(event)
{
	mc.msg("敬请期待：导出");
};

init_TransGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "wf/workitem/trans/list",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_DataStore.load("id", data.data);
			}
		},
		pager : "#gridTransPager",
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
			name : "currentactivityname",
			label : "当前审批环节",
			width : 100,
			align : "center"
		},
		{
			name : "currentusername",
			label : "当前处理人",
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
			name : "pistatus",
			label : "审批状态",
			hidden : true
		},
		{
			name : "pistatus_text",
			label : "审批状态",
			width : 60,
			align : "center",
			mc_source_col : "pistatus",
			formatter : wf.render.ProcessInstStatus
		},
		{
			name : "processname",
			label : "流程名称",
			width : 150
		} ],
		ondblClickRow : btnShowFormEvent
	});
	$("#gridTrans").jqGrid(gridOption);

	queryByParam();
};

reloadTransGrid = function(param)
{
	$("#gridTrans").setGridParam(
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
	$("#gridTrans").trigger("reloadGrid");
};

$(function()
{
	init_QueryPanel();

	init_Toolbar();

	init_TransGrid();

	mc.layout.init();
});