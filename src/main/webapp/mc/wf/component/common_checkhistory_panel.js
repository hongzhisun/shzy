mc.namespace("wf.formmanager.util");

/**
 * 通用审批历史面板
 */
wf.formmanager.util.create_CheckHistoryPanel = function(grid, processInstID)
{
	grid.jqGrid(
	{
		autowidth : true,
		height : 50,
		shrinkToFit : false, /* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : false, /* 序号列 */
		multiselect : false,
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "checkid",
			index : "checkid",
			hidden : true,
			key : true
		},
		{
			name : "checkstep",
			label : "步骤",
			index : "checkstep",
			width : 65,
			align : "center"
		},
		{
			name : "activityname",
			label : "环节名称",
			index : "activityname",
			width : 180,
			align : "center"
		},
		{
			name : "displayname",
			label : "审批者",
			index : "displayname",
			width : 80,
			align : "center"
		},
		{
			name : "checktime",
			label : "审批时间",
			index : "checktime",
			width : 140,
			align : "center"
		},
		{
			name : "checkdesc",
			label : "审批意见",
			index : "checkdesc",
			width : 400
		},
		{
			name : "isagree",
			label : "类型",
			index : "isagree",
			width : 80,
			hidden : true
		} ],
		url : "wf/checkhistory/list",
		mtype : "GET",
		datatype : "json",
		postData :
		{
			processInstID : processInstID
		},
		prmNames :
		/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			rows : null,
			page : null,
			sort : null,
			order : null
		},
		jsonReader :
		{
			root : "data",
			id : "checkid"
		}
	});
};