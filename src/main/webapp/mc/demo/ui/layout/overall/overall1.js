$(function()
{
	$("#inputNumber1").NumberField();

	$("#inputMoney1").MoneyField();

	$("#dateStart1").DateField();

	$("#cmbProvince1").ProvinceComboBox();

	$("#fieldProvince1").ProvinceField();

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

	mc.layout.init();
});