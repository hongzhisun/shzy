/**
 * 系统管理模块 - 模块下拉框组件
 */
(function($)
{
	$.widget("sm.ModuleComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			place_text : "请选择模块...",	/* 初始占位文本 */
			url : "sm/mcmodule/list",		/* 数据url */
			data_root : "data",				/* 返回数据节点root */	
			field_id : "id",				/* id字段 */
			field_text : "name"				/* text字段 */
		}
	});
})(jQuery);