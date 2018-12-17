package com.newtouch.ssc.smcs.form.entity;

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
@Entity(name="smcsfm_cost_info")
@Table(name="tssc_smcsfm_cost_info")
@WfEntity(type=WfEntityTypeEnum.DetailEntity, desc="成本费用报账单业务明细子实体")
public class FormCostInfoEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.DetailID)
	private String detailid;
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	private String mainID;
	@WfColumn(type=WfColumnTypeEnum.Status)
	private Integer status;
	private Integer seq;

	/* 经济事项ID */
	private String econItemID;
	/* 报账部门ID */
	private String deptID;
	/* 预算部门ID */
	private String indexDeptID;
	/* 报账总金额 */
	private Double amount;
	/* 税率(内容) */
	private Double taxRateText;
	/* 税率 */
	private String taxRate;
	/* 报账金额（不含税） */
	private Double amount_NoTax;
	/* 税额 */
	private Double amount_tax;
	/* 预算项目ID */
	private String indexID;
	/* 备注 */
	private String remark;

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
	public String getEconItemID()
	{
		return econItemID;
	}
	public void setEconItemID(String econItemID)
	{
		this.econItemID = econItemID;
	}
	public String getDeptID()
	{
		return deptID;
	}
	public void setDeptID(String deptID)
	{
		this.deptID = deptID;
	}
	public String getIndexDeptID()
	{
		return indexDeptID;
	}
	public void setIndexDeptID(String indexDeptID)
	{
		this.indexDeptID = indexDeptID;
	}
	public Double getAmount()
	{
		return amount;
	}
	public void setAmount(Double amount)
	{
		this.amount = amount;
	}
	public Double getTaxRateText()
	{
		return taxRateText;
	}
	public void setTaxRateText(Double taxRateText)
	{
		this.taxRateText = taxRateText;
	}
	public String getTaxRate()
	{
		return taxRate;
	}
	public void setTaxRate(String taxRate)
	{
		this.taxRate = taxRate;
	}
	public Double getAmount_NoTax()
	{
		return amount_NoTax;
	}
	public void setAmount_NoTax(Double amount_NoTax)
	{
		this.amount_NoTax = amount_NoTax;
	}
	public Double getAmount_tax()
	{
		return amount_tax;
	}
	public void setAmount_tax(Double amount_tax)
	{
		this.amount_tax = amount_tax;
	}
	public String getIndexID()
	{
		return indexID;
	}
	public void setIndexID(String indexID)
	{
		this.indexID = indexID;
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