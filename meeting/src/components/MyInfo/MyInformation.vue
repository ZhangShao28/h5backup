<template>
    <div id="MyInformation">
        <group>
            <cell title="中文名" :value="username"></cell>
            <cell title="英文名" :link="{path:'/InfoModify',query:{type:1,name_en:username_en}}" :value="username_en"
                  is-link></cell>
        </group>
        <group title="  ">
            <cell title="性  別" :value="sex"></cell>
        </group>
        <group title="  ">
            <cell title="身份證號" :value="ID_number"></cell>
            <cell title="出生日期" :link="{path:'/InfoModify',query:{type:2,birth_date:birth_date}}" :value="birth_date"
                  is-link></cell>
            <cell title="區  域" :link="{path:'/InfoModify',query:{type:3,area1:area1,area2:area2}}"
                  :value="country+'-'+big_area+'-'+small_area"
                  is-link></cell>
            <cell title="詳細地址" :link="{path:'/InfoModify',query:{type:4,address:address}}" :value="address"
                  is-link></cell>
            <cell title="選  民" :value="is_voter" :link="{path:'/InfoModify',query:{type:5,is_voter:is_voter}}"
                  is-link></cell>
            <cell title="手機號碼" :value="mobilephone" :link="{path:'/ModifyPhone',query:{mobilephone:mobilephone}}"
                  is-link></cell>
        </group>
        <group title="  " class="btnBox">
            <div class="outBtn" @click="exit_login">登 出</div>
        </group>
        <!--<x-button class="outBtn" type="warn" @click.native="exit_login">登 出</x-button>-->
        <div v-transfer-dom>
            <confirm v-model="show"
                     :title="title"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm"
                     confirm-text="確認"
                     cancel-text="取消">
            </confirm>
        </div>
    </div>
</template>
<script>
  import { Cell, Group, XButton, Confirm, cookie, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      XButton,
      Confirm,
      cookie
    },
    data () {
      return {
        cid: cookie.get('cid'),
        ID_number: '',
        username: '',
        username_en: '',
        is_voter: '',
        sex: '',
        birth_date: '1991-04-28',
        area1: '',
        country: '',
        big_area: '',
        small_area: '',
        area2: [],
        address: '',
        mobilephone: '',
        show: false,
        title: '確認登出？',
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        var that = this
        that.api.userMyinfo({})
          .then(res => {
            var data = res.data.data
            console.log(res)
            this.ID_number = data.ID_number
            this.address = data.address
            this.area1 = data.area//大區
            this.area2 = data.area_arr//大區
            this.country = data.country//大區
            this.big_area = data.big_area//大區
            this.small_area = data.small_area//大區
            this.birth_date = data.birth_date
            this.mobilephone = data.mobilephone
            this.username = data.username
            this.username_en = data.username_en
            this.is_voter = data.is_voter//是否選民
            this.sex = data.sex//性別
          })
          .catch(res => {
            that.$dialog.toast({
              mes: '請求失敗！',
              timeout: 500,
              icon: 'error',
              callback: () => {
              }
            })

          })
      },
      onCancel () {

      },
      onConfirm (el) {
        cookie.remove('login_id')
        cookie.remove('login_state')
        cookie.remove('token')
        setTimeout(() => {
          this.$router.push({path: '/Login', query: {cid: cookie.get('cid')}})
        }, 500)
      },
      exit_login(){
        this.show = true
      }
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    }
  }
</script>
<style>
    #MyInformation .vux-cell-bd {
        min-width: 90px;
    }
    #MyInformation .weui-cell_access .weui-cell__ft {
        padding-right: 17px;
    }
</style>
<style scoped lang="less" type="text/less">
    #MyInformation {

        .weui-cell {
            padding: 15px;
        }
        /*.outBtn {*/
        /*width: 80%;*/
        /*margin: 20px auto;*/
        /*background: rgba(227, 92, 80, 1);*/
        /*box-shadow: 0px 3px 6px rgba(0, 43, 80, 0.16);*/
        /*}*/
        .btnBox {
            padding-bottom: 30px;
        }
        .outBtn {
            text-align: center;
            padding: 10px;
            color: rgba(227, 92, 80, 1);
        }
    }
</style>
