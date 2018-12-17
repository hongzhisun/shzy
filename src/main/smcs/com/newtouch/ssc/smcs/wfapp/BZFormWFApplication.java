package com.newtouch.ssc.smcs.wfapp;

import java.sql.Connection;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.newtouch.ssc.smcs.wfapp.dao.BudgetCtrlDAO;
import com.newtouch.ssc.smcs.wfapp.dao.FormStatusDAO;

/**
 * 费用报账单、合同报账单、核销单提交入口
 */
public class BZFormWFApplication //implements IWfApplication
{
	Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * SMCS-报账-通用审批完成
	 */
	public void FormSubmitCall(String UserID, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String formdataXml) throws Exception
	{
		this.FormSubmitCall(UserID, wdMap, pipMap, conn, formdataXml, "", "");
	}

	/**
	 * SMCS-报账-通用提交调用
	 */
	public void FormSubmitCall(String UserID, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String formdataXml, String blobXml, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程提交开始");

			/* 更新表单状态 */
			this.logger.debug("更新表单状态...");
			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
			daoFormStatus.submit_FormStatus(pipMap);

			/* 预算控制 */
			this.logger.debug("预算控制...");
			BudgetCtrlDAO daoBudgetCtrl = new BudgetCtrlDAO(conn);
			daoBudgetCtrl.controlBudget(pipMap);

			/* 其他业务处理 */
			this.logger.debug("其他业务处理...");
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
	 * SMCS-报账-通用回退调用
	 */
	public void FormRollbackCall(String NullStr, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程退回开始");

			/* 更新表单状态  */
			this.logger.debug("更新表单状态...");
			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
			daoFormStatus.rollback_FormStatus(pipMap);

			/* 预算控制 */
			this.logger.debug("预算控制...");
			BudgetCtrlDAO daoBudgetCtrl=new BudgetCtrlDAO(conn);
			daoBudgetCtrl.controlBudget(pipMap);

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
	 * SMCS-报账-通用终止调用
	 */
	public void FormTerminalCall(String NullStr, HashMap<?, ?> wdMap, HashMap<?, ?> pipMap,
			Connection conn, String addiXml) throws Exception
	{
		try
		{
			this.logger.debug("流程终止开始");

			/* 更新表单状态  */
			this.logger.debug("更新表单状态...");
			FormStatusDAO daoFormStatus = new FormStatusDAO(conn);
			daoFormStatus.terminal_FormStatus(pipMap);

			/* 预算控制 */
			this.logger.debug("预算控制...");
			BudgetCtrlDAO daoBudgetCtrl=new BudgetCtrlDAO(conn);
			daoBudgetCtrl.controlBudget(pipMap);

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