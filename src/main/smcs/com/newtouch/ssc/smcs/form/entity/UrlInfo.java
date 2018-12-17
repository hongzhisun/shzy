package com.newtouch.ssc.smcs.form.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="SMCS_URLINFO")
public class UrlInfo
{
	@Id
	private String entityDataID;
	private String formTypeCode;
	private String formTypeName;
	private String busiClassCode;
	private String busiClassName;
	private int formStatus;

	public String getEntityDataID()
	{
		return entityDataID;
	}
	public void setEntityDataID(String entityDataID)
	{
		this.entityDataID = entityDataID;
	}
	public String getFormTypeCode()
	{
		return formTypeCode;
	}
	public void setFormTypeCode(String formTypeCode)
	{
		this.formTypeCode = formTypeCode;
	}
	public String getFormTypeName()
	{
		return formTypeName;
	}
	public void setFormTypeName(String formTypeName)
	{
		this.formTypeName = formTypeName;
	}
	public String getBusiClassCode()
	{
		return busiClassCode;
	}
	public void setBusiClassCode(String busiClassCode)
	{
		this.busiClassCode = busiClassCode;
	}
	public String getBusiClassName()
	{
		return busiClassName;
	}
	public void setBusiClassName(String busiClassName)
	{
		this.busiClassName = busiClassName;
	}
	public int getFormStatus()
	{
		return formStatus;
	}
	public void setFormStatus(int formStatus)
	{
		this.formStatus = formStatus;
	}
}