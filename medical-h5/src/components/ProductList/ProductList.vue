<template>
    <div id="Product">
        <div class="tabItem">
            <tab>
                <tab-item v-for="(item,index) in itemList" :key="index" :selected="selectedId===index" @on-item-click="classifyItem(index,item.classify_id)">{{ item.classify_name }}</tab-item>
            </tab>
        </div>
        <div class="content">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div v-for="(item,index) in list" :key="index" class="ProductList">
                        <router-link :to="{path:'/ProductDetail',query:{id:item.id}}">
                        <flexbox class="listBox">
                            <flexbox-item :span="8">
                                <!--<router-link :to="{path:'/ProductDetail',query:{id:item.id}}">-->
                                <div class="proName">{{item.product_name}}</div>
                                <div class="Hospital"><span class="label">{{item.classify_name}}</span>{{item.hospital_name}}</div>
                                <!--</router-link>-->
                            </flexbox-item>
                            <flexbox-item :span="4" justify>
                                <div class="detail">查看詳情<img src="/static/img/iconR.png" alt="" class="img"></div>
                            </flexbox-item>
                        </flexbox>
                        </router-link>
                        <flexbox class="buyBox">
                            <flexbox-item :span="7">
                                <div class="moneyNum">
                                    <div>售價：HK$ {{item.sale_price}}</div>
                                    <div>定金：HK$ {{item.price}}</div>
                                    <div v-if="item.special_price>'0.00'" class="specialPrice">特殊价格:HK$ {{item.special_price}}({{item.front_nums}}次)</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="5" justify>
                                <x-button class="smallBtn paymentBtn" :data-money="item.price" :data-id="item.id" :data-note="item.remark_note" @click.native="AppointmentBtn" text="預約" v-if="item.is_can_buy=='y'"></x-button>
                                <!--<x-button class="smallBtn paymentBtn" :data-money="item.price" :data-id="item.id" :data-note="item.remark_note" @click.native="paymentBtn" text="購買" v-if="item.is_can_buy=='y'"></x-button>-->
                                <x-button class="smallBtn paymentBtn disBtn" :data-money="item.price" :data-id="item.id"   text="預約" v-else></x-button>
                                <div class="tips" v-if="item.msg!='all'">(僅限{{item.msg}})</div>
                            </flexbox-item>
                        </flexbox>
                        <div class="moneyBtn" @click="moneyBtn(index,item.id,item.is_can_buy)">
                            <div>佣金分成</div>
                            <div><img src="/static/img/iconR.png" alt="" class="img"></div>
                        </div>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span slot="loadingTip">正在加載···</span>
                <span slot="doneTip" v-show="show_more">沒有更多數據了~~</span>
            </yd-infinitescroll>
            <div v-show="show_nodata" class="no_data">
                <!--<img src="/static/img/ic_apply_invalid.png" alt="">-->
                <div class="title">暫無數據</div>
            </div>
        </div>
        <x-dialog v-model="remark" :hide-on-blur="true" :dialog-style="{'max-width':'initial','z-index':'1999'}">
            <div class="remark">
                <div class="remakrTitle">
                    <div class="tit">請填寫預約備注</div>
                    <div class="text">{{note}}</div>
                </div>
                <div class="remakrText">
                    <x-textarea  v-model="remarkValue" placeholder="請填寫···" @on-blur="inputBlur"></x-textarea>
                </div>
                <div class="remarkBtn">
                    <x-button class="smallBtn clearBtn"  text="取     消" @click.native="remark=false"></x-button>
                    <x-button class="smallBtn"  text="確     定" @click.native="remarkBtn"></x-button>
                </div>
            </div>
        </x-dialog>

        <x-dialog v-model="remark2" :hide-on-blur="true" :dialog-style="{'max-width':'initial','z-index':'1999'}">
            <div class="remark">
                <div class="remakrTitle">
                    <div class="tit">佣金分成(<span v-if="remark2List[0].type==1">%</span><span v-if="remark2List[0].type==2">HK$</span>)</div>
                </div>
                <div class="remakr2Text">
                    <x-table full-bordered>
                        <thead>
                        <tr>
                            <th></th>
                            <th>一級佣金</th>
                            <th>二級佣金</th>
                            <th>三級佣金</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item2,index in remark2List" :key="index">
                            <td>{{item2.post_name}}</td>
                            <td>{{item2.one_level}}</td>
                            <td>{{item2.two_level}}</td>
                            <td>{{item2.three_level}}</td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>
                <div class="remarkBtn">
                    <x-button class="smallBtn closeBtn"  text="關    閉" @click.native="remark2=false"></x-button>
                    <x-button class="smallBtn"  text="去預約" @click.native="goAppointmentBtn" v-if="is_can_buy=='y'"></x-button>
                    <x-button class="smallBtn disBtn"  text="去預約" v-else></x-button>
                </div>
            </div>
        </x-dialog>
        <popup v-model="userBox" class="selectUserBox">
            <group label-width="5em">
                <popup-picker title="選擇客戶" :data="userList" :display-format="format" v-model="userName" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="請選擇客戶"></popup-picker>
            </group>
            <div>
                <x-button class="bigBtn userBtn"  text="確     定" @click.native="userBtn"></x-button>
            </div>
        </popup>
        <payMent ref="showState" :payMoney="charge_money" :payType=0 :totalMoney="total_money" :Remark="remarkValue" @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
  import {   AlertModule,Tab, TabItem,Group,Cell, Toast, cookie, Flexbox, FlexboxItem,XButton,XTextarea ,XDialog ,TransferDom,XTable,Popup,PopupPicker } from 'vux'
  import payment from '../common/payment.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      Toast,
      cookie,
      Flexbox,
      FlexboxItem,
      XButton,
      XTextarea,
      XDialog,
      XTable,
      Popup,
      PopupPicker,
      payMent: payment
    },
    data () {
      return {
        proId:'',
        is_can_buy:'',
        userList:[],
        userName:[],
        format:function (value,name) {
          return `${name}`
        },
        userBox:false,
        product_id:'',//产品id
        custom_id:'',//客戶id
        remarkValue:'',
        remark:false,
        remark2:false,
        remark2List:[
          {
            type:1
          }
        ],
        charge_money:[],
        total_money:'',//余额
        order_id:0,
        page: 1,
        pageSize: 10,
        totalMoney:'0',
        list:[],
        show_nodata: false,
        show_more: true,
        note:'',
        classify_id:'',
        itemList:[],
        selectedId:0//默認第一分類
      }
    },
    mounted(){
      this.getClassify()
      this.getUser()
    },
    methods: {
      getUser(){
        let that = this;
        that.$api.prodcutMycustomer({

        })
          .then(res=> {
            console.log(res)
            if (res.data.state == 1) {
              that.userList = [res.data.data]
            }
          })
          .catch(res=>{

          })
      },
      onShow(){},
      onHide(){},
      onChange(el){
        this.custom_id = el[0]
      },
      classifyItem(index,id){
        console.log(index,id)
        cookie.set('SelectId', index, {expires: 30000, path: '/'})
        cookie.set('proSelectId', id, {expires: 30000, path: '/'})
        let that = this;
        that.classify_id = id
        that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        that.list=[]
        that.page=1
        that.show_nodata= false
        that.show_more= false
        that.loadList(this.classify_id)
        window.scrollTo(0, 0);
      },
      inputBlur () {
        // window.scroll(0, 0);
        setTimeout(() => {
          // alert(1);
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
          }
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
            this.valRes = 'ios';
          } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
            this.valRes = 'android';
          }
          if (this.valRes === 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 10);
      },
      remarkBtn(){
        let that = this;
        if(that.remarkValue==''){
          that.$dialog.toast({
            mes: '備注信息不能爲空！',
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }else{
          that.remark = false
          setTimeout(function () {
            that.$refs.showState.showChargeState()
          },50)
        }
      },
      getClassify(){
        let that = this;
        that.$api.prodcutClassify({
        })
          .then(res=>{
            console.log(res)
            if(res.data.state==1){
                that.itemList = res.data.data.classify
                that.classify_id = res.data.data.classify[0].classify_id
                that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
                that.list=[]
                that.page=1
                that.show_nodata= false
                that.show_more= false
                  if(document.cookie.indexOf('SelectId=')==-1){
                    that.selectedId=0
                    that.classify_id = res.data.data.classify[0].classify_id
                  }else{
                    that.selectedId=parseInt(cookie.get('SelectId'))
                    that.classify_id = cookie.get('proSelectId')
                  }
              that.loadList(that.classify_id)
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
          .catch(res=>{
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
          })
      },
      loadList(classify_id) {
        var that = this
        that.$dialog.loading.open('正在加載中···')
        that.$api.prodcutIndex({
          classify_id:that.classify_id,
          page: that.page,
        }).then(response => {
          // sucess callback
          var data = response.data.data.product;
          that.total_money = response.data.data.balance_money
          console.log(response)
          that.$dialog.loading.close()
          if(data.length!=0){
            for (var i = 0; i < data.length; i++) {
              that.list.push(data[i])
            }
            if (response.data.data.pages <= 1 && data.length == 0) {
              that.show_nodata = true
            }
            if (response.data.data.pages <= 1 && (data.length > 0&&data.length <= 10)) {
              that.show_more = false
            }
            if (response.data.data.current_page==response.data.data.pages || that.page == response.data.data.pages) {
                /* 所有数据加载完毕 */
              that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
              if (response.data.data.pages >= 2) {
                that.show_more = true
              } else {
                that.show_more = false
              }
              return
            }

              /* 单次请求数据完毕 */
            that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            that.page++
          }else{
            that.show_nodata = true
          }

        }, response => {
          // error callback
          that.$dialog.loading.close()
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            callback: () => {
            }
          })
        })
      },
      moneyBtn(index,proId,is_can_buy){
        let that = this;
        that.proId = proId
        that.is_can_buy = is_can_buy
        that.remark2List=that.list[index].commission
        if(that.remark2List.length==0){
          that.remark2List=[{type:1}]
        }else{
          that.remark2 = true
        }
      },
      paymentBtn(el){
        let that = this,val = el.target.dataset;
        that.note = val.note
        that.remarkValue = ''
        that.charge_money = [{id:parseInt(val.id),money:val.money}]
//        that.order_id =parseInt(val.id)
        that.remark = true
      },
      AppointmentBtn(el){
        this.product_id = el.target.dataset.id
        this.custom_id =''
        this.userName =[]
        this.userBox=true
      },
      goAppointmentBtn(){
        this.remark2=false
        this.product_id = this.proId
        this.custom_id =''
        this.userName =[]
        this.userBox=true
      },
      userBtn(){
        let that = this;
        if(!that.custom_id){
          that.$dialog.toast({
            mes: '請選擇客戶',
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        that.$api.prodcutAddrecord({
          product_id:that.product_id,
          custom_id:that.custom_id
        })
          .then(res=> {
            console.log(res)
            if (res.data.state == 1) {
              AlertModule.show({
                title: '',
                content: res.data.msg,
                onShow () {
                },
                onHide () {
                  that.userBox=false
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
          .catch(res=>{

          })
      },
      paymentState(el){
        console.log('支付狀態',el)
        let that = this;
        if(el==1){
          that.$dialog.toast({
            mes: '支付成功',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              that.$router.go(0)
            }
          })
        }else{
          that.$dialog.toast({
            mes: '支付失敗',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
        }
      },
    },
    beforeCreate () {

    },
    beforeDestroy () {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    /*#app .weui-cell{*/
        /*padding: 10px 0;*/
    /*}*/
    .vux-popup-picker-container{
        .vux-popup-header-right{
            color: @themeColor;
        }
    }
    #Product {
        .weui-cells::after{
            border: none;
        }
        .vux-tab-item{
            padding: 0 5px;
            /*overflow: hidden;*/
            /*text-overflow:ellipsis;*/
            /*white-space: nowrap;*/
        }
        .vux-tab-wrap .vux-tab-ink-bar {
            background-color: @themeColor;
            width: 0px;
            margin: 0 auto;
            display: none;
        }
         .vux-tab-item.vux-tab-selected{
            position: relative;
        }
         .vux-tab-item.vux-tab-selected::after{
            content:'';
            display: inline-block;
            width: 100%;
            height: 3px;
            background: @themeColor;
            position: absolute;
            bottom: 0px;
            left: 0px;
        }
        .remark {
            .remakrText textarea {
                border: 1px solid #d5d5d5;
                margin: 0px auto;
                padding: 5px;
            }
            .remakrText textarea::placeholder {
                font-size: .24rem;
            }
        }
    }
</style>
<style scoped lang="less" type="text/less">
    #Product{
        .selectUserBox{
            background: #fff;
            padding: 15px;
            .userBtn{
                margin: 20px auto;
            }
        }
        .tabItem{
            position: fixed;
            width: 100%;
            top:0;
            z-index: 100;
        }
        .remark{
            background-color:#fff;
            padding: 20px;
            .remakr2Text{
                padding: 10px 0 20px 0;
                font-size: .26rem;
            }
            .remakrTitle{
                text-align: center;
                .tit{
                    font-size: .32rem;
                }
                .text{
                    font-size: .26rem;
                    color: #666;
                    margin-top: 6px;
                }
            }
            .remarkBtn{
                width: 200px;
                margin: 0 auto;
                button{
                    display: inline-block;
                    width: 70px;
                    padding: 2px 10px;
                    margin-right: 10px;
                }
                .closeBtn{
                    background: transparent;
                    border: 1px solid #238BFF;
                    color: #238BFF;
                }
                .disBtn{
                    background: #fff;
                    color: #999;
                    border: 1px solid #d8d8d8;
                }
                .clearBtn{
                    background: #f2f2f2;
                    color: #999;
                    margin-right: 10px;

                }

            }
        }
        .content{
            background: #f5f5f5;
            margin-top: 44px;
            padding: 10px;
            .ProductList{
                font-size: .3rem;
                background: #fff;
                box-shadow:0px 2px 5px rgba(0,0,0,0.1);
                margin-bottom: 10px;
                border-radius:4px;
                .specialPrice{
                    color: #666;
                    font-size: .24rem;
                    font-weight: 400;
                    padding: 0 0px 5px 0px;
                }
                .moneyBtn{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    padding: 13px 20px;
                    img{
                        width: 10px;
                    }
                    &::after{
                        content: '';
                        border-top: 1px solid #e5e5e5;
                        width: 90%;
                        position: absolute;
                        top: 0px;
                        left:5%;
                    }
                }
                .buyBox{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .moneyNum{
                        color: @themeColor;
                        padding:  13px 20px;
                        font-weight: bold;
                        line-height: 24px;
                    }
                    .paymentBtn{
                        width: auto;
                        padding: 0px 15px;
                        height: 32px;
                        line-height: 32px;
                        background: #fff;
                        color: @themeColor;
                        border: 1px solid @themeColor;
                        float: right;
                        margin-right:25px;
                    }
                    .disBtn{
                        background: #fff;
                        color: #999;
                        border: 1px solid #d8d8d8;
                    }
                    .tips{
                        font-size: .2rem;
                        color: #666;
                        margin-top: 6px;
                        text-align: right;
                        float: right;
                        margin-right: 25px;
                        width: 100%;
                    }
                }

                .listBox{
                    padding: 15px 20px 10px 20px;
                    background: #fff;
                    position: relative;
                    border-radius:4px;
                    .detail{
                        text-align: right;
                        color: #888;
                        margin-right: 4px;
                        .img{
                            width: 10px;
                            position: relative;
                            top:-1px;
                            margin-left: 3px;
                        }
                    }
                    &::after{
                        content: '';
                        border-bottom: 1px solid #e5e5e5;
                        width: 90%;
                        position: absolute;
                        bottom: 0px;
                        left:5%;
                    }
                    .proName{
                        font-weight: bold;
                    }
                    .Hospital{
                        font-size: .24rem;
                        color: #666;
                        margin: 5px auto;
                        .label{
                            border-radius:35px;
                            background: @themeColor;
                            color: #fff;
                            font-size: .2rem;
                            padding: 2px 6px;
                            position: relative;
                            top: -1px;
                            margin-right: 3px;
                        }
                    }
                }
            }
        }
        .footer{

        }
    }
</style>
