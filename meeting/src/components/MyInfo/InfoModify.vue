<template>
    <div id="InfoModify">
        <group v-if="type==1">
            <x-input required v-model="username_en" class="pleft0" name="username_en"
                     placeholder="請輸入姓名英文" type='text' autofocus="autofocus "></x-input>
        </group>
        <group v-if="type==2">
            <datetime
                    v-model="birth_date"
                    @on-change="change_date"
                    title="出生日期"
                    :min-year="1900"
                    :max-year="2050">
            </datetime>
        </group>
        <group v-if="type==3">
            <selector title="區  域" v-model="area" :options="area_list"
                      @on-change="Change_area"></selector>
            <x-address @on-hide="logHide" raw-value value-text-align="left" :show.sync="showAddress"
                       :title="title" v-model="addressvalue" :list="addressData"
                       @on-shadow-change="onShadowChange" placeholder="請選擇區域"></x-address>
        </group>
        <group v-if="type==4">
            <x-input title="詳細地址" v-model="address" required class="pleft0" name="address"
                     placeholder="請輸入詳細地址" type='text'></x-input>
        </group>
        <group v-if="type==5">
            <selector title="選  民" v-model="is_voter" :options="voter_list"
                      @on-change="Change_voter"></selector>
        </group>
        <x-button class="comfirmBtn" type="" @click.native="comfirmBtn">完 成</x-button>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie, Selector, Datetime, XAddress } from 'vux'
  import ChinaAddressData from '../../../static/ChinaAddress.json'
  import AddressGAData from '../../../static/AddressGA.json'
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
        type: 0,
        username_en: '',
        birth_date: '',
        address: '',
        area: '',//區域，默認港澳
        area_list: [{key: '1', value: '中國大陸'}, {key: '2', value: '港澳地區'}],
        title: '地址選擇',
        addressvalue: [],//默認地址
        area_value: [],//選擇后地址
        addressData: [],
        is_voter: '',
        voter_list: [{key: '1', value: '是'}, {key: '2', value: '否'}],
        showAddress: false
      }
    },
    mounted(){
      var that = this, is_voter = this.$route.query.is_voter
      this.area = this.$route.query.area1
      this.addressvalue = this.$route.query.area2
      this.type = this.$route.query.type
      this.username_en = this.$route.query.name_en
      this.birth_date = this.$route.query.birth_date
      this.address = this.$route.query.address
      if (is_voter == '是') {
        that.is_voter = '1'
      } else if (is_voter == '否') {
        that.is_voter = '2'
      }
      if (this.area == '1') {
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
        var that = this
        that.api.userModify({
          type: that.type,
          username_en: that.username_en,
          birth_date: that.birth_date,
          area: that.area,
          area_arr: that.area_value,
          address: that.address,
          is_voter: that.is_voter,
        })
          .then(res => {
            console.log(res)
            that.$dialog.toast({
              mes: '修改成功！',
              timeout: 500,
              icon: 'success',
              callback: () => {
                that.$router.back(-1)
              }
            })
          })
          .catch(res => {
            that.$dialog.toast({
              mes: '修改失敗！',
              timeout: 500,
              icon: 'error',
              callback: () => {
              }
            })
          })
      }
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.title = cookie.get('xh_name')
      document.querySelector('body').setAttribute('style', '')
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
            background: #3D82D9;
        }
    }
</style>
