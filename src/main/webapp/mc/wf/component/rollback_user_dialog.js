mc.namespace("wf.formmanager");

/**
 * 退回人选择对话框
 * @param	dialog_content
 * @param	grid_content
 */
wf.formmanager.RollbackUserDialog = function()
{
	this.id_dialog = "mc_wf_rollbackuser_dialog";
	this.id_grid_activity_wrap = "mc_wf_rollbackuser_grid_activity_wrap";
	this.id_grid_activity = "mc_wf_rollbackuser_grid_activity";
	this.id_grid_user_wrap = "mc_wf_rollbackuser_grid_user_wrap";
	this.id_grid_user = "mc_wf_rollbackuser_grid_user";

	/**
	 * 记录参数
	 */
	this.dialog_content;
	this.grid_activity;
	this.grid_user;

	this.grid_data;

	/**
	 * 初始化
	 */
	this.init = function()
	{
		this.basePath = $("#basePath").val();

		if ($("#" + this.id_dialog).length >  0
				|| $("#" + this.id_grid_activity_wrap).length > 0
				|| $("#" + this.id_grid_activity).length > 0
				|| $("#" + this.id_grid_user_wrap).length > 0
				|| $("#" + this.id_grid_user).length > 0 )
		{
			alert("对话框已存在，不能重复创建");
			return;
		}

		var html = "<div id='" + this.id_dialog + "' style='width:100%; height:100%; display:none;'>";
		html+= "	<div id='" + this.id_grid_activity_wrap + "' class='ui-layout-west'>";
		html+= "		<table id='" + this.id_grid_activity + "'></table>";
		html+= "	</div>";
		html+= "	<div id='" + this.id_grid_user_wrap + "' class='ui-layout-center'>";
		html+= "		<table id='" + this.id_grid_user + "'></table>";
		html+= "	</div>";
		html+= " </div>";
		$("body").append(html);

		this.dialog_content = $("#" + this.id_dialog);
		this.grid_activity = $("#" + this.id_grid_activity);
		this.grid_user = $("#" + this.id_grid_user);
		
		/**
		 * 初始化表格
		 */
		this.grid_activity.jqGrid(
		{
			shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
			rownumbers : true,		/* 序号列 */
			rownumWidth : 30,
			multiselect : false,		/* 启动复选模式 */
			cmTemplate :
			{
				sortable : false
			},
			colModel : [
			{
				name : "activityid",
				key : true,
				hidden : true
			},
			{
				name : "activityname",
				label : "审批环节",
				width : 100
			},
			{
				name : "activitydesc",
				hidden : true
			}],
			onCellSelect : this.onActivityGridCellSelect.createDelegate(this)
		});

		this.grid_user.jqGrid(
		{
			shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
			rownumbers : true,		/* 序号列 */
			rownumWidth : 30,
			multiselect : true,		/* 启动复选模式 */
			cmTemplate :
			{
				sortable : false
			},
			colModel : [
			{
				name : "userid",
				key : true,
				hidden : true
			},
			{
				name : "username",
				label : "姓名",
				width : 70
			},
			{
				name : "usercode",
				label : "登录名",
				width : 70
			},
			{
				name : "checkdate",
				label : "最后审批时间",
				width : 100
			},
			{
				name : "deptid",
				hidden : true
			},
			{
				name : "deptcode",
				label : "部门编码",
				width : 100
			},
			{
				name : "deptname",
				label : "部门名称",
				width : 100
			},
			{
				name : "unitid",
				hidden : true
			},
			{
				name : "unitcode",
				label : "公司编码",
				width : 100
			},
			{
				name : "unitname",
				label : "公司名称",
				width : 100
			} ]
		});
	};
	
	/**
	 * 传入人员，打开对话框
	 */
	this.open = function(workItemID, callback_OK)
	{
		layer.open(
		{
			type : 1,
			title : "请选择要退回的审批环节和审批人",
			/*skin : "mc-layer-blue",*/
			area : ["700px", "320px"],
			content : this.dialog_content,
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行布局
				 */
				this.dialog_content.layout(
				{
					west__size : 175,
					closable : false,
					resizable : false,
					slidable : false,
					onresize : function()
					{
						/**
						 * layout调整后自动调整表格大小
						 * 如果对话框不允许修改大小，则不需要调整
						 */
						this.resize();
					}
				});

				/**
				 * 初次布局完成后调整表格大小
				 */
				this.resize();

				/**
				 * 加载后台数据
				 */
				this.loadData(workItemID)
			}.createDelegate(this),
			maxmin : false,
			resize : false,
			resizing : function(dom)
			{
				/**
				 * 对话框大小调整后，重新布局。
				 */
				this.dialog_content.layout().resizeAll();
			}.createDelegate(this),
			btn : ["确定", "取消"],
			yes : function(index, dom)
			{
				var selectID = this.grid_activity.getGridParam("selrow");
				if (selectID == null)
				{
					MsgUtil.alert("请选择要退回的审批环节");
					return;
				}

				var arraySelecteID = this.grid_user.getGridParam("selarrrow");
				if (arraySelecteID.length <= 0)
				{
					MsgUtil.alert("请选择要退回的审批人");
					return;
				}

				layer.close(index);

				callback_OK.call();
			}.createDelegate(this)
		});
	}

	this.resize = function()
	{
		this.grid_activity.setGridWidth($("#" + this.id_grid_activity_wrap).width());
		this.grid_activity.setGridHeight($("#" + this.id_grid_activity_wrap).height() - 30);
		this.grid_user.setGridWidth($("#" + this.id_grid_user_wrap).width());
		this.grid_user.setGridHeight($("#" + this.id_grid_user_wrap).height() - 30);
	};

	this.loadData = function(workItemID)
	{
		var param = 
		{
			jsonCondition : mc.encode(
			{
				workitemid : workItemID
			})
		};

		wf.FormManagerUtil.showMask();

		/**
		 * 加载数据
		 */
		$.ajax(
		{
			url : this.basePath + "wf/approveuser/rollbackuser",
			type : "post",
			data : param,
			success : function(data, status)
			{
				wf.FormManagerUtil.hideMask();

				if (data.success)
				{
					this.grid_data = data.data;
					this.fillData(data.data);
				}
				else
				{
					MsgUtil.alert("加载数据发生错误: " + data.msg);
				}
			}.createDelegate(this),
			error : function(request, error, ex)
			{
				wf.FormManagerUtil.hideMask();

				MsgUtil.alert("加载数据发生错误: " + error);
			}
		});		
	};

	/**
	 * 填充数据
	 */
	this.fillData = function(data)
	{
		this.grid_activity.clearGridData();
		this.grid_user.clearGridData();

		this.grid_activity[0].addJSONData(data);
	};

	/**
	 * 审批节点表格点击事件
	 */
	this.onActivityGridCellSelect = function(rowID, iCol, cellContent, e)
	{
		this.grid_user.clearGridData();

		if (this.grid_data == null)
		{
			return;
		}

		for (var i = 0; i < this.grid_data.length; i++)
		{
			var activity = this.grid_data[i];
			if (activity.activityid == rowID)
			{
				this.grid_user[0].addJSONData(activity.users);
			}
		}
	};
	
	/**
	 * 获取退回的审批环节
	 */
	this.getRollbackActivityID = function()
	{
		return this.grid_activity.getGridParam("selrow");
	};

	/**
	 * 获取退回的人员
	 */
	this.getRollbackUserID = function()
	{
		var arraySelectID = this.grid_user.getGridParam("selarrrow");
		
		return mc.encode(arraySelectID);
	};

	/**
	 * 执行初始化
	 */
	this.init();
};