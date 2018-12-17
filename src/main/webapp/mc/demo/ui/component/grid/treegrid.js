/**
 * 树形表格，加载本地json格式数据
 */
init_TreeGrid1 = function()
{
	$("#treeGrid1").jqGrid(
	{
		treeGrid : true,					/* 树形表格模式开关 */

		/**
		 * 数据格式相关参数
		 */
		datatype : "local",					/* 请求数据格式，local初始不加载数据 */
		jsonReader :						/* 返回json数据格式描述 */
		{
			root : "data"					/* 返回数据入口(array格式) */
		},

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
			leaf_field: "isLeaf2",			/* 是否叶子节点。该字段必须为true/false */
			expanded_field: "expanded" 		/* 是否展开。渲染时时如果找不到字段，默认为false。 */
		},
		treeGridModel: "adjacency", 		/* 数据模式，一般采用adjacecy邻接模式，依靠父子id建立关系。 */
		ExpandColumn : "deptCode",			/* 在【部门编码】列展现树形结构 */
		ExpandColClick : true,				/* 点击【部门编码】列数据，即可展开节点。如果设置为false，必须点击前面的图标才能展开 */
		tree_root_level : 1,				/* 根节点level */
	
		/**
		 * jQGrid界面外观相关参数
		 */
		shrinkToFit : false,				/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : false,					/* 不能设置有序号列，否则无法展现树形结构 */
		multiselect : false,				/* 关闭复选模式 */
		cmTemplate :						/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [						/* 列设置 */
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编码",
			width : 200
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 200
		} ]
	});

    var localJsonData =
    {
    	success : true,
		data : [
		{
			"deptID": "dept-01",
			"deptCode": "TCY",
			"deptName": "天成元科技总公司",
			"level": 1,
			"parentID": "",
			"isLeaf2": false,
			"expanded": true
		},
		{
			"deptID": "dept-01-01",
			"deptCode": "TCY/01ZJL",
			"deptName": "总经理室",
			"level": 2,
			"parentID": "dept-01",
			"isLeaf2": true,
			"expanded": false
		},
		{
			"deptID": "dept-01-02",
			"deptCode": "TCY/02ZHBG",
			"deptName": "综合办公室",
			"level": 2,
			"parentID": "dept-01",
			"isLeaf2": false,
			"expanded": false
		},
		{
			"deptID": "dept-01-02-01",
			"deptCode": "TCY/02ZHBG-A",
			"deptName": "综合办公室A",
			"level": 3,
			"parentID": "dept-01-02",
			"isLeaf2": true,
			"expanded": true
		},
		{
			"deptID": "dept-01-02-02",
			"deptCode": "TCY/02ZHBG-B",
			"deptName": "综合办公室B",
			"level": 3,
			"parentID": "dept-01-02",
			"isLeaf2": true,
			"expanded": false
		},
		{
			"deptID": "dept-01-03",
			"deptCode": "TCY/03CWB",
			"deptName": "财务部",
			"level": 2,
			"parentID": "dept-01",
			"isLeaf2": true,
			"expanded": false
		} ]
    };

	/**
	 * 重新加载数据
	 */
	$("#btnTreeGrid1_ReloadData").click(function()
	{
		mc.alert("加载数据=" + mc.encode(localJsonData));
		$("#treeGrid1")[0].addJSONData(localJsonData.data);
	});

	/**
	 * 隐藏部门名称列
	 */
	$("#btnTreeGrid1_HideCol").click(function()
	{
		$("#treeGrid1").hideCol("deptName");
	});

	/**
	 * 显示部门名称列
	 */
	$("#btnTreeGrid1_ShowCol").click(function()
	{
		$("#treeGrid1").showCol("deptName");
	});

	/**
	 * 是否选中
	 */
	$("#btnTreeGrid1_IsSelected").click(function()
	{
		var selectID = $("#treeGrid1").getGridParam("selrow");
		var isSelected = (selectID != null);
		mc.alert("选中状态=" + isSelected);
	});
	/**
	 * 获取选中行id
	 */
	$("#btnTreeGrid1_GetSelectID").click(function()
	{
		mc.alert("选中行ID=" + $("#treeGrid1").getGridParam("selrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnTreeGrid1_GetSelectData").click(function()
	{
		var selectID = $("#treeGrid1").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("未选中");
			return;
		}

		mc.alert("选中行数据=" + mc.encode($("#treeGrid1").getRowData(selectID)));
	});

	/**
	 * 设置行被选中
	 */
	$("#btnTreeGrid1_SetRowSelected").click(function()
	{
		$("#treeGrid1").setSelection("dept-01-03");
		mc.msg("【TCY/03CWB/财务部】行被选中");
	});

	/**
	 * 修改选中行数据
	 */
	$("#btnTreeGrid1_UpdateRowData").click(function()
	{
		$("#treeGrid1").showCol("name");
		/**
		 * 获取当前选中行ID
		 */
		var selectID = $("#treeGrid1").getGridParam("selrow");
		if (selectID == null)
		{
			mc.msg("未选中");
			return;
		}

		var dept = $("#treeGrid1").getRowData(selectID)

		var updateDeptData =
		{
			deptName : dept.deptName + ",已改名"
		};

		$("#treeGrid1").setRowData(selectID, updateDeptData);
		mc.msg("当前行的部门名称已修改");
	});

	/**
	 * 增加子节点
	 */
	$("#btnTreeGrid1_AddChildNode").click(function()
	{
		var parentid = $("#treeGrid1").getGridParam("selrow");

		var newRowData =
		{
			deptID : mc.newid(),
			deptCode : "新部门-编码",
			deptName : "新名称-名称",
			status : 1,
			is_checked : 1
		};

		$("#treeGrid1").addChildNode(newRowData.deptID, parentid, newRowData)
	});

	/**
	 * 删除当前节点和所有子节点
	 * 此处不能使用$("#treeGrid1").delRowData(id);否则子节点会留下。
	 */
	$("#btnTreeGrid1_DeleteNode").click(function(event)
	{
		var id = $("#treeGrid1").getGridParam("selrow");
		if (id == null)
		{
			mc.alert("请先选择一行");
			return;
		}

		var deptData = $("#treeGrid1").getRowData(id);
		mc.confirm("是否删除所选的【" + deptData.deptCode + "/" + deptData.deptName + "】?", function(result)
		{
			if (result)
			{
				$("#treeGrid1").delTreeNode(id);
				mc.alert("【" + deptData.deptCode + "/" + deptData.deptName + "】及所有子节点已删除");
			}
		})
	});
};

/**
 * 树形表格，加载后台json数据
 */
init_TreeGrid2 = function()
{
	$("#treeGrid2").jqGrid(
	{
		treeGrid : true,				/* 树形表格模式开关 */
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",			/* 取数url */
		mtype : "get",					/* ajax提交方式 */
		postData : {},					/* 提交参数 */
		prmNames :						/* 避免发送不必要的参数到服务端 */
		{
			page : null,				/* 开始页数 */
			rows : null,				/* 开始行数 */
			search : null,				/* 搜索字段参数 */
			nd : null,					/* 已发送请求次数的参数 */
			sort : null,				/* 排序字段参数 */
			order : null				/* 排序方式参数 */
		},

		/**
		 * 返回格式相关参数
		 */
		datatype : "local",					/* 请求数据格式，初始不加载数据 */
		jsonReader :						/* 返回json数据格式描述 */
		{
			root : "data",					/* 返回数据入口(array格式) */
		},
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
			leaf_field: "isLeaf2",	  		/* 是否叶子节点。该字段必须为boolean类型(true/false)数值 */
			expanded_field: "expanded" 		/* 是否展开(boolean类型数值)。如果未定义该字段，默认为false。 */
		}, 
		/**
		 * 返回后台数据后，但在填充grid之前的预处理事件
		 * 
		 * 由于后台数据来自于已有的Http API，返回的isLeaf字段值域0/1，而jQGrid接收的类型必须为boolean，因此在前台对数据进行转换。
		 * 如果是与页面同步开发的后台请求，可以在后台处理完成，不用在前台处理。
		 * 
		 * 对于每一个节点的【是否展开参数(expanded)】，从前后端分离角度，应当在前台处理设置
		 */
		beforeProcessing : function(data, status, xhr)
		{
			if (! mc.isArray(data.data))
			{
				return;
			}

			var treeReader = $(this).getGridParam("treeReader");
			for (var i = 0; i < data.data.length; i++)
			{
				var rowData = data.data[i];
				rowData[treeReader.leaf_field] = (rowData.isLeaf == 1);
				/**
				 * 只展开第1级
				 */
				if (rowData.level <= 1)
				{
					rowData[treeReader.expanded_field] = true;
				}
				else
				{
					rowData[treeReader.expanded_field] = false;
				}
			}
		},
		treeGridModel: "adjacency", 	/* 数据模式，一般采用adjacecy邻接模式，依靠父子id建立关系。 */
		ExpandColumn : "deptCode",		/* 在【部门编码】列展现树形结构 */
		ExpandColClick : true,			/* 点击【部门编码】列数据，即可展开节点。如果设置为false，必须点击前面的图标才能展开 */
		tree_root_level : 1,			/* 根节点level */

		/**
		 * jQGrid界面外观相关参数
		 */
		height : 250,					/* 表格默认高度 */
		width : 800,					/* 表格默认宽度 */
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
			label : "部门id",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 250
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 150
		},
		{
			name : "status",
			label : "状态",
			width : 60,
			align : "center",
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
			name : "fullCode",
			label : "全编号",
			width : 120
		},
		{
			name : "fullName",
			label : "全名称",
			width : 120
		},
		{
			name : "parentCode",
			label : "上级部门编号",
			width : 120
		},
		{
			name : "parentName",
			label : "上级部门名称",
			width : 120
		},
		{
			name : "memo",
			label : "备注",
			width : 120
		},
		{
			name : "address",
			label : "地址",
			width : 120
		},		
		{
			name : "unitCode",
			label : "公司编号",
			width : 120
		},
		{
			name : "unitName",
			label : "公司名称",
			width : 200
		} ]
	});

	/**
	 * 重新加载数据
	 */
	$("#btnTreeGrid2_ReloadData").click(function()
	{
		$("#treeGrid2").setGridParam(
		{
			datatype : "json",
			treedatatype : "json",
			postData : 
			{
				myParam : 11
			}
		}).trigger("reloadGrid");
	});

	/**
	 * 是否选中
	 */
	$("#btnTreeGrid2_IsSelected").click(function()
	{
		mc.alert("选中状态=" + $("#treeGrid2").isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnTreeGrid2_GetSelectID").click(function()
	{
		mc.alert("选中行ID=" + $("#treeGrid2").getId());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnTreeGrid2_GetSelectData").click(function()
	{
		mc.alert("选中行数据=" + mc.encode($("#treeGrid2").getData()));
	});
	/**
	 * 获取选中行名称
	 */
	$("#btnTreeGrid2_GetSelectName").click(function()
	{
		mc.alert("选中部门名称=" + mc.encode($("#treeGrid2").getAttr("deptName")));
	});
};

$(function()
{
	init_TreeGrid1();

	init_TreeGrid2();

	mc.layout.init();
});