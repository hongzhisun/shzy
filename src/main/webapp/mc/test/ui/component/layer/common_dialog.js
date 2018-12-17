MCloud.namespace("MCloud.util");

/**
 * 格式转换工具类
 */
MCloud.util.DialogUtil = {};

/**
 * 缩写定义
 */
DialogUtil = MCloud.util.DialogUtil;

/**
 * 打开对话框
 * 支持传入layer.open的参数
 * 其他参数
 * grid布局参数
 * 取数url
 */
MCloud.util.DialogUtil.open = function(id, option)
{
	var divid = id + "_div_warp";
	var gridid = id + "_grid";
	var dialog_dom_html = "<div id=\"" + divid + "\" class=\"ui-layout-center\" style=\"display : none;\"><table id=\"" + gridid + "\"></table></div>"
	var dom = $(dialog_dom_html);
	$("body").append(dialog_dom_html);

	$("#" + gridid).jqGrid(
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
	$("#" + gridid).addRowData(newRowData1.id, newRowData1);
	var newRowData2 =
	{
		id : 2,
		code : "0102",
		name : "亚太区事业群"
	};
	$("#" + gridid).addRowData(newRowData2.id, newRowData2);
	var newRowData3 =
	{
		id : 3,
		code : "0103",
		name : "大中华区事业群"
	};
	$("#" + gridid).addRowData(newRowData3.id, newRowData3);

	option.id = id;
	option.type = 1;
	option.content = $("#" + divid);
	option.success = function(dom, index)
	{
		/**
		 * 打开对话框后进行布局
		 */
		$("#" + divid).parent().layout(
		{
			onresize : function()
			{
				/**
				 * layout调整后自动调整表格大小
				 * 如果对话框不允许修改大小，则不需要调整
				 */
				$("#" + gridid).setGridWidth($("#" + divid).width());
				$("#" + gridid).setGridHeight($("#" + divid).height() - 30);
			}
		});

		/**
		 * 初次布局完成后调整表格大小
		 */
		$("#" + gridid).setGridWidth($("#" + divid).width());
		$("#" + gridid).setGridHeight($("#" + divid).height() - 30);
	};
	option.resizing = function(dom)
	{
		/**
		 * 对话框大小调整后，重新布局。
		 */
		$("#" + divid).parent().layout().resizeAll();
	},
	option.btn = ["确定", "取消"];
	option.yes = function(index, dom)
	{
		var selectID = $("#" + gridid).getGridParam("selrow");
		if (selectID == null)
		{
			layer.alert("请先选择");
			return;
		}
		var data = $("#" + gridid).getRowData(selectID);
		layer.alert("已选中=" + data.name);
		layer.close(index);
	};
//	option.btn2 = function(index, dom)
//	{
//		layer.alert("取消");
//	};
	option.end = function()
	{

		$("#" + divid).remove();
	};

	layer.open(option);
};