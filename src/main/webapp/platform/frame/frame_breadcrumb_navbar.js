mc.namespace("mc.frame");

/**
 * 面包屑导航栏
 */
mc.frame.FrameBreadCrumbNavBar = function(mainFrame)
{
	this.MainFrame = null;	/* 主界面 */

	/**
	 * 常量定义
	 */
	this._Const = 
	{
		_BreadCrumbId : "breadcrumb-nav",
	};
	this.$BreadCrumbContainer = null;	/* 面包屑导航栏容器 */

	/**
	 * 初始化
	 */
	this.init = function(mainFrame)
	{
		this.MainFrame = mainFrame;

		this.$BreadCrumbContainer = $("#" + this._Const._BreadCrumbId);

		this.$BreadCrumbContainer.empty();
	};

	/**
	 * @public
	 * 更新面包屑导航状态
	 */
	this.updateStatus = function()
	{
		var currentModule = this.MainFrame.frameTopNavBar.getCurrentModuleData();
		var currentMenu = this.MainFrame.frameLeftNavBar.getCurrentMenuData();

		var arrayName = new Array();

		arrayName.push(currentModule.moduleData1.name);
		if (currentModule.moduleData2 != null)
		{
			arrayName.push(currentModule.moduleData2.name);
		}

		if (currentMenu.menuData1 != null)
		{
			arrayName.push(currentMenu.menuData1.name);
		}
		if (currentMenu.menuData2 != null)
		{
			arrayName.push(currentMenu.menuData2.name);
		}

		this.updateByArray(arrayName);
	};

	/**
	 * @public
	 */
	this.updateByArray = function(arrayName)
	{
		this.$BreadCrumbContainer.empty();
		for (var i = 0; i < arrayName.length; i++)
		{
			if (typeof(arrayName[i]) != "string" || $.trim(arrayName[i]).length < 0)
			{
				continue;
			}

			if (this.$BreadCrumbContainer.children("a").size() > 0)
			{
				this.$BreadCrumbContainer.children("a").last().append("<span class='layui-box'>&gt;</span>");
			}

			this.$BreadCrumbContainer.append("<a><cite>" + arrayName[i] + "</cite></a>");
		}
	};

	this.init(mainFrame);
};