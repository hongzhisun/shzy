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

	$.ajax(
	{
		url : p_url,
		type : "post",
		data : p_param,
		success : successCallback,
		error : failureCallback
	});
};