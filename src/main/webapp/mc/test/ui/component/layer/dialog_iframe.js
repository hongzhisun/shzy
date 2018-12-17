initLayout = function()
{
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
};

get_SelectID = function()
{
	return $("#grid_department").getGridParam("selrow");
	if (selectID == null)
	{
		layer.alert("请先选择");
		return;
	}
	var data = $("#grid_department").getRowData(selectID);
	layer.alert("已选中=" + data.name);

};

get_SelectData = function()
{
	var selectID = $("#grid_department").getGridParam("selrow");

	return $("#grid_department").getRowData(selectID);
};

$(function()
{
	initLayout();
});