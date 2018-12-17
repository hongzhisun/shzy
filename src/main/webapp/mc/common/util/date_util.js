MCloud.namespace("MCloud.util");

/**
 * date类型工具类
 */
MCloud.util.DateUtil = {};

DateUtil = MCloud.util.DateUtil;

MCloud.util.DateUtil.getNow = function()
{
	return new Date();
};
MCloud.util.DateUtil.getMonthFirstDay = function()
{
	var now = new Date();
	var strYear = now.getFullYear();
	var intMonth = now.getMonth() + 1;
	var strDay = strYear + "-" + String.leftPad(intMonth, 2, "0") + "-01";

	return strDay;
};
MCloud.util.DateUtil.getCurrentYear = function()
{
	return MCloud.util.DateUtil.getNow().getFullYear();
};
/**
 * 时间对象的格式化;
 */
/*Date.prototype.format = function(format)
{
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
/*	var o =
	{
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
		"S" : this.getMilliseconds()//millisecond
	};

	if (/(y+)/.test(format))
	{
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for ( var k in o)
	{
		if (new RegExp("(" + k + ")").test(format))
		{
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};*/