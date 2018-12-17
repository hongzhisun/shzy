G_AuthDataStore = new DataStore();

init_Grid = function()
{
	$("#gridAuth").jqGrid(
	{
		treeGrid : true,					/* 树形表格模式开关 */
		/**
		 * ajax请求相关参数
		 */
		url : "sm/auth/list",				/* 取数url */
		mtype : "get",						/* ajax提交方式 */
		postData :							/* 提交参数 */
		{
			moduleid : ""
		},					
		prmNames : mc.grid.prmNames,		/* 避免发送不必要的参数到服务端 */

		/**
		 * 返回格式相关参数
		 */
		datatype : "local",					/* 请求数据格式，初始不加载数据 */
		jsonReader : mc.grid.ExtJsonReader,	/* 返回json数据格式描述 */

		/**
		 * 分页参数
		 */
		rowNum : -1,						/* 初始分页行数。-1表示显示全部数据，取消分页 */

		/**
		 * TreeGrid专用参数设置
		 */
		treedatatype : "local",				/* treeGrid实际请求数据格式，与datatype相同。初始不加载数据 */
		localReader :						/* 本地json数据格式 */
		{
			id : "id"						/* 数据的主键id。如果不设置，默认以"id"属性作为主键id */
		},
		treeReader : 						/* 设置树形显示时4个关键字段对应的返回数据字段  */
		{
			level_field: "level",	  		/* 属性层级 */
			parent_id_field: "parentid", 	/* 父级id属性名 */
			leaf_field: "isleaf2",			/* 是否叶子节点。该字段必须为true/false */
			expanded_field: "expanded" 		/* 是否展开。渲染时时如果找不到字段，默认为false。 */
		},

		/**
		 * 返回后台数据后，但在填充grid之前的预处理事件
		 * 
		 * 由于后台数据来自于已存在的Http API，返回的isLeaf字段值域0/1，而jQGrid接收的类型必须为boolean，因此在前台对数据进行转换。
		 * 如果是新的后台请求，可以在后台处理完成，不用在前台处理。
		 * 
		 * 对于每一个节点的【是否展开参数(expanded)】，从前后端分离角度，应当在前台处理设置
		 */
		beforeProcessing : function(data, status, xhr)
		{
			if (! mc.isArray(data.data))
			{
				return;
			}

			for (var i = 0; i < data.data.length; i++)
			{
				var rowData = data.data[i];
				rowData["isleaf2"] = (rowData["isleaf"] == 1);

				/**
				 * 自动展开
				 */
				if (rowData["level"] <= 1)
				{
					rowData["expanded"] = true;
				}
				else
				{
					rowData["expanded"] = false;
				}
			}

			/**
			 * 树状表格数据处理
			 * 转换leaf、处理自动展开
			 */
			var treeReader = $(this).getGridParam("treeReader");

			G_AuthDataStore.load("id", data.data);
		},
		treeGridModel: "adjacency", /* 数据模式，一般采用adjacecy邻接模式，依靠父子id建立关系。 */
		ExpandColumn : "code",		/* 在【编码】列展现树形结构 */
		ExpandColClick : true,		/* 点击【编码】列数据，即可展开节点。如果设置为false，必须点击前面的图标才能展开 */
		tree_root_level : 1,		/* 根节点level */
	
		/**
		 * jQGrid界面外观相关参数
		 */
		shrinkToFit : false,			/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : false,				/* 不能设置有序号列，否则无法展现树形结构 */
		multiselect : false,			/* 关闭复选模式 */
		cmTemplate :					/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [					/* 列设置 */
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "code",
			label : "编码",
			width : 100
		},
		{
			name : "name",
			label : "名称",
			width : 100
		},
		{
			name : "status",
			label : "状态",
			hidden : true,
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
			name : "menuname",
			label : "菜单",
			width : 100
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
		},
		{
			name : "level",
			label : "级别",
			width : 50,
			align : "right"
		},
		{
			name : "fullcode",
			label : "全编码",
			width : 160
		},
		{
			name : "fullname",
			label : "全名称",
			width : 160
		},
		{
			name : "memo",
			label : "备注",
			width : 200
		} ],
		ondblClickRow : btnUpdateEvent
	});
};

init_Panel = function()
{
	$("#dialogAuthEdit").AuthEditDialog(
	{
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

	$("#module").ModuleTreeField(
	{
		allowClear : false,
		selectCallback : function(id, data, event, ui)
		{
			reloadGrid();
		}
	});

	$("#btnRefresh").click(reloadGrid);

	$("#btnAdd").click(btnAddEvent);

	$("#btnUpdate").click(btnUpdateEvent);

	$("#btnDelete").click(btnDeleteEvent);
};

reloadGrid = function()
{
	if (! $("#module").ModuleTreeField("isSelect"))
	{
		mc.alert("请先选择模块");
		return;
	}

	var moduleid = $("#module").ModuleTreeField("id");

	$("#gridAuth").setGridParam(
	{
		datatype : "json",
		treedatatype : "json",
		postData :
		{
			filter : mc.encode(
			{
				moduleid : moduleid				
			})
		}
	}).trigger("reloadGrid");

	$("#gridAuth").resetSelection();
};

btnAddEvent = function(event)
{
	if (! $("#module").ModuleTreeField("isSelect"))
	{
		mc.alert("请先选择模块");
		return;
	}

	var initData =
	{
		moduleid : $("#module").ModuleTreeField("id"),
		isleaf : 1
	};

	if ($("#gridAuth").isSelect())
	{
		var authID = $("#gridAuth").getId();
		var data = G_AuthDataStore.get(authID);

		initData.parentid = data.id;
		initData.parentcode = data.code;
		initData.parentname = data.name;
		initData.level = data.level + 1;
	}
	else
	{
		initData.parentid = "";
		initData.parentcode = "";
		initData.parentname = "";
		initData.level = 1;
	}

	$("#dialogAuthEdit").AuthEditDialog("initData", "add", initData);
	$("#dialogAuthEdit").AuthEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridAuth").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridAuth").getId();
	var data = G_AuthDataStore.get(selectID);

	$("#dialogAuthEdit").AuthEditDialog("initData", "update", data);
	$("#dialogAuthEdit").AuthEditDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridAuth").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridAuth").getId();
	var data = G_AuthDataStore.get(selectID);

	if (data.internal == 1)
	{
		mc.msg("操作权限【" + data.name + "】是系统内置操作权限，不可删除");
		return;
	}

	mc.confirm("请确认要删除操作权限【" + data.name + "】", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/auth/delete",
			type : "post",
			data : 
			{
				id : selectID
			},
			success : function(data, status)
			{
				mc.hideMask();
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
				mc.hideMask();
				mc.alert("修改失败: " + data.msg);
			}
		});
	})
};

beforeClose = function()
{
	if ($("#dialogAuthEdit").AuthEditDialog("isOpen"))
	{
		mc.alert("请先关闭对话框");
		return false;
	}

	return true;
};

$(function()
{
	init_Grid();

	init_Panel();

	mc.layout.init();
});