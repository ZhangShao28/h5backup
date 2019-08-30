<template>
    <div class="login_box">
    </div>
</template>

<script>
    import {cookie} from 'vux'
    export default {
        name:'hello',
        components: {
            cookie
        },
        data () {
            return {
                code:'',
                login_id:''
            }
        },
        created () {
            var c_state = document.cookie.indexOf("login_id=")
//            console.log("111",cookie.get('login_id'))
            var that = this
            if(c_state==-1){
                let ua = window.navigator.userAgent.toLowerCase()
                console.log("是否授权",cookie.get('login_state'),ua,"DSDS",ua.match(/MicroMessenger/i))
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    console.log('请求授权')
                    // 跳转到微信授权页面
                    cookie.set('login_id', '1', {
                        expires: 30
                    })
                    window.location.href = 'http://flowwx.ixmcd.com/oauth.php';
//                    var url = encodeURIComponent('http://flowwx.ixmcd.com/#/Author/')
//                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1d003fc754bd657a&redirect_uri='+url +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'

                }
            }else{
                console.log('已授权')
                that.$http.post(that.apiurl+'/auth/index', that.$qs.stringify(
                    {
                        code:cookie.get("code")
                    }
                ))
                    .then(function (response) {
                        console.log("success"+response);
                     if(response.data.err==1){//新用户
                            that.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500,
                                icon: 'success'
                            });
                            console.log("1"+response.data.data.token)
                         that.$http.defaults.headers.token =response.data.data.token;
                            cookie.set('token',response.data.data.token, {
                                expires: 30
                            })
                            that.$router.push('/Login')
                        }else if(response.data.err==2){//老用户
                            that.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500,
                                icon: 'success'
                            });
                            console.log("2"+response.data.data.token)
                         that.$http.defaults.headers.token =response.data.data.token;
                            cookie.set('token',response.data.data.token, {
                                expires: 30
                            })
                            that.goBeforeLoginUrl()
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

            }


        },

        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
