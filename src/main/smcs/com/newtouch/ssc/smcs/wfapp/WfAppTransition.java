package com.newtouch.ssc.smcs.wfapp;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;

import com.newtouch.cloud.common.IDConditionUtil;
import com.newtouch.cloud.common.StringUtil;
import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.session.M8Session;
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.workflow.ssc.util.ProcessWorkDataUtil;

public class WfAppTransition
{
	/**
	 * 获取合同申请分管领导权限金额
	 * @param strContractClass2List	合同小类列表, 类似"CC010101, CC010103"
	 * @param wdMap
	 * @param pipMap
	 * @param cnn
	 * @param formdataXml
	 * @return
	 * @throws Exception
	 */
	public double getCTApplyLeaderInChargeAmount(String strNull, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap, Connection conn, String formdataXml) throws Exception
	{
//		IfLogger logger = new IfLogger("WfAppTrans");
		MCSession ms = new MCSession();
//		logger.start("getCTApplyLeaderInChargeAmount, userid=[" + ms.getUserID() + "]");

		String strContractClass2List = ProcessWorkDataUtil.get_String(wdMap, "G_SSC_SMCS_CONTRACTCLASS2LIST");
//		logger.log("@G_SSC_SMCS_CONTRACTCLASS2LIST=[" + strContractClass2List + "]");

		double dbRet = 0;
/* 2015-06-08 SQL注入整改
		String strCC2List = StringUtil.getSplitStringWithQuot(strContractClass2List);
*/
		String strBulkID = StringUtil.getGUID();
		IDConditionUtil idUtil = new IDConditionUtil(conn);
		idUtil.split_IDList(strBulkID, "cc2", strContractClass2List);

		CommonJDBCDAO dao = new CommonJDBCDAO(conn);
		String strSql = "select max(aa.amount5) as amount5";
		strSql += " from tssc_smcs_ct_approveauth aa";
		strSql += " where exists (select 1 from tssc_$idlist cc2list where cc2list.bulkid = ? and cc2list.idtype = 'cc2' and cc2list.dataid = aa.contractclass2)";
		List<EntityMap> list = dao.getMapList(strSql, new String[] { strBulkID });
/* 2015-06-08 SQL注入整改
		strSql += " where aa.contractclass2 in (" + strCC2List + ")";
		List<EntityMap> list = dao.getMapList(strSql);
*/
/*prepareStatement暂不支持in参数的绑定
		strSql += " where aa.contractclass2 in ( ? )";
		List<EntityMap> list = dao.getMapList(strSql, new String[] { strCC2List });
*/
		if (list.size() <= 0)
		{
			/**
			 * 未找到配置金额，则任务不需要经分管领导审核，返回大金额
			 */
			dbRet = 999999999;
		}
		else
		{
			EntityMap map = list.get(0);
			dbRet = map.getDouble("amount5");
		}

//		logger.end("dbRet=[" + String.valueOf(dbRet) + "]");
		return dbRet;
	}

}