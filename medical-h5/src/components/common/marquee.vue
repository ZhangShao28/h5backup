<template>
    <div class="wrap">
        <div id="box">
            <div id="marquee">{{text}}</div>
            <div id="copy"></div>
        </div>
        <div id="node">{{text}}</div>
    </div>
</template>
<script>
  export default {
    name: 'Marquee',
    props: {
      lists:this.lists
    }, // 父组件传入数据，
    data () {
      return {
        text: ''
      }
    },
    methods: {
      move () {
// 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
        let width = document.getElementById('node').getBoundingClientRect().width
        let box = document.getElementById('box')
        let copy = document.getElementById('copy')
        copy.innerText = this.text // 文字副本填充
        let distance = 0 // 位移距离
//设置位移
        setInterval(function () {
          distance = distance - 1
          // 如果位移超过文字宽度，则回到起点
          if (-distance >= width) {
            distance = 10
          }
          box.style.transform = 'translateX(' + distance + 'px)'
        }, 30)
      }
    },
// 把父组件传入的arr转化成字符串
    mounted: function () {
      this.text=this.lists
    },
// 更新的时候运动
    updated: function () {
      this.move()
    }
  }
</script>
<style scoped>
     /*限制外框宽度，隐藏多余的部分*/
    .wrap {
        overflow: hidden;
        /*position: fixed;*/
        background: rgba(240,248,255,1);
        padding: 8px;
        color: #1F8CEB;
    }
     /*移动框宽度设置*/
       #box {
           width: 80000%;
       }
     /*文字一行显示*/
       #box div {
           float: left;
       }
     /*设置前后间隔*/
       #marquee {
           margin: 0 30px 0 0;
       }
     /*获取宽度的节点，隐藏掉*/
       #node {
           position: absolute;
           z-index: -999;
           top: -999999px;
       }
</style>