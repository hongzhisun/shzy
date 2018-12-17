MCloud.namespace("MCloud");

MCloud.Component = function(config)
{
	this.id;
	this.getId = function()
	{
		return this.id;
	}

	this.domid;
	this.getDomId = function()
	{
		return this.domid;
	}

	this.group;
	this.getGroup = function()
	{
		return this.group;
	}

	this.getValue = function()
	{
		return "";
	};
	
	MCloud.apply(this, config);

	MCloud.ComponentMgr.reg(this);
};