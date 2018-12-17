(function($)
{
	/**
	 * 边界布局容器
	 * 基础布局容器，采用边界布局模式(border)，
	 * 划分为上(north)、下(south)、左(west)、右(east)、中(center)五个区域。
	 * 并在各个区域之间增加可拖动的分隔栏。
	 * 边界布局容器内可包含其他容器，如工具栏容器、表单容器、表格组件容器、树组件容器，
	 * 也可嵌套边界布局容器。
	 */
	$.widget("mc.BorderContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "border",
		/**
		 * 默认设置
		 */
		options :
		{
			closable : false, 	/* 取消分隔条上的关闭按钮 */
			resizerTip : ""		/* 分隔条取消提示 */
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			this._layout_self();

			this._layout_inner();
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
		 * div或body，且下级div拥有布局属性
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if ((! $element.is("div")) && (! $element.is("body")))
			{
				return false;
			}

			/**
			 * 检查下级元素是否有布局参数
			 */
			if (! this._checkLayoutParam($element))
			{
				return false;
			}

			return true;	
		},

		/**
		 * 检查下级元素是否有布局参数
		 */
		_checkLayoutParam : function($element)
		{
			var $children = $element.children("div.ui-layout-center, div.ui-layout-north, div.ui-layout-south, div.ui-layout-east, div.ui-layout-west");

			return ($children.size() > 0);
		},

		/**
		 * @private
		 * 自身布局
		 */
		_layout_self : function()
		{
			if (this.element.hasClass("mc-dialog-container"))
			{
				this._isDialog = true;
			}

			/**
			 * 布局参数
			 */
			var param =
			{
			};

			var _self = this;
			/**
			 * 准备布局参数
			 */
			var $children = this.element.children("div.ui-layout-center, div.ui-layout-north, div.ui-layout-south, div.ui-layout-east, div.ui-layout-west");
			mc.console.log("$children=" + $children.size());

			var $center = this.element.children("div.ui-layout-center");
			if ($children.size() > 0 && $center.size() <= 0)
			{
				alert("缺少class='ui-layout-center'的div元素，无法按照border方式布局");
				return;
			}

			$children.each(function(index)
			{
				var $div_child = $(this);

				if ($div_child.hasClass("ui-layout-center"))
				{
				}
				else if ($div_child.hasClass("ui-layout-north"))
				{
					_self._parserLayoutParam($div_child, param, "north", self);
				}
				else if ($div_child.hasClass("ui-layout-south"))
				{
					_self._parserLayoutParam($div_child, param, "south", self);
				}
				else if ($div_child.hasClass("ui-layout-west"))
				{
					_self._parserLayoutParam($div_child, param, "west", self);
				}
				else if ($div_child.hasClass("ui-layout-east"))
				{
					_self._parserLayoutParam($div_child, param, "east", self);
				}
			});

			/**
			 * 布局
			 */
			var layoutParam = $.extend(true, {}, this.options, param);
			layoutParam["onresize"] = this.resizeEvent;

			this.element.layout(layoutParam);
		},
		/**
		 * @private
		 * 子容器布局
		 * 递归
		 */
		_layout_inner : function()
		{
			var _self = this;
			var $children = this.element.children("div");
			$children.each(function(index)
			{
				var $div_child = $(this);

				mc.layout.layout_core($div_child, _self, _self.options, false);
			});
		},
		/**
		 * 解析布局参数
		 * $div
		 * param		布局参数，往上追加
		 * areaName
		 */
		_parserLayoutParam : function($div, param, areaName, scope)
		{	
			var size = $div.attr("mc-ly-size");
			if (size != null && size != "") { param[areaName + "__size"] = Number(size); }

			var maxsize = $div.attr("mc-ly-maxsize");
			if (maxsize != null && maxsize != "") { param[areaName + "__maxSize"] = Number(maxsize); }

			var minsize = $div.attr("mc-ly-minsize");
			if (minsize != null && minsize != "") { param[areaName + "__minSize"] = Number(minsize); }

			var resizable = $div.attr("mc-ly-resize");
			if (resizable != null && resizable != "")
			{
				param[areaName + "__resizable"] = ((resizable == "true" || resizable == "1") ? true : false);
			}
			else
			{
				param[areaName + "__resizable"] = false;
			}

			var split = $div.attr("mc-ly-split");
			if (split != null && split != "")
			{
				if (split != "true" && split != "1")
				{
					param[areaName + "__spacing_open"] = 0;
				}
			}
		},
		/**
		 * 调整尺寸后各子面板处理事件
		 * 根据调整的panel，找出container widget
		 * 如果是form、grid、tree等，则resize
		 */
		resizeEvent : function(panel_name, $panel, panel_state, panel_options, layout_name)
		{
			/**
			 * 获取子面板容器
			 */
			var wg_container_fullname = $panel.data("mc-container-fullname");

			var loginfo = "resizeEvent panel_name=" + panel_name;
			loginfo += ", panel.tag=" + $panel[0].tagName;
			loginfo += ", panel.id=" + $panel[0].id;
			loginfo += ", panel.class=" + $panel.attr("class");
			loginfo += ", wg_container_fullname=" + wg_container_fullname;
			mc.console.log(loginfo);

			/**
			 * 判断是否为mc框架容器（包括自定义容器）
			 */
			if (MCloud.layout.ContainerMgr.contains(wg_container_fullname)
					|| wg_container_fullname == $.mc.PlainContainer.prototype.getWidgetFullName()
					|| wg_container_fullname == $.mc.BorderContainer.prototype.getWidgetFullName()
					|| wg_container_fullname == $.mc.TabContainer.prototype.getWidgetFullName())
			{
				try
				{
					var $widget_inst = $panel.data(wg_container_fullname);

					if (mc.isFunction($widget_inst.resize))
					{
						$widget_inst.resize();					
					}	
				}
				catch(ex)
				{
					mc.console.log(ex);
					throw ex;
				}				
			}
		},

		/**
		 * @override		实现接口
		 * 调整容器尺寸方法
		 * 递归调整下级容器的resize方法
		 */
		resize : function()
		{
			mc.console.log("resize, " + this.getWidgetFullName() + ", " + this.element[0].tagName + ", " + this.element[0].id);

			if (mc.isFunction(this.element.layout().resizeAll))
			{
				this.element.layout().resizeAll();
			}
		}
	});
})(jQuery);