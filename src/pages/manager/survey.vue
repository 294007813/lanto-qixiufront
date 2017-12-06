<template>
  <div id="survey">
    <sub-title title="问卷调查" :link="[{name:'管理中心',to: '/center/manHome'},{name:'问卷调查',to:''}]"></sub-title>
    <Form :model="formItem" :label-width="80" style="width: 500px;overflow: hidden;margin: 10px 0">
      <FormItem label="问卷标题">
        <Input v-model="title" placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem label="问卷内容">
        <Input v-model="context" type="textarea" placeholder="请输入内容" :autosize='{minRows: 10,maxRows: 20}' class="textarea"></Input>
      </FormItem>
      <FormItem>
        <Upload :action="xxx"
                :format="['txt','zip','doc','docx','xls', 'xlsx', 'pdf', 'html']"
                :on-success="upsuccess"
                ref="upload">
          <Button type="primary" icon="ios-cloud-upload-outline" style='margin-left: -80px'>上传附件</Button>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="send" style='margin-left: 340px; margin-top: -130px'>发布问卷</Button>
      </FormItem>
    </Form>
    
    
  </div>
</template>

<script>
export default {
  name: "survey",
  data(){
    return{
      title: '',
      context: ''
    }
  },
  methods:{
    send(){
    
    },
    upsuccess(){
    
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang='scss'>
  #survey {
    .btns {
      width: 500px;
      button {
        &:nth-child(2) {
          float: right;
        }
      }
    }
  }
</style>
