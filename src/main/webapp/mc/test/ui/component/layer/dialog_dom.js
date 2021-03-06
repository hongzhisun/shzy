initLayout = function()
{
	$("body").layout(
	{
		west__size : 300,
		west__minSize : 200,
		west__maxSize : 400,
		onresize : function()
		{
			resizeGrid();
		}
	});

	$("#grid_left").jqGrid(
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
			label : "公司编号",
			index : "code",
			width : 90
		},
		{
			name : "name",
			label : "公司名称",
			index : "name",
			width : 100
		} ]
	});

	var newRowData =
	{
		id : 1,
		code : "NT",
		name : "新致软件股份有限公司"
	};
	$("#grid_left").addRowData(newRowData.id, newRowData);

	$("#grid_right").jqGrid(
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
		code : "NT",
		name : "总裁室"
	};
	$("#grid_right").addRowData(newRowData1.id, newRowData1);
	var newRowData2 =
	{
		id : 2,
		code : "NT",
		name : "亚太区事业群"
	};
	$("#grid_right").addRowData(newRowData2.id, newRowData2);
	var newRowData3 =
	{
		id : 3,
		code : "NT",
		name : "大中华区事业群"
	};
	$("#grid_right").addRowData(newRowData3.id, newRowData3);
	var newRowData4 =
	{
		id : 4,
		code : "NT",
		name : "美洲区事业群"
	};
	$("#grid_right").addRowData(newRowData4.id, newRowData4);

	resizeGrid();

	$(window).resize(function()
	{
		resizeGrid();
	});
};

resizeGrid = function()
{
	$("#grid_left").setGridWidth($("#panel_left").width());
	$("#grid_left").setGridHeight($("#panel_left").height() - 30);
	$("#grid_right").setGridWidth($("#panel_right").width());
	$("#grid_right").setGridHeight($("#panel_right").height() - 30);
};

$(function()
{
	initLayout();
});