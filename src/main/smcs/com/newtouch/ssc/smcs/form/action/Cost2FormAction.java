package com.newtouch.ssc.smcs.form.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.JstlView;

import com.newtouch.ssc.smcs.form.ifx.ICostFormBP;

@Controller
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class Cost2FormAction extends OpenFormAction
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
	@RequestMapping("/SMCSSSC/ssc_smcs_Cost2FormAction!toUrl.action")
	public ModelAndView openForm(@RequestParam String operType,
			@RequestParam(required=false, defaultValue="") String formTypeCode,
			@RequestParam(required=false, defaultValue="") String busiClassCode,
			@RequestParam(required=false, defaultValue="") String entityDataID) throws Exception
	{
		ModelAndView modelAndView = new ModelAndView(new JstlView("/cloud/smcs/form/cost2/cost.jsp"));

		return super.openForm(modelAndView, operType, formTypeCode, busiClassCode, entityDataID);
	}
}