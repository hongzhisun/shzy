/**
 * 对话框布局-内嵌滚动布局(组件化)对话框
 */
(function($)
{
	$.widget("sm.LayoutDialogScrollingDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "对话框布局-内嵌滚动布局(组件化)对话框",
			content_url : "mc/test/ui/layout2/ly_dialog_scrolling_comp_dialog.html",
			height : 500,
			width : 800,
			resize : true,
			maxmin : true,
			dialog :
			{
				success : function(dom, index)	/* 对话框打开后回调函数 */
				{
					$("#grid1").setGridParam(
					{
						datatype : "json",
						postData : 
						{
						}
					}).trigger("reloadGrid");
					$("#grid2").setGridParam(
					{
						datatype : "json",
						postData : 
						{
						}
					}).trigger("reloadGrid");
				}
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
			$("#inputNumber1").NumberField();
			
			$("#inputMoney1").MoneyField();
	
			$("#dateStart1").DateField();
	
			$("#cmbProvince1").ProvinceComboBox();
	
			$("#fieldProvince1").ProvinceField();

			var gridOption = mc.grid.createInitOption("single", "page",
			{
				url : "sm/mcglobalparam/list",
				pager : "#grid1_pager",
				colModel : [
				{
					name : "modulename",
					label : "模块",
					width : 120
				},
				{
					name : "code",
					key : true,
					label : "参数键",
					width : 150
				},
				{
					name : "name",
					label : "参数名称",
					width : 200
				},
				{
					name : "value",
					label : "参数值",
					width : 250
				},
				{
					name : "status",
					label : "状态",
					hidden : true
				},
				{
					name : "status_text",
					label : "状态",
					width : 60,
					align : "center",
					mc_source_col : "status",
					formatter : mc.render.Status
				},
				{
					name : "memo",
					label : "备注",
					width : 200
				} ]
			});
			$("#grid1").jqGrid(gridOption);
			gridOption.pager = "#grid2_pager",
			$("#grid2").jqGrid(gridOption);
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
			return true;
		}
	});
})(jQuery);