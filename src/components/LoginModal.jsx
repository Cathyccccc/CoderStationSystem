import React, { useState, useEffect } from 'react';
import { Modal, Radio, Form, Input, Checkbox, Button, message } from 'antd';
import styles from '../css/loginModal.module.css';
import { NavLink } from "react-router-dom";
import { getCaptchaApi, userLoginApi, userRegisterApi, getUserByIdAPi } from '../api/user';
import loginRules, {userExistValidator, userNotExistValidator} from '../util/rules/loginRules';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice';

const options = [
  { label: '登录', value: 'login' },
  { label: '注册', value: 'register' }
];

const layout = { 
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default function LoginModal({ isModalOpen, handleCancel }) {
  const [value, setValue] = useState('login');
  const [captcha, setCaptcha] = useState('');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    remember: false
  });
  const [registerInfo, setRegisterInfo] = useState({
    loginId: '',
    nickname: '',
    captcha: ''
  });
  const dispatch = useDispatch();
  // 验证码
  // 1.初始显示
  // 2.点击刷新
  // 3.登录和注册切换时刷新
  // 4.验证码验证失败刷新
  // 5.登录失败刷新
  useEffect(() => {
    getCaptcha();
  }, [value, isModalOpen])

  const getCaptcha = async () => {
    const data = await getCaptchaApi();
    setCaptcha(data);
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    loginForm.resetFields();
    registerForm.resetFields();
  }

  const handleLoginSubmit = async (values) => {
    const {data, msg} = await userLoginApi(values);
    if (data) {
      if (data.data.enabled) {
        // 1.登录成功 {"code":0,"msg":"","data":{"data":{"_id":"63f72af2ff3a4d8d3650118e","loginId":"123","enabled":true},"token":"..."}}
        // 设置token
        localStorage.setItem('userToken', data.token);
        // 存储用户信息到仓库
        // 用户信息不完整，需要根据id向后台请求完整的用户信息
        const res = await getUserByIdAPi(data.data._id)
        dispatch(setUserInfo(res.data));
        message.success('登录成功');
        handleClose(); // 关闭弹窗
      } else if (data.data) {
        // 2.密码错误 {"code":0,"msg":"","data":{"data":null}}
        message.error('密码错误');
        setLoginInfo({
          ...loginInfo,
          loginPwd: ''
        });
        getCaptcha();
      } else {
        // 3.账号被禁 enabled属性为false
        message.warn('账号已被禁');
      }
    } else { // {"code":406,"msg":"验证码错误","data":null}
      message.error(msg);
      
    };
  }

  const handleRegisterSubmit = async (values) => {
    const {msg, data} = await userRegisterApi(values);
    if (!data) {
      message.error(msg)
    } else {
      message.success('注册成功，密码默认为123456')
    }
  }

  const handleClose = () => {
    handleCancel();
    // 清空login/register表单
    loginForm.resetFields();
    registerForm.resetFields();
  }

  const Login = (
    <Form
      {...layout}
      form={loginForm}
      name="loginForm"
      initialValues={loginInfo}
      labelAlign="right"
      onFinish={handleLoginSubmit}
      validateTrigger={['onBlur', 'onChange']}
    >
      <Form.Item name="loginId" label="账号" rules={[...loginRules.loginId, {
        validator: userNotExistValidator,
        validateTrigger: ['onBlur']
      }]}>
        <Input value={loginInfo.loginId} />
      </Form.Item>
      <Form.Item name="loginPwd" label="密码" rules={loginRules.loginPwd}>
        <Input.Password value={loginInfo.loginPwd} />
      </Form.Item>
      <Form.Item label="验证码" style={{ marginBottom: 0 }}>
        <Form.Item name="captcha" style={{ display: 'inline-block', width: '60%' }}>
          <Input value={loginInfo.captcha} />
        </Form.Item>
        <div className={styles.svgWrapper} dangerouslySetInnerHTML={{ __html: captcha }} onClick={() => getCaptcha()}></div>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 17 }} style={{ marginBottom: 0 }}>
        <Form.Item name="remember" valuePropName="checked" style={{ display: 'inline-block', width: '60%' }}>
          <Checkbox checked={loginInfo.remember}>记住我</Checkbox>
        </Form.Item>
        <NavLink to="/forgotPwd" style={{ float: 'right', paddingTop: 5 }}>
          忘记密码？
        </NavLink>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 17 }}>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
  const Register = (
    <Form
      {...layout}
      form={registerForm}
      name="registerForm"
      onFinish={handleRegisterSubmit}
      initialValues={registerInfo}
      validateTrigger={['onBlur', 'onChange']}
    >
      <Form.Item name="loginId" label="账号" rules={[...loginRules.loginId, {
        validator: userExistValidator,
        validateTrigger: ['onBlur']
      }]}>
        <Input value={registerInfo.loginId} />
      </Form.Item>
      <Form.Item name="nickname" label="昵称">
        <Input value={registerInfo.nickname} />
      </Form.Item>
      <Form.Item label="验证码" style={{ marginBottom: 0 }}>
        <Form.Item name="captcha" style={{ display: 'inline-block', width: '60%' }} rules={loginRules.captcha}>
          <Input value={registerInfo.captcha} />
        </Form.Item>
        <div className={styles.svgWrapper} dangerouslySetInnerHTML={{ __html: captcha }} onClick={() => getCaptcha()}></div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Modal title="登录/注册" open={isModalOpen} onCancel={handleClose} footer={null}>
      <Radio.Group
        options={options}
        onChange={handleChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
        className={styles.radioGroup}
      />
      {value === 'login' ? Login : Register}
    </Modal>
  )
}
