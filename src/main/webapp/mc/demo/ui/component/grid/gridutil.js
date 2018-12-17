/**
 * 单选不分页
 */
init_GridAll = function()
{
	var gridOption = mc.grid.createInitOption("single", "all",
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		/**
		 * jQGrid界面外观相关参数
		 */
		caption : "单选不分页表格",
		hidegrid : false,
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
		} ]
	});

	$("#gridAll").jqGrid(gridOption);

	/**
	 * 重新加载数据
	 */
	$("#btnGridAll_ReloadData").click(function()
	{
		$("#gridAll").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});

	/**
	 * 是否选中
	 */
	$("#btnGridAll_IsSelect").click(function()
	{
		mc.alert($("#gridAll").getKK());

//		mc.alert("选中状态=" + $("#gridAll").isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGridAll_GetID").click(function()
	{
		mc.alert("选中行ID=" + $("#gridAll").getId());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGridAll_GetData").click(function()
	{
		mc.alert("选中行数据=" + mc.encode($("#gridAll").getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnGridAll_GetAttr").click(function()
	{
		mc.alert("选中行deptName属性=" + $("#gridAll").getAttr("deptName"));
	});
};

/**
 * 复选不分页
 */
init_GridMultiAll = function()
{
	var gridOption = mc.grid.createInitOption("multi", "all",
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		/**
		 * jQGrid界面外观相关参数
		 */
		caption : "复选不分页表格",
		hidegrid : false,
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
		} ]
	});

	$("#gridMultiAll").jqGrid(gridOption);

	/**
	 * 重新加载数据
	 */
	$("#btnGridMultiAll_ReloadData").click(function()
	{
		$("#gridMultiAll").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});

	/**
	 * 是否选中
	 */
	$("#btnGridMultiAll_IsSelect").click(function()
	{
		mc.alert("选中状态=" + $("#gridMultiAll").isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGridMultiAll_GetID").click(function()
	{
		mc.alert("选中行ID=" + $("#gridMultiAll").getId());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGridMultiAll_GetData").click(function()
	{
		mc.alert("选中行数据=" + mc.encode($("#gridMultiAll").getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnGridMultiAll_GetAttr").click(function()
	{
		mc.alert("选中行deptName属性=" + $("#gridMultiAll").getAttr("deptName"));
	});
};

/**
 * 单选分页
 */
init_GridPage = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		/**
		 * 分页参数
		 */
		pager : "#gridPage_Pager",	/* 分页工具栏 */
		/**
		 * jQGrid界面外观相关参数
		 */
		caption : "单选分页表格",
		hidegrid : false,
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
		} ]
	});

	$("#gridPage").jqGrid(gridOption);

	/**
	 * 重新加载数据
	 */
	$("#btnGridPage_ReloadData").click(function()
	{
		$("#gridPage").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});

	/**
	 * 是否选中
	 */
	$("#btnGridPage_IsSelect").click(function()
	{
		mc.alert("选中状态=" + $("#gridPage").isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGridPage_GetID").click(function()
	{
		mc.alert("选中行ID=" + $("#gridPage").getId());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGridPage_GetData").click(function()
	{
		mc.alert("选中行数据=" + mc.encode($("#gridPage").getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnGridPage_GetAttr").click(function()
	{
		mc.alert("选中行deptName属性=" + $("#gridPage").getAttr("deptName"));
	});
};

/**
 * 复选分页
 */
init_GridMultiPage = function()
{
	var gridOption = mc.grid.createInitOption("multi", "page",
	{
		/**
		 * ajax请求相关参数
		 */
		url : "sm/dept/list",	/* 取数url */
		/**
		 * 分页参数
		 */
		pager : "#gridMultiPage_Pager",	/* 分页工具栏 */
		/**
		 * jQGrid界面外观相关参数
		 */
		caption : "复选分页表格",
		hidegrid : false,
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
		} ]
	});

	$("#gridMultiPage").jqGrid(gridOption);

	/**
	 * 重新加载数据
	 */
	$("#btnGridMultiPage_ReloadData").click(function()
	{
		$("#gridMultiPage").jqGrid("setGridParam",
		{
			datatype : "json",		/* 查询前设置datatype */
			postData : 				/* 查询前设置提交参数 */
			{
				myParam : "1"
			}
		}).trigger("reloadGrid");
	});

	/**
	 * 是否选中
	 */
	$("#btnGridMultiPage_IsSelect").click(function()
	{
		mc.alert("选中状态=" + $("#gridMultiPage").isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnGridMultiPage_GetID").click(function()
	{
		mc.alert("选中行ID=" + $("#gridMultiPage").getId());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnGridMultiPage_GetData").click(function()
	{
		mc.alert("选中行数据=" + mc.encode($("#gridMultiPage").getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnGridMultiPage_GetAttr").click(function()
	{
		mc.alert("选中行deptName属性=" + $("#gridMultiPage").getAttr("deptName"));
	});
};

$(function()
{
	init_GridAll();

	init_GridMultiAll();

	init_GridPage();

	init_GridMultiPage();

	mc.layout.init();
});