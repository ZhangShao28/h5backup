<template>
  <div class="charge_box">
      <div class="charge_head">
          <div class="tit">中国电信流量卡</div>
          <!--<div class="num">流量卡号：<label>231231123156132121</label></div>-->
      </div>
    <div class="charge_con">
        <div class="flow_list">
            <checker
                    v-model="flow_list_value"
                    default-item-class="flow_list-item"
                    selected-item-class="flow_list-item-selected"
                    @on-change="select_item" radio-required
            >
                <checker-item v-for="i in flow_list" :key="i.tcid" :value="i.tcid+'/'+i.tcname">
                    <div class="flow_num">{{i.tcname}}</div>
                    <div>￥{{i.maxpride}}</div>
                </checker-item>
            </checker>
        </div>

            <div>
                <checklist :options="objectList" required :max="1" v-model="objectListValue" @on-change="change"></checklist>
            </div>
            <div class="default_btn">
                <x-button class="Btn_pay" @click.native="payBtn" text="支  付"></x-button>
            </div>
    </div>
  </div>
</template>

<script>
import {XButton,Checker, CheckerItem,Checklist} from 'vux'

export default {
  components: {
      XButton,
      Checker,
      CheckerItem,
      Checklist
  },
  data () {
    return {
        objectList: [
            {key: '0', value: '当月生效（默认当月生效）'},
            {key: '1', value: '次月生效'}
        ],
        objectListValue: ['1'],
        flow_list_value: '',
        flow_list:[ ],
        tcid:'',
        tcname:'',
        f_type:'',
        card_id:'',
        card_no:''
    }
  },
    created(){
        document.title = '充值'
    },
    mounted(){
        this.getList(this.card_no)
    },
  methods:{
      change (key) {
          if(key[0]==undefined){
              this.objectListValue=['1']
          }
          this.f_type = key[0]
          console.log(key[0])
      },
      select_item (value){
          var tcid = value.split('/')[0], tcname = value.split('/')[1]
          this.tcid=tcid
          this.tcname=tcname
      },
      getList(card_no){//获取充值套餐列表
          var that = this;
          that.$http.post(this.apiurl+'/flowcard/charge', this.$qs.stringify(
              {
                  card_no:card_no
              }
          ))
              .then(function (response) {
                  console.log(response);
                  if(response.data.err==1){
//                      that.$dialog.toast({
//                          mes: response.data.msg,
//                          timeout: 1500,
//                          icon: 'success'
//                      });
                      that.card_id = response.data.data.card_id
                      that.flow_list=response.data.data.flow
                      that.flow_list_value = response.data.data.flow[0].tcid+'/'+response.data.data.flow[0].tcname
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
      weixinPay(){
          var that= this;
          if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
              if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady(), false);
              }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady());
                  document.attachEvent('onWeixinJSBridgeReady',that.onBridgeReady());
              }
          }else{
              that.onBridgeReady();
          }
      },
      onBridgeReady(){
          var that = this
          console.log(that.appId)
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":that.appId,     //公众号名称，由商户传入
                    "timeStamp":that.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":that.nonceStr, //随机串
                    "package":that.package,
                    "signType":"MD5",         //微信签名方式：
                    "paySign":that.paySign //微信签名
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        that.$dialog.toast({
                            mes: res.err_msg+'支付成功回调',
                            timeout: 1500,
                            icon: 'success'
                        });
                        alert("支付成功")
                    }else{
                        that.$dialog.toast({
                            mes: '支付失败',
                            timeout: 1500,
                            icon: 'success'
                        });
                    }
                }
            );
    },
      payBtn(){//支付
          var that = this;
          console.log(that.card_id,that.tcid,that.tcname,that.f_type)
          that.$http.post(this.apiurl+'/recharge/index', this.$qs.stringify(
              {
                  card_id:that.card_id,
//                  card_id:3,
                  tcid:that.tcid,
                  tcname:that.tcname,
                  f_type:that.f_type

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
                      that.appId = response.data.data.appId
                      that.nonceStr = response.data.data.nonceStr
                      that.package = response.data.data.package
                      that.paySign = response.data.data.paySign
                      that.timeStamp = response.data.data.timeStamp
                        that.weixinPay();
//                      setTimeout(function () {
//                          that.$router.push({
//                              path: '/ChargePayLog',
//                              name: 'ChargePayLog',
//                              params: {
//                                  card_id: that.card_id,
//
//                              }
//                          })
//                      },1500)



//                      if (typeof WeixinJSBridge == "undefined"){
//                          if( document.addEventListener ){
//                              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//                          }else if (document.attachEvent){
//                              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//                              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//                          }
//                      }else{
//                          that.onBridgeReady();
//                      }
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
      }
  },
    computed: {
        getParams () {
            // 取到路由带过来的参数
            let routerParams = this.$route.params,
                card_no = routerParams.card_no,
                card_id = routerParams.card_id
            this.card_no = card_no
            this.card_id = card_id
            console.log("card_no",card_no)
        }
    },
    watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
    }

}
</script>
<style >
    body{
        background: #fff;
    }
    .charge_box .charge_con{
        padding: .6rem .4rem;
        font-size: .7rem;
        line-height: 40px;
    }
    .charge_box .charge_con .tit{
        padding-right: .8rem;

    }
    .charge_box .flow_num{
        font-size: .6rem;
    }
    .charge_box .weui-cells:after{
        border-bottom: 0px solid #e5e5e5;
    }
    .charge_box .weui-cell:before{
        border-top: 0px solid #e5e5e5;
    }
    .charge_box .weui-cells_checkbox{
        font-size: .7rem;
        line-height: 10px;
    }
    #app .charge_box .weui-cells_checkbox .weui-check_label{
        padding: 8px 10px 8px 0px;
    }
    .flow_list-item {
        width: 7.3rem;
        padding: 10px 0px;
        line-height: 1rem;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top: 10px;
    }
    .flow_list-item-selected {
        background: #ffffff url(../../assets/Select-the-box.png) no-repeat right bottom;
        border-color: #ffa800;
    }
    .default_btn{
        margin: 1rem .8rem 0rem .8rem;
        position: fixed;
        width: 85%;
        bottom: 40px;
    }
</style>
