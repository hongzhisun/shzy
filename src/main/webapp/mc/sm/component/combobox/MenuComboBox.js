/**
 * 系统管理模块 - 菜单下拉框组件
 */
(function($)
{
	$.widget("sm.MenuComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			place_text : "请选择菜单...",	/* 初始占位文本 */
			url : "sm/mcmenu/list",			/* 数据url */
			data_root : "data",				/* 返回数据节点root */	
			field_id : "id",				/* id字段 */
			field_text : "name"				/* text字段 */
		}
	});
})(jQuery);