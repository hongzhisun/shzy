package com.newtouch.cloud.platform.bp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.encrypt.HexUtil;
import com.newtouch.cloud.common.entity.EntityMap;
import com.newtouch.cloud.platform.dao.CloudLoginValidateDAO;
import com.newtouch.cloud.security.ifx.ILoginValidateBP;
import com.newtouch.cloud.security.result.ValidateResult;

/**
 * 登录验证服务
 */
@Service
@Transactional
public class CloudLoginValidateBP
{
	@Autowired
	private ILoginValidateBP loginAccountBP;
	
	@Autowired
	private CloudLoginValidateDAO wfsLoginValidateDAO;

	/**
	 * 普通登录验证
	 * 使用账号、密码登录
	 * 应用所有安全策略
	 * @param loginName
	 * @param password
	 * @return
	 */
	public ValidateResult loginValidate(String loginName, String password, String sessionID, EntityMap companyMap) throws Exception
	{
		/**
		 * 解密
		 */
		String password_Decrypted = HexUtil.decrypt(password, 12);

		ValidateResult result = this.loginAccountBP.loginValidate(loginName, password_Decrypted, sessionID);

		/**
		 * 可以根据返回的result.getValidateResultType()详细状态，自定义提示信息
		 * 1. 普通登录			
		 * 结果	标志位	验证结果类型	关联操作
		 * TRUE	1	成功	
		 * TRUE	2	成功,有效期提示
		 * TRUE	3	登录账号未激活
		 * FALSE	10	登录账号不正确	
		 * FALSE	11	密码不正确	
		 * FALSE	12	登录账号或密码不正确	
		 * FALSE	13	密码不正确,错误达到最大允许次数	无/锁定
		 * FALSE	14	登录账号或密码不正确,错误达到最大允许次数	无/锁定
		 * FALSE	15	密码超过有效期	无/锁定
		 * FALSE	16	登录账号已锁定。请联系管理员解锁	无
		 */

		/**
		 * 获取所属公司信息
		 */
		if (result.isSuccess())
		{
			String strUserID = result.getLoginAccount().getLoginAccountID();
			EntityMap companyMap2 = this.wfsLoginValidateDAO.getLoginInfo(strUserID);
			companyMap.putAll(companyMap2);
		}
		
		/**
		 * 处理返回信息和返回标志
		 */
		return result;
	}

	/**
	 * Portal账号登录验证
	 * 只使用账号验证登录
	 * 不应用安全策略
	 * @param loginName
	 * @return
	 * @throws Exception 
	 */
	public ValidateResult loginPortal(String loginName, EntityMap companyMap) throws Exception
	{
		ValidateResult result = this.loginAccountBP.loginValidateSSO(loginName);

		/**
		 * 获取所属公司信息
		 */
		if (result.isSuccess())
		{
			String strUserID = result.getLoginAccount().getLoginAccountID();
			companyMap = this.wfsLoginValidateDAO.getLoginInfo(strUserID);
		}

		/**
		 * 处理返回信息和返回标志
		 */
		return result;
	}

	public String toStringHex(String s)
	{
		byte[] baKeyword = new byte[s.length() / 2];
		for (int i = 0; i < baKeyword.length; i++)
		{
			try
			{
				baKeyword[i] = (byte) (0xff & Integer.parseInt(s.substring(i * 2, i * 2 + 2), 16));
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
		}
		try
		{
			s = new String(baKeyword, "utf-8");// UTF-16le:Not
		}
		catch (Exception e1)
		{
			e1.printStackTrace();
		}
		return s;
	}
}