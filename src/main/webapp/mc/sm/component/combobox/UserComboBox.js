/**
 * 系统管理模块 - 用户下拉框组件
 */
(function($)
{
	$.widget("sm.UserComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			place_text : "请选择用户...",	/* 初始占位文本 */
			url : "sm/user/list",			/* 数据url */
			type : "post",					/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			data_root : "data",				/* 返回数据节点root */
			field_id : "userID",			/* id字段 */
			field_text : "userName"			/* text字段 */
		}
	});
})(jQuery);