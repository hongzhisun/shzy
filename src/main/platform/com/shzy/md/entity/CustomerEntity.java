package com.shzy.md.entity;

import com.newtouch.workflow.entitydata.annotation.WfColumn;
import com.newtouch.workflow.entitydata.annotation.WfColumnTypeEnum;
import com.newtouch.workflow.entitydata.annotation.WfEntity;
import com.newtouch.workflow.entitydata.annotation.WfEntityTypeEnum;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 成本费用报账单-扩展主实体
 */
@Entity(name="md_form_customer")
@Table(name="tbz_customers")
@WfEntity(type=WfEntityTypeEnum.DetailEntity, desc="客户信息表")
public class CustomerEntity
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

}