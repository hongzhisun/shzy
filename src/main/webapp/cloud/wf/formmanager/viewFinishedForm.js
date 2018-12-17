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
	if (opener == this)
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

	var txtFormName = Ext.get("processName").dom.value;
	
	var pnlSplit1 = new Ext.Panel(
	{
		html : "<div class='xy-wf-tb-top-pnl-spr'></div>",
		height : 8,
		autoWidth : true,
		border : false
	});		

	var htmToolBar = "<div class='xy-toolbar-wf-itemmgr' height='52px'>"
	htmToolBar += "<table cellspacing='0' unselectable=on><tr>";
	htmToolBar += "<td><div id='btnPrint' class='xy-tb-wf-btn'><div></div><span>打印</span></div></td>";
	htmToolBar += "<td><div class='xy-tb-wf-spr'></div></td>";
/*
	htmToolBar += "<td><div id='btnAttach' class='xy-tb-wf-btn'><div></div><span>附件</span></div></td>";
	htmToolBar += "<td><div class='xy-tb-wf-spr'></div></td>";
*/
	htmToolBar += "<td><div id='btnProcinstimg' class='xy-tb-wf-btn'><div></div><span>流程图</span></div></</td>";
	htmToolBar += "<td style='width:100%'><div class='xy-wf-title-txt'>表单查看 ：<span id='Title_formTypeName'>" + txtFormName + "</span></div></td>";	
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

	var pnlSplit4 = new Ext.Panel(
	{
		html : "<div class='xy-wf-tb-top-pnl-spr'></div>",
		height : 8,
		autoWidth : true,
		border : false
	});
	var mainBottom =
	{
		id : "mainBottom",
		region : "south",
		height : 8,
		items : [ pnlSplit4 ],
		border : false
	};

	var mainViewport = new Ext.Viewport(
	{
		id : "mainViewport",
		layout : "border",
		items : [ mainBottom, mainTop, mainCenter ]
	});			
	
	initButtonEvent();
}

/**
 * 初始化按钮
 */
function initButtonEvent()
{
/*
	var btnAttach = Ext.get("btnAttach");
	btnAttach.addClassOnOver("xy-tb-wf-btn-over");
	btnAttach.on("click", on_AttachClick);
*/
	
	var btnPrint = Ext.get("btnPrint");
	btnPrint.addClassOnOver("xy-tb-wf-btn-over");
	btnPrint.on("click", on_PrintClick);
	
	var btnProcinstimg = Ext.get("btnProcinstimg");
	btnProcinstimg.addClassOnOver("xy-tb-wf-btn-over");
	btnProcinstimg.on("click", on_ProcinstimgClick);
		
	var btnClose = Ext.get("btnClose");
	btnClose.addClassOnOver("xy-tb-wf-btn-over");
	btnClose.on("click", on_CloseClick);
}


/**
 * 按钮事件 - 打印
 * @param callback
 * @param localMask
 */
function on_PrintClick()
{
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
function on_ProcinstimgClick()
{
	showTransInstImg(Ext.get("processInstID").dom.value);
}

/**
 * 按钮事件 - 关闭
 */
function on_CloseClick()
{
	window.close();
}

function on_AttachClick()
{
	var serialNum = Ext.get("serialNum").dom.value;
	var basePath = Ext.get("basePath").dom.value;
	
	loadAttachment(serialNum, basePath, true);
}

Ext.BLANK_IMAGE_URL = "resources/images/s.gif";
Ext.onReady(doInit, this, true);