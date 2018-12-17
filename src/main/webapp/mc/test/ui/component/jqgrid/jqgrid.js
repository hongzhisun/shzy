var _MaxID = 0;

/**
 * 表格(前台数据，不分页，单选)
 */
initTreeGrid = function()
{
	$("#grid1").jqGrid(
	{
		treeGrid : true,
		treeGridModel: 'adjacency', 
		ExpandColumn : "deptCode",
		ExpandColClick : true,
//		url : "sm/dept/list",	/* 取数url */
		url : "demo/ui/grid/tree",
		datatype : "json",		/* 请求数据格式 */
		mtype : "get",			/* ajax提交方式 */
		rowNum : -1,			/* 显示全部数据，取消分页 */
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			rows : null,
			page : null,
			sort : null,
			order : null			
		},
		jsonReader : mc.grid.ExtJsonReader,
        treeReader : 
        {           //设置树形显示时4个关键字段对应的返回数据字段
            level_field: "level",      // 属性层级
            parent_id_field: "parentID", //父级rowid 
            leaf_field: "new_leaf",      //是否还有子级菜单
            expanded_field: "expanded" //是否加载完毕
 //           loaded : "loaded"
        }, 
        tree_root_level : 1,
		height : 350,
		width : 800,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
//		rownumbers : true,		/* 序号列 */	不能有序号列
		cmTemplate :			/* 所有列不允许点击列头 */
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptID",
			label : "部门id",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 120
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 200
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
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
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.status == 1)
				{
					return "启用";
				}
				else
				{
					return "停用";
				}
			}
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
	 * 隐藏第2列
	 */
	$("#btnGrid1_HideCol").click(function()
	{
		$("#grid1").hideCol("name");
	});

	/**
	 * 显示第2列
	 */
	$("#btnGrid1_ShowCol").click(function()
	{
		$("#grid1").showCol("name");
	});

	/**
	 * 增加行
	 */
	$("#btnGrid1_AddRow").click(function()
	{
		_MaxID++;

		var newRowData =
		{
			id : _MaxID,
			code : "新编码_" + _MaxID,
			name : "新名称_" + _MaxID,
			status : 1,
			is_checked : 1,
			money : 44990011
		};

		if (! $("#grid1").addRowData(newRowData.id, newRowData))
		{
			mc.alert("添加失败");
		}
	});
	/**
	 * 删除行
	 */
	$("#btnGrid1_DeleteRow").click(function()
	{
		if ($("#grid1").delRowData(4))
		{
			mc.alert("删除成功");
		}
		else
		{
			mc.alert("删除失败，可能不存在id=2的行");
		}
	});
	/**
	 * 增加3行数据
	 */
	$("#btnGrid1_AddRow3").click(function()
	{
//		for (var i = 0; i < 3; i++)
//		{
//			_MaxID++;
//
//			var newRowData =
//			{
//				id : _MaxID,
//				code : "新编码_" + _MaxID,
//				name : "新名称_" + _MaxID,
//				status : 1,
//				is_checked : 1,
//				money : 44990011
//			};
//
//			$("#grid1").addRowData(newRowData.id, newRowData)
//		}

		var newRowData1 =
		{
			id : "1",
			code : "新编码_1",
			name : "新名称_1",
			status : 1,
			is_checked : 1,
			money : 44990011,
			level : 0,
			parent : null,
			isLeaf : false,
			expanded : true,
			loaded : true
		};
		var newRowData2 =
		{
			id : "2",
			code : "新编码_2",
			name : "新名称_2",
			status : 1,
			is_checked : 1,
			money : 44990011,
			level : 0,
			parent : "1",
			isLeaf : true,
			expanded : false,
			loaded : true
		};
		var newRowData3 =
		{
			id : "3",
			code : "新编码_3",
			name : "新名称_3",
			status : 1,
			is_checked : 1,
			money : 44990011,
			level : 0,
			parent : "1",
			isLeaf : true,
			expanded : false,
			loaded : true
		};
		$("#grid1").addRowData(newRowData1.id, newRowData1);
		$("#grid1").addRowData(newRowData2.id, newRowData2);
		$("#grid1").addRowData(newRowData3.id, newRowData3);
	});

	/**
	 * 是否选中
	 */
	$("#btnGrid1_IsSelected").click(function()
	{
		var selectID = $("#grid1").getGridParam("selrow");
		var isSelected = (selectID != null);
		mc.alert("选中状态=" + isSelected);
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGrid1_GetSelectID").click(function()
	{
		mc.alert("选中行ID=" + $("#grid1").getGridParam("selrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid1_GetSelectData").click(function()
	{
		var selectID = $("#grid1").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("未选中");
			return;
		}

		mc.alert("选中行数据=" + JSON.stringify($("#grid1").getRowData(selectID)));
	});

	/**
	 * 设置行被选中
	 */
	$("#btnGrid1_SetRowSelected").click(function()
	{
		var newSelectedID = "";

		/**
		 * 获取所有行ID
		 */
		var arrayID = $("#grid1").getDataIDs();
		if (arrayID.length <= 0)
		{
			mc.alert("表格无数据");
			return;
		}

		/**
		 * 获取当前选中行ID
		 */
		var selectID = $("#grid1").getGridParam("selrow");
		var isSelected = (selectID != null);
		if (isSelected)
		{
			/**
			 * 如果已选中，则选中下一行
			 */
			var index = arrayID.indexOf(selectID);
			if (index < 0)
			{
				newSelectedID = arrayID[0];
			}
			else
			{
				/**
				 * 已到最后一行则回到第一行
				 */
				if (index + 1 == arrayID.length)
				{
					newSelectedID = arrayID[0];
				}
				else
				{
					newSelectedID = arrayID[index + 1];
				}
			}
		}
		else
		{
			/**
			 * 未选中则选中第一行
			 */
			newSelectedID = arrayID[0];
		}

		$("#grid1").setSelection(newSelectedID);
		mc.alert("设置id=" + newSelectedID + "的行被选中");
	});

	/**
	 * 修改选中行数据
	 */
	$("#btnGrid1_UpdateRowData").click(function()
	{
		$("#grid1").showCol("name");
		/**
		 * 获取当前选中行ID
		 */
		var selectID = $("#grid1").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("未选中");
			return;
		}

		var newRowData =
		{
			money : 667788
		};

		$("#grid1").setRowData(selectID, newRowData);
		mc.alert("已修改金额列");
	});
};

$(function()
{
	initTreeGrid();
});