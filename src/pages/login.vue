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
            <p slot="append" class="get-code" @click="getCode">获取验证码</p>
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
      }
    }
  },
  methods:{
    handleLogin(){

    },
    handlereg(){

    },
    getCode(){
      
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
        background: url(../assets/login/register.png) no-repeat left center;
      }
      .log{
        background: url(../assets/login/login.png) no-repeat left center;
      }
    }
  }
}
  .get-code{
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
