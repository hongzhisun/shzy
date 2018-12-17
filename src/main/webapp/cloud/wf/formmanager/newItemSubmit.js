var m_ProcData = null;
var m_WorkData = null;

/*====== 对业务表单接口 ======*/
/**
 * @public 获取流程变量接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getProcData()
{
	return m_ProcData;
};

/**
 * @public 获取流程属性接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getWorkData()
{
	return m_WorkData;
};

/**
 * @public 获取业务实体数据ID接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getEntityDataID()
{
	return Ext.get("entityDataID").dom.value;
};

/**
 * @public 获取表单编号接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getFormSerialNo()
{
	return Ext.get("formSerialNo").dom.value;
};

/**
 * @public 获取活动属性接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getActivityProperty()
{
	return Ext.get("activityProperty").dom.value;
};

/**
 * @public 获取环节标志接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getActivityBusiType()
{
	return Ext.get("activity_BusiType").dom.value;
};

/*====== 页面功能代码 ======*/
/**
 * 页面初始化
 */
function doInit()
{
	if (window.opener == this)
	{
		MsgUtil.alert("错误的打开方式");
		window.close();
	}

	if (m_WorkData == null)
	{
		m_WorkData = new WfWorkData(Ext.get("workDataState").dom.value);
	}

	if (m_ProcData == null)
	{
		m_ProcData = new WfProcData(Ext.get("processInstState").dom.value);
	}

	var pnlSplit1 = new Ext.Panel({html:"<div class='xy-wf-tb-top-pnl-spr'></div>", height:8, autoWidth:true, border:false});		

	var txtFormName = Ext.get("processName").dom.value;
	
	var htmToolBar = "<div class='xy-toolbar-wf-itemmgr' height='52px'>";
	htmToolBar += "<table cellspacing='0' unselectable=on><tr>";
	htmToolBar += "<td><div id='btnSubmit' class='xy-tb-wf-btn'><div></div><span>提交申请</span></div></td>";
	htmToolBar += "<td><div class='xy-tb-wf-spr'></div></td>";
	htmToolBar += "<td><div id='btnSave' class='xy-tb-wf-btn'><div></div><span>保存草稿</span></div></td>";
	htmToolBar += "<td><div class='xy-tb-wf-spr'></div></td>";
	htmToolBar +="<td><div id='btnProcinstimg' class='xy-tb-wf-btn'><div></div><span>流程图</span></div></</td>";

	htmToolBar += "<td style='width:100%'><div id='fqbx' class='xy-wf-title-txt'>业务流程 ：<span id='Title_formTypeName'>" + txtFormName + "</span></div></td>";

	htmToolBar += "<td><div id='btnClose' class='xy-tb-wf-btn'><div></div><span>关闭</span></div></</td>";
	htmToolBar += "</tr></table></div>";

	var pnlToolBar = new Ext.Panel(
	{
		html : htmToolBar,
		height : 52,
		autoWidth : true,
		border : false
	});		

	var pnlSplit2 = new Ext.Panel(
	{
		html : "<div class='xy-wf-tb-top-pnl-spr'></div>",
		height : 8,
		autoWidth : true,
		border : false
	});		

	var mainTop =
	{
		id : "mainTop",
		region : "north",
		height : 68,
		items : [ pnlSplit1, pnlToolBar, pnlSplit2 ],
		border : false
	};
	var mainCenter =
	{
		id : "mainCenter",
		region : "center",
		contentEl : "frmFormInfo",
		border : false
	};

	var mainViewport = new Ext.Viewport(
	{
		id : "mainViewport",
		layout : "border",
		items : [ mainTop, mainCenter ]
	});			

	mainViewport.on("beforeremove", function fixIFrame(lr, cp) 
	{
         var sheetId = cp.getEl().id;
         var frameId = "frmFormInfo";
         Ext.get(frameId).dom.src = "javascript:false";
    }, mainViewport);

	initButtonEvent();
}

/**
 * 初始化按钮
 */
function initButtonEvent()
{
	var btnSubmit = Ext.get("btnSubmit");
	btnSubmit.addClassOnOver("xy-tb-wf-btn-over");
	btnSubmit.on("click", on_SubmitClick);

	var btnSave = Ext.get("btnSave");
	btnSave.addClassOnOver("xy-tb-wf-btn-over");
	btnSave.on("click", on_SaveClick);

	var btnProcinstimg = Ext.get("btnProcinstimg");
	btnProcinstimg.addClassOnOver("xy-tb-wf-btn-over");
	btnProcinstimg.on("click", on_ProcinstimgClick);
	
	var btnClose = Ext.get("btnClose");
	btnClose.addClassOnOver("xy-tb-wf-btn-over");
	btnClose.on("click", on_CloseClick);
}

/**
 * 按钮事件 - 提交
 */
function on_SubmitClick()
{
	/**
	 * 表单提交前验证
	 */
	if (frmFormInfo.OnSubmit !== undefined
			&& typeof( frmFormInfo.OnSubmit) == "function")
	{
		if (! frmFormInfo.OnSubmit())
		{
			return;
		}
	}

	doSubmit();
}

/**
 * 提交动作
 */
function doSubmit()
{
	var userID = Ext.get("userID").dom.value;
	var processID = Ext.get("processID").dom.value;
	var activityID = Ext.get("activityID").dom.value;
	var formID = Ext.get("formID").dom.value;
	var formSerialNo = Ext.get("formSerialNo").dom.value;

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = Ext.encode(frmFormInfo.getFormData());
	var checkDesc = "请领导审阅";

	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	/**
	 * 获取下一步审批人
	 */
	ApproveUserService.getSMANextActivityUser(userID, processID, activityID, workDataJson,
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();
	
			var data = Ext.decode(response.responseText);
	
			if (data.success)
			{
				var activityUserXML = data.data;

				submitFormWithActivityUser(userID, processID, activityID, formID, activityUserXML,
					checkDesc, formSerialNo, formDataJson, workDataJson);
			}
			else
			{
				MsgUtil.alert("获取下一步审批人发生错误: " + data.msg);
			}
		},
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("获取下一步审批人发生错误");
		},
		this);
}

/**
 * 获取审批人后提交 
 */
function submitFormWithActivityUser(userID, processID, activityID, formID, activityUserXML,
	checkDesc, formSerialNo, formDataJson, workDataJson)
{
	if (activityUserXML == null || activityUserXML == "")
	{
		/**
		 * 无用户，自动提交
		 */
		submitForm(userID, processID, activityID, formID, "",
			checkDesc, formSerialNo, formDataJson, workDataJson);
	}
	else
	{
		/**
		 * 选择用户后提交
		 */
		var dialog = new wf.component.ApproveUserDialog(
		{
			xy_ParentObjHandle : this,
			xy_OKClickEvent : function(_Dialog)
			{
				/**
				 * 选择用户后提交
				 */
				var approveUser = _Dialog.getSelectedApproveUser();
				var approveUserJson = Ext.encode(approveUser);

				submitForm(userID, processID, activityID, formID, approveUserJson,
					checkDesc, formSerialNo, formDataJson, workDataJson);
			},
		});
		dialog.setApproveUserData(activityUserXML);
		dialog.show();
	}
}

/**
 * 根据选择的参与者提交
 * 未传入参与者，表示为自动提交
 * @param approveUserJson	选择的参与者Json
 */
function submitForm(userID, processID, activityID, formID, approveUserJson,
	checkDesc, formSerialNo, formDataJson, workDataJson)
{
	wf.FormManagerUtil.showMask();

	ActivitySubmitService.start(userID, processID, activityID, formID, approveUserJson,
		checkDesc, formSerialNo, formDataJson, workDataJson,
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();

			var data = Ext.decode(response.responseText);

			if (data.success)
			{
				MsgUtil.confirm("表单提交成功，是否打印?", function(btn, text)
				{
					/**
					 * 表单提交完成后回调
					 */
					if (frmFormInfo.AfterSubmit !== undefined
							&& typeof( frmFormInfo.AfterSubmit) == "function")
					{
						frmFormInfo.AfterSubmit()
					}

					/**
					 * 回调主界面
					 */
					wf.FormManagerUtil.callbackAfterOperation();

					if (btn == "yes")
					{
						printForm(formID, data.data);
					}
					else
					{
						window.close();
					}
				}, this);
			}
			else
			{
				MsgUtil.alert("表单提交发生错误: " + data.msg);
			}
		},
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();

			MsgUtil.alert("表单提交发生错误");
		},
		this);
}

/**
 * 打印
 * @param formID
 * @param processInstID
 */
function printForm(formID, processInstID)
{
	if (frmFormInfo.getPrintJavaBeanName !== undefined
			&& typeof( frmFormInfo.getPrintJavaBeanName) == "function")
	{
		var javaBean = frmFormInfo.getPrintJavaBeanName();

		wf.FormManagerUtil.printFormPDF(javaBean, formID, processInstID);
	}
}

/**
 * 按钮事件 - 保存草稿
 */
function on_SaveClick()
{
	/**
	 * 表单保存草稿前验证
	 */
	if (frmFormInfo.OnSave !== undefined
			&& typeof( frmFormInfo.OnSave) == "function")
	{
		if (! frmFormInfo.OnSave())
		{
			return;
		}
	}

	saveForm();
}

/**
 * 保存草稿动作
 */
function saveForm()
{
	wf.FormManagerUtil.showMask();

	var processID = Ext.get("processID").dom.value;
	var formID = Ext.get("formID").dom.value;
	var formSerialNo = Ext.get("formSerialNo").dom.value;

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = Ext.encode(frmFormInfo.getFormData());

	ActivityDraftService.saveDraft(processID, formID, formSerialNo, formDataJson,
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();
	
			var data = Ext.decode(response.responseText);
	
			if (data.success)
			{
				var entityDataID = data.data;
				/**
				 * 表单保存草稿提交完成后回调
				 */
				if (frmFormInfo.AfterSave !== undefined
						&& typeof( frmFormInfo.AfterSave) == "function")
				{
					frmFormInfo.AfterSave(entityDataID)
				}

				/**
				 * 回调主界面
				 */
				wf.FormManagerUtil.callbackAfterOperation();

				MsgUtil.alert("表单草稿保存成功",
					function()
					{
						window.close();
					}, this);
			}
			else
			{
				MsgUtil.alert("保存表单草稿发生错误: " + data.msg);
			}
		},
		function(response, options)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("保存表单草稿发生错误");
		},
		this);
}

/**
 * 按钮事件 - 流程图
 */
function on_ProcinstimgClick()
{
	showTransImg(Ext.get("processID").dom.value);
}

/**
 * 按钮事件 - 关闭
 */
function on_CloseClick()
{
	window.close();
}

Ext.BLANK_IMAGE_URL = "resources/images/s.gif";
Ext.onReady(doInit, this, true);