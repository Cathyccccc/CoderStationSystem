import instance from ".";

const getCaptchaApi = () => {
  return instance({
    url: '/res/captcha',
    method: 'get'
  });
}

export {
  getCaptchaApi,
}