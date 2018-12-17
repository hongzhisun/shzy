/**
 * 树选择对话框<br>
 * 提供了树选择对话框的基本功能，可用作所有树选择对话框基类
 * 包括：
 * 	1)创建表格
 *  2)加载后台数据
 *  3)支持单选、复选
 */
(function($)
{
	$.widget("mc.TreeDialog", $.mc.SelectorDialog,
	{
		version: "1.12.1",
		defaultElement: "<body>",
		/**
		 * 默认初始化参数
		 */
		options :
		{
			id : "",			/* 组件id */

			/* dialog init param */
			title : "对话框默认标题",	/* 对话框标题 */
			width : "400",				/* 对话框宽度 */
			height : "400",				/* 对话框高度 */
			resize : false,				/* 对话框是否可拉伸 */
			maxmin : false,				/* 对话框是否可最大化最小化 */

			/* tree init param */
			multi_mode : false,			/* 复选模式 */
			root_name : "根节点",		/* 根节点名称 */
			url : "",					/* 数据url */
			type : "post",				/* http方法 */
			query_param	 : null,		/* 查询参数(对象) */
			param_serialize : "",		/* 参数序列化 */

			data_root : "data",			/* 返回数据节点root */
			field_id : "id",			/* id字段 */
			field_text : "name",		/* text字段 */
			field_parentid : "parentid",/* 上级id字段 */
			field_leaf : "isleaf",		/* 是否末级字段 */
			field_level : "level",		/* 级别字段 */

			tree : 
			{
				async :
				{
					enable : true,		/* 开启异步加载模式 */
					url : undefined,
					type : undefined,
					otherParam : {},
					dataFilter : function(treeId, parentNode, responseData)
					{
						return responseData.data;
					}
				},
				data :
				{
					key :
					{
						name : undefined	/* 默认文本字段名称 */
					},
					simpleData :
					{
						enable : true,		/* 采用简易数据模式，方便后台准备数据 */
						idKey : undefined,	/* 默认id字段名称 */
						pIdKey : undefined,	/* 默认parentid字段名称 */
						rootPId : ""		/* 默认root id */
					}
				},
				check :
				{
					enable : undefined,					/* 默认单选模式 */
					chkboxType : { "Y": "s", "N": "s" }	/*只向下级联选择*/
				},
				view :
				{
					selectedMulti : undefined,	/* 默认为单选模式 */
					dblClickExpand : false		/* 双击不展开，双击需要选择 */
				},
				callback :
				{
					/**
					 * 加载完成后就自动展开一级节点
					 */
					onAsyncSuccess : function(event, treeId, treeNode, msg)
					{
						var tree = $.fn.zTree.getZTreeObj(treeId);
						var rootNodes = tree.getNodesByParam("level", 0);
						for (var i = 0; i < rootNodes.length; i++)
						{
							var rootNode = rootNodes[i];
							tree.expandNode(rootNode, true);
						}
					},
					/**
					 * 点击时自动展开下级
					 * 复选模式，点击节点文字可勾选
					 */
					onClick : function(event, treeId, treeNode, clickFlag)			
					{
						var tree = $.fn.zTree.getZTreeObj(treeId);
						if (treeNode.isParent)
						{
							tree.expandNode(treeNode);
						}

						if (tree.setting.view.selectedMulti)
						{
							tree.checkNode(treeNode, !treeNode.checked, true);							
						}
					},
					/**
					 * 复选模式下，勾选可展开下级
					 */
					onCheck : function(event, treeId, treeNode)
					{
						var tree = $.fn.zTree.getZTreeObj(treeId);
						if (treeNode.checked && treeNode.isParent && (! treeNode.open))
						{
							tree.expandNode(treeNode, true);
						}
					},
					onDblClick : $.noop
				}
			}
		},
		/**
		 * 固定参数
		 */
		constOptions :
		{
			tree : 
			{
				async :
				{
					enable : true		/* 开启异步加载模式 */
				},
				data :
				{
					key :
					{
					},
					simpleData :
					{
						enable : true	/* 采用简易数据模式，方便后台准备数据 */
					}
				},
				check :
				{
				},
				view :
				{
				},
				callback :
				{
				}
			}
		},
		/**
		 * 树ID
		 */
		treeID : "",
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 创建对话框内容
		 * 创建表格
		 */
		_createDialogContent : function()
		{
			/**
			 * id检查冲突
			 */
			var treeID = this.dialogContainerID + "_tree";
			mc.assert_domid_notexist(treeID, "页面上已存在id=[@id]的元素，创建树失败");
			this.treeID = treeID;
			
			var html_content = "<div class='ui-layout-center mc-tree-container'>";
			html_content += "<div id='" + this.treeID + "' class='ztree'></div>";
			html_content += "</div>";
			$("#" + this.dialogContainerID).append(html_content);

			var treeOptions = this._createTreeOptions();

			var rootNode = {};
			rootNode[treeOptions.data.simpleData.idKey] = "root";
			rootNode[treeOptions.data.key.name] = "根节点";
			rootNode[treeOptions.data.simpleData.pIdKey] = treeOptions.data.simpleData.rootPId;

			$.fn.zTree.init($("#" + this.treeID), treeOptions, [ rootNode ]);
		},
		/**
		 * 树初始化参数
		 */
		_createTreeOptions : function()
		{
			var baseOptions = this.createBaseOptions();

			var data_root = baseOptions.data_root;

			var simpleTreeOptions =
			{
				async :
				{
					url : baseOptions.url,
					type : baseOptions.type,
					dataFilter : function(treeId, parentNode, responseData)
					{
						if (data_root != null && data_root != undefined
								&& mc.str.notempty(data_root))
						{
							return responseData[data_root];
						}
						else
						{
							return responseData;
						}
					}
				},
				data :
				{
					key :
					{
						name : baseOptions.field_text	/* 默认文本字段名称 */
					},
					simpleData :
					{
						idKey : baseOptions.field_id,			/* 默认id字段名称 */
						pIdKey : baseOptions.field_parentid,	/* 默认parentid字段名称 */
						rootPId : ""							/* 默认root id */
					}
				},
				check :
				{
					enable : baseOptions.multi_mode,			/* 单选模式 */
				},
				view :
				{
					selectedMulti : baseOptions.multi_mode		/* 单选模式 */
				}
			};

			/**
			 * 首次不加载数据
			 */
			var treeOptions = $.extend(true, {}, simpleTreeOptions, baseOptions.tree);
			treeOptions.callback.onDblClick = $.proxy(this.onDblClickNodeEvent, this);

			var dataFilterCallback = baseOptions.dataFilterCallback;
			treeOptions.async.dataFilter = $.proxy(function(treeId, parentNode, responseData)
			{						
				if ($.isFunction(dataFilterCallback))
				{
					dataFilterCallback.call(this, responseData);
				}

				if (data_root != null && data_root != undefined
						&& mc.str.notempty(data_root))
				{
					return responseData[data_root];
				}
				else
				{
					return responseData;
				}
			}, this);

			return treeOptions;
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destroy : function()
		{
			/**
			 * to-do
			 * 删除dom
			 */
			this._super();
		},
		/**
		 * @override
		 * 创建layer对话框参数
		 * success时增加初始化查询
		 */
		_createDialogOptions : function()
		{
			var dialogOptions = this._super();

			var success = dialogOptions.success;

			/**
			 * 准备确定按钮检查事件
			 */
			dialogOptions.success = $.proxy(function($dom, index)
			{
				/**
				 * 如果参数改变了，重新加载数据
				 */
				if (! this._isLoaded)
				{
					var queryParam = this._serializeQueryParam(this._param);

					var tree = $.fn.zTree.getZTreeObj(this.treeID);
					tree.setting.async.otherParam = queryParam;
					tree.reAsyncChildNodes(null, "refresh");
					this._param_old = this._param;
					this._isLoaded = true;
				}

				success($dom, index);
			}, this);

			return dialogOptions;
		},
		/**
		 * 获取对话框layer.option.content参数
		 */
		_getOption_DialogContent : function(dialogOptions)
		{
			return $("#" + this.dialogContainerID);
		},
		/**
		 * @override
		 * 点击确定时内部检查接口，子类实现
		 */
		_yesClickValidate : function()
		{
			if (! this.isSelect())
			{
				mc.alert("请先选择");
				return false;
			}

			return true;
		},
		/**
		 * 单选模式，双击选择
		 */
		onDblClickNodeEvent : function(event, treeId, treeNode)
		{
			var tree = $.fn.zTree.getZTreeObj(treeId);
			if (! tree.setting.view.selectedMulti)
			{
				this.onYesClickEvent.call(this, this.dialogIndex, this.element);
			}
		},
		/**
		 * @abstract
		 * 是否已选择
		 */
		isSelect : function()
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);

			if (tree.setting.view.selectedMulti)
			{
				/**
				 * 复选模式
				 */
				var nodes = tree.getCheckedNodes(true);
				return (nodes.length > 0);
			}
			else
			{
				/**
				 * 单选模式
				 */
				var nodes = tree.getSelectedNodes();
				return (nodes.length > 0);
			}
		},
		/**
		 * @abstract
		 * 获取选择数量
		 */
		count : function()
		{
			return this.getCount();
		},
		getCount : function()
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);

			return tree.getCount();
//			if (tree.setting.view.selectedMulti)
//			{
//				var nodes = tree.getCheckedNodes(true);
//				return nodes.length;
//			}
//			else
//			{
//				var nodes = tree.getSelectedNodes();
//				return nodes.length;
//			}
		},
		/**
		 * @abstract
		 * 访问id
		 */
		id : function()
		{
			return this.getId();
		},
		getId : function()
		{
			if (! this.isSelect())
			{
				return "";
			}

			var tree = $.fn.zTree.getZTreeObj(this.treeID);
			if (tree.setting.view.selectedMulti)
			{
				var result = "";
				var arrayData = this.getData();

				for (var i = 0; i < arrayData.length; i++)
				{
					var data = arrayData[i];
					if ($.trim(result).length > 0)
					{
						result += ", ";
					}
					var selectID = data[tree.setting.data.simpleData.idKey]
					result += selectID;
				}

				return result;
			}
			else
			{
				var data = this.getData();
				var selectID = data[tree.setting.data.simpleData.idKey]
				return selectID;
			}
		},
		/**
		 * @abstract
		 * 访问显示文本
		 */
		text : function()
		{
			return this.getText();
		},
		getText : function()
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);
			return this.getAttr(tree.setting.data.key.name);
		},
		/**
		 * @abstract
		 * 访问数据json对象
		 */
		data : function()
		{
			return this.getData();
		},
		getData : function()
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);
			if (tree.setting.view.selectedMulti)
			{
				/**
				 * 复选模式
				 */
				return tree.getCheckedNodes(true);
			}
			else
			{
				/**
				 * 单选模式
				 */
				var nodes = tree.getSelectedNodes();
				if (nodes.length > 0)
				{
					return nodes[0];
				}
				else
				{
					return null;
				}
			}
		},
		setData : $.noop,
		/**
		 * @abstract
		 * 访问属性
		 */
		attr : function(attrKey)
		{
			return this.getAtrr(attrKey);
		},
		getAttr : function(attrKey)
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);
			if (tree.setting.view.selectedMulti)
			{
				if (! this.isSelect())
				{
					return [];
				}

				var result = new Array();
				var arrayData = this.getData();

				for (var i = 0; i < arrayData.length; i++)
				{
					var row = arrayData[i];
					result.push(row[attrKey]);
				}
				return result;
			}
			else
			{
				if (! this.isSelect())
				{
					return "";
				}

				var data = this.getData();
				return (data != null && data != undefined
					 	&& data[attrKey] != undefined) ? data[attrKey] : "";
			}
		},
		/**
		 * 清除对话框内已选择项
		 */
		clear : function(attrKey)
		{
			var tree = $.fn.zTree.getZTreeObj(this.treeID);
			if (tree.setting.view.selectedMulti)
			{
				tree.checkAllNodes(false);
			}
			else
			{
				tree.cancelSelectedNode();
			}
		}
	});
})(jQuery);