<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fff;
  line-height: normal;
  font-size: inherit;

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
    padding: 0 .9em;
     /*line-height: 1.6rem;*/
    font-size: .65rem;
    }
  #app .Btn_Login{
    display: inline-block;
    padding: 0 .9em;
    /*line-height: 1.6rem;*/
    font-size: .9rem;
  }
  #app .weui-btn,.login_btn .weui-btn{
    border-radius: 3px;
  }
  #app .weui-btn_default ,.login_btn .weui-btn_default{
    background-color: #FFAF05;
    color: #fff;
  }
  #app .weui-btn_primary {
    background-color: #FFAF05;
  }
  #app .weui-btn:after,.login_btn .weui-btn:after{
    border: 0px solid rgba(0, 0, 0, 0.2);

  }
  #app .weui-cells:before{
      border-top: 0px solid #fff;
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
    color: #ffaf05;
  }
  #app .weui-input ,#app .weui-select{
    font-size: .7rem;
  }

</style>
