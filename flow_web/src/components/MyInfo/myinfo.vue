<template>
    <div class="charge_box">
        <div class="my_info_head">
            <div class="img_tx"><img :src='img_src' alt=""></div>
                <div class="phone">{{mobile}}</div>

        </div>
        <div class="hengxian"></div>
        <div class="bind_tit">已绑定流量卡</div>
        <div class="list_box">
            <div class="device_list" v-for="item, key in list" :key="key">
                <div class="list_bot">
                    <label class="time">{{item.card_no}}</label>
                    <label class="floatR edit_btn" @click="go_recharge(item.card_no,item.id)">充值</label>
                    <label class="floatR edit_btn" @click="go_check(item.id)">查询</label>
                </div>
                <div style="clear: both"></div>
            </div>

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
                mobile:'',
                list: [],
                img_src:'/src/assets/touxiang.png',
                card_id:'',
                card_no:''

            }
        },
        created(){
            document.title = '我的'
        },
        mounted () {
            var that = this;
            this.$http.post(this.apiurl+'/user/my', this.$qs.stringify(
                {

                }
            ))
                .then(response => {
                    console.log(response)
                    var phone = response.data.data.mobile;
                    that.mobile =phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
                    that.img_src =response.data.data.logo
                    that.list =response.data.data.card_arr
                })
              .catch(response=>{

                })
        },
        methods: {
//            loadList() {
//                this.$dialog.loading.open('正在加载中···');
//                console.log(this.page)
//                this.$http.post(this.apiurl+'/h5/user/my', this.$qs.stringify(
//                    {
//                        state: 1,
//                        page: this.page,
//                    }
//                )).then(response => {
//
//                    // sucess callback
//                    var data = response.data.data.install_log;
//                    console.log(response.data.data)
//                    this.$dialog.loading.close();
//                    for (var i = 0; i < data.length; i++) {
//                        this.list.push(data[i]);
//                    }
//                    if(response.data.data.pages<=1&&data.length==0){
//                        this.show_nodata=true
//                    }
//                    if(response.data.data.pages<=1&&data.length<=10){
//                        this.show_more=false
//                    }
//                    if (data.length < this.pageSize || this.page == response.data.data.pages) {
//                        /* 所有数据加载完毕 */
//                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
//                        return;
//                    }
//
//                    /* 单次请求数据完毕 */
//                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
//                    this.page++;
//
//                }, response => {
//                    // error callback
//                    this.$dialog.loading.close();
//                })
//            },
            go_check(cid){//查询
                var that = this;
                that.$http.post(this.apiurl+'/flowcard/rechargelog', this.$qs.stringify(
                    {
                        card_id:cid
                    }
                ))
                    .then(function (response) {
                        console.log(response);
                        that.card_id = cid
                        if(response.data.err==1){
                            that.$router.push({
                                path: '/ChargePayLog',
                                name: 'ChargePayLog',
                                params: {
                                    card_id: cid,
                                }
                            })
                        }else {
                            that.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500,
                                icon: 'error'
                            });
                        }

                    })
                    .catch(function (response) {
                        console.log(response);
                        that.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'error'
                        });
                    });
            },
            go_recharge(cno,cid){//充值
                var that = this;
                that.$http.post(this.apiurl+'/flowcard/charge', this.$qs.stringify(
                    {
                        card_no:cno
                    }
                ))
                    .then(function (response) {
                        console.log(response);
                        that.card_no = cno
                        if(response.data.err==1){
                            that.$router.push({
                                path: '/ChargeList',
                                name: 'ChargeList',
                                params: {
                                    card_no: cno,
                                    card_id: cid,
                                }
                            })
                        }else {
                            that.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500,
                                icon: 'error'
                            });
                        }

                    })
                    .catch(function (response) {
                        console.log(response);
                        that.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'error'
                        });
                    });
            },
        }
    }
</script>

<style scoped>
    .hengxian{
        height: 6px;
        background: #f3f3f3;
    }
    .img_tx img{
        height: 85px;
        width: 85px;
        border-radius: 100px;
    }
    .bind_tit{
        padding: 10px 20px;
        font-size: .7rem;
    }
    .my_info_head{
        height: 180px;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
        padding-top: 40px;
    }
    .my_info_head .phone{
        padding-top: 4px;
        font-size: .6rem;
    }
    .device_list{
        padding: 0rem 1rem;
        height: 60px;
        line-height: 60px;
        font-size: .7rem;
        border-bottom: 1px solid #e5e5e5;
        /*box-shadow: 0px 0px 10px 2px #e5e5e5;*/
    }
    .edit_btn{
        color: #FFAF05;
        padding-left: 20px;
    }
    /*.list_top{*/
        /*margin-bottom: .5rem;*/
    /*}*/
    /*.list_top .money{*/
        /*float: right;*/
    /*}*/
    /*.list_top .tit{*/
        /*color: #333;*/
    /*}*/
    /*.list_bot .time{*/
        /*color: #666;*/
    /*}*/
    .list_box{
        padding-bottom: 70px;
        border-top: 1px solid #e5e5e5;
    }
</style>
