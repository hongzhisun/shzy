package com.newtouch.cloud.demo.ui.dao;

import java.util.List;

import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.CriterionList;
import com.newtouch.cloud.common.dao.HibernateDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;
import com.newtouch.cloud.demo.ui.entity.DemoProvinceEntity;

@Repository
public class DemoCityDAO extends HibernateDAO<DemoCityEntity, String>
{
	private CriterionList getCriterionList(ConditionMap cdtMap)
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

		if (cdtMap.containsCondition("provinceid"))
		{
			cl.equal("provinceID", cdtMap.getString("provinceid"));
		}

		return cl;
	};

	public List<DemoCityEntity> getList(ConditionMap cdtMap)
	{
		CriterionList cl = this.getCriterionList(cdtMap);

		return this.getEntityList(cl, Order.asc("code"));
	}

	public PageData<DemoCityEntity> getPage(ConditionMap cdtMap)
	{
		CriterionList cl = this.getCriterionList(cdtMap);

		return this.getEntityPage(cdtMap.getStart(), cdtMap.getLimit(), cl, Order.asc("code"));
	}

	public List<EntityMap> getMapList(ConditionMap cdtMap)
	{
		String hql = "select c.*,";
		hql += " p.code as provinceCode, p.name as provinceName";
		hql += " from DemoCityEntity c inner join DemoProvinceEntity p on p.id = c.provinceID";
		hql += " order by c.code";
		
		return this.getMapListHQL(hql, new Object[] { "c", DemoCityEntity.class, "p", DemoProvinceEntity.class },
				new Object[]{},
				new PattenMap().append("createDate", "yyyy-MM-dd HH:mm:ss"), false);
	}

	public boolean existsCode(DemoCityEntity entity)
	{
		CriterionList cl = new CriterionList();
		cl.like("code", entity.getCode())
			.notEqual("id", entity.getId());

		List<DemoCityEntity> list = this.getEntityList(cl);
		return (list.size() > 0);
	}
}