<template>
  <div class="login_box">
    <div class="tit">登录流量管理平台</div>
    <div class="content">
      <group class="weui-cells_form">
        <x-input title="手机号" v-model="inputValue"  name="mobile" placeholder="请输入手机号码" keyboard="number" :max="11" ></x-input>
      </group>
      <group class="weui-cells_form">
        <x-input title="验证码"  v-model="verifyCode" keyboard="number"  placeholder="请输入验证码" :max="6" >
          <x-button slot="right" v-if="sendMsgDisabled" plain  mini disabled>{{time+'秒后获取'}}</x-button>
          <x-button slot="right" v-if="!sendMsgDisabled"   mini @click.native="send_msg">获取验证码</x-button>
        </x-input>
      </group>
    </div>
    <div class="default_btn">
      <x-button class="Btn_Login" @click.native="loginBtn" text="登  录"></x-button>
    </div>
  </div>
</template>

<script>
import {XInput,Group,XButton,cookie} from 'vux'

export default {
  components: {
      XInput,
      Group,
      XButton,
      cookie
  },
  data () {
    return {
        inputValue:'',
        verifyCode:'',
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false,
    }
  },
    created(){
        document.title = '登录'
    },
mounted(){
    this.$http.defaults.headers.token =cookie.get('token');
//    this.$http.defaults.headers.token ='d041adNGCqzaVfH5trxwAB80ZnTN3DZm1BNYFv1cgGLVwwq6Lac';
},
  methods:{

      send_msg () {
          var that = this;
          if(that.inputValue=='' || that.inputValue.length<11){
              that.$dialog.toast({
                  mes: '手机号为空或不正确！',
                  timeout: 1500,
                  icon: 'error'
              });
              return false
          }
          that.$http.post(this.apiurl+'/user/code', this.$qs.stringify(
              {
                  mobile_phone:that.inputValue
              }
          ))
              .then(function (response) {
                  console.log(response);
                  if(response.data.err==1){
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'success'
                      });
                      let me = that;
                      me.sendMsgDisabled = true;
                      let interval = window.setInterval(function() {
                          if ((me.time--) <= 0) {
                              me.time = 60;
                              me.sendMsgDisabled = false;
                              window.clearInterval(interval);
                          }
                      }, 1000);
                  }else{
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'error'
                      });
                  }

              })
              .catch(function (response) {
                  console.log(response);
                  that.$dialog.toast({
                      mes: response.data.msg,
                      timeout: 1500,
                      icon: 'error'
                  });
              });



      },

      loginBtn () {
          var that = this;
          that.$http.post(this.apiurl+'/user/bind', this.$qs.stringify(
              {
                  mobile_phone:that.inputValue,
                  code:that.verifyCode
              }
          ))
              .then(function (response) {
                  console.log(response);
                  if(response.data.err==1){
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'success'
                      });
                      cookie.set('login_state', 'yes', {
                          expires: 30
                      })
                      setTimeout(function () {
                          that.goBeforeLoginUrl()
                      },2000)
                  }else{
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'error'
                      });
                  }

              })
              .catch(function (response) {
                  that.$dialog.toast({
                      mes: response.data.msg,
                      timeout: 1500,
                      icon: 'error'
                  });
                  console.log(response.data.msg);
              })

      }
  }

}
</script>
<style>
  #app .weui-cell {
    padding: .6rem 1rem ;
    margin-top: 0px;
  }
  .login_box .tit{
    padding-top:3rem;
    padding-bottom:2rem;
    text-align: center;
    font-size: 1rem;
  }
  /*#app .login_box .weui-cells_checkbox:after{*/
  /*border-bottom: 0px solid #fff;*/
  /*}*/
  #app .content .weui-cells:before{
    border-top: 0px solid #fff;
  }
  #app .weui-cells_form:first-child {
    border-top: 0px solid #e9e9e9;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:nth-child(1){
  border-top: 1px solid #e5e5e5;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:after{
  border-bottom: 0px solid #fff;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:before{
    left: 0px;
  }

</style>
