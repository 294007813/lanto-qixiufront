<template>
  <div id='service'>
    <sub-title title="我们来为您服务" :link="[{name:'在线商务',to: ''},{name:'我们来为您服务',to:''}]"></sub-title>
    <div class="content">
      <Form :model="formItem" :label-width="80">
        <FormItem label="车主姓名">
          <Input v-model="formItem.name" placeholder="请输入您的姓名" style='width: 500px'></Input>
        </FormItem>
        <FormItem label="联系方式">
          <Input v-model="formItem.tel" placeholder="请输入您的联系方式" style='width: 500px'></Input>
        </FormItem>
        <FormItem label="服务需求">
          <Input v-model="formItem.need" placeholder="请输入您的服务需求" style='width: 500px'></Input>
        </FormItem>
        <FormItem label="" style='width: 580px'>
          <Button type="primary" style='float: right;'>提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "service",
  data(){
    return{
      formItem: {
        name: '',
        tel: '',
        need: ''
      }
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #service {
    width: 980px;
    min-height: 700px;
    margin: 10px auto;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;
    .content {
      border: 1px solid #ddd;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      min-height: 620px;
    }
  }
</style>
