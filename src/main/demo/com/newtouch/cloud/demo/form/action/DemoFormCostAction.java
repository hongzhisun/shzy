package com.newtouch.cloud.demo.form.action;

import java.util.List;

import javax.servlet.http.HttpSession;

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
import com.newtouch.cloud.common.session.MCSession;
import com.newtouch.cloud.demo.form.bp.DemoFormCostBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@RequestMapping("/demo/form/cost")
public class DemoFormCostAction
{
	@Autowired
	private DemoFormCostBP bp;

	@RequestMapping("/header/get")
	@ResponseBody
	public ActionResult getHeader(HttpSession httpSession,
			@RequestParam(name="opertype", required=false, defaultValue="") String operType,
			@RequestParam(name="entitydataid", required=false, defaultValue="") String entityDataID) throws Exception
	{
		try
		{
			MCSession session = new MCSession(httpSession);

			EntityMap headerMap = this.bp.getHeader(Integer.parseInt(operType), entityDataID, session.getUserID());

			EntityMapJSONUtils.combineFields_Object(headerMap, "dept", "deptID, deptid, deptName, deptname");
			EntityMapJSONUtils.combineFields_Object(headerMap, "user", "userID, userid, userName, username");
			EntityMapJSONUtils.combineFields_Object(headerMap, "supplier", "id, supplierid, name, suppliername");

			return ActionResultUtil.toSingleResult(headerMap);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	@RequestMapping("/costinfo/list")
	@ResponseBody
	public ActionResult getCostInfo(@RequestParam(name="entitydataid", required=false, defaultValue="") String entityDataID)
	{
		try
		{
			List<EntityMap> list = this.bp.getCostInfo(entityDataID);

			return ActionResultUtil.toData(list);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}
}
