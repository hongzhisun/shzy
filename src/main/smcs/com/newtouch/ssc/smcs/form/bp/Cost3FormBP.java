package com.newtouch.ssc.smcs.form.bp;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.xml.rpc.holders.StringHolder;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.EntityUtil;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.dao.Cost3FormDAO;
import com.newtouch.workflow.entitydata.IFormEntityDataAdapter;

@Service
@Transactional
public class Cost3FormBP implements IFormEntityDataAdapter
{
	@Autowired
	private Cost3FormDAO dao = null;

	/**
	 * 保存表单数据
	 * @param conn			数据库连接，工作流引擎使用。
	 * @param wdMap			流程属性Map
	 * @param pipMap		流程变量Map
	 * @param processInstID	流程实例ID
	 * @param entityDataID	表单实体数据ID
	 * @param formDataJson	表单数据json
	 * @param errorDesc		错误信息
	 * @return				执行成功标志
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public boolean save(Connection conn, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			String processInstID, String entityDataID, String formDataJson, StringHolder errorDesc) throws Exception
	{
		System.out.println("processInstID=" + processInstID);
		System.out.println("entityDataID=" + entityDataID);
		System.out.println("formDataJson=" + formDataJson);

		JSONObject jsonObject = JSONObject.fromObject(formDataJson);
		JSONObject jsonEntitys = jsonObject.getJSONObject("entitys");

		EntityMap entityMap = EntityUtil.MapFromJSONObj(jsonEntitys);
		entityMap.put("processInstID", processInstID);

		this.dao.queryProcessInstCount(conn, processInstID);

		this.dao.queryProcessInstCount(processInstID);

		this.dao.save(entityMap);

		for (Map.Entry entry : pipMap.entrySet())
		{
			System.out.println("流程变量, key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
		}

		for (Map.Entry entry : wdMap.entrySet())
		{
			System.out.println("流程属性, key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
		}

		return true;
	}

	/**
	 * 保存草稿数据
	 * @param conn			数据库连接，工作流引擎使用。
	 * @param entityDataID	表单实体数据ID
	 * @param formDataJson	表单数据json
	 * @param errorDesc		错误信息
	 * @return				执行成功标志
	 * @throws Exception	抛出异常表明失败
	 */
	@Override
	public boolean saveDraft(Connection conn, String entityDataID, String formDataJson, StringHolder errorDesc) throws Exception
	{
		System.out.println("entityDataID=" + entityDataID);
		System.out.println("formDataJson=" + formDataJson);

		JSONArray jsonArray = JSONArray.fromObject(formDataJson);
		JSONObject jsonEntitys = jsonArray.getJSONObject(1).getJSONObject("entitys");

		EntityMap entityMap = EntityUtil.MapFromJSONObj(jsonEntitys);

		this.dao.save(entityMap);

		return true;
	}
}