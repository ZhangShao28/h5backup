<template>
    <div id="InfoModify">
        <group v-if="type==1">
            <x-input required v-model="username" class="pleft0" name="username"
                     placeholder="請輸入姓名" type='text' autofocus="autofocus "></x-input>
        </group>
        <!--<group v-if="type==2">-->
            <!--<x-input required v-model="username_en" class="pleft0" name="username_en"-->
                     <!--placeholder="請輸入姓名英文" type='text' autofocus="autofocus "></x-input>-->
        <!--</group>-->
        <group v-if="type==2">
            <selector title="性  別" v-model="sex" :options="sex_list" @on-change="Change_sex"></selector>
        </group>
        <group v-if="type==3">
            <datetime
                    v-model="birth_date"
                    @on-change="change_date"
                    title="出生日期"
                    :min-year="1900"
                    :max-year="2100">
            </datetime>
        </group>
        <!--<group v-if="type==5">-->
            <!--<x-input title="詳細地址" v-model="address" required class="pleft0" name="address"-->
                     <!--placeholder="請輸入詳細地址" type='text'></x-input>-->
        <!--</group>-->
        <!--<group v-if="type==6">-->
            <!--<x-input title="郵箱" v-model="email" required class="pleft0" name="email"-->
                     <!--placeholder="請輸入郵箱" is-type='email'></x-input>-->
        <!--</group>-->
        <group v-if="type==4">
            <x-input title="護照號碼" v-model="passport" class="pleft0" name="passport"
                     placeholder="請輸入護照號碼"></x-input>
        </group>
        <group v-if="type==5">
            <x-input title="通行證號碼" v-model="permit_number" class="pleft0" name="permit_number"
                     placeholder="請輸入通行證號碼"></x-input>
        </group>
        <group v-if="type==6">
            <x-input title="微信號" v-model="wechat_number" class="pleft0" name="wechat_number"
                     placeholder="請輸入微信號"></x-input>
        </group>
        <!--<group v-if="type==4">-->
            <!--<selector title="區  域" v-model="area" :options="area_list"-->
                      <!--@on-change="Change_area"></selector>-->
            <!--<x-address @on-hide="logHide" raw-value value-text-align="left" :show.sync="showAddress"-->
                       <!--:title="title" v-model="addressvalue" :list="addressData"-->
                       <!--@on-shadow-change="onShadowChange" placeholder="請選擇區域"></x-address>-->
        <!--</group>-->
        <group v-if="type==8">
            <x-input title="登入密碼" v-model="password1" required class="pleft0"
                     placeholder="請輸入登入密碼" type="password"></x-input>
            <x-input title="重複登入密碼" v-model="password2" required class="pleft0"
                     placeholder="請再次輸入登入密碼" type="password"></x-input>
        </group>
        <!--<group v-if="type==5">-->
            <!--<selector title="選  民" v-model="is_voter" :options="voter_list"-->
                      <!--@on-change="Change_voter"></selector>-->
        <!--</group>-->
        <x-button class="comfirmBtn" type="" @click.native="comfirmBtn">完 成</x-button>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie, Selector, Datetime, XAddress } from 'vux'
  import ChinaAddressData from '../../../../static/addressData/ChinaAddress.json'
  import AddressGAData from '../../../../static/addressData/AddressGA.json'
  export default {
    components: {
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
      Selector,
      Datetime,
      XAddress
    },
    data () {
      return {
        password1:'',
        password2:'',
        type: 0,
        passport:'',
        permit_number:'',
        wechat_number:'',
        username:'',
        birth_date:'',
        area: '',//區域，默認港澳
        area_list: [{key: '1', value: '中國大陸'}, {key: '2', value: '港澳地區'}],
        title: '地址選擇',
        addressvalue: [],//默認地址
        area_value: [],//選擇后地址
        addressData: [],
        showAddress: false,
        sex: '1',
        sex_list: [{key: '1', value: '男'}, {key: '2', value: '女'}],
      }
    },
    mounted(){
      let that = this;

      that.type = that.$route.query.type
      that.area = that.$route.query.area1
      that.username = that.$route.query.username
      that.passport = that.$route.query.passport
      that.permit_number = that.$route.query.permit_number
      that.wechat_number = that.$route.query.wechat_number
      that.birth_date = that.$route.query.birth_date
      that.sex = this.$route.query.sex
      if (that.area == '1') {
        that.addressData = ChinaAddressData
        that.addressvalue = this.$route.query.area2
      } else {
        that.addressData = AddressGAData
        that.addressvalue = this.$route.query.area2
      }
    },
    methods: {
      onShadowChange (ids, names) {
        this.area_value = names
      },
      logHide () {
      },
      change_date(el){
        this.birth_date = el
      },
      Change_voter(el){
        this.voter = el
      },
      Change_sex(el){
        this.sex = el
      },
      Change_area(el){
        var that = this
        that.area = el
        if (el == '1') {
          that.addressData = ChinaAddressData
          that.addressvalue = ['北京市', '市轄區', '東城區']
        } else {
          that.addressData = AddressGAData
          that.addressvalue = ['香港', '香港島', '中西區']
        }

      },
      comfirmBtn(){
        var that = this,reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        if(that.password1!=that.password2){
          that.$dialog.toast({
            mes: '兩次密碼輸入不一致！',
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        that.$api.H5UserModify({
          sex: that.sex,
          birth_date: that.birth_date,
          username: that.username,
          passport: that.passport,
          permit_number: that.permit_number,
          wechat_number: that.wechat_number,
          password: that.password1,
        })
          .then(res => {
            console.log(res)
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

          })
          .catch(res => {
            that.$dialog.toast({
              mes: '修改失敗！',
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
    }
</style>
<style scoped lang="less" type="text/less">
    #InfoModify {
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
