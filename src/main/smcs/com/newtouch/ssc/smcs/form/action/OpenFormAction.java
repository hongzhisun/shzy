package com.newtouch.ssc.smcs.form.action;

import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.newtouch.cloud.common.ActionJSONUtil;
import com.newtouch.ssc.smcs.form.entity.UrlInfo;
import com.newtouch.ssc.smcs.form.ifx.ICommonHeaderBP;
import com.newtouch.workflow.app.common.FormOperTypeEnum;
import com.newtouch.workflow.ssc.basedata.entity.GlobalParamEntity;
import com.newtouch.workflow.ssc.basedata.ifx.IGlobalParamBP;

/**
 * 
 * @author mboat 2017年6月6日
 */
public class OpenFormAction
{
	@Autowired
	private ICommonHeaderBP bp = null;

	@Autowired
	private IGlobalParamBP globalParamBP = null;

	/**
	 * 打开业务单据入口</br>
	 * 包括新建单据、查看单据、查看草稿等情况</br>
	 * @return
	 * @throws Exception
	 */
	public ModelAndView openForm(ModelAndView modelAndView,
			String operType,
			String formTypeCode,
			String busiClassCode,
			String entityDataID) throws Exception
	{
		if (Integer.parseInt(operType) == FormOperTypeEnum.NewItem.getValue())
		{
			String formTypeName = "";
			String busiClassName = "";
			int formStatus;

			if (formTypeCode.equals("") || formTypeCode == null)
			{
				formTypeCode = "";
				formTypeName = "";
			}
			else
			{
				formTypeName = this.bp.getBillTypeNameByCode(formTypeCode);
			}

			if (busiClassCode.equals("") || busiClassCode == null)
			{
				busiClassCode = "";
				busiClassName = "";
			}
			else
			{
				busiClassName = this.bp.getBusiClassNameByCode(busiClassCode);
			}

			formStatus = 0;

			modelAndView.addObject("operType", operType);
			modelAndView.addObject("formTypeCode", formTypeCode);
			modelAndView.addObject("formTypeName", formTypeName);
			modelAndView.addObject("busiClassCode", busiClassCode);
			modelAndView.addObject("busiClassName", busiClassName);
			modelAndView.addObject("formStatus", formStatus);
			modelAndView.addObject("entityID", entityDataID);
		}
		else if (Integer.parseInt(operType) == FormOperTypeEnum.Approve.getValue()
				|| Integer.parseInt(operType) == FormOperTypeEnum.Personal.getValue()
				|| Integer.parseInt(operType) == FormOperTypeEnum.Finshed.getValue()
				|| Integer.parseInt(operType) == FormOperTypeEnum.FinishedByMe.getValue()
				|| Integer.parseInt(operType) == FormOperTypeEnum.Draft.getValue()
				|| Integer.parseInt(operType) == FormOperTypeEnum.Templete.getValue())
		{
			UrlInfo urlInfo = this.bp.getFormUrlInfo(entityDataID);

			modelAndView.addObject("operType", operType);
			modelAndView.addObject("formTypeCode", urlInfo.getFormTypeCode());
			modelAndView.addObject("formTypeName", urlInfo.getFormTypeName());
			modelAndView.addObject("busiClassCode", urlInfo.getBusiClassCode());
			modelAndView.addObject("busiClassName", urlInfo.getBusiClassName());
			modelAndView.addObject("formStatus", urlInfo.getFormStatus());
			modelAndView.addObject("entityID", urlInfo.getEntityDataID());
			modelAndView.addObject("mainID", urlInfo.getEntityDataID());
		}
		else
		{
			throw new Exception("无法确定操作，未定义的opertype参数:" + operType);
		}

		List<GlobalParamEntity> globalParamList = globalParamBP.getList(null);

		modelAndView.addObject("jsonString", StringEscapeUtils.escapeHtml(ActionJSONUtil.toData(globalParamList)));

		return modelAndView;
	}
}
