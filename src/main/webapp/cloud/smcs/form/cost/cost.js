/* 公用表头信息 */
var CommonHeaderPanel = null;
/* 扩展表头信息 */
var ExpandHeaderPanel = null;
/* 报销业务明细信息 */
var BusinessPanel = null;
/* 审批历史信息 */
var CheckHistoryInfo = null;

var MainEntityControls = [];
var MainChildControls = [];

var m_ProcessID = "";

function init()
{
	if (this == parent)
	{
		MsgUtil.alert("加载流程相关信息失败，请确认表单打开方式是否正确!");
		return;
	}

	/**
	 * 从表单审批框架代码中获取工作流引擎相关数据Demo
	 */
	var msg = "从表单审批框架中可以读取以下数据：<br>";
	msg += "业务实体数据ID=" + parent.getEntityDataID() + "<br>";
	msg += "表单编号=" + parent.getFormSerialNo() + "<br>";
	msg += "流程变量[ProcessInstID]=" + parent.getProcData().getValue("PROCESSINSTID") + "<br>";
	msg += "流程变量[ProcessID]=" + parent.getProcData().getValue("PROCESSID") + "<br>";
	msg += "流程变量[ActivityID]=" + parent.getProcData().getValue("ACTIVITYID") + "<br>";
	msg += "流程属性[G_SSC_UNITID]=" + parent.getWorkData().getValue("G_SSC_UNITID") + "<br>";
	msg += "流程属性[G_SSC_DEPTID]=" + parent.getWorkData().getValue("G_SSC_DEPTID") + "<br>";
	msg += "活动属性=" + parent.getActivityProperty() + "<br>";
	msg += "环节标志=" + parent.getActivityBusiType() + "<br>";
	MsgUtil.alert(msg);

	/**
	 * 初始化全局变量
	 */
	FormGlobalVariant.init_GlobalVariant(parent);

/*	m_ProcessID = Ext.get("processID").dom.value;*/

	/**
	 * 创建表单面板参数params
	 */
	var params = FormGlobalVariant.create_PanelParams();

	/**
	 * 创建面板
	 */
	CommonHeaderPanel = new ssc.smcs.form.common.CommonHeaderPanel(params);
	ExpandHeaderPanel = new ssc.smcs.form.cost.CostHeaderPanel(params);
	BusinessPanel = new ssc.smcs.form.cost.CostBusinessPanel(params);
	
	/* 表单整体组件属性和访问控制属性设置 */
	initFieldAttr();

	var fieldSets = null;
	if (FormOperTypeUtil.isCreateNew() || FormOperTypeUtil.isDraft())
	{
		fieldSets = [ CommonHeaderPanel, ExpandHeaderPanel, BusinessPanel ];
	}
	else
	{
		CheckHistoryInfo = new ssc.form.common.CheckHistoryPanel(params);
		fieldSets = [ CommonHeaderPanel, ExpandHeaderPanel, BusinessPanel, 
		CheckHistoryInfo ];
	}

	var tabs = new Ext.Panel(
	{
		bodyStyle : "padding:5px 5px 5px 5px",
		autoHeight : true,
		frame : true,
		layout : "fit",
		labelWidth : 10,
		id : "maindiv",
		renderTo : "maindiv",
		items : fieldSets
	});
	resizeWin();

	initEvents();

	initLoads(params);

	initState();

	/**
	 * 表单审批接口功能按钮隐藏demo
	 */
	if (parent.getActivityBusiType() == "START")
	{
		/**
		 * 在发起环节，修改打印按钮标题，隐藏流程图
		 */
		var option =
		{
			print :			/* 打印 */
			{
				caption : "打印1",
				visible : true
			},		
			procchart :		/* 流程图 */
			{
				caption : "打印1",
				visible : false
			}
		}
		parent.setButtonOption(option);
	}
	else
	{
		/**
		 * 如果不是发起环节，隐藏转办、转拟办，修改打印按钮标题
		 */
		var option =
		{
			transfer :		/* 转办 */
			{
				visible : false
			},		
			transmit :		/* 转拟办 */
			{
				visible : false
			},		
			print :			/* 流程图 */
			{
				caption : "打印1"
			}
		}
		parent.setButtonOption(option);
	}
};

/**
 * 表单整体组件属性和访问控制属性设置
 * @return
 */
function initFieldAttr()
{
	/* 表单字段属性设置 */
	FormFieldAttrUtil.setFormAttr(ssc.smcs.form.cost.FieldAttrConfig);

	/* 表单字段访问控制设置 */
	
	FormAccessUtil.setFormAccess(ssc.smcs.form.cost.AccessConfig, FormGlobalVariant.get_Activity_BusiType());
};

/**
 * 初始化事件
 * @return
 */
function initEvents()
{
	CommonHeaderPanel.initComponentEvents();

	ExpandHeaderPanel.initComponentEvents();

	BusinessPanel.initComponentEvents();
};

/**
 * 初始化数据加载
 * @param params
 * @return
 */
function initLoads(params)
{
	var loadMask = new Ext.LoadMask(Ext.getBody(),
	{
		msg : "表单数据加载中....",
		removeMask : true
	});
	loadMask.show();

	try
	{
		CommonHeaderPanel.loadFormData();

		if (! FormOperTypeUtil.isCreateNew() || FormOperTypeUtil.isDraft())
		{
			ExpandHeaderPanel.loadFormData();

			BusinessPanel.loadFormData();
		}
	}
	catch(ex)
	{
		MsgUtil.alert(ex);
	}
	finally
	{
		loadMask.hide();
	}
};

/**
 * 初始化组件状态
 * @return
 */
function initState()
{
	CommonHeaderPanel.initComponentStatus();

	ExpandHeaderPanel.initComponentStatus();

	BusinessPanel.initComponentStatus();
};

/**
 * 查看流程图时调用，获得最新流程ID
 * @return
 */
function getProcessID()
{
	var retObject = BusinessPanel.getCostInfoPanel().getMaxRowAmountAndEconItemID();

	updateProcessInfo(retObject.econitemid);

	return m_ProcessID;
};

/**
 * 更新配置规则更新最新流程参数
 * @param strEconItemID
 * @return
 */
function updateProcessInfo(strEconItemID)
{
	var loadMask = new Ext.LoadMask(Ext.getBody(),
	{
		msg : "更改流程配置....",
		removeMask : true
	});
	loadMask.show();

	try
	{
		Ext.Ajax.request(
		{
			url : "SSC/ssc_smcs_CostFormAction!getProcessInfo.action",
//			url : "/smcs/form/cost/getprocessinfo",
			method : "post",
			sync : true,
			params :
			{
				jsonCondition : Ext.encode(
				{
					econitemid : strEconItemID
				})
			},
			success : function(response, options)
			{
				var responseText = Ext.decode(response.responseText);
				if (responseText.success == true)
				{
					var strProcessID = responseText.processid;
					var strActivityID = responseText.activityid;

					if (strProcessID != null && strProcessID != "")
					{
						if (parent.Ext == undefined || parent.Ext == null)
						{
							parent.$("#processID").val(strProcessID);
							parent.$("#activityID").val(strActivityID);
						}
						else
						{
							parent.Ext.getDom("processID").value = strProcessID;
							parent.Ext.getDom("activityID").value = strActivityID;
						}

						CommonHeaderPanel.xy_StoreParams.processID = strProcessID;
						ExpandHeaderPanel.xy_StoreParams.processID = strProcessID;
						BusinessPanel.getCostInfoPanel().xy_StoreParams.processID = strProcessID;

						FormInfoUtil.get_Header_Field("processid").setValue(strProcessID);

						m_ProcessID = strProcessID;
					}
				}
				else
				{
					MsgUtil.alert(responseText.msg);
				}
			},
			failure : ssc.common.ExceptionUtil.AjaxRequestFailureEvent,
			scope : this,
			timeout : 0
		});
	}
	finally
	{
		loadMask.hide();
	}
};

/**======================== 以下为表单接口，供表单审批框架页面调用 ========================**/
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单加载状态接口
 * @return
 * 		true: 已加载完成
 * 		false : 未加载完成
 */
function checkFormDataLoaded()
{
	if (! CommonHeaderPanel.getStoreLoaded())
	{
		return false;
	}

	if (! ExpandHeaderPanel.getStoreLoaded())
	{
		return false;
	}

	if (! BusinessPanel.getStoreLoaded())
	{
		return false;
	}

	return true;
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单数据接口
 * @return{Boolean}		表单数据json对象
 */
function getFormData()
{
	return getFromDataCommon();
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单草稿数据接口
 * @return{Boolean} 	表单草稿数据json对象
 */
function getDraftFormData()
{
	return getFromDataCommon();
};

/**
 * 构造表单数据
 * @return{Boolean}	表单数据json对象
	{
		actiontype : "entitydata",	//数据保存方式方式。entitydata: 实体数据表配置解析；
										spring: 调用指定的Spring Java Bean
		javabean : "costFormBP",	//Spring Java Bean ID
		formcode : "cost",			//表单代码，同配置文件wf-entity.xml中formcode
		entitydataid : "xxxx",		//表达实体数据ID，可以不传入。如果为空，则工作流引擎自行生成ID
		entitys :					//业务实体数据
		[
			//第一个实体表。如果是主实体表，只有一行记录
			{
				name : entityname1,	//实体1名称
				data :				//实体值
				[
					{ 
						field1 : value1,
						field2 : value2,
						field3 : value3
					}
				]
			},
			//第二个实体表
			{
				name : entityname2,	//实体2名称
				data :				//实体值
				[
					{ 
						field1 : value1,
						field2 : value2,
						field3 : value3
					},
					....
				]
			},
			...
		]
	}
 */
function getFromDataCommon()
{
	/**
	 * 从流程变量中获取业务实体数据ID
	 * 发起流程时时无实体数据ID，仅在后续审批环节中才有
	 */
	var entityDataID = parent.getProcData().getValue("ENTITYDATAID");

	if (entityDataID == null || entityDataID.trim() == "")
	{
		/**
		 * 发起流程时需要由业务表单创建一个ID
		 * 如果不传入entityDataID，工作流引擎将在内部创建一个新ID
		 */
		entityDataID = FormNewIDUtil.getNewID();
	};

	var formDataObject =
	{
		actiontype : "entitydata",		//数据保存方式。entitydata: 实体数据表配置解析； spring: 调用指定的Spring Java Bean
		formcode : "cost",				//表单编码，与wf-entity.xml配置文件中一致
		entitydataid : entityDataID,	//表达实体数据ID，可以不传入。如果为空，则工作流引擎自行生成ID
		entitys :						//实体数据
		[
		 	{
		 		name : "smcsfm_main",	//主实体
		 		data : [ createMainEntityDataObject(MainEntityControls) ]
		 	},
		 	{
		 		name : "smcsfm_cost",	//子实体1
		 		data : [ createExpandMainEntityDataObject(MainChildControls) ]
		 	},
		 	{
		 		name : "smcsfm_cost_info",	//子实体2
		 		data : BusinessPanel.getCostInfoPanel().getFormData()
		 	}
		]
	};

	return formDataObject;
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单打印JavaBean接口
 * @return	打印java bean name名称
 */
function getPrintJavaBeanName()
{
	var javaBean = "costFormBP";
	return javaBean;
};


/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单提交接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnSubmit()
{
	/**
	 * 业务表单数据校验
	 */
	if (! validateFormData())
	{
		return false;
	}

	/**
	 * 业务数据计算
	 */
	var retObject = BusinessPanel.getCostInfoPanel().getMaxRowAmountAndEconItemID();

	if (FormOperTypeUtil.isCreateNew() || FormOperTypeUtil.isDraft())
	{
		updateProcessInfo(retObject.econitemid);
	}

	/**
	 * 设置流程属性
	 */
	parent.getWorkData().setValue("G_SSC_SMCS_MAXROWAMOUNT", retObject.maxrowamount);
	parent.getWorkData().setValue("G_SSC_SMCS_ECONITEMID", retObject.econitemid);

	return true;
};
/**
 * @private
 * 表单提交数据验证
 * @return: true验证通过, false验证不通过
 */
function validateFormData()
{
	if (! CommonHeaderPanel.validate("submit"))
	{
		return false
	}

	if (! ExpandHeaderPanel.validate("submit"))
	{
		return false
	}

	if (! BusinessPanel.validate("submit"))
	{
		return false
	}

	return true;
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单提交完成接口
 * @param processInstID	流程实例ID
 * @param entityDataID	实体数据ID
 */
function AfterSubmit(processInstID, entityDataID)
{
	MsgUtil.alert("processInstID=" + processInstID + ", entityDataID" + entityDataID);
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单保存草稿接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnSave()
{
	return true;
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单保存草稿完成接口
 * @param entityDataID	实体数据ID
 */
function AfterSave(entityDataID)
{
	MsgUtil.alert("entityDataID" + entityDataID);
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单回退接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnRollback()
{
	return true;
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单回退完成接口
 */
function AfterRollback()
{
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单拒绝接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnReject()
{
	return true;
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单拒绝完成接口
 */
function AfterReject()
{
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单转办接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnTransfer()
{
	return true;
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单转办完成接口
 */
function AfterTransfer()
{
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单转拟办接口
 * @returns {Boolean}	验证通过标志
 * 		true: 继续操作
 * 		false: 停止操作
 */
function OnTransmit()
{
	return true;
};
/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单转拟办完成接口
 */
function AfterTransmit()
{
};

Ext.BLANK_IMAGE_URL = "resources/images/s.gif";
Ext.onReady(init);