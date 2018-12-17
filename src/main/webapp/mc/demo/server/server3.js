initActionResult = function()
{
	/**
	 * 获取成功与否标志
	 */
	$("#btnActionResult1").click(function(event)
	{
		$.ajax(
		{
			url : "demo/server/actionresult/do",
			type : "get",
			data : {},
			success : function(data, status)
			{
				output1(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 获取列表数据
	 */
	$("#btnActionResult2").click(function(event)
	{
		$.ajax(
		{
			url : "demo/server/actionresult/list",
			type : "get",
			data : {},
			success : function(data, status)
			{
				output1(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 获取分页数据
	 */
	$("#btnActionResult3").click(function(event)
	{
		$.ajax(
		{
			url : "demo/server/actionresult/page",
			type : "get",
			data : {},
			success : function(data, status)
			{
				output1(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 获取自定义格式消息
	 */
	$("#btnActionResult4").click(function(event)
	{
		$.ajax(
		{
			url : "demo/server/actionresult/custom",
			type : "get",
			data : {},
			success : function(data, status)
			{
				output1(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 获取字符串
	 */
	$("#btnActionResult5").click(function(event)
	{
		$.ajax(
		{
			url : "demo/server/actionresult/string",
			type : "get",
			data : {},
			success : function(data, status)
			{
				output1(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});
};

output1 = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}
	
	$("#textarea1").text(text);
};

initActionParam = function()
{
	/**
	 * 发送打包的查询参数
	 */
	$("#btnActionParam1").click(function(event)
	{
		var queryParam = 
		{
			code : "111",
			name : "张",
			money_max : 2000,
			money_min : 100
		};

		output2_param(queryParam);

		$.ajax(
		{
			url : "demo/server/requestparamdemo/list",
			type : "get",
			data : 
			{
				jsonCondition : mc.encode(queryParam)
			},
			success : function(data, status)
			{
				output2_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 发送打包的分页查询参数
	 */
	$("#btnActionParam2").click(function(event)
	{
		var queryParam = 
		{
			code : "111",
			name : "张",
			money_max : 2000,
			money_min : 100
		};

		output2_param(queryParam);

		$.ajax(
		{
			url : "demo/server/requestparamdemo/page",
			type : "get",
			data : 
			{
				jsonCondition : mc.encode(queryParam),
				start : 0,
				limit : 20
			},
			success : function(data, status)
			{
				output2_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 发送打包的实体数据(json)
	 */
	$("#btnActionParam3").click(function(event)
	{
		var province = 
		{
			id : "9001",
			code : "9001",
			name : "火星特别行政区"
		};

		output2_param(province);

		$.ajax(
		{
			url : "demo/server/requestparamdemo/add",
			type : "get",
			data : 
			{
				province : mc.encode(province)
			},
			success : function(data, status)
			{
				output2_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 发送打包的实体列表数据(json)
	 */
	$("#btnActionParam4").click(function(event)
	{
		var province1 = 
		{
			id : "9001",
			code : "9001",
			name : "火星特别行政区"
		};

		var province2 = 
		{
			id : "9002",
			code : "9002",
			name : "猎户座特别行政区"
		};

		var province3 = 
		{
			id : "9003",
			code : "9003",
			name : "塞伯坦特别行政区"
		};

		var provincelist = [province1, province2, province3];

		output2_param(provincelist);

		$.ajax(
		{
			url : "demo/server/requestparamdemo/addlist",
			type : "get",
			data : 
			{
				provincelist : mc.encode(provincelist),
			},
			success : function(data, status)
			{
				output2_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	/**
	 * 发送打包的实体列表数据(json)
	 */
	$("#btnActionParam5").click(function(event)
	{
		var province1 = 
		{
			id : "9001",
			code : "9001",
			name : "火星特别行政区"
		};

		var province2 = 
		{
			id : "9002",
			code : "9002",
			name : "猎户座特别行政区"
		};

		var province3 = 
		{
			id : "9003",
			code : "9003",
			name : "塞伯坦特别行政区"
		};

		var provincelist = [province1, province2, province3];

		output2_param(
		{
			province : province1,
			provincelist : provincelist
		});

		$.ajax(
		{
			url : "demo/server/requestparamdemo/addlist2",
			type : "get",
			data : 
			{
				province : mc.encode(province1),
				provincelist : mc.encode(provincelist)
			},
			success : function(data, status)
			{
				output2_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});
};

output2_param = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}

	$("#textarea2_param").text(text);
};

output2_out = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}

	$("#textarea2_out").val(text);
};

initCommonDAO = function()
{
	$("#btnCommonDAO1").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/list/entity",
			type : "get",
			data : 
			{
				jsonCondition : queryParam
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnCommonDAO2").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/list/map",
			type : "get",
			data : 
			{
				jsonCondition : queryParam
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnCommonDAO3").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/page/entity",
			type : "get",
			data : 
			{
				jsonCondition : queryParam,
				start : 0,
				limit : 20
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnCommonDAO4").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/page/map",
			type : "get",
			data : 
			{
				jsonCondition : queryParam,
				start : 0,
				limit : 20
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnCommonDAO5").click(function(event)
	{
		var defaultQueryParam = "320500";

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/get",
			type : "get",
			data : 
			{
				id : queryParam
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnCommonDAO6").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get3_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da1/execute",
			type : "post",
			data : 
			{
				city : queryParam
			},
			success : function(data, status)
			{
				output3_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

}

get3_param = function(jsonObj)
{
	var val = $.trim($("#textarea3_param").val());
	if (val == null || val.length <= 0)
	{
		var text = "";
		if (typeof (jsonObj) == "string")
		{
			text = jsonObj;
		}
		else
		{
			text = JSON.stringify(jsonObj, null, "\t");
		}

		$("#textarea3_param").val(text);
	}

	return $("#textarea3_param").val();
};

output3_out = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}

	$("#textarea3_out").val(text);
};

initHibernateDAO = function()
{
	$("#btnHibernateDAO1").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get4_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da2/list/entity",
			type : "get",
			data : 
			{
				jsonCondition : queryParam
			},
			success : function(data, status)
			{
				output4_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});

	$("#btnHibernateDAO2").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "320500",
			name : "苏州"
		};

		var queryParam = get4_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da2/page/map",
			type : "get",
			data : 
			{
				jsonCondition : queryParam,
				start : 0,
				limit : 20
			},
			success : function(data, status)
			{
				output4_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});
};

get4_param = function(jsonObj)
{
	var val = $.trim($("#textarea4_param").val());
	if (val == null || val.length <= 0)
	{
		var text = "";
		if (typeof (jsonObj) == "string")
		{
			text = jsonObj;
		}
		else
		{
			text = JSON.stringify(jsonObj, null, "\t");
		}

		$("#textarea4_param").val(text);
	}

	return $("#textarea4_param").val();
};

output4_out = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}

	$("#textarea4_out").val(text);
};

initSessionDAO = function()
{
	$("#btnSessionDAO1").click(function(event)
	{
		var defaultQueryParam =
		{
			code : "SHYD/CGWLB",
			name : "采购物流部"
		};

		var queryParam = get5_param(defaultQueryParam);

		$.ajax(
		{
			url : "demo/server/da3/page/entity",
			type : "get",
			data : 
			{
				jsonCondition : queryParam,
				start : 0,
				limit : 20
			},
			success : function(data, status)
			{
				output5_out(data);
			},
			error : function(request, error, ex)
			{
				alert("获取数据失败: " + error);
			}
		});
	});
};

get5_param = function(jsonObj)
{
	var val = $.trim($("#textarea5_param").val());
	if (val == null || val.length <= 0)
	{
		var text = "";
		if (typeof (jsonObj) == "string")
		{
			text = jsonObj;
		}
		else
		{
			text = JSON.stringify(jsonObj, null, "\t");
		}

		$("#textarea5_param").val(text);
	}

	return $("#textarea5_param").val();
};

output5_out = function(jsonObj)
{
	var text = "";
	if (typeof (jsonObj) == "string")
	{
		text = jsonObj;
	}
	else
	{
		text = JSON.stringify(jsonObj, null, "\t");
	}

	$("#textarea5_out").val(text);
};

$(function()
{
	initActionResult();

	initActionParam();

	initCommonDAO();

	initHibernateDAO();

	initSessionDAO();
});