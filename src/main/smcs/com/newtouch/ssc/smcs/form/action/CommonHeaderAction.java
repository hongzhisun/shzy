package com.newtouch.ssc.smcs.form.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.EntityMapJSONUtils;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderBP;
import com.newtouch.workflow.app.common.FormOperTypeEnum;
import com.newtouch.workflow.ssc.basedata.ifx.IGlobalParamBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/smcs/form/commonheader")
public class CommonHeaderAction
{
	@Autowired
	private ICommonHeaderBP commonHeaderBP = null;

	@Autowired
	private IGlobalParamBP globalParamBP = null;

	/**
	 * 读取通用表头信息
	 * @return
	 */
	@RequestMapping("/get")
	@ResponseBody
	public ActionResult getCommonHeaderInfo(@RequestParam String operType,
			@RequestParam(required=false, defaultValue="") String formTypeCode,
			@RequestParam(required=false, defaultValue="") String busiClassCode,
			@RequestParam(required=false, defaultValue="") String entityDataID) throws Exception
	{
		try
		{
			List<EntityMap> list = null;

			if (Integer.parseInt(operType) == FormOperTypeEnum.NewItem.getValue())
			{
				list = this.commonHeaderBP.getInitCommonHeaderInfo(formTypeCode, busiClassCode);
			}
			else
			{
				list = this.commonHeaderBP.getCommonHeaderInfo(entityDataID);
			}

			for (EntityMap map : list)
			{
				EntityMapJSONUtils.combineFields_Object(map, "unitid", "unitid, unitid, unitcode, unitcode, unitname, unitname");
				EntityMapJSONUtils.combineFields_Object(map, "deptid", "id, deptid, text, depttext, deptid, deptid, deptcode, deptcode, deptname, deptname");
				EntityMapJSONUtils.combineFields_Object(map, "userid", "userid, userid, usercode, usercode, username, username,");
				EntityMapJSONUtils.combineFields_Object(map, "formtypecode", "formtypecode, formtypecode, formtypename, formtypename");
				EntityMapJSONUtils.combineFields_Object(map, "busiclasscode", "busiclasscode, busiclasscode, busiclassname, busiclassname");
				EntityMapJSONUtils.combineFields_Object(map, "deptid_other", "id, deptid_o, text, depttext_o, deptid, deptid_o, deptcode, deptcode_o, deptname, deptname_o");
				EntityMapJSONUtils.combineFields_Object(map, "budgetyear", "year, budgetyear");
			}

			return ActionResultUtil.toData(list);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}
