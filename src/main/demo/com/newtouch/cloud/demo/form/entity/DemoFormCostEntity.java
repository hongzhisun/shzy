package com.newtouch.cloud.demo.form.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.newtouch.workflow.entitydata.annotation.WfColumn;
import com.newtouch.workflow.entitydata.annotation.WfColumnTypeEnum;
import com.newtouch.workflow.entitydata.annotation.WfEntity;
import com.newtouch.workflow.entitydata.annotation.WfEntityTypeEnum;

/**
 * 成本费用报账单-扩展主实体
 */
@Entity(name="demo_form_cost")
@Table(name="tdemo_form_cost")
@WfEntity(type=WfEntityTypeEnum.DetailEntity, desc="成本费用报账单扩展主实体(demo)")
public class DemoFormCostEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.DetailID)
	private String detailID;
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	private String mainID;
	@WfColumn(type=WfColumnTypeEnum.Status)
	private Integer status;
	
	private String supplierId;
	private String remark;

	public String getDetailID()
	{
		return detailID;
	}
	public void setDetailID(String detailID)
	{
		this.detailID = detailID;
	}
	public String getMainID()
	{
		return mainID;
	}
	public void setMainID(String mainID)
	{
		this.mainID = mainID;
	}
	public Integer getStatus()
	{
		return status;
	}
	public void setStatus(Integer status)
	{
		this.status = status;
	}
	public String getSupplierId()
	{
		return supplierId;
	}
	public void setSupplierId(String supplierId)
	{
		this.supplierId = supplierId;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}
}