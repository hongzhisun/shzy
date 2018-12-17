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
	$("#owner").prop("checked", false);

	$("#serialno").keypress(inputEnterEvent);
	$("#startusername").keypress(inputEnterEvent);
	$("#abstract").keypress(inputEnterEvent);
	$("#owner").click(queryByParam);

	$("#btnQuery").click(queryByParam);
	$("#btnClear").click(function(event)
	{
		$("#serialno").val("");
		$("#startdate_begin").val("");
		$("#startdate_end").val("");
		$("#pistatus").ProcessInstStatusComboBox("id", 0);
		$("#startusername").val("");
		$("#abstract").val("");
		$("#owner").prop("checked", false);

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
		abstract : $("#abstract").val(),
		owner : $("#owner").is(":checked") ? 1 : 0
	}

	reloadFinishedGrid(param);
};

init_Toolbar = function()
{
	$("#dialogCheckHistory").CheckHistoryDialog();
	$("#dialogProcessChart").ProcessChartDialog();

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

btnShowFormEvent = function(event)
{
	if (! $("#gridFinished").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridFinished").getId();
	var data = G_DataStore.get(id);

	var basePath = $("#basePath").val();
	var processInstID = data.processinstid;

	wf.workitem.formopen.viewForm(basePath, processInstID);
};

btnShowHistoryEvent = function(event)
{
	if (! $("#gridFinished").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridFinished").getId();
	var data = G_DataStore.get(id);

	$("#dialogCheckHistory").CheckHistoryDialog("initData", data.processinstid);
	$("#dialogCheckHistory").CheckHistoryDialog("open");
};

btnShowProcessChartEvent = function(event)
{
	if (! $("#gridFinished").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridFinished").getId();
	var data = G_DataStore.get(id);

	$("#dialogProcessChart").ProcessChartDialog("setProcessInstID", data.processinstid);
	$("#dialogProcessChart").ProcessChartDialog("open");
};

btnExportEvent = function(event)
{
	mc.msg("敬请期待：导出");
};

init_FinishedGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "wf/workitem/finished/list",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_DataStore.load("id", data.data);
			}
		},
		pager : "#gridFinishedPager",
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
	$("#gridFinished").jqGrid(gridOption);

	queryByParam();
};

reloadFinishedGrid = function(param)
{
	$("#gridFinished").setGridParam(
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
	$("#gridFinished").trigger("reloadGrid");
};

$(function()
{
	init_QueryPanel();

	init_Toolbar();

	init_FinishedGrid();

	mc.layout.init();
});