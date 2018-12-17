package com.newtouch.cloud.demo.wfapp;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.newtouch.cloud.common.dao.CommonJDBCDAO;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.workflow.ssc.util.ProcessInstParamUtil;

/**
 * Demo表单提交入口
 * 包含提交调用接口、回退调用接口、终止调用接口
 */
public class DemoFormCostWFApplication
{
	Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * Demo表单-审批完成接口
	 * 可配置在流程的自动任务环节上
	 */
	public void FormSubmitCall(String UserID, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String formdataXml) throws Exception
	{
		this.FormSubmitCall(UserID, wdMap, pipMap, conn, formdataXml, "", "");		
	}

	/**
	 * Demo表单-提交调用接口
	 * 配置在流程环节的【提交调用】一栏中
	 */
	public void FormSubmitCall(String UserID, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String formdataXml, String blobXml, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程提交开始");
			for (Map.Entry entry : wdMap.entrySet())
			{
				System.out.println("wdMap.key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
			}

			for (Map.Entry entry : pipMap.entrySet())
			{
				System.out.println("pipMap.key=" + entry.getKey().toString() + ", value=" + entry.getValue().toString());
			}

			String processInstID = ProcessInstParamUtil.get_ProcessInstID(pipMap);
			CommonJDBCDAO dao = new CommonJDBCDAO(conn);

			String strSql = "select pi.* from twf_processinst pi where pi.processinstid = ?";
			List<EntityMap> list = dao.getMapList(strSql, new String[] { processInstID });
			for (EntityMap row : list)
			{
				System.out.println("twf_processinst.row=" + row.toJsonString());
			}

			strSql = "select ai.* from twf_activityinst ai where ai.processinstid = ? order by ai.createdate";
			list = dao.getMapList(strSql, new String[] { processInstID });
			for (EntityMap row : list)
			{
				System.out.println("twf_activityinst.row=" + row.toJsonString());
			}

			strSql  = " select wi.* from twf_workitem wi";
			strSql += " inner join twf_activityinst ai on ai.activityinstid = wi.activityinstid";
			strSql += " where ai.processinstid = ?";
			strSql += " order by wi.createdate";
			list = dao.getMapList(strSql, new String[] { processInstID });
			for (EntityMap row : list)
			{
				System.out.println("twf_workitem.row=" + row.toJsonString());
			}
					
/*			com.newtouch.cloud.wfapp*/
//			/* 更新表单状态 */
//			this.logger.debug("更新表单状态...");
//			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
//			daoFormStatus.submit_FormStatus(pipMap);
//
//			/* 预算控制 */
//			this.logger.debug("预算控制...");
//			BudgetCtrlDAO daoBudgetCtrl = new BudgetCtrlDAO(conn);
//			daoBudgetCtrl.controlBudget(pipMap);
//
//			/* 其他业务处理 */
//			this.logger.debug("其他业务处理...");
			/**
			 * to-do
			 */

			this.logger.debug("流程提交正常结束");
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.logger.error("流程提交发生异常, " + ex.getMessage());
			throw ex;
		}
	}

	/**
	 * Demo表单-回退调用接口
	 * 配置在流程环节的【回退调用】一栏中
	 */
	public void FormRollbackCall(String NullStr, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程退回开始");

//			/* 更新表单状态  */
//			this.logger.debug("更新表单状态...");
//			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
//			daoFormStatus.rollback_FormStatus(pipMap);
//
//			/* 预算控制 */
//			this.logger.debug("预算控制...");
//			BudgetCtrlDAO daoBudgetCtrl=new BudgetCtrlDAO(conn);
//			daoBudgetCtrl.controlBudget(pipMap);

			this.logger.debug("流程退回正常结束");
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.logger.error("流程退回发生异常, " + ex.getMessage());
			throw ex;
		}
	}

	/**
	 * Demo表单-终止调用接口
	 * 配置在流程的【终止调用】一栏中
	 */
	public void FormTerminalCall(String NullStr, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程终止开始");

//			/* 更新表单状态  */
//			this.logger.debug("更新表单状态...");
//			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
//			daoFormStatus.terminal_FormStatus(pipMap);
//
//			/* 预算控制 */
//			this.logger.debug("预算控制...");
//			BudgetCtrlDAO daoBudgetCtrl=new BudgetCtrlDAO(conn);
//			daoBudgetCtrl.controlBudget(pipMap);

			this.logger.debug("流程终止正常结束");
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.logger.error("流程终止发生异常, " + ex.getMessage());
			throw ex;
		}
	}
}