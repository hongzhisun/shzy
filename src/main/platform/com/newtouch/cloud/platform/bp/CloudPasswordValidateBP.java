package com.newtouch.cloud.platform.bp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.newtouch.cloud.common.encrypt.HexUtil;
import com.newtouch.cloud.security.ifx.IPasswordValidateBP;
import com.newtouch.cloud.security.result.ValidateResult;

/**
 * 密码验证服务
 */
@Service
@Transactional
public class CloudPasswordValidateBP
{
	@Autowired
	private IPasswordValidateBP passwordValidateBP;

	/**
	 * 未登录的情况下，输入旧密码，修改新密码
	 * @param loginName		账号登录名称
	 * @param password_old	旧密码(明文)
	 * @param password_new	新密码(明文)
	 * @param sessionID		浏览器SessionID
	 * @return
	 */
	public ValidateResult updatePassword(String loginName, String password_old, String password_new,
			String sessionID) throws Exception
	{
		/**
		 * 解密
		 */
		String password_Old_Decrypted = HexUtil.decrypt(password_old, 12);
		String password_New_Decrypted = HexUtil.decrypt(password_new, 12);

		ValidateResult result =  this.passwordValidateBP.loginValidateAndUpdatePassword(loginName, password_Old_Decrypted, password_New_Decrypted, sessionID);

		/**
		 * 可以根据返回的result.getValidateResultType()详细状态，自定义提示信息
		 * 1. 普通登录			
		 * 结果		验证结果类型	关联操作
		 * TRUE	1	成功	
		 * TRUE	3	成功	无/设置未激活
		 * FALSE	50	密码长度不到{0}	
		 * FALSE	51	密码需字母与数字混合	
		 * FALSE	52	密码字母开头
		 * FALSE	53	新密码与原密码相同
		 * FALSE	54	密码与最近{}次密码重复
		 */

		/**
		 * 处理返回信息和返回标志
		 */
		return result;
	}
}