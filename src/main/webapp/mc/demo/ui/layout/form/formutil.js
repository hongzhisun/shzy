init_Form = function()
{
	$("#inputNumber").NumberField();

	$("#inputMoney").MoneyField();

	$("#dateStart").DateField();

	$("#cmbStatus").StatusComboBox();

	$("#cmbProvince").ProvinceComboBox();

	$("#fieldProvince").ProvinceField();

	$("#btnForm_GetRawData").click(function(event)
	{
		mc.alert(mc.encode($("#form1").FormContainer("getRawData")));
	});

	$("#btnForm_GetRawData").click(function(event)
	{
	});

	$("#btnForm_GetData").click(function(event)
	{
		mc.alert(mc.encode($("#form1").FormContainer("getData")));
	});

	$("#btnForm_SetData").click(function(event)
	{
	});
};

$(function()
{
	init_Form();

	mc.layout.init();
});