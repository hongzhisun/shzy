WorkItemTransformService = {};

/**
 * 转办接口<br>
 */
WorkItemTransformService.transform = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfworkitem/transform/transform";
	p_param =
	{
		workItemID : workItemID,
		userID : userID,
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