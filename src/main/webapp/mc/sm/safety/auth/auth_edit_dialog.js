/**
 * 操作权限编辑窗体
 */
(function($)
{
	$.widget("sm.AuthEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "操作权限",
			content_url : "mc/sm/safety/auth/auth_edit_dialog.html",			/* 组件html url */
			height : 380,
			width : 670,
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
 			$("#parentcode").attr("readonly", true);
			$("#parentname").attr("readonly", true);
			$("#fullcode").attr("readonly", true);
			$("#fullname").attr("readonly", true);
			$("#level").attr("readonly", true);

			$("#status").StatusComboBox();
			$("#menuid").MenuTreeField(
			{
				beforeOpenCallback : $.proxy(function()
				{
					var param =
					{
						moduleid : this.entitydata.moduleid
					};
					return param;
				}, this)
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
				$("#code").val("");
				$("#name").val("");
				$("#status").StatusComboBox("id", 1);
				$("#menuid").MenuTreeField("clear");

				$("#parentcode").val(this.entitydata.parentcode);
				$("#parentname").val(this.entitydata.parentname);
				$("#fullcode").val("");
				$("#fullname").val("");
				$("#level").val(this.entitydata.level);

				$("#attr1").val("");
				$("#attr2").val("");
				$("#attr3").val("");
				$("#attr4").val("");
				$("#memo").val("");

				this.options.dialog.title = "新增 - 操作权限";
			}
			else
			{
				this.entitydata = data;

				$("#code").val(this.entitydata.code);
				$("#name").val(this.entitydata.name);
				$("#status").StatusComboBox("id", this.entitydata.status);
				$("#menuid").MenuTreeField("data",
				{
					id : this.entitydata.menuid,
					name : this.entitydata.menuname
				});

				$("#parentcode").val(this.entitydata.parentcode);
				$("#parentname").val(this.entitydata.parentname);
				$("#fullcode").val(this.entitydata.fullcode);
				$("#fullname").val(this.entitydata.fullname);
				$("#level").val(this.entitydata.level);

				$("#attr1").val(this.entitydata.attr1);
				$("#attr2").val(this.entitydata.attr2);
				$("#attr3").val(this.entitydata.attr3);
				$("#attr4").val(this.entitydata.attr4);
				$("#memo").val(this.entitydata.memo);

				this.options.dialog.title = "修改 - 操作权限";
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
			if ($.trim($("#code").val()).length <= 0)
			{
				mc.alert("【编码】不可为空");
				return false;
			}

			if ($.trim($("#name").val()).length <= 0)
			{
				mc.alert("【名称】不可为空");
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

			data.code = $("#code").val();
			data.name = $("#name").val();
			data.status = $("#status").StatusComboBox("id");
			data.menuid = $("#menuid").MenuTreeField("id");

			data.attr1 = $("#attr1").val();
			data.attr2 = $("#attr2").val();
			data.attr3 = $("#attr3").val();
			data.attr4 = $("#attr4").val();
			data.memo = $("#memo").val();

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
				url : "sm/auth/add",
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
				url : "sm/auth/update",
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