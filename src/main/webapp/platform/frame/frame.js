mc.namespace("mc.frame");

/**
 * 主界面对象
 */
var mainFrame = null;

/**
 * 主界面
 */
mc.frame.MainFrame = function()
{
	this.frameTopNavBar = null;			/* 顶部导航栏 */
	this.frameLeftNavBar = null;		/* 左侧菜单导航栏 */
	this.frameWorkspace = null;			/* 客户工作区 */
	this.frameBreadCrumbNavBar = null;	/* 面包屑导航栏 */
	this.frameFavoriteNavBar = null;	/* 收藏夹导航栏 */

	this.init = function()
	{
		/**
		 * 页面渲染
		 */
		layui.element.init();

		this.frameTopNavBar = new mc.frame.FrameTopNavBar(this);
		this.frameLeftNavBar = new mc.frame.FrameLeftNavBar(this);
		this.frameWorkspace = new mc.frame.FrameWorkspace(this);
		this.frameBreadCrumbNavBar = new mc.frame.FrameBreadCrumbNavBar(this);
		this.frameFavoriteNavBar = new mc.frame.FrameFavoriteNavBar(this);

		/**
		 * 初始加载模块
		 */
		this.frameTopNavBar.loadModule();
	};

	/**
	 * @public
	 * 外部打开页面接口
	 * @param 	pageurl					页面url
	 * @param	breadCrumbNavNameArray	面包屑导航名称数组
	 */
	this.openOutterPage = function(pageurl, breadCrumbNavNameArray)
	{
		this.frameWorkspace.openClientPage(pageurl);
		this.frameBreadCrumbNavBar.updateByArray(breadCrumbNavNameArray);
	};

	this.init();
};

/**
 * @public
 * 创建图标html
 */
mc.frame.createIconHTML = function(iconid)
{
	if (! mc.str.notEmpty(iconid))
	{
		return "";
	}

	if ($.trim(iconid).substr(0, 3) == "fa-")
	{
		return "<i class='fa " + $.trim(iconid) + "'></i>  ";
	}
	else if ($.trim(iconid).substr(0, 5) == "icon-")
	{
		return "<i class='" + $.trim(iconid) + "'></i>  ";
	}
	else
	{
		return "";
	}
};

$(function()
{
	mainFrame = new mc.frame.MainFrame();
});
