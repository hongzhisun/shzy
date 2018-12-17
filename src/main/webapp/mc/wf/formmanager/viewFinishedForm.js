var m_ProcData = null;
var m_WorkData = null;

/**
 * 按钮属性默认设置
 */
var m_ButtonOption =
{
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
	print : "btnPrint",
	procchart: "btnProcChart",
	close : "btnClose",
	attach_upload : "btnAttachUpload",
	attach_download	: "btnAttachDownload",
	attach_delete : "btnAttachDelete"
};

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
	wf.formmanager.util.create_AttachmentPanel($("#grid_attach"), $("#entityDataID").val(),
		$("#btnAttachUpload"), $("#btnAttachDownload"), $("#btnAttachDelete"), 1);
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

    /**
	 * 审批历史表格
	 */
    $("#grid_checkhistory").setGridWidth($("#tabContentCheckHistory").width() - 5);
    $("#grid_checkhistory").setGridHeight($("#tabContentCheckHistory").height() - 57);
};

/**
 * 按钮事件 - 打印
 * @param callback
 * @param localMask
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
 * 按钮事件 - 关闭
 */
on_CloseClick = function(event)
{
	window.close();
}

on_AttachClick = function(event)
{
	var serialNum = Ext.get("serialNum").dom.value;
	var basePath = Ext.get("basePath").dom.value;
	
	loadAttachment(serialNum, basePath, true);
}

/**
 * 页面初始化
 */
$(function()
{
	doInit();
});