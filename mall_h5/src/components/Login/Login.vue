<template>
  <div id="login_page">
    <!--<div class="head_tit">-->
    <!--<div>蘭蔻商城</div>-->
    <!--<div class="tit">綁定手提電話</div>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="input_1">-->
    <!--<el-input placeholder="請輸入手提電話" v-model="inputValue" id="mobile-phone" pattern="[0-9]*"-->
    <!--keyboard="number" type="number" name="mobile">-->
    <!--<img v-for="(item,index) in country_icon" :key="index" v-if="index == country_id" slot="prepend"-->
    <!--class="country_icon" :src="item.img_url" alt="">-->
    <!--<el-select v-model="selvalue" slot="prepend" @change="changes">-->
    <!--<el-option class="selectBox"-->
    <!--v-for="item in options"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
    <!--<span style="float: left" v-html="item.icon+item.label"></span>-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-input>-->
    <!--</div>-->
    <!--<group class="weui-cells_form">-->
    <!--<x-input title="中文姓名" v-model="username_zh" type="text" placeholder="請輸入您的中文姓名" @on-blur="inputBlur"></x-input>-->
    <!--<x-input title="英文姓名" v-model="username_en" type="text" placeholder="請輸入您的英文姓名" @on-blur="inputBlur"></x-input>-->
    <!--</group>-->
    <!--</div>-->
    <!--<div class="login_btn">-->
    <!--<x-button class="bigBtn" @click.native="loginBtn" :disabled="dis_no" text="登     入"></x-button>-->
    <!--</div>-->
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
  CheckIcon
} from "vux";
export default {
  name: "Login",
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
  data() {
    return {
      system_type: "", //1为演示name2为正式
      selected_clause: false,
      loginType: "2", //1為驗證碼2為默認密碼登入3為注冊
      switchText: "短信驗證碼登入",
      username_en: "", //登入密碼
      username_zh: "", //登入密碼
      regdis_no: false,
      options: [
        {
          value: "852",
          label: "852",
          icon:
            '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_hk.png" alt="">'
        },
        {
          value: "853",
          label: "853",
          icon:
            '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_am.png" alt="">'
        },
        {
          value: "86",
          label: "86",
          icon:
            '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_china.png" alt="">'
        }
      ],
      country_icon: [
        {
          img_url: "/static/img/ic_login_hk.png"
        },
        {
          img_url: "/static/img/ic_login_china.png"
        },
        {
          img_url: "/static/img/ic_login_am.png"
        }
      ],
      country_id: "0",
      selvalue: "852",
      dis_no: false,
      inputValue: "",
      verifyCode: "",
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false
    };
  },
  mounted() {
    let that = this,
      LT_state = cookie.get("loginType");
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#fff;");
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#fff;");
    that.$axios.defaults.headers.token = cookie.get("token");
  },
  methods: {
    inputBlur() {
      // window.scroll(0, 0);
      setTimeout(() => {
        // alert(1);
        if (
          document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA"
        ) {
          return;
        }
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          // 判断iPhone|iPad|iPod|iOS
          this.valRes = "ios";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          // 判断Android
          this.valRes = "android";
        }
        if (this.valRes === "ios") {
          document.activeElement.scrollIntoViewIfNeeded(true);
        }
      }, 10);
    },
    changes(el) {
      var that = this;
      that.selvalue = el;
      if (el == 852) {
        //香港
        that.country_id = 0;
      } else if (el == 86) {
        //大陆
        that.country_id = 1;
      } else if (el == 853) {
        //澳门
        that.country_id = 2;
      }
    },
    loginBtn() {
      var that = this,
        domain = cookie.get("mallmer").split("=")[1];
      if (that.inputValue == "") {
        that.$dialog.toast({
          mes: "手提電話不能為空！",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }
      if (that.username_zh == "") {
        that.$dialog.toast({
          mes: "中文姓名不能爲空",
          timeout: 1500,
          icon: "error",
          callback: () => {}
        });
        return false;
      }
      if (that.username_en == "") {
        that.$dialog.toast({
          mes: "英文姓名不能爲空",
          timeout: 1500,
          icon: "error",
          callback: () => {}
        });
        return false;
      }
      that.dis_no = true;
      that.$api
        .userLogin({
          u_mobilephone: that.inputValue,
          identify_code: that.verifyCode,
          type: that.loginType,
          u_password: that.u_password
        })
        .then(function(response) {
          console.log(response);
          if (response.data.state == 1) {
            that.dis_no = true; //禁止点击
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: "success",
              callback: () => {
                cookie.set("login_state", "yes", { expires: 30000, path: "/" });
                that.$axios.defaults.headers.token = response.data.data.token;
                cookie.set("token", response.data.data.token, {
                  expires: 30000,
                  path: "/"
                });
                that.$router.push("/Home?domain=" + domain);
              }
            });
          } else {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: "error",
              callback: () => {
                that.dis_no = false; //可以点击
              }
            });
          }
        })
        .catch(function(response) {
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            icon: "error",
            callback: () => {
              that.dis_no = false; //可以点击
            }
          });
        });
    }
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#fff;");
    document
      .querySelector("html")
      .setAttribute("style", "background-color:#fff;");
  },

  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
    document.querySelector("html").removeAttribute("style");
  }
};
</script>
<style lang="less" type="text/less">
#login_page {
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
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
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
  .el-input__inner:hover {
    border-color: #e5e5e5;
  }
  .el-input-group__append,
  .el-input-group__prepend {
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
  .registerBtn {
    background: #fff;
    color: #666;
    margin-top: 10px;
  }
  .loginSwitch {
    text-align: center;
    color: #238bff;
    font-size: 0.28rem;
    margin: 10px auto;
  }
  .head_tit {
    text-align: center;
    padding-top: 1.5rem;
    font-size: 0.5rem;
    .tit {
      font-size: 0.3rem;
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
      font-size: 0.24rem;
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
      .weui-cell:before {
        left: 0;
      }
      padding: 0 30px;
      .weui-cell {
        padding: 0px;
      }
    }
  }
  .login_btn {
    margin: 0.5rem 0 0.3rem 0;
  }
  .content .weui-icon-clear:before {
    margin-bottom: 0.4rem;
  }
}
</style>
