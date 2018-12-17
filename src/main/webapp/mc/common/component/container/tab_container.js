(function($)
{
	/**
	 * Tab选项卡组件容器
	 * 包含多个选项卡面板
	 * 提供了Tab选项卡的访问接口，例如标题、或内容页的读取、设置接口。
	 * 对于Tab选项卡的访问，可以通过序号（从0开始）、或通过标题栏以及内容页的id访问。
	 * 提供了Tab选项卡的增加、删除、切换等接口。
	 * 提供了Tab选项卡隐藏、显示接口。
	 * 支持选项卡切换、删除等触发事件。
	 * 选项卡容器面板可以用于自适应布局、滚动布局使用。
	 * Tab选项卡容器内部的页面，可使用自适应布局、滚动布局。
	 */
	$.widget("mc.TabContainer", $.mc.Container,
	{
		/**
		 * 初始化参数root
		 */
		options_root : "tab",
		/**
		 * 默认设置
		 */
		options :
		{
			/**
			 * 是否允许关闭
			 */
			allowClose : false,
			/**
			 * tab选项卡切换后回调函数
			 */
			changeCallback : $.noop,
			/**
			 * tab选项卡删除后回调
			 */
			deleteCallback : $.noop
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			this._layout_self();

			this._layout_tab();
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
		 * div，且拥有class=mc-tab-container
		 * @param	$element	html元素
		 * @return	符合创建条件返回true；不符合创建条件，返回false
		 */
		checkHtml : function($element)
		{
			if (! $element.is("div"))
			{
				return false;
			}

			if (! $element.hasClass("mc-tab-container"))
			{
				return false;
			}

			return true;	
		},

		/**
		 * filter参数
		 */
		_TabLayFilter : "",

		/**
		 * @private
		 * 初始化自身布局
		 */
		_layout_self : function()
		{
			/**
			 * 如果不自适应，根据mc-tab-height设置tab页高度
			 */
			if (! this.element.hasClass("mc-tab-border"))
			{
				var tabHeight = this.element.attr("mc-tab-height")
				if (tabHeight != null && tabHeight != undefined && mc.isNumber(tabHeight)
						&& tabHeight > 0)
				{
					$(".layui-tab-item", this.element).height(tabHeight);
				}
			}

			/**
			 * 设置关闭按钮lay-allowClose="true"
			 * 如要取消关闭按钮，仅仅设置lay-allowClose=false无效，必须删除lay-allowClose这一属性
			 * （可能为layui的bug）
			 */
			var $layui_tab = this.element.children(".layui-tab");
			if (this._getAllowClose())
			{
				$layui_tab.attr("lay-allowClose", true);
			}
			else
			{
				$layui_tab.removeAttr("lay-allowClose");
			}

			/**
			 * 设置lay-filter
			 */
			this._TabLayFilter = $layui_tab.attr("lay-filter");
			if (mc.str.isempty(this._TabLayFilter))
			{
				this._TabLayFilter = "mc-tab-filter-" + mc.newid_js();

				/**
				 * 检查lay-filter属性重复
				 */
				$layui_tabs = $("div.layui-tab[lay-filter='" + this._TabLayFilter + "']");
				if ($layui_tabs.size() <= 0)
				{
					this.element.children(".layui-tab").attr("lay-filter", this._TabLayFilter);
				}
				else
				{
					alert("Tab选项卡容器的lay-filter属性重复");
				}
			}

			layui.element.render("tab", this._TabLayFilter);

			/**
			 * 绑定tabChange事件
			 */
			layui.element.on("tab(" + this._TabLayFilter + ")", $.proxy(this.onTabChangeEvent, this));

			/**
			 * 绑定tabDelete事件
			 */
			layui.element.on("tabDelete(" + this._TabLayFilter + ")", $.proxy(this.onTabDeleteEvent, this));
		},

		/**
		 * @private
		 * 判断是否需要显示关闭按钮
		 */
		_getAllowClose : function()
		{
			return (this.options.allowClose === true
					|| this.element.children(".layui-tab").attr("lay-allowClose") == "true")
		},

		/**
		 * @private
		 * 初始化布局各选项卡内容页面
		 * 并设置lay-id
		 */
		_layout_tab : function()
		{
			var $tabTitles = $(".layui-tab > .layui-tab-title > li", this.element);
			var $tabContents = $(".layui-tab > .layui-tab-content > div.layui-tab-item", this.element);

			if ($tabTitles.size() != $tabContents.size())
			{
				alert("TabContainer标题栏与内容页数量不相等");
				return;
			}

			/**
			 * 每个选项卡页面分别布局和设置lay-id
			 */
			var _self = this;
			$tabContents.each(function(index)
			{
				var $tabContent = $(this);

				mc.layout.layout_core($tabContent, _self, _self.options, false);

				var tabIndex = $tabContents.index($tabContent);

				var $tabTitle = $tabTitles.eq(tabIndex);
				var lay_id = $tabTitle.attr("lay-id");
				if (mc.str.isempty(lay_id))
				{
					lay_id = _self._TabLayFilter + "-" + mc.newid_js();
					$tabTitle.attr("lay-id", lay_id);
				}
			})

			/**
			 * 当前显示页面初始化显示状态
			 */
			var $tabConotent = this.getTabContentElement();
			this._initShowTab($tabConotent);
		},

		/**
		 * @private
		 * 初始化页面内容显示状态
		 * 初次显示的页面和切换的页面，都需要执行。
		 * 处理逻辑：
		 * 判断布局类型，增加滚动条、调整大小
		 * @param	$tabConotent	页面对象
		 */
		_initShowTab : function($tabConotent)
		{
			var containerFullName = $tabConotent.data("mc-container-fullname");
			if (containerFullName == $.mc.PlainContainer.prototype.getWidgetFullName())
			{
				$tabConotent.css("overflow-y", "auto");
			}

			var isTabInited = $tabConotent.data("mc-tab-layouted");
			var containerInstance = $tabConotent.data(containerFullName);
			if (isTabInited != 1)
			{
				if (containerInstance && mc.isFunction(containerInstance.resize))
				{
					containerInstance.resize();
				}

				$tabConotent.data("mc-tab-layouted", 1);
			}

			if (containerInstance && mc.isFunction(containerInstance.resize))
			{
				containerInstance.resize();
			}

			return ((isTabInited == 1) ? 1 : 0);
		},

		/**
		 * @private
		 * 选项卡切换触发事件，提供给layui.element调用。
		 * 触发自定义函数。
		 * 切换Tab选项卡页面，需要触发resize重新布局。
		 * 如未初始化布局过，需要重布局2次才能正常显示。
		 * @param	data
		 */
		onTabChangeEvent : function(data)
		{
			var tabIndex = data.index;
			var $tabTitle = this.getTabTitleElement(tabIndex);
			var $tabContent = this.getTabContentElement(tabIndex);

			var isTabInited = this._initShowTab($tabContent);

			if ($.isFunction(this.options.changeCallback))
			{
				this.options.changeCallback.call(this, tabIndex, $tabTitle, $tabContent, isTabInited);
			}
		},
		/**
		 * @private
		 * 选项卡删除触发事件，提供给layui.element调用。
		 */
		onTabDeleteEvent : function(data)
		{
			/* data.index为被删除页的原始序号，不可直接使用 */
			var tabIndex = this.getActiveTabIndex();
			var $tabTitle = this.getTabTitleElement(tabIndex);
			var $tabContent = this.getTabContentElement(tabIndex);

			if ($.isFunction(this.options.deleteCallback))
			{
				this.options.deleteCallback.call(this, tabIndex, $tabTitle, $tabContent);
			}			
		},

		/**
		 * @public
		 * 获取选项卡数量。
		 * 包括全部选项卡，无论是否隐藏
		 */
		getTabCount : function()
		{
			return $(".layui-tab-title", this.element).children("li").size();
		},

		/**
		 * @public
		 * 根据id或序号，获取选项卡标题jQuery对象。
		 * 未找到则返回null。
		 * 如未输入参数，则获取当前激活的选项卡标题。
		 * @param	index	选项卡序号或id
		 */
		getTabTitleElement : function(index)
		{
			if (index == undefined)
			{
				index = this.getActiveTabIndex();
			}

			var $tabTitle = null;
			if (mc.isNumber(index))
			{
				$tabTitle = $(".layui-tab-title", this.element).children("li").eq(index);
			}
			else if (mc.isString(index))
			{
				$tabTitle = $(".layui-tab-title", this.element).children("li#" + index);
			}

			if ($tabTitle.length <= 0)
			{
				$tabTitle = null;
			}

			return $tabTitle;
		},
		/**
		 * @public
		 * 根据id或序号，获取选项卡内容jQuery对象。
		 * 未找到则返回null。
		 * 如未输入参数，则获取当前激活的选项卡内容。
		 * @param	index	选项卡序号或id
		 */
		getTabContentElement : function(index)
		{
			if (index == undefined)
			{
				index = this.getActiveTabIndex();
			}

			var $tabContent = null;
			if (mc.isNumber(index))
			{
				$tabContent = $(".layui-tab-content", this.element).children("div.layui-tab-item").eq(index);			
			}
			else if (mc.isString(index))
			{
				$tabContent = $(".layui-tab-content", this.element).children("div.layui-tab-item#" + index);
			}

			if ($tabContent.length <= 0)
			{
				$tabContent = null;
			}

			return $tabContent;
		},

		/**
		 * @private
		 * 获取标题序号
		 */
		getTabTitleIndex : function($tabTitle)
		{
			return $(".layui-tab-title", this.element).children("li").index($tabTitle);
		},
		/**
		 * @private
		 * 获取内容页序号
		 */
		getTabContentIndex : function($tabContent)
		{
			return $(".layui-tab-content", this.element).children("div[class*=layui-tab-item]").index($tabContent);			
		},
		/**
		 * @private
		 * 获取标题Id
		 */
		getTabTitleId : function($tabTitle)
		{
			return $tabTitle[0].id;
		},
		/**
		 * @private
		 * 获取内容页Id
		 */
		getTabContentId : function($tabContent)
		{
			return $tabContent[0].id;
		},

		/**
		 * @private
		 * 根据id获取序号
		 */
		getIndexById : function(index)
		{
			if (mc.isNumber(index))
			{
				return index;
			}
			else if (mc.isString(index))
			{
				var $tabTitle = this.getTabTitleElement(index);
				if ($tabTitle != null)
				{
					return this.getTabTitleIndex($tabTitle);
				}
				else
				{
					var $tabContent = this.getTabContentElement(index);
					if ($tabContent != null)
					{
						return this.getTabContentIndex($tabContent);
					}
				}
			}

			return -1;
		},

		/**
		 * @private
		 * 根据序号或id，获取lay-id
		 * 提供layui.element相关操作使用。
		 */
		getLayId : function(index)
		{
			var tabIndex = this.getIndexById(index);

			var $tabTitles = $(".layui-tab-title", this.element).children("li");
			if (tabIndex >= 0 && tabIndex < $tabTitles.size())
			{
				return $tabTitles.eq(tabIndex).attr("lay-id");			
			}

			return "";
		},
		/**
		 * @public
		 * 获取当前选项卡标题id。
		 */
		getActiveTabTitleId : function()
		{
			var $tabTitle = $("li.layui-this", this.element);

			return $tabTitle[0].id;
		},
		/**
		 * @public
		 * 获取当前选项卡内容页id。
		 */
		getActiveTabContentId : function()
		{
			var $tabContent = $("div.layui-show", this.element);

			return $tabContent[0].id;
		},
		/**
		 * @public
		 * 获取当前选项卡序号。序号从0开始。
		 */
		getActiveTabIndex : function()
		{
			var $tabTitle = $("li.layui-this", this.element);

			return $(".layui-tab-title", this.element).children("li").index($tabTitle);
		},
		/**
		 * @public
		 * 根据选项卡id或序号，切换当前选项卡。
		 * 分别设置title和content的样式
		 * title => layui-this
		 * content => layui-show
		 * @param	index	选项卡序号或id
		 */
		changeTab : function(index)
		{
			if (index == undefined)
			{
				return;
			}

			var lay_id = this.getLayId(index);
			if (lay_id == "")
			{
				return;
			}

			layui.element.tabChange(this._TabLayFilter, lay_id);
			return;

			/* 原有实现暂时保留，不依赖于layui.element操作
			var $tabTitle = null;
			var $tabContent = null;
			if (mc.isNumber(index))
			{
				$tabTitle = this.getTabTitleElement(index);
				$tabContent = this.getTabContentElement(index);
			}
			else if (mc.isString(index))
			{
				var tabIndex = this.getIndexById(index);
				if (tabIndex >= 0)
				{
					$tabTitle = this.getTabTitleElement(tabIndex);
					$tabContent = this.getTabContentElement(tabIndex);
				}
				else
				{
					return;
				}
			}

			if ($tabTitle == null || $tabContent == null)
			{
				return;
			}

			var $tabTitles = $(".layui-tab > .layui-tab-title > li", this.element);
			$tabTitles.removeClass("layui-this");
			var $tabContents = $(".layui-tab > .layui-tab-content > .layui-tab-item", this.element);
			$tabContents.removeClass("layui-show");

			$tabTitle.addClass("layui-this");
			$tabContent.addClass("layui-show");
			*/
		},

		/**
		 * @public
		 * 根据选项卡id或序号，获取选项卡标题文本。
		 * 如未输入参数，则获取当前激活的选项卡标题文本。
		 * @param	index	选项卡序号或id
		 */
		getTabTitle : function(index)
		{
			return this.getTabTitleElement(index).html();
		},
		/**
		 * @public
		 * 根据选项卡id或序号，设置选项卡标题文本。
		 * 支持html。
		 * 如未输入参数，则设置当前激活的选项卡标题文本。
		 * @param	title	选项卡标题文本（支持html）
		 * @param	index	选项卡序号或id
		 */
		setTabTitle : function(title, index)
		{
			this.getTabTitleElement(index).html(title);
		},
		/**
		 * @public
		 * Tab选项卡页是否隐藏
		 * @param	index	选项卡序号或id
		 */
		isHidden : function(index)
		{
			var tabIndex = this.getIndexById(index);
			if (tabIndex >= 0)
			{
				return this.getTabTitleElement(tabIndex).is(":hidden");
			}
			else
			{
				return false;
			}
		},
		/**
		 * @public
		 * 显示Tab选项卡页
		 * @param	index	选项卡序号或id
		 */
		show : function(index)
		{
			if (index == undefined)
			{
				index = this.getActiveTabIndex();
			}

			var tabIndex = this.getIndexById(index);
			if (tabIndex < 0)
			{
				return;
			}

			this.getTabTitleElement(tabIndex).show();
		},
		/**
		 * @public
		 * 隐藏选项卡页
		 * @param	index	选项卡序号或id
		 */
		hide : function(index)
		{
			if (index == undefined)
			{
				index = this.getActiveTabIndex();
			}

			var tabIndex = this.getIndexById(index);
			if (tabIndex < 0)
			{
				return;
			}

			var currentIndex = this.getActiveTabIndex();

			var $tabTitle = this.getTabTitleElement(tabIndex)
			var $tabContent = this.getTabContentElement(tabIndex)

			$tabTitle.removeClass("layui-this");
			$tabTitle.hide();
			$tabContent.removeClass("layui-show");
			$tabContent.hide();

			/**
			 * 如果隐藏的是当前显示选项卡
			 * 还需要切换显示选项卡
			 * 先往前查找，如未找到则往后查找
			 */
			if (currentIndex == tabIndex)
			{
				for (var i = currentIndex - 1; i >= 0; i--)
				{
					if (! this.isHidden(i))
					{
						this.changeTab(i);
						return;
					}
				}

				for (var i = currentIndex + 1; i < this.getTabCount(); i++)
				{
					if (! this.isHidden(i))
					{
						this.changeTab(i);
						return;
					}
				}
			}
		},
		/**
		 * @public
		 * 显示全部Tab选项卡页
		 */
		showAll : function()
		{
			if (this.getActiveTabIndex() >= 0)
			{
				for (var index = 0; index < this.getTabCount(); index++)
				{
					this.getTabTitleElement(index).show();
				}
			}
			else
			{
				for (var index = 0; index < this.getTabCount(); index++)
				{
					this.getTabTitleElement(index).show();
				}

				if (this.getTabCount() > 0)
				{
					this.changeTab(0);
				}
			}
		},
		/**
		 * @public
		 * 增加Tab选项卡
		 * @param	title	标题栏文本，支持html
		 * @param	content	内容页，支持html
		 * @param	id		标题栏id，可为空
		 */
		addTab : function(title, content, id)
		{
			var lay_id = this._TabLayFilter + "-" + mc.newid_js();

			/* 新增选项卡不显示关闭按钮，即使加上图标也不没有关闭事件。因此暂时不加图标。
			if (this._getAllowClose())
			{
				title += "<i class='layui-icon layui-unselect layui-tab-close'>ဆ</i>";
			}
			*/

			layui.element.tabAdd(this._TabLayFilter,
			{
				id : lay_id,
				title : title,
				content: content
			});
			
			layui.element.render("tab", this._TabLayFilter);

			var $tabTitle = $("li[lay-id='" + lay_id + "']", this.element);
			$tabTitle.attr("id", id);
			var tabIndex = this.getTabTitleIndex($tabTitle);
			var $tabContent = this.getTabContentElement(tabIndex);
			
			mc.layout.layout_core($tabContent, this, this.options, false);

			return tabIndex;
		},
		/**
		 * @public
		 * 删除Tab选项卡
		 * @param	index	选项卡序号或id
		 */
		deleteTab : function(index)
		{
			var tabIndex = -1;
			if (index == undefined)
			{
				tabIndex = this.getActiveTabIndex();
			}
			else
			{
				tabIndex = this.getIndexById(index);
			}

			var lay_id = this.getLayId(tabIndex);
			if (lay_id == "")
			{
				return;
			}

			layui.element.tabDelete(this._TabLayFilter, lay_id);
		},

		/**
		 * @override		实现接口
		 * 调整容器尺寸
		 * 递归调整下级容器的resize方法
		 */
		resize : function()
		{
			mc.console.log("resize, " + this.getWidgetFullName() + ", " + this.element[0].tagName + ", " + this.element[0].id);

			/**
			 * 遍历子容器
			 */
			if (this.getChildrenContainerInstance() != null && $.isArray(this.getChildrenContainerInstance()))
			{
				for (var i = 0; i < this.getChildrenContainerInstance().length; i++)
				{
					var $wd_child_container_inst = this.getChildrenContainerInstance()[i];
					$wd_child_container_inst.resize();
				}
			}
		}
	});
})(jQuery);