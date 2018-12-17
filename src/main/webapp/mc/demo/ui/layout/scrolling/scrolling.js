init_FormContainer = function()
{
	$("#inputNumber").NumberField();
	$("#inputMoney").MoneyField();
	$("#dateStart").DateField();
	$("#cmbProvince").ProvinceComboBox();
	$("#fieldProvince").ProvinceField();
};

init_FormContainer1 = function()
{
	$("#inputNumber1").NumberField();
	$("#inputMoney1").MoneyField();
	$("#dateStart1").DateField();
	$("#cmbProvince1").ProvinceComboBox();
	$("#fieldProvince1").ProvinceField();
};

init_FormContainer2 = function()
{
	$("#inputNumber2").NumberField();
	$("#inputMoney2").MoneyField();
	$("#dateStart2").DateField();
	$("#cmbProvince2").ProvinceComboBox();
	$("#fieldProvince2").ProvinceField();
};

init_FormContainer3 = function()
{
	$("#inputNumber3").NumberField();
	$("#inputMoney3").MoneyField();
	$("#dateStart3").DateField();
	$("#cmbProvince3").ProvinceComboBox();
	$("#fieldProvince3").ProvinceField();
};

$(function()
{
	init_FormContainer();
	init_FormContainer1();
	init_FormContainer2();
	init_FormContainer3();

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

	var tree2 = $.fn.zTree.init($("#tree2"), setting, initData);
	tree2.reAsyncChildNodes(null, "refresh");

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

	$("#grid3").jqGrid(
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
			pager : "#grid3_pager",
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

	$("#grid4").jqGrid(
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
			pager : "#grid4_pager",
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

    mc.layout.init();
});