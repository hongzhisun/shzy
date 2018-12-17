mc.namespace("MCloud.layout.ContainerManager");

/**
 * 容器管理类
 * 负责容器类的注册、管理。
 */
MCloud.layout.ContainerMgr = MCloud.layout.ContainerManager;
ContainerMgr = MCloud.layout.ContainerManager;

MCloud.layout.ContainerManager.items = new MCloud.data.Map();

/**
 * 注册容器类
 * @param	widgetFullName	容器组件widget全名称，mc-BorderContainer
 * @param	containerName	容器组件名称
 * {
 * 		fullName	mc.BorderContainer
 * 		name		BorderContainer
 * }
 */
MCloud.layout.ContainerManager.register = function(widgetFullName, containerName)
{
	if (mc.str.isempty(widgetFullName))
	{
		alert("ContainerMgr.register widgetName不可为空");
		return;
	}

	if (mc.str.isempty(containerName.fullName))
	{
		alert("ContainerMgr.register containerName.fullName不可为空");
		return;
	}

	if (mc.str.isempty(containerName.name))
	{
		alert("ContainerMgr.register containerName.name不可为空");
		return;
	}

	if (MCloud.layout.ContainerManager.items.contains(widgetFullName))
	{
		alert("ContainerMgr.register " + widgetFullName + "已存在，不可重复注册");
		return;
	}

	MCloud.layout.ContainerManager.items.put(widgetFullName, containerName);
};

/**
 * 反注册容器类
 */
MCloud.layout.ContainerManager.unregister = function(widgetFullName)
{
	MCloud.layout.ContainerManager.items.remove(widgetFullName);
};

/**
 * 根据名称获取容器类
 */
MCloud.layout.ContainerManager.get = function(widgetFullName)
{
	return MCloud.layout.ContainerManager.items.get(widgetFullName);
};

/**
 * 遍历
 */
MCloud.layout.ContainerManager.each = function(callback)
{
	return MCloud.layout.ContainerManager.items.each(callback);
};

/**
 * 根据名称判断是否包含容器类
 */
MCloud.layout.ContainerManager.contains = function(widgetFullName)
{
	return MCloud.layout.ContainerManager.items.contains(widgetFullName);
};