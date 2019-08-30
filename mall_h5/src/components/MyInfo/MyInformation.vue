<template>
    <div id="MyInformation">
            <div class="content">
                <group>
                    <cell title="中文姓名" :value="u_username" :link="{path:'/InfoModify',query:{type:1,u_username:u_username}}"></cell>
                    <cell title="英文姓名" :value="u_username_en" :link="{path:'/InfoModify',query:{type:2,u_username_en:u_username_en}}"></cell>
                </group>
                <div class="groupBox">
                    <group>
                        <cell title="手提電話" :value="u_mobilephone" :link="{path:'/InfoModify',query:{type:3,u_mobilephone:u_mobilephone}}" is-link></cell>
                    </group>
                </div>
            </div>
    </div>
</template>
<script>
  import { Cell,Flexbox,FlexboxItem, Group, XButton, Confirm, cookie, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      XButton,
      Confirm,
      cookie,
    },
    data () {
      return {
        u_mobilephone:'',
        u_username:'',
        u_username_en:'',
      }
    },
    mounted(){

      this.getData()
    },
    methods: {
      getData(){
        var that = this
        that.$api.userMy({})
          .then(res => {
            let data = res.data.data
            console.log(res)
            that.u_mobilephone = data.u_mobilephone
            that.u_username = data.u_username
            that.u_username_en = data.u_username_en
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
    },
    beforeCreate () {

    },
    beforeDestroy () {
    }
  }
</script>
<style lang="less" type="text/less">
    #MyInformation {
        .vux-cell-bd {
            min-width: 90px;
        }
        .weui-cell .weui-cell__ft{
            color: #333;
            padding-right: 10px;
        }
        .weui-cell_access {
            padding-right: 17px;
        }
    }


</style>
<style scoped lang="less" type="text/less">
    #MyInformation {
        background: #f5f5f5;
    }
</style>
