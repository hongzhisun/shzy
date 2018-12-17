var m_ProcData = null;
var m_WorkData = null;

/**
 * 按钮属性默认设置
 */
var m_ButtonOption =
{
	apply : 			/* 申请 */
	{
		caption : "撤回",
		visible : true
	},
	savedraft : 		/* 保存草稿 */
	{
		caption : "撤回",
		visible : true
	},
	procchart : 		/* 流程图 */
	{
		caption : "流程图",
		visible : true
	},
	close : 			/* 关闭 */
	{
		caption : "关闭",
		visible : true
	},
	attach_upload : 	/* 附件上传  */
	{
		caption : "附件上传 ",
		visible : true
	},
	attach_download : 	/* 附件下载 */
	{
		caption : "附件下载",
		visible : true
	},
	attach_delete : 	/* 附件删除 */
	{
		caption : "附件删除",
		visible : true
	}
};

/**
 * 按钮属性标志为与按钮id对应关系
 */
var m_ButtonIDMap =
{
	apply : "btnApply",
	savedraft : "btnSaveDraft",
	procchart: "btnProcChart",
	close : "btnClose",
	attach_upload : "btnAttachUpload",
	attach_download	: "btnAttachDownload",
	attach_delete : "btnAttachDelete"
};

/**
 * 提交人选择对话框
 */
var m_ApproveUserDialog = null;
/**
 * 流程图对话框
 */
var m_ProcessChartDialog = null;

/*====== 对业务表单接口 ======*/
/**
 * @public 获取流程变量接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getProcData = function()
{
	return m_ProcData;
};

/**
 * @public 获取流程属性接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getWorkData = function()
{
	return m_WorkData;
};

/**
 * @public 获取业务实体数据ID接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getEntityDataID = function()
{
	return $("#entityDataID").val();
};

/**
 * @public 获取表单编号接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getFormSerialNo = function()
{
	return $("#formSerialNo").val();
};

/**
 * @public 获取活动属性接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getActivityProperty = function()
{
	return $("#activityProperty").val();
};

/**
 * @public 获取环节标志接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getActivityBusiType = function()
{
	return $("#activity_BusiType").val();
};

/**
 * @public 获取操作类型接口<br>
 *         对业务表单开放<br>
 * @returns
 */
getOperType = function()
{
	return $("#operType").val();
};

/**
 * @public 设置功能按钮属性<br>
 *         对业务表单开放<br>
 * @param	option
 * @returns
 */
setButtonOption = function(option)
{
	m_ButtonOption = option;

	wf.FormManagerUtil.updateButtonOption(m_ButtonOption);
};
/*====== 对业务表单接口  end ======*/

doInit = function()
{
	if (window.opener == this)
	{
		MsgUtil.alert("错误的打开方式");
		window.close();
	}

	if (m_WorkData == null)
	{
		m_WorkData = new WfWorkData($("#workDataState").val());
	}

	if (m_ProcData == null)
	{
		m_ProcData = new WfProcData($("#processInstState").val());
	}

	/**
	 * 初始化顶部工具栏
	 */
	initPanelTop();

	/**
	 * 初始化底部工具栏
	 */
	initPanelBottom();

	/**
	 * 初始化对话框
	 */
	initDialog();

	/**
	 * 整体布局拖动
	 */
/*	initDragEvent();*/

	/**
	 * 调整整体界面布局
	 */
	resizeFrame();

	$(window).resize(function()
	{
		var winHeight = $(window).height();
		if (winHeight <= 350)
		{
			return false;
		}

		resizeFrame();
	});
};

/**
 * 初始化顶部工具栏
 */
initPanelTop = function()
{
	/**
	 * 渲染布局
	 */
    var panelTopLeft = $("#panelTopLeft");
    var panelTopCenter = $("#panelTopCenter");
    panelTopCenter.css("left", panelTopLeft.outerWidth());

    /**
	 * 初始化事件
	 */
	$("#btnApply").click(on_SubmitClick);
	$("#btnSaveDraft").click(on_SaveClick);
	$("#btnProcChart").click(on_ProcessChartClick);
	$("#btnClose").click(on_CloseClick);
};

/**
 * 初始化底部工具栏布局
 */
initPanelBottom = function()
{
	/**
	 * 初始化附件信息Tab
	 */
	initTabAttach();

	/**
	 * Tab点击事件
	 */
    $("#tabHeaderGroup span").click(function()
	{
		var tabIndex = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".tab_content:eq(" + tabIndex + ")").fadeIn(500).siblings(".tab_content").fadeOut(500);
	});
};

/**
 * 初始化附件信息Tab
 */
initTabAttach = function()
{
	wf.formmanager.util.create_AttachmentPanel($("#grid_attach"), $("#entityDataID").val(),
		$("#btnAttachUpload"), $("#btnAttachDownload"), $("#btnAttachDelete"), 2);
};


/**
 * 初始化对话框
 */
initDialog = function()
{
	m_ApproveUserDialog = new wf.formmanager.ApproveUserDialog($("#dialog_approveuser"), $("#grid_approveuser"));
};

/**
 * 初始化拖动事件
 */
/*
initDragEvent = function()
{
    function dragMove(frameBottom, drag)
	{
		drag.onmousedown = function(e)
		{
			var e = e || event;
			var dy = e.clientY;
			var dh = frameBottom.offsetHeight;
			var postop = frameBottom.offsetHeight + frameBottom.offsetTop;

			document.onmousemove = function(e)
			{
				var e = e || event;
				frameBottom.style.height = dh - (e.clientY - dy) + 'px';
				frameBottom.style.top = postop - frameBottom.offsetHeight + 'px';
				if (frameBottom.offsetHeight <= 160)
				{
					frameBottom.style.height = '160px';
					frameBottom.style.top = postop - frameBottom.offsetHeight + 'px';
				}
				var winh = $(window).height();
				var dfh = winh - 100;
				if (frameBottom.offsetHeight >= dfh)
				{
					frameBottom.style.height = dfh + 'px';
					frameBottom.style.top = postop - frameBottom.offsetHeight + 'px';
				}

				resizeFrame();
			};

			document.onmouseup = function()
			{
				document.onmousedown = null;
				document.onmousemove = null;
			};
		};
	}

    var frameBottom = document.getElementById("panelFrameBottom");
    var drag = document.getElementById("drag");

    dragMove(frameBottom, drag);
};
*/

/**
 * 整体界面尺寸调整
 * 调整尺寸重新渲染
 */
resizeFrame = function()
{
	/**
	 * 表单区域
	 */
	$("#div_form").height($(window).height() - $("#panelFrameBottom").height() - 82);
	$(".frameBottom").css("top", $(window).height() - $("#panelFrameBottom").height());

	/**
	 * 审批意见
	 */
	$(".spWrap").height($("#tabContentApprovalOpinion").height() - 45);

	/**
	 * 附件表格
	 */
    $("#grid_attach").setGridWidth($("#tabContentAttach").width() - 5);
    $("#grid_attach").setGridHeight($("#tabContentAttach").height() - 90);
};


/**
 * 判断当前是否为开始环节
 * @returns {Boolean}
 */
function isStartActivity()
{
	return ($("#activity_BusiType").val() == "START");
}

/**
 * 按钮事件 - 提交
 */
function on_SubmitClick(event)
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
	var userID = $("#userID").val();
	var processID = $("#processID").val();
	var activityID = $("#activityID").val();
	var formID = $("#formID").val();
	var formSerialNo = $("#formSerialNo").val();

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = mc.encode(frmFormInfo.getFormData());
	var checkDesc = "请领导审阅";

	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	/**
	 * 获取下一步审批人
	 */
	ApproveUserService.getSMANextActivityUser(userID, processID, activityID, workDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
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
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("获取下一步审批人发生错误: " + error);
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
		m_ApproveUserDialog.setApproveUserData(activityUserXML);

		m_ApproveUserDialog.open(function(_Dialog)
			{
				/**
				 * 选择用户后提交
				 */
				var approveUser = m_ApproveUserDialog.getSelectApproveUser();
				var approveUserJson = mc.encode(approveUser);
	
				submitForm(userID, processID, activityID, formID, approveUserJson,
					checkDesc, formSerialNo, formDataJson, workDataJson);
			});
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
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();

			if (data.success)
			{
				/**
				 * 获取是否要立刻打印标志位
				 */
				var isPrintAfterSubmit = true;
				if (frmFormInfo.isPrintAfterSubmit !== undefined
						&& typeof( frmFormInfo.isPrintAfterSubmit) == "function")
				{
					isPrintAfterSubmit = frmFormInfo.isPrintAfterSubmit();
				}

				if (isPrintAfterSubmit)
				{
					MsgUtil.confirm("表单提交成功，是否打印?", function(result)
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
	
						if (result)
						{
							printForm(formID, data.data);
						}
						else
						{
							on_CloseClick();
						}
					});
				}
				else
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

					on_CloseClick();
				}
			}
			else
			{
				MsgUtil.alert("表单提交发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();

			MsgUtil.alert("表单提交发生错误: " + error);
		},
		this);
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

	var processID = $("#processID").val();
	var formID = $("#formID").val();
	var formSerialNo = $("#formSerialNo").val();

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = mc.encode(frmFormInfo.getFormData());

	ActivityDraftService.saveDraft(processID, formID, formSerialNo, formDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
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
						on_CloseClick();
					}, this);
			}
			else
			{
				MsgUtil.alert("保存表单草稿发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("保存表单草稿发生错误: " + error);
		},
		this);
}

/**
 * 按钮事件 - 流程图
 */
on_ProcessChartClick = function(event)
{
	if (m_ProcessChartDialog == null)
	{
		m_ProcessChartDialog = new wf.formmanager.ProcessChartDialog();
	}

	m_ProcessChartDialog.openByProcess($("#processID").val());
}

/**
 * 按钮事件 - 关闭
 */
on_CloseClick = function(event)
{
	window.close();
}

/**
 * 页面初始化
 */
$(function()
{
	doInit();
});