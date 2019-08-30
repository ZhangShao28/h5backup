<template>
    <div id="accountSetting">
        <group title="銀行匯款賬戶設置">
        <x-input label-width="100" title="開戶人名稱" required v-model="ka_username" class="pleft0" name="name" placeholder="請輸入開戶人姓名" type='text'></x-input>
        <x-input label-width="100" title="銀行賬戶號碼" required v-model="ka_num" class="pleft0" name="bankNum" placeholder="請輸入銀行賬戶號碼" type='number'></x-input>
        <x-input label-width="100" title="開戶銀行名稱" required v-model="bank_name" class="pleft0" name="bankname" placeholder="請輸入開戶銀行名稱" type='text'></x-input>
        <x-input label-width="100" title="開戶銀行地址" required v-model="bank_address" class="pleft0" name="bankAddress" placeholder="請輸入開戶銀行地址" type='text'></x-input>
        <x-input label-width="100" title="開戶行國際代碼" v-model="international_code" class="pleft0" name="bankCode" placeholder="可選填" type='number'></x-input>
        </group>
        <div class="tips">
            <div><span>*</span>請確保所填賬戶信息的正確性和合法性，若出錯，恒高醫療對此不負任何責任</div>
            <div><span>*</span>會員收到佣金后，需自行報稅，恒高對其稅務問題不負任何責任</div>
            <div><span>*</span>最好提供香港賬戶，如會員填寫大陸賬戶，恒高醫療需扣除其匯款手續費、行政費、應繳稅費（佣金總額的15%以上）及一切額外費用</div>
        </div>
        <x-button class="bigBtn Btn" @click.native="submitBtn" text="提    交"></x-button>
    </div>
</template>
<script>
  import { XInput, Group, XButton, Cell, Toast, cookie } from 'vux'
  export default {
    components: {
      XInput,
      Group,
      XButton,
      Cell,
      Toast,
      cookie,
    },
    data () {
      return {
        ka_username:'',
        ka_num:'',
        bank_name:'',
        bank_address:'',
        international_code:''
      }
    },
    mounted(){
        this.getData()
    },
    methods: {
      getData(){
        let that = this
        that.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.walletAccount({

        }).then(response => {
          that.$dialog.loading.close()
          // sucess callback
          let data = response.data.data
          console.log(response)
          if (response.data.state == 1) {
              that.ka_username= data.ka_username,
              that.ka_num= data.ka_num,
              that.bank_name= data.bank_name,
              that.bank_address= data.bank_address,
              that.international_code= data.international_code
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        })
          .catch(response=>{
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      submitBtn(){
        var that = this
        if(that.ka_username==''){
          that.$dialog.toast({
            mes: '開戶人姓名不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if(that.ka_num==''){
          that.$dialog.toast({
            mes: '賬戶號碼不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if(that.bank_name==''){
          that.$dialog.toast({
            mes: '銀行名稱不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if(that.bank_address==''){
          that.$dialog.toast({
            mes: '開戶行地址不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
          this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
          that.$api.walletAccount({
            ka_username:that.ka_username,
            ka_num:that.ka_num,
            bank_name:that.bank_name,
            bank_address:that.bank_address,
            international_code:that.international_code
          }).then(response => {
            that.$dialog.loading.close()
            // sucess callback
            let data = response.data.data
            console.log(response)
            if (response.data.state == 1) {
              that.$dialog.toast({
                mes: '提交成功',
                timeout: 1500,
                icon: 'success',
                callback: () => {
                  that.$router.go(-1)
                }
              })
            }else{
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error'
              })
            }
          })
            .catch(response=>{
              that.$dialog.loading.close()
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error'
              })
            })
        }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    #accountSetting{
        .vux-x-input .weui-label{
            width: 151px;
        }
        .weui-cells__title{
            margin: 0 auto;
            padding: 15px 15px 10px 15px;
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #accountSetting{
        .tips{
            padding: 10px;
            font-size: .24rem;
            span{
                color: red;
            }
        }
      .vux-x-input .weui-label{
          width: 150px;
      }
      .Btn{
          margin-top: 30px;
      }
    }
</style>
