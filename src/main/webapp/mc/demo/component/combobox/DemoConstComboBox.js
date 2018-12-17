/**
 * demo模块常用静态下拉框组件
 */
(function($)
{
	$.widget("demo.ProvinceTypeComboBox", $.mc.ComboBox,
	{
		options :
		{
			init_data : demo.render.data.ProvinceType
		}
	});
})(jQuery);