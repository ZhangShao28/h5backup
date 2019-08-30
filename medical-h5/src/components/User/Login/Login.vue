<script src="../../../../meeting/dist/static/js/app.3c211e4ca9bf5af359f7.js"></script>
<template>
    <div id="login_page">
        <div class="head_tit">
            <!--恒高分销系统-->
            <img src="/static/img/logoh5.svg" alt="" v-if="system_type==2">
            <img src="/static/img/zk_ic_logo.svg" alt="" v-if="system_type==1">
        </div>

        <div class="content">
            <!--<group class="input_1">-->
            <!--<x-input title="手機號 852-" label-width="4.5rem" v-model="inputValue"  name="mobile" placeholder="請輸入手機號" keyboard="number" :max="11" ></x-input>-->
            <!--</group>-->
            <div class="input_1" v-if="loginType==1||loginType==3">
                <!--<span class="phone-title">手機號</span>-->
                <el-input placeholder="請輸入手提電話" v-model="inputValue" id="mobile-phone" pattern="[0-9]*"
                          keyboard="number" type="number" name="mobile">
                    <img v-for="(item,index) in country_icon" :key="index" v-if="index == country_id" slot="prepend"
                         class="country_icon" :src="item.img_url" alt="">
                    <el-select v-model="selvalue" slot="prepend" @change="changes">
                        <el-option class="selectBox"
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            <span style="float: left" v-html="item.icon+item.label"></span>
                        </el-option>
                    </el-select>
                </el-input>
            </div>
            <group class="weui-cells_form"  v-if="loginType==1||loginType==3">
                <x-input title="驗證碼 " v-model="verifyCode" keyboard="number" placeholder="請輸入驗證碼" :max="4" @on-blur="inputBlur">
                    <x-button slot="right" class="dissmallBtn" v-if="sendMsgDisabled" plain mini disabled>{{time+'秒後獲取'}}</x-button>
                    <x-button slot="right" class="smallBtn" v-if="!sendMsgDisabled" mini @click.native="send_msg">獲取驗證碼</x-button>
                </x-input>
            </group>
            <group class="weui-cells_form" v-if="loginType==3">
                <x-input title="登入密碼" v-model="u_password1" type="password" placeholder="請輸入登入密碼"></x-input>
                <x-input title="重複密碼" v-model="u_password2" type="password" placeholder="請再次輸入登入密碼" @on-blur="inputBlur"></x-input>
            </group>
            <group class="weui-cells_form" v-if="loginType==2">
                <x-input title="手提電話" v-model="inputValue" type="number" placeholder="請輸入手提電話"></x-input>
                <x-input title="登入密碼" v-model="u_password" type="password" placeholder="請輸入登入密碼" @on-blur="inputBlur"></x-input>
            </group>
            <div class="clause" v-if="loginType==3">
                <check-icon :value.sync="selected_clause">註冊表示您同意</check-icon> <router-link to="/Clause"><span style="color: #238BFF" >《註冊條款》</span></router-link>及<router-link to="/ClauseTwo"><span style="color: #238BFF" >《私隱政策聲明》</span></router-link>
            </div>
        </div>
        <div class="login_btn" v-if="loginType==3">
            <x-button class="bigBtn" @click.native="registerBtn" :disabled="regdis_no" text="注     冊"></x-button>
        </div>
        <div class="login_btn" v-else>
            <x-button class="bigBtn" @click.native="loginBtn" :disabled="dis_no" text="登     入"></x-button>
            <x-button class="bigBtn registerBtn" @click.native="registerSwitch" text="注     冊"></x-button>
        </div>
        <div class="loginSwitch" @click="switchBtn">
            {{switchText}}
        </div>
    </div>
</template>
<script>
  import { XHeader, XInput, Group, XButton, Cell, Toast, cookie, CheckIcon } from 'vux'
  export default {
    name: 'Login',
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
      CheckIcon
    },
    data () {
      return {
        system_type:'',//1为演示name2为正式
        selected_clause: false,
        loginType:'2',//1為驗證碼2為默認密碼登入3為注冊
        switchText:'短信驗證碼登入',
        u_password1:'',//注冊密碼1
        u_password2:'',//注冊密碼2
        u_password:'',//登入密碼
        regdis_no:false,
        options: [{
          value: '852',
          label: '852',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_hk.png" alt="">'
        }, {
          value: '853',
          label: '853',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_am.png" alt="">'
        }, {
          value: '86',
          label: '86',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_china.png" alt="">'
        }],
        country_icon: [
          {
            img_url: '/static/img/ic_login_hk.png'
          }, {
            img_url: '/static/img/ic_login_china.png'
          }, {
            img_url: '/static/img/ic_login_am.png'
          },
        ],
        country_id: '0',
        selvalue: '852',
        dis_no: false,
        inputValue: '',
        verifyCode: '',
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false,
      }
    },
    mounted () {
      let uquid = window.location.href.split('?uquid=')[1];
      let that = this,  LT_state = cookie.get('userloginType');
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
      that.$axios.defaults.headers.ctoken = cookie.get('ctoken');
      that.getName()
      that.dis_no = false
      if(LT_state==3){
        that.loginType=3
        that.switchText='返回登入頁'
        that.regdis_no=false
      }else{
        cookie.remove('userloginType')
        console.log(LT_state)
      }
      if(uquid){
        let millisecond = new Date().getTime(),expiresTime = new Date(millisecond + 60 * 1000 * 30);
        cookie.set('uquid', uquid, {expires: expiresTime, path: '/'})
        that.loginType=3
        that.switchText='返回登入頁'
        that.regdis_no=false
        cookie.set('userloginType', '3', {path: '/'})
      }else{
      }
    },
    methods: {
      getName(){
        let that = this;
        that.$api.userSystem({

        })
          .then(res=>{
            if(res.data.state==1){
              console.log(res.data.data)
              that.system_type = res.data.data.system_type
                if(res.data.data.system_type==1){
                    document.title='智康醫療直銷平臺'
                    cookie.set('h5_name', '智康醫療直銷平臺', {expires: 30000, path: '/'})
                }else{
                    document.title='恒高尊尚會'
                    cookie.set('h5_name', '恒高尊尚會', {expires: 30000, path: '/'})
                }
            }
          })
          .catch(res=>{

          })
      },
      inputBlur () {
        // window.scroll(0, 0);
        setTimeout(() => {
          // alert(1);
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
          }
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
            this.valRes = 'ios';
          } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
            this.valRes = 'android';
          }
          if (this.valRes === 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 10);
      },
      switchBtn(){
        let that = this
        that.inputValue=''
        that.u_password=''
        that.u_password1=''
        that.u_password2=''
        that.verifyCode=''
        if(that.loginType==1){
          that.loginType=2
          that.switchText='短信驗證碼登入'
        }else if(that.loginType==2){
          that.loginType=1
          that.switchText='密碼登入'
        }else{
          that.loginType=2
          that.switchText='短信驗證碼登入'
          cookie.remove('userloginType')
        }
      },
      registerSwitch(){
        this.loginType=3
        this.switchText='返回登入頁'
        this.regdis_no=false
        cookie.set('userloginType', '3', {path: '/'})
      },
      registerBtn(){//注冊
        let that = this;
        if (that.selected_clause) {
          if (that.inputValue == '') {
            that.$dialog.toast({
              mes: '手提電話不能為空！',
              timeout: 1500,
              icon: 'error'
            })
            return false
          }
          if(that.u_password1==''){
            that.$dialog.toast({
              mes: '登入密碼不能為空！',
              timeout: 1500,
              icon: 'error'
            })
            return false;
          }else{
            if(that.u_password1!=that.u_password2){
              that.$dialog.toast({
                mes: '兩次登陸密碼輸入不一致！',
                timeout: 1500,
                icon: 'error'
              })
              return false;
            }
          }
          that.regdis_no=true
          that.$api.H5UserEnroll({
            mobile_phone: that.inputValue,
            password:that.u_password1,
            identify_code:that.verifyCode
          })
            .then(function (response) {
              console.log(response)
              if (response.data.state == 1) {
                that.regdis_no=false
                that.$dialog.toast({
                  mes: response.data.msg,
                  timeout: 1500,
                  icon: 'success',
                  callback: () => {
                    that.loginType=2
                    that.switchText='短信驗證碼登入'
                    that.u_password=''
                    that.u_password1=''
                    that.u_password2=''
                    that.inputValue=''
                    that.verifyCode=''
                    cookie.remove('userloginType')
                  }
                })
              }else{
                that.$dialog.toast({
                  mes: response.data.msg,
                  timeout: 1500,
                  icon: 'error',
                  callback: () => {
                    that.regdis_no=false
                  }
                })
              }
            })
            .catch(function (response) {
              that.regdis_no=false
            })
        }else{
          that.$dialog.toast({
            mes: '您未同意註冊條款',
            timeout: 1000,
            icon: 'error',
            callback: () => {
              that.regdis_no = false//可以点击
            }
          })
        }
      },
      changes(el){
        var that = this
        that.selvalue = el
        if (el == 852) {//香港
          that.country_id = 0
        } else if (el == 86) {//大陆
          that.country_id = 1
        } else if (el == 853) {//澳门
          that.country_id = 2
        }
      },
      send_msg () {
        var that = this,type='';
        console.log(this.loginType)
        if(this.loginType==3){
          type=1
        }else{
          type=2
        }
        if (that.inputValue == '') {
          that.$dialog.toast({
            mes: '手提電話不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        that.sendMsgDisabled = true
        that.$api.H5UserCode({
            type:type,
            country_code: that.selvalue,
            mobile_phone: that.inputValue
          })
          .then(function (response) {
            console.log(response)
            if (response.data.state == 1) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'success',
                callback: () => {
                  let me = that
                  me.sendMsgDisabled = true
                  let interval = window.setInterval(function () {
                    if ((me.time--) <= 0) {
                      me.time = 60
                      me.sendMsgDisabled = false
                      window.clearInterval(interval)
                    }
                  }, 1000)
                }
              })

            } else {
              that.sendMsgDisabled = false
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error'
              })
            }

          })
          .catch(function (response) {
            that.sendMsgDisabled = true
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      loginBtn () {
        let that = this
//        that.$router.push('/UserHome')
        console.log(that.loginType,that.inputValue,that.verifyCode)
          if (that.loginType == 1&&that.inputValue == '') {
            that.$dialog.toast({
              mes: '手提電話不能為空！',
              timeout: 1500,
              icon: 'error'
            })
            return false
          }
            if (that.loginType == 2&&that.u_password == '') {
              that.$dialog.toast({
                mes: '登入密碼不能爲空',
                timeout: 1500,
                icon: 'error',
                callback: () => {
                }
              })
              return false
            }
        if(that.loginType==3&&!that.selected_clause){
          that.$dialog.toast({
            mes: '您未同意註冊條款',
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
          that.dis_no = true
          that.$api.H5UserLogin({
            mobile_phone: that.inputValue,
            identify_code: that.verifyCode,
            type: that.loginType,
            password: that.u_password
          })
            .then(function (response) {
              console.log(response)
              if (response.data.state == 1) {
                that.dis_no = true//禁止点击
                that.$dialog.toast({
                  mes: response.data.msg,
                  timeout: 1500,
                  icon: 'success',
                  callback: () => {
                    cookie.set('user_login_state', 'yes', {expires: 30000, path: '/'})
                    that.$axios.defaults.headers.ctoken = response.data.data.token
                    cookie.set('ctoken', response.data.data.token, {
                      expires: 30000,
                      path: '/'
                    })
                    if (response.data.data.is_register == '0') {
                      that.$router.push('/UserApplyMember')
                    } else {
                      that.$router.push('/UserHome')
                    }
                  }
                })
              } else {
                that.$dialog.toast({
                  mes: response.data.msg,
                  timeout: 1500,
                  icon: 'error',
                  callback: () => {
                    that.dis_no = false//可以点击
                  }
                })
              }

            })
            .catch(function (response) {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {
                  that.dis_no = false//可以点击
                }
              })
            })
      }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
      document.querySelector('html').setAttribute('style', 'background-color:#fff;')
    },

    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
      document.querySelector('html').removeAttribute('style')
    }
  }
</script>
<style lang="less" type="text/less">
    #login_page{
    input {
        font: inherit;
    }
    .input_1 .el-select .el-input__inner {
        text-align: center;
    }
    .el-input-group {
        width: 100%;
        padding: 0 30px;
    }
    .el-input__inner::placeholder {
        color: #999;
    }
    .el-input__inner {
        line-height: 24px;
        border-radius: 0;
        border-top: none;
        /*border-bottom: 1px solid #e5e5e5;*/
        border-left: none;
        border-right: none;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 10px;
    }
    .el-select .el-input__inner {
        text-shadow: 0 0 0 #f8f8f8;
        -moz-user-select: none;
        -webkit-user-select: none;
        padding-left: 0px;
    }
    .el-select-dropdown__item.selected {
        color: #333;
    }
    .el-select-dropdown__item {
        font-size: 15px;
        padding: 0 14px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .el-select-dropdown__item {
        border-bottom: 0.5px solid #e5e5e5;
    }
    .el-select-dropdown__item:last-child {
        border-bottom: none;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus {
        border-color: #e1e1e1;
    }
    .el-input__inner {
        color: #333;
    }
    .el-input-group__append {
        border-bottom: none;
    }
    .el-input-group__prepend {
        border-bottom: 1px solid #e5e5e5;
        padding: 0px 20px 0px 5px;
    }
    .el-input__inner:hover{
        border-color: #e5e5e5;
    }
    .el-input-group__append, .el-input-group__prepend {
        border-radius: 0;
        border-top: none;
        border-left: none;
        /*border-right:1px solid #f1f1f1;*/
        border-right: none;
        background-color: #fff;
        color: #333;

    }
    .el-input__suffix {
        border-right: 1px solid #f1f1f1;
        height: 60%;
        top: 12px;
    }
    .el-select .el-input {
        width: 95px;
        font-size: 17px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .el-select-dropdown__list {
        padding: 0;
    }
    .content .clause .weui-icon {
        font-size: 16px;
    }
    .content .clause .vux-check-icon > span {
        color: #666;
    }
    .content .clause .weui-icon:before {
        margin-right: 0px;
    }
    }
</style>
<style scoped lang="less" type="text/less">
    .country_icon {
        position: relative;
        top: -2px;
        width: 18px;
        margin-right: 2px;
    }
    /*body #app #login_page {*/
        /*height: 100%;*/
    /*}*/
    #login_page {
        padding-bottom: 20px;
        .registerBtn{
            background: #fff;
            color: #666;
            margin-top: 10px;
        }
        .loginSwitch{
            text-align: center;
            color: #238bff;
            font-size: .28rem;
            margin: 10px auto;
        }
        .head_tit {
            text-align: center;
            padding-top: 1.5rem;
            font-size: .5rem;
            img {
                /*width: 195px;*/
                width: 50%;
            }
        }
        .content {
            margin-top: 1rem;
            .clause {
                font-size: .24rem;
                padding: 10px 30px;
            }
            .input_1 {
                .phone-title {
                    position: absolute;
                    height: 66px;
                    left: 15px;
                    line-height: 66px;
                }

            }
            .weui-cells_form {
                .weui-cell:before{
                    left: 0;
                }
                padding: 0 30px;
                .weui-cell{
                    padding: 0px;
                }
            }
        }
        .login_btn {
            margin: .5rem 0 .3rem 0;
        }
        .content .weui-icon-clear:before {
            margin-bottom: 0.4rem;
        }
    }
</style>
