$(function() 
{
	$("a#tab_event").click(function(event)
	{
		var breadCrumbNavNameArray = ["开发教程", "前端布局", "Tab选项卡", "组件接口与事件"];
		
		top.mainFrame.openOutterPage("mc/demo/ui/layout/tab/tab_event.jsp", breadCrumbNavNameArray);
	});

	$("a#tab_border").click(function(event)
	{
		var breadCrumbNavNameArray = ["开发教程", "前端布局", "Tab选项卡", "用于自适应布局"];
		
		top.mainFrame.openOutterPage("mc/demo/ui/layout/tab/tab_border.jsp", breadCrumbNavNameArray);
	});

	$("a#tab_scrolling").click(function(event)
	{
		var breadCrumbNavNameArray = ["开发教程", "前端布局", "Tab选项卡", "用于滚动布局"];
		
		top.mainFrame.openOutterPage("mc/demo/ui/layout/tab/tab_scrolling.jsp", breadCrumbNavNameArray);
	});

	$("a#tab_inner").click(function(event)
	{
		var breadCrumbNavNameArray = ["开发教程", "前端布局", "Tab选项卡", "内部页面布局"];
		
		top.mainFrame.openOutterPage("mc/demo/ui/layout/tab/tab_inner.jsp", breadCrumbNavNameArray);
	});
});