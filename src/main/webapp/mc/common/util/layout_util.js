mc.namespace("MCloud.util.LayoutUtil");

/**
 * MC框架布局核心工具类
 * @author	yulei
 *
 * 支持MC框架自适应布局和滚动布局两种
 * 需要配合自定义属性配置
 * 
 * 布局只扫描body、div元素，其他忽略
 * 布局支持div嵌套递归，如果有其他元素隔开则无法递归。
 * 同时主页面布局与对话框布局、选项卡布局互相隔离
 * 
 * 快捷访问方式：
 * mc.layout.init
 * mc.layout.initDialog
 * mc.layout.resizeDialog
 */

/**
 * 快捷访问方式
 */
LayoutUtil = MCloud.util.LayoutUtil;
mc.layout = MCloud.util.LayoutUtil;

/**
 * @public
 * 页面整体布局初始化<br>
 * @param $element	整体布局渲染入口。需传入jQuery对象，如不传入则从body开始布局。
 */
MCloud.util.LayoutUtil.init = function($element, options)
{
	if ($element == undefined || $element == null
			|| ! ($element instanceof jQuery) || $element.length <= 0 )
	{
		$element = $("body");
	}

	MCloud.util.LayoutUtil.layout_core($element, null, options, true);

	/**
	 * body绑定resize
	 */
	if ($element[0].tagName.toLowerCase() == "body")
	{
		$(window).resize(function(event)
		{
			var wg_container_fullname = $("body").data("mc-container-fullname");
			var $widget_inst = $("body").data(wg_container_fullname);
			if(mc.isFunction($widget_inst.resize))
			{
				$widget_inst.resize();
				mc.console.log("body resize begin, wg_container_fullname=" + wg_container_fullname);
			}
		});
	}
};

/**
 * @private
 * 布局核心方法
 * 递归所有下级div元素，创建容器布局
 * 递归遍历所有div，如有需要的则开始布局
 * 递归过程中遇到对话框布局，则停止递归。由专用的对话框布局API（initDialog、resizeDialog）进行布局
 * 遇到选项卡布局也停止递归
 * @param	$element	布局起点对象jQuery对象
 * @param	$wg_parent_container_inst	上级容器widget instance
 * @param	options		布局参数
 * @param	isRoot		是否布局起点，决定对于dialog布局的处理
 */
MCloud.util.LayoutUtil.layout_core = function($element, $wg_parent_container_inst, options, isRoot)
{
	mc.assert_jquery($element);
	mc.console.log("layout_core begin");

	/**
	 * 避免重复布局
	 */
	var containerFullName = $element.data("mc-container-fullname");
	if (mc.str.notempty(containerFullName))
	{
		return;
	}

	/**
	 * 当前容器widget instance
	 */
	var $wg_container_inst = null;

	/**
	 * 遍历已注册容器，如遇匹配则创建容器组件
	 */
	MCloud.layout.ContainerMgr.each(function(widgetFullName, containerName, index)
	{
		if (eval("$." + containerName.fullName + ".prototype.checkHtml($element)"))
		{
			eval("$element." + containerName.name + "(options)");
			eval("$element." + containerName.name + "('parentContainerInstance', $wg_parent_container_inst)");

			$wg_container_inst = eval("$element." + containerName.name + "('instance')");

			if ($wg_parent_container_inst != null)
			{
				$wg_parent_container_inst.getChildrenContainer().push($element);
				$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
			}

			mc.console.log("create " + containerName.name + ", " + $element[0].tagName + ", " + $element[0].id);

			return false;		
		}
	});

	if ($wg_container_inst != null)
	{
		return;
	}

	/**
	 * dialog
	 * 可以用dialog作为布局起点，但布局中途遇到dialog容器则跳过。
	 */
	if ($element.hasClass("mc-dialog-container"))
	{
		if (! isRoot)
		{
			return;
		}
	}
	
	/**
	 * 创建TabContainer
	 */
	if ($.mc.TabContainer.prototype.checkHtml($element))
	{
		$element.TabContainer(options);
		$element.TabContainer("parentContainerInstance", $wg_parent_container_inst);
		$wg_container_inst = $element.TabContainer("instance");

		if ($wg_parent_container_inst != null)
		{
			$wg_parent_container_inst.getChildrenContainer().push($element);
			$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		}

		mc.console.log("create TabContainer, " + $element[0].tagName + ", " + $element[0].id);

		return;
	}

	/**
	 * 创建BorderContainer
	 */
	if ($.mc.BorderContainer.prototype.checkHtml($element))
	{
		$element.BorderContainer(options);
		$element.BorderContainer("parentContainerInstance", $wg_parent_container_inst);
		$wg_container_inst = $element.BorderContainer("instance");

		if ($wg_parent_container_inst != null)
		{
			$wg_parent_container_inst.getChildrenContainer().push($element);
			$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		}

		mc.console.log("create BorderContainer, " + $element[0].tagName + ", " + $element[0].id);

		return;
	}

	/**
	 * 创建PlainContainer
	 */
	if ($.mc.PlainContainer.prototype.checkHtml($element))
	{
		$element.PlainContainer(options);
		$element.PlainContainer("parentContainerInstance", $wg_parent_container_inst);
		$wg_container_inst = $element.PlainContainer("instance");

		if ($wg_parent_container_inst != null)
		{
			$wg_parent_container_inst.getChildrenContainer().push($element);
			$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		}

		mc.console.log("create PlainContainer, " + $element[0].tagName + ", " + $element[0].id);

		return;
	}
};

/**
 * @public
 * 初始化dilaog入口
 */
MCloud.util.LayoutUtil.initDialog = function($element, options)
{
	mc.assert_jquery($element);

	MCloud.util.LayoutUtil.layout_core($element, null, options, true);

	MCloud.util.LayoutUtil.resizeDialog($element);
};

/**
 * @public
 * 对dialog重布局
 */
MCloud.util.LayoutUtil.resizeDialog = function($element)
{
	mc.assert_jquery($element);

	var containerFullName = $element.data("mc-container-fullname");
	if (containerFullName == $.mc.BorderContainer.prototype.getWidgetFullName())
	{
		$element.layout().resizeAll();
	}
	else if (containerFullName == $.mc.PlainContainer.prototype.getWidgetFullName())
	{
		$element.PlainContainer("resize");
	}
};


/**
 * 待删除
 * @private
 * 创建容器widget，并设置容器的上下级
 * 碰到内置的表单、表格、树、选项卡、对话框等容器，则停止递归
 * @param	$element	html节点jQuery对象
 * @param	$$wg_parent_container_inst	上级容器widget instance
 * @param	options		布局参数
 * @param	isRoot		是否布局起点
 * @return
 * 		如要继续递归下级容器，返回当前容器widget instance
 * 		返回null，则不继续递归下级
 */
MCloud.util.LayoutUtil.create_Container = function($element, $wg_parent_container_inst, options, isRoot)
{
	mc.assert_jquery($element);

	/**
	 * 当前容器widget instance
	 */
	var $wg_container_inst = null;

	/**
	 * 创建内置容器
	 */
	if ($element.hasClass("mc-form-container"))
	{
		$element.FormContainer(options);
		$element.FormContainer("parentContainerInstance", $wg_parent_container_inst);

		$wg_parent_container_inst.getChildrenContainer().push($element);
		$wg_container_inst = $element.FormContainer("instance");
		$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		return null;
	}

	if ($element.hasClass("mc-grid-container"))
	{
		$element.GridContainer(options);
		$element.GridContainer("parentContainerInstance", $wg_parent_container_inst);

		$wg_parent_container_inst.getChildrenContainer().push($element);
		$wg_container_inst = $element.GridContainer("instance");
		$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		return null;
	}

	if ($element.hasClass("mc-tree-container"))
	{
		$element.TreeContainer(options);
		$element.TreeContainer("parentContainerInstance", $wg_parent_container_inst);

		$wg_parent_container_inst.getChildrenContainer().push($element);
		$wg_container_inst = $element.TreeContainer("instance");
		$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
		return null;
	}

	if ($element.hasClass("mc-tab-container"))
	{
		$element.TabContainer(options);
		$element.TabContainer("parentContainerInstance", $wg_parent_container_inst);

		$wg_parent_container_inst.getChildrenContainer().push($element);
		$wg_container_inst = $element.TabContainer("instance");
		$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);

		/**
		 * 递归tab页布局，跳过标签部分
		 */
		var $children = $("div[class*='layui-tab-item']", $element);
		$children.each(function(index)
		{
			var $div_tab = $(this);

			MCloud.util.LayoutUtil.init($div_tab, options);
//			MCloud.util.LayoutUtil.Layout_recursion($div_tab, $wg_container_inst, options, false);
		});

		return null;
	}

	/**
	 * 可以用dialog作为布局起点，但布局中途遇到dialog容器则跳过。
	 */
	if ($element.hasClass("mc-dialog-container"))
	{
		if (isRoot)
		{
			/**
			 * to-do
			 */
		}
		else
		{
			return null;
		}
	}

	/**
	 * 创建自定义容器
	 * 还需要细化
	 */
/*	var entrys = MCloud.layout.ContainerManager.items.entrys();
	for (var i = 0; i < entrys.length; i++)
	{
		var containerName = entrys[i].key;
		if ($element.hasClass(containerName))
		{
			return MCloud.layout.ContainerManager.create(containerName, $element, {});
		}
	}*/

	/**
	 * 创建布局容器
	 */
	$element.BorderContainer(options);
	$element.BorderContainer("parentContainerInstance", $wg_parent_container_inst);

	$wg_container_inst = $element.BorderContainer("instance");
	if ($wg_parent_container_inst != null)
	{
		$wg_parent_container_inst.getChildrenContainer().push($element);
		$wg_parent_container_inst.getChildrenContainerInstance().push($wg_container_inst);
	}
	return $wg_container_inst;
};
