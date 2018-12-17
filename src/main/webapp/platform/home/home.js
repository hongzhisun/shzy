/**
 * 初始化首页内容
 */
init_Bullet = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/dept/list",	/* 取数url */
		pager : "#gridBullet_pager",
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "date",
			label : "发布时间",
			width : 100,
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.read == 1)
				{
					return cellValue;
				}
				else
				{
					return "<span style='font-weight: bold;'>" + cellValue + "</span>";
				}
			}
		},
		{
			name : "title",
			label : "标题",
			width : 300,
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.read == 1)
				{
					return cellValue;
				}
				else
				{
					return "<span style='font-weight: bold;'>" + cellValue + "</span>";
				}
			}
		},
		{
			name : "content",
			label : "内容",
			width : 350,
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.read == 1)
				{
					return cellValue;
				}
				else
				{
					return "<span style='font-weight: bold;'>" + cellValue + "</span>";
				}
			}
		},
		{
			name : "read",
			hidden : true
		},
		{
			name : "read_text",
			label : "状态",
			width : 60,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.read == 1)
				{
					return "";
				}
				else
				{
					return "<span style='font-weight: bold;'>未读</span>";
				}
			}
		} ]
	});

	$("#gridBullet").jqGrid(gridOption);

/*	$("#gridBullet").jqGrid("setGridParam",
	{
		datatype : "json",
		postData : {}
	}).trigger("reloadGrid");*/
	var data =
	[ 
		{ id : "1", date : "2017-11-06", title : "2017年xx软件“产品@xx行业云”秋季研讨会盛大召开",
			content : "11月6日，xx软件2017年秋季研讨会在上海xx湖皇冠假日酒店顺利召开，会议的主题是“产品xxx行业云”，与近日举办的xx各行业分会结合，共同描绘xx软件的发展蓝图。值得一提的是，此次会议由140人总监级以上干部参加。我们欣喜地看到，xx各行业已然孕育出一批又一批更加年轻的骨干，未来必有一番作为。",
			read : 0 },
		{ id : "2", date : "2017-09-25", title : "【国务院副秘书长、国管局局长xxx来访贵州xx普惠纪实】传承企业优良基因 引领贵安新区数字经济产业发展",
			content : "9月18日，国务院副秘书长、国管局局长xxx，在贵安新区党工委书记xxx及花溪大学城管委会党工委书记xxx、数字经济产业园区领导陪同下，莅临贵州xx普惠观摩考察。",
			read : 0 },
		{ id : "3", date : "2017-09-11", title : "上百家企业入驻xx云“三地四中心”",
			content : "伴随着大数据、云计算、人工智能的快速发展，各企业转型势在必行，而巨大的数据量需要大量服务器来支撑计算及处理，在此背景下，很多企业选择“云化”提高资源利用率、减少运营成本，截至目前，已有上百家企业入驻xx云的数据中心，实现系统上云。",
			read : 1 } 
	];

	$("#gridBullet")[0].addJSONData(data);
};

init_WorkItem = function()
{
	var gridOption = mc.grid.createInitOption("single", "page",
	{
		url : "sm/dept/list",	/* 取数url */
		pager : "#gridWorkItem_pager",
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "type",
			label : "类型",
			width : 100,
			align : "center"
		},
		{
			name : "title",
			label : "标题",
			width : 250
		},
		{
			name : "applyuser",
			label : "申请人",
			width : 100,
			align : "center"
		},
		{
			name : "dept",
			label : "部门",
			width : 100,
			align : "center"
		},
		{
			name : "applydate",
			label : "申请时间",
			width : 120,
			align : "center"
		},
		{
			name : "money",
			label : "金额",
			width : 120,
			align : "right",
			formatter : "currency"
		} ]
	});

	$("#gridWorkItem").jqGrid(gridOption);

/*	$("#gridWorkItem").jqGrid("setGridParam",
	{
		datatype : "json",
		postData : {}
	}).trigger("reloadGrid");*/

	var data =
	[ 
        { id : "1", type : "出差申请", title : "贵阳贵安新区xx客户会议",
        	applyuser : "陈健", dept : "市场部", applydate : "2017-12-16", money : 0 },
		{ id : "2", type : "差旅报销", title : "黑龙江yy项目现场招标",
        	applyuser : "崔军", dept : "市场部", applydate : "2017-12-13", money : 4300.00 },
		{ id : "3", type : "维修费报销", title : "研发部kk代码托管服务器维修费报销",
        	applyuser : "甘浩", dept : "运维部", applydate : "2017-12-11", money : 2380.00 }
	];

	$("#gridWorkItem")[0].addJSONData(data);
};

$(function()
{
	init_Bullet();

	init_WorkItem();

	mc.layout.init();
});