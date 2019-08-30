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
}

.clearF{
  clear: both;
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
#app .weui-input ,#app .weui-select{
  font-size: .7rem;
}
#app .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
  color: #ffaf05;
}
  .default_btn{
    margin: 3rem .8rem;
  }
.charge_box .charge_head{
  text-align: center;
  padding: 1rem 0rem;
}
.charge_box .charge_head{
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
}
.charge_box .charge_head .tit{
  font-size: 1.1rem;
}
.charge_box .charge_head .num{
  font-size: .8rem;
  padding-top: .8rem;
}
</style>
