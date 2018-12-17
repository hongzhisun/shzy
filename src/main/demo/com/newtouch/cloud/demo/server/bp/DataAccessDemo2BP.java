package com.newtouch.cloud.demo.server.bp;

import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.CriterionList;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.server.dao.DataAccessDemo2DAO;
import com.newtouch.cloud.demo.ui.entity.DemoCityEntity;

@Service
@Transactional
public class DataAccessDemo2BP
{
	@Autowired
	private DataAccessDemo2DAO dao;

	/**
	 * ==========使用Criteria，进行单实体查询===================
	 * 原生的Criteria，对于空值控制不佳
	 */

	/**
	 * 查询全部
	 * @return
	 */
	public List<DemoCityEntity> getAllCityList()
	{
		return this.dao.getEntityList();
	}

	/**
	 * 单个约束条件查询
	 * @param cdtMap
	 * @return
	 */
	public List<DemoCityEntity> getCityListByCode(ConditionMap cdtMap)
	{
		Criterion criterion = Restrictions.eq("code", cdtMap.getString("code"));
		return this.dao.getEntityList(criterion);
	}

	/**
	 * 多个约束条件查询，加排序
	 * @param cdtMap
	 * @return
	 */
	public List<DemoCityEntity> getCityListByCondition(ConditionMap cdtMap)
	{
		CriterionList cl = new CriterionList()
			.equal("code", cdtMap.getString("code"))
			.like("name", "%" + cdtMap.getString("name") + "%");
		
		return this.dao.getEntityList(cl, Order.asc("code"));
	}

	/**
	 * 多个约束条件查询，加排序，（分页数据）
	 * @param cdtMap
	 * @return
	 */
	public PageData<DemoCityEntity> getCityPageByCondition(ConditionMap cdtMap)
	{
		CriterionList cl = new CriterionList()
			.equal("code", cdtMap.getString("code"))
			.like("name", "%" + cdtMap.getString("name") + "%");
	
		return this.dao.getEntityPage(cdtMap.getStart(), cdtMap.getLimit(), cl, Order.asc("code"));
	}

	/**
	 * 使用HQL查询实体列表，可使用Hibernate原生的Query
	 * 但这种方式对非实体查询支持不佳
	 */

	/**
	 * 使用HQL查询Map实体List
	 */
	public List<EntityMap> getDeptList(ConditionMap cdtMap)
	{
		return this.dao.getDeptList(cdtMap);
	}

	/**
	 * 使用HQL查询Map实体List
	 */
	public PageData<EntityMap> getDeptPage(ConditionMap cdtMap)
	{
		return this.dao.getDeptPage(cdtMap);
	}
}