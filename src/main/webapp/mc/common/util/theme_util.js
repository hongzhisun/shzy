mc.namespace("MCloud.util.ThemeUtil");

/**
 * 主题皮肤辅助工具类
 * @author	yulei
 * 
 * 快捷访问方式：
 * mc.tree.attr(tree_id, attrKey)
 */

/**
 * 快捷访问方式
 */
ThemeUtil = MCloud.util.ThemeUtil;
mc.theme = MCloud.util.ThemeUtil;


/**
 * @public
 * 所有页面加载指定皮肤
 */
MCloud.util.ThemeUtil.loadAll = function(themeId)
{
	
};

/**
 * @public
 * 当前页面加载指定皮肤
 * @param	themeId		string	皮肤Id
 */
MCloud.util.ThemeUtil.load = function(themeId)
{
	if (! MCloud.util.ThemeUtil.existThemeId(themeId))
	{
		return;
	}

	if (themeId == MCloud.util.ThemeUtil.getCurrentThemeId())
	{
		return;
	}

	/**
	 * 读取css文件清单
	 */

	/**
	 * 定位
	 */

	/**
	 * 删除已有的皮肤css
	 */

	/**
	 * 增加皮肤css
	 */
};

/**
 * @public
 * 当前页面加载/恢复默认皮肤
 */
MCloud.util.ThemeUtil.loadDefault = function()
{
	/**
	 * 获取默认皮肤Id
	 */
	var defaultThemeId = MCloud.util.ThemeUtil.getDefaultThemeId();

	MCloud.util.ThemeUtil.load(defaultThemeId);
};

/**
 * 获取默认主题Id
 */
MCloud.util.ThemeUtil.getDefaultThemeId = function()
{
	return mc.theme.config.defaultId;
};

/**
 * 获取当前主题Id
 */
MCloud.util.ThemeUtil.getCurrentThemeId = function()
{
};

/**
 * 主题Id是否存在
 */
MCloud.util.ThemeUtil.existThemeId = function(themeId)
{
	for (var i = 0; i < mc.theme.config.themes.length; i++)
	{
		var config = mc.theme.config.themes[0];
	
		if (config.id == themeId)
		{
			return true;
		}
	}

	return false;
};

