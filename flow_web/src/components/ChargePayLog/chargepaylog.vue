<template>
    <div class="charge_box">
        <div class="charge_head">
            <div class="tit">中国电信</div>
            <div class="num">流量卡号：<label>{{card_no}}</label></div>
        </div>
        <div class="list_box">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div class="device_list" v-for="item, key in list" :key="key">
                        <div class="list_top">
                            <label class="tit">套餐：</label>
                            <label>{{item.tcname}}</label>
                            <label class="money">￥{{item.pay_money}}</label>
                        </div>
                        <div class="list_bot">
                            <label class="time">{{item.pay_time}}</label>
                        </div>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span v-show="show_more" slot="doneTip">已加载全部数据</span>
                <span slot="loadingTip">正在加载···</span>

            </yd-infinitescroll>
            <div v-show="show_nodata" class="no_data">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import {Scroller,Loading, LoadMore,Spinner } from 'vux'
    export default {
        components: {
            Scroller,
            LoadMore,
            Spinner,
            Loading
        },
        data () {
            return {
                page: 1,
                pageSize: 2,
                list: [ ],
                show_nodata:false,
                show_more:true,
                card_no:''
            }
        },
        created(){
            document.title = '充值记录'
        },
        mounted () {
            this.loadList()
        },
        methods: {
            loadList() {
                var that =this;
                that.$dialog.loading.open('正在加载中···');
                console.log(that.page)
                this.$http.post(this.apiurl+'/flowcard/rechargelog', this.$qs.stringify(
                    {
                        card_id:that.card_id,
//                        card_id:3,
                        state: 1,
                        page: that.page,
                    }
                )).then(response => {
                    console.log(response)
                    // sucess callback
                    var data = response.data.data.log;
                        that.card_no =response.data.data.card_no
                    that.$dialog.loading.close();
                    for (var i = 0; i < data.length; i++) {
                        that.list.push(data[i]);
                    }
                    if(response.data.data.pages<=1&&data.length==0){
                        that.show_nodata=true
                    }
                    if(response.data.data.pages<=1&&data.length<=2){
                        that.show_more=false
                    }
                    if (data.length < that.pageSize || this.page == response.data.data.pages) {
                        /* 所有数据加载完毕 */
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        return;
                    }

                    /* 单次请求数据完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                    that.page++;

                }, response => {
                    // error callback
                    that.$dialog.loading.close();
                })
            },
        },
        computed: {
            getParams () {
                // 取到路由带过来的参数
                let routerParams = this.$route.params,
                    card_id = routerParams.card_id
                this.card_id = card_id
                console.log("card_id",card_id)
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    }
</script>

<style>

    .device_list{
        padding: .5rem 1rem;
        font-size: .7rem;
        border-bottom: 1px solid #e5e5e5;
        margin: 8px 0;
        /*box-shadow: 0px 0px 10px 2px #e5e5e5;*/
    }

    .list_top{
        margin-bottom: .5rem;
    }
    .list_top .money{
        float: right;
    }
    .list_top .tit{
        color: #333;
    }
    .list_bot .time{
        color: #666;
    }
    .device_con .xs-plugin-pullup-container{
        font-size: .7rem;
        color: #666;
    }
    .no_data{
        text-align: center;
        margin-top: 10rem;
        font-size: .8rem;
        color: #666;
    }

    .list_box{
        padding-bottom: 10px;
    }
    .charge_box .yd-list-donetip,  .charge_box .yd-list-loading{
        font-size: .6rem;
    }
</style>
