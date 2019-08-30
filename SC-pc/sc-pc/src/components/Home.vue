<template>
    <div id="home">
        <div class="head" :class="isFixed?'isfiexd':''">
            <div class="con_1000">
                <div class="logo"><img src="/static/img/logo_head.png" alt=""></div>
                <div class="menu">
                    <span v-for="(item,index) in menu_list" :class="index==selected_id? 'color_selected':''">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="content1" :style="h_bottom">
            <img id="content1_img" src="/static/img/content1.jpg" alt="">
            <div class="con_1000">
                <div class="txt">
                    <span> 至今最好的   餐飲POS</span>
                    <br>
                    <span> 穩定、高效、切合成本效益</span>
                </div>
            </div>
        </div>
        <div class="content2">
            <div class="con_1000">
               <div class="tit">全面提高餐廳營運效率</div>
                <div class="box_list">
                    <div class="box_item" v-for="item in box_list">
                        <img :src="item.src_url" alt="">
                        <div>商品管理</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content3">
            <div class="con_1000" style="position: relative">
               <div class="tit">即時智能撞餐</div>
                <div class="text">智能撞餐功能，可以將不同的項目自動生成套餐，更沒有任何數量限制，你有權將20個項目設置在一個套餐內。所有撞餐后的價格均會在落單畫面直接顯示。項目一經取消、更改，所有價格便會自動重新計算。一切運作均自動進行，沒有任何學習過程。</div>
                <img src="/static/img/content3.png" alt="">
            </div>
        </div>
        <div class="content4">
            <div class="con_1000">
               <div class="tit">無論你身在何方 <span style="color: #25b7aa">皆可管理你的餐廳</span></div>
                <div class="box_img">
                    <img src="/static/img/content4_1.jpg" alt="">
                    <img src="/static/img/content4_2.jpg" alt="">
                    <img src="/static/img/content4_3.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="content5">
            <div class="con_1000">
               <div class="text">
                   <div class="tit">多品牌、多分店、多地點、一站式管理</div>
                   <div class="txt">
                       <span style="color: #25b7aa">POS不再是你擴充生意的絆腳石</span>
                       <br>
                       不用頻撲、無論你有多少品牌或分店均可集中在生菜&#174;HQ一站式管理。你可以為你龐大的管理團隊設置不同的管理權限級別，把他們編配到不同的品牌或分店。所有事情均由你全權掌控。
                   </div>
               </div>
               <div class="text"><img src="/static/img/content5.jpg" alt=""></div>
            </div>
        </div>
        <div class="content6">
            <div class="con_1000">
               <div class="tit">
                   <span style="color: #25b7aa">一套系統</span>滿足不同營運模式
                   <div style="font-size: 24px">自取快餐？伙計埋單？顧客櫃面埋單？實時設置不同營運方式</div>
               </div>
                <div class="con6">
                    <img src="/static/img/content6.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="content7">
            <div class="con_1000">
               <div class="tit">
                   <span style="color: #25b7aa">硬件選擇</span>更具彈性
                   <div style="font-size: 24px">傳統？輕便？新穎？專業？生菜&#174;可安裝在傳統或平板電腦！</div>
               </div>
                <div class="con6">

                    <img src="/static/img/content7.png" alt="">
                </div>
            </div>
        </div>
        <div class="content8">
            <div class="tit">
                超過3000家餐廳已加入我們！
            </div>
            <div class="con_1000">

                <div class="con6">

                    <img src="/static/img/mer_logo.png" alt="">
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="con_1000 f_con">
                <div class="f_box">
                    <div class="f_tit">幫助中心</div>
                    <div class="f_txt">POS硬件</div>
                    <div class="f_txt">使用手冊</div>
                    <div class="f_txt">FAQs</div>
                    <div class="f_txt">用戶論壇(有工作人員監察)</div>
                </div>
                <div  class="f_box">
                    <div class="f_tit">公司</div>
                    <!--<div class="f_txt">關於香港軟建</div>-->
                    <div class="f_txt">最新消息</div>
                </div>
                <!--<div  class="f_box">-->
                    <!--<div class="f_tit">下載</div>-->
                    <!--<div class="f_txt">生菜&#174;HQ(Android)</div>-->
                    <!--<div class="f_txt">生菜&#174;HQ(iOS)</div>-->
                    <!--<div class="f_txt">生菜&#174;員工手提落單</div>-->
                <!--</div>-->
                <div  class="f_box">
                    <div class="f_tit">服務時間</div>
                    <div class="f_txt">星期一至星期五  9：00-23：00</div>
                    <div class="f_txt">星期六  9：00-17：00</div>
                    <div class="f_txt">星期日及公眾假期休息</div>
                </div>
                <div  class="f_box" style="text-align: right">
                    <div class="f_tit">銷售熱線</div>
                    <div class="f_txt" style="font-size: 30px">+852  2798   8128</div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        h_bottom:{
            height:'842px'
        },
        menu_list:[
          {
            id:0,
            name:'主頁',
            },
          {
            id:1,
            name:'產品系列',
            },
          {
            id:2,
            name:'功能一覽',
            },
          {
            id:3,
            name:'價格',
            },
          {
            id:4,
            name:'下載',
            },
          {
            id:5,
            name:'幫助中心',
            },
        ],
        selected_id:0,
        isFixed:false,
        box_list:[
          {
            src_url:'/static/img/icon1.png',
            text:'商品管理'
          },
          {
            src_url:'/static/img/icon2.png',
            text:'餐牌設計'
          },
          {
            src_url:'/static/img/icon3.png',
            text:'付款方式'
          },
          {
            src_url:'/static/img/icon4.png',
            text:'智能運營'
          },
          {
            src_url:'/static/img/icon5.png',
            text:'體檢中心'
          },
          {
            src_url:'/static/img/icon6.png',
            text:'智能報表'
          },
          {
            src_url:'/static/img/icon7.png',
            text:'會員積分'
          },
          {
            src_url:'/static/img/icon8.png',
            text:'商品沽清'
          }
        ]
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.img_height)
      window.addEventListener('load', this.img_height)

    },
    methods:{
      handleScroll () {
        var _this = this;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop > 200){
          _this.isFixed = true;
        }else{
          _this.isFixed = false;
        }
      },
      img_height(){
        var that = this;
        var h = document.getElementById('content1_img').height
            console.log(h)
        if(h<=842){
          that.h_bottom.height = '842px'
        }else{
          that.h_bottom.height = h+'px'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less" type="text/less">
    .color_selected{
        color: #25b7aa;
    }
    #home{
        .con_1000{
            width: 1000px;
            margin: 0 auto;
        }
        .tit{
            font-size: 36px;
            padding: 60px 20px 40px 20px;
            text-align: center;
            line-height: 60px;
        }
        .head{
            height: 80px;
            line-height: 80px;
            position: fixed;
            top:0;
            width: 100%;
            padding:0 80px;
            z-index:19910506;
            .logo{
                float: left;
                img{
                    vertical-align: middle;
                    width: 170px;
                }
            }
            .menu{
                float: right;
                font-size: 18px;
                color: #fff;
                span{
                    margin: 0 20px;
                }
                span:hover{
                    cursor: pointer;
                }
            }
        }
        .isfiexd{
            background: #fff;
            box-shadow:0px 1px 10px rgba(0,0,0,0.1);
            .menu{
                font-size: 18px;
                color: #000;
            }
        }
        .content1{
                height:850px;
                /*margin-bottom: 107px;*/
                .txt{
                    font-size: 30px;
                    color: #fff;
                    margin: 0 auto;
                    padding-top: 10rem;
                    text-align: center;
                }
            img{
                max-width: 100%;
                min-width:1480px;
                /*min-height: 850px;*/
                position: absolute;
                z-index: -1;
            }
        }
        .content2{
            height: 550px;
            .box_list{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: center;
                width: 750px;
                margin: 0 auto;
                .box_item{
                    padding: 20px 40px;
                    text-align: center;
                    font-size: 18px;
                }
            }
        }
        .content3{
            height: 788px;
            background:#25b7aa;
            color:#fff;
            position: relative;
            text-align: center;
            .text{
                font-size: 20px;
                color: #fff;
                width: 800px;
                margin: 20px auto 40px auto;
            }
           img{

           }
        }
        .content4{
            background:#f8f8f8;
            height: 500px;
            .box_img{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    margin-right: 20px;
                    width: 230px;
                }
            }
        }
        .content5{
            height: 500px;
            text-align: center;
            padding-top:60px;
            .text{
                display: inline-block;
                width: 490px;
                .txt{
                    font-size: 18px;
                }
            }
            img{
                width: 400px;
            }
        }
        .content6{
            height: 730px;
            background: #f8f8f8;
            text-align: center;
            .con6{
                font-size: 20px;
            }
            img{
                width: 600px;
            }

        }
        .content7{
            text-align: center;
            .con6{
                font-size: 20px;
            }
            img{
                width: 900px;
            }

        }
        .content8{
                padding-bottom:40px;
            .tit{
                background: #25b7aa;
                color: #fff;
                padding: 40px 0px 40px 0px
            }
            img{
                width: 1000px;
            }

        }
        .footer{
            height: 400px;
            background: #25b7aa;
            color:#fff;
            padding-top: 130px;
            .f_con{
                display: flex;
                justify-content: space-around;
                /*align-items: center;*/
                .f_box{
                    width: 220px;
                }
            }
            .f_tit{
                font-size: 30px;
                padding-bottom: 20px;
            }
            .f_txt{
                line-height: 30px;
                font-size: 16px;
            }
        }
    }
</style>
