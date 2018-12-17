G_ParamDataStore = new DataStore();
G_CompanyTree = null;

init_CompanyTree = function()
{
	G_CompanyTree = mc.tree.createZTree("treeCompany", "single", "unitID", "parentID", "unitName", "",
		"sm/unit/list", "data", "所有公司", "all", false, {});

	G_CompanyTree.setting.callback.onClick = function(event, treeId, treeNode, clickFlag)
	{
		queryParamByParam();
	};
};

init_QueryPanel = function()
{
	$("#dialogCompanyParamEdit").CompanyParamEditDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				reloadParamGrid();
			}
		}
	});

	$("#fieldModule").ModuleTreeField(
	{
		selectCallback : function(id, data, event, ui)
		{
			queryParamByParam();
		},
		clearCallback : function(id, data, event, ui)
		{
			queryParamByParam();
		}
	});

	$("#cmbStatus").StatusComboBox(
	{
		selectCallback : function(id, data, event, ui)
		{
			queryParamByParam();
		}
	});

	$("#edtParamText").keypress(inputEnterEvent);
	function inputEnterEvent(event)
	{
		if(event.keyCode == "13")
		{
			queryParamByParam();
		}
	};

	$("#btnQuery").click(queryParamByParam);
	$("#btnClear").click(function(event)
	{
		$("#fieldModule").ModuleTreeField("clear", false);
		$("#cmbStatus").StatusComboBox("clear", false);
		$("#edtParamText").val("");

		queryParamByParam();
	});

	$("#btnAdd").click(btnAddEvent);
	$("#btnUpdate").click(btnUpdateEvent);
	$("#btnDelete").click(btnDeleteEvent);
};

btnAddEvent = function(event)
{
	var initData =
	{
		unitid : G_CompanyTree.getId(),
		unitname : G_CompanyTree.getText(),
		moduleid : $("#fieldModule").ModuleTreeField("id"),
		modulename : $("#fieldModule").ModuleTreeField("text")
	};

	$("#dialogCompanyParamEdit").CompanyParamEditDialog("initData", "add", initData);
	$("#dialogCompanyParamEdit").CompanyParamEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridParam").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var id = $("#gridParam").getId();
	var data = G_ParamDataStore.get(id);

	$("#dialogCompanyParamEdit").CompanyParamEditDialog("initData", "update", data);
	$("#dialogCompanyParamEdit").CompanyParamEditDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridParam").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var id = $("#gridParam").getId();
	var data = G_ParamDataStore.get(id);

	mc.confirm("请确认是否要删除公司【" + data.unitname + "】下的参数【" + data.code + "】", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mccompanyparam/delete",
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
					reloadParamGrid();
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
				mc.alert("修改失败: " + data.msg);
			}
		});
	})
};

init_ParamGrid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/mccompanyparam/list",
		pager : "#gridParam_pager",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success && mc.isArray(data.data))
			{
				for (var i = 0; i < data.data.length; i++)
				{
					var row = data.data[i];
					row.complexid = row.compid + "-" + row.code;
				}
				G_ParamDataStore.load("complexid", data.data);
			}
		},
		colModel : [
		{
			name : "complexid",
			key : true,
			hidden : true
		},
		{
			name : "unitcode",
			label : "公司编码",
			width : 100
		},
		{
			name : "unitname",
			label : "公司名称",
			width : 100
		},
		{
			name : "modulename",
			label : "模块",
			width : 120
		},
		{
			name : "code",
			label : "参数键",
			width : 150
		},
		{
			name : "name",
			label : "参数名称",
			width : 200
		},
		{
			name : "value",
			label : "参数值",
			width : 250
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
			name : "memo",
			label : "备注",
			width : 200
		} ],
		ondblClickRow : btnUpdateEvent
	});
	$("#gridParam").jqGrid(gridOption);
};

queryParamByParam = function()
{
	var param =
	{
		unitid : G_CompanyTree.getId(),
		moduleid : $("#fieldModule").ModuleTreeField("id"),
		status : $("#cmbStatus").StatusComboBox("id"),
		text : $("#edtParamText").val()
	}

	$("#gridParam").setGridParam(
	{
		datatype : "json",
		postData : 
		{
			filter : mc.encode(param)
		}
	});

	reloadParamGrid(param);
};

reloadParamGrid = function()
{
	$("#gridParam").trigger("reloadGrid");
};

$(function()
{
	init_CompanyTree();

	init_QueryPanel();

	init_ParamGrid();

	mc.layout.init();

	G_CompanyTree.reAsyncChildNodes(null, "refresh");

	queryParamByParam();
});