import { checkIsExist } from '../../api/user';

export default {
  loginId: [
    { required: true, message: '请输入账号', validateTrigger: ['onBlur'] },
    { min: 3, max: 12, message: '账号长度应为3-12位' },
  ],
  loginPwd: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 16, message: '密码长度应为6-16位' }
  ],
  captcha: [
    { required: true, message: '请输入验证码' }
  ]
}

export const userNotExistValidator = async (_, value) => {
  if(value) {
    const {data} = await checkIsExist(value);
    if (!data) {
      return Promise.reject('当前用户不存在');
    } else {
      return Promise.resolve();
    }
  }
}

export const userExistValidator = async (_, value) => {
  console.log(value)
  if (value) {
    const {data} = await checkIsExist(value);
    if (data) {
      return Promise.reject('当前用户名已存在，请更换其他用户名注册');
    } else {
      return Promise.resolve();
    }
  }
}