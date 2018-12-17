package com.newtouch.ssc.smcs.form.bp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.entity.UrlInfo;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderBP;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderDAO;

@Service
@Transactional
public class CommonHeaderBP implements ICommonHeaderBP
{
	@Autowired
	private ICommonHeaderDAO dao = null;

	public String getBillTypeNameByCode(String strBillTypeCode)
	{
		return this.dao.getBillTypeNameByCode(strBillTypeCode);
	}

	public String getBusiClassNameByCode(String strBusiClassCode)
	{
		return this.dao.getBusiClassNameByCode(strBusiClassCode);
	}

	/**
	 * 打开报账单
	 * 获取报账单url信息
	 * @param entityDataID
	 * @return
	 * @throws Exception
	 */
	public UrlInfo getFormUrlInfo(String entityDataID) throws Exception
	{
		return this.dao.getFormUrlInfo(entityDataID);
	}

	public List<EntityMap> getInitCommonHeaderInfo(String strBillTypeCode, String strBusiClassCode)
	{
		return this.dao.getInitCommonHeaderInfo(strBillTypeCode, strBusiClassCode);
	}

	public List<EntityMap> getCommonHeaderInfo(String strEntityDataID)
	{
		return this.dao.getCommonHeaderInfo(strEntityDataID);
	}
}