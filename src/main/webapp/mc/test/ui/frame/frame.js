$(function()
{
	layui.element.init();

	$("#myIFrame").attr("src", "http://www.taobao.com");

	$("#btn1").click(function(event)
	{
		var html = "<li id='abc' class='layui-nav-item'><a href=''>新模块2</a></li>";
		$("#module").empty();
		$("#module").append(html);
	
		layui.element.init();
	});

	$("#cw_1").click(function(event)
	{
		var html = "<li id='cw_1_1' class=\"layui-nav-item\"><a href=\"#\">会计期管理</a></li>";
		html += "<li id='cw_1_2' class=\"layui-nav-item\"><a href=\"#\">科目管理</a></li>";
		html += "<li id='cw_1_3' class=\"layui-nav-item\"><a href=\"#\">分户管理</a></li>";
		html += "<li id='cw_1_4' class=\"layui-nav-item\"><a href=\"#\">现金流量管理</a></li>";

		$("#menu").empty();
		$("#menu").append(html);
		layui.element.init();

		$("#cw_1_1").click(function(event)
		{
			$("#breadcrumb").empty();
			$("#breadcrumb").append("<a><cite>财务管理</cite></a><a><cite>账务设置</cite></a><a><cite>会计期管理</cite></a>");
			layui.element.init();
		});
		$("#cw_1_2").click(function(event)
		{
			$("#breadcrumb").empty();
			$("#breadcrumb").append("<a><cite>财务管理</cite></a><a><cite>账务设置</cite></a><a><cite>科目管理</cite></a>");
			layui.element.init();
		});
		$("#cw_1_3").click(function(event)
		{
			$("#breadcrumb").empty();
			$("#breadcrumb").append("<a><cite>财务管理</cite></a><a><cite>账务设置</cite></a><a><cite>分户管理</cite></a>");
			layui.element.init();
		});
		$("#cw_1_4").click(function(event)
		{
			$("#breadcrumb").empty();
			$("#breadcrumb").append("<a><cite>财务管理</cite></a><a><cite>账务设置</cite></a><a><cite>现金流量管理</cite></a>");
			layui.element.init();
		});
	});
	$("#cw_2").click(function(event)
	{
		var html = "<li class=\"layui-nav-item\"><a href=\"#\">制证</a></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">查询</a></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">审核</a></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">出纳</a></li>";

		$("#menu").empty();
		$("#menu").append(html);
		layui.element.init();
	});
	$("#cw_3").click(function(event)
	{
		var html = "<li class=\"layui-nav-item\"><a href=\"#\">总分类账</a></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">日记账</a></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">明细账</a></li>";

		$("#menu").empty();
		$("#menu").append(html);
		layui.element.init();
	});

	$("#xt").click(function(event)
	{
		var html = "<li class=\"layui-nav-item\"><a href=\"#\">企业组织</a>";
		html += "<dl class=\"layui-nav-child\">";
		html += "<dd><a href=\"#\">公司</a></dd>";
		html += "<dd><a href=\"#\">部门</a></dd>";
		html += "</dl></li>";
		html += "<li class=\"layui-nav-item\"><a href=\"#\">安全设置</a>";
		html += "<dl class=\"layui-nav-child\">";
		html += "<dd><a href=\"#\">用户管理</a></dd>";
		html += "<dd><a href=\"#\">角色管理</a></dd>";
		html += "<dd><a href=\"#\">权限分配</a></dd>";
		html += "</dl></li>";
		
		$("#menu").empty();
		$("#menu").append(html);
		layui.element.init();
	});


		
	createBreadCrumb = function()
	{
	};
});