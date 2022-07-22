import axios from 'axios'
// 把请求到的结果回调出去（方式四）
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000,
  });

  // 2.axios的拦截器
  // A.请求拦截
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config;
  // }, err => {
  //   console.log(err);
  // });
  // // B. 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    // 可以只返回响应体data
    return res.data;
  }, err => {
    console.log(err);
  });

  // 3.发送真正的网络请求
  return instance(config);
}