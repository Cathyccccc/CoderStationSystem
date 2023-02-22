import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Select, Button } from 'antd';
const { Search } = Input;
const { Option } = Select;

export default function NavHeader({handleLogin}) {
  const [value, setValue] = useState('');
  const onSearch = (value) => {
    console.log('search value: ', value)
  }
  const handleChange = (value) => {
    console.log('handle change: ', value)
  }
  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      <nav className="navContainer">
        <NavLink to="/" className="navgation">问答</NavLink>
        <NavLink to="/books" className="navgation">书籍</NavLink>
        <NavLink to="/interviews" className="navgation">面试题</NavLink>
        <a
          href="https://duyi.ke.qq.com/"
          className="navgation"
          target="_blank"
          rel="noopener noreferrer"
        >视频教程</a>
      </nav>
      <Search
        className='searchContainer'
        placeholder="input search text"
        allowClear
        addonBefore={(
          <Select
            defaultValue={1}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: '问答',
              },
              {
                value: 2,
                label: '书籍',
              }
            ]}
          />
        )}
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div className='loginBtnContainer'>
        <Button type="primary" size='large' onClick={handleLogin}>登录/注册</Button>
      </div>
    </div>
  )
}
