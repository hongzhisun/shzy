/**
 * 菜单编辑窗体
 */
(function($)
{
	$.widget("sm.FavoriteEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "收藏",
			content_url : "platform/personal/favorite/favorite_edit_dialog.html",			/* 组件html url */
			height : 300,
			width : 340,
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
			$("#hidden").HiddenComboBox();
 			$("#order").NumberField();
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

 			$("#modulename").attr("readonly", true);
			$("#menuname").attr("readonly", true);
			$("#order").attr("readonly", true);

			if (this.edit_mode == "add")
			{
				$("#modulename").val("");
				$("#menuname").val("");
				$("#name").val("");
				$("#tip").val("");
				$("#hidden").HiddenComboBox("id", 0);
				$("#order").val(0);

				this.options.dialog.title = "新增 - 收藏";
			}
			else
			{
				this.entitydata = data;

				$("#modulename").val(this.entitydata.modulename);
				$("#menuname").val(this.entitydata.menuname);
				$("#name").val(this.entitydata.name);
				$("#tip").val(this.entitydata.tip);
				$("#hidden").HiddenComboBox("id", this.entitydata.hidden);
				$("#order").val(this.entitydata.order);

				this.options.dialog.title = "编辑 - 收藏";
			}
		},
/*		_createDialogOptions : function()
		{
			var dialogOptions = this._super();
	
			return dialogOptions;
		},*/
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			if ($.trim($("#name").val()).length <= 0)
			{
				mc.msg("【显示名称】不可为空");
				return false;
			}

			if (! $("#hidden").HiddenComboBox("isSelect"))
			{
				mc.msg("请选择【是否隐藏】");
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

			data.name = $("#name").val();
			data.tip = $("#tip").val();
			data.hidden = $("#hidden").HiddenComboBox("id");

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
				url : "sm/favorite/add",
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
				url : "sm/favorite/update",
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