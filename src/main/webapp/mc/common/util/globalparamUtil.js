MCloud.namespace("MCloud.util");

/**
 * 全局参数工具类
 */
MCloud.util.GlobalParamUtil = {};

GlobalParamUtil = MCloud.util.GlobalParamUtil;

/**
 * 是否调试模式
 */
MCloud.util.GlobalParamUtil.isDebugMode = true;

/**
 * 自定义全局变量Map
 * 内部使用
 */
MCloud.util.GlobalParamUtil.ValueMap = new MCloud.util.BaseCondition();

/**
 * 全局参数是否已经初始化
 */
MCloud.util.GlobalParamUtil.isInit = false;

/**
 * 初始化全局参数
 * @TO-DO
 */
MCloud.util.GlobalParamUtil.init = function()
{
    MCloud.util.GlobalParamUtil.isInit = true;
};

MCloud.util.GlobalParamUtil.get_SpecactDistribute = function()
{
	if (! MCloud.util.GlobalParamUtil.contains_Key("BCM_SPECACT_DISTRIBUTE"))
	{
		Ext.Ajax.request(
		{
			url : "bcm/globalparam/getspecactdistribute",
			sync: true, 
			success : function(response)
			{
				var data = Ext.decode(response.responseText);
				if (data.success == true)
				{
					if (data.success)
					{
						MCloud.util.GlobalParamUtil.set_Integer("BCM_SPECACT_DISTRIBUTE", data.data);
					}
					else
					{
						MsgUtil.alert(data.msg);
						return;
					}
				}
			},
			timeout : 0
		});
	}

	return MCloud.util.GlobalParamUtil.get_Integer("BCM_SPECACT_DISTRIBUTE");
};

/**
 * 自定义全局参数读取
 */
MCloud.util.GlobalParamUtil.contains_Key = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.hasProperty(key);
};
MCloud.util.GlobalParamUtil.get_String = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.getString(key);
};
MCloud.util.GlobalParamUtil.get_Integer = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.getInteger(key);
};
MCloud.util.GlobalParamUtil.get_Number = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.getNumber(key);
};
MCloud.util.GlobalParamUtil.get_Boolean = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.getBoolean(key);
};
MCloud.util.GlobalParamUtil.get_Object = function(key)
{
	return MCloud.util.GlobalParamUtil.ValueMap.getObject(key);
};

/**
 * 自定义全局参数写入
 */
MCloud.util.GlobalParamUtil.set_String = function(key, value)
{
	MCloud.util.GlobalParamUtil.ValueMap.addString(key, value);
};
MCloud.util.GlobalParamUtil.set_Integer = function(key, value)
{
	MCloud.util.GlobalParamUtil.ValueMap.addInteger(key, value);
};
MCloud.util.GlobalParamUtil.set_Number = function(key, value)
{
	MCloud.util.GlobalParamUtil.ValueMap.addNumber(key, value);
};
MCloud.util.GlobalParamUtil.set_Boolean = function(key, value)
{
	MCloud.util.GlobalParamUtil.ValueMap.addBoolean(key, value);
};
MCloud.util.GlobalParamUtil.set_Object = function(key, value)
{
	MCloud.util.GlobalParamUtil.ValueMap.addObject(key, value);
};