/**
 * JasperReport经典查询对象
 */
var jrcv = null;

initUI = function()
{
	/**
	 * 创建JasperReport经典查询对象
	 */
	jrcv = new mc.jrcv(
	{
		ui : 
		{
			report_panel_name : "reportpanel",	// 报表iframe区域name。不填写默认为reportpanel。
			page_mode : false,					// 是否分页。默认为false。
			button_id : 						// 按钮id配置
			{
				export_all : 					// 导出全部
				{
					excel : "btnExportExcel",	// 导出全部为Excel
					pdf : "btnExportPDF"		// 导出全部为pdf
				},
				refresh : "btnRefresh"			// 刷新
			}
		},
		url : "/demo/report/unitreport",		// url请求路径。必填。
		post_param : 							// 提交参数
		{
			/**
			 * 查看报表jasper文件路径(非url)，从webapp/webRoot目录算起。
			 * 必填。
			 */
			jasper : "/mc/demo/report/unitreport/unitreport.jasper",
			/**
			 * 报表标题，必填。
			 */
			title : "公司用户统计(非分页)",
			/**
			 * 导出/下载默认文件名。
			 */
			fileName : "公司用户统计(非分页)"	
		}
	});

	/**
	 * 创建查询参数对话框
	 */
	$("#queryParamDialog").UnitReportQueryDialog(
	{
		dialog :
		{
			yes : function(index, $dom)
			{
				/**
				 * 获取参数
				 */
				var param = $("#queryParamDialog").UnitReportQueryDialog("getParam");
				
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
		$("#queryParamDialog").UnitReportQueryDialog("open");
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
		$("#queryParamDialog").UnitReportQueryDialog("open");
	}, 500);
});