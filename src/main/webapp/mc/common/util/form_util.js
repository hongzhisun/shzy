mc.namespace("MCloud.util.FormUtil");

/**
 * form表单辅助工具类
 * 提供了表单整体的数据访问、数据验证、ajax提交的通用接口
 * @author	yulei
 * 
 * 快捷访问方式：
 * mc.form.getData(form_id);
 * mc.form.setData(form_id, data);
 * mc.form.validate(form_id, config_validate);
 * mc.form.post(form_id, config_ajax);
 */

/**
 * 快捷访问方式
 */
FormUtil = MCloud.util.FormUtil;
mc.form = MCloud.util.FormUtil;

/**
 * 获取表单数据
 */
MCloud.util.FormUtil.getRawData = function(form_id)
{
};

/**
 * 设置表单数据
 */
MCloud.util.FormUtil.setRawData = function(form_id, data)
{
};

/**
 * 获取表单数据
 */
MCloud.util.FormUtil.getData = function(form_id)
{
};

/**
 * 设置表单数据
 */
MCloud.util.FormUtil.setData = function(form_id, data)
{
};

/**
 * 表单验证
 * 一种是设置验证规则，等待自行触发
 * 另一种是调用时验证
 * @param	config
 * config = 
 * {
 * 		trigger : //触发方式
 * 		tip_type : "tip"/"msg"/alert
 * 		fields :
 * 		[
 * 			field1 :
 * 			{
 * 				rules :
 * 				[
 * 				]
 * 			}
 * 		]
 * }
 */
MCloud.util.FormUtil.setValidator = function(form_id, config)
{
};

MCloud.util.FormUtil.validate = function(form_id, config)
{
};

/**
 * 表单提交
 */
MCloud.util.FormUtil.post = function(form_id, url, config)
{
	if (! MCloud.util.FormUtil.validate(form_id))
	{
		return false;
	}

	var data = MCloud.util.FormUtil.getData(form_id);

	var raw_config = $.extend(true, {}, config,
	{
		data : data
	});

	$.ajax(url, raw_config);
};