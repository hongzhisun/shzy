ActivityDraftService = {};

/**
 * 草稿保存接口<br>
 */
ActivityDraftService.saveDraft = function(processID, formID, formSerialNo, formDataJson,
	successCallback, failureCallback, scope)
{
	p_url = "wf/draft/save";
	p_param =
	{
		processID : processID,
		formID : formID,
		formSerialNo : formSerialNo,
		formDataJson : formDataJson
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