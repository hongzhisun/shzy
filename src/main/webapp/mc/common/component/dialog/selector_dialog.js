/**
 * 基础选择对话框<br>
 * 提供了选择对话框的基本功能，可作为选择对话框基类
 * 包括：
 * 	1)默认行为、默认参数
 *  2)定义了动态数据接口
 *  3)定义了统一的选择检查过程
 *  4)定义了统一的取数接口
 */
(function($)
{
	$.widget("mc.SelectorDialog", $.mc.BaseDialog,
	{
		version: "1.12.1",
		defaultElement: "<body>",
		/**
		 * 默认初始化参数
		 */
		options :
		{
			id : "",						/* 组件id */
			beforeOpenCallback : $.noop,	/* 打开对话框前回调 */
		},
		/**
		 * 静态参数
		 */
		optionsConst :
		{
			dialog :
			{
				btn : ["确定", "取消"]	/* 自定义按钮 */
			}
		},
		/**
		 * 是否已加载过数据
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
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
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
		 * @override
		 * 析构接口
		 */
		_destroy : function()
		{
			this._super();
		},
		/**
		 * 显示对话框
		 */
		open : function()
		{
			if (! this._prepareQueryParam())
			{
				return false;
			}

			var dialogOptions = this._createDialogOptions();

			this.dialogIndex = layer.open(dialogOptions);
		},
		/**
		 * 打开对话框之前准备查询参数
		 * 执行beforeOpenCallback回调。如果返回参数，则与初始化参数query_param合并作为实际查询参数。
		 * 将实际查询参数与上次查询参数对比，不一致才执行查询。
		 * @return	是否继续执行
		 */
		_prepareQueryParam : function()
		{
			var result_param = {};
			
			/**
			 * 执行下拉前回调函数
			 */
			if ($.isFunction(this.options.beforeOpenCallback))
			{
				var result = this.options.beforeOpenCallback.call(this);
				if (typeof(result) == "boolean" && result == false)
				{
					return false;
				}

				result_param = result;
			}

			var param = $.extend(true, {}, this.options.query_param, result_param);

			if (! _.isEqual(param, this._param_old))
			{
				this._isLoaded = false;
				this._param = param;
			}

			return true;
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
		 * @abstract
		 * 是否已选择
		 */
		isSelect : $.noop,
		/**
		 * @abstract
		 * 访问id
		 */
		id : $.noop,
		getId : $.noop,
		/**
		 * @abstract
		 * 访问文本
		 */
		text : $.noop,
		getText : $.noop,
		/**
		 * @abstract
		 * 访问数据对象(json)
		 */
		data : $.noop,
		getData : $.noop,
		setData : $.noop,
		/**
		 * @abstract
		 * 访问属性
		 */
		attr : $.noop,
		getAttr : $.noop,
		/**
		 * 清除对话框内已选择项
		 */
		clear : $.noop
	});
})(jQuery);