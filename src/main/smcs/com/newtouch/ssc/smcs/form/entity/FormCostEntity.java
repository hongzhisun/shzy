package com.newtouch.ssc.smcs.form.entity;

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
@Entity(name="smcsfm_cost")
@Table(name="tssc_smcsfm_cost")
@WfEntity(type=WfEntityTypeEnum.DetailEntity, desc="成本费用报账单扩展主实体")
public class FormCostEntity
{
	@Id
	@WfColumn(type=WfColumnTypeEnum.DetailID)
	private String detailid;
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	private String mainID;
	@WfColumn(type=WfColumnTypeEnum.Status)
	private Integer status;

	/* 结算方式 */
	private String settleType;
	/* 支付对象类型 */
	private String payObjectType;
	/* 支付对象ID（员工） */
	private String payUserID;
	/* 支付对象编码（员工） */
	private String payUserCode;
	/* 支付对象名称（员工） */
	private String payUserName;
	/* 是否关联交易 */
	private Integer isRelation;
	/* 支付对象ID(供应商) */
	private String supplierID;
	/* 支付对象编码(供应商) */
	private String supplierCode;
	/* 支付对象名称(供应商) */
	private String supplierName;
	/* 支付类型 */
	private String payType;
	/* 经济事项大类ID */
	private String econItemTypeID;
	/* 款项已付 */
	private Integer isPay;
	/* 支票类型 */
	private String invoiceType;
	/* 备注 */
	private String remark;
	/* 支付对象ID(客户) */
	private String customerID;
	/* 支付对象编码(客户) */
	private String customerCode;
	/* 支付对象名称(客户) */
	private String customerName;

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
	public String getSettleType()
	{
		return settleType;
	}
	public void setSettleType(String settleType)
	{
		this.settleType = settleType;
	}
	public String getPayObjectType()
	{
		return payObjectType;
	}
	public void setPayObjectType(String payObjectType)
	{
		this.payObjectType = payObjectType;
	}
	public String getPayUserID()
	{
		return payUserID;
	}
	public void setPayUserID(String payUserID)
	{
		this.payUserID = payUserID;
	}
	public String getPayUserCode()
	{
		return payUserCode;
	}
	public void setPayUserCode(String payUserCode)
	{
		this.payUserCode = payUserCode;
	}
	public String getPayUserName()
	{
		return payUserName;
	}
	public void setPayUserName(String payUserName)
	{
		this.payUserName = payUserName;
	}
	public Integer getIsRelation()
	{
		return isRelation;
	}
	public void setIsRelation(Integer isRelation)
	{
		this.isRelation = isRelation;
	}
	public String getSupplierID()
	{
		return supplierID;
	}
	public void setSupplierID(String supplierID)
	{
		this.supplierID = supplierID;
	}
	public String getSupplierCode()
	{
		return supplierCode;
	}
	public void setSupplierCode(String supplierCode)
	{
		this.supplierCode = supplierCode;
	}
	public String getSupplierName()
	{
		return supplierName;
	}
	public void setSupplierName(String supplierName)
	{
		this.supplierName = supplierName;
	}
	public String getPayType()
	{
		return payType;
	}
	public void setPayType(String payType)
	{
		this.payType = payType;
	}
	public String getEconItemTypeID()
	{
		return econItemTypeID;
	}
	public void setEconItemTypeID(String econItemTypeID)
	{
		this.econItemTypeID = econItemTypeID;
	}
	public Integer getIsPay()
	{
		return isPay;
	}
	public void setIsPay(Integer isPay)
	{
		this.isPay = isPay;
	}
	public String getInvoiceType()
	{
		return invoiceType;
	}
	public void setInvoiceType(String invoiceType)
	{
		this.invoiceType = invoiceType;
	}
	public String getRemark()
	{
		return remark;
	}
	public void setRemark(String remark)
	{
		this.remark = remark;
	}
	public String getCustomerID()
	{
		return customerID;
	}
	public void setCustomerID(String customerID)
	{
		this.customerID = customerID;
	}
	public String getCustomerCode()
	{
		return customerCode;
	}
	public void setCustomerCode(String customerCode)
	{
		this.customerCode = customerCode;
	}
	public String getCustomerName()
	{
		return customerName;
	}
	public void setCustomerName(String customerName)
	{
		this.customerName = customerName;
	}
}