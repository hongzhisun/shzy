mc.namespace("MCloud.util.TreeUtil");

/**
 * zTree辅助工具类
 * 定义了zTree组件的常用辅助函数和常用初始化参数
 * 并封装了zTree组件的常用访问方式
 * @author	yulei
 * 
 * 快捷访问方式：
 * mc.tree.createInitOption(isMulti, field_id, field_parent_id, field_text, otherOption, data_root, expand_level)
 * $.fn.zTree.getZTreeObj("#tree_id").isSelect()
 * $.fn.zTree.getZTreeObj("#tree_id").getId()
 * $.fn.zTree.getZTreeObj("#tree_id").getText()
 * $.fn.zTree.getZTreeObj("#tree_id").getData()
 * $.fn.zTree.getZTreeObj("#tree_id").getAttr(attrKey)
 * mc.tree.isSelect(tree_id)
 * mc.tree.id(tree_id)
 * mc.tree.text(tree_id)
 * mc.tree.data(tree_id)
 * mc.tree.attr(tree_id, attrKey)
 */

/**
 * 快捷访问方式
 */
TreeUtil = MCloud.util.TreeUtil;
mc.tree = MCloud.util.TreeUtil;

/**
 * 创建zTree默认初始化参数
 * @param	isMulti			boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	field_id		string			主键id字段。必填。
 * @param	field_parent_id	string			parentid字段。必填。
 * @param	field_text		string			显示文本字段。必填。
 * @param	root_id			string			根节点id。必填。
 * @param	url				string			取数url。必填。
 * @param	data_root		string			后端数据入口。如设置为"data"，则将把后端返回数据responseData.data节点作为树的数据。
 * 											如传入不是字符串、或""空字符串，则将返回数据responseData整体作为树的数据。
 * @param	virtual_root	string			虚拟根节点名称。如传入不是字符串、或""空字符串，则不设置虚拟根节点。
 * @param	expand_level	integer/string	加载后自动展开级别。根节点级别为0，依次递增。
 * 											设置为大于或等于0的整数，则按级展开。
 * 											传入小于0的数值，不展开。
 * 											传入字符串"all"则全部展开。
 * 											传入其他值，则默认展开根节点(即展开0级节点)。
 * @param	otherOption		object			zTree其他参数。如要忽略可传入{}或null。
 * @return					object			创建的zTree默认初始化参数对象
 */
MCloud.util.TreeUtil.createInitOption = function(isMulti,
	field_id, field_parent_id, field_text, root_id,
	url, data_root, virtual_root, expand_level, otherOption)
{
	var defaultInitOption = {};
	var defaultCallback = {};

	if (! expand_level)
	{
		expand_level = 0;
	}

	var rawOnClickCallback = $.noop;
	var rawOnCheckCallback = $.noop;
	if (otherOption.callback)
	{
		rawOnClickCallback = otherOption.callback.onClick;
		rawOnCheckCallback = otherOption.callback.onCheck;
	}

	/**
	 * 配置各字段属性，以及公用回调方法
	 */
	defaultInitOption = $.extend(true, {}, MCloud.util.TreeUtil.initOption,
	{
		async :
		{
			url : url,												/* 取数url */
			dataFilter : function(treeId, parentNode, responseData)	/* 返回数据预处理 */
			{
				var data = [];

				/**
				 * 解析数据
				 */
				if (mc.isString(data_root) && mc.str.notempty(data_root))
				{
					data = responseData[data_root];
				}
				else
				{
					data = responseData; 
				}

				/**
				 * 增加虚拟根节点
				 */
				if (mc.isString(virtual_root) && mc.str.notempty(virtual_root))
				{
					var rootNode = {};
					rootNode[field_id] = root_id;
					rootNode[field_text] = virtual_root;
					rootNode[field_parent_id] = "";

					for (var i = 0; i < data.length; i++)
					{
						var row = data[i];
						if (row[field_parent_id] == null || row[field_parent_id] == "" || row[field_parent_id] == root_id)
						{
							row[field_parent_id] = root_id;
						}
					}

					data.push(rootNode);
				}

				return data;
			}
		},
		data :
		{
			key :
			{
				name : field_text			/* 显示文本字段 */
			},
			simpleData :					/* 启用简易数据模式，方便后台准备数据 */
			{
				idKey : field_id,			/* id字段 */
				pIdKey : field_parent_id,	/* parentid字段 */
				rootPId : root_id			/* root根节点值 */
			}
		}

	});

	defaultCallback = 
	{
		callback :
		{
			/**
			 * 加载后自动展开级别
			 */
			onAsyncSuccess : function(event, treeId, treeNode, msg)
			{
				var $zTree = $.fn.zTree.getZTreeObj(treeId);
				if(expand_level == "all")
				{
					$zTree.expandAll(true);
				}
				else
				{
					for (var currentLevel = 0; currentLevel <= expand_level; currentLevel++)
					{
						var rootNodes = $zTree.getNodesByParam("level", currentLevel);
						for (var i = 0; i < rootNodes.length; i++)
						{
							var rootNode = rootNodes[i];
							$zTree.expandNode(rootNode, true, false, false, false);
						}
					}
				}
			},
			/**
			 * 点击时自动展开下级
			 * 复选模式下，点击节点文字可勾选
			 */
			onClick : function(event, treeId, treeNode, clickFlag)
			{
				var $zTree = $.fn.zTree.getZTreeObj(treeId);
				if (treeNode.isParent)
				{
					$zTree.expandNode(treeNode);
				}

				if ($zTree.setting.check.enable)
				{
					$zTree.checkNode(treeNode, !treeNode.checked, true);							
				}

				if (mc.isFunction(rawOnClickCallback))
				{
					rawOnClickCallback(event, treeId, treeNode, clickFlag);
				}
			}
		}
	};

	if (isMulti == false || isMulti == "single")
	{
		/**
		 * 单选
		 */
	}
	else if (isMulti == true || isMulti == "multi")
	{
		/**
		 * 复选
		 */
		defaultInitOption = $.extend(true, {}, defaultInitOption,
		{
			check :
			{
				enable : true,					/* 不显示复选框 */
				chkStyle : "checkbox",			/* 复选框类型 */
				chkboxType : { "Y": "s", "N": "s" }	/* 只向下级联选择 */
			}
		});

		/**
		 * 复选模式下，勾选可展开下级
		 */
		defaultCallback.callback.onCheck = function(event, treeId, treeNode)
		{
			var $zTree = $.fn.zTree.getZTreeObj(treeId);
			if (treeNode.checked && treeNode.isParent && (! treeNode.open))
			{
				$zTree.expandNode(treeNode, true);
			}

			if (mc.isFunction(rawOnCheckCallback))
			{
				rawOnCheckCallback(event, treeId, treeNode);
			}
		}
	}

	/**
	 * 参数可被使用者传入otherOption覆盖，事件不被覆盖
	 */
	return $.extend(true, {}, defaultInitOption, otherOption, defaultCallback);
};


/**
 * 单选树初始化参数
 */
MCloud.util.TreeUtil.initOption = 
{
	async :
	{
		enable : true,					/* 启用异步加载模式 */
		url : "",						/* 取数url */
	},
	data :
	{
		key :
		{
			name : ""					/* 显示文本字段 */
		},
		simpleData :					/* 启用简易数据模式，方便后台准备数据 */
		{
			enable : true,				/* 启用简易数据模式开关 */
			idKey : "",					/* id字段 */
			pIdKey : "",				/* parentid字段 */
			rootPId : ""				/* root根节点id */
		}
	},
	check :
	{
		enable : false,					/* 不显示复选框 */
		chkStyle : ""					/* 复选框类型 */
	},
	view :
	{
		selectedMulti : false,			/* 不允许按住Ctrl同时选中多个节点 */
		dblClickExpand : false			/* 屏蔽双击展开动作，改为单击展开 */
	}
};

/**
 * zTree快速创建公用接口
 * @param	tree_id			string			树id。必填。
 * @param	isMulti			boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	field_id		string			主键id字段。必填。
 * @param	field_parent_id	string			parentid字段。必填。
 * @param	field_text		string			显示文本字段。必填。
 * @param	root_id			string			根节点id。必填。
 * @param	url				string			取数url。必填。
 * @param	data_root		string			后端数据入口。如设置为"data"，则将把后端返回数据responseData.data节点作为树的数据。
 * 											如传入不是字符串、或""空字符串，则将返回数据responseData整体作为树的数据。
 * @param	virtual_root	string			虚拟根节点名称。如传入不是字符串、或""空字符串，则不设置虚拟根节点。
 * @param	expand_level	integer/string	加载后自动展开级别。根节点级别为0，依次递增。
 * 											设置为大于或等于0的整数，则按级展开。
 * 											传入小于0的数值，不展开。
 * 											传入字符串"all"则全部展开。
 * 											传入其他值，则默认展开根节点(即展开0级节点)。
 * @param	load			boolean			树创建后是否要立刻加载数据。true立刻加载，否则不加载。
 * @param	otherOption		object			zTree其他参数。如要忽略可传入{}或null。
 * @return					object			创建的zTree对象本身
 */
MCloud.util.TreeUtil.createZTree = function(tree_id, isMulti,
	field_id, field_parent_id, field_text, root_id,
	url, data_root, virtual_root, expand_level, load,  
	otherOption)
{
	var treeOption = MCloud.util.TreeUtil.createInitOption(isMulti,
		field_id, field_parent_id, field_text, root_id,
		url, data_root, virtual_root, expand_level, otherOption);

	var rootNode = {};
	/**
	 * 增加虚拟根节点
	 */
	if (mc.isString(virtual_root) && mc.str.notempty(virtual_root))
	{
		rootNode[field_id] = "root";
		rootNode[field_text] = virtual_root;
		rootNode[field_parent_id] = root_id;
	}
	else
	{
		rootNode[field_id] = "root";
		rootNode[field_text] = "root";
		rootNode[field_parent_id] = root_id;
		rootNode["isHidden"] = true;
	}

	var initData = [ rootNode ];
	var $zTree = $.fn.zTree.init($("#" + tree_id), treeOption, initData);

	if (load == true)
	{
		$zTree.reAsyncChildNodes(null, "refresh");
	}

	return $zTree;
};


/**
 * 扩展zTree方法
 * 提供通用数据访问接口
 * 基于zTree v3.5.29版本
 */
(function($)
{
	if (! $.fn.zTree)
	{
		return;
	}

	var _zTreeTools = function(setting, zTreeTools)
	{
		/**
		 * 是否已选择
		 * @return	boolean		返回是否已选择。如已选择，则返回true
		 * 适用于单选和复选两种模式
		 */
		zTreeTools.isSelect = function()
		{
			if (! setting.check.enable)
			{
				/**
				 * 单选模式
				 */
				var nodes = zTreeTools.getSelectedNodes();
				return (nodes.length > 0);
			}
			else
			{
				/**
				 * 复选模式
				 */
				var nodes = zTreeTools.getCheckedNodes(true);
				return (nodes.length > 0);
			}
		};

		/**
		 * 获取已选择数量
		 * @return	integer		返回已选择数量
		 * 适用于单选和复选两种模式
		 */
		zTreeTools.getCount = function()
		{
			if (! this.isSelect())
			{
				return 0;
			}

			if (! setting.check.enable)
			{
				/**
				 * 单选模式
				 */
				var nodes = zTreeTools.getSelectedNodes();
				return nodes.length;
			}
			else
			{
				/**
				 * 复选模式
				 */
				var nodes = zTreeTools.getCheckedNodes(true);
				return nodes.length;
			}
		},
		
		/**
		 * 获取已选择id
		 * @return	string		返回已选择的id或id串
		 * 适用于单选和复选两种模式
		 * 单选：返回id字符串，未选择返回""空字符串
		 * 复选：返回"id1, id2, id3"字符串，未选择返回""空字符串
		 */
		zTreeTools.getId = function()
		{
			return zTreeTools.getAttr(setting.data.simpleData.idKey);
		};
	
		/**
		 * 获取已选择显示文本
		 * @return	string		返回已选择的文本或文本串
		 * 适用于单选和复选两种模式
		 * 单选：返回文本字符串，未选择返回""空字符串
		 * 复选：返回"text1, text2, text3"字符串，未选择返回""空字符串
		 */
		zTreeTools.getText = function()
		{
			return zTreeTools.getAttr(setting.data.key.name);
		};

		/**
		 * 获取已选择data
		 * @return	object/[]	返回已选择的json数据对象或json数据对象数据
		 * 适用于单选和复选两种模式
		 * 单选：返回data单个数据对象，未选择返回null
		 * 复选：返回[data1, data2, data3]数据对象数组，未选择返回[]空数组
		 */
		zTreeTools.getData = function()
		{
			if (! setting.check.enable)
			{
				/**
				 * 单选模式
				 */
				var nodes = zTreeTools.getSelectedNodes();
				if (nodes.length > 0)
				{
					return nodes[0];
				}
				else
				{
					return null;
				}
			}
			else
			{
				/**
				 * 复选模式
				 */
				return zTreeTools.getCheckedNodes(true);
			}
		};

		/**
		 * 获取已选择属性值
		 * @param	attrKey		数据对象属性/字段名
		 * @return	string		返回已选择的json数据对象某一属性值或属性值串
		 * 适用于单选和复选两种模式
		 * 单选：返回attrValue字符串，未选择返回""空字符串
		 * 复选：返回"attrValue1, attrValue2, attrValue3"字符串，未选择返回""空字符串
		 */
		zTreeTools.getAttr = function(attrKey)
		{
			if (! zTreeTools.isSelect())
			{
				return "";
			}

			if (! setting.check.enable)
			{
				/**
				 * 单选模式
				 */
				var data = zTreeTools.getData();
				return data[attrKey]
			}
			else
			{
				/**
				 * 复选模式
				 */
				var attrValue = "";
				var arrayData = this.getData();

				for (var i = 0; i < arrayData.length; i++)
				{
					var data = arrayData[i];
					if ($.trim(attrValue).length > 0)
					{
						attrValue += ", ";
					}
					attrValue += data[attrKey];
				}

				return attrValue;				
			}
		};

		zTreeTools.clearAllNodes = function()
		{
			var nodes = zTreeTools.getNodes();
			while (nodes.length > 0)
			{
				zTreeTools.removeNode(nodes[nodes.length - 1]);
			}
		}
	};

	/**
	 * 添加zTreeObj对象的对外接口
	 */
	$.fn.zTree._z.data.addZTreeTools(_zTreeTools);
})(jQuery);

/**
 * @public
 * 是否已选择
 */
MCloud.util.TreeUtil.isSelect = function(tree_id)
{
	return $.fn.zTree.getZTreeObj("#" + tree_id).isSelect();
};
/**
 * @public
 * 获取已选择id
 */
MCloud.util.TreeUtil.id = function(tree_id)
{
	return $.fn.zTree.getZTreeObj("#" + tree_id).getId();
};
/**
 * @public
 * 获取已选择显示文本
 */
MCloud.util.TreeUtil.text = function(tree_id)
{
	return $.fn.zTree.getZTreeObj("#" + tree_id).getText();
};
/**
 * @public
 * 获取已选择data
 */
MCloud.util.TreeUtil.data = function(tree_id)
{
	return $.fn.zTree.getZTreeObj("#" + tree_id).getData();
};
/**
 * @public
 * 获取已选择属性值
 */
MCloud.util.TreeUtil.attr = function(tree_id, attrKey)
{
	return $.fn.zTree.getZTreeObj("#" + tree_id).getAttr(attrKey);
};
