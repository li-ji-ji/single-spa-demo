import axios from "axios";
import { Component } from "react";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

let base = "https://plant.hzby.tech";
// https://plant.hzby.tech
// http://192.168.50.133:9000

axios.defaults.withCredentials = true; // 携带cookie
// 请求前拦截
axios.interceptors.request.use(
  config => {
    NProgress.configure({ easing: 'ease', speed: 500 });
    NProgress.start();
    let token = ''
    if(window.localStorage.getItem("token")){
      token = window.localStorage.getItem("token")
    }else if(window.sessionStorage.getItem("token")){
      token = window.sessionStorage.getItem("token")
    }
    config.headers.common['token'] = token
    config['url'] = base + config['url']
    return config;
  },
  err => {
    return Promise.reject(err);
    
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    NProgress.done();
    return data;
  },
  err => {
    NProgress.done();
    try {
      switch(err.response.status){
        case 504||404:
          console.log("服务器被吃了 ⊙﹏⊙∥");
          break
        case 401:
          console.log("登录信息失效 ⊙﹏⊙∥");
          break
        case 409:
          console.log("登录失败 ⊙﹏⊙∥");
          break
        case 500:
          console.log("服务器开小差了 ⊙﹏⊙∥");
          break
        default:
          console.log("辣鸡服务器 [○･｀Д´･ ○]");
      }
    } catch (err) {
      console.log(err)
    }
    return Promise.reject(err);
  }
);

// @RequestBody请求
const postRequestBody = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json",
    }
  });
};

// @RequestParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const get = url => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};

const multiple = function(requestArray, callback) {
  axios.all(requestArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.postRequestBody = postRequestBody;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;
