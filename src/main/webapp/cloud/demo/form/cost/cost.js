/* 公用表头信息 */
var CommonHeaderPanel = null;
/* 报销业务明细信息 */
var BusinessPanel = null;
/* 审批历史信息 */
var CheckHistoryInfo = null;

var MainEntityControls = [];
var MainChildControls = [];

function init()
{
	/**
	 * 创建面板
	 */
	CommonHeaderPanel = new demo.form.cost.CostHeaderPanel();
	BusinessPanel = new demo.form.cost.CostInfoPanel();

	/* 表单整体组件属性和访问控制属性设置 */
	initFieldAttr();

	var fieldSets = null;
	if (FormOperTypeUtil.isCreateNew() || FormOperTypeUtil.isDraft())
	{
		fieldSets = [ CommonHeaderPanel, BusinessPanel ];
	}
	else
	{
		CheckHistoryInfo = new ssc.form.common.CheckHistoryPanel();
		fieldSets = [ CommonHeaderPanel, BusinessPanel, CheckHistoryInfo ];
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
}

/**
 * 表单整体组件属性和访问控制属性设置
 * @return
 */
function initFieldAttr()
{
	/* 表单字段属性设置 */
	FormFieldAttrUtil.setFormAttr(demo.form.cost.FieldAttrConfig);
};

/**
 * @public	对外表单接口，提供表单审批框架页面调用
 * 表单加载状态接口
 * @return
 * 		true: 已加载完成
 * 		false : 未加载完成
 */
function checkFormDataLoaded()
{
//	if (! CommonHeaderPanel.getStoreLoaded())
//	{
//		return false;
//	}
//
//	if (! BusinessPanel.getStoreLoaded())
//	{
//		return false;
//	}

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

function getFromDataCommon()
{
	var formDataObject =
	{
		actiontype : "entitydata",		//数据保存方式。entitydata: 实体数据表配置解析； spring: 调用指定的Spring Java Bean
		formcode : "cost",
		entitydataid : "",	//表达实体数据ID，可以不传入。如果为空，则工作流引擎自行生成ID
		entitys :
		[
		 	{
		 		name : "smcsfm_main",
		 		data : [ createMainEntityDataObject(MainEntityControls) ]
		 	},
		 	{
		 		name : "smcsfm_cost_info",
		 		data : BusinessPanel.getFormData()
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
	var javaBean = "demoCostFormBP";
	return javaBean;
};

/**
 * 表单提交
 * @param callback
 * @return
 */
function OnSubmit()
{
	return true;
}

Ext.BLANK_IMAGE_URL = "resources/images/s.gif";
Ext.onReady(init);