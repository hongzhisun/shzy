package com.newtouch.cloud.demo.ui.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.StringUtil;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.dao.DemoProvinceDAO;
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

@Service
@Transactional
public class DemoProvinceBP
{
	@Autowired
	private DemoProvinceDAO dao;

	public List<DemoProvinceEntity> getList(ConditionMap cdtMap)
	{
		return this.dao.getList(cdtMap);
	}

	public PageData<DemoProvinceEntity> getPage(ConditionMap cdtMap)
	{
		return this.dao.getPage(cdtMap);
	}

	public void add(DemoProvinceEntity entity) throws Exception
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

	public void update(DemoProvinceEntity entity) throws Exception
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
		/**
		 * to-do
		 * 可以检查是否还有下属城市
		 */

		this.dao.delete(id);
	}
}