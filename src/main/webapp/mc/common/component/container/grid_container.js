(function($)
{
	/**
	 * 表格组件容器
	 */
	$.widget("mc.GridContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "grid",
		/**
		 * 默认设置
		 */
		options :
		{
			border_width : 2
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			this._init_gridinfo();

			this.resize();
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destory : function()
		{
			this._super();
		},

		/**
		 * @override	实现接口
		 * 检查当前html元素是否符合创建容器要求
		 * div，且拥有class=mc-grid-container
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("div"))
			{
				return false;
			}

			if (! $element.hasClass("mc-grid-container"))
			{
				return false;
			}

			return true;	
		},

		/**
		 * grid信息
		 */
		_grid_id : "",
		_$grid : null,
		/**
		 * 初始化gird信息
		 */
		_init_gridinfo : function()
		{
			var grid_id = this.element.attr("mc-grid");

			if (grid_id == undefined || grid_id == null || $.trim(grid_id).length <= 0)
			{
				return;
			}

			this._grid_id = grid_id;
			this._$grid = $("#" + this._grid_id);
		},
		/**
		 * 调整容器内组件尺寸，由各子类实现
		 */
		resize : function()
		{
			mc.console.log("resize, " + this.getWidgetFullName() + ", " + this.element[0].tagName + ", " + this.element[0].id);

			if (this._$grid == undefined || this._$grid == null || this._$grid.length <= 0)
			{
				return; 
			};

			/**
			 * grid宽度 = 容器内宽度 - 左边框宽度 - 右边框宽度
			 */
			var gridWidth = this.element.width() - this.getBorderWidth("left") - this.getBorderWidth("right");

			/**
			 * 获取列头
			 */
			var $grid_head = this.element.find(".ui-jqgrid-hbox");

			/**
			 * grid高度 = 容器内高度 - 上边框宽度 - 下边框宽度 - 标题栏高度 - 列头高度 - 分页栏高度
			 */
			var gridHeight = this.element.height() - $grid_head.height()
				- this.getBorderWidth("top") - this.getBorderWidth("bottom");

			/**
			 * 标题栏
			 */
			var caption = this._$grid.getGridParam("caption");
			if (caption != undefined && caption != null && $.trim(caption).length > 0)
			{
				var $grid_caption = this.element.find(".ui-jqgrid-caption");
				if (typeof($grid_caption) == "object" && ($grid_caption instanceof jQuery) && $grid_caption.size() > 0)
				{
					gridHeight -= $grid_caption.height();
				}
			}

			/**
			 * 分页栏
			 * 此处获取的pager已自带#号
			 */
			var grid_pager_id = this._$grid.getGridParam("pager");
			var $grid_pager = $(grid_pager_id);
			if (typeof($grid_pager) == "object" && ($grid_pager instanceof jQuery) && $grid_pager.size() > 0)
			{
				gridHeight -= $grid_pager.height();
			}

			this._$grid.setGridWidth(gridWidth);
			this._$grid.setGridHeight(gridHeight);
		},
		getBorderWidth : function(aspect)
		{
			var $gridBox = $(this.element.children("div[class*=ui-jqgrid]").get(0));
			if ($gridBox == undefined && $gridBox == null)
			{
				return this.options.border_width;
			}

			var borderWidth = $gridBox.css("border-" + aspect + "-width");
			return parseInt(borderWidth);
		}
	});

	MCloud.layout.ContainerMgr.register($.mc.GridContainer.prototype.getWidgetFullName(),
	{
		fullName : "mc.GridContainer",
		name : $.mc.GridContainer.prototype.getWidgetName()
	});
})(jQuery);