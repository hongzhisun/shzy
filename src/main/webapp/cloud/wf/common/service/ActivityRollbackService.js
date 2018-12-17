ActivityRollbackService = {};

/**
 * 回退接口<br>
 */
ActivityRollbackService.rollback = function(workItemID, activityID, userIdJson, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfactivityrollback/rollback";
	p_param =
	{
		workItemID : workItemID,
		activityID : activityID,
		userIdJson : userIdJson,
		checkDesc : checkDesc,
		formDataJson : formDataJson,
		workDataJson : workDataJson
	};

	Ext.Ajax.request(
	{
		url : p_url,
		method : "post",
		params : p_param,
		success : successCallback,
		failure : failureCallback,
		scope : scope
	});
};

/**
 * 撤回接口<br>
 */
ActivityRollbackService.undo = function(processInstID, userID,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfactivityrollback/undo";
	p_param =
	{
		processInstID : processInstID,
		userID : userID
	};

	Ext.Ajax.request(
	{
		url : p_url,
		method : "post",
		params : p_param,
		success : successCallback,
		failure : failureCallback,
		scope : scope
	});
};