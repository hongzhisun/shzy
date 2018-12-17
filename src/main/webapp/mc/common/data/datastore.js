MCloud.namespace("MCloud.data");

/**
 * json数据存储访问对象
 */
MCloud.data.DataStore = function(field_id, data)
{
	this.field_id = "";
	
	this.data = [];
	this.dataMap = new MCloud.data.Map();

	this.load = function(field_id, data)
	{
		this.field_id = field_id;

		if (field_id == undefined || data == undefined)
		{
			return;
		}

		this.data = data;

		if (!$.isArray(data))
		{
			return;
		}

		for (var i = 0; i < data.length; i++)
		{
			var rowData = data[i];
			var key = rowData[this.field_id];
			this.dataMap.put(key, rowData);
		}
	}

	/**
	 * 返回原始的data(array)
	 */
	this.getData = function()
	{
		return this.data;
	};

	/**
	 * 放入一个键值对
	 * @param {String} key
	 * @param {Object} value
	 */
	this.put = function(key, value)
	{
		this.dataMap.put(key,value);
	};
	
	/**
	 * 获取某键对应的值
	 * 支持一次获取多个
	 * @param {String}
	 *			key
	 * @return {Object} value
	 */
	this.get = function(key)
	{
		if (! mc.isArray(key))
		{
			return this.dataMap.get(key);
		}
		else
		{
			var result = new Array();
			for (var i = 0; i < key.length; i++)
			{
				result.push(this.dataMap.get(key[i]));
			}
			return result;
		}
	};

	this.getByIndex = function(index)
	{
		return this.data[index];
	};

	this.getIndexByKey = function(key)
	{
		for (var i = 0; i < this.data.length; i++)
		{
			var rowData = this.data[i];
			if (rowData[this.field_id] == key)
			{
				return i;
			}
		}

		return -1;
	};

	/**
	 * 删除一个键值对
	 * @param {String} key
	 */
	this.remove = function(key)
	{
		this.dataMap.remove(key);
	};

	/**
	 * 检查key存在
	 * @param {String} key
	 */
	this.contains = function(key)
	{
		return this.dataMap.contains(key);
	};

	/**
	 * 遍历Map,执行处理函数
	 * 
	 * @param {Function} 回调函数 function(key,value,index){..}
	 */
	this.each = function(fn)
	{
		this.dataMap.each(fn);
	};
	
	/**
	 * 获取键值数组(类似Java的entrySet())
	 * 
	 * @return 键值对象{key,value}的数组
	 */
	this.entrys = function()
	{
		return this.dataMap.entrys();
	};
	
	/**
	 * 判断Map是否为空
	 */
	this.isEmpty = function()
	{
		return this.dataMap.isEmpty();
	};
	
	/**
	 * 获取键值对数量
	 */
	this.size = function()
	{
		return this.dataMap.size();
	};

	/**
	 * 清空Map
	 */
	this.clear = function()
	{
		this.data = new Array();
		this.dataMap.clear();
	};

	/**
	 * 初始化
	 */
	this.load(field_id, data);
};

DataStore = MCloud.data.DataStore;