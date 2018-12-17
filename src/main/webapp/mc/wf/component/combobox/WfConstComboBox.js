/**
 * 工作流模块-常用静态下拉框组件
 */
(function($)
{
	$.widget("wf.ProcessInstStatusComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : [ [ -1, "全部" ], [ 0, "未删除" ], [ 1, "在途" ], [ 4, "完成" ], [ 5, "已删除" ] ]
		}
	});
})(jQuery);