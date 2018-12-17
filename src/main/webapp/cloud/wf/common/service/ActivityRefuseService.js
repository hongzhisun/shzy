ActivityRefuseService = {};

/**
 * 拒绝接口<br>
 */
ActivityRefuseService.refuse = function(workItemID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfactivity/refuse/refuse";
	p_param =
	{
		workItemID : workItemID,
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