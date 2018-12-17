package com.newtouch.cloud.demo.ui.dao;

import java.util.List;

import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.CriterionList;
import com.newtouch.cloud.common.dao.HibernateDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.entity.DemoSupplierEntity;

@Repository
public class DemoSupplierDAO extends HibernateDAO<DemoSupplierEntity, String>
{
	private CriterionList createCriterionList(ConditionMap cdtMap)
	{
		CriterionList cl = new CriterionList();

		if (cdtMap.containsCondition("code"))
		{
			cl.like("code", "%" + cdtMap.getString("code") + "%");
		}

		if (cdtMap.containsCondition("code"))
		{
			cl.like("name", "%" + cdtMap.getString("name") + "%");
		}

		if (cdtMap.containsCondition("status"))
		{
			cl.equal("status", cdtMap.getInteger("status"));
		}

		return cl;
	};

	public List<DemoSupplierEntity> getList(ConditionMap cdtMap)
	{
		CriterionList cl = this.createCriterionList(cdtMap);

		return this.getEntityList(cl, Order.asc("code"));
	}

	public PageData<DemoSupplierEntity> getPage(ConditionMap cdtMap)
	{
		CriterionList cl = this.createCriterionList(cdtMap);

		return this.getEntityPage(cdtMap.getStart(), cdtMap.getLimit(), cl, Order.asc("code"));
	}
}