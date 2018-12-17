init_BaseDialog = function()
{
	$("#trayBaseDialog").BaseDialog(
	{
		id : "base_dialog1_id",					/* 组件id */
//		title : "1111",
		content_url : "mc/test/ui/component/dialog/dialog_content.html",			/* 组件html url */
		dialog : 
		{
			title : "22222",		/* 对话框标题 */
			success : function($dom, index)
			{
/*				alert("$dom==jQuery=" + ($dom instanceof jQuery));*/
			},
			yes : function(index, $dom)
			{
				$("#baseDialog").BaseDialog("full");
			},
			btn2 : function(index, $dom)
			{
			}
		}
	});

	$("#trayBaseDialog_Simple").BaseDialog(
	{
		id : "base_dialog2_id",					/* 组件id */
		content_url : "mc/test/ui/component/dialog/dialog_content.html",			/* 组件html url */
		title : "新标题",	/* 对话框标题 */
		width : "500",				/* 对话框宽度 */
		height : "300",				/* 对话框高度 */
		resize : true,				/* 对话框是否可拉伸 */
		maxmin : true,				/* 对话框是否可最大化最小化 */
		dialog : 
		{
			success : function($dom, index)
			{
			},
			yes : function(index, $dom)
			{
				$("#baseDialog_Simple").BaseDialog("full");
			},
			btn2 : function(index, $dom)
			{
			}
		}
	});

	$("#btnBaseDialog").click(function(event)
	{
		$("#trayBaseDialog").BaseDialog("open");
	});

	$("#btnBaseDialog_Simple").click(function(event)
	{
		$("#trayBaseDialog_Simple").BaseDialog("open");
	});
};

init_SelectorDialog = function()
{
	$("body").SelectorDialog(
	{
		id : "selector_dialog1_id",					/* 组件id */
		content_url : "mc/test/ui/component/dialog/dialog_content.html",			/* 组件html url */
		dialog : 
		{
			title : "我的Selector对话框",		/* 对话框标题 */
			success : function($dom, index)
			{
			},
			yes : function(index, $dom)
			{
			},
			btn2 : function(index, $dom)
			{
			}
		}
	});

	$("#btnSelectorDialog").click(function(event)
	{
		$("body").SelectorDialog("open");
	});
};

init_GridDialog = function()
{
	$("#trayGridDialog").GridDialog(
	{
		id : "grid_dialog1_id",					/* 组件id */
		pager_mode : true,
		height : 400,
		width : 600,
		dialog : 
		{
			title : "我的Grid对话框",		/* 对话框标题 */
			resize  : true,
			maxmin : true,
			success : function($dom, index)
			{
			},
			yes : function(index, $dom)
			{
				var data = $("trayGridDialog").GridDialog("data");
				alert(mc.encode(data));
			},
			btn2 : function(index, $dom)
			{
			}
		},
		grid : 
		{
			url : "sm/dept/list",
			multiselect : true,		/* 单选模式 */
			colModel : [
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
			} ]
		}
	});

	$("#btnGridDialog").click(function(event)
	{
		$("#trayGridDialog").GridDialog("open");
	});
};

init_TreeGridDialog = function()
{
};

init_TreeDialog = function()
{
	$("#trayTreeDialog").TreeDialog(
	{
		id : "tree_dialog1_id",					/* 组件id */
		height : 600,
		width : 400,
		pager_mode : true,
		dialog : 
		{
			title : "我的Grid对话框",		/* 对话框标题 */
			resize : true,
			maxmin : true,
			success : function($dom, index)
			{
			},
			yes : function(index, $dom)
			{
				var data = $("body").TreeDialog("data");
				alert(mc.encode(data));
			},
			btn2 : function(index, $dom)
			{
			}
		},
		tree : 
		{
			async :
			{
				enable : true,
				url : "sm/dept/list",
				dataFilter : function(treeId, parentNode, responseData)
				{
					return responseData.data;
				}
			},
			data :
			{
				key :
				{
					name : "deptName"
				},
				/**
				 * 采用简易数据模式，方便后台准备数据
				 */
				simpleData :
				{
					enable : true,
					idKey : "deptID",
					pIdKey : "parentID",
					rootPId : ""
				}
			},
			check :
			{
				enable : true,
			},
			view :
			{
				selectedMulti : true
			}
		}
	});

	$("#btnTreeDialog").click(function(event)
	{
		$("#trayTreeDialog").TreeDialog("open");
	});
};

$(function()
{
	init_BaseDialog();

//	init_SelectorDialog();

	init_GridDialog();

//	init_TreeGridDialog();

	init_TreeDialog();
});