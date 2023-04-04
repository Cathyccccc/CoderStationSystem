import React from 'react';
import { Avatar, Image, Popover, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { setUserInfo } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

/**
 * 登录后页面右上角显示头像和下拉选项按钮组件
 */
export default function LoginAvatar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickItem = (item) => {
    if (item === '个人中心') {
      navigate('/personal');
    } else {
      // 退出登录 1.清空仓库用户信息 2.清除token
      dispatch(setUserInfo(null));
      localStorage.removeItem('userToken');
    }
  }
  return (
    <div>
      <Popover placement="bottom" trigger="click" content={
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={['个人中心', '退出登录']}
          renderItem={(item) => <List.Item style={{cursor: 'pointer'}} onClick={() => handleClickItem(item)}>{item}</List.Item>}>
        </List>
      }>
        <Avatar
          src={
            <Image
              src={props.avatar}
              style={{
                background: '#fff',
                cursor: 'pointer'
              }}
              preview={false}
            />
          }
          icon={<UserOutlined />}
          size={40}
        />
      </Popover>
    </div>
  )
}
