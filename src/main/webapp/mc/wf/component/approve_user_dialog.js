mc.namespace("wf.formmanager");

/**
 * 提交人选择对话框
 * @param	dialog_content
 * @param	grid_content
 */
wf.formmanager.ApproveUserDialog = function()
{
	this.id_dialog = "mc_wf_approveuser_dialog";
	this.id_grid_wrap = "mc_wf_approveuser_grid_wrap";
	this.id_grid = "mc_wf_approveuser_grid";

	/**
	 * 记录参数
	 */
	this.dialog_content;
	this.grid;

	/**
	 * 初始化
	 */
	this.init = function(grid_content)
	{
		if ($("#" + this.id_dialog).length >  0
				|| $("#" + this.id_grid_wrap).length > 0
				|| $("#" + this.id_grid).length > 0)
		{
			alert("对话框已存在，不能重复创建");
			return;
		}

		var html = "<div id='" + this.id_dialog + "' style='width:100%; height:100%; display:none;'>";
		html+= "	<div id='" + this.id_grid_wrap + "' class='ui-layout-center'>";
		html+= "		<table id='" + this.id_grid + "'></table>";
		html+= "	</div>";
		html+= " </div>";
		$("body").append(html);

		this.dialog_content = $("#" + this.id_dialog);
		this.grid = $("#" + this.id_grid);

		/**
		 * 初始化表格
		 */
		this.grid.jqGrid(
		{
			height : 100,
			shrinkToFit : false,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
			rownumbers : true,		/* 序号列 */
			multiselect : true,		/* 启动复选模式 */
			cmTemplate :
			{
				sortable : false
			},
			colModel : [
			{
				name : "activityID",
				hidden : true
			},
			{
				name : "activityName",
				label : "审批环节",
				width : 120
			},
			{
				name : "userID",
				hidden : true
			},
			{
				name : "userName",
				label : "姓名",
				width : 70
			},
			{
				name : "userCode",
				label : "登录名",
				width : 90
			},
			{
				name : "deptID",
				hidden : true
			},
			{
				name : "deptCode",
				label : "部门编码",
				width : 100
			},
			{
				name : "deptName",
				label : "部门名称",
				width : 100
			},
			{
				name : "unitCode",
				label : "公司编码",
				width : 100
			},
			{
				name : "unitName",
				label : "公司名称",
				width : 100
			} ]
		});
	};

	this.setApproveUserData = function(data)
	{
		this.grid.clearGridData();
//		this.grid[0].addJSONData(data);
		for (var i = 0; i < data.length; i++)
		{
			var rowData = data[i];
			this.grid.addRowData(rowData.activityID + "," + rowData.userID, rowData);
		}
	};
	
	/**
	 * 传入人员，打开对话框
	 */
	this.open = function(callback_OK)
	{
		layer.open(
		{
			id : "ApproveUserDialog",
			type : 1,
			title : "请选择要提交的人",
			/*skin : "layui-layer-lan",*/
			area : ["700px", "320px"],
			content : this.dialog_content,
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行布局
				 */
				this.dialog_content.layout(
				{
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
				var arraySelecteID = this.grid.getGridParam("selarrrow");
				if (arraySelecteID.length <= 0)
				{
					MsgUtil.alert("请先选择");
					return;
				}

				layer.close(index);

				callback_OK.call();
			}.createDelegate(this)
		});
	}

	this.resize = function()
	{
		this.grid.setGridWidth($("#" + this.id_grid_wrap).width());
		this.grid.setGridHeight($("#" + this.id_grid_wrap).height() - 30);
	};

	this.getSelectApproveUser = function()
	{
		var arraySelecteID = this.grid.getGridParam("selarrrow");

		var arrayRowData = [];
		for (var i = 0; i < arraySelecteID.length; i++)
		{
			var selectID = arraySelecteID[i];
			arrayRowData.push(this.grid.getRowData(selectID));
		}

		var result = [];
		for (var i = 0; i < arrayRowData.length; i++)
		{
			var record = arrayRowData[i];
			var activityID = record.activityID;
			var userID = record.userID;

			var findActivityID = false
			for (var j = 0; j < result.length; j++)
			{
				var activity = result[j]

				if (activity.activityID == activityID)
				{
					findActivityID = true;

					var findUserID = false
					for (var k = 0; k < activity.users.length; k++)
					{
						if (activity.users[k] == userID)
						{
							findUserID = true;
							break;
						}
					}

					if (! findUserID)
					{
						activity.users.push(userID);
					}

					break;
				}
			}

			if (! findActivityID)
			{
				var activity = 
				{
					activityID : activityID,
					users : [userID]
				};
				result.push(activity);
			}
		}

		return result;
	};

	/**
	 * 执行初始化
	 */
	this.init();
};