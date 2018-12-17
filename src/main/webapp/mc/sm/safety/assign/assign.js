G_RoleDataStore = new DataStore();
G_RoleUserDataStore = new DataStore();

init_RoleGrid = function()
{
	$("#edtRoleText").keypress(inputEnterEvent);
	function inputEnterEvent(event)
	{
		if(event.keyCode == "13")
		{
			queryRoleByParam();
		}
	};

	$("#btnRoleQuery").click(queryRoleByParam);
	$("#btnRoleClear").click(function(event)
	{
		$("#edtRoleText").val("");

		queryRoleByParam();
	});

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/mcrole/list",
		pager : "#gridRole_pager",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_RoleDataStore.load("id", data.data);
			}
		},
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			width : 120
		},
		{
			name : "name",
			label : "名称",
			width : 150
		},
		{
			name : "status",
			label : "状态",
			hidden : true
		},
		{
			name : "status_text",
			label : "状态",
			width : 60,
			align : "center",
			mc_source_col : "status",
			formatter : mc.render.Status
		} ],
		onSelectRow : queryUserByParam,
		ondblClickRow : btnAddRoleUserEvent
	});
	$("#gridRole").jqGrid(gridOption);
};

queryRoleByParam = function()
{
	var param =
	{
		text : $("#edtRoleText").val()
	}

	$("#gridRole").setGridParam(
	{
		datatype : "json",
		postData : 
		{
			filter : mc.encode(param)
		}
	});

	reloadRoleGrid();
};

reloadRoleGrid = function()
{
	$("#gridRole").trigger("reloadGrid");
};

init_UserGrid = function()
{
	$("#dialogRoleUserSetup").RoleUserSetupDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadUserGrid();
			}
		}
	});

	$("#fieldUnit").UnitTreeField(
	{
		changeCallback : function(id, text, data, event, ui)
		{
			$("#fieldDept").DeptTreeField("clear");
			queryUserByParam();
		},
		clearCallback : function()
		{
			$("#fieldDept").DeptTreeField("clear");
			queryUserByParam();
		}
	});

	$("#fieldDept").DeptTreeField(
	{
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnit").UnitTreeField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			var param =
			{
				unitid : $("#fieldUnit").UnitTreeField("id")
			};

			return param;
		},
		changeCallback : function(id, text, data, event, ui)
		{
			queryUserByParam();
		},
		clearCallback : function()
		{
			queryUserByParam();
		}
	});

	$("#edtUserText").keypress(inputEnterEvent);
	function inputEnterEvent(event)
	{
		if(event.keyCode == "13")
		{
			queryUserByParam();
		}
	};

	$("#btnUserQuery").click(function(event)
	{
		if (! $("#gridRole").isSelect())
		{
			mc.msg("请先选择角色");
			return;
		}

		queryUserByParam();			
	});

	$("#btnUserClear").click(function(event)
	{
		$("#fieldUnit").UnitTreeField("clear", false);
		$("#fieldDept").DeptTreeField("clear", false);
		$("#edtUserText").val("");

		queryUserByParam();
	});

	$("#btnAddRoleUser").click(btnAddRoleUserEvent);
	$("#btnDeleteRoleUser").click(btnDeleteRoleUserEvent);

	var gridOption = mc.grid.createInitOption("multi", "page",
	{
		url : "sm/mcroleuser/list",
		pager : "#gridUser_pager",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_RoleUserDataStore.load("userid", data.data);
			}
		},
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "roleid",
			hidden : true
		},
		{
			name : "userid",
			hidden : true
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
			width : 150
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
	$("#gridUser").jqGrid(gridOption);
};

queryUserByParam = function()
{
	var param =
	{
		roleid : $("#gridRole").getId(),
		unitid : $("#fieldUnit").UnitTreeField("id"),
		deptid : $("#fieldDept").DeptTreeField("id"),
		usertext : $("#edtUserText").val()
	}

	$("#gridUser").setGridParam(
	{
		datatype : "json",
		postData : 
		{
			filter : mc.encode(param)
		}
	});

	reloadUserGrid();
};

reloadUserGrid = function()
{
	$("#gridUser").trigger("reloadGrid");
};

btnAddRoleUserEvent = function(event)
{
	if (! $("#gridRole").isSelect())
	{
		mc.msg("请先选择角色");
		return;
	}

	var roleid = $("#gridRole").getId();
	if ($.trim(roleid).length <= 0)
	{
		return;
	}

	$("#dialogRoleUserSetup").RoleUserSetupDialog("initData", $("#gridRole").getData());
	$("#dialogRoleUserSetup").RoleUserSetupDialog("open");
};

btnDeleteRoleUserEvent = function(event)
{
	if (! $("#gridUser").isSelect())
	{
		mc.msg("请先勾选已授权的用户");
		return;
	}

	var arrayRoleUserData = $("#gridUser").getData();

	if (arrayRoleUserData.length == 1)
	{
		usertext = "【" + arrayRoleUserData[0].username + "】用户";
	}
	else if (arrayRoleUserData.length > 1 && arrayRoleUserData.length <= 5)
	{
		usertext = "【" + $("#gridUser").getAttr("username") + "】共【" + arrayRoleUserData.length + "】位用户";
	}
	else if (arrayRoleUserData.length > 5)
	{
		var username = "";
		for (var i = 0; i < 5; i++)
		{
			if (mc.str.notempty(username))
			{
				username += ", ";
			}
			username += arrayRoleUserData[i].username
		}
		usertext = "【" + username + "……】等【" + arrayRoleUserData.length + "】位用户";
	}

	var msg = "请确认是否对已勾选的" + usertext + "，取消角色【" + $("#gridRole").getAttr("name") + "】的授权？";

	mc.confirm(msg, function(result)
	{
		if (! result)
		{
			return;
		}

		var param = [];
		for (var i = 0; i < arrayRoleUserData.length; i++)
		{
			var roleUserData = arrayRoleUserData[i]; 
			var row =
			{
				roleid : roleUserData.roleid,
				userid : roleUserData.userid
			}
			param.push(row);
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mcroleuser/delete",
			type : "post",
			data : 
			{
				entity : mc.encode(param)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					mc.msg("取消授权成功");
					queryUserByParam();
				}
				else
				{
					mc.alert("取消授权失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("取消授权失败: " + data.msg);
			}
		});
	})
};

$(function()
{
	init_RoleGrid();

	init_UserGrid();

	mc.layout.init();

	queryRoleByParam();
});