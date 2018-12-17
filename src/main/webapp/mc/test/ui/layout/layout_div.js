$(function()
{
	/**
	 * 嵌套布局必须使用配置
	 */
/*	$("#div_body").layout();

	$("#div_center").layout();*/


	/**
	 * 显示west尺寸
	 */
	$("#btn1").click(function(event)
	{
		var wrap = $("#div_west");

		alert("html dom尺寸: clientWidth=" + wrap[0].clientWidth + ", scrollWidth=" + wrap[0].scrollWidth + ", offsetWidth=" + wrap[0].offsetWidth);
		
		/**
		 * 此处只有warp.witth()是div大小减去内填充的实际距离
		 */
		alert("jQuery尺寸: width=" + wrap.width() + ", innerWidth=" + wrap.innerWidth() + ", outerWidth=" + wrap.outerWidth());
	});

	/**
	 * 初始化表格
	 */
	$("#grid1").jqGrid(
	{
		height : 100,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
//		pager : "grid1_pager",
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			hidden : true
		},
		{
			name : "deptcode",
			label : "部门编码",
			width : 120
		},
		{
			name : "deptname",
			label : "部门名称",
			width : 120
		} ]
	});

	$("#grid2").jqGrid(
	{
		height : 100,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		pager : "grid2_pager",
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			hidden : true
		},
		{
			name : "deptcode",
			label : "部门编码",
			width : 120
		},
		{
			name : "deptname",
			label : "部门名称",
			width : 120
		} ]
	});

	$("#grid3").jqGrid(
	{
		height : 100,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
		pager : "grid3_pager",
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			hidden : true
		},
		{
			name : "deptcode",
			label : "部门编码",
			width : 120
		},
		{
			name : "deptname",
			label : "部门名称",
			width : 120
		} ]
	});

	$("#grid4").jqGrid(
	{
		height : 100,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
//		pager : "grid4_pager",
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "deptid",
			hidden : true
		},
		{
			name : "deptcode",
			label : "部门编码",
			width : 120
		},
		{
			name : "deptname",
			label : "部门名称",
			width : 120
		} ]
	});

	mc.layout.init_GridPanel();
	mc.layout.init_Layout();

	LayoutUtil.LayoutEvent($("#dialog_content"));
	
	/**
	 * 弹出窗口
	 */
	$("#btn2").click(function(event)
	{
		layer.open(
		{
			type : 1,
			title : "请选择要提交的人",
			/*skin : "layui-layer-lan",*/
			area : ["600px", "320px"],
			content : $("#dialog_content"),
			resize : true,
			maxmin : true,
			btn : ["确定", "取消"]
		});
	});

	$("#btnTest").click(function(event)
	{
		var div = $("div[mc-container='grid']");
		div.each(function(index)
		{
//			alert($(this).attr("class"));
			alert($(this).attr("mc-grid"));
		});
//		alert(div.length);
//		alert(div.html())
//		var div0 = div[0];
//		alert(div0.attr("class"));
//		var div1 = div[1];
//		alert(div1.attr("class"));
//		alert(div1.attr("mc-container"));
	});

	$("#btnTest2").click(function(event)
	{
//		var div = $("#aaa");
//		div.resize(function(event)
//		{
//			alert("111");
//		});
		var button = $("#btnTest5");
		button.click(function(event)
		{
			alert("btnTest5");
		});
	});

	$("#btnTest3").click(function(event)
	{
		var events = $._data($("#btnTest5")[0], "events");
		if (events && events["click"])
		{
			alert("bind click count=" + events["click"].length);
		}
		else
		{
			alert("not bind");
		}
	});

	$("#btnTest4").click(function(event)
	{
		var button = $("#btnTest5");
		button.unbind("click");

		$("#div_west2").unbind("resize");
		$("#div_center2").unbind("resize");
	});
});