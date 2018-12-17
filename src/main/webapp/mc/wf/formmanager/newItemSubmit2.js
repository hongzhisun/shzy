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
	return $("#entityDataID").val();
};

/**
 * @public 获取表单编号接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getFormSerialNo()
{
	return $("#formSerialNo").val();
};

/**
 * @public 获取活动属性接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getActivityProperty()
{
	return $("#activityProperty").val();
};

/**
 * @public 获取环节标志接口<br>
 *         对业务表单开放<br>
 * @returns
 */
function getActivityBusiType()
{
	return $("#activity_BusiType").val();
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

	$("body").layout(
	{
		north_size : 40,
		north__resizable : false,
		north__closable : false,
		south__size : 200,
		south__minSize : 100,
		south__maxSize : 300,
		spacing_open : 2,
		spacing_closed : 4,
		onresize : function()
		{

//			resizeGrid();
		}
	});

//	var tabs = $("#tabsButtom").tabs(
//	{
//		active: 0				//默认激活选项卡
//	});

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
//	initDragEvent();

	/**
	 * 调整整体界面布局
	 */
//	resizeFrame();
//
//	$(window).resize(function()
//	{
//		var winHeight = $(window).height();
//		if (winHeight <= 350)
//		{
//			return false;
//		}
//
//		resizeFrame();
//	});
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

	$("#btnProcChart").click(function(event)
	{
		var formID = $("#formID").val();
		var processInstID = $("#processInstID").val();

		var frmFormInfo = $("#processInstID")[0];

		if (frmFormInfo.getPrintJavaBeanName !== undefined
				&& typeof( frmFormInfo.getPrintJavaBeanName) == "function")
		{
			var javaBean = frmFormInfo.getPrintJavaBeanName();
			wf.FormManagerUtil.printFormPDF(javaBean, formID, processInstID);
		}
	});

	$("#btnClose").click(function(event)
	{
		window.close();
	});
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
};

/**
 * 初始化附件信息Tab
 */
initTabAttach = function()
{

    var content_frame = $(".tab_content").height();
    var grid_height = content_frame - 90;

    $("#listAttach").jqGrid(
    {
//	        url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
        mtype: "GET",
        datatype: "jsonp",
        colModel:
        [
            { label: '文件名称', name: 'filename', key: true, width: 230 },
            { label: '文件大小(字节)', name: 'size', width: 120 },
            { label: '上传时间', name: 'createdate', width: 200 }
        ],
        viewrecords: true,
        autowidth : false,
        shrinkToFit: true,
        multiselect : true,
        height: grid_height,
        rowNum: 20,
        pager: "#listAttachPage",
        loadComplete:function(data)
        { //完成服务器请求后，回调函数
            if(data.records==0)
            { //如果没有记录返回，追加提示信息，删除按钮不可用
                //layer.msg('找不到相关数据！',{time:1000});
            }
        }
    });

	var newRowData =
	{
		filename : "新编码_",
		size : 10000
	};

	$("#listAttach").addRowData(newRowData.id, newRowData);
//alert($("#tabContentAttach").height());
//alert($("#tabContentAttach_toolbar").height());

	$("#listAttach").setGridHeight($("#tabContentAttach").height());
	$("#listAttach").setGridWidth($("#tabContentAttach").width());
};

/**
 * 初始化拖动事件
 */
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

/**
 * 整体界面尺寸调整
 * 调整尺寸重新渲染
 */
resizeFrame = function()
{
	/**
	 * 重新计算
	 */
	var winHeight = $(window).height();
	var frameBottomHeight = $("#panelFrameBottom").height();
	$(".innerWrap").height(winHeight - frameBottomHeight - 82);
	$(".frameBottom").css("top", winHeight - frameBottomHeight);

	var tab_contentHeight = $(".tab_content").height();
	$(".spWrap").height(tab_contentHeight - 45);

	/**
	 * 更新表格布局
	 */
    var content_frame = $(".tab_content").height();
    var grid_height = content_frame;
    $("#attachment").setGridWidth($(".tab_content").width() - 5);
    $("#attachment").setGridHeight(grid_height - 90);
    $("#approval").setGridWidth($(".tab_content").width() - 5);
    $("#approval").setGridHeight(grid_height - 57);
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
						window.close();
					}
				});
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
 * 页面初始化
 */
$(function()
{
	doInit();
});