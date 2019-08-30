<template>
    <div class="device_con">
        <div class="list_box">
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">

                    <div class="device_list" v-for="item, key in list" :key="key">
                        <div class="list_top">
                            <label class="tit">设备ID：</label>
                            <label>{{item.device_id}}</label>
                            <label class="floatR edit_btn" @click="go_edit(item.id,item.device_id)">编辑</label>
                            <!--<router-link :to="{name:'AddDevice',params:{num:123}}"> <label class="floatR">编辑</label></router-link>-->
                        </div>
                        <div class="list_bot">
                            <label class="tit">投放地：</label>
                            <label>{{item.place_name}}</label>
                        </div>
                    </div>
                </yd-list>
                <!-- 数据全部加载完毕显示 -->
                <span v-show="show_more" slot="doneTip">没有更多数据了~~</span>
                <span slot="loadingTip">正在加载···</span>

            </yd-infinitescroll>
            <div v-show="show_nodata" class="no_data">暂无数据</div>
        </div>
        <div>
            <tabbar>
                <tabbar-item link="/AddDevice">
                    <span slot="label">安装设备</span>
                </tabbar-item>
                <tabbar-item link="/DeviceListSuccess">
                    <span slot="label">成功列表</span>
                </tabbar-item>
                <tabbar-item selected link="/DeviceListFail">
                    <span slot="label">失败列表</span>
                </tabbar-item>
            </tabbar>
        </div>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem,XHeader} from 'vux'
    export default {
        components: {
            XHeader,
            Tabbar,
            TabbarItem
        },
        data () {
            return {
                page: 1,
                pageSize: 10,
                list: [ ],
                show_nodata:false,
                show_more:true
            }
        },
        mounted () {
            this.loadList()
        },
        methods: {
            loadList() {
                this.$dialog.loading.open('正在加载中···');
                console.log(this.page)
                this.$http.post('/h5/device/devicelist', this.$qs.stringify(
                    {
                        state: 2,
                        page: this.page,
                    }
                )).then(response => {

                    // sucess callback
                    var data = response.data.data.install_log;
                    console.log(response.data.data)
                    this.$dialog.loading.close();
                    for (var i = 0; i < data.length; i++) {
                        this.list.push(data[i]);
                    }
                    if(response.data.data.pages<=1&&data.length==0){
                        this.show_nodata=true
                    }
                    if(response.data.data.pages<=1&&data.length<=10){
                        this.show_more=false
                    }
                    if (data.length < this.pageSize || this.page == response.data.data.pages) {
                        /* 所有数据加载完毕 */
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                        return;
                    }

                    /* 单次请求数据完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                    this.page++;

                }, response => {
                    // error callback
                    this.$dialog.loading.close();
                })
            },

            go_edit: function (e, did) {//编辑设备
                console.log(e)
                this.$http.post( '/h5/device/detail', this.$qs.stringify(
                    {
                        id: e
                    }
                )).then(response => {
                    console.log(response)
                    var data = response.data.data.detail,
                        place = response.data.data.place;
                    this.$router.push({
                        path: '/AddDevice',
                        name: 'AddDevice',
                        params: {
                            datas: data,
                            places: place,
                            dtype: 1
                        }
                    })
                }, response => {

                })

            },
        }
    }
</script>

<style scoped>
    body,html{
        height: 100%;
    }
    .box2{
        margin-top: 10px;
        padding-bottom: 10px;
    }
    .device_list{
        padding: .5rem 1rem;
        font-size: .7rem;
        border-bottom: 1px solid #e5e5e5;
        margin: 8px 10px;
        box-shadow: 0px 0px 10px 2px #e5e5e5;
    }
    .edit_btn{
        color: #FFAF05;
    }
    .list_top{
        margin-bottom: .5rem;
    }
    .list_top .tit, .list_bot .tit{
        color: #555;
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
        padding-bottom: 70px;
    }
    #app .device_con .yd-list-donetip span,  .device_con .yd-list-loading span{
        font-size: .6rem;
    }
</style>
