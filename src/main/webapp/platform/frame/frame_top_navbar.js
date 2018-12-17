mc.namespace("mc.frame");

/**
 * 顶部导航栏
 */
mc.frame.FrameTopNavBar = function(mainFrame)
{
	this.MainFrame = null;		/* 主界面 */
	this.currentModule = null;	/* 当前选择模块数据 */

	/**
	 * 常量定义
	 */
	this._Const = 
	{
		_HomeModuleId : "module-home",
		_PersonalManagerModuleId : "module-personal-manager"	
	};

	this.initCurrentModuleData = function()
	{
		this.currentModule =
		{
			moduleId : "",			/* 当前选择模块Id */
			moduleData : null,		/* 当前选择模块数据 */
			moduleData1 : null,		/* 一级模块数据 */
			moduleData2 : null		/* 二级模块数据。若当前选择的是一级模块，则为null */
		};
	};

	/**
	 * 初始化，只应该加载一次
	 * @param mainFrame
	 */
	this.init = function(mainFrame)
	{
		this.MainFrame = mainFrame;

		this.initCurrentModuleData();

		/**
		 * 初始化退出
		 */
		this.initExit();

		/**
		 * 初始化首页模块
		 */
		this.initHomeModule();

		/**
		 * 初始化业务模块水平导航
		 */
		this.initBusiModuleNav();

		/**
		 * 初始化个人中心管理
		 */
		this.initPersonalManager();
	};

	/**
	 * 初始化Home模块
	 */
	this.initHomeModule = function(moduleData)
	{
		var $module = $("#" + this._Const._HomeModuleId);
		$module.click($.proxy(this.OnHomeModuleClickEvent, this));
		$module.mouseenter(this.OnModuleMouseEnterEvent);
		$module.mouseleave(this.OnModuleMouseLeaveEvent);
	};

	/**
	 * 模块水平导航参数
	 */
	this.ModuleNavParam =
	{
		totalWidth : 0,	/* 业务模块总宽度(ul[id="module"] > li) */
		index : 0,		/* 模块索引 */
		movWidth : 0,	/* 移动距离 */
		scrollWidth : 0	/* 滚动宽度 */
	};

	/**
	 * 初始化业务模块水平导航
	 */
	this.initBusiModuleNav = function()
	{
		$(window).resize($.proxy(this.onBodyResizeModuleNavEvent, this));

		$("#scroll-left").click($.proxy(this.onModuleNavLeftClickEvent, this));
		$("#scroll-right").click($.proxy(this.onModuleNavRightClickEvent, this));
	};

	/**
	 * 浏览器调整时重新计算模块导航栏
	 * @param event
	 */
	this.onBodyResizeModuleNavEvent = function(event)
	{

		var $scrollLeft = $("#scroll-left");
		var $scrollRight = $("#scroll-right");

		//初始化处理模块盒子位置
		var $indexModuleList = $(".frame-index-module li");
		var $indexModuleList_w = $indexModuleList.width();
		var $indexModule_left = $(".frame-index-module").offset().left;
		var moduleRightList_w = $(".layui-layout-right > li").width();
        $scrollLeft.css("left", ($indexModule_left + $indexModuleList_w + 15) + "px");
        $("#module-box").css(
        {
			"margin-left": $indexModule_left + $indexModuleList_w + 35 + "px",
			"margin-right": moduleRightList_w + 88 + "px"
		});
        $(".left-cover").css("width", $indexModule_left + $indexModuleList_w + 35 + "px");
        $(".right-cover").css("width", moduleRightList_w + 88 + "px");

        var moduleBoxWidth = $("#module-box").width();
        var $module = $("#module");

		if(this.ModuleNavParam.totalWidth < moduleBoxWidth)
		{
			$scrollLeft.hide();
			$scrollRight.hide();

			if (this.ModuleNavParam.totalWidth > 0)
			{
				$module.stop(true, false).animate(
				{
					"marginLeft" : 0
				}, "slow");
				this.ModuleNavParam.index = 0;
				this.ModuleNavParam.movWidth = 0;
				this.ModuleNavParam.scrollWidth = 0;
				$scrollLeft.hide();
				$scrollRight.hide();
			}
		}
		else
		{
			if($module[0].style.marginLeft == "0px" || $module[0].style.marginLeft == "")
			{
				$scrollLeft.hide();
				$scrollRight.show();
			}

			if (this.ModuleNavParam.totalWidth - this.ModuleNavParam.scrollWidth < moduleBoxWidth)
			{
				$module.stop(true, false).animate(
				{
					"marginLeft" : 0
				}, "slow");
				this.ModuleNavParam.index = 0;
				this.ModuleNavParam.movWidth = 0;
				this.ModuleNavParam.scrollWidth = 0;
				$scrollLeft.hide();
				$scrollRight.show();
			}
			else
			{
				$scrollRight.show();
			}
		}
	};

	/**
	 * 模块向左导航事件
	 */
	this.onModuleNavLeftClickEvent = function(event)
	{
		var moduleBoxWidth = $("#module-box").width();
		var $module = $("#module");
		var $moduleList = $("#module > li");
		var $scrollLeft = $("#scroll-left");
		var $scrollRight = $("#scroll-right");

		$scrollRight.show();
		this.ModuleNavParam.index = this.ModuleNavParam.index - 1;
		this.ModuleNavParam.movWidth = this.ModuleNavParam.movWidth + $moduleList.eq(this.ModuleNavParam.index).width();

		$module.stop(true, false).animate(
		{
			"marginLeft" : this.ModuleNavParam.movWidth
		}, 500);

		this.ModuleNavParam.scrollWidth = this.ModuleNavParam.scrollWidth - $moduleList.eq(this.ModuleNavParam.index).width();

		if (this.ModuleNavParam.index <= 0)
		{
			$scrollLeft.hide();
			return false;
		}
	};

	/**
	 * 模块向右导航事件
	 * @param event
	 */
	this.onModuleNavRightClickEvent = function(event)
	{

		var moduleBoxWidth = $("#module-box").width();
		var $module = $("#module");
		var $moduleList = $("#module > li");
		var $scrollLeft = $("#scroll-left");
		var $scrollRight = $("#scroll-right");

		$scrollLeft.show();
		this.ModuleNavParam.movWidth = this.ModuleNavParam.movWidth - $moduleList.eq(this.ModuleNavParam.index).width();
		$module.stop(true, false).animate(
		{
			"marginLeft" : this.ModuleNavParam.movWidth
		}, 500);
		this.ModuleNavParam.scrollWidth = this.ModuleNavParam.scrollWidth + $moduleList.eq(this.ModuleNavParam.index).width();
		this.ModuleNavParam.index = this.ModuleNavParam.index + 1;
		if (this.ModuleNavParam.totalWidth - this.ModuleNavParam.scrollWidth < moduleBoxWidth)
		{
			$scrollRight.hide();
			return false;
		}
	};

	/**
	 * 初始化个人中心管理
	 */
	this.initPersonalManager = function(moduleData)
	{
		var $module = $("#" + this._Const._PersonalManagerModuleId);
		$module.click($.proxy(this.OnModuleClickEvent, this));
		$module.mouseenter(this.OnModuleMouseEnterEvent);
		$module.mouseleave(this.OnModuleMouseLeaveEvent);
	};

	/**
	 * 加载模块
	 * 可多次执行
	 */
	this.loadModule = function()
	{
		$.ajax(
		{
			url : "sm/mcmodule/tree_auth",
			type : "post",
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					/**
					 * 加载首页模块
					 */
					this.loadHomeModule(data.data);

					/**
					 * 加载业务模块
					 */
					this.loadBusiModule(data.data);

					/**
					 * 加载个人中心管理
					 */
					this.loadPersonalManager(data.data);

					layui.element.init();

					/**
					 * 打开首页
					 */
					$("#" + this._Const._HomeModuleId).click();
				}
				else
				{
					if (data.msg)
					{
						mc.alert("获取模块数据失败: " + data.msg);
						return;
					}

					var _This = this;
					if (typeof(data) == "string" && $.trim(data).substr(0, 1) == "<")
					{
						mc.alert("尚未登录。点击【确定】即返回登录页", function()
						{
							_This.doReLog();
						});
					}
					else
					{
						alert("获取模块数据失败: " + data + "。请退出重新登录");
					}
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.alert("获取模块数据失败: " + error + "。请退出重新登录");
			}
		});
	};

	/**
	 * 初始化首页
	 */
	this.loadHomeModule = function(moduleData)
	{
		var homeModule = this.getHomeModuleData(moduleData);
		if (homeModule == null)
		{
			mc.alert("首页模块未找到")
			return;
		}

		var $module = $("#" + this._Const._HomeModuleId);
		$module.find("a").html(mc.frame.createIconHTML(homeModule.iconid) + homeModule.name);
		$module.attr("code", homeModule.code);
		$module.attr("leaf", homeModule.isleaf);
		$module.attr("pageurl", homeModule.pageurl);
		$module.data("module-data", homeModule);
	};

	this.getHomeModuleData = function(moduleData)
	{
		for (var i = 0; i < moduleData.length; i++)
		{
			var module = moduleData[i];
			if (module.id == this._Const._HomeModuleId)
			{
				return module;
			};
		}

		return null;
	};

	/**
	 * 初始化业务模块
	 */
	this.loadBusiModule = function(moduleData)
	{
		$("#module").empty();

		for (var i = 0; i < moduleData.length; i++)
		{
			var module = moduleData[i];
			if (module.id == this._Const._HomeModuleId
					|| module.id == this._Const._PersonalManagerModuleId)
			{
				continue;
			}

			$("#module").append("<li id='" + module.id + "' class='layui-nav-item'"
				+ " code='" + module.code + "' leaf='" + module.isleaf + "'>"
				+ "<a href='javascript:void(0)'>"
				+ mc.frame.createIconHTML(module.iconid) + module.name + "</a></li>");
			var $module = $("#" + module.id);
			$module.attr("pageurl", module.pageurl);
			$module.data("module-data", module);

			this.loadSubModule(module);

			if ($module.children("dl").size() <= 0)
			{
				$module.click($.proxy(this.OnModuleClickEvent, this));
			}

			$module.mouseenter(this.OnModuleMouseEnterEvent);
			$module.mouseleave(this.OnModuleMouseLeaveEvent);
		}

		/**
		 * 更新业务模块总宽度
		 */
		var $moduleList = $("#module > li");
		var totalWidth = 0;
		for (var i = 0; i < $moduleList.length; i++)
		{
			totalWidth += $moduleList.eq(i).width();
		}
		this.ModuleNavParam.totalWidth = totalWidth;
		$(window).resize();
	};

	/**
	 * 初始化子模块
	 */
	this.loadSubModule = function(module)
	{
		if (module.children == undefined || module.children == null
			|| (! $.isArray(module.children)) 
			|| module.children.length <= 0)
		{
			return;
		}

		var $module = $("#" + module.id);
		if ($module.children("dl").size() <= 0)
		{
			$module.append("<dl class='layui-nav-child'></dl>");
		}
		$module.children("dl").empty();

		for (var i = 0; i < module.children.length; i++)
		{
			var subModule = module.children[i];

			$module.children("dl").append("<dd id='" + subModule.id + "'"
				+ " code='" + subModule.code + "' leaf='" + subModule.isleaf + "'>"				
				+ "<a href='javascript:void(0)'>"
				+ mc.frame.createIconHTML(subModule.iconid) + subModule.name + "</a></dd>");
			var $subModule = $("#" + subModule.id);
			$subModule.attr("pageurl", subModule.pageurl);
			$subModule.data("module-data", subModule);

			$subModule.click($.proxy(this.OnModuleClickEvent, this));
			$subModule.mouseenter(this.OnModuleMouseEnterEvent);
			$subModule.mouseleave(this.OnModuleMouseLeaveEvent);
		}
	};

	/**
	 * 初始化个人中心管理
	 */
	this.loadPersonalManager = function(moduleData)
	{
		var module = this.getPersonalManagerModuleData(moduleData);
		if (module == null)
		{
			mc.alert("个人中心管理模块未找到")
			return;
		}

		var $module = $("#" + this._Const._PersonalManagerModuleId);
		$module.attr("code", module.code);
		$module.attr("leaf", module.isleaf);
		$module.data("module-data", module);
		this.loadSubModule(module);
	};
	
	this.getPersonalManagerModuleData = function(moduleData)
	{
		for (var i = 0; i < moduleData.length; i++)
		{
			var module = moduleData[i];
			if (module.id == this._Const._PersonalManagerModuleId)
			{
				return module;
			};
		}
	
		return null;
	};

	/**
	 * 点击首页模块事件
	 * 打开首页、显示收藏夹
	 */
	this.OnHomeModuleClickEvent = function(event)
	{
        $(".layui-layout-left > li,.layui-nav-child > dd").removeClass("layui-this");
		$(".frame-index-module > li").addClass("layui-this");

/*		this.MainFrame.frameLeftNavBar.loadFavorite();*/

		/**
		 * 加载收藏夹菜单
		 */
		this.MainFrame.frameFavoriteNavBar.loadFavorite();

		var $module = $(event.currentTarget);
		this.recordCurrentModule($module);

		this.MainFrame.frameWorkspace.openClientPage($module.attr("pageurl"));

		event.stopPropagation();
	};

	/**
	 * 点击模块事件
	 * 打开模块首页、显示菜单
	 * @param event
	 */
	this.OnModuleClickEvent = function(event)
	{
		$(".layui-layout-left > li,.layui-nav-child > dd").removeClass("layui-this");

		var $module = $(event.currentTarget);

		$module.addClass("layui-this");

        this.recordCurrentModule($module);

		this.MainFrame.frameLeftNavBar.loadMenu($module.attr("id"));

		this.MainFrame.frameWorkspace.openClientPage($module.attr("pageurl"));

		event.stopPropagation();
	};

	/**
	 * 初始化退出
	 */
	this.initExit = function()
	{
		$("#btnExit").click($.proxy(this.ExitEvent, this));
	};

	/**
	 * 模块提示事件
	 */
	this.OnModuleMouseEnterEvent = function(event)
	{
		var $module = $(event.currentTarget);

		var moduleData = $module.data("module-data");
		if (! mc.isObject(moduleData))
		{
			return;
		}

		if (mc.str.isEmpty(moduleData.tip))
		{
			return;
		}

		layer.tips(moduleData.tip, $module);
		event.stopPropagation();
	};

	/**
	 * 模块提示移除事件
	 */
	this.OnModuleMouseLeaveEvent = function(event)
	{
		layer.closeAll("tips");
	};

	/**
	 * 退出
	 * @param event
	 */
	this.ExitEvent = function(event)
	{
		var _This = this;
		mc.confirm("是否注销，并返回登录页面？", function(result)
		{
			if (! result)
			{
				return;
			}

			_This.doReLog();
		});
	};

	/**
	 * 重登录
	 */
	this.doReLog = function()
	{
		var basePath = $("#basePath").val();
		var loginPage = basePath + "platform/login/login.jsp";
		
		$.ajax(
		{
			url : "platform/security/logout",
			type : "post",
			success :  function(data, status)
			{
				if (data.success)
				{
					top.location = loginPage;
				}
				else
				{
					mc.alert("注销失败：", data.error, function()
					{
						top.location = loginPage;
					});
				}
			},
			error : function(request, error, ex)
			{
				mc.alert("注销失败：" + error, function()
				{
					top.location = loginPage;
				});
			}
		});
	};

	/**
	 * 根据当前选中模块，获取一级模块jQuery Object
	 */
	this.getModule1ByCurrentModule = function($module)
	{
		if ($module[0].tagName == "LI")
		{
			/**
			 * 当前是一级菜单
			 */
			return $module;
		}
		else if ($module[0].tagName == "DD")
		{
			/**
			 * 当前是二级菜单
			 */
			var $module1 = $module.parents("li[class*='layui-nav-item']");
			return $module1;
		}
		else
		{
			return $module;
		}
	};

	/**
	 * 点击时记录当前选择的模块
	 */
	this.recordCurrentModule = function($module)
	{
		this.currentModule.moduleId = $module.attr("id");
		this.currentModule.moduleData = $module.data("module-data");

		if ($module[0].tagName == "LI")
		{
			this.currentModule.moduleData1 = this.currentModule.moduleData;
			this.currentModule.moduleData2 = null;
		}
		else if ($module[0].tagName == "DD")
		{
			$module1 = this.getModule1ByCurrentModule($module);
			this.currentModule.moduleData1 = $module1.data("module-data");
			this.currentModule.moduleData2 = this.currentModule.moduleData;
		}
	};

	/**
	 * @public
	 * 获取当前选中模块数据对象
	 */
	this.getCurrentModuleData = function()
	{
		var currentModule = $.extend(true, {}, this.currentModule);
		return currentModule;
	};

	this.init(mainFrame);
};