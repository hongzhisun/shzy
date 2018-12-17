/**
 * 用户锁定对话框
 */
(function($)
{
	$.widget("sm.UserLockDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "用户 - 锁定",
			content_url : "mc/sm/basedata/user/user_lock_dialog.html",
			height : 400,
			width : 600,
			resize : true,
			maxmin : true,
			dialog :
			{
			}
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
			var gridOption = mc.grid.createInitOption("single", "all",
			{
				caption : "已选择【】位用户",
				hidegrid : false,
				colModel : [
				{
					name : "userID",
					hidden : true,
					key : true,
				},
				{
					name : "userCode",
					label : "登录名",
					width : 150
				},
				{
					name : "userName",
					label : "姓名",
					width : 100
				},
				{
					name : "status",
					hidden : true
				},
				{
					name : "status_text",
					label : "状态",
					width : 60,
					align : "center",
					mc_source_col : "status",
					formatter : sm.render.UserStatus
				},
				{
					name : "deptCode",
					label : "部门编码",
					width : 100
				},
				{
					name : "deptName",
					label : "部门名称",
					width : 100
				},
				{
					name : "unitCode",
					label : "公司编码",
					width : 100
				},
				{
					name : "unitName",
					label : "公司名称",
					width : 100
				} ]
			});
			$("#gridLockUser").jqGrid(gridOption);
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
		 * @param data		需要锁定的用户json对象
		 */
		initData : function(data)
		{
			this.entitydata = data;

			$("#gridLockUser").setCaption("已选择【" + this.entitydata.length + "】位用户");

			$("#gridLockUser").clearGridData();
			for (var i = 0; i < this.entitydata.length; i++)
			{
				var user = this.entitydata[i];
				$("#gridLockUser").addRowData(user.userID, user)
			}

			$("#lockMemo").val("");
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			if (this.entitydata.length <= 0)
			{
				mc.alert("没有需要锁定的用户");
				return false;
			}

			if ($.trim($("#lockMemo").val()).length <= 0)
			{
				mc.alert("请填写【锁定说明】");
				return false;
			}

			return this._lock();
		},
		/**
		 * 获取界面填写的数据
		 */
		_getData : function()
		{
			var userid = "";
			for (var i = 0; i < this.entitydata.length; i++)
			{
				var user = this.entitydata[i];
				if ($.trim(userid).length > 0)
				{
					userid += ",";
				}

				userid += user.userID; 
			}

			var data =
			{
				userid : userid,
				desc : $.trim($("#lockMemo").val())
			}

			return data;
		},
		/**
		 * 锁定
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		新增成功返回true；否则返回false
		 */
		_lock : function()
		{
			var data = this._getData();
			var result = false;

			mc.showMask();

			$.ajax(
			{
				url : "sm/user/lock",
				type : "post",
				async : false,
				data : 
				{
					jsonCondition : mc.encode(data)
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
						mc.alert("锁定失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("锁定失败: " + error);
				}
			});

			return result;
		}
	});
})(jQuery);