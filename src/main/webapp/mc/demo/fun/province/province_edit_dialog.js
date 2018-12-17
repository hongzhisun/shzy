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
			title : "省份",
			content_url : "mc/demo/fun/province/province_edit_dialog.html",			/* 组件html url */
			height : 250,
			width : 450,
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
			$("#cmbType").ComboBox();
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
				$("#cmbType").ComboBox("id", data.type);

				this.options.dialog.title = "修改 - 省份";
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
		/**
		 * 获取界面填写的数据
		 */
		_getData : function()
		{
			var data = this.options.entitydata;

			data.code = $("#edtCode").val();
			data.name = $("#edtName").val();
			data.type = $("#cmbType").ComboBox("id");

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

			$.ajax(
			{
				url : "demo/province/add",
				type : "post",
				async : false,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
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
		/**
		 * 修改
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		修改成功返回true；否则返回false 
		 */
		_update : function()
		{
			var data = this._getData();
			var result = false;

			$.ajax(
			{
				url : "demo/province/update",
				type : "post",
				async : false,
				data : 
				{
					entity : mc.encode(data)
				},
				success : function(data, status)
				{
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