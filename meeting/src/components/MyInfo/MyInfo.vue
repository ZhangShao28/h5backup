<template>
    <div id="myinfo">
        <div class="top">
            <div class="top_head">
                <flexbox>
                    <flexbox-item :span="8">
                        <div @click="go_myinformaction">
                            <span class="my_img"><img :src="u_logo" alt=""></span>
                            <div class="top_right">
                                <div class="u_name">{{u_name}}</div>
                                <div class="out_btn">查看資料</div>
                                <!--<div class="out_btn" @click="exit_login">登    出</div>-->
                            </div>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="4" class="text_algin_r" v-if="openCid==1">
                        <router-link :to="{path:'/ApplyAdmissionList',query:{acid:1}}">
                            <x-button class="apply_btn" mini>入會申請</x-button>
                        </router-link>
                    </flexbox-item>
                    <flexbox-item :span="4" class="text_algin_r" v-else>
                        <router-link :to="{path:'/ApplyAdmission',query:{pid:0,cid:openCid}}">
                            <x-button class="apply_btn" mini>入會申請</x-button>
                        </router-link>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="top_tab">
                <tab :line-width="2" class="badge_box">
                    <tab-item :selected="select_id === index" v-for="(item, index) in tab_list"
                              :class="{'vux-1px-r': index===0}" @on-item-click="handler" :key="index">{{item.title}}
                    </tab-item>
                    <span v-if="cid>0" class="badge_icon"> </span>
                </tab>
            </div>
        </div>
        <!--<div class="jf_tip">-->
        <!--您有未繳費的項目，點擊查看~~-->
        <!--</div>-->
        <div v-if="select_id==0">
            <div class="content">
                <div class="content_list">
                    <div v-if="xh_yes_no1==1" v-for="(item,index) in list" :key="index" class="list_box">
                        <flexbox>
                            <flexbox-item :span="1.6">
                                <span class="xh_logo"><img :src="item.c_logo" alt=""
                                                           onerror="this.src='/static/img/ic_default.png'"></span>
                            </flexbox-item>
                            <flexbox-item :span="10.4">
                                <div class="property_name">{{item.property_name}}</div>
                                <div class="post_name">{{item.post_name}}</div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <div v-if="xh_yes_no1==0" class="no_list">
                        <img src="/static/img/ic_my_association.png" alt="">
                        <div class="no_list_title">
                            暫未獲得您的商會
                        </div>
                    </div>
                </div>
            </div>
            <div class="no_my_xh">
                <router-link to="/NoAssociation">
                    未看到我的商會？
                </router-link>
            </div>
        </div>
        <div v-if="select_id==1">
            <div class="content">
                <div class="content_list">
                    <div v-if="xh_yes_no2==1" v-for="(item,index) in apply_list" :key="index" class="list_box">
                        <flexbox>
                            <flexbox-item :span="1.6">
                                <span class="xh_logo"><img :src="item.c_logo" alt=""
                                                           onerror="this.src='/static/img/ic_default.png'"></span>
                            </flexbox-item>
                            <flexbox-item :span="10.4">
                                <div class="property_name">{{item.property_name}}</div>
                                <div class="tips color_EBAC00"
                                     v-if="item.status==1&&item.is_charge==2&&item.is_payment==2">
                                    <router-link :to="{path:'/ApplyAdmission',query:{pid:0,cid:item.cid}}">
                                        審核已通過请缴纳会费(HK${{item.charge_money}})
                                    </router-link>
                                </div>
                                <div class="tips color_3D82D9" v-if="item.status==2">
                                    <router-link :to="{path:'/ApplyAdmission',query:{pid:0,cid:item.cid}}">
                                        資料已提交，正在審核中…
                                    </router-link>
                                </div>
                                <div class="tips color_ED6F6F" v-if="item.status==3">
                                    <router-link :to="{path:'/ApplyAdmission',query:{pid:0,cid:item.cid}}">
                                        審核未通過，查看原因…
                                    </router-link>
                                </div>
                                <div class="delete_btn" v-if="item.status==3" @click="delete_btn(item.id)"><img
                                        src="/static/img/bt_delete.png" alt=""></div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <div v-if="xh_yes_no2==0" class="no_list">
                        <img src="/static/img/ic_my_auditing.png" alt="">
                        <div class="no_list_title">
                            暫無審核中的商會···
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-transfer-dom>
            <confirm v-model="show"
                     :title="title"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm"
                     confirm-text="確認"
                     cancel-text="取消">
            </confirm>
        </div>
        <!--<div v-transfer-dom>-->
        <!--<confirm v-model="show2"-->
        <!--:title="title2"-->
        <!--@on-cancel="onCancel2"-->
        <!--@on-confirm="onConfirm2"-->
        <!--confirm-text="確認"-->
        <!--cancel-text="取消">-->
        <!--</confirm>-->
        <!--</div>-->
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
    TransferDomDirective as TransferDom
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      cookie,
      Cell,
      XButton,
      Tab,
      TabItem,
      Confirm
    },
    data () {
      return {
        openCid: cookie.get('cid'),
        xh_name: '',
        tip_state: 1,
        show: false,
        show2: false,
        title: '確認刪除該商會',
        title2: '確認登出？',
        id: '',//刪除是要用的id
        u_logo: '',
        u_name: '用戶昵称',
        xh_yes_no1: 3,//是否有协会
        xh_yes_no2: 3,//是否有协会
        list: [],
        apply_list: [],
        cid: '',
        tab_list: [
          {
            title: '我的商會'
          },
          {
            title: '審核中商會'
          }
        ],
        select_id: 0,//默認為我的商会
      }
    },
    mounted(){
      var that = this, ids = cookie.get('myinfo_id')
      var  t_state = document.cookie.indexOf('token=')
//            console.log(l_state)
      if (t_state == -1) {
        that.$dialog.toast({
          mes: '登入過期，請重新登入',
          timeout: 1000,
          icon: 'error',
          callback: () => {
            that.$router.push({path: '/Login', query: {cid: cookie.get('cid')}})
          }
        })

      }
      if (ids == 0 || ids == undefined) {
        that.select_id = 0
      } else {
        that.select_id = 1
      }
      that.my_list()
    },
    methods: {
      handler(el){
        var that = this
        that.select_id = el
        cookie.set('myinfo_id', el, {expires: 30000, path: '/'})
//            if(el==0){
//              that.loadList1()
//            }else if(el==1){
//              that.loadList2()
//            }
      },
      delete_btn(el){
        this.show = true
        this.id = el
      },
      onCancel () {

      },
      onCancel2 () {

      },
      onConfirm (el) {
        var that = this
        that.api.admissionDelete({
          id: that.id
        })
          .then(function (response) {
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'success',
              callback: () => {
                that.my_list()
              }
            })
          })
          .catch(function (response) {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      my_list(){
        this.$dialog.loading.open('正在加載中···')
        var that = this
        that.api.userMy({
          cid: cookie.get('cid')
        })
          .then(function (response) {
            that.$dialog.loading.close()
            console.log(response)
            var data = response.data.data
            that.u_logo = data.u_logo
            that.cid = data.cid
            that.u_name = data.u_nickname
            if (Array.isArray(data.property) && data.property.length == 0) {
              that.xh_yes_no1 = 0
            } else {
              that.xh_yes_no1 = 1
              that.list = data.property
            }
            if (Array.isArray(data.audit_property) && data.audit_property.length == 0) {
              that.xh_yes_no2 = 0
            } else {
              that.xh_yes_no2 = 1
              that.apply_list = data.audit_property
            }

          })
          .catch(function (response) {
            that.$dialog.loading.close()
            console.log(response)
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
      go_myinformaction(){
        this.$router.push('/MyInformation')
      },
    },
    created(){
      document.body.setAttribute('class', 'bodyheight')
    }
  }
</script>
<style lang="less" type="text/less">
    .badge_icon {
        height: 8px;
        display: inline-block;
        width: 8px;
        border-radius: 104px;
        background: #F06D6D;
        position: absolute;
        right: 2rem;
        top: 0.53rem;
        font-size: 0.55rem;
        color: #fff;
        line-height: 16px;
        padding-left: 4px;
    }
    body .v-transfer-dom .vux-confirm .weui-dialog .weui-dialog__bd {
        min-height: inherit;
    }
    body .v-transfer-dom .vux-confirm .weui-dialog .weui-dialog__btn_primary {
        color: #3D82D9;
    }
    body #app #myinfo {
        background: #f5f5f5;
        height: 100%;
        .vux-tab-wrap {
            /*box-shadow: 0px 1px 3px rgba(0,0,0,0.1);*/
            .vux-tab .vux-tab-item.vux-tab-selected {
                color: #3D82D9;
                border-bottom: 3px solid #3D82D9;
            }
            .vux-tab-ink-bar {
                background-color: #3D82D9;
                width: 80px;
                margin: 0 auto;
            }
            .vux-tab .vux-tab-item {
                font-size: .65rem;
            }
        }

    }
    #app #myinfo .apply_btn {
        padding: 0px 12px;
        margin-right: 10px;
        border-radius: 30px;
        background: linear-gradient(182deg, rgba(65, 147, 217, 1) 0%, rgba(61, 130, 217, 1) 100%);
        box-shadow: 0px 3px 6px rgba(0, 37, 96, 0.16);
        font-size: .54rem;
    }
    #app #myinfo {
        background: #f5f5f5;
        height: 100%;
        margin-bottom: 60px;
        padding-bottom: 40px;
        font-size: .65rem;
        .no_my_xh {
            color: #3D82D9;
            font-size: .6rem;
            text-align: center;
            padding-top: 20px;
        }
    }
    #myinfo .top {
        /*line-height: 60px;*/
        background: #fff;
        margin: 0 auto 12px auto;
        border-radius: 4px;
        position: fixed;
        width: 100%;
        z-index: 1;
        top: 0;
        .top_head {
            padding: 20px;
        }
        .top_tab {
            border-top: 1px solid #ececec;
            .badge_box {
                position: relative;
            }
        }
        /*box-shadow:0px 1px 10px rgba(0,0,0,0.08);*/
        .u_name {
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: bold;
            font-size: .7rem;
        }
        .top_right {
            padding-top: 10px;
        }
        .out_btn {
            color: rgb(153, 153, 153);
            font-size: .5rem;
        }
        .my_img {
            float: left;
            margin-right: 10px;
            background: #f8f8f8;
            width: 60px;
            height: 60px;
            border-radius: 60px;
            img {
                width: 60px;
                height: 60px;
                border-radius: 60px;
            }
        }
    }
    #myinfo .jf_tip {
        font-size: 0.55rem;
        width: 100%;
        color: #fff;
        margin: 0 auto 2px auto;
        padding: 6px 8px;
        /*border-radius:4px;*/
        background: rgba(61, 130, 217, .8);
        position: fixed;
        top: 0;
    }
    #myinfo .content {
        font-size: 0.65rem;
        margin: 0 12px;
        padding-top: 155px;
        border-radius: 4px;
        /*box-shadow:0px 1px 10px rgba(0,0,0,0.08);*/
        .content_top {
            padding: 15px;
            border-bottom: 1px solid #e6e6e6;
            color: #333;
            .text_algin_l {
                font-size: .65rem;
            }
        }
        .content_list {
            /*max-height:350px;*/
            /*max-height:16rem;*/
            /*overflow-y: auto;*/
            .post_name {
                position: relative;
                top: 3px;
                font-size: .65rem;
                color: #333;
            }
            .property_name {
                /*overflow: hidden;*/
                /*text-overflow: ellipsis;*/
                /*white-space: nowrap;*/
                /*display: inherit;*/
                /*width: 220px;*/
            }
            .list_box {
                padding: 15px;
                margin-bottom: 6px;
                font-size: .65rem;
                background: #fff;
                color: rgb(102, 102, 102);
                box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.08);
                position: relative;
                .xh_logo {
                    width: 42px;
                    height: 42px;
                    border-radius: 42px;
                    display: inline-block;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;

                        border: 1px solid rgba(221, 221, 221, 1);
                    }
                }
                .tips {
                    /*color: #EBAC00;*/
                    text-decoration: underline;
                }
                .color_EBAC00 {
                    color: #EBAC00;
                }
                .color_3D82D9 {
                    color: #3D82D9;
                }
                .color_ED6F6F {
                    color: #ED6F6F;
                }
                .delete_btn {
                    position: absolute;
                    top: 25px;
                    right: 15px;
                    padding: 4px;
                    img {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
            .no_list {
                font-size: .8rem;
                text-align: center;
                color: #999;
                .no_list_title {
                    position: relative;
                    top: -10px;
                }
                img {
                    width: 250px;
                    height: 250px;
                }
            }
        }
    }
    /*#myinfo .top_left,.top_right{*/
    /*float: left;*/
    /*}*/
</style>
