$(function()
{
	/**
	 * 初始化表格
	 */
	$("#grid1").jqGrid(
	{
		height : 100,
		shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
		rownumbers : true,		/* 序号列 */
		multiselect : true,		/* 启动复选模式 */
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

	/**
	 * 显示grid1尺寸
	 */
	$("#btn1").click(function(event)
	{
		var wrap = $("#grid1_wrap");

		alert("html dom尺寸: clientWidth=" + wrap[0].clientWidth + ", scrollWidth=" + wrap[0].scrollWidth + ", offsetWidth=" + wrap[0].offsetWidth);
		alert("jQuery尺寸: width=" + wrap.width() + ", innerWidth=" + wrap.innerWidth() + ", outerWidth=" + wrap.outerWidth());
	});
	/**
	 * 显示grid2尺寸
	 */
	$("#btn11").click(function(event)
	{
		var wrap = $("#grid2_wrap");

		alert("html dom尺寸: clientWidth=" + wrap[0].clientWidth + ", scrollWidth=" + wrap[0].scrollWidth + ", offsetWidth=" + wrap[0].offsetWidth);
		alert("jQuery尺寸: width=" + wrap.width() + ", innerWidth=" + wrap.innerWidth() + ", outerWidth=" + wrap.outerWidth());
	});

	/**
	 * 手工调整grid1尺寸，自适应
	 */
	$("#btn2").click(function(event)
	{
		//边框2
		$("#grid1").setGridWidth($("#grid1_wrap").innerWidth() - 2);
		//边框2，列头27
		$("#grid1").setGridHeight($("#grid1_wrap").innerHeight() - 27 - 2);
	});

	/**
	 * 手工调整grid2尺寸，自适应
	 */
	$("#btn12").click(function(event)
	{
		//边框2
		$("#grid2").setGridWidth($("#grid2_wrap").innerWidth() - 2);
		//边框2，列头27，分页栏2
		$("#grid2").setGridHeight($("#grid2_wrap").innerHeight() - 27 - 27 - 2);
	});

	/**
	 * 调整grid1外部div尺寸
	 */
	$("#btn3").click(function(event)
	{
		$("#grid1_wrap").width($("#grid1_wrap").width() + 100);
	});

	/**
	 * 调整grid2外部div尺寸
	 */
	$("#btn13").click(function(event)
	{
		$("#grid2_wrap").width($("#grid2_wrap").width() + 100);
		$("#grid2_wrap").height($("#grid2_wrap").height() + 100);
		
		alert($("#grid2_wrap").attr("mc_layout"));
	});

	/**
	 * 为grid1增加自适应填充
	 */
	$("#btn4").click(function(event)
	{
		LayoutUtil.JQGrid_Fit($("#grid1_wrap"), $("#grid1"));
	});

	/**
	 * 为grid2增加自适应填充
	 */
	$("#btn14").click(function(event)
	{
		LayoutUtil.JQGrid_Fit($("#grid2_wrap"), $("#grid2"), $("#grid2_pager"));
	});

	/**
	 * grid1是否有分页栏
	 */
	$("#btn5").click(function(event)
	{
		alert($("#grid1").getGridParam("pager") != "");
	});

	/**
	 * grid2是否有分页栏
	 */
	$("#btn15").click(function(event)
	{
		alert($("#grid2").getGridParam("pager") != "");
	});
});