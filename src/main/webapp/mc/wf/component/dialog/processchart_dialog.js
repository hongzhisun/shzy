/**
 * 流程图对话框
 */
(function($)
{
	$.widget("wf.ProcessChartDialog", $.mc.BaseDialog,
	{
		id_image : "wf_processchartimg",
		basePath : "",
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "流程图",
			content_url : "mc/wf/component/dialog/processchart_dialog.html",			/* 组件html url */
			height : 400,
			width : 500,
			resize : true,
			maxmin : true,
			dialog :
			{
				btn : [ "关闭" ]
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
			var $basePath = $("#basePath");
			if (! mc.isJQuery($basePath))
			{
				mc.alert("页面上未找到bastPath元素");
				return;
			}

			this.basePath = $basePath.val();

			var image_url = this.basePath + "resources/images/s.gif";

			$("#" + this.id_image).attr("src", image_url);
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
		 * @public
		 * 传入初始化数据，需要在open之前调用
		 * @param processID	流程ID
		 */
		setProcessID : function(processID)
		{
			if (processID == undefined
					|| processID == null
					|| typeof(processID) != "string"
					|| $.trim(processID).length <= 0)
			{
				mc.alert("未传入有效参数");
				return;
			}

			/**
			 * 获取流程图
			 */
			var image_url = this.basePath + "wf/processchart/getProcessChart?processid=" + processID;

			$("#" + this.id_image).attr("src", image_url);
		},
		/**
		 * @public
		 * 传入初始化数据，需要在open之前调用
		 * @param processInstID	流程实例ID
		 */
		setProcessInstID : function(processInstID)
		{
			if (processInstID == undefined
					|| processInstID == null
					|| typeof(processInstID) != "string"
					|| processInstID.trim().length <= 0)
			{
				mc.alert("未传入有效参数");
				return;
			}

			/**
			 * 获取流程图
			 */
			var image_url = this.basePath + "wf/processchart/getProcessInstChart?processinstid=" + processInstID;

			$("#" + this.id_image).attr("src", image_url);
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			return true;
		}
	});
})(jQuery);