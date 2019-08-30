<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <keep-alive>
        <router-view v-if="$route.meta.keepAliveList"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAliveList"></router-view>
    <x-tabbar v-if="$route.meta.keepAlive"></x-tabbar>
  </div>
</template>

<script>
    import xTabbar from './components/common/tabbar'
    import {requireConfig} from '../static/js/wxshare'
    export default {
        name: 'app',
        components: {
            xTabbar
        },
      mounted() {
        let url = window.location.href
        requireConfig(url)
      }
    }
</script>

<style lang="less" type="text/less">
@import '~vux/src/styles/reset.less';
body {
  /*background: #fff;*/
  font-family: "PingFang SC";
  line-height: inherit;
  /*font-family: PingFang-SC-medium;*/
  color: #333;
}
html, body,#app{
  height: 100%;
}
option{
  font-weight: 400;
}
.bodyheight{
  height: auto;
}
.clearF{
  clear: both;
}
.header_tit .vux-header .vux-header-left{
  font-size: .75rem;
}
.floatL{
  float: left;
}
.floatR{
  float: right;
}
.text_algin_r{
  text-align: right;
}
.text_algin_l{
  text-align: left;
}
.text_algin_c{
  text-align: center;
}
.inline-block{
  display: inline-block;
}
#app{
  font-size: .8rem;
}
#app .weui-tabbar__icon{
  width: 25px;
  height: 25px;
}
#app .vux-tab .vux-1px-r:after{
  border-right: 0px solid #C7C7C7;
}
#app .weui-tabbar__icon img{
  width: 25px;
  height: 25px;
}
#app .weui-tabbar__item{
  /*padding: 6px 0;*/
}
#app .weui-tabbar__item .weui-tabbar__label{
  font-size: .5rem;
  position: relative;
  top: -3px;
  line-height: inherit;
  padding-top: 2px;
}
#app .weui-cells{
  /*padding: .6rem .1rem;*/
  margin-top:0px
}
#app .content .input_1 .weui-cells:before {
  border-top: 1px solid #e5e5e5;
}
#app .content .input_1 .weui-cell{
  /*padding: 21.5px 15px;*/
  height: 66px;
}
#app .content .weui-cells_form .weui-cell{
  /*padding: 16px 15px;*/
  height: 66px;
}
#app .weui-tabbar{
  background-color: #fff;
  position: fixed;
}
#app .weui-cells_form:first-child{
  border-top: 1px solid #e9e9e9;
}
#app .weui-btn_mini {
  display: inline-block;
  padding: .1rem .5rem;
  /*line-height: 1.6rem;*/
  font-size: .6rem;
}
#app .Btn_Login{
  display: inline-block;
  padding: 0 .9em;
  /*line-height: 1.6rem;*/
  font-size: .8rem;
}
#app .weui-btn,.login_btn .weui-btn{
  border-radius: 3px;
}
#app .weui-btn_default ,.login_btn .weui-btn_default{
  background-color: #3D82D9;
  color: #fff;
}
#app .weui-btn_primary {
  background-color: #3D82D9;
}
#app .weui-btn:after,.login_btn .weui-btn:after{
  border: 0px solid rgba(0, 0, 0, 0.2);

}
#app .weui-cells:before{
  border-top: none;
  height:0
}
#app .weui-tabbar__item.vux-tabbar-simple {
  padding: 0;
  height: 60px;
  line-height: 60px;
}
#app .vux-tabbar-simple .weui-tabbar__label {
  font-size: .7rem;
  line-height: 60px;
  border-right: 1px solid #e5e5e5;
}
#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #3D82D9;
}
#app .weui-input ,#app .weui-select{
  font-size: .7rem;
}
</style>
