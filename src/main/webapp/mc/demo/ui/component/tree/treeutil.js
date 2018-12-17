init_TreeSingle = function()
{
	/**
	 * 创建
	 */
	$("#btnTreeSingle_Init1").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle");

		var treeOption = mc.tree.createInitOption("single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeSingle"), treeOption, initData);
	});
	/**
	 * 带根节点
	 */
	$("#btnTreeSingle_Init2").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle");

		var treeOption = mc.tree.createInitOption("single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeSingle"), treeOption, initData);
	});
	/**
	 * 带根节点自动展开
	 */
	$("#btnTreeSingle_Init3").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle");

		var treeOption = mc.tree.createInitOption("single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "all", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeSingle"), treeOption, initData);
	});
	
	/**
	 * 加载数据
	 */
	$("#btnTreeSingle_ReloadData").click(function(event)
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		$zTree.reAsyncChildNodes(null, "refresh");
	});

	/**
	 * 是否选中
	 */
	$("#btnTreeSingle_IsSelect").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		mc.alert("选中状态=" + $zTree.isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnTreeSingle_GetID").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		mc.alert("选中行ID=" + $zTree.getId());
	});
	/**
	 * 获取文本
	 */
	$("#btnTreeSingle_GetText").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		mc.alert("选中文本=" + $zTree.getText());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnTreeSingle_GetData").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		mc.alert("选中行数据=" + mc.encode($zTree.getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnTreeSingle_GetAttr").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle");
		mc.alert("选中行deptName属性=" + $zTree.getAttr("deptName"));
	});
};

init_TreeMulti = function()
{
	/**
	 * 创建
	 */
	$("#btnTreeMulti_Init1").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti");

		var treeOption = mc.tree.createInitOption("multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeMulti"), treeOption, initData);
	});
	/**
	 * 带根节点
	 */
	$("#btnTreeMulti_Init2").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti");

		var treeOption = mc.tree.createInitOption("multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeMulti"), treeOption, initData);
	});
	/**
	 * 带根节点自动展开
	 */
	$("#btnTreeMulti_Init3").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti");

		var treeOption = mc.tree.createInitOption("multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "all", {});

		var initData = [ { deptID : "root", deptName : "部门", parentID : ""} ];
		$.fn.zTree.init($("#treeMulti"), treeOption, initData);
	});

	/**
	 * 加载数据
	 */
	$("#btnTreeMulti_ReloadData").click(function(event)
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		$zTree.reAsyncChildNodes(null, "refresh");
	});
	/**
	 * 是否选中
	 */
	$("#btnTreeMulti_IsSelect").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		mc.alert("选中状态=" + $zTree.isSelect());
	});
	/**
	 * 获取选中行id
	 */
	$("#btnTreeMulti_GetID").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		mc.alert("选中行ID=" + $zTree.getId());
	});
	/**
	 * 获取文本
	 */
	$("#btnTreeMulti_GetText").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		mc.alert("选中行ID=" + $zTree.getText());
	});
	/**
	 * 获取选中行数据
	 */
	$("#btnTreeMulti_GetData").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		mc.alert("选中行数据=" + mc.encode($zTree.getData()));
	});
	/**
	 * 获取选中行属性
	 */
	$("#btnTreeMulti_GetAttr").click(function()
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti");
		mc.alert("选中行deptName属性=" + $zTree.getAttr("deptName"));
	});
};

init_TreeSingle2 = function()
{
	/**
	 * 创建
	 */
	$("#btnTreeSingle2_Init1").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle2");

		var $zTree = mc.tree.createZTree("treeSingle2", "single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", false, {});
	});

	/**
	 * 创建自动加载
	 */
	$("#btnTreeSingle2_Init2").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle2");

		var $zTree = mc.tree.createZTree("treeSingle2", "single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", true, {});
	});

	/**
	 * 带根节点
	 */
	$("#btnTreeSingle2_Init3").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle2");

		var $zTree = mc.tree.createZTree("treeSingle2", "single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "", false, {});
	});
	/**
	 * 带根节点自动加载并展开
	 */
	$("#btnTreeSingle2_Init4").click(function(event)
	{
		$.fn.zTree.destroy("treeSingle2");

		var $zTree = mc.tree.createZTree("treeSingle2", "single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "all", true, {});
	});

	/**
	 * 加载数据
	 */
	$("#btnTreeSingle2_ReloadData").click(function(event)
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeSingle2");
		$zTree.reAsyncChildNodes(null, "refresh");
	});
};

init_TreeMulti2 = function()
{
	/**
	 * 创建
	 */
	$("#btnTreeMulti2_Init1").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti2");

		var $zTree = mc.tree.createZTree("treeMulti2", "multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", false, {});
	});

	/**
	 * 创建自动加载
	 */
	$("#btnTreeMulti2_Init2").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti2");

		var $zTree = mc.tree.createZTree("treeMulti2", "multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", true, {});
	});

	/**
	 * 带根节点
	 */
	$("#btnTreeMulti2_Init3").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti2");

		var $zTree = mc.tree.createZTree("treeMulti2", "multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "", false, {});
	});
	/**
	 * 带根节点自动加载并展开
	 */
	$("#btnTreeMulti2_Init4").click(function(event)
	{
		$.fn.zTree.destroy("treeMulti2");

		var $zTree = mc.tree.createZTree("treeMulti2", "multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "部门", "all", true, {});
	});

	/**
	 * 加载数据
	 */
	$("#btnTreeMulti2_ReloadData").click(function(event)
	{
		var $zTree = $.fn.zTree.getZTreeObj("treeMulti2");
		$zTree.reAsyncChildNodes(null, "refresh");
	});
};

$(function()
{
	init_TreeSingle();

	init_TreeMulti();

	init_TreeSingle2();

	init_TreeMulti2();

	mc.layout.init();
});