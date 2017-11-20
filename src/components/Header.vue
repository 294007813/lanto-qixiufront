<template>
<div>
<div class="topbar">
  <div class="greet"><span>您好，欢迎光临本站！</span><a>请登录</a>|<a>快速注册</a></div>
</div>
<div class="midbar">
  <img class="logo" src="../assets/header/logo1.png">
  <div class="title">
    <p>上海市机动车维修公共服务网</p><p>Shanghai Automobile Maintenance public Service  Website</p>
  </div>
  <div class="wx" @mouseover="showqr" @mouseout="hideqr">
    <img src="../assets/header/vx.png"><span>关注微信公众号</span>
  </div>
  <div class="app"><img src="../assets/header/sj.png"><span>手机APP下载</span></div>
  <img class="qrcode" src="../assets/header/lantoShare.jpg" v-show="qr" @mouseover="showqr" @mouseout="hideqr"/>
</div>
<div class="comp">
  <div class="left"><img src="../assets/header/gh.png"/><div>上海市城市交通运输管理处</div></div>
  <div class="mid">上海市汽车维修行业协会</div>
  <div class="right">上海蓝速汽车技术有限公司</div>
</div>

  <Menu mode="horizontal" theme="primary" active-name="1">
    <MenuItem name="1">首页</MenuItem>
    <MenuItem name="2">公共管理</MenuItem>
    <MenuItem name="3">电子健康档案</MenuItem>
    <Submenu name="4">
      <template slot="title">公共服务</template>
      <MenuItem name="4-1">车大夫</MenuItem>
      <MenuItem name="4-2">救援服务</MenuItem>
      <MenuItem name="4-3">新能源汽车维修</MenuItem>
      <MenuItem name="4-4">危险品运输车辆维修</MenuItem>
    </Submenu>
    <MenuItem name="5">行业治理</MenuItem>
    <Submenu name="6">
      <template slot="title">公众监督</template>
      <MenuItem name="6-1">满意度调查</MenuItem>
      <MenuItem name="6-2">投诉举报</MenuItem>
    </Submenu>
    <Submenu name="7">
      <template slot="title">在线商务</template>
      <MenuItem name="7-1">维修保养</MenuItem>
      <MenuItem name="7-2">备件商城</MenuItem>
      <MenuItem name="7-3">保险服务</MenuItem>
      <MenuItem name="7-4">合作伙伴</MenuItem>
    </Submenu>
    <MenuItem name="8">关于我们</MenuItem>
  </Menu>

</div>
</template>

<script>

export default {
  data(){
    return{
      qr: false
    }
  },
  methods:{
    showqr(){
      this.qr=true
    },
    hideqr(){
      this.qr=false
    }
  }

}
</script>

<style scoped lang="scss">
.topbar{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #f2f2f2;
  overflow: hidden;
  .greet{
    float: right;
    margin-right: 10px;
    a{
      padding: 0 5px;
    }
  }
}
.midbar{
  margin-top: 20px;
  position: relative;
  .logo{
    width: 60px;
    margin: 0 20px;
  }
  .title{
    display: inline-block;
    p{
      font-size: 30px;
    }
    p:last-child{
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .app,.wx{
    float: right;
    margin-right: 20px;
    font-size: 14px;
    height: 33px;
    overflow: hidden;
    margin-top: 10px;
    img{
      display: block;
      float: left;
    }
    span{
      display: block;
      float: left;
    }
  }
  .qrcode{
    position: absolute;
    width: 160px;
    right: 10px;
    top: 30px;
    z-index: 901;
  }

}
.comp{
  width: 800px;
  height: 30px;
  margin: 10px auto;
  text-align: center;
  >div{
    width: 33%;
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
  .left{
    img{
      float: left;
    }
    div{
      float: left;
      line-height: 30px;
    }
  }
}

.ivu-menu{
  min-width: 800px;
  height: 40px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
}
.ivu-menu li{
  height: 40px;
  line-height: 40px;
}
</style>

