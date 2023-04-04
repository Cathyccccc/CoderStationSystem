import axios from 'axios';

const instance = axios.create({
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default instance;