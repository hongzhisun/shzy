G_ParamDataStore = new DataStore();

init_QueryPanel = function()
{
	$("#dialogGlobalParamEdit").GlobalParamEditDialog(
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
		moduleid : $("#fieldModule").ModuleTreeField("id"),
		modulename : $("#fieldModule").ModuleTreeField("text")
	};

	$("#dialogGlobalParamEdit").GlobalParamEditDialog("initData", "add", initData);
	$("#dialogGlobalParamEdit").GlobalParamEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridParam").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var paramCode = $("#gridParam").getId();
	var data = G_ParamDataStore.get(paramCode);

	$("#dialogGlobalParamEdit").GlobalParamEditDialog("initData", "update", data);
	$("#dialogGlobalParamEdit").GlobalParamEditDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridParam").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var paramCode = $("#gridParam").getId();
	var data = G_ParamDataStore.get(paramCode);

	mc.confirm("请确认是否要删除全局参数【" + data.code + "】", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mcglobalparam/delete",
			type : "post",
			data : 
			{
				id : paramCode
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
		url : "sm/mcglobalparam/list",
		pager : "#gridParam_pager",
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success && mc.isArray(data.data))
			{
				G_ParamDataStore.load("code", data.data);
			}
		},
		colModel : [
		{
			name : "modulename",
			label : "模块",
			width : 120
		},
		{
			name : "code",
			key : true,
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
	init_QueryPanel();

	init_ParamGrid();

	mc.layout.init();

	queryParamByParam();
});