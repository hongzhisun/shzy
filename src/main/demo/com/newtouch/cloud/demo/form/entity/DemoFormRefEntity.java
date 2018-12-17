package com.newtouch.cloud.demo.form.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.newtouch.workflow.entitydata.annotation.WfColumn;
import com.newtouch.workflow.entitydata.annotation.WfColumnTypeEnum;
import com.newtouch.workflow.entitydata.annotation.WfEntity;
import com.newtouch.workflow.entitydata.annotation.WfEntityTypeEnum;

/**
 * 关联表实体
 */
@Entity(name="demo_formref")
@Table(name="tssc_smcsfm_main")
@WfEntity(type=WfEntityTypeEnum.MainEntity, desc="关联表实体")
public class DemoFormRefEntity implements Serializable
{
	private static final long serialVersionUID = 8284746275614098534L;

	@Id
	@WfColumn(type=WfColumnTypeEnum.EntityDataID)
	protected String id;

	@Id
	@WfColumn(type=WfColumnTypeEnum.ProcessInstID)
	protected String processInstID;
}