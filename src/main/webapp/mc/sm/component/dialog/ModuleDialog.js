/**
 * 系统管理模块 - 模块弹窗选择组件
 */
(function($)
{
	/**
	 * 模块树选择对话框
	 */
	$.widget("sm.ModuleTreeDialog", $.mc.TreeDialog,
	{
		options :
		{
			title : "选择公司",				/* 对话框标题 */
			root_name : "公司",				/* 根节点名称 */
			url : "sm/mcmodule/list",		/* 数据url */
			type : "post",					/* http方法 */
			param_serialize : "filter",		/* 参数序列化 */
			param_page : "page",			/* 开始页数 */
			param_startrow : "start",		/* 开始行数 */
			param_rows : "limit",			/* 每页行数 */
			data_root : "data",				/* 返回数据节点root */
			field_id : "id",				/* id字段 */
			field_text : "name",			/* text字段 */
			field_parentid : "parentid",	/* 上级id字段 */
			field_leaf : "isleaf",			/* 是否末级字段 */
			field_level : "level"			/* 级别字段 */
		}
	});
})(jQuery);