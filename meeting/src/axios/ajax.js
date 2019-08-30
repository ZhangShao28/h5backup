/**
 * Created by admin on 2018/12/19.
 */
import axios from 'axios' // axios引用
import qs from 'qs'
import { cookie} from 'vux'
axios.defaults.baseURL = process.env.API_ROOT; // 全局的地址
axios.defaults.timeout = 10000;
axios.defaults.headers.token = cookie.get('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.method === 'post'){
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;