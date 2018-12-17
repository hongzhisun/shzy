/**
 * demo省份编辑窗体
 */
(function($)
{
	$.widget("demo.ProvinceEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			content_url : "mc/demo/fun/province/province_edit_dialog.html",			/* 组件html url */
			dialog :
			{
				title : "省份",
				area : [ "400px", "250px" ]
			}
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * 动态加载html完成后回调，子类实现
		 */
		_loadDialogContentEndCallback : function()
		{
			$("#cmbType").ComboBox();
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destroy : function()
		{
			this._super();
		},
		/**
		 * 打开窗口传传入初始化数据
		 * @param edit_mode	新增add；修改update
		 * @param data		更新数据
		 */
		initData : function(edit_mode, data)
		{
			this.options.edit_mode = edit_mode;
			if (this.options.edit_mode == "add")
			{
				this.options.entitydata = {};

				$("#edtCode").val("");
				$("#edtName").val("");
				$("#cmbType").ComboBox("clear");

				this.options.dialog.title = "新增 - 省份";
			}
			else
			{
				this.options.entitydata = data;

				$("#edtCode").val(data.code);
				$("#edtName").val(data.name);
				$("#cmbType").ComboBox("key", data.type);

				this.options.dialog.title = "修改 - 省份";
			}
		},
		/**
		 * @override
		 * 点击确定时内部检查接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			if ($.trim($("#edtCode").val()).length <= 0)
			{
				mc.alert("编码不可为空");
				return false;
			}

			if ($.trim($("#edtName").val()).length <= 0)
			{
				mc.alert("名称不可为空");
				return false;
			}

			if (! $("#cmbType").ComboBox("isSelect"))
			{
				mc.alert("请选择类型");
				return false;
			}

			if (this.options.edit_mode == "add")
			{
				return this._add();
			}
			else
			{
				return this._update();
			}
		},
		_getData : function()
		{
			var data = this.options.entitydata;

			data.code = $("#edtCode").val();
			data.name = $("#edtName").val();
			data.type = $("#cmbType").ComboBox("key");

			return data;
		},
		_add : function()
		{
			var data = this._getData();
			var result = false;

			$.ajax(
			{
				url : "demo/province/add",
				type : "post",
				async : true,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
					alert("add.data=" + mc.encode(data));
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
					mc.alert("新增失败: " + data.msg);
				}
			});

			return result;
		},
		_update : function()
		{
			var data = this._getData();
			var result = false;

			$.ajax(
			{
				url : "demo/province/update",
				type : "post",
				async : true,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
					alert("update.data=" + mc.encode(data));
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
					mc.alert("修改失败: " + data.msg);
				}
			});

			return result;
		}
	});
})(jQuery);