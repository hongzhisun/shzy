package com.newtouch.cloud.demo.server.bp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.server.dao.DataAccessDemo3DAO;

@Service
@Transactional
public class DataAccessDemo3BP
{
	@Autowired
	private DataAccessDemo3DAO dao;

	public PageData<?> getCityPage(ConditionMap cdtMap)
	{
		return this.dao.getCityPage(cdtMap);
	}
}