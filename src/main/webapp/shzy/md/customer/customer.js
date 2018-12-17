G_AuthDataStore = new DataStore();

init_Grid = function()
{
	$("#gridCustomer").jqGrid(
	{
		url : "md/customer/list",				/* 取数url */
		mtype : "post",						/* ajax提交方式 */
	    rowNum : 100,
        rowList : [ 50, 100, 200 ],

		colModel : [					/* 列设置 */

		{
            name : "id",
            label : "id",
            width : 100,
            hidden:true
        },

		{
			name : "varcode",
			label : "编码",
			width : 100
		},
		{
			name : "varname",
			label : "名称",
			width : 100
		},

		{
			name : "vartaxno",
			label : "税号",
			width : 100
		},
		{
			name : "bank",
			label : "银行名称",
			width : 100
		},
		{
			name : "accountno",
			label : "银行账户",
			width : 100
		},
		{
			name : "varaddress",
			label : "联系地址",
			width : 100
		},
		{
			name : "vartel",
			label : "联系电话",
			width : 100
		},
		{
			name : "status",
			label : "状态",
			width : 50,
			align : "right"
		},

		{
			name : "vardescription",
			label : "描述",
			width : 200
		} ],
		ondblClickRow : btnUpdateEvent
	});
};

init_Panel = function()
{
	$("#dialogCustomerEdit").customerDialog(
	{
		dialog :
		{
			/**
			 * 点确定后回调
			 */
			yes : function(index, $dom)
			{
				reloadGrid();
			}
		}
	});


	$("#btnRefresh").click(reloadGrid);

	$("#btnAdd").click(btnAddEvent);

	$("#btnUpdate").click(btnUpdateEvent);

	$("#btnDelete").click(btnDeleteEvent);
};

reloadGrid = function()
{
	$("#gridCustomer").setGridParam(
	{
		datatype : "json",
		treedatatype : "json",
		postData :
		{
			filter : mc.encode(
			{
				sqltype : "sql"
			})
		}
	}).trigger("reloadGrid");

	$("#gridCustomer").resetSelection();
};

btnAddEvent = function(event)
{

	if ($("#gridCustomer").isSelect())
	{
		var authID = $("#gridCustomer").getId();
		var data = G_AuthDataStore.get(authID);

		initData.parentid = data.id;
		initData.parentcode = data.code;
		initData.parentname = data.name;
		initData.level = data.level + 1;
	}
	else
	{
		initData.parentid = "";
		initData.parentcode = "";
		initData.parentname = "";
		initData.level = 1;
	}

	$("#dialogCustomerEdit").customerDialog("initData", "add", initData);
	$("#dialogCustomerEdit").customerDialog("open");
};

btnUpdateEvent = function(event)
{
	if (! $("#gridCustomer").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridCustomer").getId();
	var data = G_AuthDataStore.get(selectID);

	$("#dialogCustomerEdit").customerDialog("initData", "update", data);
	$("#dialogCustomerEdit").customerDialog("open");
}

btnDeleteEvent = function(event)
{
	if (! $("#gridCustomer").isSelect())
	{
		mc.alert("请先选择");
		return;
	}

	var selectID = $("#gridCustomer").getId();
	var data = G_AuthDataStore.get(selectID);

	if (data.internal == 1)
	{
		mc.msg("操作权限【" + data.name + "】是系统内置操作权限，不可删除");
		return;
	}

	mc.confirm("请确认要删除操作权限【" + data.name + "】", function(result)
	{
		if (! result)
		{
			return;
		}

		mc.showMask();

		$.ajax(
		{
			url : "sm/auth/delete",
			type : "post",
			data : 
			{
				id : selectID
			},
			success : function(data, status)
			{
				mc.hideMask();
				if (data.success)
				{
					reloadGrid();
					mc.msg("删除成功");
				}
				else
				{
					mc.alert("删除失败: " + data.msg);
				}
			},
			error : function(request, error, ex)
			{
				mc.hideMask();
				mc.alert("修改失败: " + data.msg);
			}
		});
	})
};

beforeClose = function()
{
	if ($("#dialogCustomerEdit").customerDialog("isOpen"))
	{
		mc.alert("请先关闭对话框");
		return false;
	}

	return true;
};

$(function()
{
	init_Grid();

	init_Panel();

	mc.layout.init();
});