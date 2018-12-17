/**
 * Newtouch Cloud JavaScript Library
 * version : 1.0.0
 */
ManageCloud =
{
	version : '1.0.0',
	description : "newtouch cloud js lib"
};

/**
 * 缩写
 */
MCloud = ManageCloud;
MC = ManageCloud;
mc = ManageCloud;

/**
 * 定义命名空间
 */
MCloud.namespace = function()
{
	var a = arguments, o = null, i, j, d, rt;
	for (i = 0; i < a.length; ++i)
	{
		d = a[i].split(".");
		rt = d[0];
		eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
		for (j = 1; j < d.length; ++j)
		{
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}
};
MCloud.ns = MCloud.namespace;

MCloud.apply = function(o, c, defaults)
{
	if (defaults)
	{
		// no "this" reference for friendly out of scope calls
		MCloud.apply(o, defaults);
	}
	if (o && c && typeof c == 'object')
	{
		for ( var p in c)
		{
			o[p] = c[p];
		}
	}
	return o;
};

/**
 * 继承，暂不使用
 */
MCloud.extend = function()
{
	// inline overrides
	var io = function(o)
	{
		for ( var m in o)
		{
			this[m] = o[m];
		}
	};
	var oc = Object.prototype.constructor;

	return function(sb, sp, overrides)
	{
		if (typeof sp == 'object')
		{
			overrides = sp;
			sp = sb;
			sb = overrides.constructor != oc ? overrides.constructor : function()
			{
				sp.apply(this, arguments);
			};
		}
		var F = function()
		{
		}, sbp, spp = sp.prototype;
		F.prototype = spp;
		sbp = sb.prototype = new F();
		sbp.constructor = sb;
		sb.superclass = spp;
		if (spp.constructor == oc)
		{
			spp.constructor = sp;
		}
		sb.override = function(o)
		{
			MCloud.override(sb, o);
		};
		sbp.override = io;
		MCloud.override(sb, overrides);
		sb.extend = function(o)
		{
			MCloud.extend(sb, o);
		};
		return sb;
	};
}();

MCloud.override = function(origclass, overrides)
{
	if (overrides)
	{
		var p = origclass.prototype;
		for ( var method in overrides)
		{
			p[method] = overrides[method];
		}
	}
};

/**
 * ============== 序列化与反序列化 =================
 */
/**
 * js对象序列化为json字符串
 */
MCloud.encode = function(o)
{
	return JSON.stringify(o);
};
MCloud.tosjon = MCloud.encode;

/**
 * json字符串反序列化为js对象
 */
MCloud.decode = function(json)
{
	return eval("(" + json + ')');
};
MCloud.fromjson = MCloud.decode;

/**
 * ============== 类型判断 =================
 */
/**
 * 是否为js的Array类型对象
 */
MCloud.isArray = function(value)
{
	return (value) && (typeof(value.pop) == "function");
};

/**
 * 是否为js的Boolean类型对象
 */
MCloud.isBoolean = function(value)
{
	return (value) && (typeof(value) == "boolean");
};

/**
 * 是否为js的Date类型对象
 */
MCloud.isDate = function(value)
{
	return (value) && (typeof(value.getFullYear) == "function");
};

/**
 * 是否为js的Function类型对象
 */
MCloud.isFunction = function(value)
{
	return $.isFunction(value);
};

/**
 * 是否为js的Number类型对象，不包括NaN
 */
MCloud.isNumber = function(value)
{
	return $.isNumeric(value);
};

/**
 * 是否为js的Object类型对象，不包括null和undefined
 */
MCloud.isObject = function(value)
{
	return (value) && (typeof(value) == "object");
};

/**
 * 是否为js的String类型对象
 */
MCloud.isString = function(value)
{
	return (value) && (typeof(value) == "string");
};

/**
 * 是否为有效的jQuery对象
 */
MCloud.isJQuery = function(value)
{
	if (value == null || value == undefined)
	{
		return false;
	}
	return (MCloud.isObject(value) && (value instanceof jQuery) && value.length > 0);
};
MCloud.isjquery = MCloud.isJQuery;

/**
 * 是否为Html DOM对象
 */
MCloud.isDom = function(value)
{
};
MCloud.isdom = MCloud.isDom;

/**
 * 为js.Function增加作用域和附加参数
 * 也可使用$.proxy
 * @param obj			函数作用域
 * @param args			附加参数
 * @param appendArgs	参数附加类型。true直接替换原参数；false把参数附加在原参数后。
 * @returns {Function}	代理函数
 */
Function.prototype.createDelegate = function(obj, args, appendArgs)
{
	var method = this;
	return function()
	{
		var callArgs = args || arguments;
		if (appendArgs === true)
		{
			callArgs = Array.prototype.slice.call(arguments, 0);
			callArgs = callArgs.concat(args);
		}
		else if (typeof appendArgs == "number")
		{
			callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
			var applyArgs = [ appendArgs, 0 ].concat(args); // create method call params
			Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
		}
		return method.apply(obj || window, callArgs);
	};
};

/**
 * html原生的form post提交
 */
MCloud.formPost = function(url, jsonObj, target)
{
	var oForm = document.createElement("form");
	oForm.id = "newtouch-postForm";
	oForm.name = "newtouch-postForm";
	oForm.method = "post";
	oForm.action = url;
	oForm.target = target;
	oForm.style.display = "none";

	for ( var prop in jsonObj)
	{
		var oInput = document.createElement("input");
		oInput.name = prop;
		oInput.value = jsonObj[prop];
		oForm.appendChild(oInput);
	}
	document.body.appendChild(oForm);
	oForm.submit();
};