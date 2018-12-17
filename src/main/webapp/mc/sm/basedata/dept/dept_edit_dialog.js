/**
 * 部门编辑窗体
 */
(function($)
{
	$.widget("sm.DeptEditDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "部门编辑",
			content_url : "mc/sm/basedata/dept/dept_edit_dialog.html",			/* 组件html url */
			height : 340,
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
 			$("#parentCode").attr("readonly", true);
			$("#parentName").attr("readonly", true);
			$("#fullCode").attr("readonly", true);
			$("#fullName").attr("readonly", true);
			$("#level").attr("readonly", true);

			$("#status").StatusComboBox();
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
				$("#deptCode").val("");
				$("#deptName").val("");
				$("#status").StatusComboBox("id", 1);

				$("#parentCode").val(this.entitydata.parentCode);
				$("#parentName").val(this.entitydata.parentName);
				$("#fullCode").val("");
				$("#fullName").val("");
				$("#level").val(this.entitydata.level);

				$("#address").val("");
				$("#tel").val("");
				$("#email").val("");
				$("#fax").val("");
				$("#memo").val("");

				this.options.dialog.title = "部门 - 新增";
			}
			else
			{
				$("#deptCode").val(this.entitydata.deptCode);
				$("#deptName").val(this.entitydata.deptName);
				$("#status").StatusComboBox("id", this.entitydata.status);

				$("#parentCode").val(this.entitydata.parentCode);
				$("#parentName").val(this.entitydata.parentName);
				$("#fullCode").val(this.entitydata.fullCode);
				$("#fullName").val(this.entitydata.fullName);
				$("#level").val(this.entitydata.level);

				$("#address").val(this.entitydata.address);
				$("#tel").val(this.entitydata.tel);
				$("#email").val(this.entitydata.email);
				$("#fax").val(this.entitydata.fax);
				$("#memo").val(this.entitydata.memo);

				this.options.dialog.title = "部门 - 修改";
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
			if ($.trim($("#deptCode").val()).length <= 0)
			{
				mc.alert("【部门编码】不可为空");
				return false;
			}

			if ($.trim($("#deptName").val()).length <= 0)
			{
				mc.alert("【部门名称】不可为空");
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

			data.deptCode = $("#deptCode").val();
			data.deptName = $("#deptName").val();
			data.status = $("#status").StatusComboBox("id");

			data.address = $("#address").val();
			data.tel = $("#tel").val();
			data.email = $("#email").val();
			data.fax = $("#fax").val();
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
				url : "sm/dept/add",
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

			mc.showMask();

			$.ajax(
			{
				url : "sm/dept/update",
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
						mc.alert("修改失败: " + error);
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