<template>
  <div id="baseInfo">
    <sub-title title="基本信息" :link="[{name:'管理中心',to: '/center/manHome'},{name:'基本信息',to:''}]"></sub-title>
    <template>
      <Input v-model="account">
        <span slot="prepend">用户账号</span>
      </Input>
      <Input v-model="userName" placeholder='请输入昵称'>
      <span slot="prepend">用户昵称</span>
      </Input>
      <Input v-model="email" placeholder='请输入电子邮箱'>
      <span slot="prepend">电子邮箱</span>
      </Input>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return{
      account: '222',
      userName: '',
      email: ''
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>
