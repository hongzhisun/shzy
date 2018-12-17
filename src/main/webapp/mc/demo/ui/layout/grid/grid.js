$(function()
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

	mc.layout.init();
});