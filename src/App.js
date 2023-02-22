import './App.css';
import { useState } from 'react';
import { Layout } from 'antd';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import Router from './router/Router';
import LoginModal from './components/LoginModal';

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <Layout>
        <Header className='header'>
          <NavHeader handleLogin={() => setIsModalOpen(true)} />
        </Header>
        <Content className='content'>
          <Router />
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
