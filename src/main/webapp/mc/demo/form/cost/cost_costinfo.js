mc.namespace("mc.demo.form.demoform");

mc.demo.form.demoform.CostInfo = function(globalParam)
{
	this.globalParam = globalParam;
	this.isLoaded = false;
	this.data = null;

	/**
	 * 初始化
	 */
	this.init = function()
	{
		$("#btnCostInfoAdd").click($.proxy(this.addEvent, this));
		$("#btnCostInfoUpdate").click($.proxy(this.updateEvent, this));
		$("#btnCostInfoDelete").click($.proxy(this.deleteEvent, this));

		$("#gridCostInfo").jqGrid(
		{
			url : "demo/form/cost/costinfo/list",	/* 取数url */
			mtype : "get",				/* ajax提交方式 */
			postData :
			{
				opertype : this.globalParam.operType,
				entitydataid : this.globalParam.entityDataID
			},							/* 提交参数 */
			datatype : "local",			/* 返回数据格式 */
			rowNum : -1,
			prmNames :					/* 避免发送不必要的参数到服务端 */
			{
				page : null,			/* 开始页数 */
				rows : null,			/* 开始行数 */
				search : null,
				nd : null,
				sort : null,
				order : null
			},
			jsonReader : mc.grid.ExtJsonReader,
			beforeProcessing : $.proxy(function(data, status, xhr)
			{
				if (data.success)
				{
					this.data = data.data;
					this.isLoaded = true;
				}
			}, this),
			shrinkToFit : false,
			rownumbers : true,
			multiselect : false,
			cmTemplate :
			{
				sortable : false
			},
			colModel : [
			{
				name : "detailid",
				hidden : true,
				key : true,
			},
			{
				name : "mainid",
				hidden : true,
			},
			{
				name : "status",
				hidden : true,
			},
			{
				name : "seq",
				hidden : true,
			},
			{
				name : "provinceid",
				hidden : true
			},
			{
				name : "provincecode",
				hidden : true
			},
			{
				name : "provincename",
				label : "省份",
				width : 180
			},
			{
				name : "memo",
				label : "说明",
				width : 200
			},
			{
				name : "amount",
				label : "金额",
				width : 150,
				align : "right",
				formatter : "currency"
			} ],
			ondblClickRow : this.updateEvent
		});

		/**
		 * 新建、待办或草稿，且在发起环节，才允许填写
		 */
		if ((wf.form.isCreateNew() || wf.form.isApprove() || wf.form.isDraft())
				&& parent.getActivityBusiType() == "START")
		{
			$("#costinfoDilaog").CostInfoDialog(
			{
				dialog :
				{
					/**
					 * 点确定后回调
					 */
					yes : function(index, $dom)
					{
						var data = $("#costinfoDilaog").CostInfoDialog("getData");
	
						if ($("#costinfoDilaog").CostInfoDialog("getEditMode") == "add")
						{
							$("#gridCostInfo").addRowData(data.detailid, data);
						}
						else
						{
							$("#gridCostInfo").setRowData(data.detailid, data);
						}
					}
				}
			});
		}
		else
		{
			$("#costinfo_toolbar").hide();
		}
	};

	this.addEvent = function(event)
	{
		var initData =
		{
			detailid : mc.newid(),
			mainid : this.globalParam.entityDataID,
			status : 0,
			seq : 0,
			provinceid : "",
			provincecode : "",
			provincename : "",
			memo : "",
			amount : 0
		};

		$("#costinfoDilaog").CostInfoDialog("initData", "add", initData);
		$("#costinfoDilaog").CostInfoDialog("open");
	};

	this.updateEvent = function(event)
	{
		var rowId = $("#gridCostInfo").getGridParam("selrow");
		if (rowId == null)
		{
			mc.msg("请先选择");
			return;
		}

		var data = $("#gridCostInfo").getRowData(rowId);
		
		$("#costinfoDilaog").CostInfoDialog("initData", "update", data);
		$("#costinfoDilaog").CostInfoDialog("open");
	};

	this.deleteEvent = function(event)
	{
		var rowId = $("#gridCostInfo").getGridParam("selrow");
		if (rowId == null)
		{
			mc.msg("请先选择");
			return;
		}

		mc.confirm("请确认要删除明细行记录", function(result)
		{
			if (! result)
			{
				return;
			}

			$("#gridCostInfo").delRowData(rowId);
		})
	};

	/**
	 * 加载表单数据
	 */
	this.loadFormData = function()
	{
		$("#gridCostInfo").setGridParam(
		{
			datatype : "json",
			postData :
			{
				opertype : this.globalParam.operType,
				entitydataid : this.globalParam.entityDataID
			}
		}).trigger("reloadGrid");
	};

	/**
	 * 检查表单数据加载是否完成
	 */
	this.getFormDataLoaded = function()
	{
		return this.isLoaded;
	};

	/**
	 * 获取表单数据
	 */
	this.getFormData = function()
	{
		return $("#gridCostInfo").getRowData();
	};

	/**
	 * 获取打印数据
	 */
	this.getPrintData = function()
	{
		
	};

	/**
	 * 表单数据检查
	 * type : 操作类型
	 */
	this.validate = function(type)
	{
		var dataArray = $("#gridCostInfo").getRowData();
		if (dataArray.length <= 0)
		{
			mc.msg("费用明细不可为空");
			return false
		}

		return true;
	}

	this.init();
};