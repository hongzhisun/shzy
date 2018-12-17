mc.namespace("mc.frame");

/**
 * 收藏夹导航栏
 */
mc.frame.FrameFavoriteNavBar = function(mainFrame)
{
	this.MainFrame = null;				/* 主界面 */
	this.currentFavoriteData = null; 	/* 当前登录人已收藏菜单数据 */

	/**
	 * 常量定义
	 */
	this._Const = 
	{
		_FavoriteContainerId : "favorite",	/* 收藏夹导航栏容器Id */
		_IconId_Favorited : "frame-icon-favorited",
		_IconId__UnFavorite : "frame-icon-favorite"
	};
	this.$FavoriteContainer = null;			/* 收藏夹导航栏容器 */

	/**
	 * 初始化
	 */
	this.init = function(mainFrame)
	{
		this.MainFrame = mainFrame;

		this.$FavoriteContainer = $("#" + this._Const._FavoriteContainerId);

		this.$FavoriteContainer.click($.proxy(this.OnFavoriteClickEvent, this));

		this.updateStatus();
	};

	/**
	 * @public
	 * 加载收藏夹菜单
	 */
	this.loadFavorite = function()
	{
		var param =
		{
			userid : $("#session_userid").val(),
			hidden : 0
		};

		$.ajax(
		{
			url : "sm/favorite/list",
			type : "post",
			data :
			{
				filter : mc.encode(param)
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					var favoriteData = data.data;

					this.currentFavoriteData = favoriteData;

					var favriteMenuData = this.createFavoriteMenuData(this.currentFavoriteData);

					/**
					 * 左侧菜单导航栏加载收藏夹菜单
					 */
					this.MainFrame.frameLeftNavBar.loadMenuLevel1(favriteMenuData);
				}
				else
				{
					mc.msg("获取收藏夹数据失败");
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.msg("获取收藏夹数据失败");
			}
		});
	};

	/**
	 * 构造适用于菜单导航栏的数据
	 */
	this.createFavoriteMenuData = function(data)
	{
		var favriteMenu = 
		{
			"id" : "menu-fav",
			"code" : "menu-fav",
			"name" : "收藏夹",
			"memo" : "",
			"hidden" : 0,
			"order" : 1,
			"status" : 1,
			"tip" : "",
			"pageurl" : "",
			"iconid" : "",
			"menusetid" : "1",
			"parentid" : "",
			"parentcode" : "",
			"parentname" : "",
			"isleaf" : 1,
			"level" : 1,
			"fullcode" : "menu-fav",
			"fullname" : "收藏夹"
		};

		if (mc.isArray(data))
		{
			for (var i = 0; i < data.length; i++)
			{
				var favMenu = data[i];
				favMenu.parentid = favriteMenu.id;
				favMenu.parentcode = favriteMenu.code;
				favMenu.parentname = favriteMenu.name;
				favMenu.isleaf = 1;
				favMenu.level = favriteMenu.level + 1;
				favMenu.fullcode = favriteMenu.code + "-" + favMenu.code;
				favMenu.fullname = favriteMenu.name + "-" + favMenu.name;

				favMenu.isFavorite = 1;
			}

			if (data.length > 0)
			{
				favriteMenu.isleaf = 0;
			}

			favriteMenu.children = data;
		}

		var favriteMenuData = [ favriteMenu ];

		return favriteMenuData;
	};

	/**
	 * 更新页面收藏状态
	 */
	this.updateStatus = function()
	{
		var currentMenu = this.MainFrame.frameLeftNavBar.getCurrentMenuData();

		if (mc.str.isEmpty(currentMenu.menuId))
		{
			/**
			 * 未选择菜单，模块首页不显示收藏状态
			 */
			this.hiddenFavorite()
		}
		else
		{
			if (currentMenu.menuData.isFavorite === 1)
			{
				/**
				 * 收藏夹打开的页面，隐藏收藏状态
				 */
				this.hiddenFavorite()
				return;
			}

			if (this.isFavorited(currentMenu.menuData.code))
			{
				this.setFavorited();
			}
			else
			{				
				this.setUnFavorited();
			}
		}
	};

	/**
	 * 检查是否为已收藏菜单
	 * @menuCode	菜单编号
	 * @return		已收藏返回true；未收藏返回false
	 */
	this.isFavorited = function(menuCode)
	{
		if (! mc.isArray(this.currentFavoriteData))
		{
			return false;
		}

		for (var i = 0; i < this.currentFavoriteData.length; i++)
		{
			var favoriteData = this.currentFavoriteData[i];
			if (favoriteData.code == menuCode)
			{
				return true;
			}
		}
		return false;
	};

	/**
	 * 隐藏收藏栏容器
	 */
	this.hiddenFavorite = function()
	{
		this.$FavoriteContainer.hide();
	};

	/**
	 * 设置为未收藏状态
	 */
	this.setUnFavorited = function()
	{
		this.$FavoriteContainer.show()
			.css("cursor", "pointer").on("click")
			.find("span").text("添加收藏").css("color", "#333")
			.siblings("i").removeClass("frame-icon-favorited").addClass("frame-icon-favorite");
	};

	/**
	 * 设置为已收藏状态
	 */
	this.setFavorited = function()
	{
		this.$FavoriteContainer.show()
			.css("cursor", "pointer").on("click")
			.find("span").text("已收藏").css("color", "#999")
			.siblings("i").removeClass("frame-icon-favorite").addClass("frame-icon-favorited");
	};

	this.isFavoritedIcon = function()
	{
		return this.$FavoriteContainer.find("i").hasClass("frame-icon-favorited");
	};

	/**
	 * 点击事件
	 */
	this.OnFavoriteClickEvent = function(event)
	{
		var currentMenu = this.MainFrame.frameLeftNavBar.getCurrentMenuData();

		if(! this.isFavoritedIcon())
		{
			/**
			 * 未收藏则添加收藏
			 */
			this.appendFavorite(currentMenu.menuData.code);
		}
		else
		{
			/**
			 * 已收藏则取消收藏
			 */
			this.cancelFavorite(currentMenu.menuData.code);
		}
	};

	/**
	 * 添加收藏
	 */
	this.appendFavorite = function(menuCode)
	{
		$.ajax(
		{
			url : "sm/favorite/append",
			type : "post",
			data :
			{
				menucode : menuCode
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					this.updateFavoriteData();

					/**
					 * 设置为已收藏状态
					 */
					this.setFavorited();

					/**
					 * 动画
					 */
					this.appendFavoriteAnimate();
				}
				else
				{
					mc.msg("添加收藏失败");
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.msg("添加收藏失败");
			}
		});
	};

	/**
	 * 添加收藏动画
	 */
	this.appendFavoriteAnimate = function()
	{
		var $aniFavorite = $(".frame-ani-favorite");
		var $aniFavoriteNum = $(".frame-ani-favorite-num");
		$aniFavorite.show();

		var timer1 = setTimeout(function()
		{
			$aniFavorite.hide();
			$aniFavoriteNum.show();
			var timer2 = setTimeout(function()
			{
				$aniFavoriteNum.hide();
				window.clearTimeout(timer2);
			}, 3000)
			window.clearTimeout(timer1);
		}, 1000);		
	};

	/**
	 * 取消收藏
	 */
	this.cancelFavorite = function(menuCode)
	{
		$.ajax(
		{
			url : "sm/favorite/cancel",
			type : "post",
			data :
			{
				menucode : menuCode
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					this.updateFavoriteData();

					/**
					 * 设置为未收藏状态
					 */
					this.setUnFavorited();
				}
				else
				{
					mc.msg("取消收藏失败");
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.msg("取消收藏失败");
			}
		});
	};

	/**
	 * 更新收藏夹菜单数据
	 */
	this.updateFavoriteData = function()
	{
		$.ajax(
		{
			url : "sm/favorite/list",
			type : "post",
			data :
			{
				userid : $("#session_userid").val()
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					this.currentFavoriteData = data.data;
				}
			}, this),
			error : function(request, error, ex)
			{
			}
		});
	};

	this.init(mainFrame);
};