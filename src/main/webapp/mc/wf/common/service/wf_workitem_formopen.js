mc.namespace("wf.workitem.formopen");

/**
 * 工作流审批界面打开工具类
 */

/**
 * 打开表单新建界面
 */
wf.workitem.formopen.newForm = function(basePath, processID)
{
	window.open(basePath + "wf/formmgr/newProcess?processID=" + escape(processID) + "&isnew=1", "",
		"menubar=0,scrollbar=0,resizable=1,channelmode=1,location=0,status=1");
};

/**
 * 打开草稿表单编辑界面
 */
wf.workitem.formopen.openDraftForm = function(basePath, entityDataID, processID)
{
	window.open(basePath + "wf/formmgr/openDraftForm?entityDataID=" + entityDataID + "&processID=" + processID + "&isnew=1", "", 
		"menubar=0,scrollbar=0,resizable=1,channelmode=1,location=0,status=1,locationbar=0");
};

/**
 * 打开表单审批界面
 */
wf.workitem.formopen.approveForm = function(basePath, workItemID)
{
	window.open(basePath + "wf/formmgr/formApproveForm?workItemID=" + escape(workItemID) + "&isnew=1", "",
		"menubar=0,scrollbar=0,resizable=1,channelmode=1,location=0,status=1");
};

/**
 * 查看表单（只读方式）
 */
wf.workitem.formopen.viewForm = function(basePath, processInstID)
{
	window.open(basePath + "wf/formmgr/viewFinishedForm?processInstID=" + escape(processInstID) + "&isnew=1", "",
		"menubar=0,scrollbar=0,resizable=1,channelmode=1,location=0,status=1");
};
