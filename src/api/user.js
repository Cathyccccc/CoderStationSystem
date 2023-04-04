import instance from ".";

// 获取验证码
const getCaptchaApi = () => {
  return instance({
    url: '/res/captcha',
    method: 'get'
  });
}

// 登录
const userLoginApi = (params) => {
  return instance.post('/api/user/login', params)
}

// 注册
const userRegisterApi = (params) => {
  return instance.post('/api/user', params)
}

// 判断用户是否存在
const checkIsExist = (loginId) => {
  return instance.get(`/api/user/userIsExist/${loginId}`)
}

// 根据id获取用户所有信息
const getUserByIdAPi = (id) => {
  return instance.get(`/api/user/${id}`)
}

// 根据token验证是否登录/登录是否过期
const whoamiApi = () => {
  return instance.get('/api/user/whoami')
}

// 获取积分前十用户
const getRankListApi = () => {
  return instance.get('/api/user/pointsrank')
}

// 修改用户/更新用户信息
const updateUserApi = (id, params) => {
  console.log(id, params)
  return instance.patch(`/api/user/${id}`, params)
}

// 验证账号密码是否正确
const checkPasswordApi = (data) => {
  return instance.post('/api/user/passwordcheck', data)
}

export {
  getCaptchaApi,
  userLoginApi,
  userRegisterApi,
  checkIsExist,
  getUserByIdAPi,
  whoamiApi,
  getRankListApi,
  updateUserApi,
  checkPasswordApi,
}