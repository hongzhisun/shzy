package com.shzy.md.bp;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import com.shzy.md.dao.CustomerDAO;

@Service
@Transactional
public class CustomerBP
{
	@Autowired
	private CustomerDAO dao;

	public PageData<EntityMap> getMapPage(ConditionMap cdtMap) {
		return this.dao.getMapPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit());
	}

	public List<EntityMap> getMapList(ConditionMap cdtMap) {
		return this.dao.getMapList(cdtMap);
	}
}