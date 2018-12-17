init_QueryPanel = function()
{
	$("#edtCodeQuery").keypress(inputEnterEvent);
	$("#edtNameQuery").keypress(inputEnterEvent);

	$("#cmbTypeQuery").ComboBox(
	{
		changeCallback : function(index, id, data, id_old, data_old, event, ui)
		{
			reloadGrid();
		}
	});

	$("body").ProvinceEditDialog(
	{
		id : "dialogProvinceEdit",
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				reloadGrid();
			}
		}
	});

	$("#btnQuery").click(reloadGrid);

	$("#btnRestore").click(function(event)
	{
		$("#edtCodeQuery").val("");
		$("#edtNameQuery").val("");
		$("#cmbTypeQuery").ComboBox("clear");
	
		reloadGrid();
	});

	$("#btnAdd").click(btnAddEvent);
	$("#btnUpdate").click(btnUpdateEvent);
	$("#btnDelete").click(btnDeleteEvent);
};

inputEnterEvent = function(event)
{
	if(event.keyCode == "13")
	{
		reloadGrid();
	}
};

btnAddEvent = function(event)
{
	$("body").ProvinceEditDialog("initData", "add");

	$("body").ProvinceEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridProvince").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var data = $("#gridProvince").getData();

	$("body").ProvinceEditDialog("initData", "update", data);
	$("body").ProvinceEditDialog("open");
};

btnDeleteEvent = function(event)
{
	if (! $("#gridProvince").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var data = $("#gridProvince").getData();

	mc.confirm("请确认要删除省份[" + data.name + "]", function(result)
	{
		if (! result)
		{
			return;
		}

		$.ajax(
		{
			url : "demo/province/delete",
			type : "post",
			sync : true,
			data : 
			{
				id : data.id
			},
			success : function(data, status)
			{
				if (data.success)
				{
					reloadGrid();
					mc.msg("删除成功");
				}
				else
				{
					mc.alert("删除失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.alert("修改失败: " + data.msg);
			}
		});
	})
};

init_Grid = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "demo/province/list",
		pager : "#gridProvince_pager",
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			width : 180
		},
		{
			name : "name",
			label : "名称",
			width : 200
		},
		{
			name : "type",
			hidden : true
		},
		{
			name : "type_text",
			label : "类型",
			width : 100,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.type == 0)
				{
					return "省";
				}
				else if (rowObject.type == 1)
				{
					return "自治区";
				}
				else if (rowObject.type == 2)
				{
					return "直辖市";
				}
				else if (rowObject.type == 3)
				{
					return "新疆生产建设兵团";
				}
				else if (rowObject.type == 4)
				{
					return "特别行政区";
				}
				else
				{
					return "";
				}
			}
		} ],
		ondblClickRow : btnUpdateEvent
	});
	$("#gridProvince").jqGrid(gridOption);

	$("#gridProvince").setGridParam(
	{
		datatype : "json"
	}).trigger("reloadGrid");
};

reloadGrid = function()
{
	var filter = 
	{
		code : $("#edtCodeQuery").val(),
		name : $("#edtNameQuery").val(),
		type : $("#cmbTypeQuery").ComboBox("id")
	}

	$("#gridProvince").jqGrid("setGridParam",
	{
		datatype : "json",
		postData :
		{
			filter : mc.encode(filter)
		}
	}).trigger("reloadGrid");
};

$(function()
{
	init_QueryPanel();

	init_Grid();

	mc.layout.init();
});