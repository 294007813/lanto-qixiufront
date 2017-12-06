<template>
<div>
<div class="topbar">
  <div v-if="!userName()" class="greet"><span>您好，欢迎光临本站！</span>
    <router-link tag="a" :to="{ name: 'login'}">请登录</router-link>|
    <router-link tag="a" :to="{ name: 'register'}">快速注册</router-link>
  </div>
  <div v-if="userName()" class="greet"><span>欢迎您，</span><span>{{userName()}}</span>
    <router-link tag="span" :to="{ name: 'perHome'}" v-if="userType()==1" class="button">车主中心</router-link>
    <router-link tag="span" :to="{ name: 'comHome'}" v-if="userType()==2" class="button">企业中心</router-link>
    <router-link tag="span" :to="{ name: 'manHome'}" v-if="userType()==3" class="button">管理中心</router-link>
    <a @click="logout">注销</a>
  </div>
</div>
<div class="midbar">
  <img class="logo" src="../assets/header/logo1.png">
  <div class="title">
    <p>上海市机动车维修公共服务平台</p><p>Shanghai Automobile Maintenance public Service  Platform</p>
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

  <Menu mode="horizontal" theme="primary" :active-name="this.$route.path" @on-select="select">
    <MenuItem name="/index">首页</MenuItem>
    <MenuItem name="">公共管理</MenuItem>
    <MenuItem name="/center/eRecordList">电子健康档案</MenuItem>
    <Submenu name="4">
      <template slot="title">公共服务</template>
      <MenuItem name="">车大夫</MenuItem>
      <MenuItem name="">救援服务</MenuItem>
      <MenuItem name="">新能源汽车维修</MenuItem>
      <MenuItem name="">危险品运输车辆维修</MenuItem>
    </Submenu>
    <MenuItem name="">行业治理</MenuItem>
    <Submenu name="6">
      <template slot="title">公众监督</template>
      <MenuItem name="">满意度调查</MenuItem>
      <MenuItem name="">投诉举报</MenuItem>
    </Submenu>
    <Submenu name="7">
      <template slot="title">在线商务</template>
      <MenuItem name="">维修保养</MenuItem>
      <MenuItem name="">备件商城</MenuItem>
      <MenuItem name="">保险服务</MenuItem>
      <MenuItem name="">合作伙伴</MenuItem>
    </Submenu>
    <MenuItem name="/about">关于我们</MenuItem>
  </Menu>

</div>
</template>

<script>

export default {
  data(){
    return{
      qr: false,
    }
  },
  computed:{

  },
  methods:{
    userName(){
      let name= this.$store.getters.userName, localInfo= localStorage.getItem('USERINFO')
      if (!name){
        if (localInfo){
          this.$store.commit("putUserInfo",JSON.parse(localInfo))
        }
      }
      return this.$store.getters.userName
    },
    userType(){
      return this.$store.getters.userType
    },
    logout(){
      let self= this
      this.$Modal.confirm({
        title: '退出',
        content: '确定退出登录？',
        onOk: () => {
          this.$Message.success('退出成功');
          localStorage.removeItem("ACCESSTOKEN");
          localStorage.removeItem("USERINFO");
          self.$store.commit("putUserInfo",{})
          self.$router.replace({
            path: '/login',
          });
        },
        onCancel: () => {
//          this.$Message.info('Clicked cancel');
        }
      });
    },
    showqr(){
      this.qr=true
    },
    hideqr(){
      this.qr=false
    },
    select(name){
      console.log(name)
      if(name){
        this.$router.push({
          path: name
        })
      }

    }
  }

}
</script>

<style scoped lang="scss">
.topbar{
  width: 100%;
  min-width: 800px;
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
    .button{
      background: #4ba7f5;
      color: white;
      padding: 2px 5px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.midbar{
  margin-top: 20px;
  position: relative;
  min-width: 800px;
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
  padding: 0 18px;
}
</style>

