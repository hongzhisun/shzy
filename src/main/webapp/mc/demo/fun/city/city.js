init_Grid = function()
{
	$("#gridProvince").jqGrid(
	{
		shrinkToFit : false,
		rownumbers : true,
		multiselect : false,
		cmTemplate :
		{
			sortable : false
		},
		colModel : [
		{
			name : "id",
			hidden : true,
			key : true,
		},
		{
			name : "code",
			label : "编号",
			width : 180
		},
		{
			name : "name",
			label : "名称",
			width : 200
		},
		{
			name : "type",
			hidden : true
		},
		{
			name : "type_text",
			label : "类型",
			width : 100,
			align : "center",
			formatter : function(cellValue, options, rowObject)	/* 自定义显示格式化 */
			{
				if (rowObject.type == 0)
				{
					return "省";
				}
				else if (rowObject.type == 1)
				{
					return "自治区";
				}
				else if (rowObject.type == 2)
				{
					return "直辖市";
				}
				else if (rowObject.type == 3)
				{
					return "新疆生产建设兵团";
				}
				else if (rowObject.type == 4)
				{
					return "特别行政区";
				}
				else
				{
					return "";
				}
			}
		} ],
		url : "demo/province/list",
		datatype : "json",
		mtype : "get",
		pager : "#gridProvince_pager",
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
		serializeGridData : mc.grid.PagerParamConvert,	/* 转换start、limit参数 */
		jsonReader : mc.grid.ExtJsonReader
	});
};

init_QueryPanel = function()
{
	$("#cmbTypeQuery").ComboBox();

	$("body").ProvinceEditDialog(
	{
		id : "dialogProvinceEdit",
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

	$("#btnQuery").click(reloadGrid);

	$("#btnAdd").click(function(event)
	{
		$("body").ProvinceEditDialog("initData", "add");

		$("body").ProvinceEditDialog("open");
	});

	$("#btnUpdate").click(function(event)
	{
		var selectID = $("#gridProvince").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("请先选择");
			return;
		}

		var data = $("#gridProvince").getRowData(selectID);

		$("body").ProvinceEditDialog("initData", "update", data);
		$("body").ProvinceEditDialog("open");
	});

	$("#btnDelete").click(function(event)
	{
		var selectID = $("#gridProvince").getGridParam("selrow");
		if (selectID == null)
		{
			mc.alert("请先选择");
			return;
		}

		var data = $("#gridProvince").getRowData(selectID);

		mc.confirm("请确认要删除省份[" + data.name + "]", function(result)
		{
			if (! result)
			{
				return;
			}

			$.ajax(
			{
				url : "demo/province/delete",
				type : "post",
				sync : true,
				data : 
				{
					id : data.id
				},
				success : function(data, status)
				{
					if (data.success)
					{
						reloadGrid();
						mc.alert("删除成功");
					}
					else
					{
						mc.alert("删除失败: " + data.msg);
					}
				},
				error : function(request, error, ex)
				{
					mc.alert("修改失败: " + data.msg);
				}
			});
		})
	});
};

reloadGrid = function()
{
	var filter = 
	{
		code : $("#edtCodeQuery").val(),
		name : $("#edtNameQuery").val(),
		type : $("#cmbTypeQuery").ComboBox("key")
	}

	$("#gridProvince").jqGrid("setGridParam",
	{
		postData :
		{
			filter : mc.encode(filter)
		}
	}).trigger("reloadGrid");
};

$(function()
{
	init_Grid();

	init_QueryPanel();

	mc.layout.init();
});