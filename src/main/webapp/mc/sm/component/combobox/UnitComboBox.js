/**
 * 系统管理模块 - 公司下拉框组件
 */
(function($)
{
	$.widget("sm.UnitComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			place_text : "请选择公司...",	/* 初始占位文本 */
			url : "sm/unit/list",			/* 数据url */
			type : "post",					/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			data_root : "data",				/* 返回数据节点root */
			field_id : "unitID",			/* id字段 */
			field_text : "unitName"			/* text字段 */
		}
	});
})(jQuery);