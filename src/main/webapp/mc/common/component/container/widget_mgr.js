mc.namespace("MCloud.layout");

/**
 * widget类管理
 * 方便直接调用widget类。
 */
MCloud.layout.WidgetManager = {};

WidgetMgr = MCloud.layout.WidgetManager;

/**
 * 创建容器widget对象
 * $element			html的jQuery对象
 * return			新创建的容器widget对象
 */
MCloud.layout.WidgetManager.create = function($element, options)
{
	if ($element == undefined || $element == null || ! ($element instanceof jQuery))
	{
		return null;
	}

	if ($element.hasClass("mc-form-container"))
	{
		$element.FormContainer(options);
	}

	if ($element.hasClass("mc-grid-container"))
	{
		$element.GridContainer(options);
	}

	if ($element.hasClass("mc-tree-container"))
	{
		$element.TreeContainer(options);
	}

	if ($element.hasClass("mc-dialog-container"))
	{
		return;
	}

	var containerName = $element.hasClass("")
	
	return MCloud.layout.ContainerManager.create();
};