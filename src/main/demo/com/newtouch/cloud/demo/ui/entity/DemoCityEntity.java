package com.newtouch.cloud.demo.ui.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="tdemo_city")
public class DemoCityEntity
{
	@Id
	private String id;
	private String code;
	private String name;
	private String provinceID;
	/**
	 * 返回web时，spring调用Jackson把对象序列化为json，对java.util.Date类型数据设置转化格式和时区
	 */
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT+8")
	/**
	 * 如java.util.Date字段为null，避免序列化，json中会缺少该字段。否则序列化后字段值为null。
	 */
	@JsonInclude(Include.NON_NULL)
	private Date createDate;

	public String getId()
	{
		return id;
	}
	public void setId(String id)
	{
		this.id = id;
	}
	public String getCode()
	{
		return code;
	}
	public void setCode(String code)
	{
		this.code = code;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public String getProvinceID()
	{
		return provinceID;
	}
	public void setProvinceID(String provinceID)
	{
		this.provinceID = provinceID;
	}
	public Date getCreateDate()
	{
		return createDate;
	}
	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}
}