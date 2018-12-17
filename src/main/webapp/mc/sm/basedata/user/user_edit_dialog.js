/**
 * 用户编辑对话框
 */
(function($)
{
	$.widget("sm.UserEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "用户编辑",
			content_url : "mc/sm/basedata/user/user_edit_dialog.html",
			height : 320,
			width : 650,
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
			$("#unitID").UnitTreeField(
			{
				allowClear : false,
				changeCallback : function(id, data, id_old, data_old)
				{
					$("#deptID").DeptTreeField("clear");
				},
				clearCallback : function(id_old, data_old)
				{
					$("#deptID").DeptTreeField("clear");
				}
			});

			$("#deptID").DeptTreeField(
			{
				beforeOpenCallback : function()
				{
					if (! $("#unitID").UnitTreeField("isSelect"))
					{
						mc.alert("请先选择公司");
						return false;
					}

					var param =
					{
						unitid : $("#unitID").UnitTreeField("id")
					};

					return param;
				}
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
				$("#userName").val("");
				$("#userCode").val("");
				$("#password").val("");
				$("#empolyNo").val("");
				
				$("#unitID").UnitTreeField("clear", false);
				$("#unitID").UnitTreeField("enable");
				if (mc.str.notempty(this.entitydata.unitID))
				{
					$("#unitID").UnitTreeField("setInitData", this.entitydata.unitID, this.entitydata.unitName);
				}
				$("#deptID").DeptTreeField("clear", false);
				$("#deptID").DeptTreeField("enable");
				if (mc.str.notempty(this.entitydata.deptID))
				{
					$("#deptID").DeptTreeField("setInitData", this.entitydata.deptID, this.entitydata.deptName);
				}

				$("#tel").val("");
				$("#mobileTel").val("");
				$("#email").val("");
				$("#memo").val("");

				this.options.dialog.title = "用户 - 新增";
			}
			else
			{
				$("#userName").val(this.entitydata.userName);
				$("#userCode").val(this.entitydata.userCode);
				$("#password").val("******");
				$("#password").attr("readonly", true);
				$("#empolyNo").val(this.entitydata.empolyNo);


				$("#unitID").UnitTreeField("clear", false);
				$("#unitID").UnitTreeField("enable");
				if (mc.str.notempty(this.entitydata.unitID))
				{
					$("#unitID").UnitTreeField("setInitData", this.entitydata.unitID, this.entitydata.unitName);
				}
				$("#deptID").DeptTreeField("clear", false);
				$("#deptID").DeptTreeField("enable");
				if (mc.str.notempty(this.entitydata.deptID))
				{
					$("#deptID").DeptTreeField("setInitData", this.entitydata.deptID, this.entitydata.deptName);
				}

				$("#tel").val(this.entitydata.tel);
				$("#mobileTel").val(this.entitydata.mobileTel);
				$("#email").val(this.entitydata.email);
				$("#memo").val(this.entitydata.memo);

				this.options.dialog.title = "用户 - 修改";
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
			if ($.trim($("#userName").val()).length <= 0)
			{
				mc.alert("【姓名】不可为空");
				return false;
			}

			if ($.trim($("#userCode").val()).length <= 0)
			{
				mc.alert("【登录名】不可为空");
				return false;
			}

			if (this.edit_mode == "add")
			{
				if ($.trim($("#password").val()).length <= 0)
				{
					mc.alert("【密码】不可为空");
					return false;
				}
			}

			if (! $("#unitID").UnitTreeField("isSelect"))
			{
				mc.alert("请选择【所属公司】");
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

			data.userName = $("#userName").val();
			data.userCode = $("#userCode").val();
			data.empolyNo = $("#empolyNo").val();

			/**
			 * to-do加盐和加密
			 */
			if (this.edit_mode == "add")
			{
				data.password = $("#password").val();
			}

			data.unitID = $("#unitID").UnitTreeField("id");
			data.deptID = $("#deptID").DeptTreeField("id");

			data.tel = $("#tel").val();
			data.mobileTel = $("#mobileTel").val();
			data.email = $("#email").val();
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
				url : "sm/user/add",
				type : "post",
				async : false,
				data : 
				{
					jsonString : mc.encode(data)
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
				url : "sm/user/update",
				type : "post",
				async : false,
				data : 
				{
					jsonString : mc.encode(data)
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