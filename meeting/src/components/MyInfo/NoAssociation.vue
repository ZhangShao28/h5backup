<template>
    <div id="no-association">
        <!--<div class="no_back">-->
        <!--<x-header></x-header>-->
        <!--</div>-->
        <div class="content">
            <div class="tit">如果未查詢到您的商會，有以下原因：</div>
            <div style="margin-top: 10px">
                1.您的商會還未加入“港澳商會通”平台
                <div class="check_btn">
                    <router-link to="/AssociationList">點擊查詢支持的商會</router-link>
                </div>
            </div>
            <div style="margin-top: 10px">
                2.可能由於您在商會所登記的手提電話不一致，導致無法看到您的商會，可聯繫您所屬的商會修改手提號碼
            </div>
            <div class="Already_contact">
                如果已聯繫所屬商會更改手提號碼，請點擊下方“重新查詢商會”，如出現您所屬商會名稱，說明已成功加入。
                <div>
                    <yd-button type="primary" @click.native="search_btn">重新查詢商會</yd-button>
                </div>
                <div class="association_list" v-for="item in association_list">{{item.property_name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
  import { XHeader, Toast, cookie } from 'vux'
  export default {
    components: {
      cookie,
      XHeader,
      Toast
    },
    data () {
      return {
        association_list: []
      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background:#fff')
    },
    methods: {
      search_btn(){
        var that = this
        that.api.userSearch({
          cid: cookie.get('cid')
        })
          .then(function (response) {
            console.log(response)
//                  that.association_list=[];
            var data = response.data.data
//                  var data = []
            if (response.data.state == 1) {
              if (Array.isArray(data) && data.length == 0) {
                that.$dialog.toast({
                  mes: '暫未查詢到您的商會',
                  timeout: 500,
                  icon: 'error',
                  callback: () => {

                  }
                })
              } else {
                that.$dialog.toast({
                  mes: '查詢成功',
                  timeout: 1500,
                  icon: 'success',
                  callback: () => {

                  }
                })
                that.association_list = data
              }
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
              icon: 'error'
            })
          })
      }
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    }
  }
</script>
<style lang="less" type="text/less">
    #no-association {
        .yd-btn-primary {
            background: #3D82D9;
        }
        background: #fff;
        /*padding-bottom: 150px;*/
        .no_back {
            .vux-header {
                background: transparent;
            }
            .vux-header .vux-header-left a {
                color: #666;
            }
            .vux-header .vux-header-left .left-arrow:before {
                content: "";
                position: absolute;
                width: 12px;
                height: 12px;
                border: 1px solid #333;
                border-width: 1px 0 0 1px;
                -webkit-transform: rotate(315deg);
                transform: rotate(315deg);
                top: 9px;
                left: 7px;
            }
            .vux-header .vux-header-left, .vux-header .vux-header-right {
                top: 20px;
                left: 20px;
                font-size: .7rem;
            }

        }
        .content {
            padding: 40px 30px 80px 30px;
            font-size: .65rem;
            color: #333;
            line-height: 26px;
            .check_btn {
                text-decoration: underline;
                color: #3D82D9;
                margin-left: .5rem;
            }
            .tit {
                font-size: .7rem;
            }
            .Already_contact {
                margin-top: 40px;
                border-top: 1px solid #dddddd;
                padding-top: 30px;
                .association_list {
                    line-height: 30px;
                }
            }
            .yd-btn {
                height: 100%;
                font-size: 0.8rem;
                padding: 0.5rem 0;
                width: 100%;
                margin: 20px auto 20px auto;
            }
        }
    }
</style>
