mc.namespace("wf.formmanager");

/**
 * 转办、转拟办人员选择对话框
 * @param	dialog_content
 * @param	grid_content
 */
wf.formmanager.TransferUserDialog = function()
{
	this.id_dialog = "mc_wf_transferuser_dialog";
	this.id_grid_dept_wrap = "mc_wf_transferuser_grid_dept_wrap";
	this.id_grid_dept = "mc_wf_transferuser_grid_dept";
	this.id_grid_dept_pager = "mc_wf_transferuser_grid_dept_pager";
	this.id_grid_user_wrap = "mc_wf_transferuser_grid_user_wrap";
	this.id_grid_user = "mc_wf_transferuser_grid_user";
	this.id_grid_user_pager = "mc_wf_transferuser_grid_user_pager";

	/**
	 * 记录参数
	 */
	this.dialog_content;
	this.grid_dept;
	this.grid_user;

	this.userid;
	this.grid_data;

	/**
	 * 初始化
	 */
	this.init = function()
	{
		this.basePath = $("#basePath").val();

		if ($("#" + this.id_dialog).length >  0
				|| $("#" + this.id_grid_dept_wrap).length > 0
				|| $("#" + this.id_grid_dept).length > 0
				|| $("#" + this.id_grid_dept_pager).length > 0
				|| $("#" + this.id_grid_user_wrap).length > 0
				|| $("#" + this.id_grid_user).length > 0
				|| $("#" + this.id_grid_user_pager).length > 0 )
		{
			alert("对话框已存在，不能重复创建");
			return;
		}

		var html = "<div id='" + this.id_dialog + "' style='width:100%; height:100%; display:none;'>";
		html+= "	<div id='" + this.id_grid_dept_wrap + "' class='ui-layout-west'>";
		html+= "		<table id='" + this.id_grid_dept + "'></table>";
		html+= "		<div id='" + this.id_grid_dept_pager + "'></div>";
		html+= "	</div>";
		html+= "	<div id='" + this.id_grid_user_wrap + "' class='ui-layout-center'>";
		html+= "		<table id='" + this.id_grid_user + "'></table>";
		html+= "		<div id='" + this.id_grid_user_pager + "'></div>";
		html+= "	</div>";
		html+= " </div>";
		$("body").append(html);

		this.dialog_content = $("#" + this.id_dialog);
		this.grid_dept = $("#" + this.id_grid_dept);
		this.grid_user = $("#" + this.id_grid_user);
		
		/**
		 * 初始化表格
		 */
		this.grid_dept.jqGrid(
		{
			shrinkToFit : true,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
			rownumbers : true,		/* 序号列 */
			rownumWidth : 30,
			multiselect : false,		/* 启动复选模式 */
			cmTemplate :
			{
				sortable : false
			},
			colModel : [
			{
				name : "deptid",
				key : true,
				hidden : true
			},
			{
				name : "deptcode",
				label : "部门编码",
				width : 80
			},
			{
				name : "deptname",
				label : "部门名称",
				width : 100
			}],
			url : "wf/approveuser/transfer_dept",
			datatype : "json",
			mtype : "get",
			pager : "#" + this.id_grid_dept_pager,
			rowNum : 20,
			rowList : [ 10, 20, 50 ],
			pagerpos : "left",
			viewrecords : true,
			prmNames :				/* 避免发送不必要的参数到服务端 */
			{
				search : null,
				nd : null,
				sort : null,
				order : null
			},
			postData : { jsonCondition : ""},
			serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
			jsonReader : mc.grid.ExtJsonReader,
			onCellSelect : this.onDeptGridCellSelect.createDelegate(this)
		});

		this.grid_user.jqGrid(
		{
			shrinkToFit : true,	/* 不允许自动调整宽度，严格按照列定义宽度显示 */
			rownumbers : true,		/* 序号列 */
			rownumWidth : 30,
			multiselect : false,		/* 启动复选模式 */
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
			} ],
			url : "wf/approveuser/transfer_user",
			datatype : "json",
			mtype : "get",
			pager : "#" + this.id_grid_user_pager,
			rowNum : 20,
			rowList : [ 10, 20, 50 ],
			pagerpos : "left",
			viewrecords : true,
			prmNames :				/* 避免发送不必要的参数到服务端 */
			{
				search : null,
				nd : null,
				sort : null,
				order : null
			},
			postData : { jsonCondition : ""},
			serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
			jsonReader : mc.grid.ExtJsonReader
		});
	};
	
	/**
	 * 传入人员，打开对话框
	 */
	this.open = function(userID, callback_OK)
	{
		this.userid = userID;
		this.grid_dept.clearGridData();
		this.grid_user.clearGridData();

		layer.open(
		{
			type : 1,
			title : "请选择要转发的人",
			/*skin : "layui-layer-lan",*/
			area : ["600px", "380px"],
			content : this.dialog_content,
			success : function(dom, index)
			{
				/**
				 * 打开对话框后进行布局
				 */
				this.dialog_content.layout(
				{
					west__size : 280,
					west__onresize_end : function(){},
					center__onresize_end : function(){},
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
				this.loadDeptData(userID)
			}.createDelegate(this),
			resize : true,
			maxmin : true,
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
				var selectID = this.grid_user.getGridParam("selrow");
				if (selectID == null)
				{
					MsgUtil.alert("请选择要转办的审批人");
					return;
				}

				layer.close(index);

				callback_OK.call();
			}.createDelegate(this)
		});
	}

	this.resize = function()
	{
		this.grid_dept.setGridWidth($("#" + this.id_grid_dept_wrap).width());
		this.grid_dept.setGridHeight($("#" + this.id_grid_dept_wrap).height() - 50);
		this.grid_user.setGridWidth($("#" + this.id_grid_user_wrap).width());
		this.grid_user.setGridHeight($("#" + this.id_grid_user_wrap).height() - 50);
	};

	this.loadDeptData = function(userID)
	{
		var param = 
		{
			jsonCondition : mc.encode(
			{
				workitemid : workItemID
			})
		};

		this.grid_dept.setGridParam(
		{
			postData : 
			{
				jsonCondition : mc.encode(
				{
					userid : userID
				})
			},			
		},
		true).trigger("reloadGrid");	
	};

	/**
	 * 部门表格点击事件
	 */
	this.onDeptGridCellSelect = function(rowID, iCol, cellContent, e)
	{
		this.grid_user.setGridParam(
		{
			postData : 
			{
				jsonCondition : mc.encode(
				{
					deptid : rowID,
					userid : this.userid
				})
			}
		}).trigger("reloadGrid");
	};

	/**
	 * 获取转办的人员
	 */
	this.getTransferUserID = function()
	{
		return this.grid_user.getGridParam("selrow");
	};

	/**
	 * 执行初始化
	 */
	this.init();
};