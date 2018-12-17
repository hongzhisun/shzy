package com.newtouch.cloud.demo.ui.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.cloud.demo.ui.dao.DemoSupplierDAO;
import com.newtouch.cloud.demo.ui.entity.DemoSupplierEntity;

@Service
@Transactional
public class DemoSupplierBP
{
	@Autowired
	private DemoSupplierDAO dao;

	public List<DemoSupplierEntity> getList(ConditionMap cdtMap)
	{
		return this.dao.getList(cdtMap);
	}

	public PageData<DemoSupplierEntity> getPage(ConditionMap cdtMap)
	{
		return this.dao.getPage(cdtMap);
	}

}
