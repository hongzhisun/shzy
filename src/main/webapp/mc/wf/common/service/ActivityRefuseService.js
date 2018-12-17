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

	$.ajax(
	{
		url : p_url,
		type : "post",
		data : p_param,
		success : successCallback,
		error : failureCallback
	});
};