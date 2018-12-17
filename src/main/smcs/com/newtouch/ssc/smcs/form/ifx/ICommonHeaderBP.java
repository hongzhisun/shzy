package com.newtouch.ssc.smcs.form.ifx;

import java.util.List;

import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.entity.UrlInfo;

public interface ICommonHeaderBP
{
	/**
	 * 获取报账类型
	 * @param strBillTypeCode
	 * @return
	 */
	String getBillTypeNameByCode(String strBillTypeCode);

	/**
	 * 获取报账业务类型
	 * @param strBusiClassCode
	 * @return
	 */
	String getBusiClassNameByCode(String strBusiClassCode);

	/**
	 * 打开报账单
	 * 获取报账单url信息
	 * @param entityDataID
	 * @return
	 * @throws Exception
	 */
	UrlInfo getFormUrlInfo(String entityDataID) throws Exception;

	/**
	 * 获取公用表头初始数据
	 * @param strBillTypeCode
	 * @param strBusiClassCode
	 * @return
	 */
	List<EntityMap> getInitCommonHeaderInfo(String strBillTypeCode, String strBusiClassCode);

	/**
	 * 获取公用表头信息
	 * @param strEntityDataID
	 * @return
	 */
	List<EntityMap> getCommonHeaderInfo(String strEntityDataID);
}