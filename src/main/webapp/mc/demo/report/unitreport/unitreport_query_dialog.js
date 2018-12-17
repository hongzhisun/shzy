/**
 * 查询参数对话框
 */
(function($)
{
	$.widget("demo.UnitReportQueryDialog", $.mc.BaseDialog,
	{
		options :
		{
			title : "报表查询参数",
			content_url : "mc/demo/report/unitreport/unitreport_query_dialog.html",
			height : 150,
			width : 400,
			resize : false,
			maxmin : false,
			dialog :
			{
			}
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._create()
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._loadDialogContentEndCallback()
		 * 动态加载html完成后回调，子类实现
		 */
		_loadDialogContentEndCallback : function()
		{
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._init()
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._destroy()
		 * 析构接口
		 */
		_destroy : function()
		{
			this._super();
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			/**
			 * 参数必填校验
			 */
			/*
			if ($.trim($("#edtUnitText").val()).length <= 0)
			{
				mc.alert("【公司过滤参数】不可为空");
				return false;
			}
			*/

			return true;
		},
		/**
		 * 获取查询参数
		 */
		getParam : function()
		{
			var param = 
			{
				unittext : $("#edtUnitText").val(),
				reportparam : $("#edtReportParam").val()
			}

			return param;
		}
	});
})(jQuery);