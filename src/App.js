import './App.css';
import { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import BeforeRoute from './router/BeforeRoute';
import LoginModal from './components/LoginModal';
import { whoamiApi, getUserByIdAPi } from './api/user';
import { setUserInfo } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userToken')) { // 用户已经登录，刷新页面时仓库的用户信息会被清除，无法显示用户头像
      async function fetchUser() {
        const { data, msg } = await whoamiApi();
        if (data) {
          const res = await getUserByIdAPi(data._id);
          dispatch(setUserInfo(res.data));
        } else {
          message.error(msg);
          navigate('/');
        }
      }
      fetchUser();
    }
  }, []);
  return (
    <div className="App">
      <Layout>
        <Header className='header'>
          <NavHeader handleLogin={() => setIsModalOpen(true)} />
        </Header>
        <Content className='content'>
          <BeforeRoute />
        </Content>
        <Footer className='footer'>
          <PageFooter />
        </Footer>
      </Layout>
      <LoginModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
