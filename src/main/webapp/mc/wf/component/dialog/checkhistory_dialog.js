/**
 * 审批历史对话框
 */
(function($)
{
	$.widget("wf.CheckHistoryDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "审批历史",
			content_url : "mc/wf/component/dialog/checkhistory_dialog.html",			/* 组件html url */
			height : 350,
			width : 500,
			resize : false,
			maxmin : false,
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
			var gridOption = mc.grid.createInitOption("single", "all",
			{
				url : "wf/checkhistory/list",
				colModel : [
				{
					name : "checkid",
					hidden : true,
					key : true,
				},
				{
					name : "checkstep",
					label : "审批步骤",
					width : 65,
					hidden : true
				},
				{
					name : "activityname",
					label : "审批环节",
					width : 100
				},
				{
					name : "displayname",
					label : "审批者",
					width : 70
				},
				{
					name : "checkdesc",
					label : "审批意见",
					width : 120
				},
				{
					name : "checktime",
					label : "审批时间",
					width : 130
				} ]
			});
			$("#gridCheckHistory").jqGrid(gridOption);
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
		 * @param processInstID	流程实例ID
		 */
		initData : function(processInstID)
		{
			$("#gridCheckHistory").setGridParam(
			{
				datatype : "json",		/* 查询前设置datatype */
				postData : 				/* 查询前设置提交参数 */
				{
					processInstID : processInstID
				}
			}).trigger("reloadGrid");
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