/**
 * 省份选择对话框
 */
(function($)
{
	$.widget("demo.ProvinceSelectDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "省份选择",
			content_url : "mc/demo/fun/province/province_select_dialog.html",
			height : 400,
			width : 600,
			resize : true,
			maxmin : true,
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
			$("#cmbProvinceTypeSelect").ProvinceTypeComboBox(
			{
				selectCallback : function(id, data, event, ui)
				{
					mc.msg("下拉框触发");
				}
			});

			var gridOption = mc.grid.createInitOption("multi", "page",
			{
				url : "demo/province/list",
				pager : "#gridProvinceSelect_Pager",
				colModel : [
				{
					name : "id",
					hidden : true,
					key : true,
				},
				{
					name : "code",
					label : "编号",
					width : 180
				},
				{
					name : "name",
					label : "名称",
					width : 200
				},
				{
					name : "type",
					hidden : true
				},
				{
					name : "type_text",
					label : "类型",
					width : 100,
					align : "center",
					mc_source_col : "type",
					formatter : demo.render.ProvinceType
				} ]
			});
			$("#gridProvinceSelect").jqGrid(gridOption);

			$("#btnQuery").click(function(event)
			{
				mc.msg("根据界面条件查询数据");
			});

			$("#btnRestore").click(function(event)
			{
				mc.msg("清除已输入的查询条件，并重新查询数据");
			});
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
		 * 查询参数
		 * （可根据应用模式随意使用）
		 */
		param : null,
		/**
		 * 打开途径（多种打开途径下，使用）
		 * 0，对话框
		 * 1, field中打开
		 */
		openType : "",
		getOpenType : function()
		{
			return this.openType;
		},
		/**
		 * 传入初始化数据，需要在open之前调用
		 * （该方法可根据实际需要任意定义）
		 * @param param		初始化查询参数，此处未使用
		 * @param openType	打开途径
		 */
		initData : function(param, openType)
		{
			this.param = param;
			this.openType = openType;

			/**
			 * 打开对话框之前才开始查询数据
			 */
			$("#gridProvinceSelect").setGridParam(
			{
				datatype : "json"
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
			if (! $("#gridProvinceSelect").isSelect())
			{
				mc.alert("请先选择省份");
				return false;
			}

			return true;
		},
		/**
		 * 获取已选择的ID
		 */
		getId : function()
		{
			return $("#gridProvinceSelect").getId();
		},
		/**
		 * 获取已显示的文本
		 */
		getText : function()
		{
			var data = this.getData();

			var text = "";
			for (var i = 0; i < data.length; i++)
			{
				if ($.trim(text).length > 0)
				{
					text += ", "
				}
				text += data[i].name;
			}
			
			return text;
		},
		/**
		 * 获取已选择的数据对象
		 */
		getData : function()
		{
			return $("#gridProvinceSelect").getData();
		}
	});
})(jQuery);