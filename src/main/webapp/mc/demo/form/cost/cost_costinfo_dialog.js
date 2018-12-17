/**
 * 编辑窗体
 */
(function($)
{
	$.widget("demo.CostInfoDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "菜单",
			content_url : "mc/demo/form/cost/cost_costinfo_dialog.html",			/* 组件html url */
			height : 200,
			width : 350,
			resize : false,
			maxmin : false,
			dialog :
			{
			}
		},
		/**
		 * 编辑模式，add, update
		 */
		edit_mode : "",
		getEditMode : function()
		{
			return this.edit_mode;
		},
		/**
		 * 实体数据
		 */
		entitydata : {},
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
			$("#province").ProvinceComboBox();
			$("#amount").MoneyField();
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
		 * 传入初始化数据，需要在open之前调用
		 * @param edit_mode	新增add；修改update
		 * @param data		更新数据json对象
		 */
		initData : function(edit_mode, data)
		{
			this.edit_mode = edit_mode;
			this.entitydata = data;

			if (this.edit_mode == "add")
			{
				$("#province").ProvinceComboBox("clear");
				$("#memo").val("");
				$("#amount").MoneyField("value", 0);

				this.options.dialog.title = "新增 - 费用明细行";
			}
			else
			{
				this.entitydata = data;

				$("#province").ProvinceComboBox("data",
				{
					id : this.entitydata.provinceid,
					code : this.entitydata.provincecode,
					name : this.entitydata.provincename
				});
				$("#memo").val(this.entitydata.memo);
				$("#amount").MoneyField("value", this.entitydata.amount);

				this.options.dialog.title = "修改 - 费用明细行";
			}
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			if (! $("#province").ProvinceComboBox("isSelect"))
			{
				mc.msg("请选择【省份】");
				$("#province").focus();
				return false;
			}

			if ($("#amount").MoneyField("value") == 0)
			{
				mc.msg("【金额】不可为0");
				$("#amount").focus();
				return false;
			}

			return true;
		},
		/**
		 * 获取界面填写的数据
		 */
		getData : function()
		{
			var data = this.entitydata;

			data.provinceid = $("#province").ProvinceComboBox("id");
			data.provincecode = $("#province").ProvinceComboBox("attr", "code");
			data.provincename = $("#province").ProvinceComboBox("attr", "name");

			data.memo = $.trim($("#memo").val());
			data.amount = $("#amount").MoneyField("value");

			return data;
		}
	});
})(jQuery);