init_FormContainer = function()
{
	$("#inputNumber").NumberField();

	$("#inputMoney").MoneyField();

	$("#dateStart").DateField();

	$("#cmbStatus").StatusComboBox();

	$("#cmbProvince").ProvinceComboBox();

	$("#fieldProvince").ProvinceField();
};

init_FormContainer2 = function()
{
	$("#inputNumber2").NumberField();




	$("#inputMoney2").MoneyField();

	$("#dateStart2").DateField();

	$("#cmbStatus2").StatusComboBox();

	$("#cmbProvince2").ProvinceComboBox();

	$("#fieldProvince2").ProvinceField();
};

$(function()
{
	init_FormContainer();

	init_FormContainer2();

	mc.layout.init();
});