init_UserGrid = function()
{
	$("#fieldUnitGrid").UnitGridField(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldDeptGrid").DeptGridField("clear");
			$("#fieldUserGrid").UserGridField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldDeptGrid").DeptGridField("clear");
			$("#fieldUserGrid").UserGridField("clear");
		}
	});

	$("#fieldDeptGrid").DeptGridField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnitGrid").UnitGridField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			var param =
			{
				unitid : $("#fieldUnitGrid").UnitGridField("id")
			};

			return param;
		},
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldUserGrid").UserGridField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldUserGrid").UserGridField("clear");
		}
	});

	$("#fieldUserGrid").UserGridField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnitGrid").UnitGridField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			if (! $("#fieldDeptGrid").DeptGridField("isSelect"))
			{
				mc.alert("请先选择部门");
				return false;
			}

			var param =
			{
				unitid : $("#fieldUnitGrid").UnitGridField("id"),
				deptid : $("#fieldDeptGrid").DeptGridField("id")
			};

			return param;
		}
	});
};

init_UserTree = function()
{
	$("#fieldUnitTree").UnitTreeField(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldDeptTree").DeptTreeField("clear");
			$("#fieldUserGrid2").UserGridField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldDeptTree").DeptTreeField("clear");
			$("#fieldUserGrid2").UserGridField("clear");
		}
	});

	$("#fieldDeptTree").DeptTreeField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnitTree").UnitTreeField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			var param =
			{
				unitid : $("#fieldUnitTree").UnitTreeField("id")
			};

			return param;
		},
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldUserGrid2").UserGridField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldUserGrid2").UserGridField("clear");
		}
	});

	$("#fieldUserGrid2").UserGridField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldUnitTree").UnitTreeField("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			if (! $("#fieldDeptTree").DeptTreeField("isSelect"))
			{
				mc.alert("请先选择部门");
				return false;
			}

			var param =
			{
				unitid : $("#fieldUnitTree").UnitTreeField("id"),
				deptid : $("#fieldDeptTree").DeptTreeField("id")
			};

			return param;
		}
	});
};

init_ModuleGrid = function()
{
	$("#fieldModuleGrid").ModuleGridField(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldMenuGrid").MenuGridField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldMenuGrid").MenuGridField("clear");
		}
	});

	$("#fieldMenuGrid").MenuGridField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldModuleGrid").ModuleGridField("isSelect"))
			{
				mc.alert("请先选择模块");
				return false;
			}

			var param =
			{
				moduleid : $("#fieldModuleGrid").ModuleGridField("id")
			};

			return param;
		}
	});
};

init_ModuleTree = function()
{
	$("#fieldModuleTree").ModuleTreeField(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#fieldMenuTree").MenuTreeField("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#fieldMenuTree").MenuTreeField("clear");
		}
	});

	$("#fieldMenuTree").MenuTreeField(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#fieldModuleTree").ModuleTreeField("isSelect"))
			{
				mc.alert("请先选择模块");
				return false;
			}

			var param =
			{
				moduleid : $("#fieldModuleTree").ModuleTreeField("id")
			};

			return param;
		}
	});
};

$(function()
{
	init_UserGrid();

	init_UserTree();

	init_ModuleGrid();

	init_ModuleTree();

	mc.layout.init();
});