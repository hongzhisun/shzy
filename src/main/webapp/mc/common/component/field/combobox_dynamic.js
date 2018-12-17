/**
 * mc框架组件
 * 动态数据ComboBox下拉框组件
 * 基于jQuery，继承自mc.ComboBox
 */
(function($)
{
	$.widget("mc.DynamicComboBox", $.mc.ComboBox,
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
			url : "",					/* 数据url */
			type : "post",				/* http方法 */
			query_param : {},			/* 查询参数(对象) */
			param_serialize : "",		/* 参数序列化 */
			data_root : "data",			/* 返回数据节点root */
			field_id : "id",			/* id字段 */
			field_text : "name",		/* text字段 */

			/* callback */

			/**
			 * 下拉/弹窗前回调函数
			 * 下拉/打开弹窗前回调，检查是否满足条件，以及获得最新查询参数。
			 * 返回false则不下拉/不打开弹窗；
			 * 返回查询参数json对象则检查查询参数是否与上次一致，如是则不重新查询。
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
			 * 清除选中后回调
			 */
			clearCallback : $.noop,				
		},
		/**
		 * 是否加载过远程数据
		 */
		_isLoaded : false,
		/**
		 * 本次查询参数
		 */
		_param : null,
		/**
		 * 上次查询参数
		 */
		_param_old : null,		
		/**
		 * 菜单数据
		 */
		_menuData : [],
		/**
		 * 初始化数据，如果是动态数据，且未下来之前，可以暂存数据。
		 */
		_initData : {},
		/**
		 * 已选择数据对象
		 */
		_data : {},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			/**
			 * 重写点击事件
			 */
			this._buttonEvents.click = this._buttonEvent_Click;
	
			this._super();
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
		 * override
		 * 重写点击事件
		 */
		_buttonEvent_Click : function(event)
		{
			/**
			 * 执行下拉前回调函数
			 */
			var param = null;
			if ($.isFunction(this.options.beforeOpenCallback))
			{
				var result = this.options.beforeOpenCallback.call(this);

				if (typeof(result) == "boolean" && result == false)
				{
					return;
				}

				if (typeof(result) == "object")
				{
					param = result;
				}
			}

			/**
			 * 获取新的数据并加载
			 */
/*			if (! this._isLoaded && ! StringUtil.isEmpty(this.options.url))*/
			if (! StringUtil.isEmpty(this.options.url))
			{
				this._loadMenuData(param);
			}

			/**
			 * 执行父类事件
			 */
			this._setSelection();
			this._toggle(event);
		},
		/**
		 * 获取新的数据并加载
		 */
		_loadMenuData : function(param)
		{
			var queryParam = $.extend(true, {}, this.options.query_param, param);
			queryParam = this._serializeQueryParam(queryParam);
			
			if (_.isEqual(queryParam, this._param_old))
			{
				return;
			}

			this.element.empty();

			$.ajax(
			{
				url : this.options.url,
				type : this.options.type,
				data : queryParam,
				success : function(responseData, status)
				{
					/*this._menuData = responseData[this.options.data_root];*/
					this._menuData = this._parserMenuData(responseData);

					this.element.empty();
					this.element.append("<option value=''>请选择...</option>");
					for (var i = 0; i < this._menuData.length; i++)
					{
						var row = this._menuData[i];
						this.element.append("<option value='" + row[this.options.field_id] + "'>" + row[this.options.field_text] + "</option>");
					}

					this.refresh();

					this._param_old = this._param ? this._param : queryParam;
					this._param = queryParam;
					this._isLoaded = true;
				}.bind(this),
				error : function(request, error, ex)
				{
					alert("获取数据失败: " + error);
				}
			});
		},
		/**
		 * 解析返回数据，获取实际选项数据
		 */
		_parserMenuData : function(responseData)
		{
			if ($.isFunction(this.options.dataFilterCallback))
			{
				this.options.dataFilterCallback.call(this, responseData);
			}

			var menuData = null;
			if (this.options.data_root != null && this.options.data_root != undefined
					&& mc.str.notempty(this.options.data_root))
			{
				menuData = responseData[this.options.data_root];
			}
			else
			{
				menuData = responseData;
			}
			
			return menuData;
		},
		/**
		 * 公用序列化查询参数方法，由子类调用
		 */
		_serializeQueryParam : function(queryParam)
		{
			var param_serialize = this.options.param_serialize;
			if (param_serialize == undefined || param_serialize == null)
			{
				return queryParam;
			}

			if (typeof(param_serialize) == "string" && $.trim(param_serialize).length > 0)
			{
				var newQueryParam = {};
				newQueryParam[param_serialize] = mc.encode(queryParam);
				return newQueryParam;
			}

			if ($.isFunction(param_serialize))
			{
				return param_serialize.call(this, queryParam);
			}

			return queryParam;
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
		 * 访问数据对象(json)
		 */
		getData : function()
		{
			/**
			 * 动态数据
			 */
			var index = this.index() - 1;

			if (index >= 0)
			{
				var data = this._menuData[index];
				return data;
			}
			else
			{
				var data = {};
				data[this.options.field_id] = this.getId();
				data[this.options.field_text] = this.getId();
				return data;
			}
		},
		setData : function(data)
		{
			/**
			 * 动态数据
			 */
			if (this._isLoaded)
			{
				this.setId(data[this.options.field_id]);
			}
			else
			{
				this._menuData = [ data ];
				this.element.empty();
				this.element.append("<option value=''>请选择...</option>");
				this.element.append("<option value='" + data[this.options.field_id] + "'>" + data[this.options.field_text] + "</option>");
				this.refresh();
				this.setId(data[this.options.field_id]);
			}

			return this;
		},
		setInitData : function(id, text)
		{
			var data = {}; 
			data[this.options.field_id] = id;
			data[this.options.field_text] = text;

			this.setData(data);
		},
		/**
		 * 访问属性
		 */
		attr : function(attrKey)
		{
			return this.getAttr(attrKey);
		},
		getAttr : function(attrKey)
		{
			if (! this.isSelect())
			{
				return "";
			}

			var data = this.getData();
			return (data != null && data != undefined
					 	&& data[attrKey] != undefined) ? data[attrKey] : "";
		},
		/**
		 * @override
		 * 重新加载数据
		 * @param param	参数
		 */
		reloadData : function(param)
		{
			this._loadMenuData(param);
		}
	});
})(jQuery);