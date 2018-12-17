package com.newtouch.cloud.wfapp.wokitem.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.IDConditionUtil;
import com.newtouch.cloud.common.StringUtil;
import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;

@Repository
public class ApplyDAO extends CommonDAO
{
	private String getProcessSQL(ConditionMap cdtMap, String strBulkID)
	{
		String strUserID = cdtMap.getString("userid");

		IDConditionUtil idUtil = new IDConditionUtil(this);
		idUtil.split_IDList(strBulkID, "user", strUserID);

		String strSql = "select bc.busiclasscode, bc.busiclassname,";
		strSql += "     p.processid, p.processname";
		strSql += " from twf_process p";
		strSql += "     inner join twf_activity a on a.processid = p.processid";
		strSql += "     inner join tssc_busiclass bc on bc.wfformid = a.businessform";
		strSql += " where bc.status = 1";
		strSql += " 	and (bc.busiclasscode like 'BC01%')";
		strSql += "     and p.enddate >= sysdate";
		strSql += "     and a.activityid in";
		strSql += "     (";
		strSql += "         select a.activityid from twf_activity a";
		strSql += "             inner join twf_activityproperty_value apv on apv.activityid = a.activityid";
		strSql += "             inner join twf_activityproperty ap on ap.propertyid = apv.propertyid and ap.propertyname = 'BUSITYPE'";
		strSql += "         where a.activitytype = 1 and apv.propertyvalue = 'START'";
		strSql += "     )";
		strSql += "     and p.processid in";
		strSql += "     (";
		strSql += "         select ppm.procesid";
		strSql += "         from tsys_companybase unit";
		strSql += "             inner join tsys_userbase ub on ub.uqcompanyid = unit.uqattrid";
		strSql += "             inner join twf_processpermission ppm on ppm.objectid = unit.uqattrid";
		strSql += "         where exists (select 1 from tssc_$idlist userlist where userlist.bulkid = ? and userlist.idtype = 'user' and userlist.dataid = ub.id)";
		strSql += "         union";
		strSql += "         select ppm.procesid";
		strSql += "         from tsys_departmentbase dept";
		strSql += "             inner join tsys_userbase ub on ub.uqdeptid = dept.uqattrid";
		strSql += "             inner join twf_processpermission ppm on ppm.objectid = dept.uqattrid";
		strSql += "         where exists (select 1 from tssc_$idlist userlist where userlist.bulkid = ? and userlist.idtype = 'user' and userlist.dataid = ub.id)";
		strSql += "         union";
		strSql += "         select ppm.procesid";
		strSql += "         from tsys_post tpo";
		strSql += "             inner join tsys_user_post up on up.uqpostid = tpo.uqpostid";
		strSql += "             inner join tsys_userbase ub on ub.id = up.uquserid";
		strSql += "             inner join twf_processpermission ppm on ppm.objectid = tpo.uqpostid";
		strSql += "         where exists (select 1 from tssc_$idlist userlist where userlist.bulkid = ? and userlist.idtype = 'user' and userlist.dataid = ub.id)";
		strSql += "         union";
		strSql += "         select ppm.procesid";
		strSql += "         from tsys_team tt";
		strSql += "             inner join tsys_user_team tut on tut.uqteamid = tt.uqteamid";
		strSql += "             inner join tsys_userbase ub on ub.id = tut.uquserid";
		strSql += "             inner join twf_processpermission ppm on ppm.objectid = tt.uqteamid";
		strSql += "         where exists (select 1 from tssc_$idlist userlist where userlist.bulkid = ? and userlist.idtype = 'user' and userlist.dataid = ub.id)";
		strSql += "         union";
		strSql += "         select ppm.procesid";
		strSql += "         from tsys_userbase ub";
		strSql += "             inner join twf_processpermission ppm on ppm.objectid = ub.id";
		strSql += "         where exists (select 1 from tssc_$idlist userlist where userlist.bulkid = ? and userlist.idtype = 'user' and userlist.dataid = ub.id)";
		strSql += "     )";
		strSql += " order by bc.busiclasscode, p.processname";

		return strSql;
	}

	public List<EntityMap> getBusiClass(ConditionMap cdtMap)
	{
		String strBulkID = StringUtil.getGUID();

		String strSql = " select distinct p.busiclasscode, p.busiclassname";
		strSql += " from (" + this.getProcessSQL(cdtMap, strBulkID) + ") p";
		strSql += " order by p.busiclasscode";

		super._MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new String[] { strBulkID, strBulkID, strBulkID, strBulkID, strBulkID });
	}

	public List<EntityMap> getProcess(ConditionMap cdtMap)
	{
		String strBulkID = StringUtil.getGUID();

		String strSql = this.getProcessSQL(cdtMap, strBulkID);
		
		super._MapFieldCastLowerCase = true;
		return super.getMapList(strSql, new String[] { strBulkID, strBulkID, strBulkID, strBulkID, strBulkID });
	}
}