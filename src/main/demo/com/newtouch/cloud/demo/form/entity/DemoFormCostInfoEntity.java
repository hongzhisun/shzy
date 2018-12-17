package com.newtouch.cloud.demo.form.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.newtouch.workflow.entitydata.annotation.WfColumn;
import com.newtouch.workflow.entitydata.annotation.WfColumnTypeEnum;
import com.newtouch.workflow.entitydata.annotation.WfEntity;
import com.newtouch.workflow.entitydata.annotation.WfEntityTypeEnum;

/**
 * 成本费用报账单-业务明细子实体
 */
@Entity(name="demo_form_costinfo")
@Table(name="tdemo_form_costinfo")
@WfEntity(type=WfEntityTypeEnum.DetailEntity, desc="成本费用报账单业务明细子实体(demo)")
public class DemoFormCostInfoEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.DetailID)
	private String detailid;
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	private String mainID;
	@WfColumn(type=WfColumnTypeEnum.Status)
	private Integer status;
	private Integer seq;

	private String provinceId;
	private String memo;
	private double amount;

	public String getDetailid()
	{
		return detailid;
	}
	public void setDetailid(String detailid)
	{
		this.detailid = detailid;
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
	public Integer getSeq()
	{
		return seq;
	}
	public void setSeq(Integer seq)
	{
		this.seq = seq;
	}
	public String getProvinceId()
	{
		return provinceId;
	}
	public void setProvinceId(String provinceId)
	{
		this.provinceId = provinceId;
	}
	public String getMemo()
	{
		return memo;
	}
	public void setMemo(String memo)
	{
		this.memo = memo;
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