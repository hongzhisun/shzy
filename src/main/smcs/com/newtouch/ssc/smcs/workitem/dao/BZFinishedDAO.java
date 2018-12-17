package com.newtouch.ssc.smcs.workitem.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.workitem.ifx.IBZFinishedDAO;

@Repository
public class BZFinishedDAO extends CommonDAO implements IBZFinishedDAO
{
	public List<EntityMap> getList(ConditionMap cdtMap) throws Exception
	{
		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);

		super._MapFieldCastLowerCase = true;
		return super.getMapList(strSql, params);
	}

	public PageData<EntityMap> getPage(ConditionMap cdtMap, int start, int limit) throws Exception
	{

		List<Object> params = new ArrayList<Object>();
		String strSql = this.getSQL(cdtMap, params);

		super._MapFieldCastLowerCase = true;
		return super.getMapPage(strSql, params,start, limit);
	}

	private String getSQL(ConditionMap cdtMap, List<Object> params)
	{
		params.clear();

		String strSql = "select fm.id as mainid,";
		strSql += " fm.processid, fm.processinstid, to_char(pi.startdate, 'YYYY-MM-DD HH24:MI:SS') as pistartdate,";
		strSql += " WK_PACK_FORMSERIALNO.get_LastCheckActivityInstID(fm.processinstid) as activityinstid,";
		strSql += " (select ai.activityid from twf_activityinst ai where ai.activityinstid = WK_PACK_FORMSERIALNO.get_LastCheckActivityInstID(fm.processinstid)) as activityid,";
		strSql += " (select a.activityname from twf_activityinst ai inner join twf_activity a on a.activityid = ai.activityid";
		strSql += " 	where ai.activityinstid = WK_PACK_FORMSERIALNO.get_LastCheckActivityInstID(fm.processinstid)) as activityname,";
		strSql += " (select a.activitydesc from twf_activityinst ai inner join twf_activity a on a.activityid = ai.activityid";
		strSql += " 	where ai.activityinstid = WK_PACK_FORMSERIALNO.get_LastCheckActivityInstID(fm.processinstid)) as activitydesc,";
		strSql += " (select zh_concat(ub.displayname) from twf_activityinst ai inner join twf_workitem wi on wi.activityinstid = ai.activityinstid";
		strSql += " 	inner join tsys_userbase ub on ub.id = wi.userid";
		strSql += " 	where ai.activityinstid = WK_PACK_FORMSERIALNO.get_LastCheckActivityInstID(fm.processinstid)) as belongusername,";
		strSql += " fm.serialno, fm.abstract, fm.affixnum,";
		strSql += " fm.formtypecode, ft.formtypename,";
		strSql += " fm.busiclasscode, bc.busiclassname,";
		strSql += " fm.unitid, unit.varno as unitcode, unit.vardescription as unitname,";
		strSql += " fm.deptid, dept.varno as deptcode, dept.vardescription as deptname,";
		strSql += " fm.userid, ub.varname as usercode, ub.displayname as username,";
		strSql += " fm.startuserid, sub.varname as startusercode, sub.displayname as startusername,";
		strSql += " fm.startdate, fm.busidate,";
		strSql += " fm.amount, fm.finamount,";
		strSql += " case when pi.status = 1 then '运行中' when pi.status = 4 then '已结束' when pi.status = 5 then '终止' end pistatus";
		strSql += " from tssc_smcsfm_main fm";
		strSql += " 	inner join twf_processinst pi on pi.processinstid = fm.processinstid";
		strSql += " 	left join tssc_formtype ft on ft.formtypecode = fm.formtypecode";
		strSql += " 	left join tssc_busiclass bc on bc.busiclasscode = fm.busiclasscode";
		strSql += " 	left join tsys_companybase unit on unit.uqattrid = fm.unitid";
		strSql += " 	left join tsys_departmentbase dept on dept.uqattrid = fm.deptid";
		strSql += " 	left join tsys_userbase ub on ub.id = fm.userid";
		strSql += " 	left join tsys_userbase sub on sub.id = fm.startuserid";

/*		strSql += " where fm.formtypecode like 'BT01%'";*/
		strSql += " where 1 = 1";
		strSql += " 	and";
		strSql += " 	(";
		strSql += " 		exists (select 1 from twf_activityinst ai";
		strSql += " 				inner join tpcm_checkhistory ch on ch.processinstid = ai.processinstid and ch.activityid = ai.activityid";
		strSql += " 			where ai.processinstid = pi.processinstid";
		strSql += " 				and not exists (select 1 from twf_activityproperty ap";
		strSql += "         			inner join twf_activityproperty_value apv on apv.propertyid = ap.propertyid";
		strSql += "         			where apv.activityid = ai.activityid and ap.propertyname = 'BUSITYPE'";
		strSql += "             		and apv.propertyvalue = 'START')";
		strSql += " 				and ch.checkuserid = ?)";
		strSql += " 		or (pi.startuserid = ? and pi.status != 1)";
		strSql += " 	)";

		params.add(cdtMap.getString("userid"));
		params.add(cdtMap.getString("userid"));
		
		if (cdtMap.containsCondition("deptid"))
		{
			strSql += " and fm.deptid = ?";
			params.add(cdtMap.getString("deptid"));
		}

		if (cdtMap.containsCondition("formtypecode"))
		{
			strSql += " and fm.formtypecode = ?";
			params.add(cdtMap.getString("formtypecode"));
		}

		if (cdtMap.containsCondition("startusername"))
		{
			strSql += " and sub.displayname like ?";
			params.add("%" + cdtMap.getString("startusername") + "%");
		}

		if (cdtMap.containsCondition("serialno"))
		{
			strSql += " and fm.serialno like ?";
			params.add("%" + cdtMap.getString("serialno") + "%");
		}

		if (cdtMap.containsCondition("abstract"))
		{
			strSql += " and fm.abstract like ?";
			params.add("%" + cdtMap.getString("abstract") + "%");
		}

		if (cdtMap.containsCondition("startdate_begin"))
		{
			strSql += " and to_char(pi.startdate, 'YYYY-MM-DD') >= ?";
			params.add(cdtMap.getString("startdate_begin"));
		}

		if (cdtMap.containsCondition("startdate_end"))
		{
			strSql += " and to_char(pi.startdate, 'YYYY-MM-DD') <= ?";
			params.add(cdtMap.getString("startdate_end"));
		}

		if (cdtMap.containsCondition("amount_begin"))
		{
			strSql += " and fm.amount >= ?";
			params.add(String.valueOf(cdtMap.getDouble("amount_begin")));
		}

		if (cdtMap.containsCondition("amount_end"))
		{
			strSql += " and fm.amount <= ?";
			params.add(String.valueOf(cdtMap.getDouble("amount_end")));
		}

		if (cdtMap.containsCondition("pistatus"))
		{
			strSql += " and pi.status = ?";
			params.add(cdtMap.getString("pistatus"));
		}

		strSql += " order by pi.startdate desc";

		return strSql;
	}
}