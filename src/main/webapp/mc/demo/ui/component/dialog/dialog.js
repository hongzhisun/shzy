initFormDialog = function()
{
	$("#inputNumber").NumberField();

	$("#inputMoney").MoneyField();

	$("#dateStart").DateField();

	$("#fieldProvince").ProvinceField();

	$("#cmbProvince").ProvinceComboBox();

	$("#btnOpenFormDialog").click(function(event)
	{
		layer.open(
		{
			id : "dialog_form",
			type : 1,						/* 固化为1 */
			title : "录入信息",				/* 对话框标题 */
			area : ["400px", "350px"],		/* 对话框尺寸 */
			content : $("#dialogForm"),		/* 对话框容器jQuery对象 */
			success : function(dom, index)	/* 对话框打开后回调函数 */
			{
				/**
				 * 打开后对话框容器的内容布局
				 */
				mc.layout.initDialog(this.content);
			},
			resize : false,					/* 不可调整对话框尺寸 */
			btn : ["确定", "取消"],			/* 自定义按钮 */
			yes : function(index, dom)		/* 确定按钮回调函数 */
			{
				layer.alert("确定");
				layer.close(index);
			},
			btn2 : function(index, dom)		/* 取消按钮回调函数 */
			{
				layer.alert("取消");
			}
		});
	});

	$("#btnA").click(function(event)
	{
		mc.alert("在弹出窗口再弹出提示");
	});
};

initGridDialog = function()
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

	$("#btnOpenGridDialog").click(function(event)
	{
		layer.open(
		{
			id : "dialog_grid",
			type : 1,						/* 固化为1 */
			title : "选择",					/* 对话框标题 */
			area : ["500px", "450px"],		/* 对话框尺寸 */
			content : $("#dialogGrid"),		/* 对话框容器jQuery对象 */
			success : function(dom, index)	/* 对话框打开后回调函数 */
			{
				/**
				 * 打开后对话框容器的内容布局
				 */
				mc.layout.initDialog(this.content);
			},
			resize : true,					/* 可以调整对话框尺寸 */
			resizing : function($dom)		/* 调整对话框尺寸后回调函数 */
			{
				/**
				 * 调整尺寸后，调整布局
				 */
				mc.layout.resizeDialog(this.content);
			},
			maxmin : true,					/* 显示最大化最小化按钮 */
			full : function($dom)			/* 最大化后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			min : function($dom)			/* 最小化后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			restore : function($dom)		/* 恢复后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			btn : ["确定", "取消"],			/* 自定义按钮 */
			yes : function(index, dom)		/* 确定按钮回调函数 */
			{
				layer.alert("确定");
				layer.close(index);
			},
			btn2 : function(index, dom)		/* 取消按钮回调函数 */
			{
				layer.alert("取消");
			}
		});
	});
};

initComplexDialog = function()
{
	var setting =
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
		},
		callback :
		{
			onClick : function(event, treeId, treeNode, clickFlag)		/* 点击节点文字即可勾选 */			
			{
				var tree = $.fn.zTree.getZTreeObj(treeId);
				tree.checkNode(treeNode, !treeNode.checked, true);
			},
			/**
			 * 加载完成后就自动展开一级节点
			 */
			onAsyncSuccess : function(event, treeId, treeNode, msg)
			{
				var tree = $.fn.zTree.getZTreeObj(treeId);
				var rootNodes = tree.getNodesByParam("level", 0);
				for (var i = 0; i < rootNodes.length; i++)
				{
					var rootNode = rootNodes[i];
					tree.expandNode(rootNode, true);
				}
			}
		}
	};

	var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
	var tree = $.fn.zTree.init($("#tree1"), setting, initData);
	tree.reAsyncChildNodes(null, "refresh");

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
		pager : "#grid2_pager",
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

	$("#btnOpenComplexDialog").click(function(event)
	{
		layer.open(
		{
			id : "dialog_complex",
			type : 1,						/* 固化为1 */
			title : "选择",					/* 对话框标题 */
			area : ["700px", "450px"],		/* 对话框尺寸 */
			content : $("#dialogComplex"),	/* 对话框容器jQuery对象 */
			success : function(dom, index)	/* 对话框打开后回调函数 */
			{
				/**
				 * 打开后对话框容器的内容布局
				 */
				mc.layout.initDialog(this.content);
			},
			resize : true,					/* 可以调整对话框尺寸 */
			resizing : function($dom)		/* 调整对话框尺寸后回调函数 */
			{
				/**
				 * 调整尺寸后，调整布局
				 */
				mc.layout.resizeDialog(this.content);
			},
			maxmin : true,					/* 显示最大化最小化按钮 */
			full : function($dom)			/* 最大化后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			min : function($dom)			/* 最小化后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			restore : function($dom)		/* 恢复后回调函数 */
			{
				mc.layout.resizeDialog(this.content);
			},
			btn : ["确定", "取消"],			/* 自定义按钮 */
			yes : function(index, dom)		/* 确定按钮回调函数 */
			{
				layer.alert("确定");
				layer.close(index);
			},
			btn2 : function(index, dom)		/* 取消按钮回调函数 */
			{
				layer.alert("取消");
			}
		});
	});
};

$(function()
{
	initFormDialog();

	initGridDialog();

	initComplexDialog();
	
	mc.layout.init();
});