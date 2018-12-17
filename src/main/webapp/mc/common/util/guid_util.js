mc.namespace("MCloud.util.GuidUtil");

/**
 * Guid工具类
 * 通过后台服务获取新的Guid（由java生成）
 * 也可以通过js本地生成新id
 * @author	yulei
 * 
 * 快捷访问方式：
 * mc.newid
 * mc.newid_js
 */
GuidUtil = MCloud.util.GuidUtil;

MCloud.util.GuidUtil.MaxCount = 10;
MCloud.util.GuidUtil.arrayNewID = new Array();


/**
 * @public
 * 获取服务端新guid
 */
MCloud.util.GuidUtil.createGuid = function()
{
	if (MCloud.util.GuidUtil.arrayNewID.length <= 0)
	{
		MCloud.util.GuidUtil.getNewIDArray();
	}

	return MCloud.util.GuidUtil.arrayNewID.shift();
};
/**
 * 快捷访问方式
 */
mc.newid = MCloud.util.GuidUtil.createGuid;

MCloud.util.GuidUtil.getNewIDArray = function()
{
	try
	{
		$.ajax(
		{
			url : "mc/guid/create",
			type : "get",
			async : false,
			data :
			{
				maxcount : MCloud.util.GuidUtil.MaxCount
			},
			success : function(data, status)
			{
				if (data.success)
				{
					MCloud.util.GuidUtil.arrayNewID = MCloud.util.GuidUtil.arrayNewID.concat(data.data);
				}
				else
				{
					mc.msg("获取新ID发生错误, 错误信息：" + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.msg("获取新ID发生错误, 错误信息：" + ex);
			}
		});
	}
	catch(ex)
	{
		mc.msg("读取新ID发生错误, 错误信息：" + ex);
	}
	finally
	{
	}
};

/**
 * @public
 * js本地生成新guid
 */
MCloud.util.GuidUtil.createGuid_JS = function(randomLength)
{
	return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36);
};
/**
 * 快捷访问方式
 */
mc.newid_js = MCloud.util.GuidUtil.createGuid_JS;