<template>
  <div id="apps">
    <div class="menu-box" @click="menuBtn">
      <i class="icon-menu" v-if="open"></i>
      <i class="icon-close" v-if="!open"></i>
      <i class="icon-circle"></i>
    </div>
    <transition name="fade">
    <div class="nav" v-if="!open">
      <ul class="menu_list">
        <li v-for="item in nav_item" @click="clickMenuBtn"><a :href="item.href">{{item.text}}</a></li>
        <!--<li><a href="#product">產品服務</a></li>-->
        <!--<li><a href="#merchants">商戶領域</a></li>-->
        <!--<li><a href="#company">公司介紹</a></li>-->
        <!--<li><a href="#cooperation">合作商戶</a></li>-->
        <li @click="changeLangEvent">{{$t("zh_en.text")}}</li>
      </ul>
    </div>
    </transition>
    <div class="head" id="home">
      <!--<img class="img_logo" :src="$t('logo.src')" alt="">-->
      <img class="img_logo" src="static/img/logo_en.png" alt="">
      <div class="head_con">
        <div class="text1" :class="{text1_en:lang_en}">{{$t("head_con.text1")}}</div>
        <div class="text2" :class="{text2_en:lang_en}">{{$t("head_con.text2")}}</div>
      </div>
      <img class="img_bg" style="width: 100%" src="static/img/Thebottomofthepage@2x.png" alt="">
    </div>
    <div class="banner">
      <el-carousel indicator-position="outside" autoplay="">
        <el-carousel-item v-for="(item,index) in banner" :key="index">
          <div class="banner_con" :class="{banner_con_en:lang_en}">
            <img style="width: 52px" :src="item.img_srcs" alt="">
            <div class="banner_text" :class="{banner_text_en:lang_en}">
              <span v-if="index==0">
                {{item.text}}
                <img :style="{'display':lang_en ? 'none':'inline-block'}" style="width: 113px"  :src="item.img_src" alt="">
              </span>
              <span v-else>
                {{item.text1}}
                <img style="width: 113px" :style="{'display':lang_en ? 'none':'inline-block'}" :src="item.img_src" alt="">
                {{item.text2}}
              </span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <div class="content">
          <div class="con_tit" >{{$t("content1_txt.con_tit")}}</div>
          <div class="con_con">
            <div class="con_text">{{$t("content1_txt.con_text1")}}</div>
            <div class="con_img"><img style="width: 100%" src="static/img/photo@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_text">{{$t("content1_txt.con_text2")}}</div>
            <div class="con_img"><img style="width: 100%" src="static/img/stock@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_text">{{$t("content1_txt.con_text3")}}</div>
            <div class="con_img"><img style="width: 167px" src="static/img/paymentsuccess@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_text">{{$t("content1_txt.con_text4")}}</div>
            <div class="con_img">
              <img v-if="!lang_en" style="width: 100%" src="static/img/four@2x.png" alt="">
              <img v-if="lang_en" style="width: 100%" src="static/img/four_en@2x.png" alt="">
            </div>
          </div>
      </div>
      <div class="content content2">
        <div class="content2_list"  id="product">
          <div class="con_tit">{{$t("content2_txt.con_tit")}}</div><!--产品服务-->
          <div class="con_con">
            <div class="con_txt1">{{$t("content2_txt.con_text1.txt1")}}</div>
            <div class="con_txt2">{{$t("content2_txt.con_text1.txt2")}}</div>
            <div class="con_img"><img style="width: 299px" src="static/img/scanaQRcode@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_txt1">{{$t("content2_txt.con_text2.txt1")}}</div>
            <div class="con_txt2">{{$t("content2_txt.con_text2.txt2")}}</div>
            <div class="con_img"><img style="width: 289px" src="static/img/on-line@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_txt1" :class="{con_txt1_en:lang_en}">{{$t("content2_txt.con_text3.txt1")}}</div>
            <div class="con_txt2" :class="{text_left:lang_en}">{{$t("content2_txt.con_text3.txt2")}}</div>
            <div class="con_img"><img style="width: 325px" src="static/img/attention@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_txt1">{{$t("content2_txt.con_text4.txt1")}}</div>
            <div class="con_txt2" :class="{text_left:lang_en}">{{$t("content2_txt.con_text4.txt2")}}</div>
            <div class="con_img"><img style="width: 326px" src="static/img/redpacket@2x.png" alt=""></div>
          </div>
          <div class="con_con">
            <div class="con_txt1">{{$t("content2_txt.con_text5.txt1")}}</div>
            <div class="con_txt2">{{$t("content2_txt.con_text5.txt2")}}</div>
            <div class="con_img"><img style="width: 322px" src="static/img/data@2x.png" alt=""></div>
          </div>
          <div class="con_con" id="merchants"><!--商户领域-->
            <div class="con_txt1">{{$t("content2_txt.con_text6.txt1")}}</div>
            <div class="con_txt2" :class="{text_left:lang_en}">{{$t("content2_txt.con_text6.txt2")}}</div>
          </div>
        </div>
      </div>
        <div id="mer_box_logo"><!--合作商户-->
          <div class="tit">{{$t("use_mer.tit")}}</div>
          <!--<img style="width: 100%" src="static/img/dian@2x.png" alt="">-->
          <div class="swiper_box">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide>
                <img src="static/img/hai.png" alt=""><img src="static/img/di.png" alt="">
                <img src="static/img/zhoudafu.png" alt=""><img src="static/img/liufu.png" alt="">
              </swiper-slide>
              <swiper-slide>
                <img src="static/img/bai.png" alt=""><img src="static/img/yuan.png" alt="">
                <img src="static/img/qihua.png" alt=""><img src="static/img/sasa.png" alt="">
              </swiper-slide>
              <swiper-slide>
                 <img src="static/img/zhuoyue.png" alt="">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      <div class="company_profile" id="company"><!--公司介绍-->
        <div class="tit">{{$t("company_txt.tit")}}</div>
        <div class="text">{{$t("company_txt.text")}}</div>
        <img style="width: 100%" src="static/img/company@2x.png" alt="">
      </div>
      <div class="address">
        <div class="add_txt">{{$t("footer_txt.address")}}</div>
        <div v-if="lang_en">ADD: Room 812, 8/F, Well Borne Commerical Centre, 8 Java Road, North Point, Hong Kong</div>
        <div>TEL：+852-2798 8128</div>
        <div>Email：info@lettuce.com.hk</div>
      </div>
      <div class="footer">
        Copyright © 2018 LETTUCE LIMITED All Rights Reserved.
      </div>
    </div>

  </div>

</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                notNextTick: true,
                swiperOption: {
                    notNextTick: true,
                    direction: 'vertical',
                  autoplay: {
                   delay: 2000,
                   stopOnLastSlide: false,
                   disableOnInteraction: false,
                   },
                    loop: true,
                    speed: 200,
                    autoHeight: false,
                },
                mer_logo:[

                ],
                open:true,
                show:false,
                lang_en:false,
                nav_item:[
                    {
                        href:'#home',
                        text:this.$t("nav_txt.text1")
                    },
                    {
                        href:'#product',
                        text:this.$t("nav_txt.text2")
                    },
                    {
                        href:'#merchants',
                        text:this.$t("nav_txt.text3")
                    },
                    {
                        href:'#company',
                        text:this.$t("nav_txt.text4")
                    },
                    {
                        href:'#mer_box_logo',
                        text:this.$t("nav_txt.text5")
                    },
                ],
                banner:[
                    {
                        text:this.$t("banner_text.text1"),
                        img_src:'static/img/one@2x.png',
                        img_srcs:'static/img/state@2x.png'
                    },
                    {
                        text1:this.$t("banner_text.text2_1"),
                        text2:this.$t("banner_text.text2_2"),
                        img_src:'static/img/two@2x.png',
                        img_srcs:'static/img/user@2x.png'
                    },
                    {
                        text1:this.$t("banner_text.text3_1"),
                        text2:this.$t("banner_text.text3_2"),
                        img_src:'static/img/three@2x.png',
                        img_srcs:'static/img/pay@2x.png'
                    },
                ],
            }
        },
        //定义这个sweiper对象
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted(){
            if(this.$getCookie('langs')=='en'){
                this.lang_en =true
//                document.title='HTPay'
            }else{
                this.lang_en =false
//                document.title='恒通支付'
            }
//            console.log(this.$route.query.id)
//            var urlId = this.$route.query.id;
//            if(urlId=='mer_box_logo'){
//                var t = $("#"+urlId).offset().top;
////                var scorll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
////                    scorll = t
//              var list = $('menu_list a');
//                list.each(function () {
//                })
//                console.log(111,t)
//            }else if(urlId=='2'){
//                console.log(222)
//            }
        },
        methods: {
            menuBtn(){
                var that = this;
                if(that.open){
                    that.open=false
                }else{
                    that.open=true
                }

            },
            clickMenuBtn(){
                var that = this;
                if(that.open){
                    that.open=false
                }else{
                    that.open=true
                }
            },
            changeLangEvent() {
                var that = this;
                        if(this.$getCookie('langs')=='en'){
                            this.$setCookie('langs',"zh");
                            this.lang = 'zh';
                            this.$i18n.locale = this.lang;//关键语句
                            that.$router.push('/Home')
                            window.location.reload()
                        }else{
                            this.$setCookie('langs',"en");
                            this.lang = 'en';
                            this.$i18n.locale = this.lang;//关键语句
                            that.$router.push('/Home')
                            window.location.reload()
                        }
            },
        },
    }

</script>
<style scoped>
  #apps{
    text-align: center;
    font-weight: 300;
  }
  #apps .swiper-container-autoheight, #apps .swiper-container-autoheight .swiper-slide{
    height: 150px;
  }
  #apps .swiper-container{
    height: 150px;
  }
  .dis_none{
    display: none;
  }
  #mer_box_logo{
    position: relative;
  }
  #mer_box_logo .tit{
    font-size: 2.5rem;
    padding: 30px 15px 15px 15px;
    /*position: absolute;*/
    text-align: center;
    left:0;
    right:0;
  }
  #mer_box_logo .swiper_box{
    /*position: absolute;*/
    /*left: 10%;*/
    /*top: 33%;*/
    /*width: 80%;*/
      height: 150px;
    padding-bottom: 30px;
  }
  #mer_box_logo .swiper_box img{
    display: inline-block;
    width: 45%;
    margin-top: 10px;
    position: relative;
    top: 3px;
  }
  .text_left{
    text-align: left;
  }
  .fade-enter-active {
    transition: all .4s ease;
  }
  .fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to{
    transform: translateY(-100px);
    opacity: 0;
  }

  .con_tit,.con_txt1,.tit{
    font-weight: 400;
  }
  .nav{
    background: #0B8DF4;
    color: #ebebeb;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
  .nav ul>li{
    font-size: 1.8rem;
    line-height: 60px;
    text-align: left;
    padding-left: 30px;
  }
  .nav ul>li a{
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .nav ul>li:nth-child(2n){
    background:#2899eb;
  }
  .menu-box{
    position: fixed;
    height: 40px;
    width: 40px;
    float: right;
    right: 15px;
    top: 10px;
    z-index:110;
    color: #fff;
    background:#0B8DF4;
    border-radius: 50%;
    border: 1px solid transparent;
  }
  .menu-box .icon-menu{
    position: absolute;
    top: 13px;
    left: 10px;
    display: inline-block;
    width: 20px;
    height: 1px;
    padding: 5px 0;
    border-top: 1px solid;
    border-bottom: 1px solid;
    background-color: currentColor;
    background-clip: content-box;
  }
  .menu-box .icon-close{
    position: absolute;
    top: 19px;
    left: 10px;
    display: block;
    width: 20px;
    height: 1px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .menu-box .icon-close:after{
    position: absolute;
    top: 0px;
    left: 0px;
    content:'';
    display: block;
    width: 20px;
    height: 1px;
    background: #fff;
    transform: rotate(-90deg);
  }
  .menu-box .icon-circle{
    display: inline-block;
    height: 40px;
    width: 40px;
    box-sizing: border-box;
    border: 1px solid #f8f8f8;
    border-radius: 50%;
  }
  .head{
    position: relative;
  }
  .head .img_bg{
    width: 100%;
    height: 100%;
  }
  .head .img_logo{
    position: absolute;
    width: 102px;
    height: 32px;
    top: 20px;
    left: 15px;
  }
  .head .head_con{
    position: absolute;
    top: 7rem;
    color: #fff;
    width: 100%;
  }
  .head .head_con .text1{
    font-size: 2.5rem;
    margin: 0px auto 15px auto;
    width: 48%;
  }
  .head .head_con .text2{
    font-size: 2.5rem;
    margin: 10px auto 0 auto;
    width: 66%;

  }
  .head .head_con .text1_en{
    font-size: 2.2rem;
    width: 70%;
  }
  .head .head_con .text2_en{
    font-size: 2.2rem;
    width: 90%;
  }
  .banner{
    width: 92%;
    /*height: 225px;*/
    position: relative;
    top: -6rem;
    left: 4%;
    box-shadow: 0px 1px 2px 0px #e5e5e5;
  }
  .banner .banner_con{
    background: #fff;
    color: #333;
    height: 200px;
    font-size: 2.4rem;
    padding-top: 50px;
  }
  .banner .banner_con_en{
    font-size: 2rem;
  }
  .banner .banner_con .banner_text{
    width: 75%;
    margin: 15px auto;
  }
  .banner .banner_con .banner_text_en{
    width: 90%;
  }
  .container{
    position: relative;
    top: -50px;
  }
  .container .content{
    color: #333;
  }
  .container .content .con_tit{
    font-size: 2.5rem;
    color: #333;
    padding-top: 20px;
  }
  .container .content .con_text{
    font-size: 1.8rem;
    padding: 20px 15px 20px 15px;
    text-align: left;
    line-height: 2.6rem;
  }
  .container .content .con_img{
    /*padding-bottom: 20px;*/
  }
  .container .content .con_con:nth-child(5){
    background: #f8f8f8;
  }
  .container .content.content2 .con_con:nth-child(3),.container .content.content2 .con_con:nth-child(5),.container .content.content2 .con_con:nth-child(7){
    background: #f8f8f8;
  }
  .container .content.content2 .con_tit{
    padding-top: 40px;
  }
  .container .content.content2 .con_txt1:nth-child(2){
    font-size: 2rem;
    padding-top: 10px;
  }
  .container .content.content2 .con_txt1{
    font-size: 2rem;
    padding-top: 30px;
    line-height: 2.6rem;
  }
  .container .content.content2 .con_txt1_en{
    font-size: 2rem;
    padding: 30px 30px 0px 30px;
    text-align: center;
  }
  .container .content.content2 .con_txt2{
    font-size: 1.8rem;
    padding: 10px 25px 20px 25px;
    color: #666;
    line-height: 2.6rem;
  }
  .company_profile{
    color: #ebebeb;
    position: relative;
  }
  .company_profile img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .company_profile .tit{
    font-size: 2.5rem;
    padding: 35px 15px 25px 15px;
  }
  .company_profile .text{
    font-size: 1.8rem;
    padding: 0px 15px 30px 15px;
    text-align: left;
    line-height: 2.6rem;
  }
  .address{
    padding: 20px 15px;
    background: #f8f8f8;
    text-align: left;
    font-size: 1.3rem;
    color: #666;
    line-height: 1.8rem;
    font-family: 'PingFang-SC-Regular';
  }
  .address .add_txt{
    font-size: 1.2rem;
  }
  .footer{
    font-size: 1.1rem;
    color: #666;
    padding: 15px 10px 15px 10px;
    position: absolute;
  }
  #apps .el-carousel__item{
    background: #fff;
  }
  #apps .banner .el-carousel .el-carousel__container{
    height: 200px;
  }
  .el-carousel__item p{
    position: absolute;
    top:10rem;
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style>
  #app #apps .banner .el-carousel .el-carousel__container{
    height: 200px;
  }
</style>
