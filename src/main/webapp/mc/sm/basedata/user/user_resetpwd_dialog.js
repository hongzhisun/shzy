/**
 * 用户密码重置对话框
 */
(function($)
{
	$.widget("sm.UserResetPwdDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "用户 - 密码重置",
			content_url : "mc/sm/basedata/user/user_resetpwd_dialog.html",
			height : 450,
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
			$("#gridResetUser").jqGrid(gridOption);
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
		 * @param data		重置密码的用户json对象
		 */
		initData : function(data)
		{
			this.entitydata = data;

			$("#gridResetUser").setCaption("已选择【" + this.entitydata.length + "】位用户");

			$("#gridResetUser").clearGridData();
			for (var i = 0; i < this.entitydata.length; i++)
			{
				var user = this.entitydata[i];
				$("#gridResetUser").addRowData(user.userID, user)
			}

			var _this = this;

			$("#rdoType0").prop("checked", true);
			$("#rdoType1").prop("checked", false);
			$("input[name='resettype']").click(function(event)
			{
				var value = $(this).val();
				if (value == 0)
				{
					$("#tr1").hide();
					$("#tr2").hide();
					_this.resizeDialog();
				}
				else if (value == 1)
				{
					$("#tr1").show();
					$("#tr2").show();
					_this.resizeDialog();
				}
			});
			$("#tr1").hide();
			$("#tr2").hide();
			this.resizeDialog();

			$("#edtPwd").val("");
			$("#edtPwdRepeat").val("");
			$("#resetMemo").val("");
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
				mc.alert("没有需要重置密码的用户");
				return false;
			}

			var resettype = $("input[name='resettype']:checked").val();
			if (resettype == 1)
			{
				if ($.trim($("#edtPwd").val()).length <= 0)
				{
					mc.alert("请填写【新密码】");
					return false;
				}

				if ($.trim($("#edtPwdRepeat").val()).length <= 0)
				{
					mc.alert("请填写【确认密码】");
					return false;
				}

				var pwd = $.trim($("#edtPwd").val());
				var pwdRepeat = $.trim($("#edtPwdRepeat").val());
				if (pwd != pwdRepeat)
				{
					mc.alert("新密码与确认密码不一致");
					return false;
				}
			}

			if ($.trim($("#resetMemo").val()).length <= 0)
			{
				mc.alert("请填写【重置密码说明】");
				return false;
			}

			return this._resetPwd();
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

			/**
			 * to-do加盐和加密
			 */

			var data =
			{
				userid : userid,
				defaultpwd : ($("input[name='resettype']:checked").val() == 0),
				pwd : HexUtil.toHex($.trim($("#edtPwd").val()), "fysty"),
				desc : $.trim($("#resetMemo").val())
			}

			return data;
		},
		/**
		 * 重置密码
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		新增成功返回true；否则返回false
		 */
		_resetPwd : function(data)
		{
			var data = this._getData();
			var result = false;

			mc.showMask();

			$.ajax(
			{
				url : "sm/user/resetpwd",
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
						mc.alert("重置密码失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("重置密码失败: " + error);
				}
			});

			return result;
		}
	});
})(jQuery);