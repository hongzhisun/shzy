function initAlert()
{
	/**
	 * 仅提示
	 */
	$("#btnAlert1").button().click(function()
	{
		layer.alert("提示信息");
	});

	/**
	 * 提示+标题
	 */
	$("#btnAlert2").button().click(function()
	{
		layer.alert("提示信息 + 提示标题",
		{
			title : "提示标题"
		});
	});

	/**
	 * 提示+标题+执行回调函数
	 */
	$("#btnAlert3").button().click(function()
	{
		layer.alert("提示信息 + 提示标题 + 回调函数",
		{
			title : "提示标题"
		}, function(index, dom)
		{
			$("#inputAlert").val($("#inputAlert").val() + "abc");
			layer.close(index);
		});
	});

	/**
	 * 仅提示-顶层
	 */
	$("#btnAlert4").button().click(function()
	{
		top.layer.alert("提示信息");
	});
};
	
function initConfirm()
{
	/**
	 * 仅确认
	 */
	$("#btnConfirm1").button().click(function()
	{
		layer.confirm("确认信息 + 确认标题");
	});

	/**
	 * 确认+标题
	 */
	$("#btnConfirm2").button().click(function()
	{
		layer.confirm("确认信息 + 确认标题",
		{
			title : "确认标题"
		});
	});

	/**
	 * 确认+标题+执行回调函数
	 */
	$("#btnConfirm3").button().click(function()
	{
		layer.confirm("确认信息 + 确认标题",
		{
			title : "确认标题"
		}, function(index, dom)
		{
			$("#inputConfirm").val($("#inputConfirm").val() + "; result=yes");
			layer.close(index);
		}, function(index, dom)
		{
			$("#inputConfirm").val($("#inputConfirm").val() + "; result=no");
		});
	});
	
	/**
	 * 是、否
	 */
	$("#btnConfirm5").button().click(function()
	{
		layer.confirm("是否确认信息 + 是否确认标题",
		{
			title : "是否确认标题",
			btn: ["是", "否"]
		}, function(index, dom)
		{
			$("#inputConfirm").val($("#inputConfirm").val() + "; result=yes");
			layer.close(index);
		}, function(index, dom)
		{
			$("#inputConfirm").val($("#inputConfirm").val() + "; result=no");
		});
	});
};

initMask = function()
{
	$("#btnMask1").button().click(function()
	{
		layer.load(2,
		{
			shade : 0.1,
			title : "aaa",
//			time : 3 * 1000
		});
	});

	$("#btnMask2").button().click(function()
	{
		layer.open(
		{
			type : 3,
			icon : 2,
//			shade : 0.3,
			time : 3 * 1000
		});
	});
};

initDialog = function()
{
	/**
	 * dom弹出-本地
	 * 表格必须先初始化，否则打开对话框时html dom结构会乱掉
	 */
	$("#grid_department").jqGrid(
	{
		height : 100,
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
			hidden : true
		},
		{
			name : "code",
			label : "部门编号",
			index : "code",
			width : 90
		},
		{
			name : "name",
			label : "部门名称",
			index : "name",
			width : 100
		} ]
	});

	var newRowData1 =
	{
		id : 1,
		code : "0101",
		name : "总裁室"
	};
	$("#grid_department").addRowData(newRowData1.id, newRowData1);
	var newRowData2 =
	{
		id : 2,
		code : "0102",
		name : "亚太区事业群"
	};
	$("#grid_department").addRowData(newRowData2.id, newRowData2);
	var newRowData3 =
	{
		id : 3,
		code : "0103",
		name : "大中华区事业群"
	};
	$("#grid_department").addRowData(newRowData3.id, newRowData3);
	var newRowData4 =
	{
		id : 4,
		code : "0104",
		name : "美洲区事业群"
	};
	$("#grid_department").addRowData(newRowData4.id, newRowData4);

	/**
	 * dom弹出-本地
	 */
	$("#btnDialog1_1").button().click(function()
	{
		layer.open(
		{
			id : "dialog1_1",
			type : 1,
			title : "dialog1_1",
			area : ["600px", "300px"],
			content : $("#grid_department_warp"),
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行布局
				 */
				$("#grid_department_warp").parent().layout(
				{
					onresize : function()
					{
						/**
						 * layout调整后自动调整表格大小
						 * 如果对话框不允许修改大小，则不需要调整
						 */
						$("#grid_department").setGridWidth($("#grid_department_warp").width());
						$("#grid_department").setGridHeight($("#grid_department_warp").height() - 30);
					}
				});

				/**
				 * 初次布局完成后调整表格大小
				 */
				$("#grid_department").setGridWidth($("#grid_department_warp").width());
				$("#grid_department").setGridHeight($("#grid_department_warp").height() - 30);
			},
			resizing : function(dom)
			{
				/**
				 * 对话框大小调整后，重新布局。
				 */
				$("#grid_department_warp").parent().layout().resizeAll();
			},
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				var selectID = $("#grid_department").getGridParam("selrow");
				if (selectID == null)
				{
					layer.alert("请先选择");
					return;
				}
				var data = $("#grid_department").getRowData(selectID);
				layer.alert("已选中=" + data.name);
				layer.close(index);
			},
			btn2 : function(index, dom)
			{
				layer.alert("取消");
			}
		});
	});

	/**
	 * dom弹出-本地
	 * 表格必须先初始化，否则打开对话框时html dom结构会乱掉
	 */
	$("#grid_department2").jqGrid(
	{
		height : 100,
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
			hidden : true
		},
		{
			name : "code",
			label : "部门编号",
			index : "code",
			width : 90
		},
		{
			name : "name",
			label : "部门名称",
			index : "name",
			width : 100
		} ]
	});

	var newRowData2_1 =
	{
		id : 1,
		code : "0101",
		name : "总裁室"
	};
	$("#grid_department2").addRowData(newRowData2_1.id, newRowData2_1);
	var newRowData2_2 =
	{
		id : 2,
		code : "0102",
		name : "亚太区事业群"
	};
	$("#grid_department2").addRowData(newRowData2_2.id, newRowData2_2);
	var newRowData2_3 =
	{
		id : 3,
		code : "0103",
		name : "大中华区事业群"
	};
	$("#grid_department2").addRowData(newRowData2_3.id, newRowData2_3);
	var newRowData2_4 =
	{
		id : 4,
		code : "0104",
		name : "美洲区事业群"
	};
	$("#grid_department2").addRowData(newRowData2_4.id, newRowData2_4);

	/**
	 * dom弹出-其他页面
	 */
	$("#btnDialog1_2").button().click(function()
	{
		layer.open(
		{
			id : "dialog1_2",
			type : 1,
			title : "dialog1_2",
			area : ["600px", "300px"],
			content : $("#grid_department_warp2"),
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行布局
				 */
				$("#grid_department_warp2").parent().layout(
				{
					onresize : function()
					{
						/**
						 * layout调整后自动调整表格大小
						 * 如果对话框不允许修改大小，则不需要调整
						 */
						$("#grid_department2").setGridWidth($("#grid_department_warp2").width());
						$("#grid_department2").setGridHeight($("#grid_department_warp2").height() - 30);
					}
				});

				/**
				 * 初次布局完成后调整表格大小
				 */
				$("#grid_department2").setGridWidth($("#grid_department_warp2").width());
				$("#grid_department2").setGridHeight($("#grid_department_warp2").height() - 30);
			},
			resizing : function(dom)
			{
				/**
				 * 对话框大小调整后，重新布局。
				 */
				$("#grid_department_warp2").parent().layout().resizeAll();
			},
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				var selectID = $("#grid_department2").getGridParam("selrow");
				if (selectID == null)
				{
					layer.alert("请先选择");
					return;
				}
				var data = $("#grid_department2").getRowData(selectID);
				layer.alert("已选中=" + data.name);
				layer.close(index);
			},
			btn2 : function(index, dom)
			{
				layer.alert("取消");
			}
		});
	});

	/**
	 * iframe弹出
	 */
	$("#btnDialog1_3").button().click(function()
	{
		layer.open(
		{
			id : "dialog1_3",
			type : 2,
			title : "dialog1_3",
			area : ["600px", "300px"],
			content : "cloud/demo/ui/component/layer/dialog_iframe.jsp",
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
/*
				var grid = $("#dialog1_3").children("iframe").contents().find("#grid_department");
				var selectID = grid.getGridParam("selrow");
				if (selectID == null)
				{
					layer.alert("请先选择");
					return;
				}
				var data = grid.getRowData(selectID);
				layer.alert("已选中=" + data.name);
*/

				var iframe_window = $("#dialog1_3").children("iframe")[0].contentWindow;
				var grid = iframe_window.$("#grid_department");
				var selectID = grid.getGridParam("selrow");
				if (selectID == null)
				{
					layer.alert("请先选择");
					return;
				}
				var data = grid.getRowData(selectID);
				layer.alert("已选中=" + data.name);

				layer.close(index);
			},
			btn2 : function(index, dom)
			{
				layer.alert("取消");
			}
		});
	});

	/**
	 * 对话框组件
	 */
	$("#btnDialog1_4").button().click(function()
	{
//		$("body").append("<div>aaaaaaaaaaaaaa</div>");

		DialogUtil.open("aaa",
		{
			title : "dialog1_4",
			area : ["600px", "300px"]
//			success : function(dom, index)
//			{
//				/**
//				 * 打开对话框后进行布局
//				 */
//				$("#grid_department_warp").parent().layout(
//				{
//					onresize : function()
//					{
//						/**
//						 * layout调整后自动调整表格大小
//						 * 如果对话框不允许修改大小，则不需要调整
//						 */
//						$("#grid_department").setGridWidth($("#grid_department_warp").width());
//						$("#grid_department").setGridHeight($("#grid_department_warp").height() - 30);
//					}
//				});
//
//				/**
//				 * 初次布局完成后调整表格大小
//				 */
//				$("#grid_department").setGridWidth($("#grid_department_warp").width());
//				$("#grid_department").setGridHeight($("#grid_department_warp").height() - 30);
//			},
//			resizing : function(dom)
//			{
//				/**
//				 * 对话框大小调整后，重新布局。
//				 */
//				$("#grid_department_warp").parent().layout().resizeAll();
//			},
//			btn : ["确定", "取消"],
//			yes : function(index, dom)
//			{
//				var selectID = $("#grid_department").getGridParam("selrow");
//				if (selectID == null)
//				{
//					layer.alert("请先选择");
//					return;
//				}
//				var data = $("#grid_department").getRowData(selectID);
//				layer.alert("已选中=" + data.name);
//				layer.close(index);
//			},
//			btn2 : function(index, dom)
//			{
//				layer.alert("取消");
//			}
		});
	});

	/**
	 * dom弹出-本地(顶层)
	 */
	$("#btnDialog2_1").button().click(function()
	{
	
	});

	/**
	 * dom弹出-其他页面(顶层)
	 */
	$("#btnDialog2_2").button().click(function()
	{
	
	});

	/**
	 * iframe弹出(顶层)
	 */
	$("#btnDialog2_3").button().click(function()
	{
		top.layer.open(
		{
			id : "dialog2_3",
			type : 2,
			title : "dialog2_3",
			area : ["600px", "300px"],
			content : "mc/demo/ui/component/layer/dialog_iframe.jsp",
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				top.layer.alert("确定");
				top.layer.close(index);
			},
			btn2 : function(index, dom)
			{
				top.layer.alert("取消");
			}
		});
	});
};

$(function()
{
	initAlert();

	initConfirm();

	initMask();

	initDialog();
});