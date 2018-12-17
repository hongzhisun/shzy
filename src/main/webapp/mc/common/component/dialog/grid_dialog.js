/**
 * 表格选择对话框<br>
 * 提供了表格选择对话框的基本功能，可用作所有表格选择对话框基类
 * 功能特性：
 * 	1)创建表格
 *  2)加载后台数据
 *  3)支持单选、复选
 *  4)支持分页
 *  5)支持简单过滤条件
 */
(function($)
{
	$.widget("mc.GridDialog", $.mc.SelectorDialog,
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
			width : "600",				/* 对话框宽度 */
			height : "400",				/* 对话框高度 */
			resize : false,				/* 对话框是否可拉伸 */
			maxmin : false,				/* 对话框是否可最大化最小化 */

			/* grid init param */
			multi_mode : false,			/* 复选模式 */
			pager_mode : false,			/* 分页模式 */
			col_model : [],				/* 列模式 */
			url : "",					/* 数据url */
			type : "post",				/* http方法 */
			query_param	 : null,		/* 查询参数(对象) */
			search_option : [],			/* 搜索选项 */
			param_serialize : "",		/* 参数序列化 */
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "id",			/* id字段 */
			field_text : "name",		/* text字段 */

			pager_mode : false,			/* 分页模式 */
			grid : 
			{
				height : 100,
				width : 100,
				shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
				rownumbers : true,		/* 序号列 */
				multiselect : undefined,/* 单选模式 */
				cmTemplate :			/* 不允许点击列头 */
				{
					sortable : false
				},
				url : undefined,		/* 数据url */
				datatype : "json",		/* json格式 */
				mtype : undefined,		/* http方法 */
				rowNum : 20,
				rowList : [ 10, 20, 50 ],
				pagerpos : "left",
				viewrecords : true,
				prmNames :				/* 避免发送不必要的参数到服务端 */
				{
					search : null,
					nd : null,
					sort : null,
					order : null			
				},
				serializeGridData : undefined,	/* 转换start、limit参数 */
				jsonReader : undefined
			}
		},
		/**
		 * 固定参数
		 */
		constOptions :
		{
			grid :
			{
				
			}
		},
		gridID : "",		/* 表格ID */
		gridPagerID : "",	/* 表格分页栏ID */
		cmbSearchId : "",	/* 搜索选项下拉框ID */
		edtSearchId : "",	/* 搜索输入框ID */
		btnSearchId	: "", 	/* 搜索按钮ID */
		btnClearId	: "", 	/* 清空按钮ID */
		_DataStore : new DataStore(),	/* 数据集 */
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
			var gridID = this.dialogContainerID + "_grid";
			mc.assert_domid_notexist(gridID, "页面上已存在id=@id的元素，创建表格失败");
			this.gridID = gridID;
			var html_content = "";

			/**
			 * 创建搜索栏选项
			 */
			if (this.options.search_option != undefined
					&& this.options.search_option != null
					&& $.isArray(this.options.search_option)
					&& this.options.search_option.length > 0)
			{

				var cmbSearchId = this.dialogContainerID + "_search_combobox";
				var edtSearchId = this.dialogContainerID + "_search_input";
				var btnSearchId = this.dialogContainerID + "_search_button";
				var btnClearId = this.dialogContainerID + "_search_button_clear";
				mc.assert_domid_notexist(cmbSearchId, "页面上已存在id=@id的元素，创建对话框搜索栏失败");
				mc.assert_domid_notexist(edtSearchId, "页面上已存在id=@id的元素，创建对话框搜索栏失败");
				mc.assert_domid_notexist(btnSearchId, "页面上已存在id=@id的元素，创建对话框搜索栏失败");
				mc.assert_domid_notexist(btnClearId, "页面上已存在id=@id的元素，创建对话框搜索栏失败");
				this.cmbSearchId = cmbSearchId;
				this.edtSearchId = edtSearchId;
				this.btnSearchId = btnSearchId;
				this.btnClearId = btnClearId;

				html_content = "<div class='ui-layout-north mc-form-container' mc-ly-split='false'>";
				html_content += "<table class='mc-form-table' >";
				html_content += "<colgroup>";
				html_content += "<col style='width: 30%;' />";
				html_content += "<col style='width: 68%;' />";
				html_content += "<col />";
				html_content += "</colgroup>";
				html_content += "<tr>";
				html_content += "<td>";
				/* 搜索选项下拉框 */
				html_content += "<select id='" + this.cmbSearchId + "'>";
				for (var i = 0; i < this.options.search_option.length; i++)
				{
					var option = this.options.search_option[i];
					html_content += "<option value='" + option.id + "'>" + option.text + "</option>";
				}
				html_content += "</select>";
				html_content += "</td>";
				html_content += "<td>";
				/* 搜索输入框 */
				html_content += "<div class='mc-dialog-field2'>";
				html_content += "<i id='" + this.btnSearchId + "' class='fa fa-search'></i>";
				html_content += "<i id='" + this.btnClearId + "' class='fa fa-close'></i>";
				html_content += "<input id='" + this.edtSearchId + "' class='mc-input' type='text'>";
				html_content += "</div>";
				html_content += "</td>";
				html_content += "</tr>";
				html_content += "</table>";
				html_content += "</div>";
			}

			/**
			 * 创建表格
			 */
			html_content += "<div class='ui-layout-center mc-grid-container' mc-grid='" + this.gridID + "'>";
			html_content += "<table id='" + this.gridID + "'></table>";
			if (this.options.pager_mode)
			{
				var gridPagerID = this.dialogContainerID + "_gridpager";
				mc.assert_domid_notexist(gridPagerID, "页面上已存在id=@id的元素，创建表格分页栏失败");
				this.gridPagerID = gridPagerID;
				html_content += "<div id='" + this.gridPagerID + "'></div>";
			}
			html_content += "</div>";
			$("#" + this.dialogContainerID).append(html_content);

			/**
			 * 创建搜索栏选项组件
			 */
			if (this.options.search_option != undefined
					&& this.options.search_option != null
					&& $.isArray(this.options.search_option)
					&& this.options.search_option.length > 0)
			{
				$("#" + this.cmbSearchId).ComboBox(
				{
					changeCallback : $.proxy(this._cmbSearchChangeEvent, this)
				});
				$("#" + this.edtSearchId).keypress($.proxy(function(event)
				{
					if(event.keyCode == "13")
					{
						this._reloadDataWithSearchCondition();
					}
				}, this));
				$("#" + this.btnSearchId).click($.proxy(this._btnSearchEvent, this));
				$("#" + this.btnClearId).click($.proxy(this._btnClearEvent, this));
			}

			/**
			 * 创建表格组件
			 */
			var gridOptions = this._createGridOptions();
			$("#" + this.gridID).jqGrid(gridOptions);
		},
		/**
		 * 创建表格初始化参数
		 * 处理简单参数
		 */
		_createGridOptions : function()
		{
			var baseOptions = this.createBaseOptions();

			var simpleGridOptions =
			{
				multiselect : baseOptions.multi_mode,
				colModel : baseOptions.col_model,
				url : baseOptions.url,
				mtype : baseOptions.type,
				jsonReader :
				{
					root : baseOptions.data_root,
					records : baseOptions.data_rows,
					total : baseOptions.data_pages
				}
			}

			var gridOptions = $.extend(true, {}, simpleGridOptions, baseOptions.grid);

			/**
			 * 返回数据处理
			 */
			if ($.isFunction(this.options.dataFilterCallback))
			{
				gridOptions.beforeProcessing = $.proxy(function(responseData, status, xhr)
				{
					this.options.dataFilterCallback.call(this, responseData);

					var gridData;
					if (gridOptions.jsonReader.root && mc.str.notempty(gridOptions.jsonReader.root))
					{
						gridData = responseData[gridOptions.jsonReader.root];
					}
					else
					{
						gridData = responseData;
					}

					this._DataStore.load(this.options.field_id, gridData);
				}, this);
			}
			else
			{
				gridOptions.beforeProcessing = $.proxy(function(responseData, status, xhr)
				{
					var gridData;
					if (gridOptions.jsonReader.root && mc.str.notempty(gridOptions.jsonReader.root))
					{
						gridData = responseData[gridOptions.jsonReader.root];
					}
					else
					{
						gridData = responseData;
					}

					this._DataStore.load(this.options.field_id, gridData);
				}, this);
			}

			/**
			 * 分页参数处理
			 */
			if (this.options.pager_mode)
			{
				gridOptions.pager = "#" + this.gridPagerID;

				gridOptions.prmNames =				/* 避免发送不必要的参数到服务端 */
				{
					page : this.options.param_page,	/* 开始页数 */					
					rows : this.options.param_rows,	/* 开始行数 */
					search : null,
					nd : null,
					sort : null,
					order : null			
				}

				gridOptions.serializeGridData = $.proxy(this._serializeGridData, this);
			}
			else
			{
				gridOptions.pager = undefined;
				gridOptions.rowNum = -1;
				gridOptions.rowList = undefined;
				gridOptions.pagerpos = undefined;
				gridOptions.viewrecords = undefined;
				gridOptions.prmNames =				/* 避免发送不必要的参数到服务端 */
				{
					page : null,	/* 开始页数 */					
					rows : null,	/* 开始行数 */
					search : null,
					nd : null,
					sort : null,
					order : null			
				}
			}

			/**
			 * 单选绑定双击事件
			 */
			if (! gridOptions.multiselect)
			{
				gridOptions.ondblClickRow = $.proxy(this.onDblClickRowEvent, this);
			}

			/**
			 * 首次不加载数据
			 */
			gridOptions.datatype = "local";

			return gridOptions;
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
					$("#" + this.gridID).setGridParam(
					{
						datatype : this.options.grid.datatype,
						postData : queryParam
					}).trigger("reloadGrid");
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
		 * jQGrid参数发送前序列化事件
		 */
		_serializeGridData : function(postData)
		{
			if (postData == undefined || postData == null
					|| postData[this.options.param_page] == undefined || postData[this.options.param_page] == null
					|| postData[this.options.param_rows] == undefined || postData[this.options.param_rows] == null)
			{
				return postData;
			}

			var start = 0;
			try
			{
				var limit = postData[this.options.param_rows];
				start = (postData[this.options.param_page] - 1) * limit;
			}
			catch(ex)
			{
				start = 0;
			}

			postData[this.options.param_startrow] = start;

			return postData;
		},
		/**
		 * 切换搜索选项事件
		 */
		_cmbSearchChangeEvent : function(index, id, data, id_old, data_old, event, ui)
		{
			/**
			 * 切换选项暂时不清除输入内容
			 */
/*			
			$("#" + this.edtSearchId).val("");
*/
		},
		/**
		 * 点击搜索按钮事件
		 */
		_btnSearchEvent : function(event)
		{
			this._reloadDataWithSearchCondition();
		},
		/**
		 * 点击清除搜索条件按钮事件
		 */
		_btnClearEvent : function()
		{
			$("#" + this.edtSearchId).val("");

			this._reloadDataWithSearchCondition();
		},
		/**
		 * 根据过滤条件重新查询
		 * 将上次查询的基础参数，附加上过滤条件重新查询
		 */
		_reloadDataWithSearchCondition : function()
		{
			var key = $("#" + this.cmbSearchId).ComboBox("id");
			var value = $("#" + this.edtSearchId).val();
			var serachCondition = {};
			serachCondition[key] = value;

			var queryParamWithSearchCondition = $.extend(true, {}, this._param, serachCondition);

			var queryParam = this._serializeQueryParam(queryParamWithSearchCondition);

			$("#" + this.gridID).setGridParam(
			{
				datatype : this.options.grid.datatype,
				postData : queryParam
			}).trigger("reloadGrid");
		},
		/**
		 * 双击表格行触发选择
		 */
		onDblClickRowEvent : function()
		{
			this.onYesClickEvent.call(this, this.dialogIndex, this.element);
		},
		/**
		 * @abstract
		 * 是否已选择
		 */
		isSelect : function()
		{
			if ($("#" + this.gridID).getGridParam("multiselect"))
			{
				/**
				 * 复选模式
				 */
				var arraySelecteID = $("#" + this.gridID).getGridParam("selarrrow");
				return (arraySelecteID.length > 0);
			}
			else
			{
				/**
				 * 单选模式
				 */
				var selectID = $("#" + this.gridID).getGridParam("selrow");
				return (selectID != null);
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
			return $("#" + this.gridID).getCount();
//			var data = this.getData();
//			if ($("#" + this.gridID).getGridParam("multiselect"))
//			{
//				return data.length;
//			}
//			else
//			{
//				if (data == null)
//				{
//					return 0;
//				}
//				else
//				{
//					return 1;
//				}
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

			if ($("#" + this.gridID).getGridParam("multiselect"))
			{
				var result = ""
				var arraySelecteID = $("#" + this.gridID).getGridParam("selarrrow");

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
				var selectID = $("#" + this.gridID).getGridParam("selrow");
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
			return this.getAttr(this.options.field_text);
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
			if ($("#" + this.gridID).getGridParam("multiselect"))
			{
				/**
				 * 复选模式
				 */
				var arrayRowData = [];
				if (! this.isSelect())
				{
					return arrayRowData;
				}

				var arraySelecteID = $("#" + this.gridID).getGridParam("selarrrow");

				for (var i = 0; i < arraySelecteID.length; i++)
				{
					var selectID = arraySelecteID[i];
					/*arrayRowData.push($("#" + this.gridID).getRowData(selectID));*/
					arrayRowData.push(this._DataStore.get(selectID));
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
				var selectID = $("#" + this.gridID).getGridParam("selrow");
				return this._DataStore.get(selectID);
				/*return $("#" + this.gridID).getRowData(selectID);*/
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
			if ($("#" + this.gridID).getGridParam("multiselect"))
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
		clear : function()
		{
			$("#" + this.gridID).resetSelection();
		}
	});
})(jQuery);