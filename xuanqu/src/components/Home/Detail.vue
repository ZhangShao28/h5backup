<template>
    <div id="Detail">
        <div class="box head"><div class="titleLeft"><img src="/static/img/zaZa.png" alt=""><div class="name">{{area}}</div></div><div class="titleRight"><img src="/static/img/small_logo.png" alt=""></div></div>

        <div class="box con">
           <div class="item"><div class="post">現任區議員：</div> <div class="name"><span>{{councillor}}</span></div></div>
           <div class="item"><div class="post">地區幹事：</div> <div class="name"><span>{{district_officer}}</span></div></div>
           <div class="item"><div class="post">對接副會長：</div> <div class="name"><span>{{vice_president}}</span></div></div>
           <div class="item"><div class="post" >地區召集人：</div>
               <div class="name">
                   <span>{{area_convenor}}</span>
               </div>
           </div>
           <div class="item"><div class="post" >青委義工：</div>
               <div class="name">
                   <span>{{volunteer}}</span>
               </div>
           </div>
       </div>
        <div class="box con">
            <div class="item"><div class="post" >大廈範圍：</div>
                <div class="name">
                    <span>{{building_scope}}</span>
                </div>
            </div>
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
        area:'',
        councillor:'',
        district_officer:'',
        vice_president:'',
        area_convenor:'',
        volunteer:'',
        building_scope:'',
      }
    },
    mounted(){
      let area = this.$route.query.area
      this.getData(area)
//      this.getTime()
    },
    methods: {
      getData(area) {
        let that = this
        this.$dialog.loading.open('正在加載中···')
//                console.log(this.page)
        that.$api.indexDetail({
          area: area
        }).then(response => {
          // sucess callback
          that.$dialog.loading.close()
          let data = response.data
          console.log(response)
          if(data.state==1){
            that.area = data.data.area
            that.councillor = data.data.councillor
            that.district_officer = data.data.district_officer
            that.vice_president = data.data.vice_president
            that.area_convenor = data.data.area_convenor
            that.volunteer = data.data.volunteer
            that.building_scope = data.data.building_scope
          }else{
            that.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              callback: () => {
              }
            })
          }

        }, response => {
          // error callback
          that.$dialog.loading.close()
          that.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            callback: () => {
            }
          })
        })
      }
    },
    beforeCreate () {
      document.querySelector('html').setAttribute('style', 'background-color:#efefef;')
      document.querySelector('body').setAttribute('style', 'background-color:#efefef;')
    },

    beforeDestroy () {
      document.querySelector('html').removeAttribute('style')
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
    /*#app .weui-cell{*/
        /*padding: 10px 0;*/
    /*}*/
    #Detail{

    }
</style>
<style scoped lang="less" type="text/less">
    #Detail{
        background: #f5f5f5;
        .box{
            box-shadow:0px 2px 5px rgba(0,0,0,0.08);
            padding: 10px;
            font-weight: bold;
        }
        .head{
            font-size: .3rem;
            color: #fff;
            .titleLeft,.titleRight{
                display: inline-block;
            }
            .titleLeft{
                .name{
                    text-align: center;
                    display: inline-block;
                    width: 77%;
                    position: absolute;
                    top: 20px;
                }
                background: #CB0300;
                width: 80%;
                border-radius:4px 0px 0px 4px;
                box-shadow:0px 2px 5px rgba(0,0,0,0.2);
                padding: 5px;
                img{
                    width: 30px;
                }
            }
            .titleRight{
                background: #595859;
                width: 20%;
                border-radius:0px 4px 4px 0px;
                box-shadow:0px 2px 5px rgba(0,0,0,0.2);
                text-align: center;
                img{
                    width: 39px;
                }
            }
        }
        .con{
            padding: 15px 20px 0 20px;
            font-size: .28rem;
            .item{
                position: relative;
                .post{
                    color: #666;
                    display: inline-block;
                    position: absolute;
                }
                .name{
                    display: inline-block;
                    padding-left: 30%;
                }
                border-bottom: .5px solid #dedede;
                padding: 10px 0;
            }
        }
    }
</style>