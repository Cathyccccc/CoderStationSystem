import axios from 'axios';

const instance = axios.create({
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  console.log(response)
}, (error) => {
  return Promise.reject(error);
});

export default instance;