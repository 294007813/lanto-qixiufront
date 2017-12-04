<template>
<div class="login">
  <div class="title"><h1>会员注册/登录</h1></div>
  <div class="under">
    <div class="left">
      <Form ref="loginForm" :model="loginForm"  class="card-box login-form" v-show="this.$route.name=='login'">
        <Form-item prop="email">
          <Input size="large" type="text" v-model="loginForm.loginName" placeholder="用户名" >
          <Icon type="ios-person-outline" slot="prepend" ></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input size="large" type="password" v-model="loginForm.password" placeholder="密码" >
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
          <a class="forget">忘记密码？</a>
        </Form-item>

        <Form-item>
          <Button size="large" type="primary" @click="handleLogin('loginForm')" long>登录</Button>
        </Form-item>
      </Form>

      <Form ref="regForm"
            :model="regForm"  class="card-box reg-form" :label-width="60" v-show="this.$route.name=='register'">
        <Form-item label="手机">
          <Input size="large" type="text" v-model="regForm.loginName" placeholder="用户名" ></Input>
        </Form-item>
        <Form-item label="验证码">
          <Input size="large" type="text" v-model="regForm.code" placeholder="验证码" >
            <p slot="append" class="get-code" @click="getCode">{{getCodeButton}}</p>
          </Input>
        </Form-item>
        <Form-item label="密码">
          <Input size="large" type="password" v-model="regForm.password" placeholder="密码" ></Input>
        </Form-item>
        <Form-item label="确认密码">
          <Input size="large" type="password" v-model="regForm.repass" placeholder="确认密码" ></Input>
        </Form-item>
        <Form-item label="注册类别">
          <Select v-model="regForm.type" >
            <Option value="1">车主注册</Option>
            <Option value="2">企业注册</Option>
            <Option value="3">管理注册</Option>
          </Select>
        </Form-item>

        <Form-item>
          <Button size="large" type="primary" @click="handlereg('regForm')" long>注册</Button>
        </Form-item>
      </Form>

    </div>
    <div class="right">
      <router-link tag="a" :to="{ name: 'register'}"  class="reg">注册</router-link>
      <router-link tag="a" :to="{ name: 'login'}"  class="log">登录</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      loginForm: {
        loginName: "",
        password: ""
      },
      regForm:{
        loginName: "",
        code:"",
        password:"",
        repass:"",
        type:"1"
      },
      getCodeButton:"获取验证码",
      count: 0,
      timer: null
    }
  },
  beforeCreate(){
    if(!localStorage.getItem("SYSTEMTOKEN")){
      let data = {
        device: uuid(),
        password: "k5pg8kkN",
        username: "pcqixiu"
      }
      this.axios({
        method: 'post',
        url: '/system/terminalsystem/login',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(function (response) {
        localStorage.setItem("SYSTEMTOKEN", response.data.data.systemToken)
      })
    }

    function  uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      // s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    }
  },
  mounted(){
    if(this.$route.query.redirect){
      this.$Message.warning('请登录');
    }
    this.$Message.config({
      top: 300,
    });
  },
  methods:{
    handleLogin(){
      if(!this.loginForm.loginName){
        this.$Message.error('请输入用户名');
        return
      }
      if(!this.loginForm.password){
        this.$Message.error('请输入密码');
        return
      }
      let self=this
      let data={
        loginaccount: this.loginForm.loginName,
        userpassword: this.loginForm.password,
        systemToken: localStorage.getItem("SYSTEMTOKEN")
      }
      this.axios({
        method: 'post',
        url: '/user/useraccount/login',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(function (response) {
        console.log(response)
        if(response.data.code=='000000'){
          self.$Message.success('登录成功')

          localStorage.setItem("ACCESSTOKEN",response.data.data.accessToken);
          localStorage.setItem("USERINFO",JSON.stringify(response.data.data));
          self.$store.commit("putUserInfo",response.data.data)

          if(self.$route.query.redirect){
            self.$router.replace({
              path:self.$route.query.redirect
            })
          }else{
            self.$router.replace({
              name: 'index'
            })
          }


        }else{
          self.$Message.error(response.data.status);
        }
      })
    },
    handlereg(){
      if( !/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(this.regForm.loginName) ){
        this.$Message.error('手机号不正确！');
        return
      }
      if(! /(.+){6,18}$/.test(this.regForm.password)){
        this.$Message.error('密码必须6到18位！');
        return
      }
      if(this.regForm.password!= this.regForm.repass){
        this.$Message.error('两次密码不一致！');
        return
      }
      if(!this.regForm.code){
        this.$Message.error('请输入验证码！');
        return
      }
      let self= this
      let data={
        "captcha": this.regForm.code,
        "systemToken": localStorage.getItem('SYSTEMTOKEN'),
        "useroleid": this.regForm.type,
        "userpassword": this.regForm.password,
        "usertel": this.regForm.loginName
      }
      this.axios({
        method: 'post',
        url: '/user/useraccount/register',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(function (response) {
        console.log(response)
        if(response.data.code=='000000'){
          self.$Modal.success({
            title: '成功',
            content: '注册成功',
            onOk: () => {
              self.$router.push({
                path:'/login'
              })
            },
          });
        }else {
          self.$Message.error(response.data.status);
        }

      })
    },
    getCode(){
      if( !/^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/.test(this.regForm.loginName) ){
        this.$Message.error('手机号不正确！');
        return
      }
      if(this.timer) return;
      let self= this
      this.axios({
        method: 'post',
        url: '/message/sms/sendcaptcha/'+ localStorage.getItem('SYSTEMTOKEN') + '/' + this.regForm.loginName,
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        if(response.data.code=='000000'){
          self.$Message.success('发送成功，请查收！');
        }else {
          self.$Message.error(response.data.status);
        }
      })

      //计时器
      const TIME_COUNT = 60;
      let num= 0;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            num= this.count
            this.getCodeButton= num+ "s"
            this.count--;
          } else {
            clearInterval(this.timer);
            this.getCodeButton= '获取验证码'
            this.timer = null;
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login{
  width: 80%;
  min-width: 800px;
  height: 600px;
  margin: 20px auto;
  border: 1px solid #dddddd;
  .title{
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 50px;
    border-bottom: 1px solid #dddddd;
    h1{
      font-size: 28px;
    }
  }
  .under{
    position: relative;
    .left{
      width: 100%;
      height: 500px;
      padding-right: 300px;
      overflow: hidden;
      .card-box{
        width: 300px;
        margin: 30px auto;
        .forget{
          color: red;
          float: right;
        }
      }
    }
    .right{
      width: 300px;
      height: 499px;
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 30px;
      border-left: 1px solid #dddddd;
      a{
        display: block;
        height: 100px;
        line-height: 100px;
        padding-left: 50px;
        font-size: 20px;
        color: #495060;
      }
      .reg{
        border-bottom: 1px solid #dddddd;
        background: url(../../assets/login/register.png) no-repeat left center;
      }
      .log{
        background: url(../../assets/login/login.png) no-repeat left center;
      }
    }
  }
}
  .get-code{
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
