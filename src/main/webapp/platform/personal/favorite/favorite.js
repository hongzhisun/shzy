G_DataStore = new DataStore();

init_Grid = function()
{
	var gridOption = mc.grid.createInitOption("single", "all",
	{
		url : "sm/favorite/list",	/* 取数url */
		beforeProcessing : function(data, status, xhr)
		{
			if (data.success)
			{
				G_DataStore.load("id", data.data);
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
			width : 180,
			hidden : true
		},
		{
			name : "name",
			label : "显示名称",
			width : 200
		},
		{
			name : "tip",
			label : "提示",
			width : 150
		},
		{
			name : "order",
			label : "显示顺序",
			width : 50,
			align : "right"
		},
		{
			name : "hidden",
			label : "是否隐藏",
			hidden : true
		},
		{
			name : "hidden_text",
			label : "是否隐藏",
			width : 60,
			align : "center",
			mc_source_col : "hidden",
			formatter : sm.render.Hidden_RedHidden
		},
		{
			name : "modulename",
			label : "模块",
			width : 120
		},
		{
			name : "menuname",
			label : "菜单",
			width : 200
		} ],
		ondblClickRow : btnUpdateEvent
	});
	$("#gridFavorite").jqGrid(gridOption);

	reloadGrid();
};

init_ToolBar = function()
{
	$("body").FavoriteEditDialog(
	{
		id : "dialogFavoriteEdit",
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

	$("#btnRefresh").click(reloadGrid);

	$("#btnUpdate").click(btnUpdateEvent);
	$("#btnDelete").click(btnDeleteEvent);

	$("#btnTop").click(btnTopEvent);
	$("#btnUp").click(btnUpEvent);
	$("#btnDown").click(btnDownEvent);
	$("#btnBottom").click(btnBottomEvent);
};

reloadGrid = function()
{
	var param =
	{
		userid : $("#session_userid").val()	
	};

	$("#gridFavorite").jqGrid("setGridParam",
	{
		datatype : "json",
		postData :
		{
			filter : mc.encode(param)
		}
	}).trigger("reloadGrid");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridFavorite").getId();
	var data = G_DataStore.get(id);

	$("body").FavoriteEditDialog("initData", "update", data);
	$("body").FavoriteEditDialog("open");
};

btnDeleteEvent = function(event)
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var id = $("#gridFavorite").getId();
	var data = G_DataStore.get(id);

	mc.confirm("请确认要删除【" + data.name + "】", function(result)
	{
		if (! result)
		{
			return;
		}

		$.ajax(
		{
			url : "sm/favorite/delete",
			type : "post",
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
	});
};

btnTopEvent = function()
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var selectID = $("#gridFavorite").getId();
	var recordData = G_DataStore.get(selectID);

	var index = G_DataStore.getIndexByKey(selectID);
	if (index <= 0)
	{
		return;
	}

	G_DataStore.getData().splice(index, 1);
	G_DataStore.getData().unshift(recordData);

	updateIndexAndGridData(selectID);

	postOrder();	
};

/**
 * 更新序号并更新Grid数据
 */
updateIndexAndGridData = function(selectID)
{
	for (var i = 0; i < G_DataStore.getData().length; i++)
	{
		var row = G_DataStore.getData()[i];
		row.order = i + 1;
	}

	$("#gridFavorite").clearGridData();
	$("#gridFavorite")[0].addJSONData(G_DataStore.getData());
	$("#gridFavorite").setSelection(selectID);
};

/**
 * 更新后台数据
 */
postOrder = function()
{
	var postData = new Array();
	for (var i = 0; i < G_DataStore.getData().length; i++)
	{
		var row = G_DataStore.getData()[i];
		postData.push(
		{
			id : row.id,
			order : row.order
		});
	}

	$.ajax(
	{
		url : "sm/favorite/updateorder",
		type : "post",
		data : 
		{
			entity : mc.encode(postData)
		},
		success : function(data, status)
		{
			if (data.success)
			{
				result = true;
			}
			else
			{
				mc.msg("更新显示顺序失败 ");
			}
		},
		error : function(request, error, ex)
		{
			mc.msg("更新显示顺序失败");
		}
	});
};

btnUpEvent = function()
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var selectID = $("#gridFavorite").getId();
	var recordData = G_DataStore.get(selectID);

	var index = G_DataStore.getIndexByKey(selectID);
	if (index <= 0)
	{
		return;
	}

	G_DataStore.getData().splice(index, 1);
	G_DataStore.getData().splice(index - 1, 0, recordData);

	updateIndexAndGridData(selectID);

	postOrder();
};

btnDownEvent = function()
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var selectID = $("#gridFavorite").getId();
	var recordData = G_DataStore.get(selectID);

	var index = G_DataStore.getIndexByKey(selectID);
	if (index >= G_DataStore.getData().length - 1)
	{
		return;
	}

	G_DataStore.getData().splice(index, 1);
	G_DataStore.getData().splice(index + 1, 0, recordData);
	
	updateIndexAndGridData(selectID);

	postOrder();
};

btnBottomEvent = function()
{
	if (! $("#gridFavorite").isSelect())
	{
		mc.msg("请先选择");
		return;
	}

	var selectID = $("#gridFavorite").getId();
	var recordData = G_DataStore.get(selectID);

	var index = G_DataStore.getIndexByKey(selectID);
	if (index >= G_DataStore.getData().length - 1)
	{
		return;
	}

	G_DataStore.getData().splice(index, 1);
	G_DataStore.getData().push(recordData);

	updateIndexAndGridData(selectID);

	postOrder();
};

$(function()
{
	init_ToolBar();

	init_Grid();

	mc.layout.init();
});