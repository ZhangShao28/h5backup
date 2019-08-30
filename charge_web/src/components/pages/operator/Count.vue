<template>
    <div class="count_content">
        <div class="header_tit">
            <!--<x-header></x-header>-->
        </div>
        <div class="header">
                <group class="width_100">
                    <selector class="select_div header_left" v-model="valueMapValue"    :value-map="['xqid', 'xq_name']"  :options="place_list" @on-change="onChange"></selector>
                    <div class="header_right" @click="out_btn">退出登录</div>
                </group>



        </div>
        <div class="count_list">
            <div class="weui-cell count_title"><div class="shu"></div>收益统计</div>
            <div class="weui-cells vux-no-group-title countBox ">
                <div class="weui-cell">
                    <div class="total_con">
                        <div class="count_tit"> <img src="../../../assets/Totalrevenue.png" alt="">总收益(元)</div>
                        <div class="total_num">{{total_money}}</div>
                    </div>
                </div>
                <div  class="weui-cell count_con">
                    <div class="vux-cell-bd vux-cell-primary">
                        <div class="count_tit">今日收益(元)</div>
                        <div class=" count_num">{{today_money}}</div>
                    </div>
                    <div class="fenge"></div>
                    <div class="vux-cell-bd vux-cell-primary">
                        <div class="count_tit">昨日收益(元)</div>
                        <div class=" count_num">{{yesterday_money}}</div>
                    </div>
                </div>
            </div>
            <div class="weui-cell count_title"><div class="shu"></div>设备统计</div>
            <div class="weui-cells vux-no-group-title countBox ">
                <div class="weui-cell">
                    <div class="total_con">
                        <div class="count_tit"> <img src="../../../assets/Totalsocketholenumber.png" alt="">总插座孔数(个)</div>
                        <div class="total_num">{{device_total_num}}</div>
                    </div>
                </div>
                <div  class="weui-cell count_con chart_con">
                    <div id="myChart" :style="{width: '100%', height: '160%',margin:'10px 0px'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {XHeader,Group, XButton,Selector,Cell,CellFormPreview,cookie} from 'vux'

    export default {
        components: {
            XHeader,
            Group,
            Selector,
            XButton,
            CellFormPreview,
            Cell,
            cookie
        },
        data () {
            return {
                total_money:'',
                today_money:'',
                yesterday_money:'',
                device_total_num:'',
                device_using_num:'',
                device_free_num:'',
                device_fault_num:'',
                user_statistic:'',
                user_today:'',
                user_yesterday:'',
                charging_num:'',
                charging_today:'',
                charging_yesterday:'',
                selected:0,
                valueMapValue:'0',
                place_list: []
            }
        },
        mounted(){
            this.getDataList(0);
        },
        methods:{
            out_btn (){//退出登录
                cookie.remove("login_state_oper")
                this.$dialog.toast({
                    mes: '退出登录',
                    timeout: 1000,
                    icon: 'success'
                });
                setTimeout(()=>{
                    this.$router.push('/OperLogin')
                },1000)
            },
            onChange (xqid) {
//                this.selected=xqid
                this.getDataList(xqid);
                console.log("xqid",xqid)
            },
            getDataList(xqid){
//                var xqid = this.selected;
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                this.$http.post('/h5/operator/index',this.$qs.stringify(
                    {
                        xqid:xqid
                    }
                )).then(response => {
                    console.log(response)
                    if(response.data.err==1){
                        var data = response.data.data;
                        this.total_money=data.total_money;
                        this.today_money=data.today_money;
                        this.yesterday_money=data.yesterday_money;
                        this.device_total_num=data.device_num;
                        this.device_using_num=data.device_using;
                        this.device_free_num=data.device_free;
                        this.device_fault_num=data.device_off_line;
                        this.place_list=response.data.data.xq_arr

                        // 绘制图表
                        myChart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: "{b}({d}%)"
                            },
                            series : [
                                {
                                    type:'pie',
                                    radius: ['40%','70%'],
                                    hoverAnimation:false,
                                    selectedMode: 'single',
                                    color:['#ffbe00','#10b95c', '#dbdbdb'],
                                    labelLine:{
                                        normal: {
                                            length:6,
                                            length2:10,

                                        }
                                    },
                                    label: {
                                        normal: {
                                            position: 'outside',
                                            textStyle : {
                                                fontWeight : 'normal',
                                                fontSize : 15
                                            },

                                        },

                                    },
                                    data:[
                                        {value:data.device_free, name:'未使用:'+data.device_free},
                                        {value:data.device_using, name:'使用中:'+data.device_using},
                                        {value:data.device_off_line, name:'离线:'+data.device_off_line},
                                    ],
                                }
                            ]
                        });
                    }else{
                        this.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'success'
                        });
                    }
                }, response => {
                    console.log(response)
                })
            }
        }
    }
</script>

<style >
    #app .weui-cells {
        padding: 0rem 0rem 0rem 0rem;
        margin-top: 0px;
    }
    #app .count_content .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #app .count_content .header .width_100{
       width: 100%;
    }
    #app .count_content .header .weui-select {
        font-size: .76rem;
        height: 50px;
        line-height: 50px;
    }
    #app .count_content .header .weui-cell_select .weui-cell__bd:after {
        height: 10px;
        width: 10px;
        margin-top: -5px;
    }
    #app .count_content .header .header_left{
        float: left;
    }
    #app .count_content .header .header_right{
        font-size: .76rem;
        height: 50px;
        line-height: 50px;
        padding: 0px 20px;
        float: right;
        color: #666;
    }
    .count_list img{
        /*width: 25px;*/
        /*height: 25px;*/
    }
    .total_con{
        padding-left: 10px;
    }
    .total_num{
        font-size: 1.4rem;
        color: #ffaf05;
        padding-left: 25px;
    }
    .count_list .weui-cell {
        padding: 15px 15px 10px 15px;
    }
    .countBox{
        margin-top: .4rem;
    }
    .count_tit{
        font-size: .6rem;
        color: #666;
    }
    .count_tit img{
       margin-right: 5px;
    }
    .count_title{
        font-size: .7rem;
        background: #f3f3f3;
    }
    .count_title:before{
        border: none;
    }
    .count_list .count_con{
        padding: 0px 0px;
    }
    .count_list .weui-cell:before{
        left: 0;
    }
    .chart_con{
        padding: 10px 0px;
    }
    .shu{
        border-left: 4px solid #FFAF05;
        height: 16px;
        margin-right: 8px;
    }
    .fenge{
        border-left: 1px solid #e5e5e5;
        height: 103px;
    }
    .countBox .count_num{
        text-align: center;
        font-size: 1.2rem;
        color: #333;
    }
    .countBox .vux-cell-bd{
        text-align: center;
    }
    .weui-cells:before{
        border-top: 0px solid #D9D9D9;
    }
    .weui-cells:after{
        border: none;
    }
    .vux-cell-primary {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .vux-header{
        /*background: #ffbe00;*/
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
        top: 8px;
        left: 7px;
    }
    .vux-header .vux-header-left .vux-header-back{
        color: #333;
    }
</style>
