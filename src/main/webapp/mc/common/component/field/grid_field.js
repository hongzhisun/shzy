/**
 * 表格弹窗选择框组件
 * 提供了表格弹窗选择组件的基本功能，可用作所有表格弹窗选择组件基类
 * 特性：
 *  1) 用作列表数据弹窗选择组件
 *  2) 支持获取后端数据，并提供灵活的参数机制
 *  3) 可灵活自定义弹窗外观和表格选项
 *  4) 提供丰富的数据访问接口
 *  5) 支持单选和复选
 *  6) 支持分页
 *  7) 支持简单过滤条件
 *  8) 单选模式下双击表格行可直接选择；允许清除已选择项
 */
(function($)
{
	$.widget("mc.GridField", $.mc.DialogField,
	{
		version: "1.12.1",
		defaultElement: "<input>",
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
		 * 创建对话框，子类实现
		 */
		_createDialog : function()
		{
			var dialogOptions = this._createDialogOptions();

			this.element.GridDialog(dialogOptions);

			this._dialogInstance = this.element.GridDialog("instance");
		},
		/**
		 * @override
		 * 创建对话框选项，子类实现
		 */
		_createDialogOptions : function()
		{
			var dialogOptions =
			{
				id : this._dialogId,				/* 组件id */

				/* dialog init param */
				title : this.options.title,			/* 对话框标题 */
				width : this.options.width,			/* 对话框宽度 */
				height : this.options.height,		/* 对话框高度 */
				resize : this.options.resize,		/* 对话框是否可拉伸 */
				maxmin : this.options.maxmin,		/* 对话框是否可最大化最小化 */

				/* grid init param */
				multi_mode : this.options.multi_mode,	/* 复选模式 */
				pager_mode : this.options.pager_mode,	/* 分页模式 */
				col_model : this.options.col_model,		/* 列模式 */
				url : this.options.url,					/* 数据url */
				type : this.options.type,				/* http方法 */
				query_param : this.options.query_param,	/* 查询参数(对象) */
				param_serialize : this.options.param_serialize,		/* 参数序列化 */
				search_option : this.options.search_option,			/* 搜索选项 */
				param_page : this.options.param_page,				/* 开始页数 */
				param_startrow : this.options.param_startrow,		/* 开始行数 */
				param_rows : this.options.param_rows,				/* 每页行数 */
				data_root : this.options.data_root,		/* 返回数据节点root */
				data_rows : this.options.data_rows,		/* 返回分页数据总行数 */
				data_pages : this.options.data_pages,	/* 返回分页数据总页数 */
				field_id : this.options.field_id,		/* id字段 */
				field_text : this.options.field_text,	/* text字段 */

				/* callback */
				beforeOpenCallback : this.options.beforeOpenCallback,
				dataFilterCallback : this.options.dataFilterCallback,

				/* improve dialog init param */
				dialog : this.options.dialog,
				/* improve grid init param */
				grid : this.options.grid
			};

			var simpleDialogOptions =
			{
				yes : $.proxy(this._yes, this)
			}
			dialogOptions.dialog = $.extend(true, {}, dialogOptions.dialog, simpleDialogOptions);

			return dialogOptions;
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
		}
	});
})(jQuery);