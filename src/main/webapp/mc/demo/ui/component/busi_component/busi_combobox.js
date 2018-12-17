init_Busi_ComboBox_Component = function()
{
	$("#cmbStatus").StatusComboBox();

	$("#cmbYesNo").YesNoComboBox();

	$("#cmbOpenClose").OpenCloseComboBox();

	$("#cmbMonth").MonthComboBox();

	$("#cmbUnit").UnitComboBox(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#cmbDept").DeptComboBox("clear");
			$("#cmbUser").UserComboBox("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#cmbDept").DeptComboBox("clear");
			$("#cmbUser").UserComboBox("clear");
		}
	});

	$("#cmbDept").DeptComboBox(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#cmbUnit").UnitComboBox("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			var param =
			{
				unitid : $("#cmbUnit").UnitComboBox("id")
			};

			return param;
		},
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#cmbUser").UserComboBox("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#cmbUser").UserComboBox("clear");
		}
	});

	$("#cmbUser").UserComboBox(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#cmbUnit").UnitComboBox("isSelect"))
			{
				mc.alert("请先选择公司");
				return false;
			}

			if (! $("#cmbDept").DeptComboBox("isSelect"))
			{
				mc.alert("请先选择部门");
				return false;
			}

			var param =
			{
				unitid : $("#cmbUnit").UnitComboBox("id"),
				deptid : $("#cmbDept").DeptComboBox("id")
			};

			return param;
		}
	});

	$("#cmbModule").ModuleComboBox(
	{
		/**
		 * 选择值变化后回调函数
		 */
		changeCallback : function(index, id, text, data, event, ui)
		{
			$("#cmbMenu").MenuComboBox("clear");
		},
		/**
		 * 清除选中后回调函数
		 */
		clearCallback : function()
		{
			$("#cmbMenu").MenuComboBox("clear");
		}
	});

	$("#cmbMenu").MenuComboBox(
	{
		/**
		 * 下拉/弹窗前回调函数
		 * 下拉前回调，检查是否满足条件，以及获得最新查询参数。
		 * 返回false则不不下拉；
		 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
		 */
		beforeOpenCallback : function()
		{
			if (! $("#cmbModule").ModuleComboBox("isSelect"))
			{
				mc.alert("请先选择模块");
				return false;
			}

			var param =
			{
				moduleid : $("#cmbModule").ModuleComboBox("id")
			};

			return param;
		}
	});
};

$(function()
{
	init_Busi_ComboBox_Component();

	mc.layout.init();
});