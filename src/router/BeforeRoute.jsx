import Router from './Router';
import routerConfig from './RouterConfig';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';

export default function BeforeRoute() {
  const location = useLocation();
  const { userInfo } = useSelector(state => state.user);
  const currentPath = routerConfig.filter(item => location.pathname.includes(item.path))[0];
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/issues');
  }

  if (currentPath) {
    if (currentPath.auth && !userInfo) {
      return (<Alert
        message="请先登录！"
        type="error"
        closable
        onClose={handleClose}
      />)
    }
  }
  return (
    <Router />
  )
}
