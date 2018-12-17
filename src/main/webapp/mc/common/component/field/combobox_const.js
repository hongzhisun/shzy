/**
 * 常用静态下拉框组件
 */
(function($)
{
	$.widget("mc.StatusComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : mc.render.data.Status
		}
	});

	$.widget("mc.YesNoComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : mc.render.data.YesNo
		}
	});

	$.widget("mc.OpenCloseComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : mc.render.data.OpenClose
		}
	});

	$.widget("mc.MonthComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : mc.render.data.Month
		}
	});
})(jQuery);