<template>
<div>
<div class="topbar">
  <div v-if="!userName()" class="greet"><span>您好，欢迎光临本站！</span>
    <router-link tag="a" :to="{ name: 'login'}">请登录</router-link>|
    <router-link tag="a" :to="{ name: 'register'}">快速注册</router-link>
  </div>
  <div v-if="userName()" class="greet"><span>欢迎您，</span><span>{{userName()}}</span>
    <router-link tag="span" :to="{ path: '/center/eRecordList'}" v-if="userType()==1" class="button">车主中心</router-link>
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
  <div class="wx" @mouseover="showqr2" @mouseout="hideqr2">
    <img src="../assets/header/vx.png"><span>关注微信公众号</span>
  </div>
  <div class="app" @mouseover="showqr1" @mouseout="hideqr1">
    <img src="../assets/header/sj.png"><span>手机APP下载</span>
  </div>
  <img class="qrcode1" src="../assets/header/qr2.jpg" v-show="qr1" @mouseover="showqr1" @mouseout="hideqr1"/>
  <img class="qrcode2" src="../assets/header/qr2.jpg" v-show="qr2" @mouseover="showqr2" @mouseout="hideqr2"/>
</div>
<div class="comp">
  <div class="left"><img src="../assets/header/tlogo1.png"/><div>指导部门：上海市城市交通运输管理处</div></div>
  <div class="mid"><img src="../assets/header/tlogo2.png"/><div>主办单位：上海市汽车维修行业协会</div></div>
  <div class="right"><img src="../assets/header/logo1.png"/><div>承办单位：上海蓝速汽车技术有限公司</div></div>
</div>

  <Menu mode="horizontal" theme="primary" :active-name="this.$route.path" @on-select="select">
    <MenuItem name="/index">首页</MenuItem>
    <MenuItem name="">公共管理</MenuItem>
    <MenuItem name="/center/eRecordList">电子健康档案</MenuItem>
    <Submenu name="4">
      <template slot="title">公共服务</template>
      <MenuItem name="/maintain?type=maintain">维修服务查选</MenuItem>
      <MenuItem name="/service/carDoctor">车大夫门诊</MenuItem>
      <MenuItem name="/service/visitingService">上门服务</MenuItem>
      <MenuItem name="/service/reservationFix">在线预约维修</MenuItem>
      <!--<MenuItem name="">维修相关产业服务</MenuItem>-->
      <MenuItem name="/maintain?type=check">专业检测、等级评定</MenuItem>
      <MenuItem name="/maintain?type=danger">危险品运输车辆维修</MenuItem>
      <MenuItem name="/maintain?type=newenergy">新能源汽车维修</MenuItem>
      <MenuItem name="/maintain?type=rescue">维修救援服务</MenuItem>
    </Submenu>
    <MenuItem name="">行业治理</MenuItem>
    <Submenu name="6">
      <template slot="title">公众监督</template>
      <MenuItem name="/supervision/satisfaction">满意度调查</MenuItem>
      <MenuItem name="/supervision/complaint">维修投诉</MenuItem>
    </Submenu>
    <Submenu name="7">
      <template slot="title">在线商务</template>
      <MenuItem name="/business/fittings">汽车配件</MenuItem>
      <MenuItem name="/business/equipment">汽保设备</MenuItem>
      <MenuItem name="/business/insurance">汽车保险</MenuItem>
      <MenuItem name="/business/sell">汽车销售</MenuItem>
      <MenuItem name="/business/train">相关培训</MenuItem>
      <MenuItem name="/business/goods">汽车用品</MenuItem>
      <MenuItem name="/business/books">汽车读物</MenuItem>
      <MenuItem name="/business/beautify">洗车美容</MenuItem>
      <MenuItem name="/business/check">车辆年检</MenuItem>
      <MenuItem name="/business/study">学驾推荐</MenuItem>
      <MenuItem name="/business/help">故障救援</MenuItem>
      <MenuItem name="/business/service">我们来为您服务</MenuItem>
    </Submenu>
    <MenuItem name="/about">关于我们</MenuItem>
  </Menu>

</div>
</template>

<script>

export default {
  data(){
    return{
      qr1: false,
      qr2: false,
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
    showqr1(){
      this.qr1=true
    },
    hideqr1(){
      this.qr1=false
    },
    showqr2(){
      this.qr2=true
    },
    hideqr2(){
      this.qr2=false
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
  .qrcode1{
    position: absolute;
    width: 160px;
    right: 110px;
    top: 30px;
    z-index: 901;
  }
  .qrcode2{
    position: absolute;
    width: 160px;
    right: 0;
    top: 30px;
    z-index: 901;
  }

}
.comp{
  width: 900px;
  height: 30px;
  margin: 10px auto;
  text-align: center;
  >div{
    width: 33%;
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    img{
      float: left;
      width: 30px;
    }
    div{
      float: left;
      line-height: 30px;
    }
  }
  .mid{
    img{
      width: 35px;
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

