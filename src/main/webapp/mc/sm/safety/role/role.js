G_RoleDataStore = new DataStore();

G_RoleModuleTree = null;
G_RoleMenuTree = null;
G_RoleAuthTree = null;

/**
 * 初始化角色表格区域
 */
init_RoleGrid = function()
{
	$("#dialogRoleEdit").RoleEditDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				$("#gridRole").trigger("reloadGrid");
			}
		}
	});

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
	
	$("#btnAddRole").click(btnAddRoleEvent);
	$("#btnUpdateRole").click(btnUpdateRoleEvent);
	$("#btnDeleteRole").click(btnDeleteRoleEvent);

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
		},
		{
			name : "attr1",
			label : "扩展属性1",
			width : 100
		},
		{
			name : "attr2",
			label : "扩展属性2",
			width : 100
		},
		{
			name : "attr3",
			label : "扩展属性3",
			width : 100
		},
		{
			name : "attr4",
			label : "扩展属性4",
			width : 100
		} ],
		onSelectRow : function(rowid, status)
		{
			reloadModuleTree();

			reloadMenuAuthTree();
		},
		ondblClickRow : btnUpdateRoleEvent
	});
	$("#gridRole").jqGrid(gridOption);

	function btnAddRoleEvent(event)
	{
		var initData = {};

		$("#dialogRoleEdit").RoleEditDialog("initData", "add", initData);
		$("#dialogRoleEdit").RoleEditDialog("open");
	};

	function btnUpdateRoleEvent(event)
	{
		if (! $("#gridRole").isSelect())
		{
			mc.alert("请先选择");
			return;
		}

		var roleID = $("#gridRole").getId();
		var data = G_RoleDataStore.get(roleID);

		$("#dialogRoleEdit").RoleEditDialog("initData", "update", data);
		$("#dialogRoleEdit").RoleEditDialog("open");
	};

	function btnDeleteRoleEvent(event)
	{
		if (! $("#gridRole").isSelect())
		{
			mc.alert("请先选择");
			return;
		}

		var roleID = $("#gridRole").getId();
		var data = G_RoleDataStore.get(roleID);

		mc.confirm("请确认要删除角色【" + data.name + "】？<br>一旦删除，已设置的模块、菜单、操作权限等将一同删除。", function(result)
		{
			if (! result)
			{
				return;
			}

			mc.showMask();

			$.ajax(
			{
				url : "sm/mcrole/delete",
				type : "post",
				data : 
				{
					id : roleID
				},
				success : function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						mc.msg("删除成功");

						$("#gridRole").trigger("reloadGrid");
						
						reloadModuleTree();

						reloadMenuAuthTree();
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
		})
	};
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

/**
 * 初始化模块树区域
 */
init_ModuleTree = function()
{
	$("#dialogRoleModuleSetup").RoleModuleSetupDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadModuleTree();

				reloadMenuAuthTree();
			}
		}
	});

	G_RoleModuleTree = mc.tree.createZTree("treeRoleModule", "multi", "id", "parentid", "text", "",
		"sm/mcrolemodule/listfull", "data", "", "all", false, {});

	/**
	 * 全部展开，并打上已选择的勾
	 * 增加显示分配模式
	 */
	G_RoleModuleTree.setting.async.dataFilter = function(treeId, parentNode, responseData)
	{
		if (mc.isArray(responseData.data))
		{
			for (var i = 0; i < responseData.data.length; i++)
			{
				var row = responseData.data[i];
				row.open = true;

				if (mc.str.notempty(row.rolemoduleid))
				{
					row.checked = true;
				}
				else
				{
					row.checked = false;
				}

				updateModuleText(row);
			}
		}

		return responseData.data;
	}
	G_RoleModuleTree.setting.callback.onClick = function(event, treeId, treeNode, clickFlag)
	{
		reloadMenuAuthTree(treeNode);
	};
	/**
	 * 不允许勾选
	 */
	G_RoleModuleTree.setting.callback.beforeCheck = function(treeId, treeNode)
	{
		mc.msg("请点击上方的【设置】按钮关联模块");
		return false;
	};
	/**
	 * 不允许收缩
	 */
	G_RoleModuleTree.setting.callback.beforeCollapse = function(treeId, treeNode)
	{
		return false;
	};

	$("#btnModuleSetup").click(function(event)
	{
		if (! $("#gridRole").isSelect())
		{
			mc.msg("请先选择一个角色");
			return;
		}
		var roleid = $("#gridRole").getId();
		if ($.trim(roleid).length <= 0)
		{
			return;
		}

		$("#dialogRoleModuleSetup").RoleModuleSetupDialog("initData", roleid);
		$("#dialogRoleModuleSetup").RoleModuleSetupDialog("open");
	});

	$("#btnModuleRefresh").click(function(event)
	{
		reloadModuleTree();

		reloadMenuAuthTree();
	});
};

updateModuleText = function(moduleData)
{
	moduleData.text = moduleData.name;
	if (moduleData.menumode === 0)
	{
		moduleData.text += "【菜单▲】";
	}
	else if (moduleData.menumode === 1)
	{
		moduleData.text += "【菜单〇】";
	}

	if (moduleData.authmode === 0)
	{
		moduleData.text += "【权限▲】";
	}
	else if (moduleData.authmode === 1)
	{
		moduleData.text += "【权限〇】";
	}
};

reloadModuleTree = function()
{
	if (! $("#gridRole").isSelect())
	{
		clearModuleTree();
		return;
	}

	var roleid = $("#gridRole").getId();
	if ($.trim(roleid).length <= 0)
	{
		clearModuleTree();
		return;
	}

	G_RoleModuleTree.setting.async.otherParam =
	{
		filter : mc.encode(
		{
			roleid : roleid
		})
	};

	G_RoleModuleTree.reAsyncChildNodes(null, "refresh");
};

clearModuleTree = function()
{
	G_RoleModuleTree.clearAllNodes();
};

getSelectedModuleID = function()
{
	var nodes = G_RoleModuleTree.getSelectedNodes();
	if (nodes.length <= 0)
	{
		return "";
	}

	return nodes[0].id;
};

/**
 * 初始化右侧菜单/权限区域
 */
init_MenuAuthTree = function()
{
	$("#menumode").AllocModeComboBox(
	{
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			$("#tabContainerMenuAuth").TabContainer("changeTab", "tabMenu");

			if (id === "0")
			{
				$("#treeRoleMenu").hide();
			}
			else if (id === "1")
			{
				$("#treeRoleMenu").show();
				G_RoleMenuTree.setting.async.otherParam =
				{
					filter : mc.encode(
					{
						roleid : $("#gridRole").getId(),
						moduleid : getSelectedModuleID()
					})
				};

				G_RoleMenuTree.reAsyncChildNodes(null, "refresh");
			}
		}
	});

	$("#authmode").AllocModeComboBox(
	{
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			$("#tabContainerMenuAuth").TabContainer("changeTab", "tabAuth");

			if (id === "0")
			{
				$("#treeRoleAuth").hide();
			}
			else if (id === "1")
			{
				$("#treeRoleAuth").show();
				G_RoleAuthTree.setting.async.otherParam =
				{
					filter : mc.encode(
					{
						roleid : $("#gridRole").getId(),
						moduleid : getSelectedModuleID()
					})
				};

				G_RoleAuthTree.reAsyncChildNodes(null, "refresh");
			}
		}
	});
	
	$("#btnSaveMenu").click(btnSaveMenuEvent);
	$("#btnRestoreMenu").click(btnRestoreMenuEvent);

	G_RoleMenuTree = mc.tree.createZTree("treeRoleMenu", "multi", "id", "parentid", "name", "",
		"sm/mcrolemenu/listfull", "data", "", "all", false, {});
	G_RoleMenuTree.setting.async.dataFilter = function(treeId, parentNode, responseData)
	{
		if (mc.isArray(responseData.data))
		{
			for (var i = 0; i < responseData.data.length; i++)
			{
				var row = responseData.data[i];
				row.open = true;

				if (mc.str.notempty(row.rolemenuid))
				{
					row.checked = true;
				}
				else
				{
					row.checked = false;
				}
			}					
		}

		return responseData.data;
	}
	G_RoleMenuTree.setting.callback.beforeCollapse = function(treeId, treeNode)
	{
		return false;
	};

	$("#btnSaveAuth").click(btnSaveAuthEvent);
	$("#btnRestoreAuth").click(btnRestoreAuthEvent);

	G_RoleAuthTree = mc.tree.createZTree("treeRoleAuth", "multi", "id", "parentid", "name", "",
		"sm/mcroleauth/listfull", "data", "", "all", false, {});
	G_RoleAuthTree.setting.async.dataFilter = function(treeId, parentNode, responseData)
	{
		if (mc.isArray(responseData.data))
		{
			for (var i = 0; i < responseData.data.length; i++)
			{
				var row = responseData.data[i];
				row.open = true;

				if (mc.str.notempty(row.roleauthid))
				{
					row.checked = true;
				}
				else
				{
					row.checked = false;
				}
			}					
		}

		return responseData.data;
	}
	G_RoleAuthTree.setting.callback.beforeCollapse = function(treeId, treeNode)
	{
		return false;
	};

	/**
	 * 初始只读状态
	 */
	$("#menumode").AllocModeComboBox("clear", false);
	$("#menumode").AllocModeComboBox("disable");
	$("#authmode").AllocModeComboBox("clear", false);
	$("#authmode").AllocModeComboBox("disable");

	$("#btnSaveMenu").prop("disabled", true);
	$("#btnRestoreMenu").prop("disabled", true);
	$("#treeRoleMenu").hide();

	$("#btnSaveAuth").prop("disabled", true);
	$("#btnRestoreAuth").prop("disabled", true);
	$("#treeRoleAuth").hide();
};

reloadMenuAuthTree = function(treeNode)
{
	/**
	 * 获取模块id
	 */
	var moduleid = ""
	if (treeNode == undefined || treeNode == null)
	{
		moduleid = getSelectedModuleID();

		var nodes = G_RoleModuleTree.getSelectedNodes();
		if (nodes.length > 0)
		{
			treeNode = nodes[0];
			moduleid = treeNode.id;		
		}
	}
	else
	{
		moduleid = treeNode.id;		
	}

	if (mc.str.isempty(moduleid))
	{
		$("#menumode").AllocModeComboBox("clear");
		$("#menumode").AllocModeComboBox("disable");
		$("#btnSaveMenu").prop("disabled", true);
		$("#btnRestoreMenu").prop("disabled", true);
		$("#treeRoleMenu").hide();

		clearMenuTree();
		return;
	}

	if (treeNode.menumode === 0)
	{
		$("#menumode").AllocModeComboBox("id", treeNode.menumode);
		$("#menumode").AllocModeComboBox("enable");

		$("#btnSaveMenu").prop("disabled", false);
		$("#btnRestoreMenu").prop("disabled", false);

		$("#treeRoleMenu").hide();
		clearMenuTree();
	}
	else if (treeNode.menumode === 1)
	{
		$("#menumode").AllocModeComboBox("id", treeNode.menumode);
		$("#menumode").AllocModeComboBox("enable");

		$("#btnSaveMenu").prop("disabled", false);
		$("#btnRestoreMenu").prop("disabled", false);

		$("#treeRoleMenu").show();
		G_RoleMenuTree.setting.async.otherParam =
		{
			filter : mc.encode(
			{
				roleid : $("#gridRole").getId(),
				moduleid : moduleid
			})
		};

		G_RoleMenuTree.reAsyncChildNodes(null, "refresh");
	}
	else
	{
		$("#menumode").AllocModeComboBox("clear", false);
		$("#menumode").AllocModeComboBox("disable");
		$("#btnSaveMenu").prop("disabled", true);
		$("#btnRestoreMenu").prop("disabled", true);
		$("#treeRoleMenu").hide();
		clearMenuTree();
	}

	if (mc.str.isempty(moduleid))
	{
		$("#menumode").AllocModeComboBox("clear");
		$("#menumode").AllocModeComboBox("disable");
		$("#btnSaveMenu").prop("disabled", true);
		$("#btnRestoreMenu").prop("disabled", true);
		$("#treeRoleMenu").hide();

		clearMenuTree();
		return;
	}

	if (treeNode.authmode === 0)
	{
		$("#authmode").AllocModeComboBox("id", treeNode.authmode);
		$("#authmode").AllocModeComboBox("enable");

		$("#btnSaveAuth").prop("disabled", false);
		$("#btnRestoreAuth").prop("disabled", false);

		$("#treeRoleAuth").hide();
		clearAuthTree();
	}
	else if (treeNode.authmode === 1)
	{
		$("#authmode").AllocModeComboBox("id", treeNode.authmode);
		$("#authmode").AllocModeComboBox("enable");

		$("#btnSaveAuth").prop("disabled", false);
		$("#btnRestoreAuth").prop("disabled", false);

		$("#treeRoleAuth").show();
		G_RoleAuthTree.setting.async.otherParam =
		{
			filter : mc.encode(
			{
				roleid : $("#gridRole").getId(),
				moduleid : moduleid
			})
		};

		G_RoleAuthTree.reAsyncChildNodes(null, "refresh");
	}
	else
	{
		$("#authmode").AllocModeComboBox("clear", false);
		$("#authmode").AllocModeComboBox("disable");
		$("#btnSaveAuth").prop("disabled", true);
		$("#btnRestoreAuth").prop("disabled", true);
		$("#treeRoleAuth").hide();
		clearAuthTree();
	}
};

clearMenuTree = function()
{
	G_RoleMenuTree.clearAllNodes();
};

btnSaveMenuEvent = function(event)
{
	if (! $("#gridRole").isSelect())
	{
		mc.msg("未选择角色");
		return;
	}
	var roleid = $("#gridRole").getId();
	var moduleid = "";
	var nodeModule = null;
	var nodes = G_RoleModuleTree.getSelectedNodes();
	if (nodes.length > 0)
	{
		nodeModule = nodes[0];
		moduleid = nodeModule.id;
	}
	else
	{
		mc.msg("未选择模块");
		return;
	}

	var data =
	{
		roleid : roleid,
		moduleid : moduleid,
		menumode : $("#menumode").AllocModeComboBox("id"),
		menuid : "",
	};

	if ($("#menumode").AllocModeComboBox("id") == "1")
	{
		if (! G_RoleMenuTree.isSelect())
		{
			mc.alert("部分分配模式下，请先勾选需要分配的菜单再保存");
			return
		}
		data.menuid = G_RoleMenuTree.getId();
	}

	var msg = "请确认是否保存已选择的菜单权限？"
	mc.confirm(msg, function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mcrolemenu/saveall",
			type : "post",
			data : 
			{
				entity : mc.encode(data)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					mc.msg("保存菜单权限完成");
					nodeModule.menumode = parseInt($("#menumode").AllocModeComboBox("id"));
					updateModuleText(nodeModule);

					G_RoleModuleTree.updateNode(nodeModule);
				}
				else
				{
					mc.alert("保存菜单权限失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("保存菜单权限失败: " + error);
			}
		});
	});
};

btnRestoreMenuEvent = function()
{
	mc.confirm("是否放弃修改？", function(result)
	{
		if (! result)
		{
			return;
		}

		G_RoleMenuTree.setting.async.otherParam =
		{
			filter : mc.encode(
			{
				roleid : $("#gridRole").getId(),
				moduleid : getSelectedModuleID()
			})
		};

		G_RoleMenuTree.reAsyncChildNodes(null, "refresh");
	});
};

clearAuthTree = function()
{
	G_RoleAuthTree.clearAllNodes();
};

btnSaveAuthEvent = function(event)
{
	if (! $("#gridRole").isSelect())
	{
		mc.msg("未选择角色");
		return;
	}
	var roleid = $("#gridRole").getId();
	var moduleid = "";
	var nodeModule = null;
	var nodes = G_RoleModuleTree.getSelectedNodes();
	if (nodes.length > 0)
	{
		nodeModule = nodes[0];
		moduleid = nodeModule.id;
	}
	else
	{
		mc.msg("未选择模块");
		return;
	}

	var data =
	{
		roleid : roleid,
		moduleid : moduleid,
		authmode : $("#authmode").AllocModeComboBox("id"),
		authid : "",
	};

	if ($("#authmode").AllocModeComboBox("id") == "1")
	{
		if (! G_RoleAuthTree.isSelect())
		{
			mc.alert("部分分配模式下，请先勾选需要分配的权限再保存");
			return
		}
		data.authid = G_RoleAuthTree.getId();
	}

	var msg = "请确认是否保存已选择的菜单权限？"
	mc.confirm(msg, function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mcroleauth/saveall",
			type : "post",
			data : 
			{
				entity : mc.encode(data)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					mc.msg("保存菜单权限完成");
					nodeModule.authmode = parseInt($("#authmode").AllocModeComboBox("id"));
					updateModuleText(nodeModule);

					G_RoleModuleTree.updateNode(nodeModule);
				}
				else
				{
					mc.alert("保存菜单权限失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("保存菜单权限失败: " + error);
			}
		});
	});
};

btnRestoreAuthEvent = function()
{
	mc.confirm("是否放弃修改？", function(result)
	{
		if (! result)
		{
			return;
		}

		G_RoleAuthTree.setting.async.otherParam =
		{
			filter : mc.encode(
			{
				roleid : $("#gridRole").getId(),
				moduleid : getSelectedModuleID()
			})
		};

		G_RoleAuthTree.reAsyncChildNodes(null, "refresh");
	});
};

$(function()
{
	$("#iconhelp").css("cursor", "pointer");
	var helpmsg = "请将角色关联模块后，再设置模块内的菜单和权限<br>";

	mc.tips(helpmsg, "iconhelp");

	init_RoleGrid();

	init_ModuleTree();

	init_MenuAuthTree();

	mc.layout.init();

	queryRoleByParam();
});