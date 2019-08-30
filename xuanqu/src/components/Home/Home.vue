<template>
    <div id="home">
        <div class="head" @click="goIntroduce">
            <div class="title"><img src="/static/img/hke_h5_logo.png" alt=""></div>
            <div class="tit">統籌：{{leader}}</div>
            <div class="introduce">分會介紹 <img src="/static/img/jt.png" alt=""></div>
        </div>
        <div class="middle">北角&筲箕灣片區負責人——常務副會長：{{chairman1}}</div>
        <div class="content">
            <div class="box" v-for="item,index in list1">
                <div class="title"><div class="titleLeft"><img src="/static/img/zaZa.png" alt="">{{item.area}}</div><div class="titleRight"><img src="/static/img/small_logo.png" alt=""></div></div>
                <div class="con">
                    <div class="item" v-for="items,index in item.areaList">
                        <router-link :to="{path:'/Detail',query:{area:items}}">
                        {{items}}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="middle">北角&筲箕灣片區負責人——常務副會長：{{chairman2}}</div>
            <div class="box" v-for="item,index in list2">
                <div class="title"><div class="titleLeft"><img src="/static/img/zaZa.png" alt="">{{item.area}}</div><div class="titleRight"><img src="/static/img/small_logo.png" alt=""></div></div>
                <div class="con">
                    <div class="item" v-for="items,index in item.areaList">
                        <router-link :to="{path:'/Detail',query:{area:items}}">
                       {{items}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {cookie,Toast } from 'vux'
  export default {
    components: {
      cookie
    },
    data () {
      return {
        list1:[
              {
                area:'北角西',
                areaList:['C15寶馬山','C16炮台山','C17城市花園']
              },
              {
                area:'北角東',
                areaList:['C18和富','C20錦屏','C19堡壘','C21丹拿','C22健康村']
              },
              {
                area:'筲箕灣',
                areaList:['C03鯉景灣','C04愛秩序灣','C05筲箕灣','C06阿公岩','C27興東','C28西灣河','C29下耀東','C30上耀東']
              }
            ],
        list2:[
              {
                area:'鰂魚涌',
                areaList:['C01太古城西','C02太古城東','C14柏架山','C23鰂魚涌','C24南豐','C25康怡','C26康山']
              },
              {
                area:'柴灣',
                areaList:['C07杏花邨','C08翠灣','C12環翠','C13翡翠','C31興民','C32樂康','C33翠德','C34漁灣']
              },
              {
                area:'小西灣',
                areaList:['C09欣藍','C10小西灣','C11景怡','C35佳曉']
              }
            ],
        leader:'',
        chairman1:'',
        chairman2:'',
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      goIntroduce(){
        this.$router.push('/Introduce')
      },
      getData(){
        let that = this;
        that.$api.indexIndex({})
          .then(res => {
            console.log(res)
            if (res.data.state == 1) {
                that.leader = res.data.data.leader
                that.chairman1 = res.data.data.chairman1
                that.chairman2 = res.data.data.chairman2
            } else {
              that.$dialog.toast({
                mes: res.data.msg,
                timeout: 1000,
                icon: 'error',
                callback: () => {
                }
              })
            }
          })
          .catch(res => {
            that.$dialog.toast({
              mes: res.data.msg,
              timeout: 1000,
              icon: 'error',
              callback: () => {
              }
            })
          })
      },
      beforeCreate () {

      },

      beforeDestroy () {

      }
    }
  }
</script>
<style  lang="less" type="text/less">
    #home{

    }
</style>
<style lang="less" type="text/less" scoped>

    #home {
        padding-bottom: 55px;
        background: #efefef;
        .head{
            background: #f5f5f5;
            text-align: center;
            padding: 15px 20px;
            line-height: .5rem;
            font-size: .28rem;
            box-shadow:0px 2px 5px rgba(0,0,0,0.06);
            position: relative;
            .introduce{
                padding: 5px 10px 0px;
                font-weight: bold;
                color: #232323;
                display: inline-block;
                img{
                    width: 6.5px;
                    position: relative;
                    top:-1px;
                }
            }
            .title{
                padding-bottom: 10px;
                img{
                    width: 80%;
                }
            }
        }
        .middle{
            color: #666;
            /*background: rgba(239,247,255,1);*/
            padding: 10px 20px;
            text-align: center;
            font-size: .24rem;
        }
        .content{
            .box{
                background: #F5F5F5;
                box-shadow:0px 2px 5px rgba(0,0,0,0.06);
                border-radius:4px;
                margin: 0px 10px 10px 10px;
                padding: 15px;
                .title{
                    color: #fff;
                    font-size: .3rem;
                    font-weight: bold;
                    padding-bottom: 15px;
                    .titleLeft,.titleRight{
                        display: inline-block;

                    }
                    .titleLeft{
                        background: #CB0300;
                        width: 70%;
                        border-radius:4px 0px 0px 4px;
                        box-shadow:0px 2px 5px rgba(0,0,0,0.2);
                        padding: 5px;
                        img{
                            width: 30px;
                        }
                    }
                    .titleRight{
                        background: #595859;
                        width: 30%;
                        border-radius:0px 4px 4px 0px;
                        box-shadow:0px 2px 5px rgba(0,0,0,0.2);
                        text-align: center;
                        img{
                            width: 39px;
                        }
                    }
                }
                .con{
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    .item{
                        width: 32%;
                        text-align: center;
                        font-size: .26rem;
                        color: #333;
                        padding: 3px 0;
                        background:linear-gradient(180deg,rgba(246,246,247,1) 0%,rgba(237,237,237,1) 8%,rgba(255,255,255,1) 43%,rgba(229,229,229,1) 85%,rgba(201,201,201,1) 100%);
                        box-shadow:0px 2px 3px rgba(0,0,0,0.1);
                        border:1px solid rgba(219,219,219,1);
                        border-radius:4px;
                        margin-bottom: 8px;
                        margin-right:1%;
                        a{
                            padding: 6px 8px;
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
</style>
