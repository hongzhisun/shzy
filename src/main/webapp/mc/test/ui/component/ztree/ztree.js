init_Tree = function()
{
	/**
	 * 采用简易模式，方便给数据
	 */
	var setting =
	{
		data : 
		{
			simpleData :
			{
				enable : true
			}
		}
	};

	var zNodes = [
	{
		name : "test1",
		open : true,
		children : [
		{
			name : "test1_1"
		},
		{
			name : "test1_2"
		} ]
	},
	{
		name : "test2",
		open : true,
		children : [
		{
			name : "test2_1"
		},
		{
			name : "test2_2"
		} ]
	} ];
	var zNodes2 =
	[
	 	{ id : "id1", name : "test1", pId : "", open : true },
	 	{ id : "id2", name : "test1_1", pId : "id1" },
	 	{ id : "id3", name : "test1_2", pId : "id1" },
	 	{ id : "id4", name : "test2", pId : "", open : true },
	 	{ id : "id5", name : "test2_1", pId : "id4" },
	 	{ id : "id6", name : "test2_2", pId : "id4" }
	];

	$.fn.zTree.init($("#treeDemo"), setting, zNodes2);
};

$(function()
{
	init_Tree();
});