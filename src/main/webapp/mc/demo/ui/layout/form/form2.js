init_FormContainer1 = function()
{
	$("#inputNumber1").NumberField();

	$("#inputMoney1").MoneyField();

	$("#dateStart1").DateField();

	$("#cmbProvince1").ProvinceComboBox();

	$("#fieldProvince1").ProvinceField();
};

init_FormContainer2 = function()
{
	$("#inputNumber2").NumberField();

	$("#inputMoney2").MoneyField();

	$("#dateStart2").DateField();

	$("#cmbProvince2").ProvinceComboBox();

	$("#fieldProvince2").ProvinceField();
};

init_FormContainer3 = function()
{
	$("#inputNumber3").NumberField();

	$("#inputMoney3").MoneyField();

	$("#dateStart3").DateField();

	$("#cmbProvince3").ProvinceComboBox();

	$("#fieldProvince3").ProvinceField();
};

init_FormContainer4 = function()
{
	$("#startdate_begin").DateField();
	$("#startdate_end").DateField();
};

$(function()
{
	init_FormContainer1();
	
	init_FormContainer2();

	init_FormContainer3();

	init_FormContainer4();

	mc.layout.init();
});