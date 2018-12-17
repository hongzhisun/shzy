package com.newtouch.cloud.demo.server.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.server.dao.DataAccessDemo1DAO;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;

@Service
@Transactional
public class DataAccessDemo1BP
{
	@Autowired
	private DataAccessDemo1DAO dao;

	public List<DemoCityEntity> getEntityList(ConditionMap cdtMap)
	{
		return this.dao.getEntityList(cdtMap);
	}

	public List<EntityMap> getMapList(ConditionMap cdtMap)
	{
		return this.dao.getMapList(cdtMap);
	}

	public PageData<DemoCityEntity> getEntityPage(ConditionMap cdtMap)
	{
		return this.dao.getEntityPage(cdtMap);
	}

	public PageData<EntityMap> getMapPage(ConditionMap cdtMap)
	{
		return this.dao.getMapPage(cdtMap);
	}

	public String queryCityCode(String id)
	{
		return this.dao.queryCityCode(id);
	}

	public void execute(DemoCityEntity city)
	{
		this.dao.execute(city);
	}
}