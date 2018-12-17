/**
 * 自定义弹窗选择字段
 * 给自定义选择对话框嵌入使用，作为一个轻量级字段组件封装。
 * 
 * 参照mc.DialogField类，有大量特性类似，但暂时不作为继承关系。
 * 
 * 功能特性：
 * 	1) 创建包含图标的dom，包含“选择”、“清除”两个按钮。也可只显示一个按钮。
 *  2) 需绑定一个自定义选择对话框
 *  3) 点击打开对话框事件，需传入
 *  4) 支持清除后回调事件
 *  5) 自定义选择对话框的点击确定按钮事件中，需调用parserDialogData方法
 */
(function($)
{
	$.widget("mc.CustomDialogField", $.mc.BaseWidget,
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

			dialog : null,				/* 自定义选择对话框实例 */

			/* click event */
			/**
			 * 点击打开事件
			 * 需实现点击查询按钮（图标）打开对话框全过程，一般包括以下几步：
			 * 1) 检查是否满足打开对话框的前置条件。
			 * 2) 打开对话框之前的准备工作，传入查询参数和其他必要参数。
			 * 3) 调用对话框的open方法，显示对话框。
			 * 4) 其他一些必要的处理动作。
			 */
			openEvent : $.noop,

			/* callback */
			/**
			 * 清除后回调
			 * 可能包含一些关联清除数据的动作
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

			if (this.options.dialog == null || this.options.dialog == undefined)
			{
				alert("dialog参数不可为空");
				return;
			}
			this._dialogInstance = this.options.dialog;

			if (! $.isFunction(this._dialogInstance.getId))
			{
				alert("dialog缺少getId方法");
				return;
			}

			if (! $.isFunction(this._dialogInstance.getText))
			{
				alert("dialog缺少getText方法");
				return;
			}

			if (! $.isFunction(this._dialogInstance.getData))
			{
				alert("dialog缺少getData方法");
				return;
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

				if ($.isFunction(this.options.openEvent))
				{
					$("#" + this._button1Id).click($.proxy(this.options.openEvent, this));
				}

				if ($.isFunction(this.clear))
				{
					$("#" + this._button2Id).click($.proxy(this.clear, this));
				}
			}
			else
			{
				this.element.wrap("<div id='" + this._fieldId + "' class='mc-dialog-field'></div>");
				this.element.before("<i id='" + this._button1Id + "' class='fa fa-search'></i>");

				if ($.isFunction(this.options.openEvent))
				{
					$("#" + this._button1Id).click($.proxy(this.options.openEvent, this));
				}
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
		 * @public
		 * 对话框点确定后获取数据
		 */
		parserDialogData : function()
		{
			this._id_old = this._id;
			this._data_old = this._data;

			this._id = this._dialogInstance.getId();
			this._data = this._dialogInstance.getData();

			this.element.val(this._dialogInstance.getText());
		},

		_id : "",			/* 当前选择id */
		_id_old : "",		/* 上次选择id */
		_data : null,		/* 当前选择数据 */
		_data_old : null,	/* 上次选择数据 */
		/**
		 * @public
		 * 是否已选择
		 */
		isSelect : function()
		{
			return ($.trim(this._id).length > 0);
		},
		/**
		 * @public
		 * 访问id
		 */
		id : function(id)
		{
			return this.getId();
		},
		getId : function()
		{
			return this._id;
		},
		/**
		 * @public
		 * 访问文本
		 */
		text : function(text)
		{
			return this.getText();
		},
		getText : function()
		{
			return this.element.val();
		},
		/**
		 * @public
		 * 访问数据json对象
		 */
		data : function(data)
		{
			return this.getData();
		},
		getData : function()
		{
			return this._data;
		},
		/**
		 * @public
		 * 设置初始化数据
		 */
		setInitData : function(id, text, data)
		{
			this._id_old = this._id;
			this._data_old = this._data;

			this._id = id;
			this._data = data;

			this.element.val(text);
		},
		/**
		 * @public
		 * 清除已选择项
		 * @param	isTrigger	是否触发clearCallback。如忽略，则默认触发
		 */
		clear : function(isTrigger)
		{
			this._id_old = this._id;
			this._data_old = this._data;

			this._id = "";
			this._data = null;

			this.element.val("");

			if ($.isFunction(this._dialogInstance.clear))
			{
				this._dialogInstance.clear();
			}

			if ((isTrigger !== false) && $.isFunction(this.options.clearCallback))
			{
				this.options.clearCallback.call(this, this._id_old, this._data_old);
			}
		}
	});
})(jQuery);