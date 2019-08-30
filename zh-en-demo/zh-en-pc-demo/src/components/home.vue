<template>
  <div id="apps">
    <div class="head_bg">
      <div class="navbar navbar-fixed-top dis_none" role="navigation" data-0=" box-shadow: 0px 0px 0px 0px rgba(229,229,229,0);line-height:90px; height:90px; background-color:rgba(32, 160, 237, 0);" data-300=" box-shadow: 0px 1px 2px 0px  rgba(229,229,229,1);line-height:90px; height:90px; background-color:rgba(255,255,255,1);">
        <div class="container-fluid nav-top">
          <div style="width:181px;height:59px;margin-left: 60px;display: inline-block;" data-0="margin-top:16px;background:url('static/images/yingwenlogob.png');background-size: cover;background-repeat: no-repeat;" data-300="margin-top:8px;background:url('static/images/en_logo.png');background-size: cover;background-repeat: no-repeat;">
          </div>
          <div class="navbar-header">
            <ul class="nav navbar-nav" data-0="margin-top:30px;" data-300="margin-top:25px;">
              <li v-for="(item,index) in nav_item" :key="index"><a data-0="color:rgba(255,255,255,1);" @click="menu_btn(index)" data-300="color:rgba(106,106,106,1);" :href="item.href"><span :data-title="item.text" :class="{menu_active:index==menu_active}">{{item.text}}</span></a></li>
              <li class="lang_en_zh" @click="changeLangEvent" data-0="border-color:rgba(239,239,239,1)" data-300="border-color:rgba(204,204,204,1)"><a data-0="color:rgba(255,255,255,1);" data-300="color:rgba(106,106,106,1);border-color:rgba(15,154,238,1)" class=""><span :data-title="$t('zh_en.text')">{{$t("zh_en.text")}}</span></a></li>
            </ul>
            <span data-0="margin-top:20px;" data-300="margin-top:15px;"></span>
          </div>
        </div>
      </div>
      <div class="head_tit">
        <div class="head_text1" :class="{text1_en:lang_en}">{{$t("head_con.text1")}}</div>
        <div class="head_text2" :class="{text2_en:lang_en}">{{$t("head_con.text2")}}</div>
      </div>
      <div class="head_banner" :class="{head_banner_en:lang_en}">
          <div class="banner_list" @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave" :class="{active:index==isActive}"  data-aa="{active:index}" v-for="(item,index) in banner" :key="index">
            <!--<img :src="item.img_src" alt="">-->
            <img :class="{dis_none:index==isActive}" :src="item.img_src" alt="">
            <img :class="{dis_none:index!=isActive}" :src="item.img_srcs" alt="">
            <div>{{item.text}}</div>
          </div>
      </div>
    </div>
    <div class="banner">
      <div class="banner_tit">{{$t("content1_txt.con_tit")}}</div>
      <div id="indexPage">
        <div id="mproject" class="module bgShow">
          <!--<div class="bgmask"></div>-->
          <div class="content layoutslider">

            <!--yyLayout masonry-->
            <div class="module-content" id="projectlist">
              <div class="projectSubList" id="projectSubList_">
                <div class="projectSubHeader">
                  <p class="title"></p>
                  <p class="subtitle"></p>
                </div>
                <div class="wrapper">
                  <ul class="content_list" data-options-sliders="3" data-options-margin="15"
                      data-options-ease="cubic-bezier(0.8,0.4,0.2,1)" data-options-speed="0.5">
                    <li id="projectitem_0" class="projectitem wow">
                      <div class="projectitem_content" >
                        <div class="projectitem_wrapper">
                          <div class="project_img">
                            <img src="static/images/one.png" alt="" width="417" height="417"/>
                          </div>
                          <div class="project_info">
                            <div>
                              <p class="title">{{$t("content1_txt.con_text1")}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li id="projectitem_1" class="projectitem wow">
                      <div class="projectitem_content">
                        <div class="projectitem_wrapper">
                          <div class="project_img">
                            <img src="static/images/two.png" alt="" width="417" height="417"/>
                          <div class="project_info">
                            <div>
                              <p class="title">{{$t("content1_txt.con_text2")}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </li>
                    <li id="projectitem_2" class="projectitem wow">
                      <div class="projectitem_content" >
                        <div class="projectitem_wrapper">
                          <div class="project_img">
                            <img src="static/images/three.png" alt="" width="417" height="417"/>
                          </div>
                          <div class="project_info">
                            <div>
                              <p class="title">{{$t("content1_txt.con_text3")}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li id="projectitem_3" class="projectitem wow">
                      <div class="projectitem_content" >
                        <div class="projectitem_wrapper">
                          <div class="project_img">
                            <img v-if="!lang_en" src="static/images/four.png" alt=" " width="417" height="417"/>
                            <img v-if="lang_en" src="static/images/four_en.png" alt=" " width="417" height="417"/>
                          </div>
                          <div class="project_info">
                            <div>
                              <p class="title">{{$t("content1_txt.con_text4")}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div><!--wrapper-->

              </div><!--projectSubList-->
            </div>
          </div>
        </div>
        <div id="mindex" data-options-ease="Expo.easeInOut" data-options-speed="1" data-options-sscreen="0"></div>
      </div>
    </div>
    <div class="content">
        <div class="con_box d_jump" id="product">
          <div class="con_title">{{$t("content2_txt.con_tit")}}</div>
          <div class="con_tit">{{$t("content2_txt.con_text1.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text1.txt2")}}</div>
          <img src="static/images/saomaa.png" alt="">
        </div>
        <div class="con_box">
          <div class="con_tit">{{$t("content2_txt.con_text2.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text2.txt2")}}</div>
          <img src="static/images/wangye.png" alt="">
        </div>
        <div class="con_box">
          <div class="con_tit">{{$t("content2_txt.con_text3.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text3.txt2")}}</div>
          <img src="static/images/guanzhu.png" alt="">
        </div>
        <div class="con_box">
          <div class="con_tit">{{$t("content2_txt.con_text4.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text4.txt2")}}</div>
          <img src="static/images/hongbao.png" alt="">
        </div>
        <div class="con_box">
          <div class="con_tit">{{$t("content2_txt.con_text5.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text5.txt2")}}</div>
          <img src="static/images/houtaiguanli.png" alt="">
        </div>
        <div class="mer_box d_jump" id="merchants">
          <div class="con_tit">{{$t("content2_txt.con_text6.txt1")}}</div>
          <div class="con_text">{{$t("content2_txt.con_text6.txt2_pc1")}} <span>{{$t("content2_txt.con_text6.txt2_pc2")}}</span></div>
          <div class="con_textcon">{{$t("content2_txt.con_text6.txt2_pc3")}}</div>
        </div>
        <div class="company d_jump" id="company" style="    margin-top: 100px;">
          <div class="com_title">{{$t("company_txt.tit")}}</div>
          <div class="com_con">
            <img src="static/images/jianjie.png" alt="">
            <div class="com_con_main">
              <div class="com_name" :class="{dis_none:lang_en}"><span class="span">{{$t("company_txt.text_pc1")}}</span>{{$t("company_txt.text_pc2")}}</div>
              <div class="com_text">{{$t("company_txt.text_pc")}}</div>
            </div>
          </div>
          <div class="clear_both"></div>
        </div>
      <div class="use_mer d_jump" id="cooperation">
        <img class="img_bg" src="static/images/diannao.png" alt="">
        <div class="use_mer_box">
          <div class="use_mer_tit">{{$t("use_mer.tit")}}</div>
          <div class="img_box">
            <img src="static/images/di.png" alt="">
            <img src="static/images/hai.png" alt="">
            <img src="static/images/sasa.png" alt="">
            <img src="static/images/zhuoyue.png" alt="">
            <img src="static/images/bai.png" alt="">
            <img src="static/images/yuan.png" alt="">
            <img src="static/images/liufu.png" alt="">
            <img src="static/images/zhoudafu.png" alt="">
            <img src="static/images/qihua.png" alt="">
          </div>
        </div>
      </div>
      <div class="footer">
            <div class="footer_left">
                  <div class="con_tit">{{$t("footer_txt.tit")}}</div>
                  <div>{{$t("footer_txt.address")}}</div>
                  <div class="add_en">FLAT / RM 12 TOWER B 5/F HUNG HOM COMMERCIAL CENTRE NO.37 MA TAU WAI ROAD KOWLOON HONGKONG</div>
                  <div>TEL：+852-27895508</div>
                  <div>Email：service@htpay.com.hk</div>
            </div>
            <div class="footer_right dis_none">
                <label class="control-label col-lg-1 col-md-1 col-sm-1">{{$t("footer_txt.name")}}</label>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input type="text" v-model="name" class="form-control" placeholder="">
                </div>
                <label class="control-label col-lg-1 col-md-1 col-sm-1">{{$t("footer_txt.email")}}</label>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input type="email" v-model="email" class="form-control" placeholder="">
                </div>
              <label class="control-label col-lg-1 col-md-1 col-sm-1">{{$t("footer_txt.phone")}}</label>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input type="text" v-model="phone" class="form-control" placeholder="">
                </div>
              <div class="col-lg-12 textarea_box">
               <textarea class="form-control" v-model="text_con" :placeholder="$t('footer_txt.textarea')"></textarea>
              </div>
              <div>
                <button type="button"  class="btn btn-default tj_btn" @click="tj_btn">{{$t("footer_txt.tj_btn")}}</button>
              </div>
            </div>
      </div>
      <div class="footer_bottom">Copyright © 2018 HONGKONG HANG TUNG PAY LIMITED All Rights Reserved.</div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
    export default {
        data () {
            return {
                isActive:4,
                menu_active:5,
                name:'',
                email:'',
                phone:'',
                text_con:'',
                lang_en:false,
                nav_item:[
                    {
                        href:'#home',
                        text:this.$t("nav_txt.text1")
                    },
                    {
                        href:'#product',
                        text:this.$t("nav_txt.text2_pc")
                    },
                    {
                        href:'#merchants',
                        text:this.$t("nav_txt.text3")
                    },
                    {
                        href:'#company',
                        text:this.$t("nav_txt.text4_pc")
                    },
                    {
                        href:'#cooperation',
                        text:this.$t("nav_txt.text5")
                    },
                ],
                banner:[
                    {
                        text:this.$t("banner_text.text1_pc"),
                        img_src:'static/images/detu.png',
                        img_srcs:'static/images/detulan.png'
                    },
                    {
                        text:this.$t("banner_text.text2_pc"),
                        img_src:'static/images/yonghu.png',
                        img_srcs:'static/images/yonghulan.png'
                    },
                    {
                        text:this.$t("banner_text.text3_pc"),
                        img_src:'static/images/saoma.png',
                        img_srcs:'static/images/saomalan.png'
                    },
                ],
                name_msg:this.$t("tip_msg.name_msg"),
                phone_msg:this.$t("tip_msg.phone_msg"),
                text_con_msg:this.$t("tip_msg.text_con_msg"),
            }
        },
        //定义这个sweiper对象
        computed: {

        },
        mounted(){

           window.addEventListener('scroll', this.onScroll)

            if(this.$getCookie('langs')=='en'){
                this.lang_en =true
            }else{
                this.lang_en =false
            }
        },
        methods: {
            onScroll(){
                var scrol= Number($(window).scrollTop()), that = this;
                if(scrol<400){
                    that.menu_active=5
                }else if(400<=scrol && scrol<1570){
                    that.menu_active=0
                }else if(1570<=scrol && scrol<4785){
                    that.menu_active=1
                }else if(4785<=scrol && scrol<5250){
                    that.menu_active=2
                }else if(5250<=scrol && scrol<5890){
                    that.menu_active=3
                }else if(scrol>=5890){
                    that.menu_active=4
                }
            },
            menu_btn(index){
                var that = this;
                let scrol_top ='';
                if(index==0){
                    that.menu_active=5
                    scrol_top=0
                }else if(index==1){
                    that.menu_active=1
                    scrol_top=1570
                }else if(index==2){
                    that.menu_active=2
                    scrol_top=4785
                }else if(index==3){
                    that.menu_active=3
                    scrol_top=5250
                }else if(index==4){
                    that.menu_active=4
                    scrol_top=5890
                }
                $('html,body').animate({
                        scrollTop: scrol_top+'px'
                    },
                    1000);
            },
            tj_btn(){
               var that = this;
                if(this.name==''){
                   layer.msg(that.name_msg)
                    return false
                }
                if(this.phone==''){
                    layer.msg(that.phone_msg)
                    return false
                }
                if(this.text_con==''){
                    layer.msg(that.text_con_msg)
                    return false
                }

//                that.$http.post('/h5/user/login', this.$qs.stringify(
//                    {
//                        mobile_phone:that.inputValue,
//                        code:that.verifyCode
//                    }
//                ))
//                    .then(function (response) {
//                        console.log(response);
//                        if(response.data.err==1){
//
//
//                        }else{
//
//                        }
//
//                    })
//                    .catch(function (response) {
//
//                    })
            },
            //   鼠标移入
            mouseEnter(index){
                this.isActive = index;
            },
            //   鼠标移除1
            mouseLeave(){
                this.isActive=null;
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
<style >

</style>