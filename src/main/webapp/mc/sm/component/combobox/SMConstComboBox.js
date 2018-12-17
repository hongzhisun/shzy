/**
 * 系统管理模块-常用静态下拉框组件
 */
(function($)
{
	/**
	 * 显示、隐藏
	 */
	$.widget("sm.HiddenComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : sm.render.data.Hidden
		}
	});

	/**
	 * 用户状态
	 */
	$.widget("sm.UserStatusComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : sm.render.data.UserStatus
		}
	});

	/**
	 * 权限分配模式
	 */
	$.widget("sm.AllocModeComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : sm.render.data.AllocMode
		}
	});
})(jQuery);