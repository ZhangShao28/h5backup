<template>
    <div id="MemberRule">
        <div class="backBtn"><div @click="back"><img src="/static/img/ic_return.png" alt="">返回登入頁</div></div>
        <div class="title">{{title}}</div>
        <div class="content" v-html="content">

        </div>
        <div class="footer fixedBtn">
                    <x-button class="bigBtn subBtn" @click.native="submitBtn" type="primary"
                              text="加入會員"></x-button>
        </div>
    </div>
</template>
<script>
  import { XButton,cookie} from 'vux'
  export default {
    name: '',
    components: {
      XButton,
      cookie
    },
    data () {
      return {
        content:'',
        title:''
      }
    },
    mounted () {
    this.getInfo()
    },
    methods: {
        getInfo(){
          this.$dialog.loading.open('正在加載中···')
          var that = this
          that.$api.userExplain({

          })
            .then(function (response) {
              that.$dialog.loading.close()
              var data = response.data
              console.log(response,data.state)
              if(data.state==1){
                that.content=data.data.content
                that.title=data.data.title
                if(data.data.user_status==1){
                  cookie.set('isvip', 'yes', {
                    expires: 30000,
                    path: '/'
                  })
                  that.$router.push({path: '/Home'})
                }
              }else if(data.state==403){
                cookie.remove('login_id')
                cookie.remove('login_state')
                cookie.remove('token')
                cookie.remove('isvip')
                cookie.remove('quid')
                setTimeout(() => {
                  that.$router.push({path: '/Login'})
                }, 500)
              }else{
                that.$dialog.toast({
                  mes: response.data.msg,
                  timeout: 1500,
                  icon: 'error'
                })
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
      submitBtn(){
        this.$router.push('/ApplyMember')
      },
      back(){
        cookie.remove('login_id')
        cookie.remove('login_state')
        cookie.remove('token')
        cookie.remove('isvip')
        setTimeout(() => {
          this.$router.push({path: '/Login'})
        }, 500)
      }
    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
</style>
<style scoped lang="less" type="text/less">
        #MemberRule{
            background: #f5f5f5;
            .backBtn{
                text-align: right;
                font-size: .26rem;
                padding: 10px 20px 0px 20px;
                color: @themeColor;
                img{
                    width: 15px;
                }
            }
            .title{
                text-align: center;
                font-size: .34rem;
                padding: 20px 0;
                font-weight: 600;
            }
            .content{
                padding: 0px 15px 1.4rem 15px;
                font-size: medium;
                *{
                    font-weight: normal;
                }
            }
            .footer{
                .subBtn{
                    margin: 10px auto;
                }
            }
        }
</style>
