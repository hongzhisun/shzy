mc.namespace("MCloud.util.GridUtil");

/**
 * jQGrid辅助工具类
 * 定义了jQGrid组件的常用辅助函数和常用初始化参数
 * 并封装了jQGrid组件的常用访问方式
 * @author	yulei
 * 
 * 快捷访问方式：
 * mc.grid.createInitOption(isMulti, isPage, otherOption)
 * $("#jqgrid_id").isSelect()
 * $("#jqgrid_id").getId()
 * $("#jqgrid_id").getData()
 * $("#jqgrid_id").getAttr(attrKey)
 * mc.grid.isSelect(jqgrid_id)
 * mc.grid.id(jqgrid_id)
 * mc.grid.data(jqgrid_id)
 * mc.grid.attr(jqgrid_id, attrKey)
 */

/**
 * 快捷访问方式
 */
GridUtil = MCloud.util.GridUtil;
mc.grid = MCloud.util.GridUtil;

/**
 * 兼容Ext的分页参数名称
 */
MCloud.util.GridUtil.ParamName_StartRow = "start";
MCloud.util.GridUtil.ParamName_PageRow = "limit";

/**
 * jqGrid分页参数转换<br>
 * 同时也兼容Ext的分页参数名称<br>
 * 
 * jqGrid标准分页参数为：
 * 		page : 开始页号
 * 		rows : 每页数量
 * Ext.GridPanel标准分页参数为：
 * 		start : 开始行号
 * 		limit : 每页数量
 * 转换公式：
 * 		start = (page - 1) * rows
 * 		limit = rows
 * 
 * 使用方法：
 * 		初始化jqGrid时，把函数挂在jqGrid的serializeGridData事件上。
 * 		$("#grid1").jqGrid(
 *		{
 *			......
 *			serializeGridData : mc.grid.PagerParamConvert,
 *			......
 *		});
 * @param	postData			jQGrid请求参数，由jQGrid组件负责传入
 * @param	ParamName_StartRow	新的【开始行数】参数名称。如果不传入，则转换为默认值start
 * @param	ParamName_PageRow	新的【每页数量】参数名称。如果不传入，则转换为默认值limit
 * @returns	返回jgGrid的postData参数对象
 */
MCloud.util.GridUtil.PagerParamConvert = function(postData, ParamName_StartRow, ParamName_PageRow)
{
	if (postData == undefined || postData == null
			|| postData.page == undefined || postData.page == null
			|| postData.rows == undefined || postData.rows == null)
	{
		return postData;
	}

	var start = 0;
	var limit = 20;
	try
	{
		start = (postData.page - 1) * postData.rows;
		limit = postData.rows;
	}
	catch(ex)
	{
		start = 0;
		limit = 20;
	}

	/**
	 * 根据是否传入参数，决定分页参数名称
	 */
	var paramName_StartRow = ParamName_StartRow ? ParamName_StartRow : MCloud.util.GridUtil.ParamName_StartRow;
	var paramName_PageRow = ParamName_PageRow ? ParamName_PageRow : MCloud.util.GridUtil.ParamName_PageRow;

	postData[paramName_StartRow] = start;
	postData[paramName_PageRow] = limit;

	return postData;
};

/**
 * 默认定义jgGrid返回json数据格式对象，允许兼容Ext历史格式
 *
 * jqGrid标准返回参数为：
 * 		total : 总页数
 * 		records : 总行数
 * Ext.GridPanel标准分页参数为：
 * 		total : 总行数
 * 		缺少总页数，由Ext.Paging组件自行计算。目前已增加总页数参数total_page
 * 
 * 使用方法：
 * 		初始化jqGrid时，把函数挂在jqGrid的serializeGridData事件上。
 * 		$("#grid1").jqGrid(
 *		{
 *			......
 *			jsonReader : ExtJsonReader,
 *			......
 *		});
 */
MCloud.util.GridUtil.ExtJsonReader =
{
	root : "data",			/* 返回数据入口(array格式) */
	records : "total",		/* 总行数 */
	total : "total_page"	/* 总页数 */
};

/**
 * jQGrid树状表格数据处理
 * 1) 把children中的子节点转入所属父节点下
 * 2) 转换leaf字段属性
 * 		由于后台数据来自于历史http api，返回的isLeaf字段值域0/1，而jQGrid接收的类型必须为boolean，因此在前台对数据进行转换。
 * 3) 指定展开级别
 * @param	data。来源数组，格式如下：
 * 	[ {
 * 		id : "01",
 * 		name : "01name",
 * 		parentid : "",
 * 		isleaf : 0,
 * 		level : 1,
 * 		children :
 * 		[ {
 * 			id : "02",
 * 			name : "02name",
 * 			parentid : "01",
 * 			isleaf : 1,
 * 			level : 2,
 * 			children : []
 * 		},
 * 		...
 * 		]
 * 	},
 * 	...
 * 	]
 * 
 * @param	treeReader			jgGrid的treeReader参数
 * @param	leaf_field_source	原始isLeaf字段名称
 * @param	expandLevel			展开级别
 * 
 * @return	返回整理好的数组。格式如下：
 * 	[ {
 * 		id : "01",
 * 		name : "01name",
 * 		parentid : "",
 * 		isleaf : 0,
 * 		level : 1,
 * 		isleaf2 : false,
 * 		expanded : true
 * 	},
 * 	{
 * 		id : "02",
 * 		name : "02name",
 * 		parentid : "01",
 * 		isleaf : 1,
 * 		level : 2,
 * 		isleaf2 : true,
 * 		expanded : false
 * 	},
 * 	...
 * 	]
 */
MCloud.util.GridUtil.TreeDataParse = function(data, treeReader, leaf_field_source, expandLevel)
{
	/**
	 * 开始计算
	 * 深度优先遍历
	 */
	var resultArray = new Array();

	/**
	 * 递归
	 */
	function recurse(resultArray, row)
	{
		var children = null;
		if ($.isArray(row.children))
		{
			children = row.children;
			row.children = undefined;
		}

		resultArray.push(row);
		
		if (! $.isArray(children))
		{
			return;
		}

		for (var i = 0; i < children.length; i++)
		{
			var child = children[i];
			recurse(resultArray, child);
		}
	};

	for (var i = 0; i < data.length; i++)
	{
		var row = data[i];
		recurse(resultArray, row);
	}

	/*
	for (var i = 0; i < resultArray.length; i++)
	{
		var rowData = resultArray[i];
		rowData[treeReader.leaf_field] = (rowData[leaf_field_source] == 1);

		*//**
		 * 自动展开
		 *//*
		if (rowData[treeReader.level_field] <= expandLevel)
		{
			rowData[treeReader.expanded_field] = true;
		}
		else
		{
			rowData[treeReader.expanded_field] = false;
		}
	}*/
	MCloud.util.GridUtil.TreeDataParseLeafLevel(resultArray, treeReader, leaf_field_source, expandLevel);

	return resultArray;
};

/**
 * jQGrid树状表格数据处理
 * 1) 转换leaf字段属性
 * 		由于后台数据来自于历史http api，返回的isLeaf字段值域0/1，而jQGrid接收的类型必须为boolean，因此在前台对数据进行转换。
 * 2) 指定展开级别
 * @param	data。来源数组，格式如下：
 * 	[ {
 * 		id : "01",
 * 		name : "01name",
 * 		parentid : "",
 * 		isleaf : 0,
 * 		level : 1,
 * 	},
 *  {
 * 		id : "02",
 * 		name : "02name",
 * 		parentid : "01",
 * 		isleaf : 1,
 * 		level : 2
 * 	}
 * 	...
 * 	]
 * @param	treeReader			jgGrid的treeReader参数
 * @param	leaf_field_source	原始isLeaf字段名称
 * @param	expandLevel			展开级别
 * 
 * 整理好的数组。格式如下：
 * 	[ {
 * 		id : "01",
 * 		name : "01name",
 * 		parentid : "",
 * 		isleaf : 0,
 * 		level : 1,
 * 		isleaf2 : false,
 * 		expanded : true
 * 	},
 * 	{
 * 		id : "02",
 * 		name : "02name",
 * 		parentid : "01",
 * 		isleaf : 1,
 * 		level : 2,
 * 		isleaf2 : true,
 * 		expanded : false
 * 	},
 * 	...
 * 	]
 */
MCloud.util.GridUtil.TreeDataParseLeafLevel = function(data, treeReader, leaf_field_source, expandLevel)
{
	for (var i = 0; i < data.length; i++)
	{
		var rowData = data[i];
		rowData[treeReader.leaf_field] = (rowData[leaf_field_source] == 1);

		/**
		 * 自动展开
		 */
		if (rowData[treeReader.level_field] <= expandLevel)
		{
			rowData[treeReader.expanded_field] = true;
		}
		else
		{
			rowData[treeReader.expanded_field] = false;
		}
	}
};

/**
 * jQGrid.prmNames初始化参数，不分页表格默认设置
 * 避免发送不必要的参数到服务端
 */
MCloud.util.GridUtil.prmNames = 
{
	page : null,		/* 开始页数 */
	rows : null,		/* 开始行数 */
	search : null,		/* 搜索字段参数 */
	nd : null,			/* 已发送请求次数的参数 */
	sort : null,		/* 排序字段参数 */
	order : null		/* 排序方式参数 */
};

/**
 * jQGrid.prmNames初始化参数，分页表格默认设置
 * 避免发送不必要的参数到服务端
 * page、rows允许发送，不覆盖
 */
MCloud.util.GridUtil.prmNames_Page = 
{
	search : null,		/* 搜索字段参数 */
	nd : null,			/* 已发送请求次数的参数 */
	sort : null,		/* 排序字段参数 */
	order : null		/* 排序方式参数 */
};

/**
 * 创建jQGrid默认初始化参数
 * @param	isMulti		boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	isPage		boolean/string	是否分页。true分页，false不分页。"all"单选，"page"复选。必填。
 * @param	otherOption	object			其他参数。可忽略。
 * @return				object			创建的jQGrid默认初始化参数对象
 */
MCloud.util.GridUtil.createInitOption = function(isMulti, isPage, otherOption)
{
	var defaultInitOption = {};

	if (isMulti == false || isMulti == "single")
	{
		if (isPage == false || isPage == "all")
		{
			/**
			 * 单选，不分页
			 */
			defaultInitOption = MCloud.util.GridUtil.initOption_All;
		}
		else if (isPage == true || isPage == "page")
		{
			/**
			 * 单选，分页
			 */
			defaultInitOption = MCloud.util.GridUtil.initOption_Page;
		}
	}
	else if (isMulti == true || isMulti == "multi")
	{
		if (isPage == false || isPage == "all")
		{
			/**
			 * 复选，不分页
			 */
			defaultInitOption = MCloud.util.GridUtil.initOption_MultiAll;
		}
		else if (isPage == true || isPage == "page")
		{
			/**
			 * 复选，分页
			 */
			defaultInitOption = MCloud.util.GridUtil.initOption_MultiPage;
		}
	}

	return $.extend(true, {}, defaultInitOption, otherOption);
};

/**
 * 表格初始化参数：单选，不分页，初始不加载数据
 */
MCloud.util.GridUtil.initOption_All =
{
	/**
	 * ajax请求相关参数
	 */
	mtype : "get",						/* ajax提交方式 */
	prmNames : mc.grid.prmNames,		/* 避免发送不必要的参数到服务端 */					
	/**
	 * 数据格式相关参数
	 */
	datatype : "local",					/* 返回数据格式（初始不从后台加载数据，后续加载需要通过setGridParam设置为json）*/
	jsonReader : mc.grid.ExtJsonReader,	/* 返回json数据格式描述 */
	/**
	 * 分页参数
	 */
	rowNum : -1,						/* 初始分页行数。-1表示显示全部数据，取消分页 */
	/**
	 * jQGrid界面外观相关参数
	 */
	height : 300,						/* 表格默认高度 */
	width : 300,						/* 表格默认宽度 */
	shrinkToFit : false,				/* 不允许自动调整宽度，严格按照列定义宽度显示 */
	rownumbers : true,					/* 序号列 */
	multiselect : false,				/* 关闭复选模式 */
	cmTemplate :						/* 不允许点击列头 */
	{
		sortable : false
	}
};
/**
 * 表格初始化参数：单选，分页，初始不加载数据
 */
MCloud.util.GridUtil.initOption_Page = $.extend(true, {}, MCloud.util.GridUtil.initOption_All,
{
	/**
	 * ajax请求相关参数
	 */
	prmNames : mc.grid.prmNames_Page,	/* 避免发送不必要的参数到服务端 */					
	serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
	/**
	 * 分页参数
	 */
	rowNum : 20,						/* 初始分页行数 */
	rowList : [ 10, 20, 50 ],			/* 分页行数选项 */
	pagerpos : "left",					/* 分页导航位置 */
	viewrecords : true					/* 显示总行数 */
});
/**
 * 减少参数覆盖，允许发送page、rows
 */
MCloud.util.GridUtil.initOption_Page.prmNames = mc.grid.prmNames_Page;

/**
 * 表格初始化参数：复选，不分页，初始不加载数据
 */
MCloud.util.GridUtil.initOption_MultiAll = $.extend(true, {}, MCloud.util.GridUtil.initOption_All,
{
	multiselect : true				/* 开启复选模式 */
});

/**
 * 表格初始化参数：复选，分页，初始不加载数据
 */
MCloud.util.GridUtil.initOption_MultiPage = $.extend(true, {}, MCloud.util.GridUtil.initOption_Page,
{
	multiselect : true				/* 开启复选模式 */
});

/**
 * 扩展jQGrid方法
 * 提供通用数据访问接口
 * 基于jQGrid v5.2.1版本
 */
(function($)
{
	if (! $.jgrid)
	{
		return;
	}

	$.jgrid.extend(
	{
		/**
		 * 是否已选择
		 * @return	boolean		返回是否已选择。如已选择，则返回true
		 * 适用于单选和复选两种模式
		 */
		isSelect : function()
		{
			if (this.getGridParam("multiselect"))
			{
				/**
				 * 复选模式
				 */
				var arraySelecteID = this.getGridParam("selarrrow");
				return (arraySelecteID.length > 0);
			}
			else
			{
				/**
				 * 单选模式
				 */
				var selectID = this.getGridParam("selrow");
				return (selectID != null);
			}
		},
		/**
		 * 获取已选择数量
		 * @return	integer		返回已选择数量
		 * 适用于单选和复选两种模式
		 */
		getCount : function()
		{
			if (! this.isSelect())
			{
				return 0;
			}

			if (this.getGridParam("multiselect"))
			{
				var arraySelecteID = this.getGridParam("selarrrow");
				return arraySelecteID.length;
			}
			else
			{
				return 1;
			}
		},
		/**
		 * 获取已选择id
		 * @return	string		返回已选择的id或id串
		 * 适用于单选和复选两种模式
		 * 单选：返回id字符串，未选择返回""空字符串
		 * 复选：返回"id1, id2, id3"字符串，未选择返回""空字符串
		 */
		getId : function()
		{
			if (! this.isSelect())
			{
				return "";
			}

			if (this.getGridParam("multiselect"))
			{
				var result = ""
				var arraySelecteID = this.getGridParam("selarrrow");

				for (var i = 0; i < arraySelecteID.length; i++)
				{
					var selectID = arraySelecteID[i];
					if ($.trim(result).length > 0)
					{
						result += ", ";
					}
					result += selectID;
				}

				return result;
			}
			else
			{
				var selectID = this.getGridParam("selrow");
				return selectID;
			}
		},
		/**
		 * 获取已选择data
		 * @return	object/[]	返回已选择的json数据对象或json数据对象数据
		 * 适用于单选和复选两种模式
		 * 单选：返回data单个数据对象，未选择返回null
		 * 复选：返回[data1, data2, data3]数据对象数组，未选择返回[]空数组
		 */
		getData : function()
		{
			if (this.getGridParam("multiselect"))
			{
				/**
				 * 复选模式
				 */
				var arrayRowData = [];
				if (! this.isSelect())
				{
					return arrayRowData;
				}

				var arraySelecteID = this.getGridParam("selarrrow");

				for (var i = 0; i < arraySelecteID.length; i++)
				{
					var selectID = arraySelecteID[i];
					arrayRowData.push(this.getRowData(selectID));
				}

				return arrayRowData;
			}
			else
			{
				/**
				 * 单选模式
				 */
				if (! this.isSelect())
				{
					return null;
				}
				var selectID = this.getGridParam("selrow");
				return this.getRowData(selectID);
			}
		},
		/**
		 * 获取已选择属性值
		 * @param	attrKey		数据对象属性/字段名
		 * @return	string		返回已选择的json数据对象某一属性值或属性值串
		 * 适用于单选和复选两种模式
		 * 单选：返回attrValue字符串，未选择返回""空字符串
		 * 复选：返回"attrValue1, attrValue2, attrValue3"字符串，未选择返回""空字符串
		 */
		getAttr : function(attrKey)
		{
			if (! this.isSelect())
			{
				return "";
			}

			if (this.getGridParam("multiselect"))
			{
				/**
				 * 复选模式
				 */
				var result = "";
				var arrayData = this.getData();

				for (var i = 0; i < arrayData.length; i++)
				{
					var data = arrayData[i];
					if ($.trim(result).length > 0)
					{
						result += ", ";
					}
					var text = data[attrKey]
					result += text;
				}

				return result;

			}
			else
			{
				var data = this.getData();
				var text = data[attrKey]
				return text;
			}
		}
	});
})(jQuery);

MCloud.util.GridUtil.getJQGridObject = function(jqgrid)
{
	if (mc.isJQuery(jqgrid))
	{
		return jqgrid;
	}

	if (mc.isString(jqgrid) && mc.str.notempty(jqgrid))
	{
		var jQGridObj = $("#" + jqgrid);
		if (mc.isJQuery(jQGridObj))
		{
			return jQGridObj;
		}
	}

	return null;
};

/**
 * @public
 * 是否已选择
 */
MCloud.util.GridUtil.isSelect = function(jqgrid)
{
	var jQGridObj = MCloud.util.GridUtil.getJQGridObject(jqgrid);
	if (jQGridObj == null)
	{
		return false;
	}

	return jQGridObj.isSelect();
};

/**
 * @public
 * 获取已选择id
 */
MCloud.util.GridUtil.id = function(jqgrid)
{
	if (! MCloud.util.GridUtil.isSelect(jqgrid))
	{
		return "";
	}

	return jQGridObj.getId();
};
MCloud.util.GridUtil.getId = MCloud.util.GridUtil.id;

/**
 * @public
 * 获取已选择data
 */
MCloud.util.GridUtil.data = function(jqgrid)
{
	var jQGridObj = MCloud.util.GridUtil.getJQGridObject(jqgrid);
	if (jQGridObj == null)
	{
		return null;
	}

	return jQGridObj.getData();
};
MCloud.util.GridUtil.getData = MCloud.util.GridUtil.data;

/**
 * @public
 * 获取已选择属性值
 */
MCloud.util.GridUtil.attr = function(jqgrid, attrKey)
{
	var jQGridObj = MCloud.util.GridUtil.getJQGridObject(jqgrid);
	if (jQGridObj == null)
	{
		return "";
	}

	return jQGridObj.getAttr(attrKey);
};
MCloud.util.GridUtil.getAttr = MCloud.util.GridUtil.attr;
