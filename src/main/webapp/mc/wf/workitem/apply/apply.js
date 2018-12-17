init_ProcessTypeTree = function()
{
	var $zTree = mc.tree.createZTree("treeProcessType", "single", "processTypeID", "parentID", "processTypeName", "",
		"wf/processtype/list", "data", "流程类型", "", true,
		{
			callback :
			{
				/**
				 * 加载右侧流程列表
				 */
				onClick : function(event, treeId, treeNode, clickFlag)			
				{
					reloadProcessGrid(treeNode.processTypeID);
				}
			}
		});
};

init_Toolbar = function()
{
	$("#dialogProcessChart").ProcessChartDialog();

	$("#btnLaunchProcess").click(btnLaunchProcessEvent);

	$("#btnShowProcessChart").click(btnShowProcessChartEvent);

	$("#btnRefresh").click(btnRefreshEvent);
};

btnLaunchProcessEvent = function(event)
{
	if (! $("#gridProcess").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var basePath = $("#basePath").val();
	var processID = $("#gridProcess").getId();

	wf.workitem.formopen.newForm(basePath, processID);
};

btnShowProcessChartEvent = function(event)
{
	if (! $("#gridProcess").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var processID = $("#gridProcess").getId();

	$("#dialogProcessChart").ProcessChartDialog("setProcessID", processID);
	$("#dialogProcessChart").ProcessChartDialog("open");
};

btnRefreshEvent = function(event)
{
	$("#gridProcess").trigger("reloadGrid");
};

init_ProcessGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "wf/process/list",
		pager : "#gridProcessPager",
		colModel : [
		{
			name : "processID",
			hidden : true,
			key : true,
		},
		{
			name : "processName",
			label : "流程名称",
			width : 250
		},
		{
			name : "processDesc",
			label : "流程描述",
			width : 300
		} ],
		ondblClickRow : btnLaunchProcessEvent
	});

	$("#gridProcess").jqGrid(gridOption);
};

reloadProcessGrid = function(processtypeid)
{
	$("#gridProcess").setGridParam(
	{
		datatype : "json",		/* 查询前设置datatype */
		postData : 				/* 查询前设置提交参数 */
		{
			jsonCondition : mc.encode(
			{
				processtypeid : processtypeid
			})
		}
	}).trigger("reloadGrid");
};

$(function()
{
	init_ProcessTypeTree();

	init_Toolbar();

	init_ProcessGrid();

	mc.layout.init();
});