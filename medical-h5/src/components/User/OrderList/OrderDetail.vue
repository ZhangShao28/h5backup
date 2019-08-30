<template>
    <div id="ProductDetail">
        <div class="head">
            <div class="proName">
                {{product_name}}
            </div>
            <div class="Hospital">
                <span class="label">{{classify_name}}</span>{{hospital_name}}
            </div>
        </div>
        <div class="content" id="content" v-html="content">

        </div>
    </div>
</template>
<script>
  import {  Group,Cell, Toast, cookie, Flexbox, FlexboxItem,XButton,XTextarea ,XDialog } from 'vux'
  import payment from '../../common/payment.vue'
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
      payMent: payment
    },
    data () {
      return {
        product_name:'',
        classify_name:'',
        hospital_name:'',
        content:''
      }
    },
    mounted(){
      let product_id = this.$route.query.product_id
      this.getData(product_id)
    },
    methods: {
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
      getData(product_id) {
        let that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.H5OrderDetail({
          product_id: product_id
        }).then(response => {
          // sucess callback
          that.$dialog.loading.close()
          let data = response.data
          console.log(response)
          if(data.state==1){
            that.classify_name = data.data.classify_name
            that.content = data.data.content
            that.hospital_name = data.data.hospital_name
            that.product_name = data.data.product_name
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
        var that = this,val = el.target.dataset;
        that.charge_money = [{id:parseInt(val.id),money:val.money}]
//        that.$refs.showState.showChargeState()
        that.remark = true
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
              that.$router.go(-1)
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
    #ProductDetail{
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
            margin-bottom: .3rem;
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
                color: @themeColor;
                padding: 0 0 0 15px ;
                font-size: .4rem;
                font-weight: bold;
                position: relative;
                /*top: -6px;*/
            }
            .payBtn{
                text-align: center;
                padding: 0px 15px ;
                font-size: .3rem;
                /*font-weight: bold;*/
                width: auto;
                float: right;
                margin-right: 28px;
            }
            .disBtn{
                background: #ccc;
                color: #fff;
                border: none;
            }
        }
    }
</style>
