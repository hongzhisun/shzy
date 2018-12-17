init_TabContainer1 = function()
{
	/**
	 * 获取选项卡总数，包含隐藏的选项卡。
	 */
	$("#btnTabCount").click(function(event)
	{
		mc.msg("选项卡页面数量=" + $("#tabContainer1").TabContainer("getTabCount"));
	});

	/**
	 * 获取当前选项卡标题id。
	 */
	$("#btnGetActiveTabTitleId").click(function(event)
	{
		mc.msg("当前选项卡标题id=" + $("#tabContainer1").TabContainer("getActiveTabTitleId"));
	});

	/**
	 * 获取当前选项卡内容页面id。
	 */
	$("#btnGetActiveTabContentId").click(function(event)
	{
		mc.msg("当前选项卡内容页id=" + $("#tabContainer1").TabContainer("getActiveTabContentId"));
	});

	/**
	 * 获取当前选项卡序号。序号从0开始。
	 */
	$("#btnGetActiveTabIndex").click(function(event)
	{
		mc.msg("当前选项卡序号=" + $("#tabContainer1").TabContainer("getActiveTabIndex"));
	});

	/**
	 * 切换到“id=title2”的选项卡页面
	 */
	$("#btnChangeTabByTitleId").click(function(event)
	{
		$("#tabContainer1").TabContainer("changeTab", "title2");
		mc.msg("已切换到“id=title2”选项卡");
	});
	/**
	 * 切换到“id=title2”的选项卡页面
	 */
	$("#btnChangeTabByContentId").click(function(event)
	{
		$("#tabContainer1").TabContainer("changeTab", "tab2");
		mc.msg("已切换到“id=tab2”选项卡");
	});
	/**
	 * 切换到“index=0”的选项卡页面
	 */
	$("#btnChangeTabByIndex").click(function(event)
	{
		$("#tabContainer1").TabContainer("changeTab", 0);
		mc.msg("已切换到“index=0”选项卡");
	});
	/**
	 * 切换选项卡页面（错误参数）
	 */
	$("#btnChangeTabError").click(function(event)
	{
		$("#tabContainer1").TabContainer("changeTab", "aaaa");
		mc.msg("参数错误则不切换");
	});
};

init_TabContainer2 = function()
{
	/**
	 * 获取标题文本（序号=1）
	 */
	$("#btnGetTabTitleByIndex").click(function(event)
	{
		var title = $("#tabContainer2").TabContainer("getTabTitle", 1);
		mc.alert("序号=1的选项卡，标题文本=" + title);
	});
	/**
	 * 获取标题文本（id=title2）
	 */
	$("#btnGetTabTitleById").click(function(event)
	{
		var title = $("#tabContainer2").TabContainer("getTabTitle", "title2");
		mc.alert("id=title2的选项卡，标题文本=" + title);
	});
	/**
	 * 获取当前标题文本（不传入参数）
	 */
	$("#btnGetTabTitle").click(function(event)
	{
		var title = $("#tabContainer2").TabContainer("getTabTitle");
		mc.alert("当前选项卡，标题文本=" + title);
	});

	/**
	 * 设置标题文本（序号=1）
	 */
	$("#btnSetTabTitleByIndex").click(function(event)
	{
		$("#tabContainer2").TabContainer("setTabTitle", "新标题<span style='color: red;'>(1)</span>", 1);
	});
	/**
	 * 设置标题文本（id=title2）
	 */
	$("#btnSetTabTitleById").click(function(event)
	{
		$("#tabContainer2").TabContainer("setTabTitle", "新标题<span style='color: red;'>(2)</span>", "title2");
	});
	/**
	 * 设置当前标题文本（不传入参数）
	 */
	$("#btnSetTabTitle").click(function(event)
	{
		$("#tabContainer2").TabContainer("setTabTitle", "新标题<span style='color: red;'>(3)</span>");
	});

};

init_TabContainer3 = function()
{
	/**
	 * 获取标题对象（序号=1）
	 */
	$("#btnGetTabTitleElementByIndex").click(function(event)
	{
		var $tabTitle = $("#tabContainer3").TabContainer("getTabTitleElement", 1);
		var msg = "序号=1的选项卡标题<br>";
		msg += "html标签=" + $tabTitle[0].tagName + "<br>"
		msg += "id=" + $tabTitle[0].id + "<br>"
		msg += "class=" + $tabTitle.attr("class") + "<br>";
		msg += "标题内容=" + $tabTitle.html();
		mc.alert(msg);
	});

	/**
	 * 获取标题对象（id=title2）
	 */
	$("#btnGetTabTitleElementById").click(function(event)
	{
		var $tabTitle = $("#tabContainer3").TabContainer("getTabTitleElement", "title2");
		var msg = "id=title2的选项卡标题<br>";
		msg += "html标签=" + $tabTitle[0].tagName + "<br>"
		msg += "id=" + $tabTitle[0].id + "<br>"
		msg += "class=" + $tabTitle.attr("class") + "<br>";
		msg += "标题内容=" + $tabTitle.html();
		mc.alert(msg);
	});

	/**
	 * 获取当前标题对象（不传入参数）
	 */
	$("#btnGetTabTitleElement").click(function(event)
	{
		var $tabTitle = $("#tabContainer3").TabContainer("getTabTitleElement");
		var msg = "当前选项卡标题<br>";
		msg += "html标签=" + $tabTitle[0].tagName + "<br>"
		msg += "id=" + $tabTitle[0].id + "<br>"
		msg += "class=" + $tabTitle.attr("class") + "<br>";
		msg += "标题内容=" + $tabTitle.html();
		mc.alert(msg);
	});
	

	/**
	 * 获取内容页对象（序号=1）
	 */
	$("#btnGetTabContentElementByIndex").click(function(event)
	{
		var $tabContent = $("#tabContainer3").TabContainer("getTabContentElement", 1);
		var msg = "序号=1选项卡内容页<br>";
		msg += "html标签=" + $tabContent[0].tagName + "<br>"
		msg += "id=" + $tabContent[0].id + "<br>"
		msg += "class=" + $tabContent.attr("class") + "<br>";
		msg += "标题内容=" + $tabContent.html();
		mc.alert(msg);
	});

	/**
	 * 获取内容页对象（id=tab2）
	 */
	$("#btnGetTabContentElementById").click(function(event)
	{
		var $tabContent = $("#tabContainer3").TabContainer("getTabContentElement", "tab2");
		var msg = "id=tab2选项卡内容页<br>";
		msg += "html标签=" + $tabContent[0].tagName + "<br>"
		msg += "id=" + $tabContent[0].id + "<br>"
		msg += "class=" + $tabContent.attr("class") + "<br>";
		msg += "标题内容=" + $tabContent.html();
		mc.alert(msg);
	});

	/**
	 * 获取当前内容页对象（不传入参数）
	 */
	$("#btnGetTabContentElement").click(function(event)
	{
		var $tabContent = $("#tabContainer3").TabContainer("getTabContentElement");
		var msg = "当前选项卡内容页<br>";
		msg += "html标签=" + $tabContent[0].tagName + "<br>"
		msg += "id=" + $tabContent[0].id + "<br>"
		msg += "class=" + $tabContent.attr("class") + "<br>";
		msg += "标题内容=" + $tabContent.html();
		mc.alert(msg);
	});
};

init_TabContainer4 = function()
{
	/**
	 * 序号=2的选项卡是否隐藏
	 */
	$("#btnIsHideTabByIndex").click(function(event)
	{
		mc.alert("序号=2的选项卡，是否隐藏=" + $("#tabContainer4").TabContainer("isHidden", 2));
	});
	/**
	 * id=title2的选项卡是否隐藏
	 */
	$("#btnIsHideTabByTitleId").click(function(event)
	{
		mc.alert("id=title2的选项卡，是否隐藏=" + $("#tabContainer4").TabContainer("isHidden", "title2"));
	});
	/**
	 * id=tab2的选项卡是否隐藏
	 */
	$("#btnIsHideTabByContentId").click(function(event)
	{
		mc.alert("id=tab2的选项卡，是否隐藏=" + $("#tabContainer4").TabContainer("isHidden", "tab2"));
	});
	/**
	 * 显示所有选项卡
	 */
	$("#btnShowAllTab").click(function(event)
	{
		$("#tabContainer4").TabContainer("showAll");
	});
	
	/**
	 * 隐藏序号=2的选项卡
	 */
	$("#btnHideTabByIndex").click(function(event)
	{
		$("#tabContainer4").TabContainer("hide", 2);
	});
	/**
	 * 隐藏id=title2的选项卡
	 */
	$("#btnHideTabByTitleId").click(function(event)
	{
		$("#tabContainer4").TabContainer("hide", "title2");
	});
	/**
	 * 隐藏id=tab2的选项卡
	 */
	$("#btnHideTabByContentId").click(function(event)
	{
		$("#tabContainer4").TabContainer("hide", "tab2");
	});
	/**
	 * 隐藏当前选中选项卡
	 */
	$("#btnHideCurrentTab").click(function(event)
	{
		$("#tabContainer4").TabContainer("hide");
	});

	/**
	 * 显示序号=2的选项卡
	 */
	$("#btnShowTabByIndex").click(function(event)
	{
		$("#tabContainer4").TabContainer("show", 2);
	});
	/**
	 * 显示id=title2的选项卡
	 */
	$("#btnShowTabByTitleId").click(function(event)
	{
		$("#tabContainer4").TabContainer("show", "title2");
	});
	/**
	 * 显示id=tab2的选项卡
	 */
	$("#btnShowTabByContentId").click(function(event)
	{
		$("#tabContainer4").TabContainer("show", "tab2");
	});
};

init_TabContainer5 = function()
{
	/**
	 * 增加选项卡
	 */
	$("#btnAddTab").click(function(event)
	{
		$("#tabContainer5").TabContainer("addTab", "新标题", "新内容页");
	});
	/**
	 * 增加选项卡（带id）
	 */
	$("#btnAddTabWithId").click(function(event)
	{
		var title = "新标题<span style='color: red;'>(1)</span>";
		var content = "<p>新内容</p><p>新内容</p><p>新内容</p><p>新内容</p>";
		$("#tabContainer5").TabContainer("addTab", title, content, "abc");
	});

	/**
	 * 删除序号=2的选项卡
	 */
	$("#btnDeleteTabByIndex").click(function(event)
	{
		$("#tabContainer5").TabContainer("deleteTab", 2);
	});
	/**
	 * 删除id=title2的选项卡
	 */
	$("#btnDeleteTabByTitleId").click(function(event)
	{
		$("#tabContainer5").TabContainer("deleteTab", "title2");
	});
	/**
	 * 删除id=tab2的选项卡
	 */
	$("#btnDeleteTabByContentId").click(function(event)
	{
		$("#tabContainer5").TabContainer("deleteTab", "tab2");
	});
	/**
	 * 删除当前的选项卡（不传入参数）
	 */
	$("#btnDeleteTab").click(function(event)
	{
		$("#tabContainer5").TabContainer("deleteTab");
	});
};

init_TabContainer6 = function()
{
	/**
	 * 增加选项卡
	 */
	$("#btnAddTab6").click(function(event)
	{
		$("#tabContainer6").TabContainer("addTab", "新标题", "新内容页");
	});
	/**
	 * 删除当前的选项卡（不传入参数）
	 */
	$("#btnDeleteTab6").click(function(event)
	{
		$("#tabContainer6").TabContainer("deleteTab");
	});
	/**
	 * 绑定选项卡切换事件
	 */
	$("#tabContainer6").TabContainer("option", "changeCallback", function(index, $tabTitle, $tabContent, isTabInited)
	{
		var msg = "切换后的tab选项卡，序号=" + index + "\r\n\r\n";
		msg += "是否tab选项卡已初始化=" + isTabInited + "\r\n";
		msg += "标题栏id=" + $tabTitle.attr("id") + "\r\n";
		msg += "标题栏html=" + $tabTitle.html() + "\r\n\r\n";
		msg += "内容页id=" + $tabContent.attr("id") + "\r\n";
		msg += "内容页html=" + $tabContent.html() + "\r\n\r\n";
		alert(msg);
	});

	/**
	 * 绑定选项卡删除事件
	 */
	$("#tabContainer6").TabContainer("option", "deleteCallback", function(index, $tabTitle, $tabContent)
	{
		var msg = "删除后激活的tab选项卡，序号=" + index + "\r\n\r\n";
		msg += "标题栏id=" + $tabTitle.attr("id") + "\r\n";
		msg += "标题栏html=" + $tabTitle.html() + "\r\n\r\n";
		msg += "内容页id=" + $tabContent.attr("id") + "\r\n";
		msg += "内容页html=" + $tabContent.html() + "\r\n\r\n";
		alert(msg);
	});
};

$(function() 
{
	init_TabContainer1();

	init_TabContainer2();

	init_TabContainer3();

	init_TabContainer4();

	init_TabContainer5();

	mc.layout.init();

	init_TabContainer6();
});