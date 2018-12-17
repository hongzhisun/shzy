var m_ProcData = null;
var m_WorkData = null;

/**
 * 按钮属性默认设置
 */
var m_ButtonOption =
{
	apply : 			/* 申请 */
	{
		caption : "申请",
		visible : true
	},
	submit : 			/* 同意 */
	{
		caption : "同意",
		visible : true
	},
	rollback : 			/* 退回 */
	{
		caption : "退回",
		visible : true
	},
	transfer : 			/* 转办 */
	{
		caption : "转办",
		visible : true
	},
	transmit : 			/* 转拟办 */
	{
		caption : "转拟办",
		visible : true
	},
	reject : 			/* 不同意 */
	{
		caption : "不同意",
		visible : true
	},
	print : 			/* 打印 */
	{
		caption : "打印",
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
	opinion : 			/* 习惯用语 */
	{
		caption : "习惯用语",
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
	submit : "btnSubmit",
	rollback : "btnRollback",
	transfer : "btnTransfer",
	transmit : "btnTransmit",
	reject : "btnReject",
	print : "btnPrint",
	procchart: "btnProcChart",
	close : "btnClose",
	opinion : "btnOpinion",
	attach_upload : "btnAttachUpload",
	attach_download	: "btnAttachDownload",
	attach_delete : "btnAttachDelete"
};

/**
 * 提交人选择对话框
 */
var m_ApproveUserDialog = null;
/**
 * 退回人选择对话框
 */
var m_RollbackUserDialog = null;
/**
 * 转办、转拟办人选择选择对话框
 */
var m_TransferUserDialog = null;
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

	updateButtonOption(m_ButtonOption);
};

/*====== 对业务表单接口  end ======*/

/**
 * 页面初始化
 */
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
	 * 设置功能按钮可见性
	 */
	updateButtonOption();

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
	$("#btnSubmit").click(on_SubmitClick);
	$("#btnRollback").click(on_RollbackClick);
	$("#btnTransfer").click(on_TransferClick);
	$("#btnTransmit").click(on_TransmitClick);
	$("#btnReject").click(on_RejectClick);
	$("#btnPrint").click(on_PrintClick);
	$("#btnProcChart").click(on_ProcessChartClick);
	$("#btnClose").click(on_CloseClick);
};

/**
 * 初始化底部工具栏布局
 */
initPanelBottom = function()
{
	/**
	 * 初始化审批意见Tab
	 */
	initTabApprovalOpinion();

	/**
	 * 初始化审批历史Tab
	 */
	initTabCheckHistory();

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
 * 初始化审批意见Tab
 */
initTabApprovalOpinion = function()
{
	$("#btnSubmit2").click(on_SubmitClick);

	$("#btnOpinion").click(function(event)
	{
		MsgUtil.alert("敬请期待");
	});
};

/**
 * 初始化审批历史Tab
 */
initTabCheckHistory = function()
{
	wf.formmanager.util.create_CheckHistoryPanel($("#grid_checkhistory"), $("#processInstID").val());
};

/**
 * 初始化附件信息Tab
 */
initTabAttach = function()
{
	var editmode = 1;
	if (isStartActivity())
	{
		editmode = 2;
	}

	wf.formmanager.util.create_AttachmentPanel($("#grid_attach"), $("#entityDataID").val(),
		$("#btnAttachUpload"), $("#btnAttachDownload"), $("#btnAttachDelete"), editmode);
};

/**
 * 初始化对话框
 */
initDialog = function()
{
	m_ApproveUserDialog = new wf.formmanager.ApproveUserDialog();

	m_RollbackUserDialog = new wf.formmanager.RollbackUserDialog();

	m_TransferUserDialog = new wf.formmanager.TransferUserDialog();
};

/**
 * 设置功能按钮可见性
 * @param option
 */
updateButtonOption = function(option)
{
	/**
	 * 初始化隐藏按钮
	 */
	if (isStartActivity())
	{
		/**
		 * 开始环节，隐藏提交同意、退回、拒绝、转办、转拟办
		 */
		$("#btnSubmit").hide();
		$("#btnRollback").hide();
		$("#btnTransfer").hide();
		$("#btnTransmit").hide();
		$("#btnReject").hide();
	}
	else
	{
		/**
		 * 非开始环节，隐藏申请
		 */
		$("#btnApply").hide();
	}

	wf.FormManagerUtil.updateButtonOption(m_ButtonOption);
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
	//$(".spWrap").height($("#tabContentApprovalOpinion").height() - 45);

	/**
	 * 附件表格
	 */
    $("#grid_attach").setGridWidth($("#tabContentAttach").width() - 5);
    $("#grid_attach").setGridHeight($("#tabContentAttach").height() - 65);

    /**
	 * 审批历史表格
	 */
    $("#grid_checkhistory").setGridWidth($("#tabContentCheckHistory").width() - 5);
    $("#grid_checkhistory").setGridHeight($("#tabContentCheckHistory").height() - 35);
};

/**
 * 判断当前是否为开始环节
 * @returns {Boolean}
 */
isStartActivity = function()
{
	return ($("#activity_BusiType").val() == "START");
}

/**
 * 按钮事件 - 提交
 */
on_SubmitClick = function(event)
{
	/**
	 * 校验表单数据加载是否完成
	 */
	if (! wf.FormManagerUtil.checkFormDataLoaded(frmFormInfo))
	{
		return;
	}

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
doSubmit = function()
{
	/**
	 * 加入默认审批意见
	 */
	var defaultCheckDesc = "";
	if (isStartActivity())
	{
		defaultCheckDesc = "请领导审阅";
	}
	else
	{
		defaultCheckDesc = "同意";
	}

	if (! validateCheckDesc(defaultCheckDesc))
	{
		return;
	}

	var checkDesc = getCheckDesc();
	var processInstID = $("#processInstID").val();
	var activityInstID = $("#activityInstID").val();
	var workItemID = $("#workItemID").val();
	var formSerialNo = $("#formSerialNo").val();

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = mc.encode(frmFormInfo.getFormData());

	var workDataJson = m_WorkData.getModifiedJson();

	/**
	 * 判断转拟办工作项
	 */
	if (workItemID.indexOf("#-") != 0)
	{
		/**
		 * 普通待办工作项
		 */
		wf.FormManagerUtil.showMask();

		ApproveUserService.getNextActivityUser(processInstID, activityInstID, workDataJson,
			function(data, status)
			{
				wf.FormManagerUtil.hideMask();
		
				if (data.success)
				{
					var activityUserXML = data.data;

					submitFormWithActivityUser(workItemID, activityUserXML, checkDesc, formDataJson, workDataJson);
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
	else
	{
		/**
		 * 转拟办工作项
		 */
		MsgUtil.confirm("该单据为其他人交由您转拟办，会自动提交给该人，确认要继续么？", function(result)
		{
			if (result)
			{
				submitForm(workItemID, "", checkDesc, formDataJson, workDataJson);
			}
		}, this);
	}
}

/**
 * 获取审批人后提交 
 */
submitFormWithActivityUser = function(workItemID, activityUserXML, checkDesc, formDataJson, workDataJson)
{
	if (activityUserXML == null || activityUserXML == "")
	{
		/**
		 * 无用户，自动提交
		 */
		submitForm(workItemID, "", checkDesc, formDataJson, workDataJson);
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
	
				submitForm(workItemID, approveUserJson, checkDesc, formDataJson, workDataJson);
			});
	}
}

/**
 * 根据选择的参与者提交
 * 未传入参与者，表示为自动提交
 * @param approveUserJson	选择的参与者Json
 */
submitForm = function(workItemID, approveUserJson, checkDesc, formDataJson, workDataJson)
{
	wf.FormManagerUtil.showMask();

	ActivitySubmitService.submit(workItemID, approveUserJson, checkDesc, formDataJson, workDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();

			if (data.success)
			{
				/**
				 * 发起环节才允许打印
				 */
				if (isStartActivity())
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
								on_PrintClick();
							}
							else
							{
								on_CloseClick();
							}
						}, this);
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
					MsgUtil.alert("表单提交成功", function()
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
					}, this);
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
 * 按钮事件 - 退回
 */
on_RollbackClick = function(event)
{
	/**
	 * 校验表单数据加载是否完成
	 */
	if (! wf.FormManagerUtil.checkFormDataLoaded(frmFormInfo))
	{
		return;
	}

	/**
	 * 表单提交前验证
	 */
	if (frmFormInfo.OnRollback !== undefined
			&& typeof( frmFormInfo.OnRollback) == "function")
	{
		if (! frmFormInfo.OnRollback())
		{
			return;
		}
	}

	var workItemID = $("#workItemID").val();
	var formSerialNo = $("#formSerialNo").val();

	if (! validateCheckDesc("退回"))
	{
		return;
	}
	var checkDesc = getCheckDesc();

	/**
	 * 打开退回人选择对话框
	 */
	m_RollbackUserDialog.open(workItemID, function()
	{
		/**
		 * 选择用户后提交
		 */
		var activityID = m_RollbackUserDialog.getRollbackActivityID();
		var userIdJson = m_RollbackUserDialog.getRollbackUserID();

		doRollback(workItemID, activityID, userIdJson, checkDesc);
	});
}

doRollback = function(workItemID, activityID, userIdJson, checkDesc)
{
	/**
	 * 获取业务表单数据
	 */
	var formDataJson = mc.encode(frmFormInfo.getFormData());
	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	ActivityRollbackService.rollback(workItemID, activityID, userIdJson, checkDesc, formDataJson, workDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
			if (data.success)
			{
				MsgUtil.alert("表单退回成功", function()
				{
					/**
					 * 表单退回完成后回调
					 */
					if (frmFormInfo.AfterRollback !== undefined
							&& typeof( frmFormInfo.AfterRollback) == "function")
					{
						frmFormInfo.AfterRollback()
					}

					/**
					 * 回调主界面
					 */
					wf.FormManagerUtil.callbackAfterOperation();

					on_CloseClick();
				}, this);
			}
			else
			{
				MsgUtil.alert("表单退回发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("表单退回发生错误: " + error);
		}, this);
};


/**
 * 按钮事件 - 转办
 */
on_TransferClick = function (event)
{
	/**
	 * 校验表单数据加载是否完成
	 */
	if (! wf.FormManagerUtil.checkFormDataLoaded(frmFormInfo))
	{
		return;
	}

	/**
	 * 表单提交前验证
	 */
	if (frmFormInfo.OnTransfer !== undefined
			&& typeof( frmFormInfo.OnTransfer) == "function")
	{
		if (! frmFormInfo.OnTransfer())
		{
			return;
		}
	}

	if (! validateCheckDesc("转办"))
	{
		return;
	}
	var checkDesc = getCheckDesc();

	MsgUtil.confirm("转发后将由您指定的其他人员代替您进行审批处理。<br>请确认是否继续？", function(result)
	{
		if (result)
		{
			var userID = $("#userID").val();

			/**
			 * 打开转办人选择对话框
			 */
			m_TransferUserDialog.open(userID, function()
			{
				/**
				 * 选择用户后提交
				 */
				var transferUserID = m_TransferUserDialog.getTransferUserID();

				doTransfer(transferUserID, checkDesc);
			});
		}
	});
};

doTransfer = function(transferUserID, checkDesc)
{
	/*
	 * 获取业务表单数据
	 */
	var workItemID = $("#workItemID").val();
	var formDataJson = mc.encode(frmFormInfo.getFormData());
	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	WorkItemTransformService.transform(workItemID, transferUserID, checkDesc, formDataJson, workDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
			if (data.success)
			{
				MsgUtil.alert("表单转办完成", function()
				{
					/**
					 * 表单转办完成后回调
					 */
					if (frmFormInfo.AfterTransfer !== undefined
							&& typeof( frmFormInfo.AfterTransfer) == "function")
					{
						frmFormInfo.AfterTransfer()
					}

					/**
					 * 回调主界面
					 */
					wf.FormManagerUtil.callbackAfterOperation();

					on_CloseClick();
				}, this);
			}
			else
			{
				MsgUtil.alert("表单转办发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("表单转办发生错误: " + error);
		}, this);
};

/**
 * 按钮事件 - 转拟办
 */
on_TransmitClick = function(event)
{
	/**
	 * 校验表单数据加载是否完成
	 */
	if (! wf.FormManagerUtil.checkFormDataLoaded(frmFormInfo))
	{
		return;
	}

	/**
	 * 表单提交前验证
	 */
	if (frmFormInfo.OnTransmit !== undefined
			&& typeof( frmFormInfo.OnTransmit) == "function")
	{
		if (! frmFormInfo.OnTransmit())
		{
			return;
		}
	}

	if (! validateCheckDesc("转拟办"))
	{
		return;
	}
	var checkDesc = getCheckDesc();

	MsgUtil.confirm("转拟办是向您指定的人员收集意见，其处理完成后还需要您再次提交。<br>请确认是否继续？", function(result)
		{
			if (result)
			{
				var userID = $("#userID").val();

				/**
				 * 打开转办人选择对话框
				 */
				m_TransferUserDialog.open(userID, function()
				{
					/**
					 * 选择用户后提交
					 */
					var transferUserID = m_TransferUserDialog.getTransferUserID();

					doTransmit(transferUserID, checkDesc);
				});
			}
		});
};

doTransmit = function(transferUserID, checkDesc)
{
	/*
	 * 获取业务表单数据
	 */
	var workItemID = $("#workItemID").val();
	var formDataJson = mc.encode(frmFormInfo.getFormData());
	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	WorkItemTransmitService.transmit(workItemID, transferUserID, checkDesc, formDataJson, workDataJson,
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
			if (data.success)
			{
				MsgUtil.alert("表单转拟办完成", function()
				{
					/**
					 * 表单转拟办完成后回调
					 */
					if (frmFormInfo.AfterTransmit !== undefined
							&& typeof( frmFormInfo.AfterTransmit) == "function")
					{
						frmFormInfo.AfterTransmit()
					}

					/**
					 * 回调主界面
					 */
					wf.FormManagerUtil.callbackAfterOperation();

					on_CloseClick();
				}, this);
			}
			else
			{
				MsgUtil.alert("表单转拟办发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("表单转拟办发生错误: " + error);
		}, this);
};

/**
 * 按钮事件 - 不同意/拒绝
 */
on_RejectClick = function(event)
{
	/**
	 * 校验表单数据加载是否完成
	 */
	if (! wf.FormManagerUtil.checkFormDataLoaded(frmFormInfo))
	{
		return;
	}

	/**
	 * 表单拒绝前验证
	 */
	if (frmFormInfo.OnReject !== undefined
			&& typeof( frmFormInfo.OnReject) == "function")
	{
		if (! frmFormInfo.OnReject())
		{
			return;
		}
	}

	var checkDesc = getCheckDesc();
	if (checkDesc.length <= 0)
	{
		MsgUtil.alert("请在下方【审批意见】栏中填写不同意理由",
			function()
			{
				$("#txtCheckDesc")[0].focus();
			},
			this);

		return;
	}
	
	if (StringUtil.hasLimitedChar(checkDesc))
	{
		MsgUtil.alert("下方【审批意见】栏中填写不同意理由 填写内容不能包含字符【" + StringUtil.getFirstLimitedChar(checkDesc) + "】",
			function()
			{
				$("#txtCheckDesc")[0].focus();
			},
			this);
		return;
	}
		
	MsgUtil.confirm("你点击了【不同意】的操作，表单将直接退回发起人，是否继续?", 
		function(result)
		{
			if (result) 
			{
				doReject();
			}
		});
}

doReject = function()
{
	var workItemID = $("#workItemID").val();
	var formSerialNo = $("#formSerialNo").val();
	var checkDesc = $("#txtCheckDesc").val();

	if (checkDesc.length == 0)
	{
		checkDesc = "不同意";
	}
	else if (checkDesc.length > 2048)
	{
		MsgUtil.alert("信息", "审批意见不能超过2048个字节");
		return;
	}

	/**
	 * 获取业务表单数据
	 */
	var formDataJson = mc.encode(frmFormInfo.getFormData());
	var workDataJson = m_WorkData.getModifiedJson();

	wf.FormManagerUtil.showMask();

	ActivityRefuseService.refuse(workItemID, checkDesc, formDataJson, workDataJson, 
		function(data, status)
		{
			wf.FormManagerUtil.hideMask();
	
			if (data.success)
			{
				MsgUtil.alert("不同意成功，表单已退回到发起人", function()
					{
						/**
						 * 表单拒绝完成后回调
						 */
						if (frmFormInfo.AfterReject !== undefined
								&& typeof( frmFormInfo.AfterReject) == "function")
						{
							frmFormInfo.AfterReject()
						}

						/**
						 * 回调主界面
						 */
						wf.FormManagerUtil.callbackAfterOperation();

						on_CloseClick();
					});
			}
			else
			{
				MsgUtil.alert("不同意发生错误: " + data.msg);
			}
		},
		function(request, error, ex)
		{
			wf.FormManagerUtil.hideMask();
	
			MsgUtil.alert("不同意发生错误: " + error);
		},
		this);
}

/**
 * 按钮事件 - 打印
 */
on_PrintClick = function(event)
{
	MsgUtil.alert("敬请期待");
	return;

	var formID = Ext.get("formID").dom.value;
	var processInstID = Ext.get("processInstID").dom.value;

	if (frmFormInfo.getPrintJavaBeanName !== undefined
			&& typeof( frmFormInfo.getPrintJavaBeanName) == "function")
	{
		var javaBean = frmFormInfo.getPrintJavaBeanName();
		wf.FormManagerUtil.printFormPDF(javaBean, formID, processInstID);
	}
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

	m_ProcessChartDialog.openByProcessInst($("#processInstID").val());
}

/**
 * 按钮事件 - 习惯用语
 */
on_IdiomsClick = function ()
{
	showIdiomsWin(setCheckDesc);
	function setCheckDesc(s)
	{
		var txtCheckDesc = Ext.get("txtCheckDesc");

		if (txtCheckDesc)
		{
			txtCheckDesc.dom.value = s;
		}
	}
}

/**
 * 按钮事件 - 关闭
 */
on_CloseClick = function(event)
{
	window.close();
}

/**
 * 检查审批意见
 * @param defaultCheckDesc	如果审批意见为空，则自动填写的默认值
 * @returns 				是否通过
 */
validateCheckDesc = function(defaultCheckDesc)
{
	var checkDesc = $("#txtCheckDesc").val();
	if (checkDesc.length <= 0)
	{
		$("#txtCheckDesc").val(defaultCheckDesc);
		return true;
	}

	if (checkDesc.length > 2048)
	{
		MsgUtil.alert("审批意见不能超过2048个字节");
		return false;
	}

	return true;
}

/**
 * 获取审批意见
 * @returns 			审批意见
 */
getCheckDesc = function()
{
	return $("#txtCheckDesc").val();
};

/**
 * 页面初始化
 */
$(function()
{
	doInit();
});