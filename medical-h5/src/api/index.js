/**
 * Created by admin on 2018/12/19.
 */
import Vue from 'vue'
import axios from 'axios';
export default{
  // 注冊
  userEnroll: (data) => {
    return axios.post('/user/enroll', data)
  },
  userSystem: (data) => {
    return axios.post('/user/system', data)
  },
  // 登陆
  userLogin: (data) => {
    return axios.post('/user/login', data)
  },
  userCode: (data) => {
    return axios.post('/user/code', data)
  },
  userExplain: (data) => {
    return axios.post('/user/explain', data)
  },
  // 授权
  authIndex: (data) => {
    return axios.post('/auth/index', data)
  },
  // 入会申请
  userRegister: (data) => {
    return axios.post('/user/register', data)
  },
  // 首頁
  indexIndex: (data) => {
    return axios.post('/index/index', data)
  },
  // 产品列表
  prodcutClassify: (data) => {//分类列表
    return axios.post('/product/classify', data)
  },
  prodcutIndex: (data) => {
    return axios.post('/product/index', data)
  },
  prodcutDetail: (data) => {
    return axios.post('/product/detail', data)
  },
  prodcutMycustomer: (data) => {
    return axios.post('/product/mycustomer', data)
  },
  prodcutAddrecord: (data) => {
    return axios.post('/product/addrecord', data)
  },
  orderIndex: (data) => {
    return axios.post('/order/index', data)
  },
  orderMycustomer: (data) => {
    return axios.post('/order/mycustomer', data)
  },
  // 我的信息
  userMy: (data) => {
    return axios.post('/user/my', data)
  },
  userMyinfo: (data) => {
    return axios.post('/user/myinfo', data)
  },
  userModify: (data) => {
    return axios.post('/user/modify', data)
  },
  // 我的钱包
  walletIndex: (data) => {
    return axios.post('/wallet/index', data)
  },
  walletTixianlog: (data) => {
    return axios.post('/wallet/tixianlog', data)
  },
  walletTixian: (data) => {
    return axios.post('/wallet/tixian', data)
  },
  walletAccount: (data) => {
    return axios.post('/wallet/account', data)
  },
  walletCommission: (data) => {
    return axios.post('/wallet/commission', data)
  },
  walletAward: (data) => {
    return axios.post('/wallet/award', data)
  },
  //我的團隊
  userMyteam: (data) => {
    return axios.post('/user/myteam', data)
  },
  userMysuperior: (data) => {
    return axios.post('/user/mysuperior', data)
  },
  //支付
  rechargePay: (data) => {
    return axios.post('/recharge/pay', data)
  },
  //會員繳費支付前獲取money接口
  orderIndex: (data) => {
    return axios.post('/order/index', data)
  },
  //續費升級
  walletRenew: (data) => {
    return axios.post('/wallet/renew', data)
  },


  //用户端api
  //授權
  H5AuthIndex: (data) => {
    return axios.post('/h5/auth/index', data)
  },
  //注册
  H5UserEnroll: (data) => {
    return axios.post('/h5/user/enroll', data)
  },
  //登录
  H5UserLogin: (data) => {
    return axios.post('/h5/user/login', data)
  },
  //验证码
  H5UserCode: (data) => {
    return axios.post('/h5/user/code', data)
  },
  //入会资料
  H5UserRegister: (data) => {
    return axios.post('/h5/user/register', data)
  },
  //我的信息
  H5UserMy: (data) => {
    return axios.post('/h5/user/my', data)
  },
  //修改信息
  H5UserModify: (data) => {
    return axios.post('/h5/user/modify', data)
  },
  //首頁
  H5IndexIndex: (data) => {
    return axios.post('/h5/index/index', data)
  },
  //訂單
  H5OrderIndex: (data) => {
    return axios.post('/h5/order/index', data)
  },
  H5OrderFulldate: (data) => {
    return axios.post('/h5/order/fulldate', data)
  },
  //訂單产品详情
  H5OrderDetail: (data) => {
    return axios.post('/h5/order/detail', data)
  },
  //預約
  H5OrderAppoint: (data) => {
    return axios.post('/h5/order/appoint', data)
  },
  //預約提交
  H5OrderSubscribe: (data) => {
    return axios.post('/h5/order/subscribe', data)
  },
  //支付
  H5RechargePay: (data) => {
    return axios.post('/h5/recharge/pay', data)
  },
  //支付明细
  H5OrderPaylog: (data) => {
    return axios.post('/h5/order/paylog', data)
  },
  //退款
  H5OrderRefund: (data) => {
    return axios.post('/h5/order/refund', data)
  },










}