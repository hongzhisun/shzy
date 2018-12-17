/**
 * 公司参数编辑对话框
 */
(function($)
{
	$.widget("sm.CompanyParamEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "公司参数",
			content_url : "mc/sm/config/companyparam/companyparam_edit_dialog.html",
			height : 320,
			width : 600,
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
			$("#fieldCompany_Edit").UnitTreeField();
			$("#cmbStatus_Edit").StatusComboBox();
			$("#fieldModule_Edit").ModuleTreeField();
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
				$("#fieldCompany_Edit").UnitTreeField("clear", false);
				$("#fieldCompany_Edit").UnitTreeField("enable");

				if (mc.str.notempty(this.entitydata.unitid))
				{
					$("#fieldCompany_Edit").UnitTreeField("setInitData", this.entitydata.unitid, this.entitydata.unitname);
				}

				$("#edtCode_Edit").val("");
				$("#edtCode_Edit").attr("readonly", false);

				$("#edtName_Edit").val("");
				$("#edtValue_Edit").val("");

				$("#cmbStatus_Edit").StatusComboBox("id", 1);
				$("#fieldModule_Edit").ModuleTreeField("clear");
				if (mc.str.notempty(this.entitydata.moduleid))
				{
					$("#fieldModule_Edit").ModuleTreeField("setInitData", this.entitydata.moduleid, this.entitydata.modulename);
				}
				
				$("#memo_Edit").val("");

				this.options.dialog.title = "新增 - 公司参数";
			}
			else
			{
				$("#fieldCompany_Edit").UnitTreeField("setInitData", this.entitydata.unitid, this.entitydata.unitname);
				$("#fieldCompany_Edit").UnitTreeField("disable");

				$("#edtCode_Edit").val(this.entitydata.code);
				$("#edtCode_Edit").attr("readonly", true);

				$("#edtName_Edit").val(this.entitydata.name);
				$("#edtValue_Edit").val(this.entitydata.value);

				$("#cmbStatus_Edit").StatusComboBox("id", this.entitydata.status);
				$("#fieldModule_Edit").ModuleTreeField("setInitData", this.entitydata.moduleid, this.entitydata.modulename);

				$("#memo_Edit").val(this.entitydata.memo);

				this.options.dialog.title = "修改 - 公司参数";
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
			if (! $("#fieldCompany_Edit").UnitTreeField("isSelect"))
			{
				mc.alert("请选择【公司】");
				return false;
			}

			if ($.trim($("#edtCode_Edit").val()).length <= 0)
			{
				mc.alert("【参数键】不可为空");
				return false;
			}

			if ($.trim($("#edtName_Edit").val()).length <= 0)
			{
				mc.alert("【参数名称】不可为空");
				return false;
			}

			if ($.trim($("#edtValue_Edit").val()).length <= 0)
			{
				mc.alert("【参数值】不可为空");
				return false;
			}

			if (! $("#status").StatusComboBox("isSelect"))
			{
				mc.alert("请选择【状态】");
				return false;
			}

			if (this.edit_mode == "add")
			{
				return this._add();
			}
			else
			{
				return this._update();
			}
		},
		/**
		 * 获取界面填写的数据
		 */
		_getData : function()
		{
			var data = this.entitydata;

			data.compid = $("#fieldCompany_Edit").UnitTreeField("id");
			data.code = $("#edtCode_Edit").val();
			data.name = $("#edtName_Edit").val();
			data.value = $("#edtValue_Edit").val();

			data.status = $("#cmbStatus_Edit").StatusComboBox("id");
			data.moduleid = $("#fieldModule_Edit").ModuleTreeField("id");

			data.memo = $("#memo_Edit").val();

			return data;
		},
		/**
		 * 新增
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		新增成功返回true；否则返回false
		 */
		_add : function()
		{
			var data = this._getData();
			var result = false;

			mc.showMask();

			$.ajax(
			{
				url : "sm/mccompanyparam/add",
				type : "post",
				async : false,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						result = true;
					}
					else
					{
						mc.alert("新增失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("新增失败: " + error);
				}
			});

			return result;
		},
		/**
		 * 修改
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		修改成功返回true；否则返回false 
		 */
		_update : function()
		{
			var data = this._getData();
			var result = false;

			mc.showMask();

			$.ajax(
			{
				url : "sm/mccompanyparam/update",
				type : "post",
				async : false,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						result = true;
					}
					else
					{
						mc.alert("修改失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("修改失败: " + error);
				}
			});

			return result;
		}
	});
})(jQuery);