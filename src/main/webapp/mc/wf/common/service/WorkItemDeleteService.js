WorkItemDeleteService = {};

/**
 * 删除接口<br>
 */
WorkItemDeleteService.deleteOwnerProcessinst = function(processInstID, userID,
	successCallback, failureCallback, scope)
{
	p_url = "wf/wfworkitem/delete/delete";
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