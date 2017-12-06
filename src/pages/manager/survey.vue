<template>
  <div id="survey">
    <sub-title title="问卷调查" :link="[{name:'管理中心',to: '/center/manHome'},{name:'问卷调查',to:''}]"></sub-title>
    <template>
      <div class="title">
        <span>问卷标题</span>
        <Input v-model="title" placeholder="请输入标题"></Input><br />
      </div>
      <div class="content">
        <span>问卷内容</span>
        <Input v-model="content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入内容"></Input>
      </div>
    </template>
    <div class="btns">
      <Button type="primary" icon="ios-cloud-upload-outline">上传附件</Button>
      <Button type="primary">发布问卷</Button>
    </div>
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
    .title, .content {
      margin: 15px 0 15px 30px;
      span {
        margin-right: 10px;
      }
    }
    .content {
      position: relative;
      span {
        position: absolute;
        left: 0;
        top: 0;
      }
      textarea {
        min-width: 100%;
        margin-left: 60px !important;
        font-size: 12px;
      }
    }
    .ivu-input-wrapper {
      width: 390px;
    }
    .btns {
      width: 480px;
      button {
        &:nth-child(2) {
          float: right;
        }
      }
    }
  }
</style>
