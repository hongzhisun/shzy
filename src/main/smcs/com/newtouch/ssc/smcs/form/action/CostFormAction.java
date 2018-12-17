package com.newtouch.ssc.smcs.form.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.JstlView;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.EntityMapJSONUtils;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.ifx.ICostFormBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class CostFormAction extends OpenFormAction
{
	@Autowired
	private ICostFormBP bp = null;
	public ICostFormBP getBp()
	{
		return bp;
	}
	public void setBp(ICostFormBP bp)
	{
		this.bp = bp;
	}

	/**
	 * 打开业务单据入口</br>
	 * 包括新建单据、查看单据、查看草稿等情况</br>
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/SMCSSSC/ssc_smcs_CostFormAction!toUrl.action")
	public ModelAndView openForm(@RequestParam String operType,
			@RequestParam(required=false, defaultValue="") String formTypeCode,
			@RequestParam(required=false, defaultValue="") String busiClassCode,
			@RequestParam(required=false, defaultValue="") String entityDataID) throws Exception
	{
		ModelAndView modelAndView = new ModelAndView(new JstlView("/cloud/smcs/form/cost/cost.jsp"));

		return super.openForm(modelAndView, operType, formTypeCode, busiClassCode, entityDataID);
	}
		
	/**
	 * 读取支出报账单扩展表头信息
	 * @return
	 */
	@RequestMapping("/SSC/ssc_smcs_CostFormAction!getExpandHeaderInfo.action")
	@ResponseBody
	public ActionResult getExpandHeaderInfo(@RequestParam String entityDataID)
	{
		try
		{
			List<EntityMap> list = this.bp.getExpandHeaderInfo(entityDataID);
			for (EntityMap map : list)
			{
				EntityMapJSONUtils.combineFields_Object(map, "supplierid", "supplierid, supplierid, suppliercode, suppliercode, suppliername, suppliername");
				EntityMapJSONUtils.combineFields_Object(map, "customerid", "customerid, customerid, customercode, customercode, customername, customername");
				EntityMapJSONUtils.combineFields_Object(map, "paytype", "paytypecode, paytypecode, paytypename, paytypename");
				EntityMapJSONUtils.combineFields_Object(map, "payobjecttype", "payobjecttypecode, payobjecttypecode, payobjecttypename, payobjecttypename");
				EntityMapJSONUtils.combineFields_Object(map, "settletype", "settletypecode, settletypecode, settletypename, settletypename");
				EntityMapJSONUtils.combineFields_Object(map, "invoicetype", "invoicetypecode, invoicetypecode, invoicetypename, invoicetypename");
				EntityMapJSONUtils.combineFields_Object(map, "econitemtypeid", "econitemtypeid, econitemtypeid, econitemtypecode, econitemtypecode, econitemtypename, econitemtypename");
				EntityMapJSONUtils.combineFields_Object(map, "payuserid", "userid, payuserid, usercode, payusercode, username, payusername");
			}

			return ActionResultUtil.toData(list);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 读取支出明细信息
	 * @return
	 */
	@RequestMapping("/SSC/ssc_smcs_CostFormAction!getCostInfo.action")
	@ResponseBody
	public ActionResult getCostInfo(@RequestParam String entityDataID)
	{
		try
		{
			List<EntityMap> list = this.bp.getCostInfo(entityDataID);
			for (EntityMap map : list)
			{
				EntityMapJSONUtils.combineFields_Object(map, "econitemid", "econitemid, econitemid, econitemcode, econitemcode, econitemname, econitemname");
				EntityMapJSONUtils.combineFields_Object(map, "deptid", "id, db1id, text, db1text, deptID, db1id, deptCode, db1code, deptName, db1name");
				EntityMapJSONUtils.combineFields_Object(map, "indexdeptid", "indexdeptcode, db2id, indexdeptname, db2text, deptfullname, db2name");
				EntityMapJSONUtils.combineFields_Object(map, "taxrate", "taxratecode, taxratecode, taxratename, taxratename, taxratetext, taxratetext, taxrate, taxrate");
				EntityMapJSONUtils.combineFields_Object(map, "indexid", "indexID, indexid, indexCode, indexcode, indexName, indexname");
			}

			return ActionResultUtil.toData(list);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 根据经济事项获取对应发起的流程信息
	 * @jsonCondtion { econitemid : "value1" }
	 * @return { success : true, processid : "value1", activityid : "value2" }
	 */
	@RequestMapping("SSC/ssc_smcs_CostFormAction!getProcessInfo.action")
	@ResponseBody
	public Object getProcessInfo(@RequestParam String jsonCondition)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition);

			EntityMap mapResult = this.bp.getProcessInfo(cdtMap);

			return mapResult.put("success", true);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}