mc.namespace("mc.demo.form.demoform");

var Header = null;		/* 表头组件 */
var CostInfo = null;	/* 报账费用明细组件 */
var PayInfo = null;		/* 付款明细组件 */

/**
 * 界面初始化
 */
mc.demo.form.demoform.init = function()
{
	/**
	 * 检查表单是否通过表单审批框架页面打开。
	 * 如果不是，表单将无法正常工作
	 */
	if (this == parent)
	{
		mc.alert("加载流程相关信息失败，请确认表单打开方式是否正确!");
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
	msg += "操作类型=" + parent.getOperType() + "<br>";
	mc.alert(msg);

	/**
	 * 通用参数
	 */
	var globalParam = 
	{
		operType : parent.getOperType(),
		entityDataID : parent.getEntityDataID(),
		formSerialNo : parent.getFormSerialNo()
	};

	/**
	 * 初始化表单审批框架
	 * 表单审批接口功能按钮隐藏demo
	 */
	mc.demo.form.demoform.init_FormApproveFrame();

	/**
	 * 初始化界面组件和事件
	 */
	mc.demo.form.demoform.init_Component(globalParam);

	/**
	 * 初始化加载数据
	 */
	mc.demo.form.demoform.init_LoadData();
};

/**
 * 初始化表单审批框架
 * 表单审批接口功能按钮隐藏demo
 */
mc.demo.form.demoform.init_FormApproveFrame = function()
{
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
				visible : true
			},		
			transmit :		/* 转拟办 */
			{
				visible : true
			},		
			print :			/* 流程图 */
			{
				caption : "打印2"
			}
		}
		parent.setButtonOption(option);
	}
};

/**
 * 初始化界面组件和事件
 */
mc.demo.form.demoform.init_Component = function(globalParam)
{
	/**
	 * 初始化表头
	 */
	Header = new mc.demo.form.demoform.Header(globalParam);

	/**
	 * 初始化费用报账明细
	 */
	CostInfo = new mc.demo.form.demoform.CostInfo(globalParam);

	/**
	 * 初始化付款明细
	 */
	PayInfo = new mc.demo.form.demoform.PayInfo(globalParam);

	mc.layout.init();
};

/**
 * 初始化加载数据
 */
mc.demo.form.demoform.init_LoadData = function()
{
	mc.showMask();

	try
	{
		/**
		 * 加载表头数据
		 */
		Header.loadFormData();

		if (! wf.form.isCreateNew())
		{
			/**
			 * 加载费用报账明细数据
			 */
			CostInfo.loadFormData();

			/**
			 * 加载付款明细数据
			 */
			PayInfo.loadFormData();
		}
	}
	catch(ex)
	{
		mc.alert(ex);
	}
	finally
	{
		mc.hideMask();
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
	if (! Header.getFormDataLoaded())
	{
		return false;
	}

	if (! CostInfo.getFormDataLoaded())
	{
		return false;
	}

	if (! PayInfo.getFormDataLoaded())
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
		entityDataID = mc.newid();
	};

	var formDataObject =
	{
		actiontype : "entitydata",		//数据保存方式。entitydata: 实体数据表配置解析； spring: 调用指定的Spring Java Bean
		formcode : "demo-cost",			//表单类型编码，与wf-entity.xml配置文件中一致
		entitydataid : entityDataID,	//表单实体数据ID，可以不传入。如果为空，则工作流引擎自行生成ID
		entitys :						//实体数据
		[
		 	{
		 		name : "form_main",			//主实体
		 		data : [ Header.getFormData().main ]
		 	},
		 	{
		 		name : "demo_form_cost",	//子实体1
		 		data : [ Header.getFormData().cost ]
		 	},
		 	{
		 		name : "demo_form_costinfo",//子实体2
		 		data : CostInfo.getFormData()
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
/*	
	var retObject = BusinessPanel.getCostInfoPanel().getMaxRowAmountAndEconItemID();

	if (FormOperTypeUtil.isCreateNew() || FormOperTypeUtil.isDraft())
	{
		updateProcessInfo(retObject.econitemid);
	}
*/

	/**
	 * 设置流程属性
	 */
/*	
	parent.getWorkData().setValue("G_SSC_SMCS_MAXROWAMOUNT", retObject.maxrowamount);
	parent.getWorkData().setValue("G_SSC_SMCS_ECONITEMID", retObject.econitemid);
*/

	return true;
};
/**
 * @private
 * 表单提交数据验证
 * @return: true验证通过, false验证不通过
 */
function validateFormData()
{
	if (! Header.validate("submit"))
	{
		return false
	}

	if (! CostInfo.validate("submit"))
	{
		return false
	}

	if (! PayInfo.validate("submit"))
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
	mc.alert("processInstID=" + processInstID + ", entityDataID" + entityDataID);
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
	mc.alert("entityDataID" + entityDataID);
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

$(function()
{
	mc.demo.form.demoform.init();
});