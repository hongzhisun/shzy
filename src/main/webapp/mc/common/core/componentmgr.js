MCloud.namespace("MCloud.ComponentMgr");

MCloud.ComponentMgr.ComponentMap = new MCloud.Map();
MCloud.ComponentMgr.ComponentGroupMap = new MCloud.Map();

MCloud.ComponentMgr.reg = function(comp)
{
	MCloud.ComponentMgr.ComponentMap.put(comp.getId(), comp);

	if (comp.group != null && typeof (comp.group) == "string" )
	{
		if (! MCloud.ComponentMgr.ComponentGroupMap.contains(comp.group))
		{
			MCloud.ComponentMgr.ComponentGroupMap.put(comp.group, new MCloud.Map());
		}

		MCloud.ComponentMgr.ComponentGroupMap.get(comp.group).put(comp.getId(), comp);
	}
};

MCloud.ComponentMgr.get = function(id)
{
	return MCloud.ComponentMgr.ComponentMap.get(id);
};

MCloud.ComponentMgr.getData = function(group)
{
	var data = {};

	var CompMap;

	if (group == undefined)
	{
		CompMap = MCloud.ComponentMgr.ComponentMap;
	}
	else
	{
		CompMap = MCloud.ComponentMgr.ComponentGroupMap.get(group);
	}

	for (var i = 0; i < CompMap.size(); i++)
	{
		var key = CompMap.keys[i];
		var comp = CompMap.get(key);
		if (comp.getValue != undefined && typeof (comp.getValue) == "function")
		{
			data[key] = comp.getValue();
		}
	}

	return data;
};

MCloud.reg = MCloud.ComponentMgr.reg;
MCloud.get = MCloud.ComponentMgr.get;
MCloud.getData = MCloud.ComponentMgr.getData;

