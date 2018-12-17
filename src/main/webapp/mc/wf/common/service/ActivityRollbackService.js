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

	$.ajax(
	{
		url : p_url,
		type : "post",
		data : p_param,
		success : successCallback,
		error : failureCallback
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

	$.ajax(
	{
		url : p_url,
		type : "post",
		data : p_param,
		success : successCallback,
		error : failureCallback
	});
};