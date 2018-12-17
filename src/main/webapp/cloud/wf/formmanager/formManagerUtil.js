Ext.namespace("wf");

wf.FormManagerUtil = {};

/**
 * 创建提交用业务表单数据Json
 * @formDataObject	业务表单数据对象
 */
wf.FormManagerUtil.createFormDataJson = function(formDataObject)
{
	var param = null;
	if (formDataObject.actiontype == "entitydata")
	{
		var param = 
		[
			{
				"javaBean": "com.newtouch.workflow.entitydata.WfFormDataSaveAdapter",
				"method": "execute"
			},
			formDataObject
		];
	}
	else if (formDataObject.actiontype == "spring")
	{
		var param = 
		[
			{
				"javaBean": "com.newtouch.workflow.entitydata.WfFormDataSaveSpringAdapter",
				"method": "execute"
			},
			formDataObject
		];
	}
	else
	{
		MsgUtil.alert("操作类型:" + formDataObject.actiontype + "不正确");
		return;
	}

	var formDataJson = Ext.encode(param);
	return formDataJson;
};

wf.FormManagerUtil.LoadMask = null;

/**
 * 显示LoadMask
 */
wf.FormManagerUtil.showMask = function(msg)
{
	if (msg == undefined || msg == null)
	{
		msg = "正在处理，请稍候...";
	}

	if (wf.FormManagerUtil.LoadMask == null)
	{
		wf.FormManagerUtil.LoadMask = new Ext.LoadMask(document.body,
		{
			msg : msg,
			removeMask : true
		});
	}
	else
	{
		wf.FormManagerUtil.LoadMask.msg = msg;
	}

	wf.FormManagerUtil.LoadMask.show();
};

/**
 * 隐藏LoadMask
 */
wf.FormManagerUtil.hideMask = function()
{
	if (wf.FormManagerUtil.LoadMask != null)
	{
		wf.FormManagerUtil.LoadMask.hide();
	}
};

/**
 * 操作完成后回调主界面刷新
 */
wf.FormManagerUtil.callbackAfterOperation = function()
{
	if (window.opener != null && window.opener != undefined
			&& window.opener.callbackAfterOperation != undefined
			&& typeof(window.opener.callbackAfterOperation) == "function")
	{
		window.opener.callbackAfterOperation();
	}
}

/**
 * 操作前检查表单数据加载是否完成
 * @busiFormInfo	业务表单对象
 */
wf.FormManagerUtil.checkFormDataLoaded = function(busiFormInfo)
{
	if (busiFormInfo.checkFormDataLoaded != undefined
			&& typeof(busiFormInfo.checkFormDataLoaded) == "function")
	{
		if (! busiFormInfo.checkFormDataLoaded())
		{
			MsgUtil.alert("表单数据未加载完成，请等待完成后再操作");
			return false;
		}
	}

	return true;
}

/**
 * 表单打印
 * @param javaBean		javaBean名称
 * @param format		格式
 * @param formID		表单ID
 * @param processInstID	流程实例ID
 * @param target
 */
wf.FormManagerUtil.printForm = function(javaBean, format, formID, processInstID, target)
{
	var formPrint = document.createElement("form");
	formPrint.id = "nwfs-form-print";
	formPrint.name = "nwfs-form-print";
	formPrint.method = "post";
	formPrint.action = "wf/form/print";
	formPrint.target = target;

	if(format == undefined || format == null)
	{
		format = "PDF"
	}

	var inputJavaBean = document.createElement("input");
	inputJavaBean.name = "javaBean";
	inputJavaBean.value = javaBean;
	formPrint.appendChild(inputJavaBean);

	var inputFormat = document.createElement("input");
	inputFormat.name = "format";
	inputFormat.value = format;
	formPrint.appendChild(inputFormat);

	var inputFormID = document.createElement("input");
	inputFormID.name = "formID";
	inputFormID.value = formID;
	formPrint.appendChild(inputFormID);

	var inputProcessInstID = document.createElement("input");
	inputProcessInstID.name = "processInstID";
	inputProcessInstID.value = processInstID;
	formPrint.appendChild(inputProcessInstID);

	document.body.appendChild(formPrint);
	formPrint.submit();
}

/**
 * 表单打印
 * @param javaBean		javaBean名称
 * @param formID		表单ID
 * @param processInstID	流程实例ID
 */
wf.FormManagerUtil.printFormPDF = function(javaBean, formID, processInstID)
{
	wf.FormManagerUtil.printForm(javaBean, "PDF",
			formID, processInstID, "_blank");
}