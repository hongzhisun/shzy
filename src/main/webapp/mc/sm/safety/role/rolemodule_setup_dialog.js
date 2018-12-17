/**
 * 角色模块设置窗体
 */
(function($)
{
	$.widget("sm.RoleModuleSetupDialog", $.mc.BaseDialog,
	{
		/**
		 * 默认初始化参数
		 */
		options :
		{
			title : "角色模块关联",
			content_url : "mc/sm/safety/role/rolemodule_setup_dialog.html",			/* 组件html url */
			height : 400,
			width : 350,
			resize : true,
			maxmin : true,
			dialog :
			{
				btn : [ "保存", "取消" ]
			}
		},
		/**
		 * 角色id
		 */
		roleid : "",
		moduleData : [],
		zTree : null,
		/**
		 * @override
		 * implements $.mc.BaseDialog._create()
		 * 构造接口，只执行一次
		 */
		_create : function()
		{
			this._super();
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._loadDialogContentEndCallback()
		 * 动态加载html完成后回调，子类实现
		 */
		_loadDialogContentEndCallback : function()
		{
			var _This = this;

			this.zTree = mc.tree.createZTree("treeRoleModuleSetup", "multi", "id", "parentid", "name", "",
				"sm/mcrolemodule/listfull", "data", "", "all", false, {});

			/**
			 * 全部展开，并打上已选择的勾
			 */
			this.zTree.setting.async.dataFilter = function(treeId, parentNode, responseData)
			{
				if (mc.isArray(responseData.data))
				{
					for (var i = 0; i < responseData.data.length; i++)
					{
						var row = responseData.data[i];
						row.open = true;

						if (mc.str.notempty(row.rolemoduleid))
						{
							row.checked = true;
						}
						else
						{
							row.checked = false;
						}
					}					
				}

				_This.moduleData = responseData.data;

				return responseData.data;
			}
			/**
			 * 不允许收缩
			 */
			this.zTree.setting.callback.beforeCollapse = function(treeId, treeNode)
			{
				return false;
			};
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._init()
		 * 初始化接口，可执行多次
		 */
		_init : function()
		{
			this._super();
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._destroy()
		 * 析构接口
		 */
		_destroy : function()
		{
			this._super();
		},
		/**
		 * 传入初始化数据，需要在open之前调用
		 * @param edit_mode	新增add；修改update
		 * @param data		更新数据json对象
		 */
		initData : function(roleid)
		{
			this.roleid = roleid;

			this.zTree.setting.async.otherParam =
			{
				filter : mc.encode(
				{
					roleid : roleid
				})
			};

			this.zTree.reAsyncChildNodes(null, "refresh");
		},
		/**
		 * @override
		 * implements $.mc.BaseDialog._yesClickValidate()
		 * 点击确定时检查和业务处理接口
		 * @return		检查通过，返回true；否则返回false
		 */
		_yesClickValidate : function()
		{
			var nodes = this.zTree.transformToArray(this.zTree.getNodes());

			var nodeAdd = [];
			var nodeDelete = [];
			for (var i = 0; i < this.moduleData.length; i++)
			{
				var pre = this.moduleData[i];
				for (var j = 0; j < nodes.length; j++)
				{
					var now = nodes[j];
					if (pre.id == now.id)
					{
						if (pre.checked == true && now.checked == true)
						{
						}
						else if (pre.checked == true && now.checked != true)
						{
							nodeDelete.push(now);
						}
						else if (pre.checked != true && now.checked == true)
						{
							nodeAdd.push(now);
						}
						else if (pre.checked != true && now.checked != true)
						{
							
						}
					}
				}
			}

			if (nodeAdd.length <= 0 && nodeDelete.length <= 0)
			{
				return true;
			}

			var msg_add = "";
			for (var i = 0; i < nodeAdd.length; i ++)
			{
				if (msg_add.length > 0)
				{
					msg_add += ", ";
				}
				msg_add += "【" + nodeAdd[i].fullname + "】";
			}

			var msg_delete = "";
			for (var i = 0; i < nodeDelete.length; i ++)
			{
				if (msg_delete.length > 0)
				{
					msg_delete += ", ";
				}
				msg_delete += "【" + nodeDelete[i].fullname + "】";
			}

			var msg = "";
			if (nodeAdd.length > 0)
			{
				msg += "您新增了" + nodeAdd.length + "个模块：" + msg_add + "<br>";
			}

			if (nodeDelete.length > 0)
			{
				msg += "您取消了" + nodeDelete.length + "个模块：" + msg_delete + "<br>";
				msg += "这些模块设置的菜单和权限将一并取消<br>";
			}
			msg += "<br>请您确认是否保存全部修改？";

			mc.confirm(msg, $.proxy(function(result)
			{
				if (result)
				{
					this._saveAll(nodes);
				}
			}, this));
		},
		/**
		 * 保存所有
		 * 由于需要返回成功与否标志位，使用同步提交
		 * @return		修改成功返回true；否则返回false 
		 */
		_saveAll : function(nodes)
		{
			var data = [];
			for (var i = 0; i < nodes.length; i++)
			{
				var node = nodes[i];
				if (node.checked == true)
				{
					var node = nodes[i];
					data.push(
					{
						roleid : this.roleid,
						moduleid : node.id,
						
					});
				}
			}

			mc.showMask();

			$.ajax(
			{
				url : "sm/mcrolemodule/saveall",
				type : "post",
				data : 
				{
					roleid : this.roleid,
					entity : mc.encode(data)
				},
				success : $.proxy(function(data, status)
				{
					mc.hideMask();
					if (data.success)
					{
						mc.msg("保存完成");
						this.onYesClickClose();
					}
					else
					{
						mc.alert("保存失败: " + data.msg);
					}
				}, this),
				error : function(request, error, ex)
				{
					mc.hideMask();
					mc.alert("保存失败: " + error);
				}
			});
		}
	});
})(jQuery);