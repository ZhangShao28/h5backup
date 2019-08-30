<template>
    <div id="news_detail">
        <div>
            <div class="news_title">
                <div class="logo"><img :src="c_logo" alt=""></div>
                <div class="title">
                    <div class="tit">{{property_name}}</div>
                    <div class="">{{pub_time}}</div>
                </div>
            </div>
            <div class="title">
                {{title}}
            </div>
            <div class="news_detail_con" id="news_detail_con" v-html="content">
                {{content}}
            </div>
            <div class="new_footer">
                <div class="footer_title">内容来自：港澳商会通</div>
                <div class="footer_content">
                    <div class="contentLeft">
                        <div class="logoBox"><img src="/static/img/h5_logo.png" alt=""></div>
                        <div class="con1">專為港澳商會量身身打造</div>
                        <div>长按识别二维码关注公众号</div>
                    </div>
                    <div class="contentRight">
                        <img src="/static/img/h5_code.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { cookie, Loading, } from 'vux'
  export default {
    components: {
      cookie,
      Loading
    },
    data () {
      return {
        c_logo: '',
        content: '',
        property_name: '',
        pub_time: '',
        title: '',
      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background:#fff')
//          console.log('id',this.$route.params.id)
      var id = this.$route.query.id
      this.content_list(id)
    },
    methods: {
      content_list(id){
        var that = this
        this.$dialog.loading.open('正在加載中···')
        that.api.newsDetail({
            news_id: id
          }).then(function (response) {
          that.$dialog.loading.close()
          console.log(response.data.data)
          var data = response.data.data
          if (response.data.state == 1) {
            that.c_logo = data.c_logo
            that.content = data.content
            that.property_name = data.property_name
            that.pub_time = data.pub_time
            that.title = data.title

          } else {
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        })
          .catch(function (response) {
            that.$dialog.loading.close()
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'error'
            })
          })
      },
    },
    beforeCreate () {
      document.body.setAttribute('class', '')
//        document.querySelector('body').setAttribute('style', 'background:#fff')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    }
  }
</script>
<style scoped>
    .news_detail_con >>> img {
        max-width: 100%;
        height: auto;
    }
</style>
<style scoped lang="less" type="text/less">
    #news_detail {
        background: #fff;
        height: 100%;
        padding: 20px;
        .title {
            color: #333;
            font-size: .9rem;
            padding: 0 0 10px 0;
        }
        .news_title {
            margin: 0 auto 10px auto;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 5px;
            .logo {
                float: left;
                width: 45px;
                height: 45px;
                background: #ccc;
                border-radius: 25px;
                margin-right: 10px;
                img {
                    width: 45px;
                    height: 45px;
                    border-radius: 25px;
                }
            }
            .title {
                font-size: .55rem;
                color: #999;
                .tit {
                    font-size: .7rem;
                    color: #666;
                    position: relative;
                    top: 3px;
                }
            }
        }
        .title {
            text-align: justify;
        }
        .news_detail_con {
            text-align: justify;
            font-size: 14px;
            color: #666;
            padding-bottom: 20px;

        }
        .new_footer {
            font-size: .6rem;
            text-align: center;
            margin-top: 30px;
            .footer_title {
                font-size: .5rem;
                color: #333;
            }
            .footer_title::after,
            .footer_title::before {
                content: '';
                border-top: 1px solid #e6e6e6;
                display: inline-block;
                width: 4rem;
                position: relative;
                top: -.15rem;
            }
            .footer_title::after {
                left: 5px;
            }
            .footer_title::before {
                right: 5px;
            }
            .footer_content {
                margin: 0 0 20px 0;
                .contentLeft {
                    font-size: .55rem;
                    width: 60%;
                    display: inline-block;
                    padding: 20px 0px;
                    line-height: 24px;
                    .logoBox {
                        font-size: .75rem;
                        font-weight: bold;
                        font-style: italic;
                        img {
                            width: 155px;
                            margin-left: -6px;
                        }
                    }
                    .con1 {
                        color: #3D82D9;
                        margin-top: 6px;
                        font-size: .6rem;
                    }
                    .con1::before {
                        content: '';
                        border-bottom: 1px solid #e6e6e6;
                        display: block;
                        width: 76%;
                        margin: 0 auto;
                        padding-top: 4px;
                        position: relative;
                        top: -3px;
                    }
                }
                .contentRight {
                    width: 38%;
                    display: inline-block;
                    img {
                        width: 103px;
                        margin-top: -60px;
                    }
                }
            }
        }
    }
</style>
