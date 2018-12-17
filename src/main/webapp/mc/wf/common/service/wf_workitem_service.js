mc.namespace("wf.workitem.service");

/**
 * 工作流审批服务接口工具类
 */

/**
 * 获取下一环节审批人
 */
wf.workitem.service.getNextActivityUser = function(processInstID, activityInstID, workDataJson,
	successCallback, failureCallback)
{
	p_url = "wf/wfapproveuser/getnextactivityuser";
	p_param =
	{
		processInstID : processInstID,
		activityInstID : activityInstID,
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
 * 发起环节获取下一环节审批人
 */
wf.workitem.service.getSMANextActivityUser = function(userID, processID, activityID, workDataJson,
	successCallback, failureCallback)
{
	p_url = "wf/wfapproveuser/getsmanextactivityuser";

	p_param =
	{
		userID : userID,
		processID : processID,
		activityID : activityID,
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
 * 新建接口<br>
 */
wf.workitem.service.start = function(userID, processID, activityID, formID, approveUserJson,
	checkDesc, formSerialNo, formDataJson, workDataJson,
	successCallback, failureCallback)
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
wf.workitem.service.submit = function(workItemID, approveUserJson, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback)
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

/**
 * 回退接口<br>
 */
wf.workitem.service.rollback = function(workItemID, activityID, userIdJson, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback)
{
	p_url = "wf/wfactivityrollback/rollback";
	p_param =
	{
		workItemID : workItemID,
		activityID : activityID,
		userIdJson : userIdJson,
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

/**
 * 撤回接口<br>
 */
wf.workitem.service.undo = function(processInstID, userID,
	successCallback, failureCallback)
{
	p_url = "wf/wfactivityrollback/undo";
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

/**
 * 拒绝接口<br>
 */
wf.workitem.service.refuse = function(workItemID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback)
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

/**
 * 删除接口<br>
 */
wf.workitem.service.deleteOwnerProcessinst = function(processInstID, userID,
	successCallback, failureCallback)
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

/**
 * 转办接口<br>
 */
wf.workitem.service.transform = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback)
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

/**
 * 转拟办接口<br>
 */
wf.workitem.service.transmit = function(workItemID, userID, checkDesc, formDataJson, workDataJson,
	successCallback, failureCallback)
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

/**
 * 草稿保存接口<br>
 */
wf.workitem.service.saveDraft = function(processID, formID, formSerialNo, formDataJson,
	successCallback, failureCallback)
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