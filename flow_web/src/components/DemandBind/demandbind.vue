<template>
  <div class="login_box">
    <div class="tit"> 您的卡需绑定真实用户</div>
    <checklist ref="demoObject" :options="objectList" :max="1" v-model="objectListValue" @on-change="change"></checklist>
    <div class="content" v-show="show_no">
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
      <x-button class="Btn_Login" @click.native="bind_card" text="绑  定"></x-button>
    </div>
  </div>
</template>

<script>
import {Checklist,XInput,Group,XButton} from 'vux'

export default {
  components: {
      Checklist,
      XInput,
      Group,
      XButton
  },
  data () {
    return {
        objectList: [
            {key: '1', value: '绑定我的手机号'},
            {key: '2', value: '绑定其他手机号'}
            ],
        objectListValue: ['1'],
        inputValue:'',
        verifyCode:'',
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false,
        show_no:false,
        m_type:'',
        mobile:'',
        card_no:''
    }
  },
    created(){
        document.title = '绑定流量卡'
    },
    mounted(){
        var that = this
        that.$http.post(this.apiurl+'/flowcard/search', this.$qs.stringify(
            {

            }
        )).then(function (response) {
            console.log(response)
            that.mobile = response.data.data.mobile
            that.objectList[0].value='绑定我的手机号    '+ response.data.data.mobile
        })
          .catch(function (response) {

          })
    },
  methods:{

      change (key) {
          console.log(key[0],this.mobile)
          if(key[0]==1){
            this.show_no=false
            this.m_type=1
          }else if(key[0]==2){
              this.show_no=true
              this.m_type=2
          }
      },
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

      search () {
              var that = this;
              that.$http.post(this.apiurl+'/flowcard/search', this.$qs.stringify(
                  {
//                      card_no:'m005975'
                      card_no:that.card_no
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
      bind_card(){
          var that = this,mobile_phone='';

          if(that.m_type==1){
              mobile_phone = that.mobile

          }else if(that.m_type==2){
              mobile_phone = that.inputValue
              if(that.inputValue=='' || that.inputValue.length<11){
                  that.$dialog.toast({
                      mes: '手机号不正确！',
                      timeout: 1500,
                      icon: 'error'
                  });
                  return false
              }
          }
          console.log(that.verifyCode,that.inputValue,that.m_type,mobile_phone)
          that.$http.post(this.apiurl+'/flowcard/bind', this.$qs.stringify(
              {
//                  card_no:'m005975',
                  card_no:that.card_no,
                  mobile_phone:mobile_phone,
                  type:that.m_type,
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
                      setTimeout(function () {
                          that.$router.push({
                              path: '/DemandResult',
                              name: 'DemandResult',
                              params: {
                                  card_no: that.card_no,
                              }
                          })
                      },1500)
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

  },
    computed: {
        getParams () {
            // 取到路由带过来的参数
            let routerParams = this.$route.params,
                card_no = routerParams.card_no
            this.card_no = card_no
            console.log(card_no)
        }
    },
    watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
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
