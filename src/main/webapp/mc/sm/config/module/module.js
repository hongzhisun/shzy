G_ModuleDataStore = new DataStore();

init_Grid = function()
{
	$("#gridModule").jqGrid(
	{
		treeGrid : true,					/* 树形表格模式开关 */
		/**
		 * ajax请求相关参数
		 */
		url : "sm/mcmodule/tree",			/* 取数url */
		mtype : "get",						/* ajax提交方式 */
		postData : {},						/* 提交参数 */
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
			if (! $.isArray(data.data))
			{
				return;
			}

			/**
			 * 树状表格数据处理
			 * 转换leaf、处理自动展开
			 */
			var treeReader = $("#gridModule").getGridParam("treeReader");
			var resultArray = mc.grid.TreeDataParse(data.data, treeReader, "isleaf", 1);

			G_ModuleDataStore.load("id", resultArray);

			data.data.splice(0, data.data.length);
			for (var i = 0; i < resultArray.length; i++)
			{
				data.data.push(resultArray[i]);
			}
		},
		treeGridModel: "adjacency", 	/* 数据模式，一般采用adjacecy邻接模式，依靠父子id建立关系。 */
		ExpandColumn : "code",			/* 在【编码】列展现树形结构 */
		ExpandColClick : true,			/* 点击【编码】列数据，即可展开节点。如果设置为false，必须点击前面的图标才能展开 */
		tree_root_level : 1,			/* 根节点level */

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
			width : 200
		},
		{
			name : "name",
			label : "名称",
			width : 100
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
			name : "order",
			label : "显示顺序",
			width : 50,
			align : "right"
		},
		{
			name : "internal",
			label : "是否系统内置",
			hidden : true
		},
		{
			name : "internal_text",
			label : "是否系统内置",
			width : 80,
			align : "center",
			mc_source_col : "internal",
			formatter : sm.render.Internal_FocusInternal
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
			name : "level",
			label : "级别",
			width : 50,
			align : "right"
		},
		{
			name : "pageurl",
			label : "页面URL",
			width : 180
		},
		{
			name : "tip",
			label : "提示",
			width : 80
		},
		{
			name : "iconid",
			label : "图标Id",
			width : 60
		},
		{
			name : "fullcode",
			label : "全编码",
			width : 150
		},
		{
			name : "fullname",
			label : "全名称",
			width : 150
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
	$("#dialogModuleEdit").ModuleEditDialog(
	{
		id : "module_edit_dialog",
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

	$("#btnAdd").click(btnAddEvent);

	$("#btnUpdate").click(btnUpdateEvent);

	$("#btnDelete").click(btnDeleteEvent);
};

reloadGrid = function()
{
	$("#gridModule").setGridParam(
	{
		datatype : "json",
		treedatatype : "json",
		postData : {}
	}).trigger("reloadGrid");

	$("#gridModule").resetSelection();
};

btnAddEvent = function(event)
{
	var initData =
	{
		/**
		 * to-do临时设置为1，等菜单套完成后再处理
		 */
		menusetid : 1,
		internal : 0,
		pagetype : 0,
		layout : 0,
		isleaf : 1
	};

	if ($("#gridModule").isSelect())
	{
		var selectID = $("#gridModule").getId();
		var data = G_ModuleDataStore.get(selectID);
		if (data.level >= 2)
		{
			mc.alert("只能设置2级，不能新增第三级");
			return;
		}
		
		initData.parentid = data.id;
		initData.parentcode = data.code;
		initData.parentname = data.name;
		initData.level = data.level + 1;
	}
	else
	{
		initData.level = 1;
	}

	$("#dialogModuleEdit").ModuleEditDialog("initData", "add", initData);
	$("#dialogModuleEdit").ModuleEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridModule").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridModule").getId();
	var data = G_ModuleDataStore.get(selectID);

	$("#dialogModuleEdit").ModuleEditDialog("initData", "update", data);
	$("#dialogModuleEdit").ModuleEditDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridModule").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridModule").getId();
	var data = G_ModuleDataStore.get(selectID);

	if (data.internal == 1)
	{
		mc.msg("模块【" + data.name + "】是系统内置模块，不可删除");
		return;
	}
	
	mc.confirm("请确认是否要删除模块【" + data.name + "】？", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/mcmodule/delete",
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
				mc.alert("删除失败: " + data.msg);
			}
		});
	})
};

beforeClose = function()
{
	if ($("#dialogModuleEdit").ModuleEditDialog("isOpen"))
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

	reloadGrid();
});