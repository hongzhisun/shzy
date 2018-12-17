mc.namespace("wf.form.OperType");

/**
 * 表单操作状态工具类
 * 1新建
 * 2待办审批
 * 3个人跟踪
 * 4我已审批
 * 5审批完成
 * 6草稿
 */


wf.form.OperType.getOperType = function(value)
{
	if (value == null || value == undefined)
	{
		var operType = parent.getOperType();
		return operType;
	}
	else
	{
		return value;
	}
}

/* 是否新建操作 */
wf.form.OperType.isCreateNew = function(value)
{
	return (wf.form.OperType.getOperType(value) == "1");
};
/* 是否待办审批操作 */
wf.form.OperType.isApprove = function(value)
{
	return (wf.form.OperType.getOperType(value) == "2");
};
/* 是否个人跟踪操作 */
wf.form.OperType.isInTransit = function(value)
{
	return (wf.form.OperType.getOperType(value) == "3");
};
/* 是否我已审批操作 */
wf.form.OperType.isFinishedByMe = function(value)
{
	return (wf.form.OperType.getOperType(value) == "4");
};
/* 是否审批完成操作 */
wf.form.OperType.isFinished = function(value)
{
	return (wf.form.OperType.getOperType(value) == "5");
};
/* 是否草稿操作 */
wf.form.OperType.isDraft = function(value)
{
	return (wf.form.OperType.getOperType(value) == "6");
};

wf.form.isCreateNew = wf.form.OperType.isCreateNew;
wf.form.isApprove = wf.form.OperType.isApprove;
wf.form.isInTransit = wf.form.OperType.isInTransit;
wf.form.isFinishedByMe = wf.form.OperType.isFinishedByMe;
wf.form.isFinished = wf.form.OperType.isFinished;
wf.form.isDraft = wf.form.OperType.isDraft;
