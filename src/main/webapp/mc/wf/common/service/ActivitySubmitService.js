ActivitySubmitService = {};

/**
 * 新建接口<br>
 */
ActivitySubmitService.start = function(userID, processID, activityID, formID, approveUserJson,
	checkDesc, formSerialNo, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfactivity/submit/start";
	p_param =
	{
		userID : userID,
		processID : processID,
		activityID : activityID,
		formID : formID,
		approveUserJson : approveUserJson,
		checkDesc : checkDesc,
		formSerialNo : formSerialNo,
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
 * 提交接口<br>
 */
ActivitySubmitService.submit = function(workItemID, approveUserJson, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfactivity/submit/submit";
	p_param =
	{
		workItemID : workItemID,
		approveUserJson : approveUserJson,
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

ActivitySubmitService.getNextWorkitem = function(p0, p1, callback)
{
	p_url = "wf/wfactivity/submit/getnextworkitem";
	p_param =
	{
		userID : p0,
		processinstID : p1
	};

	dwrcallutil.call(p_url, p_param, this, callback);
};