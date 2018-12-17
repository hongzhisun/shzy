package com.newtouch.cloud.demo.server.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;

@Repository
public class DataAccessDemo3DAO
{
	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * 使用Hibernate原生的Session进行查询
	 * @param cdtMap
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public PageData<?> getCityPage(ConditionMap cdtMap)
	{
		Session session = this.sessionFactory.getCurrentSession();

/*		String hql = "from DemoCityEntity city";
		hql += " where city.code = ?";
		hql += " 	and city.name like ?";

		Query query = session.createQuery(hql);
		query.setString(0, cdtMap.getString("code"))
			.setString(1, "%" + cdtMap.getString("name") + "%")
			.setFirstResult(cdtMap.getStart())
			.setMaxResults(cdtMap.getLimit());
		List<Object> list = query.list();

		Query queryAll = session.createQuery(hql);
		queryAll.setString(0, cdtMap.getString("code"))
			.setString(1, "%" + cdtMap.getString("name") + "%");
		List<Object> listAll = queryAll.list();*/

		String hql = "from DeptEntity dept";
		hql += " 	inner join UnitEntity unit on unit.unitID = dept.unitID";
		hql += " where dept.deptCode = ?";
		hql += " 	and dept.deptName like ?";

		Query query = session.createQuery(hql);
		query.setString(0, cdtMap.getString("code"))
			.setString(1, "%" + cdtMap.getString("name") + "%")
			.setFirstResult(cdtMap.getStart())
			.setMaxResults(cdtMap.getLimit());
		List<Object> list = query.list();

		Query queryAll = session.createQuery(hql);
		queryAll.setString(0, cdtMap.getString("code"))
			.setString(1, "%" + cdtMap.getString("name") + "%");
		List<Object> listAll = queryAll.list();

		return new PageData<Object>(list, listAll.size(), cdtMap.getLimit());
	}
}