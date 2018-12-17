package com.newtouch.cloud.wfapp.wokitem.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.wfapp.wokitem.dao.ApplyDAO;

@Service
@Transactional
public class ApplyBP
{
	@Autowired
	private ApplyDAO dao;

	public EntityMap getProcessData(ConditionMap cdtMap)
	{
		/* 获取当前代理人ID
		 * 暂未实现
		 * */
		List<EntityMap> listBusiClass = this.dao.getBusiClass(cdtMap);

		List<EntityMap> listProcess = this.dao.getProcess(cdtMap);

		EntityMap retData = new EntityMap();
		retData.put("busiclassdata", listBusiClass);
		retData.put("processdata", listProcess);

		return retData;
	}
}