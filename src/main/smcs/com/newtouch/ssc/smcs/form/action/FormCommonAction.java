package com.newtouch.ssc.smcs.form.action;

import java.util.ArrayList;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import Freesky.M8Base.Workflow.DataAccess.WfCreateUID;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/ssc/smcs/formcommon")
public class FormCommonAction
{
/*	private IFormCommonBP bp = null;
	public IFormCommonBP getBp()
	{
		return bp;
	}
	public void setBp(IFormCommonBP bp)
	{
		this.bp = bp;
	}*/

	/**
	 * 读取全局配置缓存
	 * @return
	 */
/*	public String getSrvGlobalVariant()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());

			EntityMap map = this.bp.getSrvGlobalVariant(cdtMap);
			map.put("accfactor_count", GlobalParamUtil_SHCS.get_AccFactor_Count());
			map.put("expattr_count", GlobalParamUtil_SHCS.get_ExpAttr_Count());

			this.jsonString = ActionJSONUtil.toSingleResult(map);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}
		return SUCCESS;
	}*/

	/**
	 * 读取新ID
	 * @jsonConditon
	 * 	{
	 * 		maxcount : 20
	 * 	}
	 * @return
	 * 	{
	 * 		data : ["", "", "", ...]
	 * 	}
	 */
	@RequestMapping("/getnewid")
	@ResponseBody
	public ActionResult getNewID(@RequestParam(required=false) String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			ArrayList<String> listNewID = new ArrayList<String>();
			int intCount = cdtMap.getInteger("maxcount");
			for (int i = 0; i < intCount; i++)
			{
				listNewID.add(WfCreateUID.getUID());
			}
			return ActionResultUtil.toData(listNewID);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 查询部门(树)
	 * 支持跨部门报账权限
	 * @param
	 * 	root
	 * 	jsonCondition:
	 * 		unitid		所属公司ID，支持多个，格式：id1, id2, id3
	 * 		textfield	显示字段，格式"[,deptCode,],deptName"
	 * @return
	 * 		{ data : [{...}, {...}] }
	 */
/*	public String getDeptTree()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());
			List<DeptEntity> list = this.bp.getDeptTree(this.node, cdtMap);

			List<TreeNodeData> treeData = null;
			if (cdtMap.containsCondition("textfield"))
			{
				String textField = cdtMap.getString("textfield");
				treeData = EntityUtil.TreeDataListFromEntityList(list, DeptEntity.class,
						"deptID", textField, "isLeaf");
			}
			else
			{
				treeData = EntityUtil.TreeDataListFromEntityList(list, DeptEntity.class,
						"deptID", "[,deptCode,],deptName", "isLeaf");
			}

			this.jsonString = ActionJSONUtil.toTreeData(treeData);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}

		return SUCCESS;
	}*/

	/**
	 * 读取基本户
	 * @param cdtMap
	 * @jsonConditon
	 * 	{
	 * 		unitid : "",
	 * 		year : 2013,
	 * 		type : 1
	 * 	}
	 * @return
	 * 	{
	 * 		success : true,
	 * 		data : 
	 * 		{
	 * 			bankaccount : {},
	 * 			account_ba : {}
	 * 		}
	 * 	}
	 */
/*	public String getBaseBankAccount()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());
			cdtMap.putIgnoreCase("use", 1);
	
			this.setJsonCondition(cdtMap.toJsonString());
			
			return this.getBankAccount();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}
		return SUCCESS;
	}*/
		
	/**
	 * 读取账户
	 * @param cdtMap
	 * @jsonConditon
	 * 	{
	 * 		unitid : "",
	 * 		year : 2013,
	 * 		type : 1
	 * 		use : 1
	 * 	}
	 * @return
	 * 	{
	 * 		success : true,
	 * 		data : 
	 * 		{
	 * 			bankaccount : {},
	 * 			ba_account : {}
	 * 		}
	 * 	}
	 */
/*	public String getBankAccount()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());
			EntityMap map = this.bp.getBankAccount(cdtMap);

			EntityMapJSONUtils.combineFields_Object(map, "bankaccount", "bankaccountid, bankaccountid," +
					" bankaccountcode, bankaccountcode," +
					" bankaccountname, bankaccountname," +
					" bankname, bankname," +
					" subbankname, subbankname," +
					" accountname, accountname," +
					" accountnumber, accountnumber," +
					" ba_accountid, ba_accountid," +
					" ba_accountcode, ba_accountcode," +
					" ba_accountname, ba_accountname," +
					" ba_accountfullname, ba_accountfullname," +
					" ba_accounttext, ba_accounttext,");
			EntityMapJSONUtils.combineFields_Object(map, "ba_account", "accountid, ba_accountid," +
					" accountcode, ba_accountcode," +
					" accountname, ba_accountname," +
					" fullname, ba_accountfullname," +
					" accounttext, ba_accounttext");

			this.jsonString = ActionJSONUtil.toSingleResult(map);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}
		return SUCCESS;
	}*/

	/**
	 * 计算分摊月数和金额
	 * @jsonConditon
	 * 	{
	 * 		amount : 0,
	 * 		finamount : 0,
	 * 		begindate : "2013-01-1",
	 * 		enddate : "2013-12-31"
	 *	}
	 * @return
	 * 	{
	 * 		success : true,
	 * 		monthcount : "value1",
	 * 		amountmonth : "value2",
	 * 		amountthismonth : 
	 * 	}
	 */
/*	public String caculateAmortize()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());
			EntityMap map = this.bp.caculateAmortize(cdtMap);
			this.jsonString = ActionJSONUtil.toMapResult(map);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}
		return SUCCESS;
	}*/
	
	/**
	 * 计算累摊月数和金额
	 * @jsonConditon
	 * 	{
	 * 		amount : 0,
	 * 		finamount : 0,
	 * 		begindate : "2013-01-1",
	 * 		enddate : "2013-12-31"
	 *	}
	 * @return
	 * 	{
	 * 		success : true,
	 * 		monthcount : "value1",
	 * 		amountmonth : "value2",
	 * 		amountthismonth : 
	 * 	}
	 */
/*	public String caculateAssetAmortize()
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());
			EntityMap map = this.bp.caculateAssetAmortize(cdtMap);
			this.jsonString = ActionJSONUtil.toMapResult(map);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			this.jsonString = ActionJSONUtil.toException(ex);
		}
		return SUCCESS;
	}*/
}