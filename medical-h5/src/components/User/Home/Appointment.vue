<template>
    <div id="Test">
        <div class="date">
            <Calendar
                    ref="Calendar"
                    v-on:choseDay="clickDay"
                    v-on:changeMonth="changeDate"
                    :agoDayHide="agoDate"
                    :futureDayHide="futureDate"
                    :markDateMore="markDateMore"
            >
            </Calendar>
            <div class="remark">
                <div class="yes">可以預約</div>
                <div class="no">不可預約</div>
                <div class="full">預約已滿</div>
            </div>
        </div>
        <div class="timeBox">
            <div class="title" v-if="remark_note">溫馨提示：{{remark_note}}</div>
            <div class="timeList" v-for="item,index in list">
                <div class="time">{{item.start_time}}-{{item.end_time}}</div>
                <div>
                    <x-button v-if="item.is_can_appoint=='y'" class="smallBtn reservationBtn" :data-appoint_id="item.id" @click.native="reservationBtn" text="預約並支付"></x-button>
                    <x-button v-else class="smallBtn reservationBtn disBtn" @click.native="" text="預約已滿"></x-button>
                </div>
            </div>
        </div>
        <payment ref="showState" :payMoney="charge_money" :payType="type" :appoint_date="appoint_date"  @goCharge="paymentState"></payment>
    </div>
</template>
<script>
  import {
    Cell,
    XButton,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    cookie,
    Confirm,
    Group,
  } from 'vux'
  import Calendar from 'vue-calendar-component';
  import payment from '../common/payment.vue'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      cookie,
      Cell,
      XButton,
      Tab,
      TabItem,
      Confirm,
      Group,
      Calendar,
      payment
    },
    data () {
      return {
        agoDate:'',//以前不可点击
        futureDate:'',//未来多少天不可点击
//        markData:['2019/2/25','2019/2/27'],
        markDateMore:[],
        list:[],
        selectDate:'',
        Calendar:'',
        charge_money:[],//支付數據數組
        product_id:'',//產品id
        id:'',//預約id
        type:'',//預約1/修改2
        remark_note:'',
        appoint_date:''
      }
    },
    mounted(){
      let that = this;
      that.product_id=that.$route.query.product_id
      that.id=that.$route.query.id
      that.type=that.$route.query.type
      that.agoDate = Math.round((new Date().getTime()-24*60*60*1000)/1000).toString()
      that.futureDate=Math.round((new Date().getTime()+60*24*60*60*1000)/1000).toString()
      this.selectedDate()

    },
    methods: {
      formatDate(date){
        let year = date.split('/')[0],month = date.split('/')[1],day = date.split('/')[2]
        let months = month < 10 ? "0" + month: month;
        let days = day < 10 ? "0" + day : day;
        let dayTime = year + "-" + months + "-" + days;
        return dayTime
      },
      getData(time){
        console.log('ddd',time)
        let that = this;
        that.$api.H5OrderAppoint({
          product_id:that.product_id,
          appoint_date:time
        })
          .then(res=> {
            console.log(res)
            if (res.data.state == 1) {
              that.list = res.data.data.time_arr
              that.remark_note = res.data.data.remark_note
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
      clickDay(data) { //选中某天
        console.log(data)
        let that = this,thisDate = data,disDate = that.markDateMore
        for(let i =0;i<disDate.length;i++){
          if(thisDate==disDate[i].date){
            if(disDate[i].type=='1'){
              that.selectDate = ''
              return false
            }else{
              that.selectDate = ''
              return false
            }
          }
        }
        that.selectDate = thisDate
        that.getData(that.formatDate(data))
      },
      selectedDate(){
        let that = this;
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1): nowDate.getMonth() + 1;
        let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        let dayTime = year + "-" + month + "-" + day;
        that.$refs.Calendar.ChoseMonth(dayTime)
        that.$api.H5OrderFulldate({
          product_id:that.product_id,
        })
          .then(res=> {
            console.log(res)
            if (res.data.state == 1) {
              that.markDateMore = res.data.data
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
      reservationBtn(el){
        let that = this;
        console.log(that.selectDate)
        let appoint_id = el.target.dataset.appoint_id
        let arr=that.selectDate.split('/'),time,year,month,day;
        year = arr[0]
        month = arr[1]<10?"0"+arr[1]:arr[1]
        day = arr[2]<10?"0"+arr[2]:arr[2]
        time = year+'-'+month+'-'+day
        if(that.selectDate==''){
          that.$dialog.toast({
            mes: '請選擇預約日期',
            timeout: 1000,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }else{
          console.log(that.id,appoint_id,time,that.type)
          that.appoint_date = time
          that.$api.H5OrderSubscribe({
            id:that.id,
            appoint_id:appoint_id,
            appoint_date:time,
            type:that.type
          })
            .then(res=> {
              console.log(res)
              if(res.data.state == 1){//支付接口
                that.charge_money = [{id:parseInt(res.data.data.id),appoint_id:parseInt(res.data.data.appoint_id),money:res.data.data.pay_money}]
                that.type=res.data.data.type
                that.appoint_date=res.data.data.appoint_date
                that.$refs.showState.showChargeState()
              }else if (res.data.state == 0) {//沒有費用不走支付
                that.$dialog.toast({
                  mes: '預約成功！',
                  timeout: 1000,
                  icon: 'success',
                  callback: () => {
                    that.$router.go(-1)
//                    that.$router.push('/UserOrderList')
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
        }
      },
      paymentState(el,msg){
        console.log('支付狀態',el)
        let that = this;
        if(el==1){
          that.$dialog.toast({
            mes: '支付成功',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              that.$router.go(-1)
            }
          })
        }else{
          that.$dialog.toast({
            mes: msg,
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
        }
      },
      changeDate(data) {
//        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
//        console.log(data); //跳到了本月
      },
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<style  lang="less" type="text/less">
    #Test{
        .wh_container{
            box-shadow:0px 5px 15px rgba(0,0,0,0.04);
        }
        .wh_content{
            justify-content: center;
        }
        .wh_content_all{
            background: #fff;
            padding-bottom: 65px;
        }
        .wh_content_item{
            color: #666;
        }
        .wh_content_item .wh_chose_day{
            background: @themeColor;
            color: #fff;
            box-shadow:0px 4px 8px rgba(1,61,128,0.2);
        }
        .wh_content_item .wh_isToday.wh_chose_day{
            background: @themeColor;
            color: #fff;
        }
        .wh_top_changge{
            border-bottom: 1px solid #d9d9d9;
        }
        .wh_top_changge li{
            color: #666;
        }
        .wh_top_changge .wh_content_li{
            flex:1.5
        }
        .wh_jiantou1{
            border-top: 2px solid #666;
            border-left: 2px solid #666;
        }
        .wh_jiantou2{
            border-top: 2px solid #666;
            border-right: 2px solid #666;
        }
        .wh_content_item .wh_item_date.mark1{
            background: transparent;
            color: #FF9315;
        }
        .wh_content_item .wh_item_date.mark2{
            background: transparent;
            color: #d9d9d9;
        }
        .wh_content_item .wh_item_date.mark1.wh_chose_day,.wh_content_item .wh_item_date.mark2.wh_chose_day{
            box-shadow: none;
        }
        .wh_content_item .wh_isToday{
            background: transparent;
        }
        .wh_content_item .wh_other_dayhide, .wh_content_item .wh_want_dayhide{
            color: #d9d9d9;
        }
        .wh_content_item .wh_item_date.wh_other_dayhide{
            color: #666;
        }
        .wh_content_item .wh_item_date.wh_other_dayhide.wh_want_dayhide{
            color: #d9d9d9;
        }
    }
</style>
<style lang="less" type="text/less" scoped>
    #Test{
        padding-bottom: 30px;
        background: #fff;
        .date{
            position: relative;
            .remark{
                position: absolute;
                background: #fff;
                padding: 20px 60px;
                bottom: 0px;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: .24rem;
                .yes::before,.no::before,.full::before{
                    content: '';
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    position: relative;
                    top:2px;
                    left: -3px;
                }
                .yes::before{
                    background: #666;
                }
                .no::before{
                    background: #d9d9d9;
                }
                .full::before{
                    background: #FF9315;
                }
            }
        }

        .timeBox{
            width: 85%;
            margin: 20px auto 30px;
            .title{
                text-align: center;
                font-size: .26rem;
                color: #666;
            }
            .timeList{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 0px 0px 0px;
                position: relative;
                .time{
                    font-size: .3rem;
                    color: #666;
                }
                .reservationBtn{
                    padding: 3px 0px;
                    width: 97px;
                    box-shadow:0px 4px 8px rgba(1,61,128,0.2);
                    &.disBtn{
                        padding: 3px 0px;
                        width: 97px;
                        color: #999;
                        background: #fff;
                        border: 1px solid #d8d8d8;
                        border-radius: 4px;
                        box-shadow: none;
                    }
                }
            }
            .timeList::after{
                content: '';
                height: 1px;
                width: 100%;
                display: inline-block;
                position: absolute;
                background: #efefef;
                bottom: -15px;
            }
        }
    }
</style>
