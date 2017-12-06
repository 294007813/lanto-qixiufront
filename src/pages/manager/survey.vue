<template>
  <div id="survey">
    <sub-title title="问卷调查" :link="[{name:'管理中心',to: '/center/manHome'},{name:'问卷调查',to:''}]"></sub-title>
    <template>
      <span>问卷标题</span>
      <Input v-model="title" placeholder="请输入标题"></Input>
      <span>问卷内容</span>
      <Input v-model="content" type="textarea" :autosize="{minRows: 3}" placeholder="请输入内容"></Input>
    </template>
  </div>
</template>

<script>
export default {
  name: "survey",
  data(){
    return{
      title: '',
      content: ''
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang='scss'>
  #survey {
    .ivu-input-wrapper {
      width: 378px;
    }
  }
</style>
