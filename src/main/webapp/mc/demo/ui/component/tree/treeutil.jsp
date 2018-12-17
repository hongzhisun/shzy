<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>zTree树工具类和扩展接口</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/tree/treeutil.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">zTree树工具类和扩展接口</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">一、zTree树默认初始化参数</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			考虑到zTree树使用时参数和开关较多，互相影响，使用起来不够便捷，因此提供了创建zTree树初始化参数的方法：mc.tree.createInitOption()<br>
			<br>
			创建时需要需要区分单选和复选两种情况。此处统一采用复选框的方式，表示复选。而不是用按住Ctrl来复选。<br>			
			以下为创建一个单选树的过程：<br>
			<pre>
		var treeOption = mc.tree.createInitOption("single", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", {});

		$.fn.zTree.init($("#treeSingle"), treeOption, null);
			</pre>

			该方法和特性，详情参见附录一。
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">二、zTree树通用数据访问方法</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			由于单选、复选数的数据访问方法不一致，因此在zTree组件扩展了几个通用数据访问方法，兼容单选、复选两种情况。<br>
			（与mc.DialogField、mc.TreeField组件的数据访问思路类似。）<br>
			<br>
 			var $zTree = $.fn.zTree.getZTreeObj("#tree_id");
			1.$zTree.isSelect() ：是否已选择<br>
			2.$zTree.getId() ：获取已选择id<br>
			3.$zTree.getText() ：获取已选择显示文本<br>
			4.$zTree.getData() ：获取已选择data<br>
			5.$zTree.getAttr(attrKey) ：获取已选择属性值<br>
			也可通过工具类访问<br>
			1.mc.tree.isSelect(tree_id) ：是否已选择
			2.mc.tree.id(tree_id) ：获取已选择id
			3.mc.tree.text(tree_id) ：获取已选择显示文本
			4.mc.tree.data(tree_id) ：获取已选择data
			5.mc.tree.attr(tree_id, attrKey) ：获取已选择属性值
			<br>
			接口API详情参见附录二。
			</div>
		</div>

		<br>

		<div class="mc-flow-container" style="height: 300px;">
			<div class="ui-layout-west" mc-ly-split="true" mc-ly-size="450" mc-ly-resize="true">
				<div class="ui-layout-center mc-tree-container">
					<div id="treeSingle" class="ztree"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container">
						<div class="mc-toolbar-inner">
							<button id="btnTreeSingle_Init1" class="mc-btn-default mc-btn-small">创建</button>
							<button id="btnTreeSingle_Init2" class="mc-btn-default mc-btn-small">带根节点</button>
							<button id="btnTreeSingle_Init3" class="mc-btn-default mc-btn-small">带根节点自动展开</button>
						</div>
						<div class="mc-toolbar-inner">
							<button id="btnTreeSingle_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnTreeSingle_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnTreeSingle_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnTreeSingle_GetText" class="mc-btn-default mc-btn-small">获取文本</button>
							<button id="btnTreeSingle_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnTreeSingle_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>				
				</div>
			</div>
			<div class="ui-layout-center">
				<div class="ui-layout-center mc-tree-container">
					<div id="treeMulti" class="ztree"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container ">
						<div class="mc-toolbar-inner">
							<button id="btnTreeMulti_Init1" class="mc-btn-default mc-btn-small">创建</button>
							<button id="btnTreeMulti_Init2" class="mc-btn-default mc-btn-small">带根节点</button>
							<button id="btnTreeMulti_Init3" class="mc-btn-default mc-btn-small">带根节点自动展开</button>
						</div>
						<div class="mc-toolbar-inner">
							<button id="btnTreeMulti_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
							<button id="btnTreeMulti_IsSelect" class="mc-btn-default mc-btn-small">是否选中</button>
							<button id="btnTreeMulti_GetID" class="mc-btn-default mc-btn-small">获取id</button>
							<button id="btnTreeMulti_GetText" class="mc-btn-default mc-btn-small">获取文本</button>
							<button id="btnTreeMulti_GetData" class="mc-btn-default mc-btn-small">获取数据</button>
							<button id="btnTreeMulti_GetAttr" class="mc-btn-default mc-btn-small">获取属性</button>
						</div>
					</div>
				</div>			
			</div>
		</div>

		<br>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">三、zTree快速创建公用方法</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			在初始化参数方法上，可以更进一步简化zTree树的创建过程，直接完成创建树并加载数据。<br>
			单选树创建过程如下：
			<pre>
		var $zTree = mc.tree.createZTree("treeMulti2", "multi", "deptID", "parentID", "deptName", "",
			"sm/dept/list", "data", "", "", false, {});
			
			</pre>
			详情参见附录三。
			</div>
		</div>

		<div class="mc-flow-container" style="height: 300px;">
			<div class="ui-layout-west" mc-ly-split="true" mc-ly-size="450" mc-ly-resize="true">
				<div class="ui-layout-center mc-tree-container">
					<div id="treeSingle2" class="ztree"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container">
						<div class="mc-toolbar-inner">
							<button id="btnTreeSingle2_Init1" class="mc-btn-default mc-btn-small">创建</button>
							<button id="btnTreeSingle2_Init2" class="mc-btn-default mc-btn-small">创建自动加载</button>
							<button id="btnTreeSingle2_Init3" class="mc-btn-default mc-btn-small">带根节点</button>
							<button id="btnTreeSingle2_Init4" class="mc-btn-default mc-btn-small">带根节点自动加载并展开</button>
						</div>
						<div class="mc-toolbar-inner">
							<button id="btnTreeSingle2_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
						</div>
					</div>				
				</div>
			</div>
			<div class="ui-layout-center">
				<div class="ui-layout-center mc-tree-container">
					<div id="treeMulti2" class="ztree"></div>
				</div>
				<div class="ui-layout-south" mc-ly-split="false">
					<div class="mc-toolbar-container ">
						<div class="mc-toolbar-inner">
							<button id="btnTreeMulti2_Init1" class="mc-btn-default mc-btn-small">创建</button>
							<button id="btnTreeMulti2_Init2" class="mc-btn-default mc-btn-small">创建自动加载</button>
							<button id="btnTreeMulti2_Init3" class="mc-btn-default mc-btn-small">带根节点</button>
							<button id="btnTreeMulti2_Init4" class="mc-btn-default mc-btn-small">带根节点自动加载并展开</button>
						</div>
						<div class="mc-toolbar-inner">
							<button id="btnTreeMulti2_ReloadData" class="mc-btn-default mc-btn-small">加载数据</button>
						</div>
					</div>
				</div>			
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">附录一：zTree初始化参数特性</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			zTree默认初始化参数接口声明：<br>
			<pre>

/**
 * 创建zTree默认初始化参数
 * @param	isMulti			boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	field_id		string			主键id字段。必填。
 * @param	field_parent_id	string			parentid字段。必填。
 * @param	field_text		string			显示文本字段。必填。
 * @param	root_id			string			根节点id。必填。
 * @param	url				string			取数url。必填。
 * @param	data_root		string			后端数据入口。如设置为"data"，则将把后端返回数据responseData.data节点作为树的数据。
 * 											如传入不是字符串、或""空字符串，则将返回数据responseData整体作为树的数据。
 * @param	virtual_root	string			虚拟根节点名称。如传入不是字符串、或""空字符串，则不设置虚拟根节点。
 * @param	expand_level	integer/string	加载后自动展开级别。根节点级别为0，依次递增。
 * 											设置为大于或等于0的整数，则按级展开。
 * 											传入小于0的数值，不展开。
 * 											传入字符串"all"则全部展开。
 * 											传入其他值，则默认展开根节点(即展开0级节点)。
 * @param	otherOption		object			zTree其他参数。如要忽略可传入{}或null。
 * @return					object			创建的zTree默认初始化参数对象
 */
mc.tree.createInitOption = function(isMulti,
	field_id, field_parent_id, field_text, root_id,
	url, data_root, virtual_root, expand_level, otherOption)
			</pre>
			
			默认初始化参数的特性，参见下表<br>
			<img src="mc/demo/resources/images/新致MC框架-zTree默认初始化参数特性.png" alt="新致MC框架-zTree默认初始化参数特性.png" style="width:60%;" />
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">附录二：jQGrid表格通用数据访问接口</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			1.$zTree.isSelect() ：是否已选择<br>
			<pre>
		/**
		 * 是否已选择
		 * @return	boolean		返回是否已选择。如已选择，则返回true
		 * 适用于单选和复选两种模式
		 */
			</pre>
			<br>

			2.$zTree.getId() ：获取已选择id<br>
			<pre>
		/**
		 * 获取已选择id
		 * @return	string		返回已选择的id或id串
		 * 适用于单选和复选两种模式
		 * 单选：返回id字符串，未选择返回""空字符串
		 * 复选：返回"id1, id2, id3"字符串，未选择返回""空字符串
		 */
			</pre>
			<br>

			3.$zTree.getText() ：获取已选择显示文本<br>
			<pre>
		/**
		 * 获取已选择显示文本
		 * @return	string		返回已选择的文本或文本串
		 * 适用于单选和复选两种模式
		 * 单选：返回文本字符串，未选择返回""空字符串
		 * 复选：返回"text1, text2, text3"字符串，未选择返回""空字符串
		 */
			</pre>
			<br>

			4.$zTree.getData() ：获取已选择data<br>
			<pre>
		/**
		 * 获取已选择data
		 * @return	object/[]	返回已选择的json数据对象或json数据对象数据
		 * 适用于单选和复选两种模式
		 * 单选：返回data单个数据对象，未选择返回null
		 * 复选：返回[data1, data2, data3]数据对象数组，未选择返回[]空数组
		 */
			</pre>
			<br>

			5.$zTree.getAttr(attrKey) ：获取已选择属性值<br>
			<pre>
		/**
		 * 获取已选择属性值
		 * @param	attrKey		数据对象属性/字段名
		 * @return	string		返回已选择的json数据对象某一属性值或属性值串
		 * 适用于单选和复选两种模式
		 * 单选：返回attrValue字符串，未选择返回""空字符串
		 * 复选：返回"attrValue1, attrValue2, attrValue3"字符串，未选择返回""空字符串
		 */
			</pre>
			具体实现可参考: /mc/common/util/tree_util.js<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">附录三：zTree快速创建公用方法</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
			zTree快速创建公用方法声明：<br>
			<pre>

/**
 * zTree快速创建公用接口
 * @param	tree_id			string			树id。必填。
 * @param	isMulti			boolean/string	是否复选。true复选，false单选。"single"单选，"multi"复选。必填。
 * @param	field_id		string			主键id字段。必填。
 * @param	field_parent_id	string			parentid字段。必填。
 * @param	field_text		string			显示文本字段。必填。
 * @param	root_id			string			根节点id。必填。
 * @param	url				string			取数url。必填。
 * @param	data_root		string			后端数据入口。如设置为"data"，则将把后端返回数据responseData.data节点作为树的数据。
 * 											如传入不是字符串、或""空字符串，则将返回数据responseData整体作为树的数据。
 * @param	virtual_root	string			虚拟根节点名称。如传入不是字符串、或""空字符串，则不设置虚拟根节点。
 * @param	expand_level	integer/string	加载后自动展开级别。根节点级别为0，依次递增。
 * 											设置为大于或等于0的整数，则按级展开。
 * 											传入小于0的数值，不展开。
 * 											传入字符串"all"则全部展开。
 * 											传入其他值，则默认展开根节点(即展开0级节点)。
 * @param	load			boolean			树创建后是否要立刻加载数据。true立刻加载，否则不加载。
 * @param	otherOption		object			zTree其他参数。如要忽略可传入{}或null。
 * @return					object			创建的zTree对象本身
 */
mc.tree.createZTree = function(tree_id, isMulti,
	field_id, field_parent_id, field_text, root_id,
	url, data_root, virtual_root, expand_level, load,  
	otherOption);
			</pre>
		</div>
	</body>
</html>