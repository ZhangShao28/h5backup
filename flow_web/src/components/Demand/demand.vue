<template>
  <div class="login_box">
    <div class="tit">请输入流量卡号</div>
    <x-input v-model="inputValue" placeholder="流量卡号"></x-input>

    <div class="default_btn">
      <x-button class="Btn_Login" @click.native="search" text="查  询"></x-button>
    </div>
  </div>
</template>

<script>
import {Checklist,XInput,Group,XButton} from 'vux'

export default {
  components: {
      Checklist,
      XInput,
      Group,
      XButton
  },
  data () {
    return {
        inputValue:'',
        card_no:''
    }
  },
    created(){
        document.title = '查询'
    },
    mounted(){

    },
  methods:{

      search () {
          var that = this;
          that.$http.post(this.apiurl+'/flowcard/search', this.$qs.stringify(
              {
                  card_no:that.inputValue
              }
          ))
              .then(function (response) {
                  console.log(response);
                  that.card_no = response.data.data.card_no
                  if(response.data.err==1){//已绑定跳查询结果
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'success'
                      });
                      setTimeout(function () {
                          that.$router.push({
                              path: '/DemandResult',
                              name: 'DemandResult',
                              params: {
                                  card_no: response.data.data.card_no,
                              }
                          })
                      },1500)

                  }else if(response.data.err==2){//未绑定
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'error'
                      });
                      setTimeout(function () {
                          that.$router.push({
                              path: '/DemandBind',
                              name: 'DemandBind',
                              params: {
                                  card_no: response.data.data.card_no,
                              }
                          })
                      },1500)

                  }else {
                      that.$dialog.toast({
                          mes: response.data.msg,
                          timeout: 1500,
                          icon: 'error'
                      });
                  }

              })
              .catch(function (response) {
                  console.log(response);
                  that.$dialog.toast({
                      mes: response.data.msg,
                      timeout: 1500,
                      icon: 'error'
                  });
              });
      }
  }

}
</script>
<style>
  #app .weui-cell {
    padding: .6rem 1rem ;
    margin-top: 0px;
  }
  .login_box .tit{
    padding-top:3rem;
    padding-bottom:2rem;
    text-align: center;
    font-size: 1rem;
  }
  /*#app .login_box .weui-cells_checkbox:after{*/
  /*border-bottom: 0px solid #fff;*/
  /*}*/
  #app .content .weui-cells:before{
    border-top: 0px solid #fff;
  }
  #app .weui-cells_form:first-child {
    border-top: 0px solid #e9e9e9;
  }
  #app .login_box .weui-cell:before{
    border-top: 0px solid #e5e5e5;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:nth-child(1){
  border-top: 1px solid #e5e5e5;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:after{
  border-bottom: 0px solid #fff;
  }
  #app .login_box .weui-cells_checkbox .weui-cell:before{
    left: 0px;
  }

</style>
