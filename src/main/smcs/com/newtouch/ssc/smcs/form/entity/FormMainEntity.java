package com.newtouch.ssc.smcs.form.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.newtouch.workflow.entitydata.annotation.WfColumn;
import com.newtouch.workflow.entitydata.annotation.WfColumnTypeEnum;
import com.newtouch.workflow.entitydata.annotation.WfEntity;
import com.newtouch.workflow.entitydata.annotation.WfEntityTypeEnum;

/**
 * 主实体
 */
@Entity(name="smcsfm_main")
@Table(name="tssc_smcsfm_main")
@WfEntity(type=WfEntityTypeEnum.MainEntity, desc="报账单主实体")
public class FormMainEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	protected String id;
	@WfColumn(type=WfColumnTypeEnum.Status)
	protected Integer status;
	protected String processID;
	@WfColumn(type=WfColumnTypeEnum.ProcessInstID)
	protected String processInstID;
	protected String startUserID;
	protected String startDate;

	protected String formTypeCode;
	protected String busiClassCode;
	protected String serialNo;
	protected String unitID;
	protected String deptID;
	protected String userID;
	protected String busiDate;
	protected String busiPeriod;
	protected Integer busiYear;
	protected Integer busiMonth;
	protected Integer busiDay;
	protected String accountDate;
	protected String accountPeriod;
	protected Integer accountYear;
	protected Integer accountMonth;
	protected Integer accountDay;
	protected String budgetDate;
	protected String budgetPeriod;
	protected Integer budgetYear;
	protected Integer budgetMonth;
	protected Integer budgetDay;

	@Column(name="abstract")
	protected String formAbstract;
	protected Integer affixNum;
	protected Double amount;
	protected Double finAmount;
	protected Integer isEmergency;
	protected Integer isDept_Other;
	protected String deptID_Other;
	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
	public String getProcessID()
	{
		return processID;
	}
	public void setProcessID(String processID)
	{
		this.processID = processID;
	}
	public String getProcessInstID()
	{
		return processInstID;
	}
	public void setProcessInstID(String processInstID)
	{
		this.processInstID = processInstID;
	}
	public String getStartUserID()
	{
		return startUserID;
	}
	public void setStartUserID(String startUserID)
	{
		this.startUserID = startUserID;
	}
	public String getStartDate()
	{
		return startDate;
	}
	public void setStartDate(String startDate)
	{
		this.startDate = startDate;
	}
	public String getFormTypeCode()
	{
		return formTypeCode;
	}
	public void setFormTypeCode(String formTypeCode)
	{
		this.formTypeCode = formTypeCode;
	}
	public String getBusiClassCode()
	{
		return busiClassCode;
	}
	public void setBusiClassCode(String busiClassCode)
	{
		this.busiClassCode = busiClassCode;
	}
	public String getSerialNo()
	{
		return serialNo;
	}
	public void setSerialNo(String serialNo)
	{
		this.serialNo = serialNo;
	}
	public String getUnitID()
	{
		return unitID;
	}
	public void setUnitID(String unitID)
	{
		this.unitID = unitID;
	}
	public String getDeptID()
	{
		return deptID;
	}
	public void setDeptID(String deptID)
	{
		this.deptID = deptID;
	}
	public String getUserID()
	{
		return userID;
	}
	public void setUserID(String userID)
	{
		this.userID = userID;
	}
	public String getBusiDate()
	{
		return busiDate;
	}
	public void setBusiDate(String busiDate)
	{
		this.busiDate = busiDate;
	}
	public String getBusiPeriod()
	{
		return busiPeriod;
	}
	public void setBusiPeriod(String busiPeriod)
	{
		this.busiPeriod = busiPeriod;
	}
	public Integer getBusiYear()
	{
		return busiYear;
	}
	public void setBusiYear(Integer busiYear)
	{
		this.busiYear = busiYear;
	}
	public Integer getBusiMonth()
	{
		return busiMonth;
	}
	public void setBusiMonth(Integer busiMonth)
	{
		this.busiMonth = busiMonth;
	}
	public Integer getBusiDay()
	{
		return busiDay;
	}
	public void setBusiDay(Integer busiDay)
	{
		this.busiDay = busiDay;
	}
	public String getAccountDate()
	{
		return accountDate;
	}
	public void setAccountDate(String accountDate)
	{
		this.accountDate = accountDate;
	}
	public String getAccountPeriod()
	{
		return accountPeriod;
	}
	public void setAccountPeriod(String accountPeriod)
	{
		this.accountPeriod = accountPeriod;
	}
	public Integer getAccountYear()
	{
		return accountYear;
	}
	public void setAccountYear(Integer accountYear)
	{
		this.accountYear = accountYear;
	}
	public Integer getAccountMonth()
	{
		return accountMonth;
	}
	public void setAccountMonth(Integer accountMonth)
	{
		this.accountMonth = accountMonth;
	}
	public Integer getAccountDay()
	{
		return accountDay;
	}
	public void setAccountDay(Integer accountDay)
	{
		this.accountDay = accountDay;
	}
	public String getBudgetDate()
	{
		return budgetDate;
	}
	public void setBudgetDate(String budgetDate)
	{
		this.budgetDate = budgetDate;
	}
	public String getBudgetPeriod()
	{
		return budgetPeriod;
	}
	public void setBudgetPeriod(String budgetPeriod)
	{
		this.budgetPeriod = budgetPeriod;
	}
	public Integer getBudgetYear()
	{
		return budgetYear;
	}
	public void setBudgetYear(Integer budgetYear)
	{
		this.budgetYear = budgetYear;
	}
	public Integer getBudgetMonth()
	{
		return budgetMonth;
	}
	public void setBudgetMonth(Integer budgetMonth)
	{
		this.budgetMonth = budgetMonth;
	}
	public Integer getBudgetDay()
	{
		return budgetDay;
	}
	public void setBudgetDay(Integer budgetDay)
	{
		this.budgetDay = budgetDay;
	}
	public String getFormAbstract()
	{
		return formAbstract;
	}
	public void setFormAbstract(String formAbstract)
	{
		this.formAbstract = formAbstract;
	}
	public Integer getAffixNum()
	{
		return affixNum;
	}
	public void setAffixNum(Integer affixNum)
	{
		this.affixNum = affixNum;
	}
	public Double getAmount()
	{
		return amount;
	}
	public void setAmount(Double amount)
	{
		this.amount = amount;
	}
	public Double getFinAmount()
	{
		return finAmount;
	}
	public void setFinAmount(Double finAmount)
	{
		this.finAmount = finAmount;
	}
	public Integer getIsEmergency()
	{
		return isEmergency;
	}
	public void setIsEmergency(Integer isEmergency)
	{
		this.isEmergency = isEmergency;
	}
	public Integer getIsDept_Other()
	{
		return isDept_Other;
	}
	public void setIsDept_Other(Integer isDept_Other)
	{
		this.isDept_Other = isDept_Other;
	}
	public String getDeptID_Other()
	{
		return deptID_Other;
	}
	public void setDeptID_Other(String deptID_Other)
	{
		this.deptID_Other = deptID_Other;
	}
}