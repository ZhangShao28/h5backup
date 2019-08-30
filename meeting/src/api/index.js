/**
 * Created by admin on 2018/12/19.
 */
import Vue from 'vue'
import axios from 'axios';
export default{
  // 登陆
  userLogin: (data) => {
    return axios.post('/user/login', data)
  },
  userCode: (data) => {
    return axios.post('/user/code', data)
  },
  userInfo: (data) => {
    return axios.post('/user/info', data)
  },
  // 授权
  authIndex: (data) => {
    return axios.post('/auth/index', data)
  },
  // 入会申请
  admissionList: (data) => {
    return axios.post('/admission/list', data)
  },
  admissionIndex: (data) => {
    return axios.post('/admission/index', data)
  },
  admissionApply: (data) => {
    return axios.post('/admission/apply', data)
  },
  admissionDetail: (data) => {
    return axios.post('/admission/detail', data)
  },
  //支付接口
  rechargePay: (data) => {
    return axios.post('/recharge/pay', data)
  },
  //会议
  meetingIndex: (data) => {
    return axios.post('/meeting/index', data)
  },
  meetingAttended: (data) => {
    return axios.post('/meeting/attended', data)
  },
  meetingModify: (data) => {
    return axios.post('/meeting/modify', data)
  },
  meetingDetail: (data) => {
    return axios.post('/meeting/detail', data)
  },
//我的信息
  userProperty: (data) => {
    return axios.post('/user/property', data)
  },
  userMy: (data) => {
    return axios.post('/user/my', data)
  },
  userModify: (data) => {
    return axios.post('/user/modify', data)
  },
  //修改手机号
  userModifyphone: (data) => {
    return axios.post('/user/modifyphone', data)
  },
  //删除协会
  admissionDelete: (data) => {
    return axios.post('/admission/delete', data)
  },
  userMyinfo: (data) => {
    return axios.post('/user/myinfo', data)
  },
  userSearch: (data) => {
    return axios.post('/user/search', data)
  },
  //新闻
  newsIndex: (data) => {
    return axios.post('/news/index', data)
  },
  newsShare: (data) => {
    return axios.post('/news/share', data)
  },
  newsDetail: (data) => {
    return axios.post('/news/detail', data)
  }
}