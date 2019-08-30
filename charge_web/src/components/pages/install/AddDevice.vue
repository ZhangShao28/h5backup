<template>
    <div class="content_add">
        <!--<div class="header_tit">-->
        <!--<x-header>设备安装</x-header>-->
        <!--</div>-->
        <div class="head_tit">
            {{device_tit}}
        </div>
        <div class="content_add_1">
            <group class="input_1">
                <x-input title='设备ID' placeholder="请输入设备ID" v-model="device_id" v-show="state_btn1" @on-blur="onBlur"></x-input>
                <x-input title='设备ID' placeholder="请输入设备ID" v-model="device_id"  v-show="state_btn2" readonly></x-input>
            </group>
            <group>
                <selector title="安装地" ref="plainValueRef" v-model="valueMapValue"   value="选择安装地" :value-map="['pid', 'place_name']"  :options="place_list" @on-change="onChange"></selector>
            </group>
        </div>
        <div class="text_left">
            投放编号
        </div>
        <div class="clearF content_add_2">
            <group>
                <x-input title="左插孔编号" v-model="device_no1" placeholder="左插孔编号" ></x-input>
                <x-input  class="input_2" title="右插孔编号" v-model="device_no2" placeholder="右插孔编号" ></x-input>
            </group>
        </div>
        <div class="verify_btn">
            <x-button type="primary" @click.native="verifyBtn" v-show="state_btn1">验 证</x-button>
            <x-button type="primary" @click.native="modifyBtn"  v-show="state_btn2">修 改</x-button>
        </div>
        <div class="out_btn" @click="out_btn">退出登录</div>
        <tabbar>
            <tabbar-item selected link="/AddDevice">
                <span slot="label">安装设备</span>
            </tabbar-item>
            <tabbar-item link="/DeviceListSuccess">
                <span slot="label">成功列表</span>
            </tabbar-item>
            <tabbar-item  link="/DeviceListFail">
                <span slot="label">失败列表</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem,XHeader,XInput , Group, XButton,Cell,Selector,Toast,cookie } from 'vux'

    export default {
        components: {
            XHeader,
            Group,
            Cell,
            Selector,
            XInput,
            XButton,
            Toast,
            Tabbar,
            TabbarItem,
            cookie
        },
        data () {
            return {
                device_tit:'录入新设备',
                place_list: ["选择安装地"],
                device_id:'',
                select_pid:'1',
                valueMapValue:'选择安装地',
                device_no1:'',
                device_no2:'',
                state_btn1:true,
                state_btn2:false,
                sid:''
            }
        },
        mounted(){

        },
        methods:{
            out_btn (){//退出登录
                cookie.remove("login_state")
                this.$dialog.toast({
                    mes: '退出登录',
                    timeout: 1000,
                    icon: 'success'
                });
                setTimeout(()=>{
                    this.$router.push('/Login')
                },1000)
            },
            onChange (pid) {
                this.select_pid=pid
            },
            onBlur (){
                console.log(this.device_id)
                var that = this;
                that.$http.post('/h5/device/index',this.$qs.stringify(
                    {
                        device_id:that.device_id
                    }
                ))
                    .then(function (res) {
                        console.log(res)
                        if(res.data.err==1){
                            that.place_list =res.data.data.place;
                            that.valueMapValue=res.data.data.place[0].pid
                        }else{
                            that.$dialog.toast({
                                mes: res.data.msg,
                                timeout: 1500,
                                icon: 'error'
                            });
//                            window.location.reload()
                        }
                    })
                    .catch(function () {

                    })

            },
            verifyBtn () {
                var that = this;
                that.$http.post('/h5/device/checkdevice',this.$qs.stringify(
                        {
                            device_id:that.device_id,
                            pid:that.select_pid,
                            device_no1:that.device_no1,
                            device_no2:that.device_no2,
                        }
                    ))
                    .then(function (res) {
                        console.log(res)
                        if(res.data.err==1){
                            that.$dialog.toast({
                                mes: res.data.msg,
                                timeout: 1500,
                                icon: 'success'
                            });
                            setTimeout(function () {
                                window.location.reload()
                            },1500)

                        }else{
                            that.$dialog.toast({
                                mes: res.data.msg,
                                timeout: 1500,
                                icon: 'error'
                            });
                        }
                    })
                    .catch(function () {

                    })
            },
            modifyBtn (){
                console.log(this.sid,this.select_pid,this.device_no1,this.device_no2)
                var that = this;
                that.$http.post('/h5/device/reedit',this.$qs.stringify(
                    {
                        id:that.sid,
                        pid:that.select_pid,
                        device_no1:that.device_no1,
                        device_no2:that.device_no2,
                    }
                ))
                    .then(function (res) {
                        console.log(res)
                        if(res.data.err==1){
                            that.$dialog.toast({
                                mes: res.data.msg,
                                timeout: 1500,
                                icon: 'success'
                            });
                            setTimeout(function () {
                                window.location.reload()
                            },1500)
                        }else{
                            that.$dialog.toast({
                                mes: res.data.msg,
                                timeout: 1500,
                                icon: 'error'
                            });
                        }
                    })
                    .catch(function () {

                    })
            }
        },
        computed: {
            getParams () {
                // 取到路由带过来的参数
                let routerParams = this.$route.params,
                    data = routerParams.datas,
                    place = routerParams.places;
                if(JSON.stringify(routerParams) != "{}"){
                    this.state_btn1=false;
                    this.state_btn2=true;
                    this.device_tit='编辑设备'
                    this.device_id=data.device_id;
                    this.device_no1=data.device_no1;
                    this.device_no2=data.device_no2;
                    this.valueMapValue=data.pid;
                    this.sid=data.id
                    this.place_list = place
                }else{
                    this.state_btn1=true;
                    this.state_btn2=false;
                    this.device_tit='录入新设备'
                }

                // 将数据放在当前组件的数据内

            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    }
</script>

<style scoped>
    body,html{
        height: auto;
    }
    .out_btn{
        font-size: .76rem;
        color: #999;
        position: fixed;
        bottom: 80px;
        right: 0rem;
        padding: 10px 1rem;
    }
    .head_right{
        float: right;
        margin-top: 1rem;
        margin-right: .5rem;
        font-size: .7rem;
    }
    .head_tit{
        text-align: center;
        clear: both;
        margin-top: 2rem;
        margin-bottom: 2rem;
        font-size: 1rem;
    }
    .text_left{
        margin-top: 1.4rem;
        margin-left: .5rem;
        float: left;
        font-size: .72rem;
        margin-bottom: .6rem;
    }
    .inputL, .inputR{
        width: 49%;
        float: left;
    }
    .inputL{
        margin-right: .2rem;
    }
    .verify_btn{
        margin: 1.6rem 1rem;
    }
    .head_tit .vux-x-input.disabled{
        color: rgba(0, 0, 0, 0.8);
    }
    .content_add .weui-label {
        width: 70px;
    }
    .content_add .weui-cell__hd .weui-label{
        color: #555;
    }
    /*.content_add .weui-cell:before {*/
         /*border-top: 0px solid #e5e5e5;*/
    /*}*/
    .content_add .weui-cell:after {
        border-top: 1px solid #e5e5e5;
    }

    #app .content_add .content_add_1 .input_1 .weui-cells:before {
        border-top: 1px solid #e5e5e5;
    }
    #app .content_add .content_add_2 .input_2{
        border-top: 1px solid #f3f3f3;
    }
    #app .content_add .content_add_2  .weui-cells:before {
        border-top: 1px solid #e5e5e5;
    }
    .content_add  .weui-cell:before{
        border-top: 0px solid #e5e5e5;
    }
</style>
