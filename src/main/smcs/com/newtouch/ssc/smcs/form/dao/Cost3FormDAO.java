package com.newtouch.ssc.smcs.form.dao;

import java.sql.Connection;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.newtouch.cloud.common.dao.CommonDAO;
import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;

@Repository
public class Cost3FormDAO extends CommonDAO
{
	public void queryProcessInstCount(Connection conn, String processInstID)
	{
		CommonJDBCDAO dao = new CommonJDBCDAO(conn);

		String sql = "select * from twf_processinst pi where pi.processinstid = ?";
		List<EntityMap> list = dao.getMapList(sql, new String[] { processInstID });

		System.out.println("jdbc查询行数=" + String.valueOf(list.size()));
	}

	public void queryProcessInstCount(String processInstID)
	{
		String sql = "select * from twf_processinst pi where pi.processinstid = ?";
		List<EntityMap> list = this.getMapList(sql, new String[] { processInstID });

		System.out.println("jpa查询行数=" + String.valueOf(list.size()));
	}

	public void save(EntityMap entityMap)
	{
		String strSql = " insert into tssc_smcsfm_main (id, processinstid, abstract)";
		strSql += " values (?, ?, ?)";

		int fetchCount = this.execute(strSql, new String[] { entityMap.getString("entitydataid"),
				entityMap.getString("processinstid"),
				entityMap.getString("memo") });

		System.out.println("影响行数=" + String.valueOf(fetchCount));
	}
}