package com.newtouch.cloud.demo.server.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;

@Repository
public class DataAccessDemo1DAO extends CommonDAO
{
	/**
	 * 查询得到实体列表并返回
	 * @param cdtMap
	 * @return
	 */
	public List<DemoCityEntity> getEntityList(ConditionMap cdtMap)
	{
		/**
		 * 动态参数
		 */
		List<Object> params = new ArrayList<Object>();

		String strSql = "select city.id, city.code, city.name, city.provinceid";
		strSql += " from tdemo_city city";
		strSql += " where 1 = 1";

		if (cdtMap.containsCondition("code"))
		{
			strSql += " and city.code = ?";
			params.add(cdtMap.getString("code"));
		}

		if (cdtMap.containsCondition("name"))
		{
			strSql += " and city.name like ?";
			params.add("%" + cdtMap.getString("name") + "%");
		}

		strSql += " order by city.code";

		/**
		 * 参数数量不固定，参数使用List<Object>形式
		 */
		return this.getEntityList(strSql, params, DemoCityEntity.class);
		/**
		 * 参数数量固定，可以采用Object[]数组方式（数组扩容不如List方便）
		 */
/*		return this.getEntityList(strSql, new String[] { "", "" }, DemoCityEntity.class);*/
	}

	/**
	 * 查询得到实体Map列表，返回形式灵活
	 * @param cdtMap
	 * @return
	 */
	public List<EntityMap> getMapList(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();

		String strSql = "select city.id, city.code, city.name,";
		strSql += " 	p.id as provinceid, p.code as provincecode, p.name as provincename";
		strSql += " from tdemo_city city";
		strSql += " 	inner join tdemo_province p on p.id = city.provinceid";
		strSql += " where 1 = 1";

		if (cdtMap.containsCondition("code"))
		{
			strSql += " and city.code = ?";
			params.add(cdtMap.getString("code"));
		}

		if (cdtMap.containsCondition("name"))
		{
			strSql += " and city.name like ?";
			params.add("%" + cdtMap.getString("name") + "%");
		}

		strSql += " order by city.code";

		return this.getMapList(strSql, params);
	}

	public PageData<DemoCityEntity> getEntityPage(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();

		/**
		 * 分页查询的SQL，与不分页查询的SQL相同
		 */
		String strSql = "select city.id, city.code, city.name, city.provinceid";
		strSql += " from tdemo_city city";
		strSql += " where 1 = 1";

		if (cdtMap.containsCondition("code"))
		{
			strSql += " and city.code = ?";
			params.add(cdtMap.getString("code"));
		}

		if (cdtMap.containsCondition("name"))
		{
			strSql += " and city.name like ?";
			params.add("%" + cdtMap.getString("name") + "%");
		}

		strSql += " order by city.code";

		return this.getEntityPage(strSql, params, DemoCityEntity.class,
				cdtMap.getStart(), cdtMap.getLimit());
	}

	public PageData<EntityMap> getMapPage(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();

		/**
		 * 分页查询的SQL，与不分页查询的SQL相同
		 */
		String strSql = "select city.id, city.code, city.name,";
		strSql += " 	p.id as provinceid, p.code as provincecode, p.name as provincename";
		strSql += " from tdemo_city city";
		strSql += " 	inner join tdemo_province p on p.id = city.provinceid";
		strSql += " where 1 = 1";

		if (cdtMap.containsCondition("code"))
		{
			strSql += " and city.code = ?";
			params.add(cdtMap.getString("code"));
		}

		if (cdtMap.containsCondition("name"))
		{
			strSql += " and city.name like ?";
			params.add("%" + cdtMap.getString("name") + "%");
		}

		strSql += " order by city.code";

		return this.getMapPage(strSql, params, cdtMap.getStart(), cdtMap.getLimit());
	}

	/**
	 * 查询单个值
	 */
	public String queryCityCode(String id)
	{
		String strSql = "select city.code from tdemo_city city where city.id = ?";

		String code = this.querySingleString(strSql, new String[] { id });

		return code;

		/**
		 * 类似还有
		 * this.querySingleInteger(strSql)
		 * this.querySingleDouble(strSql)
		 * this.querySingleObject(strSql)
		 */
	}

	/**
	 * 增删改，需要自行拼写SQL
	 */
	@SuppressWarnings("unused")
	public void execute(DemoCityEntity city)
	{
		
		String strSql = "update tdemo_city city";
		strSql += " set city.code = ?,";
		strSql += " 	city.name = ?";
		strSql += " where city.id = ?";

		int intEffectRow = this.execute(strSql, new String[] { city.getCode(),
				city.getName(),
				city.getId() });
	}
}
