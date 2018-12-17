/**
 * 角色用户设置窗体
 */
(function($)
{
	$.widget("sm.RoleUserSetupDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "角色模块关联",
			content_url : "mc/sm/safety/assign/roleuser_setup_dialog.html",
			height : 450,
			width : 680,
			resize : true,
			maxmin : true
		},
		/**
		 * 角色数据对象
		 */
		roleData : "",
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
			_This = this;

			$("#fieldUnitSetup").UnitTreeField(
			{
				changeCallback : function(id, text, data, event, ui)
				{
					$("#fieldDeptSetup").DeptTreeField("clear");
					_This.queryUnAllotUserByParam();
				},
				clearCallback : function()
				{
					$("#fieldDeptSetup").DeptTreeField("clear");
					_This.queryUnAllotUserByParam();
				}
			});

			$("#fieldDeptSetup").DeptTreeField(
			{
				beforeOpenCallback : function()
				{
					if (! $("#fieldUnitSetup").UnitTreeField("isSelect"))
					{
						mc.alert("请先选择公司");
						return false;
					}

					var param =
					{
						unitid : $("#fieldUnitSetup").UnitTreeField("id")
					};

					return param;
				},
				changeCallback : function(id, text, data, event, ui)
				{
					_This.queryUnAllotUserByParam();
				},
				clearCallback : function()
				{
					_This.queryUnAllotUserByParam();
				}
			});

			$("#edtUserTextSetup").keypress(inputEnterEvent);
			function inputEnterEvent(event)
			{
				if(event.keyCode == "13")
				{
					_This.queryUnAllotUserByParam();
				}
			};

			$("#btnUserQuerySetup").click(function(event)
			{
				_This.queryUnAllotUserByParam();
			});

			$("#btnUserClearSetup").click(function(event)
			{
				$("#fieldUnitSetup").UnitTreeField("clear", false);
				$("#fieldDeptSetup").DeptTreeField("clear", false);
				$("#edtUserTextSetup").val("");

				_This.queryUnAllotUserByParam();
			});

			var gridOption = mc.grid.createInitOption("multi", "page",
			{
				url : "sm/mcroleuser/listunallot",
				pager : "#gridUnAllotUser_pager",
				colModel : [
				{
					name : "userid",
					hidden : true,
					key : true,
				},
				{
					name : "username",
					label : "姓名",
					width : 120
				},
				{
					name : "usercode",
					label : "登录名",
					width : 100
				},
				{
					name : "userstatus",
					label : "状态",
					hidden : true
				},
				{
					name : "userstatus_text",
					label : "状态",
					width : 60,
					align : "center",
					mc_source_col : "userstatus",
					formatter : sm.render.UserStatus
				},
				{
					name : "deptcode",
					label : "部门编码",
					width : 100
				},
				{
					name : "deptname",
					label : "部门名称",
					width : 120
				},
				{
					name : "unitcode",
					label : "公司编码",
					width : 100
				},
				{
					name : "unitname",
					label : "公司名称",
					width : 150
				} ]
			});
			$("#gridUnAllotUser").jqGrid(gridOption);
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
		initData : function(roleData)
		{
			this.roleData = roleData;

			$("#fieldUnitSetup").UnitTreeField("clear", false);
			$("#fieldDeptSetup").DeptTreeField("clear", false);
			$("#edtUserTextSetup").val("");

			this.queryUnAllotUserByParam();
		},
		queryUnAllotUserByParam : function()
		{
			var param =
			{
				roleid : this.roleData.id,
				unitid : $("#fieldUnitSetup").UnitTreeField("id"),
				deptid : $("#fieldDeptSetup").DeptTreeField("id"),
				usertext : $("#edtUserTextSetup").val()
			}

			$("#gridUnAllotUser").setGridParam(
			{
				datatype : "json",
				postData : 
				{
					filter : mc.encode(param)
				}
			}).trigger("reloadGrid");
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			if (! $("#gridUnAllotUser").isSelect())
			{
				mc.msg("请选择要授权的用户");
				return false;
			}

			var usertext = ""
			var arrayUserData = $("#gridUnAllotUser").getData();
			if (arrayUserData.length == 1)
			{
				usertext = "【" + arrayUserData[0].username + "】用户";
			}
			else if (arrayUserData.length > 1 && arrayUserData.length <= 5)
			{
				usertext = "【" + $("#gridUnAllotUser").getAttr("username") + "】共【" + arrayUserData.length + "】位用户";
			}
			else if (arrayUserData.length > 5)
			{
				var username = "";
				for (var i = 0; i < 5; i++)
				{
					if (mc.str.notempty(username))
					{
						username += ", ";
					}
					username += arrayUserData[i].username
				}
				usertext = "【" + username + "……】等【" + arrayUserData.length + "】位用户";
			}

			var msg = "请确认是否把角色【" + this.roleData.name + "】授予选择的" + usertext + "？";

			mc.confirm(msg, $.proxy(function(result)
			{
				if (result)
				{
					this._add(arrayUserData);					
				}
			}, this));
		},
		/**
		 * 保存所有
		 * @return		修改成功返回true；否则返回false 
		 */
		_add : function(arrayUserData)
		{
			var data = [];
			for (var i = 0; i < arrayUserData.length; i++)
			{
				var userData = arrayUserData[i];
				data.push(
				{
					roleid : this.roleData.id,
					userid : userData.userid
				})
			}

			mc.showMask();

			$.ajax(
			{
				url : "sm/mcroleuser/add",
				type : "post",
				data : 
				{
					entity : mc.encode(data)
				},
				success : $.proxy(function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						mc.msg("授权完成");
						this.onYesClickClose();
					}
					else
					{
						mc.alert("授权失败: " + data.msg);
					}
				}, this),
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("授权失败: " + error);
				}
			});
		}
	});
})(jQuery);