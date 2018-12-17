/**
 * 系统管理模块 - 部门下拉框组件
 */
(function($)
{
	$.widget("sm.DeptComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			place_text : "请选择部门...",	/* 初始占位文本 */
			url : "sm/dept/list",			/* 数据url */
			type : "post",					/* http方法 */
			param_serialize : "jsonCondition",	/* 参数序列化 */
			data_root : "data",				/* 返回数据节点root */
			field_id : "deptID",			/* id字段 */
			field_text : "deptName"			/* text字段 */
		}
	});
})(jQuery);