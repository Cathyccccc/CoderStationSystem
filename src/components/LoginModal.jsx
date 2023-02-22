import React, { useState, useEffect } from 'react';
import { Modal, Radio, Form, Input, Checkbox, Button } from 'antd';
import styles from '../css/loginModal.module.css';
import { NavLink } from "react-router-dom";
import { getCaptchaApi } from '../api/login';

const options = [
  { label: '登录', value: 'login' },
  { label: '注册', value: 'register' }
];

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function LoginModal({ isModalOpen, handleCancel }) {
  const [value, setValue] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  useEffect(() => {
    getCaptchaApi();
  }, [])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const LoginForm = (
    <Form {...layout} form={loginForm} name="loginForm" labelAlign="right">
      <Form.Item name="loginId" label="账号">
        <Input />
      </Form.Item>
      <Form.Item name="loginPwd" label="密码">
        <Input />
      </Form.Item>
      <Form.Item name="captcha" label="验证码">
        <Input style={{width:'60%'}} />
      </Form.Item>
      <NavLink to="/forgotPwd" style={{float: 'right'}}>
        Forgot password
      </NavLink>
      <Form.Item wrapperCol={{
          offset: 4,
          span: 17,
        }} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
        
      </Form.Item>
      
      
      <Form.Item wrapperCol={{
        offset: 4,
          span: 17,
        }}>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
  const RegisterForm = (
    <Form {...layout} form={registerForm} name="registerForm">
      <Form.Item name="loginId" label="账号">
        <Input />
      </Form.Item>
      <Form.Item name="nickname" label="昵称">
        <Input />
      </Form.Item>
      <Form.Item name="captcha" label="验证码">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Modal title="登录/注册" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Radio.Group
        options={options}
        onChange={handleChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
        className={styles.radioGroup}
      />
      {value === 'login' ? LoginForm : RegisterForm}
    </Modal>
  )
}
