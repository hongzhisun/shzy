MCloud.namespace("MCloud.util");

/**
 * 控制台输出工具类
 */
MCloud.util.ConsoleUtil = {};
/**
 * 同名
 */
ConsoleUtil = MCloud.util.ConsoleUtil;
mc.console = MCloud.util.ConsoleUtil;

/**
 * 全局开关
 */
MCloud.util.ConsoleUtil.enable = false;

/**
 * 控制台输出
 */
MCloud.util.ConsoleUtil.log = function(msg)
{
	if (window.console)
	{
		if (MCloud.util.ConsoleUtil.enable)
		{
			console.log(msg);
		}
	}
};
mc.console.log = MCloud.util.ConsoleUtil.log;

