$(function() 
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
		},
		{
			name : "unitID",
			hidden : true
		},
		{
			name : "unitCode",
			label : "公司编号",
			width : 120
		},
		{
			name : "unitName",
			label : "公司名称",
			width : 200
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

	$("#btnAdd").click(function(event)
	{
		var html_title = "<li>新选项卡</li>";
		$(".layui-tab-title").append(html_title);

		var html_content = "<div class='layui-tab-item'>新增选项卡页内容</div>";
		$(".layui-tab-content").append(html_content);
	});

	var element = layui.element;
	element.on('tab', function(data)
	{
//		console.log(this);
//		console.log(data.index);
//		console.log(data.elem);
		if (data.index == 1)
		{
			$("#tab2").layout().resizeAll();
			$("#tab2").BorderContainer("resize");
//			console.log(data.elem[0]);
		}
	});


//	$(".layui-tab-title > li").click(tabResize);
//	$(".layui-tab-title > li").click(tabResize);
	
	$("#btnResize").click(function(event)
	{
//		var $t = $("#title1");
//		var d = $t.data("events");
		var domObj = $("#title1")[0];
		var d = $._data(domObj,'events');
		var e = d.click;
		alert(e.length);
		alert("e=" + e);
		alert("e[0]=" + e[0]);
		alert(typeof(e[0]));
		alert("e=" + mc.encode(e));
		
//		var c = $(".layui-tab-title > li").each(function(index, dom)
//		{
//			$(this).data("events").click;
//			alert(c.length);
//			alert(typeof(c[0]));
//		});
		
		
//		$("#tab2").layout().resizeAll();
//		$("#tab2").BorderContainer("resize");
	});

	mc.layout.init();
});

tabResize = function(event)
{
	var index = $(".layui-tab-title > li").index($(this));
	
	var content = $(".layui-tab-content > .layui-tab-item")[index];
	var $content = $(content);

	var containerFullName = $content.data("mc-container-fullname");
	if (containerFullName == "mc-BorderContainer")
	{
//		alert($content.attr("id"));
		$content.layout().resizeAll();
		$content.BorderContainer("resize");
	}
//	alert(containerFullName);
};