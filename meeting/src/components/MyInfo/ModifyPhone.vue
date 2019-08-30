<template>
    <div id="modify_page">
        <div class="head_tit">
            <div>當前綁定手機號碼：{{mobilephone}}</div>
            <div>修改手機號后需要重新登陸</div>
        </div>
        <div class="content">
            <div class="input_1">
                <!--<span class="phone-title">手機號</span>-->
                <el-input placeholder="請輸入修改的號碼" v-model="inputValue" id="mobile-phone" pattern="[0-9]*"
                          keyboard="number" type="number" name="mobile">
                    <img v-for="(item,index) in country_icon" :key="index" v-if="index == country_id" slot="prepend"
                         class="country_icon" :src="item.img_url" alt="">
                    <el-select v-model="selvalue" slot="prepend" @change="changes">
                        <el-option
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
            <group class="weui-cells_form">
                <x-input title="驗證碼" v-model="verifyCode" keyboard="number" placeholder="請輸入驗證碼" :max="4">
                    <x-button slot="right" v-if="sendMsgDisabled" plain mini disabled>{{time+'秒後獲取'}}</x-button>
                    <x-button slot="right" v-if="!sendMsgDisabled" mini @click.native="send_box">獲取驗證碼</x-button>
                </x-input>
            </group>
        </div>
        <div class="login_btn">
            <x-button class="Btn_Login" @click.native="ModifyBtn" :disabled="dis_no" text="修     改"></x-button>
        </div>
        <div v-transfer-dom>
            <confirm v-model="show"
                     :title="title"
                     :content="content"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm"
                     confirm-text="確認"
                     cancel-text="取消">
            </confirm>
        </div>
    </div>
</template>
<script>
  import {
    XHeader,
    XInput,
    Group,
    XButton,
    Cell,
    Toast,
    cookie,
    CheckIcon,
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
      CheckIcon,
      Confirm
    },
    data () {
      return {
        show: false,
        title: '確認手機號碼',
        content: '',
        selected_clause: true,
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
        mobilephone: ''
      }
    },
    mounted () {
      this.mobilephone = this.$route.query.mobilephone
      this.$axios.defaults.headers.token = cookie.get('token')
      this.dis_no = false
    },
    methods: {
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
      send_box () {
        var that = this
        if (that.inputValue == '') {
          that.$dialog.toast({
            mes: '手提電話不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        this.content = '我們將發送驗證碼到這個號碼：<br>' + that.inputValue
        this.show = true

      },
      onCancel () {
      },
      onConfirm (el) {
        this.sendMsg()
      },
      sendMsg(){
        var that = this
        that.sendMsgDisabled = true
        that.api.userCode({
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
      ModifyBtn () {
        var that = this
        if (that.inputValue == '') {
          that.$dialog.toast({
            mes: '手提電話不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.verifyCode == '') {
          that.$dialog.toast({
            mes: '驗證碼不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        that.api.userModifyphone({
            mobile_phone: that.inputValue,
            identify_code: that.verifyCode
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
                  cookie.remove('login_id')
                  cookie.remove('login_state')
                  cookie.remove('token')
                  setTimeout(() => {
                    that.$router.push({path: '/Login', query: {cid: cookie.get('cid')}})
                  }, 500)
                }
              })
            } else {
              that.dis_no = false//可以点击
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error'
              })
            }

          })
          .catch(function (response) {
            that.dis_no = false//可以点击
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      }
    },
    created(){
      document.body.setAttribute('class', '')
    }
  }
</script>
<style>
    input {
        font: inherit;

    }
    .weui-cells:before {
        border-top: none;
    }
    .input_1 .el-select .el-input__inner {
        text-align: center;
    }
    #app #modify_page .content .weui-cells_form .weui-cell {
        height: 55px;
    }
    #app #modify_page .weui-btn_mini {
        padding: 0px .5rem;
    }
    .el-input-group {
        width: 100%;
        /*left: 75px;*/
        padding: 0 30px;
    }
    .el-input__inner::placeholder {
        color: #999;
    }
    .el-input__inner {
        height: 55px;
        line-height: 24px;
        border-radius: 0;
        border-top: none;
        border-bottom: 1px solid #e5e5e5;
        border-left: none;
        border-right: none;
        font-size: 17px;
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
        height: 40px;
        line-height: 40px;
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
        height: 70%;
        top: 10px;
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
    .content .clause .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
        color: #3D82D9;
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
</style>
<style scoped lang="less" type="text/less">
    .country_icon {
        position: relative;
        top: -2px;
        width: 18px;
        margin-right: 2px;
    }
    /*body,html{*/
    /*height: auto;*/
    /*}*/
    body #app #modify_page {
        background: #fff;
        height: 100%;
    }
    #modify_page {

        .head_tit {
            padding-top: 1rem;
            padding-bottom: 1rem;
            text-align: center;
            font-size: .6rem;
            border-bottom: 1px solid #ededed;
            color: #666;
            img {
                width: 195px;
            }
        }
        .content {
            .clause {
                font-size: .6rem;
                padding: 10px 30px;
            }
            .input_1 {
                .phone-title {
                    position: absolute;
                    height: 55px;
                    left: 15px;
                    line-height: 55px;
                }
                .weui-cell__hd {
                    /*.weui-label{*/
                    /*width: 6rem;*/
                    /*}*/
                }
            }
            .weui-cells_form {
                padding: 0 30px;
                .weui-cell {
                    padding: 10px 0px;
                }
            }
        }
        .login_btn {
            margin: 5rem .8rem 0 .8rem;
        }
        .content .weui-icon-clear:before {
            margin-bottom: 0.4rem;
        }
    }
</style>
