init_StaticCombBox_Init = function()
{
	$("#cmbStatic_Html").ComboBox();
	$("#cmbStatic_InitData_Array").ComboBox(
	{
		field_id : "id_new",
		field_text : "name_new",
		init_data : [
		{
			id_new : "id1",			
			name_new : "name1"
		},
		{
			id_new : "id2",
			name_new : "name2"
		} ]
	});
	$("#cmbStatic_InitData_2Array").ComboBox(
	{
		init_data : [ 
	 		[ "id3", "name3" ],
			[ "id4", "name4" ]
		]
	});

	$("#btnStatic_Html_reloadData1").click(function(event)
	{
		var data = [
		{
			id : "id5",			
			name : "name5"
		},
		{
			id : "id6",
			name : "name6"
		} ];
		$("#cmbStatic_Html").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});
	$("#btnStatic_Html_reloadData2").click(function(event)
	{
		var data = [
	 		[ "id7", "name7" ],
			[ "id8", "name8" ]
		];
		$("#cmbStatic_Html").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});

	$("#btnStatic_InitData_Array_reloadData1").click(function(event)
	{
		var data = [
		{
			id_new : "id5",			
			name_new : "name5"
		},
		{
			id_new : "id6",
			name_new : "name6"
		} ];
		$("#cmbStatic_InitData_Array").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});
	$("#btnStatic_InitData_Array_reloadData2").click(function(event)
	{
		var data = [
	 		[ "id7", "name7" ],
			[ "id8", "name8" ]
		];
		$("#cmbStatic_InitData_Array").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});

	$("#btnStatic_InitData_2Array_reloadData1").click(function(event)
	{
		var data = [
		{
			id : "id5",			
			name : "name5"
		},
		{
			id : "id6",
			name : "name6"
		} ];
		$("#cmbStatic_InitData_2Array").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});
	$("#btnStatic_InitData_2Array_reloadData2").click(function(event)
	{
		var data = [
	 		[ "id7", "name7" ],
			[ "id8", "name8" ]
		];
		$("#cmbStatic_InitData_2Array").ComboBox("reloadData", data);
		mc.alert("reloadData设置数据=" + mc.encode(data));
	});
};

$(function()
{
	init_StaticCombBox_Init();

	mc.layout.init();
});