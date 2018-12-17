
/**
 * 页面初始化
 */
$(function()
{
	wf_ff_init();
	mc.layout.init();
});

wf_ff_init = function () {
	var panelTopLeft = $('#panelTopLeft');
	var panelTopLeft_w = panelTopLeft.width();
	var panelTopCenter = $('#panelTopCenter');
	panelTopCenter.css('left',panelTopLeft_w);

	init_Grid_checkhistory();
	init_Grid_attach();
	tab_init();
	init_panelFrameBottom();
};

tab_init = function(){
	var element = layui.element;
	element.on('tab', function(data)
	{
		/*if (data.index == 1)
		{
			$("#tab2").layout().resizeAll();
			$("#tab2").BorderContainer("resize");
		}*/
		switch(data.index){
			case 0:
				$("#tab1").layout().resizeAll();
				$("#tab1").BorderContainer("resize");
				break;
			case 1:
				$("#tab2").layout().resizeAll();
				$("#tab2").BorderContainer("resize");
				break;
			case 2:
				$("#tab3").layout().resizeAll();
				$("#tab3").BorderContainer("resize");
				break;
		}
	});
};

init_Grid_checkhistory = function(){
	$("#grid_checkhistory").jqGrid(
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
};

init_Grid_attach = function(){
	$("#grid_attach").jqGrid(
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
};

//底部滑出层
init_panelFrameBottom = function () {
	var slide_bar = $('.wf-ff-slide-bar');
	var panelFrameBottom = $('.wf-ff-panelFrameBottom');
	var panelFrameBottom_h = panelFrameBottom.height();
	panelFrameBottom.css('bottom',-panelFrameBottom_h + 'px');
	slide_bar.on({
		mouseenter:function () {
			$(this).parent().stop().animate({bottom:'0px'});
			$(this).text('点击隐藏');
		},
		click:function () {
			$(this).parent().stop().animate({bottom:-panelFrameBottom_h + 'px'},1000);
			$(this).text('附件信息');
		}
	});
};
