Ext.namespace("ssc.cup.form");

/**
 * 根据列的dataindex查找列索引
 * @param dataindex
 * @return	未找到返回-1
 */
/*Ext.grid.XyColumnModel.prototype.getColumnIndexByDataIndex = function(strDataIndex)
{
	for (var i = 0; i < this.getColumnCount(); i++)
	{
		if (this.getDataIndex(i) == strDataIndex)
		{
			return i;
		}
	}

	return -1;
};*/

/**界面随窗口大小自适应
 * 每个类型的表单主js中要有id为maindiv的组件
 * */
function resizeWin()
{
    window.onresize = function()
    {
    	Ext.getCmp("maindiv") ? Ext.getCmp("maindiv").doLayout() : null;
    };	
}

/**设置textfield超出最大长度不让其输入*/
/*Ext.form.TextField.prototype.size = 20;
Ext.form.TextField.prototype.initValue = function()
{
	if (this.value !== undefined)
	{
		this.setValue(this.value);
	}
	else if (this.el.dom.value.length > 0)
	{
		this.setValue(this.el.dom.value);
	}
	this.el.dom.size = this.size;
	if (!isNaN(this.maxLength) && (this.maxLength * 1) > 0 && (this.maxLength != Number.MAX_VALUE))
	{
		this.el.dom.maxLength = this.maxLength * 1;
	}
};  */

var ExpandMainEntitys = 
{
	"BT0101" : "SMCSFM_COST",
	"BT0201" : "SMCSFM_CONTRACT",
	"BT0401" : "SMCSFM_REPORT",
	"BT0103" : "SMCSFM_WRITEOFF",
	"BT0102" : "SMCSFM_CTCOST",
	"BT0301" : "SMCSFM_ASSETSCRAP"
};

function getEntityTemplateData(EntityInfo)
{
	var templateData = new Array();
    templateData[0] = [];
    templateData[1] = [];
    
    for (key in EntityInfo)
    {
        if (typeof EntityInfo[key] != "function")
        {
            var control = Ext.getCmp(EntityInfo[key]["id"]);
            if (control != null)
            {
                if (control.XyNotSave === true)
                {
                    continue;
                }

                templateData[0].push(control["XySaveField"] ? control["XySaveField"] : control["id"]);

                templateData[1].push(FormFieldUtil.getFieldValue(control));
            }
        }
    }

    return templateData;
}

/**
 * TODO getMainEntityInfo后续加入全局工具类
 */
function getMainEntityInfo()
{
    var schema =
    {
        entities : ["SMCSFM_MAIN"],
        keyColumns : ["serialno"]
    };

    var templateData = getEntityTemplateData(MainEntityControls);

    var envelope = [schema, templateData];
    return envelope;
}

/**
 * TODO getChildEntityInfo后续加入全局工具类
 */
function getChildEntityInfo()
{
	var strFormTypeCode = FormGlobalVariant.get_FormTypeCode();
    var schema =
    {
        entities : [ExpandMainEntitys[strFormTypeCode]]
    };

    var templateData = getEntityTemplateData(MainChildControls);

    var envelope = [schema, templateData];
    return envelope;
}

/**附件上传是否可用*/
function attachmentEnable()
{
	return (FormGlobalVariant.get_Activity_AttachmentEnable() == "1");
}

Ext.form.TextField.disabledClass = "ssc_cup_form_textfield";


/* TabPanel功能扩展 */
/**
 * 按照ID获取面板
 */
Ext.TabPanel.prototype.getTabByID = function(tabID)
{
	for ( var i = 0; i < this.items.getCount(); i++)
	{
		var tab = this.getItem(i);
		if (tab.id === tabID)
		{
			return tab;
		}
	}

	return null;
};

/**
 * 判断面板是否隐藏
 */
Ext.TabPanel.prototype.isTabHide = function(index)
{
	var tab = this.getItem(index);
	if (tab == null || tab == undefined)
	{
		return;
	}

    var el = this.getTabEl(tab);
    if(el == null || el == undefined)
    {
    	return;
    }

    if (el.style.display == "none")
    {
    	return true;
    }
    else
    {
    	return false;
    }
};

Ext.TabPanel.prototype.isTabHideByID = function(tabID)
{
	var tab = this.getTabByID(tabID);
	if (tab == null || tab == undefined)
	{
		return;
	}

    var el = this.getTabEl(tab);
    if(el == null || el == undefined)
    {
    	return;
    }

    if (el.style.display == "none")
    {
    	return true;
    }
    else
    {
    	return false;
    }
};

/**
 * 获取主实体JsonObject
 * @param MainEntityControls	主实体
 * @param MainChildControls		扩展主实体
 * @return
 */
function createMainEntityDataObject(MainEntityControls)
{
	var mainEntityDataObject = {};
	for (var i = 0; i < MainEntityControls.length; i++)
	{
		var com = MainEntityControls[i];
		if (typeof(com) == "function")
		{
			continue;
		}

		var component = Ext.getCmp(com.id);
		if (component == null)
		{
			continue;
		}

        if (component.XyNotSave != undefined && component.XyNotSave === true)
        {
            continue;
        }

		var fieldName = component.XySaveField ? component.XySaveField : component.id;
		var fieldValue = FormFieldUtil.getFieldValue(component);

		mainEntityDataObject[fieldName] = fieldValue;
	}

	return mainEntityDataObject;
}

function createExpandMainEntityDataObject(MainChildControls)
{
	var expandMainEntityDataObject = {};
	for (var i = 0; i < MainChildControls.length; i++)
	{
		var com = MainChildControls[i];
		if (typeof(com) == "function")
		{
			continue;
		}

		var component = Ext.getCmp(com.id);
		if (component == null)
		{
			continue;
		}

        if (component.XyNotSave != undefined && component.XyNotSave === true)
        {
            continue;
        }

		var fieldName = component.XySaveField ? component.XySaveField : component.id;
		var fieldValue = FormFieldUtil.getFieldValue(component);

		expandMainEntityDataObject[fieldName] = fieldValue;
	}

	return expandMainEntityDataObject;
}

function createDetailEntityDataObject(panel)
{
	return panel.getFormData();
}