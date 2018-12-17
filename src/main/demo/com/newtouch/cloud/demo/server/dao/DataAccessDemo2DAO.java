package com.newtouch.cloud.demo.server.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.HibernateDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;
import com.newtouch.cloud.sm.basedata.entity.DeptEntity;
import com.newtouch.cloud.sm.basedata.entity.UnitEntity;

@Repository
public class DataAccessDemo2DAO extends HibernateDAO<DemoCityEntity, String>
{
	/**
	 * 使用HQL查询Map实体List
	 */
	public List<EntityMap> getDeptList(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();

		String hql = " select dept.*,";
		hql += " 	p.deptCode as parentCode, p.deptName as parentName,";
		hql += " 	unit.unitCode as unitCode, unit.unitName as unitName";
		hql += " from DeptEntity dept";
		hql += " 	left join DeptEntity p on p.deptID = dept.parentID";
		hql += " 	left join UnitEntity unit on unit.unitID = dept.unitID";

		hql += " where 1 = 1";
		if (cdtMap.containsCondition("deptcode"))
		{
			hql += " and dept.deptCode like ?";
			params.add("%" + cdtMap.getString("deptcode") + "%");
		}

		if (cdtMap.containsCondition("deptname"))
		{
			hql += " and dept.deptName like ?";
			params.add("%" + cdtMap.getString("deptname") + "%");
		}

		return this.getMapListHQL(hql,
				new Object[] { "dept", DeptEntity.class, "p", DeptEntity.class, "unit", UnitEntity.class },
				params);
	}

	/**
	 * 使用HQL查询Map实体Page
	 */
	public PageData<EntityMap> getDeptPage(ConditionMap cdtMap)
	{
		List<Object> params = new ArrayList<Object>();

		String hql = " select dept.*,";
		hql += " 	p.deptCode as parentCode, p.deptName as parentName,";
		hql += " 	unit.unitCode as unitCode, unit.unitName as unitName";
		hql += " from DeptEntity dept";
		hql += " 	left join DeptEntity p on p.deptID = dept.parentID";
		hql += " 	left join UnitEntity unit on unit.unitID = dept.unitID";

		hql += " where 1 = 1";
		if (cdtMap.containsCondition("deptcode"))
		{
			hql += " and dept.deptCode like ?";
			params.add("%" + cdtMap.getString("deptcode") + "%");
		}

		if (cdtMap.containsCondition("deptname"))
		{
			hql += " and dept.deptName like ?";
			params.add("%" + cdtMap.getString("deptname") + "%");
		}

		return this.getMapPageHQL(hql,
				new Object[] { "dept", DeptEntity.class, "p", DeptEntity.class, "unit", UnitEntity.class },
				params, cdtMap.getStart(), cdtMap.getLimit());
	}
}