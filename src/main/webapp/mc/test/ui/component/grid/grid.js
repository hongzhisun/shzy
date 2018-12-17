var _MaxID = 0;

/**
 * 表格(前台数据，不分页，单选)
 */
initGrid1 = function()
{
	$("#grid1").jqGrid(
	{
		height : 100,
		width : 800,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "id",
			label : "id",
			index : "id",
			width : 50,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			index : "code",
			width : 90
		},
		{
			name : "name",
			label : "名称",
			index : "name",
			width : 100
		},
		/**
		 * “状态”列，依靠formatter和unformat，对标志位的显示内容进行转换
		 * 1=>启用；0=>停用
		 */
		{
			name : "status",
			label : "状态(显示内容转换)",
			index : "status",
			width : 120,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (cellValue == 1)
				{
					return "启用";
				}
				else
				{
					return "停用";
				}
			},
			unformat : function(cellValue, options, rowObject) /* 自定义反向显示格式化 */
			{
				if (cellValue == "启用")
				{
					return 1;
				}
				else
				{
					return 0;
				}
			}
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
		{
			name : "is_checked",
			label : "是否审核",
			index : "is_checked",
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "is_checked_text",
			label : "是否审核(显示内容转换)",
			index : "is_checked_text",
			width : 120,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.is_checked == 1)
				{
					return "是";
				}
				else
				{
					return "否";
				}
			}
		},
		{
			name : "money",
			label : "金额",
			index : "money",
			width : 120,
			align : "right",
			formatter : "currency"	/* 内置的金额格式化显示 */
		} ]
	});

	/**
	 * 隐藏第2列
	 */
	$("#btnGrid1_HideCol").button().click(function()
	{
		$("#grid1").hideCol("name");
	});

	/**
	 * 显示第2列
	 */
	$("#btnGrid1_ShowCol").button().click(function()
	{
		$("#grid1").showCol("name");
	});

	/**
	 * 增加行
	 */
	$("#btnGrid1_AddRow").button().click(function()
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
	$("#btnGrid1_DeleteRow").button().click(function()
	{
		if ($("#grid1").delRowData(2))
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
	$("#btnGrid1_AddRow3").button().click(function()
	{
		for (var i = 0; i < 3; i++)
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

			$("#grid1").addRowData(newRowData.id, newRowData)
		}
	});

	/**
	 * 是否选中
	 */
	$("#btnGrid1_IsSelected").button().click(function()
	{
		var selectID = $("#grid1").getGridParam("selrow");
		var isSelected = (selectID != null);
		mc.alert("选中状态=" + isSelected);
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGrid1_GetSelectID").button().click(function()
	{
		mc.alert("选中行ID=" + $("#grid1").getGridParam("selrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid1_GetSelectData").button().click(function()
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
	$("#btnGrid1_SetRowSelected").button().click(function()
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
	$("#btnGrid1_UpdateRowData").button().click(function()
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

/**
 * 表格(前台数据，不分页，复选)
 */
initGrid2 = function()
{
	$("#grid2").jqGrid(
	{
		height : 100,
		width : 800,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "id",
			label : "id",
			index : "id",
			width : 50,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			index : "code",
			width : 90
		},
		{
			name : "name",
			label : "名称",
			index : "name",
			width : 100
		},
		/**
		 * “状态”列，依靠formatter和unformat，对标志位的显示内容进行转换
		 * 1=>启用；0=>停用
		 */
		{
			name : "status",
			label : "状态(显示内容转换)",
			index : "status",
			width : 120,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (cellValue == 1)
				{
					return "启用";
				}
				else
				{
					return "停用";
				}
			},
			unformat : function(cellValue, options, rowObject) /* 自定义反向显示格式化 */
			{
				if (cellValue == "启用")
				{
					return 1;
				}
				else
				{
					return 0;
				}
			}
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
		{
			name : "is_checked",
			label : "是否审核",
			index : "is_checked",
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "is_checked_text",
			label : "是否审核(显示内容转换)",
			index : "is_checked_text",
			width : 120,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.is_checked == 1)
				{
					return "是";
				}
				else
				{
					return "否";
				}
			}
		},
		{
			name : "money",
			label : "金额",
			index : "money",
			width : 120,
			align : "right",
			formatter : "currency"	/* 内置的金额格式化显示 */
		} ]
	});

	/**
	 * 增加3行数据
	 */
	$("#btnGrid2_AddRow3").button().click(function()
	{
		for (var i = 0; i < 3; i++)
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

			$("#grid2").addRowData(newRowData.id, newRowData)
		}
	});

	/**
	 * 启动时预先加载3行数据
	 */
	$("#btnGrid2_AddRow3").button().click();
	
	/**
	 * 是否选中
	 */
	$("#btnGrid2_IsSelected").button().click(function()
	{
		var arraySelecteID = $("#grid2").getGridParam("selarrrow");
	
		mc.alert("选中状态=" + (arraySelecteID.length > 0));
	});

	/**
	 * 获取选中数量
	 */
	$("#btnGrid2_GetSelectCount").button().click(function()
	{
		var arraySelecteID = $("#grid2").getGridParam("selarrrow");

		mc.alert("选中数量=" + arraySelecteID.length);
	});

	/**
	 * 获取选中行id
	 */
	$("#btnGrid2_GetSelectID").button().click(function()
	{
		mc.alert("选中行ID=" + $("#grid2").getGridParam("selarrrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid2_GetSelectData").button().click(function()
	{
		var arraySelecteID = $("#grid2").getGridParam("selarrrow");
		if (arraySelecteID.length <= 0)
		{
			mc.alert("未选中");
			return;
		}

		var arrayRowData = [];
		for (var i = 0; i < arraySelecteID.length; i++)
		{
			var selectID = arraySelecteID[i];
			arrayRowData.push($("#grid2").getRowData(selectID));
		}

		mc.alert("选中行数据=" + JSON.stringify(arrayRowData));
	});

	/**
	 * 设置行被选中
	 */
	$("#btnGrid2_SetRowSelected").button().click(function()
	{
		/**
		 * 设置全部不选中
		 */
		$("#grid2").resetSelection();

		$("#grid2").setSelection(2);
		$("#grid2").setSelection(3);

		mc.alert("设置id=2、3的行被选中");
	});
};

/**
 * 表格(后台数据，不分页，单选)
 */
initGrid3 = function()
{
	$("#grid3").jqGrid(
	{
		height : 100,
		width : 800,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "unitid",
			label : "公司id",
			index : "unitid",
			width : 50,
			hidden : true,
			key : true,
		},
		{
			name : "unitcode",
			label : "公司编号",
			index : "unitcode",
			width : 120
		},
		{
			name : "unitname",
			label : "公司名称",
			index : "unitname",
			width : 200
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
		{
			name : "status",
			label : "状态",
			index : "status",
			width : 60,
			align : "center",
			hidden : true
		},
		{
			name : "status_text",
			label : "状态",
			index : "status_text",
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
			name : "money",
			label : "金额",
			index : "money",
			width : 120,
			align : "right",
			formatter : "currency"	/* 内置的金额格式化显示 */
		} ],
//		url : "demo/ui/grid/company/list",
		datatype : "json",
		mtype : "GET",
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			rows : null,
			page : null,
			sort : null,
			order : null			
		},
		jsonReader :
		{
			root : "data",
			id : "unitid"
		}
	});

	/**
	 * 重新加载数据
	 */
	$("#btnGrid3_ReloadData").button().click(function()
	{
		$("#grid3").trigger("reloadGrid");
	});
	/**
	 * 是否选中
	 */
	$("#btnGrid3_IsSelected").button().click(function()
	{
		var selectID = $("#grid3").getGridParam("selrow");
		var isSelected = (selectID != null);
		mc.alert("选中状态=" + isSelected);
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGrid3_GetSelectID").button().click(function()
	{
		mc.alert("选中行ID=" + $("#grid3").getGridParam("selrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid3_GetSelectData").button().click(function()
	{
		var selectID = $("#grid3").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("未选中");
			return;
		}

		mc.alert("选中行数据=" + JSON.stringify($("#grid3").getRowData(selectID)));
	});
};

/**
 * 表格(后台数据，分页，复选)
 */
initGrid4 = function()
{
	$("#grid4").jqGrid(
	{
		height : 200,
		width : 1000,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			index : "deptid",
			hidden : true,
			key : true,
		},
		{
			name : "deptcode",
			label : "部门编号",
			index : "deptcode",
			width : 180
		},
		{
			name : "deptname",
			label : "部门名称",
			index : "deptname",
			width : 200
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
		{
			name : "deptstatus",
			label : "状态",
			index : "deptstatus",
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "deptstatus_text",
			label : "状态",
			index : "deptstatus_text",
			width : 60,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.deptstatus == 1)
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
			name : "unitid",
			index : "unitid",
			hidden : true
		},
		{
			name : "unitcode",
			label : "公司编号",
			index : "unitcode",
			width : 120
		},
		{
			name : "unitname",
			label : "公司名称",
			index : "unitname",
			width : 200
		} ],
//		url : "demo/ui/grid/department/list",
		datatype : "json",
		mtype : "get",
		pager : "#grid4_pager",
		rowNum : 20,
		rowList : [ 10, 20, 50 ],
		pagerpos : "left",
		viewrecords : true,
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			sort : null,
			order : null			
		},
		jsonReader :
		{
			root : "data",
			id : "unitid",
			total : "total_page",
			records : "total"
		}
	});

	/**
	 * 重新加载数据
	 */
	$("#btnGrid4_ReloadData").button().click(function()
	{
		$("#grid4").trigger("reloadGrid");
	});

};

/**
 * 表格(后台数据，分页，复选，兼容老格式)
 */
initGrid5 = function()
{
	$("#grid5").jqGrid(
	{
		height : 200,
		width : 1000,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			index : "deptid",
			hidden : true,
			key : true,
		},
		{
			name : "deptcode",
			label : "部门编号",
			index : "deptcode",
			width : 180
		},
		{
			name : "deptname",
			label : "部门名称",
			index : "deptname",
			width : 200
		},
		/**
		 * “是否审核”列，依靠隐藏列和显示列，对标志位的显示内容进行转换
		 * 1=>是；0=>否
		 */
		{
			name : "deptstatus",
			label : "状态",
			index : "deptstatus",
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "deptstatus_text",
			label : "状态",
			index : "deptstatus_text",
			width : 60,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.deptstatus == 1)
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
			name : "unitid",
			index : "unitid",
			hidden : true
		},
		{
			name : "unitcode",
			label : "公司编号",
			index : "unitcode",
			width : 120
		},
		{
			name : "unitname",
			label : "公司名称",
			index : "unitname",
			width : 200
		} ],
		url : "demo/ui/grid/department/list2",
		datatype : "json",
		mtype : "get",
		pager : "#grid5_pager",
		rowNum : 20,
		rowList : [ 10, 20, 50 ],
		pagerpos : "left",
		viewrecords : true,
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			sort : null,
			order : null			
		},
		serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
		jsonReader : mc.grid.ExtJsonReader
	});

	/**
	 * 重新加载数据
	 */
	$("#btnGrid5_ReloadData").button().click(function()
	{
		$("#grid5").trigger("reloadGrid");
	});

};

getGridStart = function()
{
	alert("page=" + $("#grid5").getGridParam("page") + ", rows=" + $("#grid5").getGridParam("rowNum"));

	var page = $("#grid5").getGridParam("page");
	if (! page)
	{
		page = 1;
	}
	var rows = $("#grid5").getGridParam("rowNum");
	if (! rows)
	{
		rows = 20;
	};
	alert(page + "," + rows);
	return (page - 1) * rows;
};
getGridLimit = function()
{
	var rows = $("#grid5").getGridParam("rowNum");
	if (! rows)
	{
		rows = 20;
	};

	return 20;
};

$(function()
{
	initGrid1();

	initGrid2();

	initGrid3();

	initGrid4();

	initGrid5();
});