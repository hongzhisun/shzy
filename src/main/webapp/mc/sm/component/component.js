init_UnitComponent = function()
{
	$("#cmbUnit").UnitComboBox();

	$("#fieldUnitGrid").UnitGridField()

	$("#fieldUnitTree").UnitTreeField();

	$("#unitGridDialog").UnitGridDialog();

	$("#unitTreeDialog").UnitTreeDialog();

	$("#btnUnitGridDialog").click(function(event)
	{
		$("#unitGridDialog").UnitGridDialog("open");
	});

	$("#btnUnitTreeDialog").click(function(event)
	{
		$("#unitTreeDialog").UnitTreeDialog("open");
	});
};

init_DeptComponent = function()
{
	$("#cmbDept").DeptComboBox();

	$("#fieldDeptGrid").DeptGridField()

	$("#fieldDeptTree").DeptTreeField();

	$("#deptGridDialog").DeptGridDialog();

	$("#deptTreeDialog").DeptTreeDialog();

	$("#btnDeptGridDialog").click(function(event)
	{
		$("#deptGridDialog").DeptGridDialog("open");
	});

	$("#btnDeptTreeDialog").click(function(event)
	{
		$("#deptTreeDialog").DeptTreeDialog("open");
	});
};

init_UserComponent = function()
{
	$("#fieldUserGrid").UserGridField()

	$("#userGridDialog").UserGridDialog();

	$("#btnUserGridDialog").click(function(event)
	{
		$("#userGridDialog").UserGridDialog("open");
	});
};

$(function()
{
	init_UnitComponent();
	
	init_DeptComponent();

	init_UserComponent();
});