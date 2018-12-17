WorkItemTransformService = {};

/**
 * 转办接口<br>
 */
WorkItemTransformService.transform = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf_WfWorkItemTransformService!transform.action";
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