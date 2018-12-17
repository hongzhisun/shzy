package com.newtouch.cloud.demo.ui.dao;

import java.util.List;

import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.CriterionList;
import com.newtouch.cloud.common.dao.HibernateDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

@Repository
public class DemoProvinceDAO extends HibernateDAO<DemoProvinceEntity, String>
{
	private CriterionList createCriterionList(ConditionMap cdtMap)
	{
		CriterionList cl = new CriterionList();

		if (cdtMap.containsCondition("code"))
		{
			cl.like("code", "%" + cdtMap.getString("code") + "%");
		}

		if (cdtMap.containsCondition("name"))
		{
			cl.like("name", "%" + cdtMap.getString("name") + "%");
		}

		if (cdtMap.containsCondition("type"))
		{
			cl.equal("type", cdtMap.getInteger("type"));
		}

		return cl;
	};

	public List<DemoProvinceEntity> getList(ConditionMap cdtMap)
	{
		CriterionList cl = this.createCriterionList(cdtMap);

		return this.getEntityList(cl, Order.asc("code"));
	}

	public PageData<DemoProvinceEntity> getPage(ConditionMap cdtMap)
	{
		CriterionList cl = this.createCriterionList(cdtMap);

		return this.getEntityPage(cdtMap.getStart(), cdtMap.getLimit(), cl, Order.asc("code"));
	}

	public boolean existsCode(DemoProvinceEntity entity)
	{
		CriterionList cl = new CriterionList();
		cl.like("code", entity.getCode())
			.notEqual("id", entity.getId());

		List<DemoProvinceEntity> list = this.getEntityList(cl);
		return (list.size() > 0);
	}
}