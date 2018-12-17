MCloud.namespace("MCloud.util");

/**
 * string类型工具类
 */
MCloud.util.StringUtil = {};

/**
 * 缩写定义
 */
StringUtil = MCloud.util.StringUtil;
mc.str = MCloud.util.StringUtil;

/**
 * 判断是否为字符串
 */
MCloud.util.StringUtil.isString = function(value)
{
	if (value == undefined || value === null)
	{
		return false;
	}
	
	return (typeof (value) == "string")
};

/**
 * 判断字符串是否为Null
 */
MCloud.util.StringUtil.isNull = function(value)
{
	return (value === null);
};
/**
 * 判断字符串是否为空字符串
 * 严格按照字符串类型判断，null和其他类型、对象都不是空字符串
 * alert(Ext.isEmpty(null)) = true;
 * alert(Ext.isEmpty("")) = true;
 * alert(Ext.isEmpty({})) = false;
 * alert(Ext.isEmpty(undefined)) = true;

 * alert(MCloud.util.StringUtil.isEmpty(null)) = false;
 * alert(MCloud.util.StringUtil.isEmpty("")) = true;
 * alert(MCloud.util.StringUtil.isEmpty({})) = false;
 * alert(MCloud.util.StringUtil.isEmpty(undefined)) = false;
 */
MCloud.util.StringUtil.isEmpty = function(value)
{
	if (value == undefined || value === null)
	{
		return true;
	}
	
	if (typeof (value) !== "string")
	{
		return true;
	}

	if ($.trim(value) === "")
	{
		return true;
	}
	else
	{
		return false;
	}
};
MCloud.util.StringUtil.isempty = MCloud.util.StringUtil.isEmpty;

MCloud.util.StringUtil.notEmpty = function(value)
{
	return ! (MCloud.util.StringUtil.isEmpty(value));
};
MCloud.util.StringUtil.notempty = MCloud.util.StringUtil.notEmpty;

/**
 * 字符串数组序列化为字符串，用特定分隔符分隔，格式AA,BB,CC
 * 已过时，使用Array.toString()
 * array	字符串数组
 * sign		分隔符
 */
MCloud.util.StringUtil.ArrayToString = function(array)
{
	return MCloud.util.StringUtil.ArrayToString(arrayIndexID, ",");
};
/**
 * 字符串数组序列化为字符串，用逗号分隔，格式AA,BB,CC
 * array	字符串数组
 */
MCloud.util.StringUtil.ArrayToString = function(array, sign)
{
	if(typeof(array) !== "object")
	{
		return "";
	}

	if(typeof(sign) !== "string")
	{
		return "";
	}

	var strList = "";
	if (array.length === 1)
	{
		if (! (array[0] === "") )
		{
			strList = array[0];
		}
	}
	else if (array.length > 1)
	{
		for ( var i = 0; i < array.length; i++)
		{
			if (i == 0)
			{
				strList += indexs[i];
			}
			else
			{
				strList += sign + indexs[i];
			}
		}				
	}

	return strList;
};

/**
 * 必输字段标签文本处理，增加红色星号
 */
MCloud.util.StringUtil.setKeyFieldLabel = function(strLabel)
{
	if(typeof(strLabel) === "string")
	{
		return strLabel + "<font color='red'>*</font>";
	}
	else
	{
		return strLabel;
	}
};

/**
 * 文本设置超链接风格
 */
MCloud.util.StringUtil.setURLStyle = function(strLabel)
{
	if (typeof(strLabel) === "string")
	{
		return "<font color='blue'><u>" + strLabel + "</u></font>";
	}
	else if (typeof(strLabel) === "number")
	{
		return "<font color='blue'><u>" + strLabel.toString() + "</u></font>";
	}
	else
	{
		return strLabel;
	}
};

MCloud.util.StringUtil.LimitedCharArray = [ '!', '&', ';',
				                           '$', '%', '@',
				                           '\'', '"',
				                           '<', '>',
				                           '(', ')' ];

/**
 * 字符串是否包含不安全的受限字符
 * @return boolean true存在不安全的受限字符，false不存在
 */
MCloud.util.StringUtil.hasLimitedChar = function(strInputString)
{
	for (var i = 0; i < MCloud.util.StringUtil.LimitedCharArray.length; i++)
	{
		var chrLimitedChar = $.trim(MCloud.util.StringUtil.LimitedCharArray[i]);

		if (strInputString.indexOf(chrLimitedChar) >= 0)
		{
			return true;
		}
	}

	return false;
};

/**
 * 获得字符串包含的不安全字符
 * @return array 输入字符串包含的不安全字符数组, 如不包含则返回空数组
 */
MCloud.util.StringUtil.getLimitedCharArray = function(strInputString)
{
	var arrayLimitedChar = new Array();

	for (var i = 0; i < MCloud.util.StringUtil.LimitedCharArray.length; i++)
	{
		var chrLimitedChar = MCloud.util.StringUtil.LimitedCharArray[i].trim();

		if (strInputString.indexOf(chrLimitedChar) >= 0)
		{
			arrayLimitedChar.push(chrLimitedChar);
		}
	}

	return arrayLimitedChar;
};

/**
 * 获得字符串包含的不安全字符
 * @return string 输入字符串包含的第一个不安全字符, 如不包含则返回空字符串
 */
MCloud.util.StringUtil.getFirstLimitedChar = function(strInputString)
{
	var arrayLimitedChar = MCloud.util.StringUtil.getLimitedCharArray(strInputString);

	if (arrayLimitedChar.length > 0)
	{
		return arrayLimitedChar[0];
	}
	else
	{
		return "";
	}
};

/**
 * 判断字符串是否为Null
 */
String.prototype.isNull = function()
{
	return MCloud.util.StringUtil.isNull(this.valueOf());
};

/**
 * 判断字符串是否为空字符串
 */
String.prototype.isEmpty = function()
{
	return MCloud.util.StringUtil.isEmpty(this.valueOf());
};