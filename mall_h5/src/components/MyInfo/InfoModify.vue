<template>
    <div id="InfoModify">
        <group v-if="type==1">
            <x-input required v-model="u_username" class="pleft0" name="u_username"
                     placeholder="請輸入中文姓名" type='text' autofocus="autofocus "></x-input>
        </group>
        <group v-if="type==2">
            <x-input required v-model="u_username_en" class="pleft0" name="u_username_en"
                     placeholder="請輸入英文姓名" type='text' autofocus="autofocus "></x-input>
        </group>
        <group v-if="type==3">
            <div class="input_1">
                <el-input placeholder="請輸入手提電話" v-model="u_mobilephone" id="mobile-phone"
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
        </group>
        <x-button class="comfirmBtn" type="" @click.native="modifyBtn">完 成</x-button>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie, Selector } from 'vux'
  export default {
    components: {
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
      Selector
    },
    data () {
      return {
        type: 0,
        u_username:'',
        u_username_en:'',
        u_mobilephone:'',
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

      }
    },
    mounted(){
      let that = this;
      that.type = that.$route.query.type
      that.u_mobilephone = that.$route.query.u_mobilephone
      that.u_username = that.$route.query.u_username
      that.u_username_en = that.$route.query.u_username_en
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
      modifyBtn(){
        let that = this;
        console.log(that.u_username,that.u_username_en,that.u_mobilephone,that.selvalue)
        that.$api.userModify({
          country_code: that.selvalue,
          u_username:that.u_username,
          u_username_en:that.u_username_en,
          u_mobilephone:that.u_mobilephone
        })
          .then(res=>{
          if(res.data.state==1){
            that.$dialog.toast({
              mes: res.data.msg,
              timeout:1000,
              icon: 'success',
              callback: () => {
                that.$router.back(-1)
              }
            })
          }else{
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
          }
        }).catch(res=>{
          that.$dialog.toast({
            mes: res.data.msg,
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
        })
      }
    },
    beforeCreate () {

    },
    beforeDestroy () {
    }
  }
</script>
<style lang="less" type="text/less">
    #app #InfoModify {
        .vux-cell-value {
            color: #666;
        }
        .vux-cell-box .weui-cell__hd {
            width: 105px;
        }
        select {
            color: #666;
        }
        .weui-cell {
            padding: 15px;
        }
        .vux-selector.weui-cell {
            padding: 5px 15px;
        }
        .weui-input {
            color: #666;
        }
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
            line-height: 27px;
            height: 54px;
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
    }
</style>
<style scoped lang="less" type="text/less">
    #InfoModify {
        .country_icon {
            position: relative;
            top: -2px;
            width: 18px;
            margin-right: 2px;
        }
        .input_1 {
            .phone-title {
                position: absolute;
                height: 66px;
                left: 15px;
                line-height: 66px;
            }

        }
        .vux-cell-box .weui-cell__hd .weui-label {
            width: 105px;
        }

        .comfirmBtn {
            width: 90%;
            margin: 200px auto;
            background: @themeColor;
        }
    }
</style>
