package com.newtouch.ssc.smcs.form.bp;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.rpc.holders.StringHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.entity.ConditionMap;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderDAO;
import com.newtouch.ssc.smcs.form.ifx.ICostFormBP;
import com.newtouch.ssc.smcs.form.ifx.ICostFormDAO;
import com.newtouch.workflow.app.ifx.IFormPrintDataAdapter;

@Service
@Transactional
public class CostFormBP implements ICostFormBP, IFormPrintDataAdapter
{
	@Autowired
	private ICommonHeaderDAO headerDAO = null;

	@Autowired
	private ICostFormDAO dao = null;

	public List<EntityMap> getCostInfo(String entityDataID)
	{
		return this.dao.getCostInfo(entityDataID);
	}

	public List<EntityMap> getExpandHeaderInfo(String entityDataID)
	{
		return this.dao.getExpandHeaderInfo(entityDataID);
	}

	public EntityMap getProcessInfo(ConditionMap cdtMap)
	{
		return this.dao.getProcessInfo(cdtMap);
	}

	@Override
	public boolean getFormPrintData(HttpServletRequest request, String formID, String processInstID,
			Map<String, Object> reportParam,
			List<Map<String, Object>> reportData,
			StringHolder jasper,
			StringHolder fileName)
	{
		String entityDataID = this.dao.getEntityDataID(processInstID);
		List<EntityMap> listHeader = this.headerDAO.getCommonHeaderInfo(entityDataID);
		EntityMap header = listHeader.get(0);

		jasper.value = "cloud\\smcs\\form\\cost\\cost.jasper";
		fileName.value = "报账单" + header.getString("serialno");

		String subReport_Dir = request.getServletContext().getRealPath("cloud/smcs/form/cost/");

		reportParam.put("SUBREPORT_DIR", subReport_Dir);

		reportParam.put("unitid_text", header.getString("unitname"));

		reportParam.put("userid_text", header.getString("username"));
		reportParam.put("serialno", header.getString("serialno"));
		reportParam.put("deptid_name", header.getString("deptname"));

		reportParam.put("busidate", header.getString("busidate"));
		reportParam.put("affixnum", header.getString("affixnum"));
		reportParam.put("abstract", header.getString("abstract"));

		List<EntityMap> listExpandHeader = this.dao.getExpandHeaderInfo(entityDataID);
		EntityMap expandHeader = listExpandHeader.get(0);

		reportParam.put("settletype", expandHeader.getString("settletypename"));
		reportParam.put("payobjecttype", expandHeader.getString("payobjecttypename"));
		reportParam.put("econitemtypeid_text", expandHeader.getString("econitemtypename"));
		reportParam.put("paytype", expandHeader.getString("paytypename"));
		reportParam.put("invoicetype", expandHeader.getString("invoicetypename"));
		reportParam.put("ispay", expandHeader.getInteger("ispay") == 1 ? "是" : "否");

		List<EntityMap> listCostInfo = this.dao.getCostInfo(entityDataID);
		for (EntityMap row : listCostInfo)
		{
			row.put("econitemid_text", row.getString("econitemname"));
			row.put("indexdeptid_text", row.getString("db2text"));
		}
		reportParam.put("cost_info", listCostInfo.toArray());
		return true;
	}
}