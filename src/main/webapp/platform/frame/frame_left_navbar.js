mc.namespace("mc.frame");

/**
 * 左侧菜单导航栏
 * 提供点击导航接口
 */
mc.frame.FrameLeftNavBar = function(mainFrame)
{
	this.MainFrame = null;		/* 主界面 */
	this.currentMenu = null;	/* 当前选择菜单数据 */

	this.initCurrentMenuData = function()
	{
		this.currentMenu =
		{
			menuId : "",			/* 当前选择菜单Id */
			menuData : null,		/* 当前选择菜单数据 */
			menuData1 : null,		/* 一级菜单数据 */
			menuData2 : null		/* 二级菜单数据。若当前选择的是一级菜单，则为null */
		};
	};

	this.init = function(mainFrame)
	{
		this.MainFrame = mainFrame;

		this.initCurrentMenuData();

		/**
		 * 初始化菜单垂直滚动条
		 */
		this.initMenuScrollBar();
	};

	/**
	 * 初始化菜单垂直滚动条
	 */
	this.initMenuScrollBar = function()
	{
		$(".content").mCustomScrollbar();
		var $navToogle = $("#nav-toogle");
		$navToogle.on("click", this.layerMoveEvent);
	};

	/**
	 * 左侧菜单边栏伸缩事件
	 */
	this.layerMoveEvent = function()
	{
		var $layuiSide = $(".layui-side");
		var $layuiBody = $(".layui-body");
		if($(this).hasClass("frame-toggle-h"))
		{
			$(this).removeClass("frame-toggle-h").addClass("frame-toggle-v");
			$layuiSide.animate({left:"-200px"},200);
			$layuiBody.animate({left:"0"},200);
		}
		else
		{
			$(this).removeClass("frame-toggle-v").addClass("frame-toggle-h");
			$layuiSide.animate({left:"0"},200);
			$layuiBody.animate({left:"200"},200);
		}
	};

	/**
	 * 根据模块id加载菜单
	 */
	this.loadMenu = function(moduleid)
	{
		this.initCurrentMenuData();

		$.ajax(
		{
			url : "sm/mcmenu/tree_auth",
			type : "post",
			data :
			{
				moduleid : moduleid
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					this.loadMenuLevel1(data.data);
				}
				else
				{
					mc.msg("获取菜单数据失败: " + data.msg + "。请退出重新登录");
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.msg("获取菜单数据失败: " + error + "。请退出重新登录");
			}
		});
	};

	/**
	 * 加载一级菜单
	 */
	this.loadMenuLevel1 = function(menuData)
	{
		$("#menu").empty();

		for (var i = 0; i < menuData.length; i++)
		{
			var menu = menuData[i];

			$("#menu").append("<li id='" + menu.id + "' class='layui-nav-item'"
				+ " code='" + menu.code + "' leaf='" + menu.isleaf + "'>"
				+ "<a href='javascript:void(0)'>"
				+ mc.frame.createIconHTML(menu.iconid) + menu.name + "</a></li>");

			var $menu = $("#" + menu.id);
			$menu.attr("pageurl", menu.pageurl);
			$menu.data("menu-data", menu);

			/* 只有第一个一级菜单打开 */
			if (i == 0)
			{
				$menu.addClass("layui-nav-itemed");
			}

			this.loadSubMenu(menu);

			$menu.click($.proxy(this.OnMenuClickEvent, this));
			$menu.mouseenter(this.OnMenuMouseEnterEvent);
			$menu.mouseleave(this.OnMenuMouseLeaveEvent);

			/**
			 * to-do 点击前出发检查事件，处理多事件触发顺序
			 */
		}
		
		layui.element.init();
	};

	/**
	 * 加载二级菜单
	 */
	this.loadSubMenu = function(menu)
	{
		if (menu.children == undefined || menu.children == null
				|| (! $.isArray(menu.children)) 
				|| menu.children.length <= 0)
		{
			return;
		}

		var $menu = $("#" + menu.id);
		if ($menu.children("dl").size() <= 0)
		{
			$menu.append("<dl class='layui-nav-child'></dl>");
		}
		$menu.children("dl").empty();

		for (var i = 0; i < menu.children.length; i++)
		{
			var subMenu = menu.children[i];

			$menu.children("dl").append("<dd id='" + subMenu.id + "' code='" + subMenu.code + "' leaf='" + subMenu.isleaf + "'>"
				+ "<a href='javascript:void(0)'>"
				+ mc.frame.createIconHTML(subMenu.iconid) + subMenu.name + "</a></dd>");
			var $subMenu = $("#" + subMenu.id);
			$subMenu.attr("pageurl", subMenu.pageurl);
			$subMenu.data("menu-data", subMenu);

			$subMenu.click($.proxy(this.OnMenuClickEvent, this));
			$subMenu.mouseenter(this.OnMenuMouseEnterEvent);
			$subMenu.mouseleave(this.OnMenuMouseLeaveEvent);

			/**
			 * to-do 点击前出发检查事件，处理多事件触发顺序
			 */
		}
	};

	/**
	 * 菜单点击事件
	 */
	this.OnMenuClickEvent = function(event)
	{
		var $menu = $(event.currentTarget);

		/**
		 * 收缩其他一级菜单
		 */
		var $menu_level1 = this.getMenu1ByCurrentMenu($menu);
		$("li", $("#menu")).each(function(index, dom)
		{
			var $menu_this = $(this);
			if ($menu_this[0] != $menu_level1[0])
			{
				$menu_this.removeClass("layui-nav-itemed");
			}
		});

		/**
		 * 记录当前点击菜单
		 */
		this.recordCurrentMenu($menu);

		if (! this.MainFrame.frameWorkspace.openClientPage($menu.attr("pageurl")))
		{
			/**
			 * to-do 
			 * 切换页面不通过，则恢复为原选择项
			 * 如能解决点击前触发检查，则不需要恢复
			 */
		}

		event.stopPropagation();
	};

	/**
	 * 菜单提示事件
	 */
	this.OnMenuMouseEnterEvent = function(event)
	{
		var $menu = $(event.currentTarget);
		var menuData = $menu.data("menu-data");
		if (! mc.isObject(menuData))
		{
			return;
		}

		if (mc.str.isEmpty(menuData.tip))
		{
			return;
		}

		layer.tips(menuData.tip, $menu);
		event.stopPropagation();
	};

	/**
	 * 菜单提示移除事件
	 */
	this.OnMenuMouseLeaveEvent = function(event)
	{
		layer.closeAll("tips");
	};

	/**
	 * 根据当前选中菜单，获取一级菜单jQuery Object
	 */
	this.getMenu1ByCurrentMenu = function($menu)
	{
		if ($menu[0].tagName == "LI")
		{
			/**
			 * 当前是一级菜单
			 */
			return $menu;
		}
		else if ($menu[0].tagName == "DD")
		{
			/**
			 * 当前是二级菜单
			 */
			var $menu1 = $menu.parents("li[class*='layui-nav-item']");
			return $menu1;
		}
		else
		{
			return $menu;
		}
	};

	/**
	 * 点击时记录当前选择的菜单
	 */
	this.recordCurrentMenu = function($menu)
	{
		this.currentMenu.menuId = $menu.attr("id");
		this.currentMenu.menuData = $menu.data("menu-data");

		if ($menu[0].tagName == "LI")
		{
			this.currentMenu.menuData1 = this.currentMenu.menuData;
			this.currentMenu.menuData2 = null;
		}
		else if ($menu[0].tagName == "DD")
		{
			$menu1 = this.getMenu1ByCurrentMenu($menu);
			this.currentMenu.menuData1 = $menu1.data("menu-data");
			this.currentMenu.menuData2 = this.currentMenu.menuData;
		}
	};

	/**
	 * @public
	 * 获取当前选中菜单数据对象
	 */
	this.getCurrentMenuData = function()
	{
		var currentMenu = $.extend(true, {}, this.currentMenu);
		return currentMenu;
	};

	this.init(mainFrame);
};