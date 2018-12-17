init_Busi_Dialog_Component = function()
{
	$("#dialogUnitGrid").UnitGridDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogUnitGrid").UnitGridDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#dialogUnitTree").UnitTreeDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogUnitTree").UnitTreeDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#dialogDeptGrid").DeptGridDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogDeptGrid").DeptGridDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#dialogDeptTree").DeptTreeDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogDeptTree").DeptTreeDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#dialogUserGrid").UserGridDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogUserGrid").UserGridDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#dialogModuleTree").ModuleTreeDialog(
	{
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogModuleTree").ModuleTreeDialog("text"));
				mc.alert(msg);
			}
		}
	});
	$("#dialogMenuTree").MenuTreeDialog(
	{
		beforeOpenCallback : function()
		{
			var param =
			{
				moduleid : $("#dialogModuleTree").ModuleTreeDialog("id")
			};

			return param;
		},
		dialog : 
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				var msg = "已选择数据=" + mc.encode($("#dialogMenuTree").MenuTreeDialog("text"));
				mc.alert(msg);
			}
		}
	});

	$("#btnUnitGrid").click(function(event)
	{
		$("#dialogUnitGrid").UnitGridDialog("open");
	});
	$("#btnUnitTree").click(function(event)
	{
		$("#dialogUnitTree").UnitTreeDialog("open");
	});
	$("#btnDeptGrid").click(function(event)
	{
		$("#dialogDeptGrid").DeptGridDialog("open");
	});
	$("#btnDeptTree").click(function(event)
	{
		$("#dialogDeptTree").DeptTreeDialog("open");
	});
	$("#btnUserGrid").click(function(event)
	{
		$("#dialogUserGrid").UserGridDialog("open");
	});
	$("#btnModuleTree").click(function(event)
	{
		$("#dialogModuleTree").ModuleTreeDialog("open");
	});
	$("#btnMenuTree").click(function(event)
	{
		$("#dialogMenuTree").MenuTreeDialog("open");
	});
};

$(function()
{
	init_Busi_Dialog_Component();

	mc.layout.init();
});