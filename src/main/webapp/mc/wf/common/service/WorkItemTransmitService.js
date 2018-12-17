WorkItemTransmitService = {};

/**
 * 转拟办接口<br>
 */
WorkItemTransmitService.transmit = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfworkitem/transmit/transmit";
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