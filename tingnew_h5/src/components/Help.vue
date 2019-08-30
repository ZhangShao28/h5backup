<template>
    <div id="help">
        <x-header></x-header>
        <div class="content">
            <div>
                道闸未开情况检查：
            </div>
            <br>
            <div>
                第一步：检查是否开放时间内
            </div>
            <div>
                第二步：是否车牌未绑定，需车辆管理中添加
            </div>
            <div>
                第三步：可能道闸故障
            </div>
        </div>
    </div>
</template>

<script>
  import { XHeader  } from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
    #help{
        .vux-header{
            background: #fff;
        }
        .vux-header .vux-header-left a, .vux-header .vux-header-right a{
            color: #999;
        }
        .vux-header .vux-header-left .left-arrow:before{
            border-color: #999;
        }
        .content{
            padding: 40px 20px;
        }
    }
</style>
