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
	$("#abstract").keypress(inputEnterEvent);

	$("#btnQuery").click(queryByParam);
	$("#btnClear").click(function(event)
	{
		$("#serialno").val("");
		$("#startdate_begin").val("");
		$("#startdate_end").val("");
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
		abstract : $("#abstract").val()
	}

	reloadDraftGrid(param);
};

init_Toolbar = function()
{
	$("#dialogProcessChart").ProcessChartDialog();

	$("#btnOpen").click(btnOpenEvent);

	$("#btnDelete").click(btnDeleteEvent);

	$("#btnShowProcessChart").click(btnShowProcessChartEvent);

	$("#btnExport").click(btnExportEvent);

	/**
	 * to-do
	 * 暂时隐藏，敬请期待
	 */
	$("#btnExport").hide();
};

btnOpenEvent = function(event)
{
	if (! $("#gridDraft").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridDraft").getId();
	var data = G_DataStore.get(id);

	var basePath = $("#basePath").val();
	var entityDataID = data.id;
	var processID = data.processid;

	wf.workitem.formopen.openDraftForm(basePath, entityDataID, processID);
};

btnDeleteEvent = function(event)
{
	if (! $("#gridDraft").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var entityDataID = $("#gridDraft").getId();

	mc.confirm("你确定要删除当前草稿吗？草稿一旦删除无法恢复。<br>选择【确定】执行删除操作，选择【取消】取消删除。", function(result)
	{
		if (result)
		{
			this.doDeleteDraft(entityDataID);
		}
	}, this);
};

doDeleteDraft = function(entityDataID)
{
	mc.showMask();

	$.ajax(
	{
		url : "wf/draft/delete",
		type : "post",
		data :
		{
			entityDataID : entityDataID
		},
		success : function(data, status)
		{
			mc.hideMask();

			if (data.success)
			{
				mc.alert("删除成功", function()
				{
					$("#gridDraft").trigger("reloadGrid");
				});
			}
			else
			{
				mc.alert("删除失败: " + data.msg);
			}
		},
		error : function(request, error, ex)
		{
			mc.hideMask();

			mc.alert("删除失败: " + error);
		}
	});
};

btnShowProcessChartEvent = function(event)
{
	if (! $("#gridDraft").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridDraft").getId();
	var data = G_DataStore.get(id);

	$("#dialogProcessChart").ProcessChartDialog("setProcessID", data.processid);
	$("#dialogProcessChart").ProcessChartDialog("open");
};

btnExportEvent = function(event)
{
	mc.msg("敬请期待：导出");
};

init_DraftGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "wf/workitem/draft/list",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_DataStore.load("id", data.data);
			}
		},
		pager : "#gridDraftPager",
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
			name : "startdate",
			label : "保存日期",
			width : 100,
			align : "center"
		},
		{
			name : "processname",
			label : "流程名称",
			width : 150
		} ],
		ondblClickRow : btnOpenEvent
	});
	$("#gridDraft").jqGrid(gridOption);

	queryByParam();
};

reloadDraftGrid = function(param)
{
	$("#gridDraft").setGridParam(
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
	$("#gridDraft").trigger("reloadGrid");
};

$(function()
{
	init_QueryPanel();

	init_Toolbar();

	init_DraftGrid();

	mc.layout.init();
});