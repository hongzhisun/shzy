/**
 * JasperReport经典查询对象
 */
var jrcv = null;

initUI = function()
{
	$("#btnQuestion").click(function(event)
	{
		alert(layui.laypage.index);
	});

	/**
	 * 创建JasperReport经典查询对象
	 */
	jrcv = new mc.jrcv(
	{
		ui :
		{
			report_panel_name : "reportpanel",		// 报表iframe区域name。不填写默认为reportpanel。
			page_mode : true,						// 是否分页。默认为false。
 			page_id : "paging",						// 分页栏id。如果page_mode=true，必填。
 			page_param :							// 分页栏配置参数，同laypage组件初始化参数。
 			{
 				limit : 10,							// 初始每页行数 
 				limits : [5, 10, 20, 100],			// 每页行数选项
			},
			button_id :								// 按钮id配置
			{
				export_all :						// 导出全部
				{
					excel : "btnExportExcelAll",	// 导出全部为Excel
					pdf : "btnExportPDFAll"			// 导出全部为pdf
				},
				export_page :						// 导出当页
				{
					excel : "btnExportExcelPage",	// 导出当页为Excel
					pdf : "btnExportPDFPage"		// 导出当页为pdf
				},
				refresh : "btnRefresh"				// 刷新
			}
		},
		url : "/demo/report/deptpagereport",		// url请求路径。必填。
		post_param : 								// 提交参数
		{
			/**
			 * 查看报表jasper文件路径(非url)，从webapp/webRoot目录算起。
			 * 必填。
			 */
			jasper : "/mc/demo/report/deptpagereport/deptpagereport.jasper",
			/**
			 * 导出jasper文件路径(非url)，从webapp/webRoot目录算起。
			 * 可为空，如不填写则导出格式与查看报表格式相同
			 */
			jasper_export : "/mc/demo/report/deptpagereport/deptpagereport_export.jasper",
			/**
			 * 报表标题，必填。
			 */
			title : "部门用户统计(分页)",
			/**
			 * 导出/下载默认文件名。
			 */
			fileName : "部门用户统计(分页)"
		}
	});
	
	/**
	 * 创建查询参数对话框
	 */
	$("#queryParamDialog").DeptPageReportQueryDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				/**
				 * 获取参数
				 */
				var param = $("#queryParamDialog").DeptPageReportQueryDialog("getParam");

				/**
				 * 开始查询报表
				 */
				jrcv.query(
				{
					jsonCondition : mc.encode(param)
				});
			}
		}
	});

	$("#btnQuery").click(function(event)
	{
		$("#queryParamDialog").DeptPageReportQueryDialog("open");
	});
};

$(function()
{
	initUI();
	
	mc.layout.init();

	/**
	 * 页面初始化后，直接打开查询参数对话框
	 * 暂时需要延迟一定时间，否则对话框样式不正确。
	 */
	setTimeout(function()
	{
		$("#queryParamDialog").DeptPageReportQueryDialog("open");
	}, 500);
});
 