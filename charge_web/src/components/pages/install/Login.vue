<template>
    <div>
        <div class="header_tit">

        </div>
        <div class="head_tit">
            小码安装平台
        </div>
        <div class="content">
            <group class="input_1">
                <x-input title="手机号" v-model="inputValue"  name="mobile" placeholder="请输入手机号码" keyboard="number" :max="11" ></x-input>
            </group>
            <group class="weui-cells_form">
                <x-input title="验证码"  v-model="verifyCode" keyboard="number"  placeholder="请输入验证码" :max="6" >
                    <x-button slot="right" v-if="sendMsgDisabled" plain  mini disabled>{{time+'秒后获取'}}</x-button>
                    <x-button slot="right" v-if="!sendMsgDisabled"   mini @click.native="send_msg">获取验证码</x-button>
                </x-input>
            </group>
        </div>
        <div class="login_btn">
            <x-button class="Btn_Login" @click.native="loginBtn" text="登  录"></x-button>
        </div>
    </div>
</template>

<script>
    import { XHeader,XInput,Group, XButton, Cell,Toast,cookie} from 'vux'
    export default {
        components: {
            XHeader,
            XInput,
            Group,
            XButton,
            Cell,
            Toast,
            cookie
        },
        data () {
            return {
                inputValue:'',
                verifyCode:'',
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
            }
        },
        mounted () {
//            console.log(cookie.get('login_state'))
            if(cookie.get('login_state')==undefined){

            }else{
//                cookie.remove("login_state")
                this.$router.push('/AddDevice')
            }
        },
    methods: {
        send_msg () {
            var that = this;
            if(that.inputValue=='' || that.inputValue.length<11){
                that.$dialog.toast({
                    mes: '手机号为空或不正确！',
                    timeout: 1500,
                    icon: 'error'
                });
                return false
            }
            that.$http.post('/h5/user/code', this.$qs.stringify(
                {
                    mobile_phone:that.inputValue,
                    m_type:1
                }
                ))
                .then(function (response) {
                    console.log(response);
                    if(response.data.err==1){
                        that.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'success'
                        });
                        let me = that;
                        me.sendMsgDisabled = true;
                        let interval = window.setInterval(function() {
                            if ((me.time--) <= 0) {
                                me.time = 60;
                                me.sendMsgDisabled = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    }else{
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
        loginBtn () {
            var that = this;
            that.$http.post('/h5/user/login', this.$qs.stringify(
                {
                    mobile_phone:that.inputValue,
                    code:that.verifyCode
                }
            ))
                .then(function (response) {
                    console.log(response);
                    if(response.data.err==1){
                        that.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'success'
                        });
                        cookie.set('login_state', response.data.data.token, {
                            expires: 30
                        })
                        that.$http.defaults.headers.token =response.data.data.token;
                        setTimeout(function () {
                            that.$router.push('/AddDevice')
                        },2000)
                    }else{
                        that.$dialog.toast({
                            mes: response.data.msg,
                            timeout: 1500,
                            icon: 'error'
                        });
                    }

                })
                .catch(function (response) {
                    that.$dialog.toast({
                        mes: response.data.msg,
                        timeout: 1500,
                        icon: 'error'
                    });
                    console.log(response.data.msg);
                })

        }
    },
    }
</script>
<style scoped>
    /*body{*/
        /*height: auto;*/
    /*}*/
    .head_tit {
        text-align: center;
        margin-top: 4rem;
        font-size: 1rem;
    }
    .content{
        margin-top: 3rem;
    }
    .login_btn{
        margin: 3rem .8rem;
    }
    .content .weui-icon-clear:before {
        margin-bottom: 0.4rem;
    }
</style>
