<template>
    <div id="Introduce">
        <div class="head">
            <h1><img src="/static/img/small_logo.png" alt="">香港福建社團聯會港島東分會介紹</h1>
        </div>
        <div class="content">
            <div class="hx">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <p>香港福建社團聯會港島東分會（以下簡稱“東分會”）是香港福建社團聯會的派出機構，是聯會在港島東區的主要工作平臺。港島東分會成立於2013年9月。2016年6月2日，香港福建社團聯會港島東分會會所正式啟用。</p>
            <br><p>東分會根據社團聯會統一部署，由東分會會長全面領導和統籌，切實加強分會隊伍建設、會務建設、信息化建設和制度化建設，進一步發揮分會在社會事務中的重要作用。</p>
            <br><p>現任會長蔡建四，常務副會長柯文華、林懷中。</p>
        </div>
    </div>
</template>
<script>
  import { cookie,Toast } from 'vux'
  export default {
    components: {
      cookie,
    },
    data () {
      return {

      }
    },
    mounted(){


    },
    methods: {
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

</style>
<style scoped lang="less" type="text/less">
    #Introduce{
        padding: 40px 15px;
        .head{
            text-align: center;
            font-size: .36rem;
            h1{
                font-weight: bold;
            }
            img{
                width: 40px;
                padding-right: 6px;
                position: relative;
                top:-2px;
            }
        }
        .content{
            .hx{
                display: flex;
                padding-top: 15px;
                padding-bottom: 20px;
                .left{
                    width: 70%;
                    background: #CB0300;
                    height: 2px;
                    display: inline-block;
                }
                .right{
                    width: 30%;
                    background: #595859;
                    height: 2px;
                    display: inline-block;
                }
            }
            padding: 15px 8px;
            font-size: .28rem;
            padding-top: 15px;
            color: #666;
            text-align: justify;
        }
    }
</style>