init_Dialog1 = function()
{
	$("#btnDialog1").click(function(event)
	{
		layer.open(
		{
			id : "dialog_form",
			type : 1,
			title : "对话框1(不可改变大小)",
			area : ["500px", "400px"],
			content : $("#dialog1"),
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行加载数据
				 */
				mc.layout.init($("#dialog1"));
			},
			resize : false,
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				layer.close(index);
			},
			btn2 : function(index, dom)
			{
			}
		});
	});
};

init_Dialog2 = function()
{
	$("#btnDialog2").click(function(event)
	{
		layer.open(
		{
			id : "dialog_form2",
			type : 1,
			title : "对话框2(可改变大小)",
			area : ["500px", "400px"],
			content : $("#dialog2"),
			success : function($dom, index)
			{
				/**
				 * 打开对话框后进行加载数据
				 */
				mc.layout.initDialog(this.content);
			},
			resize : true,
			resizing : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			maxmin : true,
			full : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			min : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			restore : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				layer.close(index);
			},
			btn2 : function(index, dom)
			{
			}
		});
	});
};

init_Dialog3 = function()
{
	$("#grid1").jqGrid(
	{
		height : 100,
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
		} ],
		url : "sm/dept/list",
		datatype : "json",
		mtype : "get",
		pager : "#grid1_pager",
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

	$("#grid2").jqGrid(
	{
		height : 100,
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
		} ],
		url : "sm/dept/list",
		datatype : "json",
		mtype : "get",
		rowNum : -1,			/* 显示全部数据，取消分页 */
		prmNames :				/* 避免发送不必要的参数到服务端 */
		{
			search : null,
			nd : null,
			sort : null,
			order : null,
			rows : null,
			page : null
		},
		serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
		jsonReader : mc.grid.ExtJsonReader
	});

	$("#btnDialog3").click(function(event)
	{
		layer.open(
		{
			id : "dialog_form3",
			type : 1,
			title : "对话框3(可改变大小，嵌入表格)",
			area : ["500px", "400px"],
			content : $("#dialog3"),
			success : function($dom, index)
			{
				/**
				 * 打开对话框后进行加载数据
				 */
				mc.layout.initDialog(this.content);

/*				$("#dialog2").resize(function(event)
				{
					this.content.layout().resizeAll();
				})*/
			},
			resize : true,
			resizing : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			maxmin : true,
			full : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			min : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			restore : function($dom)
			{
				mc.layout.resizeDialog(this.content);
			},
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				layer.close(index);
			},
			btn2 : function(index, dom)
			{
			}
		});
	});
};

$(function()
{
	init_Dialog1();

	init_Dialog2();

	init_Dialog3();
});