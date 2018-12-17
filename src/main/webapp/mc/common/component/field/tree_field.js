/**
 * 树弹窗选择框组件
 * 提供了树弹窗选择组件的基本功能，可用作所有树弹窗选择组件基类
 * 特性：
 *  1) 用作树数据弹窗选择组件
 *  2) 支持获取后端数据，并提供灵活的参数机制
 *  3) 可灵活自定义弹窗外观和树选项
 *  4) 提供丰富的数据访问接口
 *  5) 支持单选和复选
 *  6) 默认单击树节点展开下级；单选模式下双击树节点可直接选择；允许清除已选择项
 */
(function($)
{
	$.widget("mc.TreeField", $.mc.DialogField,
	{
		version: "1.12.1",
		defaultElement: "<input>",
		/**
		 * 默认初始化参数
		 */
		options :
		{
			width : "400",				/* 对话框宽度 */
			height : "400"				/* 对话框高度 */
		},
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * @abstract
		 * 创建对话框，子类实现
		 */
		_createDialog : function()
		{
			var dialogOptions = this._createDialogOptions();

			this.element.TreeDialog(dialogOptions);

			this._dialogInstance = this.element.TreeDialog("instance");
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

				/* tree init param */
				multi_mode : this.options.multi_mode,		/* 复选模式 */
				root_name : this.options.root_name,			/* 根节点名称 */
				url : this.options.url,						/* 数据url */
				type : this.options.type,					/* http方法 */
				query_param	 : this.options.query_param,	/* 查询参数(对象) */
				param_serialize : this.options.param_serialize,	/* 参数序列化 */
				search_option : this.options.search_option,		/* 搜索选项 */
				data_root : this.options.data_root,				/* 返回数据节点root */
				field_id : this.options.field_id,				/* id字段 */
				field_text : this.options.field_text,			/* text字段 */
				field_parentid : this.options.field_parentid,	/* 上级id字段 */

				/* callback */
				beforeOpenCallback : this.options.beforeOpenCallback,
				dataFilterCallback : this.options.dataFilterCallback,

				/* improve dialog init param */
				dialog : this.options.dialog,
				/* improve tree init param */
				tree : this.options.tree
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
