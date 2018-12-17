(function($)
{
	/**
	 * 城市下拉框
	 */
	$.widget("demo.CityComboBox", $.mc.DynamicComboBox,
	{
		options :
		{
			/**
			 * 初始占位文本
			 */
			place_text : "请选择城市...",
			/**
			 * 获取数据url
			 */
			url : "demo/city/list",
			/**
			 * id字段
			 */
			field_id : "id",
			/**
			 * 显示字段
			 */
			field_text : "name",
			/**
			 * 返回json数据节点
			 */
			data_root : "data"				
		}
	});
})(jQuery);