<template>
    <div id="login_page">
        <div class="head_tit">
            <div class="logo"><img src="/static/img/hke_h5_logo.png" alt=""></div>
        </div>
        <div class="content">
            <group class="weui-cells_form">
                <x-input title="賬  號" v-model="account" type="number" placeholder="請輸入您的登入賬號" @on-blur="inputBlur"></x-input>
                <x-input title="密  碼" v-model="password" type="password" placeholder="請輸入您的登入密碼" @on-blur="inputBlur"></x-input>
            </group>
        </div>
        <div class="login_btn">
            <x-button class="bigBtn" @click.native="loginBtn" :disabled="dis_no" text="登     入"></x-button>
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
        account:'',
        password:'',
        dis_no:false
      }
    },
    mounted () {
      let that = this;
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
      document.querySelector('html').setAttribute('style', 'background-color:#fff;')
      that.$axios.defaults.headers.token = cookie.get('token');
    },
    methods: {
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
      loginBtn () {
        var that = this;
        if (that.account == '') {
          that.$dialog.toast({
            mes: '帳號不能為空',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        if (that.password == '') {
          that.$dialog.toast({
            mes: '密碼不能為空',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
//          that.dis_no = true
          that.$api.userLogin({
            u_mobilephone: that.account,
            u_password: that.password
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
                    cookie.set('login_state', 'yes', {expires: 30000, path: '/'})
                    that.$axios.defaults.headers.token = response.data.data.token
                    cookie.set('token', response.data.data.token, {
                      expires: 30000,
                      path: '/'
                    })
                    that.$router.push('/Home')
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

</style>
<style scoped lang="less" type="text/less">

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
            .logo{
                img{
                    width: 70%;
                }
            }
            .tit{
                font-size: .3rem;
                margin-top: 10px;
            }
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
