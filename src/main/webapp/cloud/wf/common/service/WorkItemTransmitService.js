WorkItemTransmitService = {};

/**
 * 转拟办接口<br>
 */
WorkItemTransmitService.transmit = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf_WfWorkItemTransmitService!transmit.action";
	p_param =
	{
		workItemID : workItemID,
		userID : userID,
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
}