/**
 * 弹窗选择字段
 * 提供了弹窗选择字段的基本功能，可用作所有弹窗选择字段基类
 * 功能特性：
 * 	1)创建包含图标的dom
 *  2)支持点击事件
 *  3)通用数据访问接口
 */
(function($)
{
	$.widget("mc.DialogField", $.mc.BaseWidget,
	{
		version: "1.12.1",
		defaultElement: "<input>",
		/**
		 * 默认初始化参数
		 */
		options :
		{
			id : "",					/* 组件id */

			/* field init param */
			place_text : "请选择...",	/* 初始占位文本 */
			allowClear : true,			/* 是否显示清除按钮 */			

			/* dialog init param */
			title : "对话框默认标题",	/* 对话框标题 */
			width : "600",				/* 对话框宽度 */
			height : "400",				/* 对话框高度 */
			resize : false,				/* 对话框是否可拉伸 */
			maxmin : false,				/* 对话框是否可最大化最小化 */

			/* grid or tree init param */
			multi_mode : false,			/* 复选模式 */
			pager_mode : false,			/* 分页模式 */
			col_model : [],				/* 列模式 */
			root_name : "根节点",		/* 根节点名称 */
			url : "",					/* 数据url */
			type : "post",				/* http方法 */
			query_param	 : null,		/* 查询参数(对象) */
			param_serialize : "",		/* 参数序列化 */
			search_option : [],			/* 搜索选项 */
			param_page : "page",		/* 开始页数 */
			param_startrow : "start",	/* 开始行数 */
			param_rows : "limit",		/* 每页行数 */
			data_root : "data",			/* 返回数据节点root */
			data_rows : "total",		/* 返回分页数据总行数 */
			data_pages : "total_page",	/* 返回分页数据总页数 */
			field_id : "id",			/* id字段 */
			field_text : "name",		/* text字段 */
			field_parentid : "parentid",/* 上级id字段 */

			/* callback */
			/**
			 * 打开弹窗前回调
			 */
			beforeOpenCallback : $.noop,
			/**
			 * Ajax查询后台数据后预处理回调函数
			 */
			dataFilterCallback : $.noop,
			/**
			 * 选择后回调
			 */
			selectCallback : $.noop,
			/**
			 * 选择值变化后回调
			 */
			changeCallback : $.noop,
			/**
			 * 清除后回调
			 */
			clearCallback : $.noop
		},
		/**
		 * 固定参数
		 */
		constOptions :
		{
		},
		_fieldId : "",		/* 字段id */
		_dialogId : "",		/* 对话框id */
		_dialogInstance : null,	/* 对话框对象实例 */
		_button1Id : "",	/* 确定按钮id */
		_button2Id : "",	/* 清除按钮id */
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			if (this.options.multi_mode)
			{
				this._id = "";
				this._data = [];
			}
			else
			{
				this._id = "";
				this._data = null;
			}

			var fieldId = this.options.id;
			if (StringUtil.isEmpty(fieldId))
			{
				fieldId = this.element.attr("id") + "_field";
			}

			mc.assert_domid_notexist(fieldId, "页面上已存在id=[@id]的元素，创建字段失败");
			this._fieldId = fieldId;

			var dialogId = this._fieldId + "_dialog";
			mc.assert_domid_notexist(dialogId, "页面上已存在id=[@id]的元素，创建字段失败");
			this._dialogId = dialogId;

			var button1Id = this._fieldId + "_button1";
			mc.assert_domid_notexist(button1Id, "页面上已存在id=[@id]的元素，创建字段失败");
			this._button1Id = button1Id; 

			var button2Id = this._fieldId + "_button2";
			mc.assert_domid_notexist(button1Id, "页面上已存在id=[@id]的元素，创建字段失败");
			this._button2Id = button2Id; 

			if (this.options.allowClear)
			{
				this.element.wrap("<div id='" + this._fieldId + "' class='mc-dialog-field2'></div>");
				this.element.before("<i id='" + this._button1Id + "' class='fa fa-search'></i>");
				this.element.before("<i id='" + this._button2Id + "' class='fa fa-close'></i>");
				$("#" + this._button1Id).click($.proxy(this._open, this));
				$("#" + this._button2Id).click($.proxy(this.clear, this));
			}
			else
			{
				this.element.wrap("<div id='" + this._fieldId + "' class='mc-dialog-field'></div>");
				this.element.before("<i id='" + this._button1Id + "' class='fa fa-search'></i>");
				$("#" + this._button1Id).click($.proxy(this._open, this));
			}

			if (this.options.place_text)
			{
				this.element.attr("placeholder", this.options.place_text);
			}

			this.element.attr("readonly", true);

			this._createDialog();
		},
		/**
		 * @abstract
		 * 创建对话框，子类实现
		 */
		_createDialog : $.noop,
		/**
		 * @abstract
		 * 创建对话框选项，子类实现
		 */
		_createDialogOptions : $.noop,
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
		 * 是否隐藏
		 */
		isHidden : function()
		{
			return $("#" + this._fieldId).is(":hidden");
		},
		/**
		 * 显示
		 */
		show : function()
		{
			$("#" + this._fieldId).show();

			return this;
		},
		/**
		 * 隐藏
		 */
		hide : function()
		{
			$("#" + this._fieldId).hide();

			return this;
		},
		/**
		 * 是否禁用
		 */
		isDisable : function()
		{
			return ($("#" + this._fieldId).attr("disabled") == "disabled");
		},
		/**
		 * 启用
		 */
		enable : function()
		{
			$("#" + this._fieldId).removeAttr("disabled");
			$("#" + this._button1Id).removeAttr("disabled");
			$("#" + this._button1Id).unbind("click").click($.proxy(this._open, this));
			$("#" + this._button2Id).removeAttr("disabled");
			$("#" + this._button2Id).unbind("click").click($.proxy(this.clear, this));
			return this;
		},
		/**
		 * 禁用
		 */
		disable : function()
		{
			$("#" + this._fieldId).attr("disabled", "disabled");
			$("#" + this._button1Id).attr("disabled", "disabled");
			$("#" + this._button1Id).unbind("click");
			$("#" + this._button2Id).attr("disabled", "disabled");
			$("#" + this._button2Id).unbind("click");
			return this;
		},
		
		/**
		 * @abstract
		 * 打开
		 */
		_open : function(event)
		{
			/**
			 * 执行下拉前回调函数
			 */
			this._dialogInstance.open();
		},
		/**
		 * 点确定后处理事件
		 */
		_yes : function(index, $dom)
		{
			this._id_old = this._id;
			this._data_old = this._data;

			this._id = this._dialogInstance.getId();
			this._data = this._dialogInstance.getData();

			this.element.val(this.getText());
			
			if ($.isFunction(this.options.selectCallback))
			{
				this.options.selectCallback.call(this, this._id, this._data);
			}

			if (this._id != this._id_old)
			{
				if ($.isFunction(this.options.changeCallback))
				{
					this.options.changeCallback.call(this, this._id, this._data,
						this._id_old, this._data_old);
				}
			}
		},
		_id : "",			/* 当前选择id */
		_id_old : "",		/* 上次选择id */
		_data : null,		/* 当前选择数据 */
		_data_old : null,	/* 上次选择数据 */
		/**
		 * @abstract
		 * 是否已选择
		 */
		isSelect : function()
		{
			return ($.trim(this._id).length > 0 && this._data != null);
		},
		/**
		 * @private
		 */
		getDataAttrString : function(attrKey)
		{
			var result = "";
			for (var i = 0; i < this._data.length; i++)
			{
				var row = this._data[i];

				if ($.trim(result).length > 0)
				{
					result += ", ";
				}
				result += row[attrKey];
			}

			return result;
		},
		/**
		 * @private
		 */
		getDataAttrArray : function(attrKey)
		{
			var result = [];
			for (var i = 0; i < this._data.length; i++)
			{
				var row = this._data[i];

				result.push(row[attrKey]);
			}
			return result;			
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
			var data = this.getData();

			if (data == null)
			{
				return 0;
			}

			if (mc.isArray(data))
			{
				return data.length;
			}
			else
			{
				return 1;
			}
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
			return this._id;
		},
		/**
		 * @abstract
		 * 访问文本
		 */
		text : function()
		{
			return this.getText();
		},
		getText : function()
		{
			if (! this.isSelect())
			{
				return "";
			}

			if (this.options.multi_mode)
			{
				return this.getDataAttrString(this.options.field_text);
			}
			else
			{
				return this._data[this.options.field_text];				
			}
		},
		/**
		 * @abstract
		 * 访问数据json对象
		 */
		data : function(data)
		{
			if (data == undefined)
			{
				return this.getData();
			}
			else
			{
				return this.setData(data);
			}
		},
		getData : function()
		{
			return this._data;
		},
		setData : function(data)
		{
			this._id_old = this._id;
			this._data_old = this._data;

			this._data = data;

			var id = "";
			if (this.options.multi_mode)
			{
				id = this.getDataAttrString(this.options.field_id);
			}
			else
			{
				id = this._data[this.options.field_id];				
			}

			this._id = id;

			this.element.val(this.getText());

			return this;
		},
		setInitData : function(id, text)
		{
			var data; 

			if (this.options.multi_mode)
			{
				data = [];
				var arrayID = id.split(",");
				var arrayText = text.split(",");
				for (var i = 0; i < arrayID.length; i++)
				{
					var row = {};
					row[this.options.field_id] = $.trim(arrayID[i]);
					row[this.options.field_text] = $.trim(arrayText[i]);
					data.push(row);
				}
			}
			else
			{
				data = {};
				data[this.options.field_id] = id;
				data[this.options.field_text] = text;
			}

			this.setData(data);
		},
		/**
		 * @abstract
		 * 访问属性
		 */
		attr : function(attrKey)
		{
			return this.getAttr(attrKey);
		},
		getAttr : function(attrKey)
		{
			if (this.options.multi_mode)
			{
				if (! this.isSelect())
				{
					return [];
				}

				return this.getDataAttrArray(attrKey);
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
		 * 清除已选择项
		 * @param	isTrigger	是否触发clearCallback。如忽略，则默认触发
		 */
		clear : function(isTrigger)
		{
			this.element.val("");

			this._id_old = this._id;
			this._data_old = this._data;

			if (this.options.multi_mode)
			{
				this._id = "";
				this._data = [];
			}
			else
			{
				this._id = "";
				this._data = null;
			}

			this._dialogInstance.clear();

			if ((isTrigger !== false) && $.isFunction(this.options.clearCallback))
			{
				this.options.clearCallback.call(this, this._id_old, this._data_old);
			}
		}
	});
})(jQuery);