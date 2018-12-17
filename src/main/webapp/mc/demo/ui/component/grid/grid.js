var _MaxID = 0;

/**
 * 二、表格(前台数据，不分页，单选)
 */
init_Grid1 = function()
{
	$("#grid1").jqGrid(
	{
		datatype : "local",		/* 请求数据格式，local表示本地数据 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : false,	/* 关闭复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
		{
			name : "id",
			label : "id",
			width : 50,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			width : 90
		},
		{
			name : "name",
			label : "名称",
			width : 100
		},
		/**
		 * “状态”列，依靠formatter和unformat，对标志位的显示内容进行转换
		 * 1=>启用；0=>停用
		 */
		{
			name : "status",
			label : "状态(显示内容转换)",
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
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "is_checked_text",
			label : "是否审核(显示内容转换)",
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
			width : 120,
			align : "right",
			formatter : "currency"	/* 内置的金额格式化显示 */
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
	 * 选中行
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
	 * 清除选中行
	 */
	$("#btnGrid1_ResetSelected").click(function()
	{
		$("#grid1").resetSelection();
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

/**
 * 四、表格(前台数据，不分页，复选)
 */
init_Grid2 = function()
{
	$("#grid2").jqGrid(
	{
		datatype : "local",		/* 请求数据格式，local表示本地数据 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
		{
			name : "id",
			label : "id",
			width : 50,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			width : 90
		},
		{
			name : "name",
			label : "名称",
			width : 100
		},
		/**
		 * “状态”列，依靠formatter和unformat，对标志位的显示内容进行转换
		 * 1=>启用；0=>停用
		 */
		{
			name : "status",
			label : "状态(显示内容转换)",
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
			width : 80,
			align : "center",
			hidden : true
		},
		{
			name : "is_checked_text",
			label : "是否审核(显示内容转换)",
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
			width : 120,
			align : "right",
			formatter : "currency"	/* 内置的金额格式化显示 */
		} ]
	});

	/**
	 * 增加3行数据
	 */
	$("#btnGrid2_AddRow3").click(function()
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
	$("#btnGrid2_AddRow3").click();
	
	/**
	 * 是否选中
	 */
	$("#btnGrid2_IsSelected").click(function()
	{
		var arraySelecteID = $("#grid2").getGridParam("selarrrow");
	
		mc.alert("选中状态=" + (arraySelecteID.length > 0));
	});

	/**
	 * 获取选中数量
	 */
	$("#btnGrid2_GetSelectCount").click(function()
	{
		var arraySelecteID = $("#grid2").getGridParam("selarrrow");

		mc.alert("选中数量=" + arraySelecteID.length);
	});

	/**
	 * 获取选中行id
	 */
	$("#btnGrid2_GetSelectID").click(function()
	{
		mc.alert("选中行ID=" + $("#grid2").getGridParam("selarrrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid2_GetSelectData").click(function()
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
	 * 选中行
	 */
	$("#btnGrid2_SetRowSelected").click(function()
	{
		/**
		 * 设置全部不选中
		 */
		$("#grid2").resetSelection();

		$("#grid2").setSelection(2);
		$("#grid2").setSelection(3);

		mc.alert("设置id=2、3的行被选中");
	});

	/**
	 * 清除选中行
	 */
	$("#btnGrid2_ResetSelected").click(function()
	{
		$("#grid2").resetSelection();
	});
};

/**
 * 五、表格(后台数据，不分页，单选)
 */
init_Grid3 = function()
{
	$("#grid3").jqGrid(
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		mtype : "get",			/* ajax提交方式 */
		postData : {},			/* 提交参数(本例中无参数) */
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			page : null,		/* 开始页数 */
			rows : null,		/* 开始行数 */
			search : null,		/* 搜索字段参数 */
			nd : null,			/* 已发送请求次数的参数 */
			sort : null,		/* 排序字段参数 */
			order : null		/* 排序方式参数 */
		},

		/**
		 * 返回格式相关参数
		 */
		datatype : "json",		/* 返回数据格式 */
		jsonReader :			/* 返回json数据 */
		{
			root : "data"		/* 返回数据入口(array格式) */
		},
		/**
		 * 分页参数
		 */
		rowNum : -1,			/* 初始分页行数。-1表示显示全部数据，取消分页 */
		/**
		 * jQGrid界面外观相关参数
		 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : false,	/* 关闭复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
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
		} ]
	});

	/**
	 * 加载数据
	 */
	$("#btnGrid3_ReloadData").click(function()
	{
		$("#grid3").trigger("reloadGrid");
	});
	/**
	 * 是否选中
	 */
	$("#btnGrid3_IsSelected").click(function()
	{
		var selectID = $("#grid3").getGridParam("selrow");
		var isSelected = (selectID != null);
		mc.alert("选中状态=" + isSelected);
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGrid3_GetSelectID").click(function()
	{
		mc.alert("选中行ID=" + $("#grid3").getGridParam("selrow"));
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGrid3_GetSelectData").click(function()
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
 * 六、后台数据延迟加载
 */
init_Grid4 = function()
{
	$("#grid4").jqGrid(
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		mtype : "get",			/* ajax提交方式 */
		postData : {},			/* 提交参数(本例中无参数) */
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			page : null,		/* 开始页数 */
			rows : null,		/* 开始行数 */
			search : null,		/* 搜索字段参数 */
			nd : null,			/* 已发送请求次数的参数 */
			sort : null,		/* 排序字段参数 */
			order : null		/* 排序方式参数 */
		},

		/**
		 * 返回格式相关参数
		 */
		datatype : "local",		/* 返回数据格式（初始不从后台加载数据，后续加载需要通过setGridParam设置为json）*/
		jsonReader :			/* 返回json数据格式描述 */
		{
			root : "data"		/* 返回数据入口(array格式) */
		},
		/**
		 * 分页参数
		 */
		rowNum : -1,			/* 初始分页行数。-1表示显示全部数据，取消分页 */
		/**
		 * jQGrid界面外观相关参数
		 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : false,	/* 关闭复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
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
		} ]
	});

	/**
	 * 加载数据
	 */
	$("#btnGrid4_ReloadData").click(function()
	{
		$("#grid4").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});
};

/**
 * 七、分页表格，发送参数与解析结果
 */
init_Grid5 = function()
{
	$("#grid5").jqGrid(
	{
		/**
		 * ajax请求相关参数
		 */
		url : "demo/ui/grid/department/list",	/* 取数url */
		mtype : "get",			/* ajax提交方式 */
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,		/* 搜索字段参数 */
			nd : null,			/* 已发送请求次数的参数 */
			sort : null,		/* 排序字段参数 */
			order : null		/* 排序方式参数 */
		},
		/**
		 * 返回格式相关参数
		 */
		datatype : "local",		/* 返回数据格式（初始不从后台加载数据，后续加载需要通过setGridParam设置为json）*/
		jsonReader :			/* 返回json数据格式描述 */
		{
			root : "data",			/* 返回数据入口(array格式) */
			records : "total",		/* 总行数 */
			total : "total_page"	/* 总页数 */
		},
		/**
		 * 分页参数
		 */
		pager : "#grid5_pager",	/* 分页工具栏 */
		rowNum : 20,			/* 初始分页行数 */
		rowList : [ 10, 20, 50 ],/* 分页行数选项 */
		pagerpos : "left",		/* 分页导航位置 */
		viewrecords : true,		/* 显示总行数 */
		/**
		 * jQGrid界面外观相关参数
		 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 180
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
			name : "unitID",
			hidden : true
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
	 * 加载数据
	 */
	$("#btnGrid5_ReloadData").click(function()
	{
		$("#grid5").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});
};

/**
 * 八、兼容/适配已有接口的参数格式
 */
init_Grid6 = function()
{
	$("#grid6").jqGrid(
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",
		mtype : "get",
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,		/* 搜索字段参数 */
			nd : null,			/* 已发送请求次数的参数 */
			sort : null,		/* 排序字段参数 */
			order : null		/* 排序方式参数 */
		},
		serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */

		/**
		 * 返回格式相关参数
		 */
		datatype : "local",
		jsonReader : mc.grid.ExtJsonReader,

		/**
		 * 分页参数
		 */
		pager : "#grid6_pager",	/* 分页工具栏 */
		rowNum : 20,			/* 初始分页行数 */
		rowList : [ 10, 20, 50 ],	/* 分页行数选项 */
		pagerpos : "left",		/* 分页导航位置 */
		viewrecords : true,		/* 显示总行数 */

		/**
		 * jQGrid界面外观相关参数
		 */
		height : 100,			/* 表格默认高度 */
		width : 800,			/* 表格默认宽度 */
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		cmTemplate :			/* 不允许点击列头 */
		{
			sortable : false
		},
		colModel : [			/* 列设置 */
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 180
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
			name : "unitID",
			hidden : true
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
	 * 加载数据
	 */
	$("#btnGrid6_ReloadData").click(function()
	{
		$("#grid6").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});
};

$(function()
{
	init_Grid1();

	init_Grid2();

	init_Grid3();

	init_Grid4();

	init_Grid5();

	init_Grid6();

	mc.layout.init();
});