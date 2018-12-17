package com.newtouch.cloud.wfapp.wokitem.enttiy;

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
@Entity(name="form_main")
@Table(name="tpcm_form_main")
@WfEntity(type=WfEntityTypeEnum.MainEntity, desc="表单主实体")
public class FormMainEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	private String id;
	@WfColumn(type=WfColumnTypeEnum.Status)
	private Integer status;
	@WfColumn(type=WfColumnTypeEnum.ProcessID)
	private String processId;
	@WfColumn(type=WfColumnTypeEnum.ProcessInstID)
	private String processInstId;
	private String startUserId;
	private String startDate;

	private String serialNo;
	private String unitID;
	private String deptID;
	private String userID;

	@Column(name="abstract")
	private String formAbstract;
	private double amount;

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
	public String getProcessId()
	{
		return processId;
	}
	public void setProcessId(String processId)
	{
		this.processId = processId;
	}
	public String getProcessInstId()
	{
		return processInstId;
	}
	public void setProcessInstId(String processInstId)
	{
		this.processInstId = processInstId;
	}
	public String getStartUserId()
	{
		return startUserId;
	}
	public void setStartUserId(String startUserId)
	{
		this.startUserId = startUserId;
	}
	public String getStartDate()
	{
		return startDate;
	}
	public void setStartDate(String startDate)
	{
		this.startDate = startDate;
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
	public String getFormAbstract()
	{
		return formAbstract;
	}
	public void setFormAbstract(String formAbstract)
	{
		this.formAbstract = formAbstract;
	}
	public double getAmount()
	{
		return amount;
	}
	public void setAmount(double amount)
	{
		this.amount = amount;
	}
}