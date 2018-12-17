package com.newtouch.cloud.demo.form.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.demo.form.dao.DemoFormCostDAO;

@Service
@Transactional
public class DemoFormCostBP
{
	@Autowired
	private DemoFormCostDAO dao;

	public EntityMap getHeader(int operType, String entityDataID, String userID)
	{
		return this.dao.getHeader(operType, entityDataID, userID);
	}

	public List<EntityMap> getCostInfo(String entityDataID)
	{
		return this.dao.getCostInfo(entityDataID);
	}
}