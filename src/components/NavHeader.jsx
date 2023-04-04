import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Input, Select, Button, message } from 'antd';
import { useSelector } from 'react-redux';
import LoginAvatar from './LoginAvatar';
const { Search } = Input;

export default function NavHeader({handleLogin}) {
  const [searchType, setSearchType] = useState('issue');
  // const [searchValue, setSearchValue] = useState(null);
  const {userInfo} = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  // 处理searchPage页面的刷新问题。当页面手动刷新时，搜索框的value值变为空，此时应该设置searchvalue值为空，并且跳回问答/书籍页面。
  // 如果不跳转，首先value显示为空（按逻辑为空应该跳回问答/书籍页面），其次typeList为空，渲染Item时读不到typeName值，报错。
  // 解决方式：1.跳转回问答/书籍页面 2.刷新时保持住搜索框内的value值，请求typeList，页面不跳转，渲染的数据也不变化。这里采用第一种解决方式。
  useEffect(() => {
    if (location.state) {
      const {searchOptions} = location.state;
      if (searchOptions === 'issue') {
        navigate('/issues');
      } else if (searchOptions === 'book') {
        navigate('/books');
      }
    }
  }, [])

  const onSearch = (value) => {
    if (value.trim() == '') {
      // 如果搜索内容为空，则返回问答/书籍列表页
      if (searchType === 'issue') {
        navigate('/issues');
      } else if (searchType === 'books') {
        navigate('/books');
      }
    } else {
      // 跳转到searchPage页面，传递搜索的参数
      navigate('/searchPage', {
          state: {
            searchOptions: searchType,
            value: value.trim()
          }
      })
    }
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
        placeholder="请输入搜索内容"
        allowClear
        addonBefore={(
          <Select
            defaultValue="issue"
            onChange={(val) => setSearchType(val)}
            options={[
              {
                value: 'issue',
                label: '问答',
              },
              {
                value: 'book',
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
        { userInfo ? <LoginAvatar {...userInfo} /> : <Button type="primary" size='large' onClick={handleLogin}>登录/注册</Button> }
        
      </div>
    </div>
  )
}
