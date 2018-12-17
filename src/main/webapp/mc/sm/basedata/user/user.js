G_UserDataStore = new DataStore();
G_DeptTree = null;

/**
 * 
 */
init_UnitDept = function()
{
	$("#fieldUnit").UnitTreeField(
	{
		allowClear : false,
		selectCallback : function(id, data, event, ui)
		{
			G_DeptTree.setting.async.otherParam = 
			{
				jsonCondition : mc.encode(
				{
					unitid : id
				})	
			};
			G_DeptTree.reAsyncChildNodes(null, "refresh");

			queryUserByParam();
		}
	});

	G_DeptTree = mc.tree.createZTree("treeDept", "single", "deptID", "parentID", "deptName", "",
		"sm/dept/list", "data", "部门", 1, false, {});

	G_DeptTree.setting.callback.onClick = function(event, treeId, treeNode, clickFlag)
	{
		queryUserByParam();
	};
};

init_UserGrid = function()
{
	$("#dialogUserEdit").UserEditDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadUserGrid();
			}
		}
	});

	$("#dialogUserLock").UserLockDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadUserGrid();
			}
		}
	});

	$("#dialogUserResetPwd").UserResetPwdDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadUserGrid();
			}
		}
	});

	$("#cmbStatus").UserStatusComboBox(
	{
		selectCallback : function(id, data, event, ui)
		{
			queryUserByParam();
		}
	});

	$("#edtUserText").keypress(inputEnterEvent);
	$("#edtEmployeeNo").keypress(inputEnterEvent);
	function inputEnterEvent(event)
	{
		if(event.keyCode == "13")
		{
			queryUserByParam();
		}
	};

	$("#btnQuery").click(queryUserByParam);
	$("#btnClear").click(function(event)
	{
		$("#edtUserText").val("");
		$("#edtEmployeeNo").val("");
		$("#cmbStatus").UserStatusComboBox("clear", false);

		queryUserByParam();
	});

	var gridOption = mc.grid.createInitOption("multi", "page",
	{
		url : "sm/user/list",
		pager : "#gridUser_pager",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success && mc.isArray(data.data))
			{
				G_UserDataStore.load("userID", data.data);
			}
		},
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
			name : "empolyNo",
			label : "工号",
			width : 100
		},
		{
			name : "tel",
			label : "固定电话",
			width : 100
		},
		{
			name : "mobileTel",
			label : "移动电话",
			width : 100
		},
		{
			name : "email",
			label : "电子邮件",
			width : 100
		},
		{
			name : "memo",
			label : "备注",
			width : 200
		} ],
		ondblClickRow : btnUpdateEvent
	});
	$("#gridUser").jqGrid(gridOption);

	$("#btnAdd").click(btnAddEvent);
	$("#btnUpdate").click(btnUpdateEvent);
	$("#btnDelete").click(btnDeleteEvent);

	$("#btnLock").click(btnLockEvent);
	$("#btnResetPwd").click(btnResetPwdEvent);
	$("#btnSetupRole").click(btnSetupRoleEvent);
	$("#btnViewAuth").click(btnViewAuthEvent);
};

queryUserByParam = function()
{
	var param =
	{
		unitid : $("#fieldUnit").UnitTreeField("id"),
		deptid : G_DeptTree.getId(),
		status : $("#cmbStatus").UserStatusComboBox("id"),
		usertext : $("#edtUserText").val(),
		empolyNo : $("#edtEmployNo").val()
	}
	
	$("#gridUser").setGridParam(
	{
		datatype : "json",
		postData : 
		{
			jsonCondition : mc.encode(param)
		}
	});

	reloadUserGrid(param);
};

reloadUserGrid = function()
{
	$("#gridUser").trigger("reloadGrid");
};

/**
 * 新增
 */
btnAddEvent = function(event)
{
	if (! $("#fieldUnit").UnitTreeField("isSelect"))
	{
		mc.alert("请先选择公司");
		return;
	}

	var initData =
	{
		unitID : $("#fieldUnit").UnitTreeField("id"),
		unitCode : $("#fieldUnit").UnitTreeField("data").unitCode,
		unitName : $("#fieldUnit").UnitTreeField("data").unitName
	};

	if (G_DeptTree.isSelect())
	{
		initData.deptID = G_DeptTree.getId(),
		initData.deptCode = G_DeptTree.getData().deptCode,
		initData.deptName = G_DeptTree.getData().deptName
	}

	$("#dialogUserEdit").UserEditDialog("initData", "add", initData);
	$("#dialogUserEdit").UserEditDialog("open");
};

/**
 * 修改
 */
btnUpdateEvent = function(event)
{
	if (! $("#fieldUnit").UnitTreeField("isSelect"))
	{
		mc.alert("请先选择公司");
		return;
	}

	if (! $("#gridUser").isSelect())
	{
		mc.alert("请先选择要修改的用户");
		return;
	}

	if ($("#gridUser").getCount() > 1)
	{
		mc.alert("一次只能修改一位用户");
		return;
	}

	var userId = $("#gridUser").getId();
	var user = G_UserDataStore.get(userId);

	$("#dialogUserEdit").UserEditDialog("initData", "update", user);
	$("#dialogUserEdit").UserEditDialog("open");
}

/**
 * 删除
 */
btnDeleteEvent = function()
{
	if (! $("#gridUser").isSelect())
	{
		mc.alert("请先选择要删除的用户");
		return;
	}

	if ($("#gridUser").getCount() > 1)
	{
		mc.alert("一次只能删除一位用户");
		return;
	}

	var userId = $("#gridUser").getId();
	var user = G_UserDataStore.get(userId);

	if (user.status != 2)
	{
		mc.alert("用户【" + user.userCode + "/" + user.userName + "】尚未停用/锁定，不能直接删除");
		return;
	}

	mc.confirm("请确认是否删除用户【" + user.userCode + "/" + user.userName + "】？", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/user/delete",
			type : "post",
			data : 
			{
				jsonString : mc.encode(user)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					reloadUserGrid();
					mc.msg("删除成功");
				}
				else
				{
					mc.alert("删除失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("删除失败: " + data.msg);
			}
		});
	});
};

/**
 * 锁定
 */
btnLockEvent = function()
{
	if (! $("#gridUser").isSelect())
	{
		mc.alert("请先选择要锁定的用户");
		return;
	}

	var userArray = $("#gridUser").getData();
	var userIdArray = new Array();
	for (var i = 0; i < userArray.length; i++)
	{
		userIdArray.push(userArray[i].userID);
	}
	var userDataArray = G_UserDataStore.get(userIdArray);

	$("#dialogUserLock").UserLockDialog("initData", userDataArray);
	$("#dialogUserLock").UserLockDialog("open");
};

/**
 * 重置密码
 */
btnResetPwdEvent = function()
{
	if (! $("#gridUser").isSelect())
	{
		mc.alert("请先选择要重置密码的用户");
		return;
	}

	var userArray = $("#gridUser").getData();
	var userIdArray = new Array();
	for (var i = 0; i < userArray.length; i++)
	{
		userIdArray.push(userArray[i].userID);
	}
	var userDataArray = G_UserDataStore.get(userIdArray);

	$("#dialogUserResetPwd").UserResetPwdDialog("initData", userDataArray);
	$("#dialogUserResetPwd").UserResetPwdDialog("open");
};

/**
 * 角色设置
 */
btnSetupRoleEvent = function()
{
};

/**
 * 查看权限
 */
btnViewAuthEvent = function()
{
};

$(function()
{
	init_UnitDept();

	init_UserGrid();

	mc.layout.init();
});