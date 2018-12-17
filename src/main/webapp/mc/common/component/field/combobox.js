/**
 * mc框架组件
 * ComboBox下拉框
 * 基于jQuery，继承自jQuery-UI.selectmenu
 */
(function($)
{
	$.widget("mc.ComboBox", $.ui.selectmenu,
	{
		version: "1.12.4",
		defaultElement: "<select>",
		/**
		 * 默认设置
		 */
		options :
		{
			/* init param */

			id : "",					/* 组件id */
			place_text : "请选择...",	/* 初始占位文本 */
			height : 200,				/* 下拉列表高度。如设置为undefined，则下拉列表不限制高度。 */
			init_data : [],				/* 初始化数据 */
			field_id : "id",			/* id字段 */
			field_text : "name",		/* text字段 */

			/* callback */

			/**
			 * 选择后回调
			 */
			selectCallback : $.noop,
			/**
			 * 选择值变化后回调
			 */
			changeCallback : $.noop,
			/**
			 * 清除选中后回调
			 */
			clearCallback : $.noop,
		},
		/**
		 * 上次选择数据
		 */
		_data_old : {},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this.element.data("mc-wg-fullname", this.widgetFullName);
			this.element.data("mc-wg-name", this.widgetName);

			this._data_old[this.options.field_id] = "";
			this._data_old[this.options.field_text] = "";

			/**
			 * 如果初始没有选项，则增加一个，避免报错
			 */
			if (this.element.children("option").length <= 0)
			{
				this.element.append("<option value=''>" + this.options.place_text + "</option>");
			}

			/**
			 * 添加selectCallback回调函数
			 */
			var select = this.options.select;
			var selectCallback = this.options.selectCallback;
			this.options.select = $.proxy(function(event, ui)
			{
				var index = this.getIndex();
				var id = this.getId();
				var data = this.getData();
				if ($.isFunction(selectCallback))
				{
					selectCallback.call(this, index, id, data, event, ui);
				}
				
				if ($.isFunction(select))
				{
					select(event, ui);
				}
			}, this);

			/**
			 * 添加changeCallback回调函数
			 */
			var change = this.options.change;
			var changeCallback = this.options.changeCallback;
			this.options.change = $.proxy(function(event, ui)
			{
				var index = this.getIndex();
				var id = this.getId();
				var data = this.getData();
				var id_old = this._data_old[this.options.field_id];
				var data_old = this._data_old;

				this._data_old = data;

				if ($.isFunction(changeCallback))
				{
					changeCallback.call(this, index, id, data, id_old, data_old, event, ui);
				}
				
				if ($.isFunction(change))
				{
					change(event, ui);
				}
			}, this);

			this._super();

			/**
			 * 初始化数据
			 */
			if ($.isArray(this.options.init_data) && this.options.init_data.length > 0)
			{
				this.reloadData(this.options.init_data);
			}
		},
		/**
		 * @override
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			if (mc.isNumber(this.options.height))
			{
				this.menuWidget().css("max-height", this.options.height + "px");
			}

			this._super();
		},
		/**
		 * @override
		 * 析构接口
		 */
		_destroy : function()
		{
			this._super();
		},
		/**
		 * 获取menu
		 */
		menuWidget : function()
		{
			return this._super();
		},
		/**
		 * 是否已选择
		 */
		isSelect : function()
		{
			return (this.index() > 0);
		},
		/**
		 * 访问索引
		 */
		index : function(index)
		{
			if (index == undefined)
			{
				return this.getIndex();
			}
			else
			{
				return this.setIndex(index);
			}
		},
		getIndex : function()
		{
			return this.element[0].selectedIndex;
		},
		setIndex : function(index)
		{
			this.element[0].selectedIndex = index;

			$("#" + this.ids.button + " > .ui-selectmenu-text").text(this.text());

			return this;
		},
		/**
		 * 访问id
		 */
		id : function(id)
		{
			if (id == undefined)
			{
				return this.getId();
			}
			else
			{
				return this.setId(id);
			}
		},
		getId : function()
		{
			return this.element.val();
		},
		setId : function(id)
		{
			this.element.val(id);

			$("#" + this.ids.button + " > .ui-selectmenu-text").text(this.text());

			return this;
		},
		/**
		 * 访问显示文本
		 */
		text : function()
		{
			return this.getText();		
		},
		getText : function()
		{
			return this.element.find("option:selected").text();		
		},
		/**
		 * 访问数据对象(json)
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
			/**
			 * 静态数据
			 */
			var data = {};
			data[this.options.field_id] = this.getId();
			data[this.options.field_text] = this.getText();
			return data;
		},
		setData : function(data)
		{
			/**
			 * 静态数据
			 */
			this.setId(data[this.options.field_id]);

			return this;
		},
		/**
		 * 是否隐藏
		 */
		isHidden : function()
		{
			return $("#" + this.ids.button).is(":hidden");
		},
		/**
		 * 显示
		 */
		show : function()
		{
			$("#" + this.ids.button).show();

			return this;
		},
		/**
		 * 隐藏
		 */
		hide : function()
		{
			$("#" + this.ids.button).hide();

			return this;
		},
		/**
		 * 清除已选择项
		 * @param	isTrigger	是否触发clearCallback。如忽略，则默认触发
		 */
		clear : function(isTrigger)
		{
			this.index(0);

			if ((isTrigger !== false) && $.isFunction(this.options.clearCallback))
			{
				this.options.clearCallback.call(this);
			}

			return this;
		},
		/**
		 * 重新加载数据
		 * @param data	重新加载数据
		 * 		data支持两种格式：
		 * 		1)对象数组
		 * 			[ {
		 * 				id : "id1",
		 * 				name : "name1"
		 * 			},
		 * 			{
		 * 				id : "id2",
		 * 				name : "name2"
		 * 			} ]
		 * 		2)二维数组
		 * 			[ 
		 * 				[ "id1", "name1" ],
		 * 				[ "id2", "name2" ]
		 * 			]
		 */
		reloadData : function(data)
		{
			if (data == undefined || data == null && data.length == undefined)
			{
				return;
			}

			this.element.empty();
			this.element.append("<option value=''>" + this.options.place_text + "</option>");
			for (var i = 0; i < data.length; i++)
			{
				var row = data[i];

				var id = "";
				var text = "";
				if ($.isArray(row))
				{
					if (row.length < 2)
					{
						continue;
					}

					id = row[0];
					text = row[1];	
				}
				else if (typeof(row) == "object")
				{
					id = row[this.options.field_id];
					text = row[this.options.field_text];	
				}
				else
				{
					continue;
				}

				this.element.append("<option value='" + id + "'>" + text + "</option>");
			}

			this.refresh();

			return this;
		}
	});
})(jQuery);