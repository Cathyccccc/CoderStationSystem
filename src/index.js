import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import '@toast-ui/editor/dist/toastui-editor.css'; // Markdown编辑器toast-ui插件的css样式引入

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);

