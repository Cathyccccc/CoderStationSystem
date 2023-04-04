import React from 'react';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * 我要发问按钮组件（没有登录的用户不可跳转到发问表单页）
 */
export default function Question() {
  const { userInfo } = useSelector(state => state.user);
  const navigate = useNavigate();
  const handleClick = () => {
    if (userInfo) {
      navigate('/addIssue');
    } else {
      message.warn('请先登录');
    }
  }
  return (
    <div>
      <Button type='primary' block onClick={handleClick}>我要发问</Button>
    </div>
  )
}
