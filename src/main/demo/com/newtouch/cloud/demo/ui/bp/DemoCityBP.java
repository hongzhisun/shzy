package com.newtouch.cloud.demo.ui.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.StringUtil;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.dao.DemoCityDAO;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;

@Service
@Transactional
public class DemoCityBP
{
	@Autowired
	private DemoCityDAO dao;

	public List<DemoCityEntity> getList(ConditionMap cdtMap)
	{
		return this.dao.getList(cdtMap);
	}

	public PageData<DemoCityEntity> getPage(ConditionMap cdtMap)
	{
		return this.dao.getPage(cdtMap);
	}

	public List<EntityMap> getMapList(ConditionMap cdtMap)
	{
		return this.dao.getMapList(cdtMap);
	}

	public void add(DemoCityEntity entity) throws Exception
	{
		if (StringUtil.isNullString(entity.getId()))
		{
			entity.setId(StringUtil.getGUID());
		}

		if (StringUtil.isNullString(entity.getCode()))
		{
			throw new RuntimeException("编码不可为空");
		}

		if (StringUtil.isNullString(entity.getName()))
		{
			throw new RuntimeException("名称不可为空");
		}

		if (this.dao.existsCode(entity))
		{
			throw new RuntimeException("编码[" + entity.getCode() + "]重复");
		}

		this.dao.add(entity);
	}

	public void update(DemoCityEntity entity) throws Exception
	{
		if (StringUtil.isNullString(entity.getCode()))
		{
			throw new RuntimeException("编码不可为空");
		}

		if (StringUtil.isNullString(entity.getName()))
		{
			throw new RuntimeException("名称不可为空");
		}

		if (this.dao.existsCode(entity))
		{
			throw new RuntimeException("编码[" + entity.getCode() + "]重复");
		}

		this.dao.update(entity);
	}

	public void delete(String id) throws Exception
	{
		this.dao.delete(id);
	}
}