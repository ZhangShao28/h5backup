<template>
    <div id="ProductDetail">
        <div class="head">
            <div class="proName">
                {{proName}}
            </div>
        </div>
        <div class="content" id="content" v-html="content">

        </div>
        <popup v-model="userBox" class="selectUserBox" @on-hide="boxHide" @on-show="boxShow">
            <div class="input_1">
                <el-input placeholder="請輸入手提電話" onkeyup="value=value.replace(/[^\d\.]/g,'')" v-model.number="inputValue" id="mobile-phone" pattern="[0-9]*"
                          keyboard="number" type="number" name="mobile" @blur="inputBlur">
                    <img v-for="(item,index) in country_icon" :key="index" v-if="index == country_id" slot="prepend"
                         class="country_icon" :src="item.img_url" alt="">
                    <el-select v-model="selvalue" slot="prepend" @change="changes">
                        <el-option class="selectBox"
                                   v-for="item in options"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            <span style="float: left" v-html="item.icon+item.label"></span>
                        </el-option>
                    </el-select>
                </el-input>
            </div>
            <group class="weui-cells_form">
                <x-input title="中文全名" v-model="u_username" type="text" :is-type="checkZh" :should-toast-error="false" placeholder="請輸入您的中文全名(僅限中文)" @on-blur="inputBlur" @on-click-error-icon="ZhIcon"></x-input>
                <x-input title="英文全名" v-model="u_username_en" type="text" :is-type="checkEn" :should-toast-error="false" placeholder="請輸入您的英文全名(僅限大寫)" @on-blur="inputBlur" @on-click-error-icon="EnIcon"></x-input>
                <div class="birthDate" v-if="input_field==1">
                    <datetime
                            v-model="birth_date"
                            @on-change="change_date"
                            title="出生日期"
                            :min-year="1900"
                            :max-year="2050">
                    </datetime>
                </div>
            </group>
            <group v-if="input_field==1">
                <popup-picker value-text-align="left" title="預約時間" :data="timeList" v-model="time" @on-show="onConfirm" @on-hide="cancel" @on-change="change" placeholder="請選擇預約時間"></popup-picker>
            </group>
            <div>
                <x-button class="bigBtn userBtn" :data-money="moneyNum" :data-service_money="service_money"  text="確     定" @click.native="userBtn"></x-button>
            </div>
        </popup>
        <div class="footer fixedBtn">
            <flexbox >
                <flexbox-item :span="6">
                    <div class="moneyNum">HK$  {{moneyNum}}</div>
                </flexbox-item>
                <flexbox-item :span="6" justify >
                    <x-button class="smallBtn payBtn"  :data-bind="is_bind" @click.native="paymentBtn" text="購    買"></x-button>
                </flexbox-item>
            </flexbox>
        </div>
        <payMent ref="showState" :payMoney="charge_money" @goCharge="paymentState"></payMent>
    </div>
</template>
<script>
  import {  XInput,Group,Cell, Toast, cookie, Flexbox, FlexboxItem,XButton,XTextarea ,XDialog,Popup, PopupPicker,Datetime,CheckIcon } from 'vux'
  import payment from '../common/payment.vue'
  export default {
    components: {
      Group,
      Cell,
      Toast,
      cookie,
      Flexbox,
      FlexboxItem,
      XButton,
      XTextarea ,
      XDialog,
      Popup,
      PopupPicker,
      Datetime,
      CheckIcon,
      XInput,
      payMent: payment
    },
    data () {
      return {
        checkZh: function (value) {
          let reg = /^[\u4e00-\u9fa5]+$/
          let valid = reg.test(value)

          return {
            valid: valid,
            msg: '只能輸入中文'
          }
        },
        checkEn: function (value) {
          let reg = /^[(A-Z)||(\s)]+$/
          let valid = reg.test(value)
          return {
            valid: valid,
            msg: '只能輸入大寫字母'
          }
        },
        input_field:'',
        time:[],
        userBox:false,
        remark_note:'',
        charge_money:[],
        total_money:'',//余额
        order_id:0,
        proName:'',
        moneyNum:'',
        service_money:'',
        content:'',
        classify_name:'',
        oldImglist:'',
        newImglist:[],
        is_bind:'',
        timeList:[],
        timeValue:'',
        birth_date: '1991-01-01',
        u_username:'',
        u_username_en:'',
        options: [{
          value: '852',
          label: '852',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_hk.png" alt="">'
        }, {
          value: '853',
          label: '853',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_am.png" alt="">'
        }, {
          value: '86',
          label: '86',
          icon: '<img style="width: 18px;margin-right: 5px;position:relative;top: -2px;" src="/static/img/ic_login_china.png" alt="">'
        }],
        country_icon: [
          {
            img_url: '/static/img/ic_login_hk.png'
          }, {
            img_url: '/static/img/ic_login_china.png'
          }, {
            img_url: '/static/img/ic_login_am.png'
          },
        ],
        country_id: '0',
        selvalue: '852',
        inputValue: '',
      }
    },
    mounted(){
      let id = this.$route.query.id
      this.getData(id)
//      this.getTime()
    },
    methods: {
      change_date(el){
        console.log(el)
        this.birth_date = el
      },
      changes(el){
        var that = this
        that.selvalue = el
        if (el == 852) {//香港
          that.country_id = 0
        } else if (el == 86) {//大陆
          that.country_id = 1
        } else if (el == 853) {//澳门
          that.country_id = 2
        }
      },
      getTime(){
        let newDate = new Date(),arr=[],year='',month=''
        if(newDate.getDay()<25){
          month=newDate.getMonth()+1
        }else{
          month=newDate.getMonth()+2
        }
        if(month<=10){
          year = newDate.getFullYear()
          arr = [year+'-'+((month)<10?'0'+month:month),year+'-'+((month+1)<10?'0'+(month+1):(month+1)),year+'-'+((month+2)<10?'0'+(month+2):(month+2))]
        }else if(month==11){
          year = newDate.getFullYear()
          arr = [year+'-'+((month)<10?'0'+month:month),year+'-'+((month+1)<10?'0'+(month+1):(month+1)),(year+1)+'-01']
        }else if(month==12){
          year = newDate.getFullYear()
          arr = [year+'-'+((month)<10?'0'+month:month),(year+1)+'-01',(year+1)+'-02']
        }
        this.timeList=[arr]
        console.log('時間',arr)
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
      getData(id) {
        let that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.productDetail({
          id: id
        }).then(response => {
          // sucess callback
          that.$dialog.loading.close()
          let data = response.data
          console.log(response)
          if(data.state==1){
            that.proName = data.data.product_name
            that.moneyNum = data.data.sales_price
            that.service_money = data.data.service_money
            that.content = data.data.content
            that.classify_name = data.data.classify_name
            that.order_id = data.data.id
            that.is_bind = data.data.is_bind
            that.timeList = [data.data.choice_date]
            that.input_field = data.data.input_field
            //图片放大查看
            let imgbox =document.querySelector('#content');
            imgbox.onclick = function(e){
              let even = e||event,target = even.target;
              if(target.nodeName.toLowerCase() == "img"){
                that.imgUrls = data.data.content.match(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi)
                let arrImg=[]
                let srcList=[]
                for(var j=0;j<that.imgUrls.length;j++){
                  that.imgUrls[j].replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,function (match,capture) {
                    arrImg.push(capture)
                    srcList.push(capture+'?x-oss-process=image/rotate,270')
                  })
                }
                that.oldImglist=arrImg
                that.newImglist=srcList
                wx.previewImage({
                  current:target.src,
                  urls:arrImg
                })
              }
            }
            //结束查看
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              callback: () => {
              }
            })
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
      paymentBtn(el){
//        var that = this,val = el.target.dataset;
//        that.charge_money = [{id:parseInt(val.id),money:val.money,service_money:val.service_money}]
        this.userBox=true
//        if(val.bind=='y'){
//          that.userBox=true
////          that.$refs.showState.showChargeState()
//        }else{
//          that.$router.push('/BindPhone')
//        }
      },
      boxHide(){
//        window.scroll(0, 0)
      },
      boxShow(){
//        window.scroll(0, 0)
      },
      cancel(el){
      },
      change(el){
        this.timeValue = el[0]
      },
      onConfirm(el){
      },
      ZhIcon(){
        this.$dialog.toast({
          mes: '只能輸入中文',
          timeout: 1500,
          icon: 'error'
        })
      },
      EnIcon(){
        this.$dialog.toast({
          mes: '只能輸入大寫字母',
          timeout: 1500,
          icon: 'error'
        })
      },
      userBtn(el){
        let that = this,val = el.target.dataset;
        let regEn = /^[(A-Z)||(\s)]+$/;
        let regZh = /^[\u4e00-\u9fa5]+$/;
        console.log(that.timeValue)
        if (that.inputValue == '') {
          that.$dialog.toast({
            mes: '手提電話不能為空！',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (that.u_username == '') {
          that.$dialog.toast({
            mes: '中文不能爲空！',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        if (that.u_username_en == '') {
          that.$dialog.toast({
            mes: '英文不能爲空！',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        if(that.input_field=='1'){
          if(!that.timeValue){
            that.$dialog.toast({
              mes: '請選擇预约时间',
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
            return false
          }
        }else{
          that.timeValue=''
          that.birth_date=''
        }
          if (!regZh.test(that.u_username)&&(that.u_username != '')) {
            that.$dialog.toast({
              mes: '只能輸入中文',
              timeout: 1500,
              icon: 'error',
              callback: () => {
              }
            })
            return false
          }
        if (!regEn.test(that.u_username_en)&&(that.u_username_en != '')) {
          that.$dialog.toast({
            mes: '只能輸入大寫字母',
            timeout: 1500,
            icon: 'error',
            callback: () => {
            }
          })
          return false
        }
        that.$api.productOrder({
          id: that.order_id,
          country_code: that.selvalue,
          u_username: that.u_username,
          u_username_en: that.u_username_en,
          u_mobilephone: that.inputValue,
          birth_date: that.birth_date,
          appoint_time: that.timeValue
        })
          .then(function (response) {
            console.log(response)
            if (response.data.state == 1) {
              that.charge_money = [{id:response.data.data.order_no,money:val.money,service_money:val.service_money}]
              that.userBox=false
              that.$refs.showState.showChargeState()
            } else {
              that.$dialog.toast({
                mes: response.data.msg,
                timeout: 1500,
                icon: 'error',
                callback: () => {

                }
              })
            }

          })
          .catch(function (response) {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error',
              callback: () => {

              }
            })
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
              that.$router.push('/MyInfo')
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
      document.querySelector('html').setAttribute('style', 'background-color:#fff;')
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },

    beforeDestroy () {
      document.querySelector('html').removeAttribute('style')
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    /*#app .weui-cell{*/
        /*padding: 10px 0;*/
    /*}*/
    #ProductDetail{

        .birthDate{
            .weui-cell__ft{
                font-size: inherit;
                text-align: left;
                padding-left: 23px;
            }
            .vux-cell-value{
                color: #333;
            }
        }
        .input_1 .el-select .el-input__inner {
            text-align: center;
        }
        .el-input-group {
            width: 100%;
            line-height: 52px;
        }
        .el-input__inner::placeholder {
            color: #999;
        }
        .el-input__inner {
            line-height: 24px;
            border-radius: 0;
            border-top: none;
            /*border-bottom: 1px solid #e5e5e5;*/
            border-left: none;
            border-right: none;
        }
        .el-input--suffix .el-input__inner {
            padding-right: 10px;
        }
        .el-select .el-input__inner {
            text-shadow: 0 0 0 #f8f8f8;
            -moz-user-select: none;
            -webkit-user-select: none;
            padding-left: 0px;
        }
        .el-select-dropdown__item.selected {
            color: #333;
        }
        .el-select-dropdown__item {
            font-size: 15px;
            padding: 0 14px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333;
            height: 50px;
            line-height: 50px;
            box-sizing: border-box;
            cursor: pointer;
        }
        .el-select-dropdown__item {
            border-bottom: 0.5px solid #e5e5e5;
        }
        .el-select-dropdown__item:last-child {
            border-bottom: none;
        }
        .el-input.is-active .el-input__inner, .el-input__inner:focus {
            border-color: #e1e1e1;
        }
        .el-input__inner {
            color: #333;
            margin-top: 13px;
            padding-bottom: 13px;
        }
        .el-input-group__append {
            border-bottom: none;
        }
        .el-input-group__prepend {
            border-bottom: 1px solid #e5e5e5;
            padding: 0px 20px 0px 5px;
        }
        .el-input__inner:hover{
            border-color: #e5e5e5;
        }
        .el-input-group__append, .el-input-group__prepend {
            border-radius: 0;
            border-top: none;
            border-left: none;
            /*border-right:1px solid #f1f1f1;*/
            border-right: none;
            background-color: #fff;
            color: #333;

        }
        .el-input__suffix {
            border-right: 1px solid #f1f1f1;
            height: 60%;
            top: 12px;
        }
        .el-select .el-input {
            width: 95px;
            font-size: 17px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .el-select-dropdown__list {
            padding: 0;
        }
        .selectUserBox .clause .weui-icon {
            font-size: 16px;
        }
        .selectUserBox .clause .vux-check-icon > span {
            color: #666;
        }
        .selectUserBox .clause .weui-icon:before {
            margin-right: 0px;
        }
        .selectUserBox{
            .vux-popup-picker-select{
                padding-left: 23px;
            }
            .vux-popup-picker-value{
                color: #333;
            }
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
        .content{
            word-wrap:break-word;
           a{
           }
            img{
                max-width: 100%;
            }

        }

    }
</style>
<style scoped lang="less" type="text/less">
    .country_icon {
        position: relative;
        top: -2px;
        width: 18px;
        margin-right: 2px;
    }
    #ProductDetail{
        .selectUserBox{
            .input_1 {
                .phone-title {
                    position: absolute;
                    height: 66px;
                    left: 15px;
                    line-height: 66px;
                }

            }
            .weui-cells_form {
                .weui-cell:before{
                    left: 0;
                }
                .weui-label{
                    font-size: 17px;
                }
            }
            .weui-icon-clear:before {
                margin-bottom: 0.4rem;
            }
        }
        .birthDate{
            /*height: 66px;*/
            /*line-height: 66px;*/
            border-top: 0.5px solid #efefef;
            .weui-cells_form .weui-cell__ft{
                font-size: inherit;
            }
        }
        .selectUserBox{
            background: #fff;
            padding: 15px;
            .userBtn{
                margin: 20px auto;
            }
        }
        .bigImg{
            position: fixed;
            top: 0;
            left:0;
            height: 100%;
            width: 100%;
            z-index: 998;
            /*margin-left: -5%;*/
            /*动画*/
            .fade-enter-active,
            .fade-leave-active {
                transition: all .2s linear;
                transform: translate3D(0, 0, 0);
            }

            .fade-enter,
            .fade-leave-active {
                transform: translate3D(100%, 0, 0);
            }


            /* bigimg */

            .img-view {
                position: relative;
                width: 100%;
                height: 100%;
            }

            /*遮罩层样式*/
            .img-view .img-layer {
                position: fixed;
                z-index: 999;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.7);
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            /*不限制图片大小，实现居中*/
            .img-view .img img {
                width: 100%;
                display: block;
                position: absolute;
                top:20%;
                left: 0;
                right: 0;
                margin: auto;
                z-index: 1000;
            }
        }
        .remark{
            background-color:#fff;
            padding: 20px;
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
                width: 160px;
                margin: 0 auto;
                button{
                    display: inline-block;
                    width: 70px;
                    padding: 2px 10px;
                }
                .clearBtn{
                    background: #f2f2f2;
                    color: #999;
                    margin-right: 10px;

                }

            }
        }
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        .head{
            position: relative;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 8px;
            .proName{
                font-weight: bold;
                font-size: .4rem;
            }
            .Hospital{
                font-size: .28rem;
                color: #666;
                margin: 5px auto;
                .label{
                    border-radius:35px;
                    background: @themeColor;
                    color: #fff;
                    font-size: .2rem;
                    padding: 3px 8px;
                    position: relative;
                    top: -2px;
                    margin-right: 10px;
                }
            }
        }
        .content{
            font-size: .3rem;
            margin-bottom: 1.3rem;
            padding-top: 8px;
        }
        .footer{
            height: 1.2rem;
            line-height: 1.2rem;
            .tips{
                font-size: .22rem;
                color: #666;
                position: absolute;
                top: 15px;
                left: 15px;
            }

            .moneyNum{
                color: @themeColor2;
                padding: 0 0 0 15px ;
                font-size: .4rem;
                font-weight: bold;
                position: relative;
                /*top: -6px;*/
            }
            .payBtn{
                text-align: center;
                padding: 0px 18px ;
                font-size: .3rem;
                /*font-weight: bold;*/
                width: auto;
                float: right;
                margin-right: 28px;
                background:linear-gradient(180deg,rgba(129,185,255,1) 0%,rgba(72,145,239,1) 100%);
                box-shadow:0px 2px 5px rgba(0,53,139,0.21);
            }
            .disBtn{
                background: #ccc;
                color: #fff;
                border: none;
            }
        }
    }
</style>
