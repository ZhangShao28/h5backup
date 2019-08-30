/**
 * Created by admin on 2018/12/19.
 */
import Vue from 'vue'
import axios from 'axios';
export default{
  // 授权
  authIndex: (data) => {
    return axios.post('/auth/index', data)
  },
  // 首页
  //banner
  productBanner: (data) => {
    return axios.post('/product/banner', data)
  },
  //产品分类
  productClassify: (data) => {
    return axios.post('/product/classify', data)
  },
  //产品列表
  productIndex: (data) => {
    return axios.post('/product/index', data)
  },
  //产品详情
  productDetail: (data) => {
    return axios.post('/product/detail', data)
  },
  //我的
  userInfo: (data) => {
    return axios.post('/user/info', data)
  },
  //支付
  rechargePay: (data) => {
    return axios.post('/recharge/pay', data)
  },

  //綁定
  userEdit: (data) => {
    return axios.post('/user/edit', data)
  },
  //我的
  userMy: (data) => {
    return axios.post('/user/my', data)
  },
  //我的
  userModify: (data) => {
    return axios.post('/user/modify', data)
  },
  //我的
  productOrder: (data) => {
    return axios.post('/product/order', data)
  },











}