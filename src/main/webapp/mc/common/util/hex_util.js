MCloud.namespace("MCloud.util");

/**
 * 密码加密工具类
 * 用作传输层加密
 */
MCloud.util.HexUtil = {};

HexUtil = MCloud.util.HexUtil;

MCloud.util.HexUtil.toHex = function(str, salt)
{
	str = salt + str;
	var val = "";
	for (var i = 0; i < str.length; i++)
	{
		val += str.charCodeAt(i).toString(16);			
	}
	return val;
};

MCloud.util.HexUtil.fromHex = function(str)
{
	var source = ""
	for (var i = 0; i < str.length; i = i + 2)
	{
		var c = str.substr(i, 2);
		source += String.fromCharCode(parseInt(c, 16));
	}

	return source;
};