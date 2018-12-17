G_DeptDataStore = new DataStore();

init_Grid = function()
{
	$("#gridDept").jqGrid(
	{
		treeGrid : true,					/* 树形表格模式开关 */
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",				/* 取数url */
		mtype : "get",						/* ajax提交方式 */
		postData :							/* 提交参数 */
		{
			jsonCondition : mc.encode(
			{
				status : 99
			})
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
			id : "deptID"					/* 数据的主键id。如果不设置，默认以"id"属性作为主键id */
		},
		treeReader : 						/* 设置树形显示时4个关键字段对应的返回数据字段  */
		{
			level_field: "level",	  		/* 属性层级 */
			parent_id_field: "parentID", 	/* 父级id属性名 */
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

			/**
			 * 树状表格数据处理
			 * 转换leaf、处理自动展开
			 */
			var treeReader = $(this).getGridParam("treeReader");
			mc.grid.TreeDataParseLeafLevel(data.data, treeReader, "isLeaf", 1);

			G_DeptDataStore.load("deptID", data.data);
		},
		treeGridModel: "adjacency", /* 数据模式，一般采用adjacecy邻接模式，依靠父子id建立关系。 */
		ExpandColumn : "deptCode",	/* 在【编码】列展现树形结构 */
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
			name : "deptID",
			hidden : true,
			key : true
		},
		{
			name : "deptCode",
			label : "编码",
			width : 180
		},
		{
			name : "deptName",
			label : "名称",
			width : 140
		},
		{
			name : "level",
			label : "级别",
			width : 40,
			align : "right"
		},
		{
			name : "isLeaf",
			label : "末级",
			hidden : true
		},
		{
			name : "isLeaf_text",
			label : "末级",
			width : 60,
			align : "center",
			mc_source_col : "isLeaf",
			formatter : mc.render.YesNo_FocusYes
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
			formatter : mc.render.Status_Color
		},
		{
			name : "address",
			label : "地址",
			width : 100
		},
		{
			name : "tel",
			label : "联系电话",
			width : 100
		},
		{
			name : "email",
			label : "电子邮箱",
			width : 100
		},
		{
			name : "fax",
			label : "传真",
			width : 100
		},
		{
			name : "memo",
			label : "备注",
			width : 100
		},
		{
			name : "fullCode",
			label : "全编码",
			width : 150
		},
		{
			name : "fullName",
			label : "全名称",
			width : 150
		} ],
		ondblClickRow : btnUpdateEvent
	});
};

init_Panel = function()
{
	$("#dialogDeptEdit").DeptEditDialog(
	{
		id : "dept_edit_dialog",
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				reloadDeptGrid();
			}
		}
	});

	$("#fieldUnit").UnitTreeField(
	{
		allowClear : false,
		selectCallback : function(id, data, event, ui)
		{
			reloadDeptGrid();
		}
	});

	$("#btnRefresh").click(reloadDeptGrid);

	$("#btnAdd").click(btnAddEvent);

	$("#btnUpdate").click(btnUpdateEvent);

	$("#btnDelete").click(btnDeleteEvent);
};

reloadDeptGrid = function()
{
	if (! $("#fieldUnit").UnitTreeField("isSelect"))
	{
		mc.alert("请先选择公司");
		return;
	}

	var unitid = $("#fieldUnit").UnitTreeField("id");

	
	$("#gridDept").setGridParam(
	{
		datatype : "json",
		treedatatype : "json",
		postData :
		{
			jsonCondition : mc.encode(
			{
				unitid : unitid,
				status : 99
			})
		}
	}).trigger("reloadGrid");

	$("#gridDept").resetSelection();
};

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
	};

	if ($("#gridDept").isSelect())
	{
		var selectID = $("#gridDept").getId();
		var data = G_DeptDataStore.get(selectID);

		initData.parentID = data.deptID;
		initData.parentCode = data.deptCode;
		initData.parentName = data.deptName;
		initData.level = data.level + 1;
		initData.isLeaf = 1;
	}
	else
	{
		initData.level = 1;
		initData.isLeaf = 1;
	}

	$("#dialogDeptEdit").DeptEditDialog("initData", "add", initData);
	$("#dialogDeptEdit").DeptEditDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridDept").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var deptId = $("#gridDept").getId();
	var dept = G_DeptDataStore.get(deptId);

	$("#dialogDeptEdit").DeptEditDialog("initData", "update", dept);
	$("#dialogDeptEdit").DeptEditDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridDept").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var deptId = $("#gridDept").getId();
	var dept = G_DeptDataStore.get(deptId);

	if (dept.isLeaf != 1)
	{
		mc.alert("部门【" + dept.deptName + "】还拥有下级部门，不能删除");
		return;
	}

	if (dept.status == 1)
	{
		mc.alert("部门【" + dept.deptName + "】还未停用，不能删除");
		return;
	}

	mc.confirm("请确认是否要删除部门【" + dept.deptName + "】？", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/dept/delete",
			type : "post",
			data : 
			{
				jsonString : mc.encode(dept)
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					reloadDeptGrid();
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

beforeClose = function()
{
	if ($("#dialogDeptEdit").DeptEditDialog("isOpen"))
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