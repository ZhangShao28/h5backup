<template>
    <div class="store_con">
        <div class="head">商  城</div>
      <div class="goods_list">
          <div class="good_box" v-for=" i in good_list">
              <div class="store_img">
              <img src="../../assets/touxiang.png" alt="">
              </div>
              <div>
                  XXX无线路由器
              </div>
              <div>￥30.00</div>
          </div>
      </div>
        <div class="store_bottom">
            <div>联系人：毛大强</div>
            <div>联系电话：1524152145</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                good_list:[
                    {},{},{},{},{}
                ]
            }
        },
        created(){
            document.title = '商城'
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .store_con .head{
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: .7rem;
        border-bottom: 1px solid #e5e5e5;
    }
    .goods_list{
        display: flex;
        align-items: center;
        justify-content: flex-start ;
        flex-wrap:wrap;
    }
    .goods_list .good_box{
        padding: 18px;
    }
    .store_bottom{
        width: 100%;
        font-size: .7rem;
        text-align: center;
        position: fixed;
        bottom: 0px;
        border-top: 1px solid #e5e5e5;
        background: #f8f8f8;
        padding: 8px 0px;
    }
    .store_img{
        height: 85px;
        width: 85px;
    }
</style>
