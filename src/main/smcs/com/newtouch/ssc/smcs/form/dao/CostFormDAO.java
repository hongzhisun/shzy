package com.newtouch.ssc.smcs.form.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.ifx.ICostFormDAO;

@Repository
public class CostFormDAO extends CommonDAO implements ICostFormDAO
{
	public List<EntityMap> getExpandHeaderInfo(String entityDataID)
	{
		String strSql = " select fc.detailid, fc.mainid, fc.status,";
		strSql += " d1.dictcode as settletypecode, d1.dictname as settletypename,";
		strSql += " d2.dictcode as payobjecttypecode, d2.dictname as payobjecttypename,";
		strSql += " d3.dictcode as paytypecode, d3.dictname as paytypename,";
		strSql += " d4.dictcode as invoicetypecode, d4.dictname as invoicetypename,";
		strSql += " eit.econitemtypeid, eit.econitemtypecode, eit.econitemtypename,";
		strSql += " su.supplierid, su.suppliercode, su.suppliername,";
		strSql += " cu.customerid, cu.customercode, cu.customername, ";
		strSql += " ub.id as payuserid, ub.varname as payusercode, ub.displayname as payusername,";
		strSql += " fc.ispay, fc.remark";
		strSql += " from tssc_smcsfm_main fm";
		strSql += " inner join tssc_smcsfm_cost fc on fc.mainid = fm.id";
		strSql += " left join tssc_smcs_supplier su on su.supplierid = fc.supplierid";
		strSql += " left join tssc_smcs_customer cu on cu.customerid = fc.customerid";
		strSql += " left join tsys_userbase ub on ub.id = fc.payuserid";
		strSql += " left join tssc_smcs_econitemtype eit on eit.econitemtypeid= fc.econitemtypeid";
		strSql += " left join tssc_usrdict d1 on d1.dictcode = fc.settletype";
		strSql += " left join tssc_usrdict d2 on d2.dictcode = fc.payobjecttype";
		strSql += " left join tssc_usrdict d3 on d3.dictcode = fc.paytype";
		strSql += " left join tssc_usrdict d4 on d4.dictcode = fc.invoicetype";
		strSql += " where fm.id = ?";

		_MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new Object[] { entityDataID });
	}

	public List<EntityMap> getCostInfo(String entityDataID)
	{
		String strSql = " select fci.mainid, fci.detailid, fci.seq, fci.status,";
		strSql += " ei.econitemid, ei.econitemcode, ei.econitemname,";
		strSql += " ti.indexid, ti.indexcode, ti.indexname,";
		strSql += " db1.uqattrid as db1id, db1.varno as db1code, db1.vardescription as db1name, '[' || db1.varno || ']' || db1.vardescription as db1text,";
		strSql += " db2.uqattrid as db2id, db2.varno as db2code, db2.varfulldescription as db2name, '[' || db2.varno || ']' || db2.vardescription as db2text,";
		strSql += " tr.taxratecode, tr.taxratename, tr.taxratetext, tr.taxrate,";
		strSql += " fci.amount_tax, fci.amount_notax, fci.amount, fci.taxratetext, fci.remark";
		strSql += " from tssc_smcsfm_main fm";
		strSql += " inner join tssc_smcsfm_cost fc on fc.mainid = fm.id";
		strSql += " inner join tssc_smcsfm_cost_info fci on fci.mainid = fm.id";
		strSql += " left join tssc_smcs_econitem ei on ei.econitemid = fci.econitemid";
		strSql += " left join tbcm_index ti on ti.indexid = fci.indexid";
		strSql += " left join tsys_departmentbase db1 on db1.uqattrid = fci.deptid";
		strSql += " left join tsys_departmentbase db2 on db2.uqattrid = fci.indexdeptid";
		strSql += " left join vssc_smcs_taxrate tr on tr.taxratecode = fci.taxrate";
		strSql += " where fm.id = ?";

		strSql += " order by fci.seq";
		_MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new Object[] { entityDataID });
	}

	/**
	 * 根据经济事项获取对应发起的流程信息
	 */
	public EntityMap getProcessInfo(ConditionMap cdtMap)
	{
		EntityMap mapResult = new EntityMap();

		String strSql = "select processid";
		strSql += " from tssc_smcs_cost_approveauth";
		strSql += " where econitemid = ?";

		List<EntityMap> listProcessID = super.getMapList(strSql, new Object[] { cdtMap.getString("econitemid") });
		if (listProcessID.size() <= 0)
		{
			mapResult.put("processid", "");
			mapResult.put("activityid", "");

			return mapResult;
		}
		else if (listProcessID.size() > 1)
		{
			throw new RuntimeException("系统配置存在问题，请联系系统管理员。错误信息：该经济事项配置了多个流程");
		}

		String strProcessID = listProcessID.get(0).getString("processid");

		strSql = " select a.activityid";
		strSql += " from twf_activity a";
		strSql += " inner join twf_activityproperty_value apv on apv.activityid = a.activityid";
		strSql += " inner join twf_activityproperty ap on ap.propertyid = apv.propertyid";
		strSql += " where a.processid = ?";
		strSql += " and ap.propertyname = 'BUSITYPE'";
		strSql += " and apv.propertyvalue = 'START'";

		List<EntityMap> listActivityID = super.getMapList(strSql, new Object[] { strProcessID });
		if (listActivityID.size() <= 0)
		{
			throw new RuntimeException("系统配置存在问题，请联系系统管理员。错误信息：流程未配置报账人节点（Busi标签=START）");
		}
		else if (listActivityID.size() > 1)
		{
			throw new RuntimeException("系统配置存在问题，请联系系统管理员。错误信息：流程配置了多个报账人节点（Busi标签=START）");
		}

		String strActivityID = listActivityID.get(0).getString("activityid");

		mapResult.put("processid", strProcessID);
		mapResult.put("activityid", strActivityID);

		return mapResult;
	}

	public String getEntityDataID(String processInstID)
	{
		String strSql = "select dataid from twf_formdatacatalog where processinstid = ?";
		return super.querySingleString(strSql, new String[] { processInstID });
	}
}