<template>
<div style="overflow: hidden">
<Row>
  <div class="left-block" v-if="userType()==3">
    <div class="title">管理中心</div>
    <Menu theme="light" class="left-menu"
          :active-name="this.$route.path" @on-select="select" :open-names="['3','4','5']">
      <MenuItem name="/center/manHome"><Icon type="ios-paper"></Icon>首页</MenuItem>
      <MenuItem name="/center/eCarList"><Icon type="ios-paper"></Icon>电子健康档案</MenuItem>
      <Submenu name="3">
        <template slot="title"><Icon type="ios-paper"></Icon>公共服务</template>
        <MenuItem name="/center/manNotify">通知发布</MenuItem>
        <MenuItem name="/center/notes">通知管理</MenuItem>
        <MenuItem name="/center/manComplain">投诉管理</MenuItem>
        <MenuItem name="/center/manSurvey">问卷调查</MenuItem>
        <MenuItem name="">
          <a style='color: #333' href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">统计报表</a>
        </MenuItem>
        <MenuItem name="/center/manDownload">文件下载</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title"><Icon type="ios-people"></Icon>企业资料</template>
        <MenuItem name="/center/manCompanyInfo">维修企业信息管理</MenuItem>
        <MenuItem name="/center/manQuality">质量信誉考核管理</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title"><Icon type="stats-bars"></Icon>账号管理</template>
        <MenuItem name="/center/baseInfo">基本信息</MenuItem>
        <MenuItem name="/center/resetPassword">修改密码</MenuItem>
        <MenuItem name="exit">退出登录</MenuItem>
      </Submenu>
    </Menu>
  </div>

  <div class="left-block" v-if="userType()==2">
    <div class="title">企业中心</div>
    <Menu theme="light" class="left-menu"
          :active-name="this.$route.path" @on-select="select" :open-names="['3','4','5','6']">
      <MenuItem name="/center/comHome"><Icon type="ios-paper"></Icon>首页</MenuItem>
      <MenuItem name="/center/eCarList"><Icon type="ios-paper"></Icon>电子健康档案</MenuItem>
      <MenuItem name="/center/comUpRecord"><Icon type="ios-paper"></Icon>上传维修记录</MenuItem>
      <Submenu name="3">
        <template slot="title"><Icon type="ios-paper"></Icon>预约上门管理</template>
        <MenuItem name="/center/comVisit">上门服务管理</MenuItem>
        <MenuItem name="/center/comAppoint">预约管理</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title"><Icon type="ios-people"></Icon>信息管理</template>
        <MenuItem name="/center/notes">通知管理</MenuItem>
        <MenuItem name="/center/comComplain">投诉管理</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title"><Icon type="ios-people"></Icon>业务管理</template>
        <MenuItem name="/center/comUpload">维修数据上报查询</MenuItem>
        <MenuItem name=""><a style='color: #333' href="http://218.242.195.69:3320/hytjglxt/login.vm" target="_blank">行业报表申报系统</a></MenuItem>
      </Submenu>
      <Submenu name="6">
        <template slot="title"><Icon type="stats-bars"></Icon>账号管理</template>
        <MenuItem name="/center/baseInfo">基本信息</MenuItem>
        <MenuItem name="/center/resetPassword">修改密码</MenuItem>
        <MenuItem name="exit">退出登录</MenuItem>
      </Submenu>
    </Menu>
  </div>

  <div class="left-block" v-if="userType()==1">
    <div class="title">车主中心</div>
    <Menu theme="light" class="left-menu"
          :active-name="this.$route.path" @on-select="select" >
      <MenuItem name="/center/eCarList"><Icon type="ios-paper"></Icon>爱车档案</MenuItem>
      <!--<MenuItem name="/center/perBindcar"><Icon type="ios-paper"></Icon>绑定车辆</MenuItem>-->
      <MenuItem name="/center/notes"><Icon type="ios-paper"></Icon>通知管理</MenuItem>
      <MenuItem name="/center/perMyquestion"><Icon type="ios-paper"></Icon>我的咨询</MenuItem>
      <MenuItem name="/center/perMyvisit"><Icon type="ios-paper"></Icon>我的上门服务</MenuItem>
      <MenuItem name="/center/perMyappoint"><Icon type="ios-paper"></Icon>我的预约服务</MenuItem>
      <MenuItem name="/center/baseInfo"><Icon type="ios-paper"></Icon>基本信息</MenuItem>
      <MenuItem name="/center/resetPassword"><Icon type="ios-paper"></Icon>修改密码</MenuItem>
      <MenuItem name="exit"><Icon type="ios-paper"></Icon>退出登录</MenuItem>

    </Menu>
  </div>

  <div class="right-block">
    <router-view/>
  </div>
</Row>
</div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    userType(){
      return this.$store.getters.userType
    },
    select(name){
      console.log(name)
      switch (name){
        case 'exit':{
          this.logout()
          break
        }
        default:
          this.$router.push({
            path: name
          })
      }

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
  }
}
</script>

<style scoped lang="scss">
.left-block{
  float: left;
  border-right: 1px solid #dddee1;
  border-bottom: 1px solid #dddee1;
  .title{
    width: 215px;
    height: 45px;
    background: url(../assets/leftmenu/banner.png) no-repeat;
    margin: 15px auto 0 auto;
    position: relative;
    color: #FFF;
    font-size: 16px;
    padding-left: 40px;
    line-height: 38px;
  }
  .title:after {
    content: "";
    width: 24px;
    height: 24px;
    position: absolute;
    top: 6px;
    left: 10px;
    background: url(../assets/leftmenu/book.png) no-repeat;
  }
  .left-menu{
    min-height: 520px;
  }
  .ivu-menu::-webkit-scrollbar{

  }
}
.right-block{
  margin: 10px 10px 10px 250px;
  padding: 0 10px;
  border: 1px solid #dddee1;
  min-height: 560px;
  min-width: 550px;
}

.ivu-menu-vertical.ivu-menu-light:after{
  background: none;
}
</style>
