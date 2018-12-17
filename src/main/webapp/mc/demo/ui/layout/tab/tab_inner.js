$(function() 
{
	/**
	 * 依次初始化各页面内组件
	 */
	init_Tab1();

	init_Tab2();

	init_Tab3();

	/**
	 * 页面整体布局
	 */
	mc.layout.init();

	/**
	 * 绑定mc.TabContainer组件的选项卡切换、删除事件
	 */

	/**
	 * 打开页面即加载后台数据
	 * “第3页（滚动布局）”未加载。等到切换到该页面，才加载数据。
	 */
	$("#grid1").setGridParam(
	{
		datatype : "json"
	}).trigger("reloadGrid");	

	$("#grid2_1").setGridParam(
	{
		datatype : "json"
	}).trigger("reloadGrid");
	$("#grid2_2").setGridParam(
	{
		datatype : "json"
	}).trigger("reloadGrid");

	/**
	 * 绑定选项卡切换事件
	 * 如果切换第三页（序号=2），并且是页面未初始化（即初次显示），则需要从后台加载表格数据
	 */
	$("#tabContainer").TabContainer("option", "changeCallback", function(index, $tabTitle, $tabContent, isTabInited)
	{
		if (index == 0)
		{
			mc.msg("切换到第1页（序号=0）");
		}
		else if (index == 1)
		{
			mc.msg("切换到第2页（序号=1）");
		}
		else if (index == 2)
		{
			if (isTabInited == 1)
			{
				mc.msg("切换到第3页，但不是初次显示，不需要重复加载后台数据");
			}
			else
			{
				mc.msg("第3页初次显示，开始从后台加载3个表格数据");
				$("#grid3_1").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");
				$("#grid3_2").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");
				$("#grid3_3").setGridParam(
				{
					datatype : "json"
				}).trigger("reloadGrid");
			}
		}
	});
});

/**
 * 第1页-自适应布局1
 */
init_Tab1 = function()
{
	$("#inputNumber1").NumberField();
	$("#inputMoney1").MoneyField();
	$("#dateStart1").DateField();
	$("#cmbUserStatus1").UserStatusComboBox();
	$("#fieldDept1").DeptGridField();

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/dept/list",
		pager : "#grid1_pager",
		colModel : [
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 150
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 150
		},
		{
			name : "status",
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
	$("#grid1").jqGrid(gridOption);
};

/**
 * 第2页-自适应布局2
 */
init_Tab2 = function()
{
	$("#inputNumber2").NumberField();
	$("#inputMoney2").MoneyField();
	$("#dateStart2").DateField();
	$("#cmbUserStatus2").UserStatusComboBox();
	$("#fieldDept2").DeptGridField();

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/unit/list",
		pager : "#grid2_1_pager",
		colModel : [
		{
			name : "unitID",
			hidden : true,
			key : true,
		},
		{
			name : "unitCode",
			label : "公司编号",
			width : 150
		},
		{
			name : "unitName",
			label : "公司名称",
			width : 150
		},
		{
			name : "status",
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
	$("#grid2_1").jqGrid(gridOption);

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/dept/list",
		pager : "#grid2_2_pager",
		colModel : [
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 150
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 150
		},
		{
			name : "status",
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
	$("#grid2_2").jqGrid(gridOption);
};

/**
 * 第3页-滚动布局
 */
init_Tab3 = function()
{
	$("#inputNumber3").NumberField();
	$("#inputMoney3").MoneyField();
	$("#dateStart3").DateField();
	$("#cmbUserStatus3").UserStatusComboBox();
	$("#fieldDept3").DeptGridField();

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/unit/list",
		pager : "#grid3_1_pager",
		colModel : [
		{
			name : "unitID",
			hidden : true,
			key : true,
		},
		{
			name : "unitCode",
			label : "公司编号",
			width : 150
		},
		{
			name : "unitName",
			label : "公司名称",
			width : 150
		},
		{
			name : "status",
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
	$("#grid3_1").jqGrid(gridOption);

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/dept/list",
		pager : "#grid3_2_pager",
		colModel : [
		{
			name : "deptID",
			hidden : true,
			key : true,
		},
		{
			name : "deptCode",
			label : "部门编号",
			width : 150
		},
		{
			name : "deptName",
			label : "部门名称",
			width : 150
		},
		{
			name : "status",
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
	$("#grid3_2").jqGrid(gridOption);

	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/user/list",
		pager : "#grid3_3_pager",
		colModel : [
		{
			name : "userID",
			hidden : true,
			key : true,
		},
		{
			name : "userCode",
			label : "登录名",
			width : 150
		},
		{
			name : "userName",
			label : "姓名",
			width : 150
		},
		{
			name : "status",
			hidden : true
		},
		{
			name : "status_text",
			label : "状态",
			width : 60,
			align : "center",
			mc_source_col : "status",
			formatter : sm.render.UserStatus
		} ]
	});
	$("#grid3_3").jqGrid(gridOption);
};