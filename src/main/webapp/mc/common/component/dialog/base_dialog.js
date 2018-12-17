/**
 * 基础对话框<br>
 * 提供了弹出对话框基本功能，可作为作对话框基类
 * 包括：
 * 	1)默认行为、默认参数
 *  2)id冲突安全性检查
 *  3)动态加载html
 *  4)mc.layout布局能力
 *  5)定义了统一的确定检查过程
 */
(function($)
{
	$.widget("mc.BaseDialog", $.mc.BaseWidget,
	{
		version: "1.12.1",
		defaultElement: "<body>",
		/**
		 * 默认初始化参数
		 * dialog参数优先
		 */
		options :
		{
			id : "",					/* 组件id */
			title : "对话框默认标题",	/* 对话框标题 */
			width : "600",				/* 对话框宽度 */
			height : "400",				/* 对话框高度 */
			content_url : "",			/* 组件html url */
			resize : false,				/* 对话框是否可拉伸 */
			maxmin : false,				/* 对话框是否可最大化最小化 */
			dialog :
			{
				title : undefined,			/* 对话框标题 */
				area : undefined,			/* 对话框尺寸 */
				content : null,				/* 对话框是否可拉伸 */
				resize : undefined,			/* 对话框是否可最大化最小化 */
				maxmin : undefined,			/* 显示最大化最小化按钮 */
				success : $.noop,			/* 显示后回调 */
				resizing : $.noop,			/* 调整大小后回调 */
				full : $.noop,				/* 最大化后回调 */
				min : $.noop,				/* 最小化后回调 */
				restore : $.noop,			/* 恢复后回调 */
				close : $.noop,				/* 关闭后回调 */
				end : $.noop,				/* 删除后回调 */
				btn : ["确定", "取消"],		/* 自定义按钮 */
				yes : $.noop,				/* 确定按钮回调 */
				btn2 : $.noop 				/* 取消按钮回调 */
			}		
		},
		/**
		 * 静态参数
		 */
		optionsConst :
		{
			dialog :
			{
				type : 1,
				icon : -1,
				closeBtn : 1,
				shade : 0.3,
				shadeClose : false,
				time : 0,
				id : "",
				tips : 2,
				tipsMore : true
			}
		},
		/**
		 * 对话框容器id
		 */
		dialogContainerID : "",
		/**
		 * layer对话框index
		 */
		dialogIndex : null,
		/**
		 * 对框框是否打开标志位
		 */
		_isOpen : false,
		/**
		 * @override
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();

			this._createDialogContainer()

			this._createDialogContent()
		},
		/**
		 * 创建对话框容器
		 * @return		创建成功与否
		 */
		_createDialogContainer : function()
		{
			/**
			 * id检查冲突
			 */
			mc.assert_domid_notexist(this.options.id, "页面上已存在id=[@id]的元素，创建" + this.getWidgetName() + "对话框失败");
			if (this.options.id == undefined || this.options.id == null || $.trim(this.options.id) == "")
			{
				this.dialogContainerID = this.element.attr("id") + "_dialog";
				mc.assert_domid_notexist(this.dialogContainerID, "页面上已存在id=[@id]的元素，创建" + this.getWidgetName() + "对话框失败");
			}
			else
			{
				this.dialogContainerID = this.options.id;				
			}

			/**
			 * 创建对话框容器html，并追加到body最后
			 */
			var html_div = "<div id='" + this.dialogContainerID + "' class='mc-dialog-container'></div>"
			$("body").append(html_div);
		},
		/**
		 * 创建对话框内容
		 */
		_createDialogContent : function()
		{
			/**
			 * 动态加载对话框html代码
			 */
			if (StringUtil.isEmpty(this.options.content_url))
			{
				return;
			}

			$("#" + this.dialogContainerID).load(this.options.content_url, $.proxy(this._loadDialogContentEndCallback, this));
		},
		/**
		 * 动态加载html完成后回调，子类实现
		 */
		_loadDialogContentEndCallback : $.noop,
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

			/**
			 * to-do
			 * 删除dom
			 */
		},
		/**
		 * 创建layer对话框参数
		 */
		_createDialogOptions : function()
		{
			var baseOptions = this.createBaseOptions();

			/**
			 * 创建对话框参数
			 */
			var simpleDialogOptions =
			{
				title : baseOptions.title,
				resize : baseOptions.resize,
				maxmin : baseOptions.maxmin,
			}

			if (baseOptions.width && baseOptions.height)
			{
				simpleDialogOptions.area = [ baseOptions.width + "px", baseOptions.height + "px" ];
			}

			var dialogOptions = $.extend(true, {}, simpleDialogOptions, baseOptions.dialog);

			var $dialogContainer = $("#" + this.dialogContainerID);
			mc.assert_jquery($dialogContainer, "", "element不是jQuery对象，创建" + this.getWidgetFullName() + "组件失败");

			dialogOptions.content = this._getOption_DialogContent(dialogOptions);

			var _this = this;
			var success = dialogOptions.success;
			var resizing = dialogOptions.resizing;
			var full = dialogOptions.full;
			var min = dialogOptions.min;
			var restore = dialogOptions.restore;
			var end = dialogOptions.end;

			dialogOptions.success = function($dom, index)
			{
				mc.layout.initDialog($dialogContainer);
				success($dom, index);
			};

			dialogOptions.resizing = function(index, dom)
			{
				mc.layout.resizeDialog($dialogContainer);
				resizing(index, dom);
			};

			dialogOptions.full = function(index, dom)
			{
				mc.layout.resizeDialog($dialogContainer);
				full(index, dom);
			};

			dialogOptions.min = function(index, dom)
			{
				mc.layout.resizeDialog($dialogContainer);
				min(index, dom);
			};

			dialogOptions.restore = function(index, dom)
			{
				mc.layout.resizeDialog($dialogContainer);
				restore(index, dom);
			};

			dialogOptions.end = function()
			{
				_this._isOpen = false;

				end();
			};

/*			var yes = dialogOptions.yes;
			var _yesClickValidate = $.proxy(this._yesClickValidate, this);*/

			/**
			 * 准备确定按钮检查事件
			 */
			dialogOptions.yes = $.proxy(this.onYesClickEvent, this);
/*			dialogOptions.yes = function(index, $dom)
			{
				if (! _yesClickValidate())
				{
					return;
				}

				if ($.isFunction(yes))
				{
					yes(index, $dom);
				}

				layer.close(index);
			};*/

			return dialogOptions;
		},
		/**
		 * 获取对话框layer.option.content参数
		 */
		_getOption_DialogContent : function(dialogOptions)
		{
			/**
			 * 判断content_url
			 */
			if (! StringUtil.isEmpty(this.options.content_url))
			{
				return $("#" + this.dialogContainerID);
			}
			else
			{
				return dialogOptions.content;
			}
		},
		/**
		 * 显示对话框
		 */
		open : function()
		{
			var dialogOptions = this._createDialogOptions();

			this.dialogIndex = layer.open(dialogOptions);

			this._isOpen = true;

			return this;
		},
		/**
		 * 确定按钮事件
		 */
		onYesClickEvent : function(index, $dom)
		{
			if (! this._yesClickValidate())
			{
				return;
			}

			if ($.isFunction(this.options.dialog.yes))
			{
				this.options.dialog.yes(index, $dom);
			}

			layer.close(index);
		},
		/**
		 * 确定按钮通过后处理事件
		 */
		onYesClickClose : function()
		{
			if ($.isFunction(this.options.dialog.yes))
			{
				this.options.dialog.yes(this.dialogIndex, this.element);
			}

			layer.close(this.dialogIndex);
		},
		/**
		 * @abstract
		 * 点击确定时检查和业务处理接口，子类实现
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			return true;
		},
		/**
		 * 关闭对话框
		 */
		close : function()
		{
			layer.close(this.dialogIndex);

			return this;
		},
		/**
		 * 最大化对话框
		 */
		full : function()
		{
			layer.full(this.dialogIndex);

			return this;
		},
		/**
		 * 最小化对话框
		 */
		min : function()
		{
			layer.min(this.dialogIndex);

			return this;
		},
		/**
		 * 恢复对话框
		 */
		restore : function()
		{
			layer.restore(this.dialogIndex);

			return this;
		},
		/**
		 * 判断是否打开
		 */
		isOpen : function()
		{
			return this._isOpen;
		},
		/**
		 * 手动重新布局
		 */
		resizeDialog : function()
		{
			var $dialogContainer = $("#" + this.dialogContainerID);
			mc.layout.resizeDialog($dialogContainer);
		}
	});
})(jQuery);