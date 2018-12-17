package com.newtouch.ssc.smcs.bz.action;

import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.newtouch.cloud.common.ActionJSONUtil;
import com.newtouch.cloud.common.ActionResultUtil;
import com.newtouch.cloud.common.entity.ActionResult;
import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.common.entity.PageData;
import com.newtouch.ssc.smcs.bz.ifx.IBZQueryBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class BZQueryAction
{
	@Autowired
	private IBZQueryBP bp = null;
	public IBZQueryBP getBp()
	{
		return bp;
	}
	public void setBp(IBZQueryBP bp)
	{
		this.bp = bp;
	}

	@RequestMapping("/SSC/ssc_smcs_BZQueryAction/list")
	@ResponseBody
	public ActionResult getPage(@RequestParam String jsonCondition,
			@RequestParam Integer start,
			@RequestParam Integer limit)
	{
		try
		{
			ConditionMap cdtMap = new ConditionMap(jsonCondition, start, limit);

			PageData<EntityMap> page = this.bp.getPage(cdtMap, cdtMap.getStart(), cdtMap.getLimit());

			return ActionResultUtil.toPageData(page);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
			return ActionResultUtil.toException(ex);
		}
	}

	/**
	 * 下载模板
	 */
/*	public String downloadExcel() throws Exception
	{
		OutputStream os = null;
		HttpServletResponse response = ServletActionContext.getResponse();

		try
		{
			ConditionMap cdtMap = new ConditionMap(this.getJsonCondition());

			HSSFWorkbook wb = this.bp.getExcelWorkBook(cdtMap);

			response.setCharacterEncoding("UTF-8");
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			response.setHeader("Content-disposition", "attachment; filename=bzquery-" + df.format(new Date()) + ".xls");
			response.setContentType("application/vnd.ms-excel");

			os = response.getOutputStream();
			wb.write(os);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();

			if (null != os)
			{
				os.flush();
				os.close();
				os = null;
			}

			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("导出发生异常，错误信息：" + ex.getMessage());
		}

		return NONE;
	}*/
}
