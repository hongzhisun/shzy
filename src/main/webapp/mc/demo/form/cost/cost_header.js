mc.namespace("mc.demo.form.demoform");

mc.demo.form.demoform.Header = function(globalParam)
{
	this.globalParam = globalParam;
	this.isLoaded = false;
	this.data = null;

	/**
	 * 初始化
	 */
	this.init = function()
	{
		$("#serialno").prop("readonly", true);

		$("#startdate").DateField();
		$("#userid").UserGridField();
		$("#deptid").DeptGridField();
		$("#supplierid").SupplierField();

		/**
		 * 新建、待办或草稿，且在发起环节，才允许填写
		 */
		if ((wf.form.isCreateNew() || wf.form.isApprove() || wf.form.isDraft())
				&& parent.getActivityBusiType() == "START")
		{
		}
		else
		{
			$("#startdate").prop("readonly", true);
			$("#userid").UserGridField("disable");
			$("#deptid").DeptGridField("disable");
			$("#supplierid").SupplierField("disable");

			$("#abstract").prop("readonly", true);
			$("#remark").prop("readonly", true);
		}
	};

	/**
	 * 加载表单数据
	 */
	this.loadFormData = function()
	{
		$.ajax(
		{
			url : "demo/form/cost/header/get",
			dataType : "json",
			type : "get",
			data :
			{
				opertype : this.globalParam.operType,
				entitydataid : this.globalParam.entityDataID
			},
			success : $.proxy(function(data, status)
			{
				if (data.success)
				{
					this.isLoaded = true;

					this.data = data.data;
					this.setFormData();
				}
				else
				{
					mc.alert(data.msg)
				}
			}, this),
			error : function(request, error, ex)
			{
				mc.alert("获取数据失败");
			}
		});
	};

	/**
	 * 设置表单数据
	 */
	this.setFormData = function()
	{
		if (this.globalParam.operType == 1)
		{
			this.data.serialno = this.globalParam.formSerialNo;
		}

		$("#serialno").val(this.data.serialno);
		$("#startdate").val(this.data.startdate);
		$("#userid").UserGridField("data", this.data.user);
		$("#deptid").DeptGridField("data", this.data.dept);
		$("#supplierid").SupplierField("data", this.data.supplier);
		$("#abstract").val(this.data.abstract);
		$("#remark").val(this.data.remark);
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
		this.data.startdate = $("#startdate").val();
		this.data.userid = $("#userid").UserGridField("id");
		this.data.deptid = $("#deptid").DeptGridField("id");


		var formData =
		{
			main : 
			{
				id : this.data.id,
				status : this.data.status,
				processid : this.data.processid,
				processinstid : this.data.processinstid,
				startuserid : this.data.startuserid,
				startdate : $("#startdate").val(),
				serialno : this.data.serialno,

				unitid : this.data.unitid,
				deptid : $("#deptid").DeptGridField("id"),
				userid : $("#userid").UserGridField("id"),
				abstract : $("#abstract").val()
			},
			cost :
			{
				detailid : this.data.detailid,
				mainid : this.data.mainid,
				status : this.data.status_cost,
				supplierid : $("#supplierid").SupplierField("id"),
				remark : $("#remark").val()
			}
		}
		return formData;

		this.data.deptid = $("#deptid").DeptGridField("id");
		this.data.remark = $("#remark").val();
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
		if ($("#serialno").val().trim().length <= 0)
		{
			mc.msg("【表单编号】不可为空");
			$("#serialno").focus();
			return false;
		}

		if ($("#startdate").val().trim().length <= 0)
		{
			mc.msg("请选择【申请日期】");
			$("#startdate").focus();
			return false;
		}

		if (! $("#userid").UserGridField("isSelect"))
		{
			mc.msg("请选择【申请人】");
			$("#userid").focus();
			return false;
		}

		if (! $("#deptid").DeptGridField("isSelect"))
		{
			mc.msg("请选择【申请部门】");
			$("#deptid").focus();
			return false;
		}

		if (! $("#supplierid").SupplierField("isSelect"))
		{
			mc.msg("请选择【供应商】");
			$("#supplierid").focus();
			return false;
		}

		if ($("#abstract").val().trim().length <= 0)
		{
			mc.msg("【申请事项】不可为空");
			$("#abstract").focus();
			return false;
		}

		return true;
	}

	this.init();
};