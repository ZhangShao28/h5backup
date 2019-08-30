<template>
  <div class="charge_box">
      <div class="charge_head">
          <div class="tit">中国电信</div>
          <div class="num">运营商卡号：<label>{{cardno}}</label></div>
          <div class="num">流量卡号：<label>{{card_no}}</label></div>
      </div>
    <div class="charge_con">
        <div class="flow_con">
            <div>
                <span class="tit">剩余流量</span><span>{{surplus}}MB</span>
            </div>
            <div>
                <span class="tit">已使用流量</span><span>{{used}}MB</span>
            </div>
            <!--<div>-->
                <!--<span class="tit">当前套餐</span><span>3个月，500MB</span>-->
            <!--</div>-->
            <!--<div>-->
                <!--<span class="tit">有效期</span><span>2017-2018</span>-->
            <!--</div>-->

        </div>
        <div class="default_btn">
            <x-button class="Btn_Chagre" @click.native="go_charge" text="充  值"></x-button>
            <div class="charge_check" v-on:click="charge_list">查看充值记录</div>
        </div>
    </div>
  </div>
</template>

<script>
import {XButton} from 'vux'

export default {
  components: {
      XButton
  },
  data () {
    return {
        cardno:'',
        surplus:'',//剩余流量
        used:'',//使用流量
        card_no:'',
        card_id:''

    }
  },
    created(){
        document.title='查询流量'
    },
    mounted () {
        var that = this;
        that.$http.post(this.apiurl+'/flowcard/search', this.$qs.stringify(
            {
//                card_no:'m005975'
                card_no:that.card_no
            }
        ))
            .then(function (response) {
                console.log(response);
                if(response.data.err==1){
                    that.$dialog.toast({
                        mes: response.data.msg,
                        timeout: 1500,
                        icon: 'success'
                    });
                    that.card_no = response.data.data.card_no
                    that.cardno=response.data.data.info.cardno
                    that.surplus=response.data.data.info.surplus
                    that.used=response.data.data.info.used
                    that.card_id=response.data.data.card_id
                }else{
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
    },
  methods:{

      charge_list(){
          this.$router.push({
              path: '/ChargePayLog',
              name: 'ChargePayLog',
              params: {
                  card_id: this.card_id,

              }
          })
      },
      go_charge(){//充值
              var that = this;
              that.$http.post(this.apiurl+'/flowcard/charge', this.$qs.stringify(
                  {
                      card_no:that.card_no
                  }
              ))
                  .then(function (response) {
                      console.log(response);
                      if(response.data.err==1){
                          that.$router.push({
                              path: '/ChargeList',
                              name: 'ChargeList',
                              params: {
                                  card_no: that.card_no,
                                  card_id: that.card_id,
                              }
                          })
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
  },
    computed: {
        getParams () {
            // 取到路由带过来的参数
            let routerParams = this.$route.params,
                card_no = routerParams.card_no
               this.card_no = card_no
            console.log(card_no)
        }
    },
    watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
    }

}
</script>
<style>
    .charge_box .charge_head .num{
        padding-top: 0rem;

    }
    .charge_box .flow_con{
        padding: 1rem;
        font-size: .7rem;
        line-height: 40px;
    }
    .charge_box .flow_con .tit{
        padding-right: .8rem;

    }
  .charge_box .charge_check{
      float: right;
      padding: 15px 10px;
      font-size: .6rem;
      color: #00a8ff;
  }
</style>
