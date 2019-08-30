/**
 * Created by admin on 2018/12/19.
 */
import Vue from 'vue'
import axios from 'axios';
export default{
  //
  userLogin: (data) => {
    return axios.post('/user/login', data)
  },
  indexIndex: (data) => {
    return axios.post('/index/index', data)
  },
  indexDetail: (data) => {
    return axios.post('/index/detail', data)
  },












}