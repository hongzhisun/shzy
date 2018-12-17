<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>选择组件高级应用(3)</title>
		<!-- mc-framework -->
		<%@ include file="/mc/common/mc_all.jspf"%>
		<!-- sm-all -->
		<%@ include file="/mc/sm/common/sm_all.jspf"%>
		<!-- demo-all -->
		<%@ include file="/mc/demo/common/mc_demo_all.jspf"%>

		<script type="text/javascript" src="mc/demo/ui/component/field/field_advanced3.js"></script>
	</head>

	<body>
		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">四、选择组件高级应用 - 数据存储</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				由于选择组件显示值与实际值分离，组件内部实际存储的是一个完整的数据对象，包含显示值、实际值以及其他属性。<br>
				<br>
				下面以部门弹窗选择组件作为例子。<br>
				代码：src/main/webapp/mc/sm/component/field/DeptField.js<br>
				<br>
				组件从后台获取到的部门列表，每一行都有如下的结构，包含了一个部门的完整的信息，以及必要的关联实体，（这里是公司）。<br>
				<pre>
	{
		deptID : "",	//部门id
		deptCode : "",	//部门编码
		deptName : "",	//部门名称
		status : "",	//状态
		memo : "",		//备注
		unitID : "",	//公司id
		unitCode : "",	//公司编码
		unitName : "",	//公司名称
		address	: "",	//地址
		tel	: "",		//电话
		fax	: "",		//传真
		...
	}
				</pre>
				<br>

				在弹窗中选择了一行数据，组件内部选择到的是这一个部门数据对象。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">五、选择组件高级应用 - 数据显示</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选择组件选定一项或多项后，将根据初始化参数field_text，决定显示数据对象的哪一个属性。<br>
				<br>

				选择组件化后，一般就固化了显示字段，不过实际使用中也可以动态修改显示字段。<br>
				例如部门表格弹窗选择组件(mc.DeptGridField)<br>
				<pre>
	field_id : "deptID",		/* id字段 */
	field_text : "deptName"		/* text字段 */
				</pre>
				<br>

				直接使用，显示deptName属性，即部门名称。<br>
				<br>
				如果创建组件时，修改field_text为"deptCode"，即可显示部门编码。样例代码如下<br>
				<pre>
	$("#gridFieldDept_Code").DeptGridField(
	{
		field_text : "deptCode"
	});
				</pre>
				
				<br>
				<span>部门：</span><input id="gridFieldDept_Name" class="mc-input" type="text">
				<br>
				<br>

				<span>部门编码：</span><input id="gridFieldDept_Code" class="mc-input" type="text">
				<span>部门名称：</span><input id="deptName" class="mc-input" type="text">
				<br>
				<br>

				后台返回的数据字段是有限的，在有些情况下（比如需要调用一个已存在的http api接口），缺少需要显示的字段，或者需要处理才方便显示。<br>
				此时可以借助dataFilterCallback回调函数处理。<br>
				下面是各类部门选择组件，希望能显示部门编码 + 部门名称。效果如下：<br>
				<br>
				<span>部门(编码+名称)-动态下拉选择组件：</span><select id="cmbDept_CodeName"></select>
				<br>
				<span>部门(编码+名称)-表格弹窗选择组件：</span><input id="gridFieldDept_CodeName" class="mc-input" type="text" style="width:300px;">
				<br>
				<span>部门(编码+名称)-树弹窗选择组件：</span><input id="treeFieldDept_CodeName" class="mc-input" type="text" style="width:300px;">
				<br>

				要点：<br>
				1）在dataFilterCallback回调函数中，处理后台返回的数据集。增加新字段deptText<br>
					把返后台返回数据中的部门编码deptCode和部门名称deptName组合，作为新字段deptText。<br>
				2）把显示字段设置为新字段deptText<br>
				<br>
				<pre>
	$("#cmbDept_CodeName").DeptComboBox(
	{
		field_text : "deptText",
		dataFilterCallback : function(responseData)					/* Ajax查询后台数据后预处理回调函数 */
		{
			if (responseData.success && mc.isArray(responseData.data))
			{
				for (var i = 0; i < responseData.data.length; i++)
				{
					var row = responseData.data[i];
					row.deptText = row.deptCode + "/" + row.deptName;	/* 增加新字段deptText */
				}
			}
		}
	});
				</pre>
			</div>
		</div>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">六、选择组件高级应用 - 数据读取</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选择组件数据读取与设置相关API如下：<br>
				<img src="mc/demo/resources/images/新致MC框架-选择组件-03数据访问.png" alt="新致MC框架-选择组件-03数据访问.png" />
				<br>

				当我们需要获取组件已选择的数据时，可以通过选择组件的数据访问接口，获取id(getId)、获取文本(getText)、获取数据对象(getData)。<br>
				那么这个数据对象中有很多属性（字段），哪个才是id或者文本字段呢？<br>
				组件是通过这两个关键的初始化参数field_id、field_text来决定的。<br>
				这里field_id定义了实际值，field_text定义了显示值。<br>
				<br>
				在部门表格弹窗选择组件(mc.DeptGridField)中，我们可以看到是按以下方式设置的：<br>
				<pre>
	field_id : "deptID",		/* id字段 */
	field_text : "deptName"		/* text字段 */
				</pre>
				<br>
				因此调用组件getId接口，返回当前选择数据的deptID属性；调用getText接口，返回当前选择数据的deptName属性。<br>
				也可以通过调用getData，返回当前选择的整个数据对象。<br>
				静态和动态下拉组件，还可以获取当前选择数据的索引号，但是弹窗选择字段不支持获取索引号。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;getAttr接口<br>
				如果需要获取除了实际值与显示值之外的其他字段值，可以通过getAttr获取。<br>
				例如上述部门弹窗组件，如果需要获取已选择的部门编码（数据对象属性为deptCode），可以通过以下方式：<br>
				<pre>
	/* 通过getAttr接口获取 */
	var deptCode1 = $("#fieldDept").DeptGridField("getAttr", "deptCode");	

	/* 通过代理接口attr获取 */
	var deptCode2 = $("#fieldDept").DeptGridField("attr", "deptCode");		

	/* 先获取部门数据对象，再获取部门编码 */
	var deptData = $("#fieldDept").DeptGridField("getData");
	var deptCode3 = deptData.deptCode;
				</pre>

				<br>

				不过静态下拉组件的数据来源是页面html，除了id和name没有其他的属性，因此不支持getAttr方法。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;支持单选和复选模式<br>
				对于表格弹窗选择组件、树弹窗选择组件，存在单选和复选模式。<br>
				以上接口同时支持单选和复选模式。在不同模式下，返回结果的格式有所不同。<br>
				例如getId接口，单选模式返回“id1”，复选模式返回“id1, id2, id3”。<br>
				getData接口，单选模式返回{...}，复选模式返回[{...}, {...}, {...}]<br>
				具体格式参见各组件的API文档。<br>
				<br>

				<i class="fa fa-circle"></i>&nbsp;isSelect接口<br>
				另外还有一个接口，与数据读取紧密相关。isSelect，可以用来判断组件当前是否已选择。支持以上所有组件。<br>
				isSelect接口，同样支持单选和复选模式。<br>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七、选择组件高级应用 - 数据设置</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				选择组件常常需要通过代码设置数据，显示已保存的选项。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;常见的使用场景：<br>
				在xx数据维护界面，选择已有的数据进行编辑，弹出一个编辑对话框。<br>
				对话框中有的数据字段，例如状态、类型、所属公司等，是枚举项或主数据，使用下拉框或弹出选择组件来展示。<br>
				打开编辑对话框时需要把后台读取到的已选择的项，正确显示在下拉框或弹出选择组件中。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;对组件正确设置数据后应当满足以下两点：<br>
				1）界面正常显示，与手工选择后的效果一致。<br>
				2）组件的取数接口得到的结果正确，与手工选择后的效果尽可能一致。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;静态数据组件<br>
				静态下拉组件(mc.ComboBox)相对简单，只需要调用setId方法，传入已保存的id即可。<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;动态数据组件<br>
				动态数据组件包括：动态下拉组件(mc.DynamicComboBox)、表格弹窗选择组件(mc.GridField)、树弹窗选择组件(mc.TreeGrid)。<br>
				这三种组件设置数据方法相对复杂。<br>
				由于这些组件数据来源于后台，由于考虑到页面显示性能，选项数据采用延迟加载方式，当点击下拉或弹出时，才去后台查询数据。<br>
				因此页面初始化显示后，但还没有点击操作这些组件之前，选项的选项数据在页面上还不存在，无法通过设置id方式来显示初始值。<br>
				<br>

				可以通过两种以下方法设置初始值：<br>
				<br>
				<i class="fa fa-circle"></i>&nbsp;setData接口<br>
				传入一个部门数据对象，其中至少要包含field_id、field_text这两个定义的属性值。<br>
				如果没有传入deptID属性，如果后续操作调用了该组件的getId方法，将无法得到实际的id值；很多其他操作也会出错。<br>
				如果没有传入deptName属性，那么组件无法正确显示。<br>
				<pre>
	var deptData = 
	{
		deptID : "id0001",
		deptName : "xx部门"
	};

	$("#fieldDept").DeptGridField("setData", deptData);
				</pre>
				<br>

				<i class="fa fa-circle"></i>&nbsp;setInitData接口<br>
				考虑到不同的组件，定义的field_id、field_text初始化参数不一致。<br>
				例如：部门组件是deptID、deptName；公司组件是unitID、unitName；而角色组件是id、name。<br>
				这样调用起来并不方便，因此组件另外提供了一个简单的初始化接口setInitData，只需把部门id和部门名称作为两个参数分别传入组件即可。<br>
				无需记忆各组件的field_id、field_text具体的值。<br>
				<pre>
	$("#fieldDept").DeptGridField("setInitData", "id0001", "xx部门");
				</pre>
				<br>
				不过虽然setInitData使用相对简单，但使用场景有限制。<br>
				通过setInitData接口设置后，组件内部数据对象只有id和显示文本两个属性。如果后续操作调用getAttr方法，获取部门的其他属性，将无法获取到。<br>
				<br>

				例如，后续操作需要获取部门编码属性(deptCode)。<br>
				<pre>
	$("#fieldDept").DeptGridField("setInitData", "id0001", "xx部门");

	......

	/* 无法获取deptCode属性值，获取的值为空字符串"" */
	var deptCode = $("#fieldDept").DeptGridField("getAttr", "deptCode");

				</pre>
				<br>

				如果有这样的情况，仍需要使用setData方法设置初始值，把deptCode属性一起设置进去。
				<pre>
	var deptData = 
	{
		deptID : "id0001",
		deptCode : "bm0001",
		deptName : "xx部门"
	};

	$("#fieldDept").DeptGridField("setData", deptData);

	......

	/* 可以获取deptCode属性值 */				
	var deptCode = $("#fieldDept").DeptGridField("getAttr", "deptCode");
				</pre>
				<br>

				<i class="fa fa-circle"></i>&nbsp;单选和复选模式<br>
				setData与setInitData两个接口，都同时支持单选和复选模式。<br>
				<br>
				setData单选模式：
				<pre>
	var data = { deptID : "id0003", deptCode : "id0003", deptName : "财务部" }
	$("#gridFieldDept_Single").DeptGridField("data", data);
				</pre>
				setData复选模式：
				<pre>
	var data =
	[ 
	 	{ deptID : "id0003", deptCode : "id0003", deptName : "财务部" },
	 	{ deptID : "id0005", deptCode : "id0005", deptName : "市场部" }
	];
	$("#gridFieldDept_Multi").DeptGridField("data", data);
				</pre>
				<br>

				setInitData单选模式：
				<pre>
	var id = "id0004";
	var text = "人力资源部";
	$("#gridFieldDept_Single").DeptGridField("setInitData", id, text);
				</pre>
				setInitData复选模式：
				<pre>
	var id = "id0004, id0006";
	var text = "人力资源部, 采购部";
	$("#gridFieldDept_Multi").DeptGridField("setInitData", id, text);
				</pre>
			</div>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七（1）、选择组件高级应用 - 数据设置 - 样例 - 静态下拉组件(mc.ComboBox)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				请不要点击下拉组件的选择按钮。<br>
				1) 先点击【获取数据】按钮，查看组件取数接口效果。<br>
				2) 点击【setID】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>原生mc.ComboBox组件，省份</th>
					<td>
						<select id="cmbStaticData">
							<option value="">请选择...</option>
							<option value="pc1">江苏</option>
							<option value="pc2">浙江</option>
							<option value="pc3">福建</option>
							<option value="pc4">广东</option>
						</select>
					</td>
					<td>
						<button id="btnStaticData_getData" class="mc-btn-default">获取数据</button>
						<button id="btnStaticData_setID" class="mc-btn-default">setID</button>
					</td>
				</tr>
				<tr>
					<th>已封装业务组件，启用状态下拉选择组件(mc.StatusComboBox)</th>
					<td>
						<select id="cmbStatus"></select>
					</td>
					<td>
						<button id="btnStatus_getData" class="mc-btn-default">获取数据</button>
						<button id="btnStatus_setID" class="mc-btn-default">setID</button>
					</td>
				</tr>
				<tr>
					<th>已封装业务组件，是否下拉选择组件(mc.YesNoComboBox)</th>
					<td>
						<select id="cmbYesNo"></select>
					</td>
					<td>
						<button id="btnYesNo_getData" class="mc-btn-default">获取数据</button>
						<button id="btnYesNo_setID" class="mc-btn-default">setID</button>
					</td>
				</tr>
			</table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七（2）、选择组件高级应用 - 数据设置 - 样例 - 动态下拉组件(mc.DynamicComboBox)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				请不要点击下拉组件的选择按钮。<br>
				1) 先点击【获取数据】按钮，查看组件取数接口效果。<br>
				2) 点击【setData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。<br>
				3) 点击【setInitData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。两者区别在getAttr方法上。<br>
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>原生mc.DynamicComboBox组件，省份</th>
					<td>
						<select id="cmbDynamicData"></select>
					</td>
					<td>
						<button id="btnDynamicData_getData" class="mc-btn-default">获取数据</button>
						<button id="btnDynamicData_setData" class="mc-btn-default">setData</button>
						<button id="btnDynamicData_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
				<tr>
					<th>已封装业务组件，部门下拉选择组件(sm.DeptComboBox)</th>
					<td>
						<select id="cmbDept"></select>
					</td>
					<td>
						<button id="btnComboBoxDept_getData" class="mc-btn-default">获取数据</button>
						<button id="btnComboBoxDept_setData" class="mc-btn-default">setData</button>
						<button id="btnComboBoxDept_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
			</table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七（3）、选择组件高级应用 - 数据设置 - 样例 - 表格弹窗选择组件(mc.GridField)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				请不要点击弹窗选择组件的选择按钮。<br>
				1) 先点击【获取数据】按钮，查看组件取数接口效果。<br>
				2) 点击【setData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。<br>
				3) 点击【setInitData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。两者区别在getAttr方法上。<br>
				4) 分别尝试单选和复选模式下，设值方式的区别。
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>部门表格弹窗选择组件(单选)</th>
					<td>
						<input id="gridFieldDept_Single" class="mc-input" type="text">
					</td>
					<td>
						<button id="btnGridFieldDept_Single_getData" class="mc-btn-default">获取数据</button>
						<button id="btnGridFieldDept_Single_setData" class="mc-btn-default">setData</button>
						<button id="btnGridFieldDept_Single_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
				<tr>
					<th>部门表格弹窗选择组件(复选)</th>
					<td>
						<input id="gridFieldDept_Multi" class="mc-input" type="text">
					</td>
					<td>
						<button id="btnGridFieldDept_Multi_getData" class="mc-btn-default">获取数据</button>
						<button id="btnGridFieldDept_Multi_setData" class="mc-btn-default">setData</button>
						<button id="btnGridFieldDept_Multi_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
			</table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">七（4）、选择组件高级应用 - 数据设置 - 样例 - 树弹窗选择组件(mc.TreeGrid)</div>
		</div>
		<div class="mc-text-container no-padding-top no-padding-bottom">
			<div class="mc-text-inner">
				请不要点击弹窗选择组件的选择按钮。<br>
				1) 先点击【获取数据】按钮，查看组件取数接口效果。<br>
				2) 点击【setData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。<br>
				3) 点击【setInitData】按钮后，再点击【获取数据】按钮，查看组件取数接口是否正常工作。两者区别在getAttr方法上。<br>
				4) 分别尝试单选和复选模式下，设值方式的区别。
			</div>
		</div>
		<div class="mc-form-container no-padding-top">
			<table class="mc-form-table">
				<colgroup>
					<col style="width: 200px;" />
					<col style="width: 200px;" />
					<col />
				</colgroup>
				<tr>
					<th>部门树弹窗选择组件(单选)</th>
					<td>
						<input id="treeFieldDept_Single" class="mc-input" type="text">
					</td>
					<td>
						<button id="btnTreeFieldDept_Single_getData" class="mc-btn-default">获取数据</button>
						<button id="btnTreeFieldDept_Single_setData" class="mc-btn-default">setData</button>
						<button id="btnTreeFieldDept_Single_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
				<tr>
					<th>部门树弹窗选择组件(复选)</th>
					<td>
						<input id="treeFieldDept_Multi" class="mc-input" type="text">
					</td>
					<td>
						<button id="btnTreeFieldDept_Multi_getData" class="mc-btn-default">获取数据</button>
						<button id="btnTreeFieldDept_Multi_setData" class="mc-btn-default">setData</button>
						<button id="btnTreeFieldDept_Multi_setInitData" class="mc-btn-default">setInitData</button>
					</td>
				</tr>
			</table>
		</div>

		<br>

		<div class="mc-title-container no-padding-bottom">
			<div class="mc-title-inner mc-title-bold">八、选择组件高级应用 - 回调函数与多级联动</div>
		</div>
		<div class="mc-text-container no-padding-top">
			<div class="mc-text-inner">
				<img src="mc/demo/resources/images/新致MC框架-选择组件-04回调函数.png" alt="新致MC框架-选择组件-04回调函数.png" />
				<br>
				回调函数各组件比较一致<br>
				静态下拉组件由于不需要从后台获取数据，因此没有beforeOpenCallback回调函数。<br>
				<br>
				另外，下拉组件与弹窗组件，各回调函数之间的参数有区别。<br>
				下拉组件会多传入选项的index、event、ui参数<br>
				具体参见各组件API文档。<br>
				<br>
				选择组件多级联动，需要借助回调函数来关联。<br>
				具体样例参见各组件的说明文档。<br>
			</div>
		</div>
	</body>
</html>