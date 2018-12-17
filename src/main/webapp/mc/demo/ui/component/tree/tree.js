var _MaxID = 0;

/**
 * 树(前台数据，单选)
 */
initTree1 = function()
{
	var setting =
	{
		data :
		{
			/**
			 * 采用简易数据模式，方便后台准备数据
			 */
			simpleData :
			{
				enable : true
			}
		},
		view :
		{
			selectedMulti : false,
			txtSelectedEnable : true
		}
	};

	var data = 
	[   	
		{ id : "id1", name : "上海市", pId : "", open : true },
		{ id : "id2", name : "黄埔区", pId : "id1" },
		{ id : "id3", name : "徐汇区", pId : "id1" },
		{ id : "id4", name : "浦东新区", pId : "id1" },
		{ id : "id5", name : "江苏省", pId : "", open : true },
		{ id : "id6", name : "苏州市", pId : "id5", open : true },
		{ id : "id7", name : "常熟市", pId : "id6" },
		{ id : "id8", name : "昆山市", pId : "id6" },
		{ id : "id9", name : "太仓市", pId : "id6" },
		{ id : "id10", name : "南京市", pId : "id5" },
		{ id : "id11", name : "无锡市", pId : "id5" }
 	];
	
	$.fn.zTree.init($("#tree1"), setting, data);

	/**
	 * 获取选中节点
	 */
	$("#btnTree1_getNode").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree1");
		var nodes = tree.getSelectedNodes();
		if (nodes.length <= 0)
		{
			alert("未选中");
			return;
		}

		var node = nodes[0];
		var pathNodes = node.getPath();
		var path = "";
		for (var i = 0; i < pathNodes.length; i++)
		{
			var pathNode = pathNodes[i];
			if ($.trim(path).length > 0)
			{
				path += " - ";
			}

			path += pathNode.name;
		}

		alert("选中节点数量=" + nodes.length + "，节点id=" + node.id + ", 节点name=" + node.name + ", 路径=" + path);
	});

	/**
	 * 设置选中节点
	 */
	$("#btnTree1_setNode").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree1");
		var node = tree.getNodeByParam("id", "id6");
		tree.selectNode(node);
		alert("已选中苏州市");
	});

	/**
	 * 更新整棵树节点
	 */
	$("#btnTree1_reloadNode").click(function(event)
	{
		$.fn.zTree.init($("#tree1"), setting, null);

		var nodes = 
		[   	
			{ id : "id1", name : "上海市", pId : "", open : true },
			{ id : "id12", name : "静安区", pId : "id1" },
			{ id : "id13", name : "南市区", pId : "id1" },
			{ id : "id14", name : "浙江省", pId : "", open : true },
			{ id : "id15", name : "杭州市", pId : "id14" },
			{ id : "id16", name : "宁波市", pId : "id15" }
	 	];

		$.fn.zTree.init($("#tree1"), setting, nodes);
	});

	
};

/**
 * 树(前台数据，复选)
 */
initTree2 = function()
{
	var setting =
	{
		data :
		{
			/**
			 * 采用简易数据模式，方便后台准备数据
			 */
			simpleData :
			{
				enable : true
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
			}
		},
	};

	var data = 
	[   	
		{ id : "id1", name : "上海市", pId : "", open : true },
		{ id : "id2", name : "黄埔区", pId : "id1" },
		{ id : "id3", name : "徐汇区", pId : "id1" },
		{ id : "id4", name : "浦东新区", pId : "id1" },
		{ id : "id5", name : "江苏省", pId : "", open : true },
		{ id : "id6", name : "苏州市", pId : "id5", open : true },
		{ id : "id7", name : "常熟市", pId : "id6" },
		{ id : "id8", name : "昆山市", pId : "id6" },
		{ id : "id9", name : "太仓市", pId : "id6" },
		{ id : "id10", name : "南京市", pId : "id5" },
		{ id : "id11", name : "无锡市", pId : "id5" }
 	];
	
	$.fn.zTree.init($("#tree2"), setting, data);

	/**
	 * 获取选中节点
	 */
	$("#btnTree2_getNode").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree2");
		var nodes = tree.getCheckedNodes(true);
		if (nodes.length <= 0)
		{
			alert("未选中");
			return;
		}

		var nodeNames = ""
		for (var i = 0; i < nodes.length; i++)
		{
			var node = nodes[i];
			if ($.trim(nodeNames).length > 0)
			{
				nodeNames += ", ";
			}
			nodeNames += node.name;
		}

		alert("选中节点数量=" + nodes.length + "，分别为：" + nodeNames);
	});

	/**
	 * 设置选中节点
	 */
	$("#btnTree2_setNode").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree2");
		var node1 = tree.getNodeByParam("id", "id6");
		var node2 = tree.getNodeByParam("id", "id7");
		tree.checkAllNodes(false);
		tree.checkNode(node1, true, false, false);
		tree.checkNode(node2, true, false, false);
		alert("已选中苏州市和常熟市");
	});

	/**
	 * 全选
	 */
	$("#btnTree2_all").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree2");
		tree.checkAllNodes(true);
	});
	/**
	 * 全清
	 */
	$("#btnTree2_clear").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree2");
		tree.checkAllNodes(false);
	});
};

/**
 * 树(后台数据、整体加载)
 */
initTree3 = function()
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

	$.fn.zTree.init($("#tree3"), setting, initData);

	/**
	 * 重新加载数据
	 */
	$("#btnTree3_reload").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree3");
		tree.reAsyncChildNodes(null, "refresh");
	});

	/**
	 * 获取选中节点
	 */
	$("#btnTree3_getNode").click(function(event)
	{
		var tree = $.fn.zTree.getZTreeObj("tree3");
		var nodes = tree.getCheckedNodes(true);
		if (nodes.length <= 0)
		{
			alert("未选中");
			return;
		}

		var nodeNames = ""
		for (var i = 0; i < nodes.length; i++)
		{
			var node = nodes[i];
			if ($.trim(nodeNames).length > 0)
			{
				nodeNames += ", ";
			}
			nodeNames += node.deptName;
		}

		alert("选中节点数量=" + nodes.length + "，分别为：" + nodeNames);
	});
};

/**
 * 树(后台数据、异步加载、兼容Ext格式http api)
 */
initTree4 = function()
{
	var setting =
	{
		async :
		{
			
		},
		data :
		{
			/**
			 * 采用简易数据模式，方便后台准备数据
			 */
			simpleData :
			{
				enable : true
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
			}
		},
	};

	var initData = [ { id : "root", name : "部门", pId : ""} ]

	$.fn.zTree.init($("#tree4"), setting, initData);

	/**
	 * 重新加载数据
	 */
	$("#btnTree4_reload").click(function(event)
	{
	});
};

$(function()
{
	initTree1();

	initTree2();

	initTree3();

	initTree4();
});