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
//  import xTabbar from './components/common/tabbar'
//  import {requireConfig} from './config/wxshare'
  export default {
    name: 'app',
//    components: {
//      xTabbar
//    },
    mounted() {
      let url = window.location.href
//      requireConfig(url)
    }
  }
</script>

<style lang="less" type="text/less">
  @import '~vux/src/styles/reset.less';
  html{
    background: #f5f5f5;
  }
  body {
    font-family: "PingFang SC";
    color: #333;
    font-size: .24rem;
    background: #f5f5f5;
    line-height: 1.5;
    .weui-dialog__ft{
      font-size: .34rem;
    }
    .weui-dialog__btn_primary{
      color: @themeColor;
    }
  }
  .yd-dialog-black-mask, .yd-dialog-white-mask{
    z-index: 20000;
  }
  #app{
    .no_data .title{
      text-align: center;
      font-size: .3rem;
    }
    ._color{
      color: @themeColor;
    }
    input {
      font-size: .3rem;
    }
    .weui-label{
      font-size: .34rem;
    }
    .vux-x-input .vux-input-icon{
      font-size: 15px;
    }
    .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before{
      font-size: 15px;
    }
    .tabBox{
      height: 44px;
      position: fixed;
      width: 100%;
      z-index: 100
    }
    .more{
      width: 22px;
      position: absolute;
      right: 0px;
      top: -1px;
    }
    .weui-btn:after{
      border: none;
    }
    button.bigBtn{
      background: @themeColor;
      border-radius:.08rem;
      width: 90%;
      margin: 0 auto;
      color: #fff;
      font-size: .3rem;
      height: .88rem;
      line-height: .88rem;
      box-shadow:0px 4px 8px rgba(0,28,59,0.16);
    }
    button.smallBtn{
      background: @themeColor;
      border-radius:.08rem;
      margin: 0 auto;
      color: #fff;
      font-size: .28rem;
      padding: 3px 10px;
    }
    button.dissmallBtn{
      background: #D4D4D4;
      border-radius:.08rem;
      margin: 0 auto;
      color: #fff;
      font-size: .28rem;
      padding: 3px 10px;
      border: none;
    }
    .fixedBtn{
      text-align: center;
      font-size: .3rem;
      position: fixed;
      z-index: 2;
      width: 100%;
      color: @themeColor;
      background: #fff;
      bottom: 0px;
      left:0;
      height: 1.3rem;
      line-height: 1.3rem;
      border: 1px solid #e5e5e5;
      box-shadow: 0 0 2px 0px #e5e5e5;
    }
    //覆盖第三方样式
    .vux-tab-wrap {
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

      .vux-tab .vux-tab-item.vux-tab-selected {
        color: @themeColor;
        border-bottom: 3px solid @themeColor;
      }

      .vux-tab-ink-bar {
        background-color: @themeColor;
        width: 55px;
        margin: 0 auto;
      }

      .vux-tab .vux-tab-item {
        font-size: .3rem;
      }

    }
    .weui-cells:before{
      border-top: none;
    }
    input::placeholder {
      color: #999;
    }
    .weui-cells{
      margin-top: 0px;
    }
    .weui-cell{
      padding: 18px 15px;
    }
    #login_page,#modify_page{
      font-size: .32rem;
      input{
        height: 66px;
        font-size: .28rem;
      }
      .el-input.el-input--suffix .el-input__inner{
        font-size: .32rem;
      }
      .el-select{
        border: none;
      }
      .el-select>.el-input{
        border: none;
      }
    }
    .content .clause .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
      color: @themeColor;
    }
  }

</style>
