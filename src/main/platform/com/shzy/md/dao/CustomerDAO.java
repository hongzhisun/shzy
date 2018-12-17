package com.shzy.md.dao;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerDAO extends CommonDAO
{
	private String getSql(ConditionMap cdtMap, List<Object> params){
		String tablename = "";
		String strSql =
				"select w1.id,w1.accountname,w1.accountno,w1.bank,w1.`status`,w1.varaddress," +
				"	w1.varcode,w1.vardescription,w1.varname,w1.vartaxno,w1.vartel" +
				"	from tbz_customers w1";


		strSql += " order by w1.id,w1.varcode";

		return strSql;
	}
	public List<EntityMap> getMapList(ConditionMap cdtMap){

		List<Object> params = new ArrayList<Object>();

		String strSql = getSql(cdtMap, params);

		List<EntityMap> mapList = this.getMapList(strSql, params);

		return mapList;
	}

	public PageData<EntityMap> getMapPage(ConditionMap cdtMap, int start, int limit){

		List<Object> params = new ArrayList<Object>();

		String strSql = getSql(cdtMap, params);

		return this.getMapPage(strSql, params, start, limit);
	}

}
