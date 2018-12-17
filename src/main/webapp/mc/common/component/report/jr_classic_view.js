MCloud.namespace("MCloud.util");

/**
 * JasperReport经典查询对象
 * @author	yulei
 * 支持经典JasperReport模式报表的
 * 查询
 * 分页查询
 * 导出
 * 导出当前页
 * 导出全部页
 * 支持导出Excel、PDF等格式
 *  
 * @init_param	初始化参数
 * {
 * 		ui : 
 * 		{
 * 			report_panel_name : "reportpanel",	// 报表iframe区域name。不填写默认为reportpanel。
 * 			page_mode : false,		// 是否分页。默认为false。
 * 			page_id : "",			// 分页栏id。如果page_mode=true，必填。
 * 			page_param :			// 分页栏配置参数，同laypage组件初始化参数。
 * 			{
 *				limit : 20,					// 初始每页行数 
 *				limits : [10, 20, 50, 100],	// 每页行数选项
 *				prev : "<i class='layui-icon layui-icon-left'></i>",
 *				next : "<i class='layui-icon layui-icon-right'></i>",
 *				layout : ["prev", "page", "next", "skip", "limit", "refresh", "count"],
 *				skip: true,
 * 			},
 * 			button_id : 			// 按钮id配置
 * 			{
 * 				export_all :		// 导出全部
 * 				{
 * 					excel : "",		// 导出全部为Excel
 * 					pdf : ""		// 导出全部为pdf
 * 				},
 * 				export_page : 		// 导出当页
 * 				{
 * 					excel : "",		// 导出当页为Excel
 * 					pdf : ""		// 导出当页为pdf
 * 				},
 * 				refresh : ""		// 刷新
 * 			}
 * 		},
 * 		url : "",					// url请求路径。必填。
 * 		post_param : 				// 提交参数
 * 		{
 * 			jasper : "",			// 查看报表jasper文件路径(非url)，从webapp/webRoot目录算起。必填。
 * 			jasper_export : "",		// 导出jasper文件路径(非url)，从webapp/webRoot目录算起。可为空，如不填写则导出格式与查看报表格式相同
 * 			title : "",				// 报表标题，必填。
 * 			fileName : ""			// 导出/下载默认文件名。
 * 		}
 * }
 */
MCloud.util.JasperReportClassicView = function(init_param)
{
	/**
	 * 初始化参数
	 */
	this.m_InitParam = init_param;

	/**
	 * 报表查询地址
	 */
	this.m_ReportUrl = "";
	/**
	 * 分页报表数量查询地址
	 */
	this.m_ReportCountUrl = "";
	
	/**
	 * 查询参数
	 */
	this.m_PostParam = {};
	/**
	 * 查询批次ID
	 * 每次提交查询之前生成一个新的GUIDID
	 */
	this.m_ReportBulkID = "";

	/**
	 * 是否分页模式
	 */
	this.isPageMode = function()
	{
		return (this.m_InitParam.ui.page_mode === true);
	};
	/**
	 * 分页栏渲染参数
	 */
	this.m_PageParam = {};
	this.getPageStart = function()
	{
		return (this.m_PageParam.curr - 1) * this.getPageLimit();
	};
	this.getPageLimit = function()
	{
		return this.m_PageParam.limit;
	};

	/**
	 * 获取报表面板
	 */
	this.getReportPanelName = function()
	{
		return (this.m_InitParam.ui.report_panel_name ? this.m_InitParam.ui.report_panel_name : "reportpanel");		
	};

	/**
	 * @private
	 * 初始化界面
	 */
	this.init = function()
	{
		var report_url = "";
		if (this.m_InitParam.url[0] === "/")
		{
			report_url = this.m_InitParam.url.substr(1);
		}

		this.m_ReportUrl = report_url + "/report";
		if (this.isPageMode())
		{
    		this.m_ReportCountUrl = report_url + "/count";
		}

		this.init_report_view();

		this.init_button();

		this.init_paging();
	};

	/**
	 * @private
	 * 初始化报表区域
	 */
	this.init_report_view = function()
	{
	};

	/**
	 * @private
	 * 初始化按钮
	 */
	this.init_button = function()
	{
		if (this.isPageMode())
		{
			$("#" + this.m_InitParam.ui.button_id.export_all.excel).click($.proxy(this.exportExcelAll, this));
			$("#" + this.m_InitParam.ui.button_id.export_all.excel).prop("disabled", true);
			$("#" + this.m_InitParam.ui.button_id.export_all.pdf).click($.proxy(this.exportPDFAll, this));
			$("#" + this.m_InitParam.ui.button_id.export_all.pdf).prop("disabled", true);
			$("#" + this.m_InitParam.ui.button_id.export_page.excel).click($.proxy(this.exportExcelPage, this));
			$("#" + this.m_InitParam.ui.button_id.export_page.excel).prop("disabled", true);
			$("#" + this.m_InitParam.ui.button_id.export_page.pdf).click($.proxy(this.exportPDFPage, this));
			$("#" + this.m_InitParam.ui.button_id.export_page.pdf).prop("disabled", true);
		}
		else
		{
			$("#" + this.m_InitParam.ui.button_id.export_all.excel).click($.proxy(this.exportExcelAll, this));
			$("#" + this.m_InitParam.ui.button_id.export_all.excel).prop("disabled", true);
			$("#" + this.m_InitParam.ui.button_id.export_all.pdf).click($.proxy(this.exportPDFAll, this));
			$("#" + this.m_InitParam.ui.button_id.export_all.pdf).prop("disabled", true);
		}

		$("#" + this.m_InitParam.ui.button_id.refresh).click($.proxy(this.refreshEvent, this));
		$("#" + this.m_InitParam.ui.button_id.refresh).prop("disabled", true);
	};

	/**
	 * @private
	 * 初始化分页栏
	 */
	this.init_paging = function()
	{
		if (! this.isPageMode())
		{
			return;
		}

		var paging = $("#" + this.m_InitParam.ui.page_id);
		if ((! mc.isjquery(paging)) || paging.length <= 0)
		{
			alert("分页栏id未找到");
			return;
		}

		/**
		 * 根据默认参数和外部传入的初始化参数，创建分页栏基本渲染参数
		 */
		this.m_PageParam = $.extend({},
		{
			elem : this.m_InitParam.ui.page_id,
			limit : 50,
			limits : [20, 50, 100],
			curr : 1,
			prev : "<i class='layui-icon layui-icon-left'></i>",
			next : "<i class='layui-icon layui-icon-right'></i>",
			layout : ["prev", "page", "next", "skip", "limit", "refresh", "count"],
			skip: true,
			jump : $.proxy(this.pageJumpEvent, this)
		}, this.m_InitParam.ui.page_param);

		/**
		 * 分页栏初始状态，行数与页数都为0
		 */
		layui.laypage.render($.extend({}, this.m_PageParam,
		{
			count : 0,
			pages : 0
		}));
	};

	this.pageJumpEvent = function(obj, first)
	{
		console.log(mc.encode(obj));
		if (! first)
		{
			this.m_PageParam = obj;

			this.refreshEvent();
		}
	};

	/**
	 * @public
	 * 带参数查询
	 * 如有分页则回到第一页
	 * @post_param	提交报表参数
	 */
	this.query = function(post_param)
	{
		this.m_PostParam = $.extend({}, this.m_InitParam.post_param, post_param);

		if (! this.isPageMode())
		{
			this.queryReportData(this.m_ReportUrl,
				this.m_PostParam,
				"view",
				this.getReportPanelName(),
				"html");
		}
		else
		{
			this.queryReportData(this.m_ReportUrl,
				this.m_PostParam,
				"view",
				this.getReportPanelName(),
				"html",
				0,
				this.getPageLimit());
		}
	};

	/**
	 * 刷新数据方法
	 */
	this.refreshEvent = function(event)
	{
		if (! this.isPageMode())
		{
			this.queryReportData(this.m_ReportUrl,
				this.m_PostParam,
				"view",
				this.getReportPanelName(),
				"html");
		}
		else
		{
			this.queryReportData(this.m_ReportUrl,
				this.m_PostParam,
				"view",
				this.getReportPanelName(),
				"html",
				this.getPageStart(),
				this.getPageLimit());
		}
	};

	/**
	 * 导出
	 */
	this.exportExcelAll = function(event)
	{
		this.queryReportData(this.m_ReportUrl,
			this.m_PostParam,
			"export",
			this.getReportPanelName(),
			"xlsx");
	};
	this.exportPDFAll = function(event)
	{
		this.queryReportData(this.m_ReportUrl,
			this.m_PostParam,
			"export",
			this.getReportPanelName(),
			"pdf");
	};
	this.exportExcelPage = function(event)
	{
		this.queryReportData(this.m_ReportUrl,
			this.m_PostParam,
			"export",
			this.getReportPanelName(),
			"xlsx",
			this.getPageStart(),
			this.getPageLimit());
	};
	this.exportPDFPage = function(event)
	{
		this.queryReportData(this.m_ReportUrl,
			this.m_PostParam,
			"export",
			this.getReportPanelName(),
			"pdf",
			this.getPageStart(),
			this.getPageLimit());
	};

	/**
	 * @private
	 * 报表查询核心方法
	 * @url 		报表action url
	 * @postParam 	查询参数
	 * @opertype 	操作类型	view为内嵌查询，export为导出/下载
	 * @target		报表输出目标
	 * 				"_blank"	下载	
	 * 				null		内嵌查询，报表输出到<iframe name='reportpanel'>元素上
	 * 				其他			内嵌查询，报表输出到指定元素上
	 * @format		返回格式，内嵌查询为html，导出/下载为xls/xlsx/pdf等
	 * @start		分页参数
	 * @limit		分页参数
	 */
	this.queryReportData = function(url, postParam, opertype, target, format, start, limit)
	{
		this.m_ReportBulkID = GuidUtil.createGuid();

		var oForm = document.createElement("form");
		oForm.style = "display : none;";
		oForm.method = "post";
		oForm.action = url;

		/**
		 * target默认嵌入页面展现，否则按target下载
		 */
		oForm.target = target ? target : "reportpanel";

		/**
		 * 准备查询参数
		 */
		for (var prop in postParam)
		{
			var oInput = document.createElement("input");
			oInput.name = prop;
			oInput.value = postParam[prop];
			oForm.appendChild(oInput);
		}

		/**
		 * 查询批次ID
		 */
		var oInputView = document.createElement("input");
		oInputView.name = "opertype";
		oInputView.value = opertype ? opertype : "view";
		oForm.appendChild(oInputView);

		/**
		 * 查询批次ID
		 */
		var oInputBulkID = document.createElement("input");
		oInputBulkID.name = "reportbulkid";
		oInputBulkID.value = this.m_ReportBulkID
		oForm.appendChild(oInputBulkID);

		/**
		 * 导出格式参数
		 */
		var oInputFormat = document.createElement("input");
		oInputFormat.name = "format";
		oInputFormat.value = format ? format : "html";
		oForm.appendChild(oInputFormat);

		/**
		 * 分页参数
		 */
		if (limit != undefined && limit != null && limit > 0)
		{
			var oInputStart = document.createElement("input");
			oInputStart.name = "start";
			oInputStart.value = start;
			oForm.appendChild(oInputStart);

			var oInputLimit = document.createElement("input");
			oInputLimit.name = "limit";
			oInputLimit.value = limit;
			oForm.appendChild(oInputLimit);
		}

		document.body.appendChild(oForm);

		oForm.submit(this.loadMask());
	};

	/**
	 * @private
	 * 提交后等待报表加载完成
	 */
	this.loadMask = function()
	{
		mc.showMask();
		var timer = setInterval($.proxy(function()
		{
			var reportPanelName = this.getReportPanelName()
			var elements = document.getElementsByName(reportPanelName);
			if (elements.length <= 0)
			{
				mc.alert("未找到[name=" + reportPanelName + "]的元素");
				mc.hideMask();
				clearInterval(timer);
				return;
			}
			else if (elements.length > 1)
			{
				mc.alert("找到多个[name=" + reportPanelName + "]的元素");
				mc.hideMask();
				clearInterval(timer);
				return;
			}

			var formIframe = elements[0];
			var innerBd = formIframe.contentWindow.document.body;
			if (innerBd != null)
			{
				mc.hideMask();
			}
			
			if (innerBd != null && innerBd.getElementsByTagName("table").length != 0)
			{
				if (this.isPageMode())
				{
					/**
					 * 刷新分页栏数量
					 */
					this.refreshPagingData();

					$("#" + this.m_InitParam.ui.button_id.export_all.excel).prop("disabled", false);
					$("#" + this.m_InitParam.ui.button_id.export_all.pdf).prop("disabled", false);
					$("#" + this.m_InitParam.ui.button_id.export_page.excel).prop("disabled", false);
					$("#" + this.m_InitParam.ui.button_id.export_page.pdf).prop("disabled", false);
				}
				else
				{
					$("#" + this.m_InitParam.ui.button_id.export_all.excel).prop("disabled", false);
					$("#" + this.m_InitParam.ui.button_id.export_all.pdf).prop("disabled", false);
				}
				
				$("#" + this.m_InitParam.ui.button_id.refresh).prop("disabled", false);

				clearInterval(timer);
			}
		}, this), 500);
	};

	/**
	 * 刷新分页栏数量
	 */
	this.refreshPagingData = function()
	{
		$.ajax(
		{
			url : this.m_ReportCountUrl,
			type : "post",
			async : false,
			data :
			{
				reportbulkid : this.m_ReportBulkID
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					var count = data.msg;

					var param = $.extend({}, this.m_PageParam,
					{
						count : count
					});

					layui.laypage.render(param);
				}
				else
				{
					mc.alert("错误", r.msg);
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.alert("failure");
			}
		});
	};

	this.init();
};

/**
 * 快捷访问方式
 */
JasperReportClassicView = MCloud.util.JasperReportClassicView;
mc.jrcv = MCloud.util.JasperReportClassicView;