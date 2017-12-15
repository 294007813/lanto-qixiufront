<template>
  <div id="visitingService">
    <sub-title title="上门服务" :link="[{name:'公共服务',to: ''},{name:'上门服务',to:''}]"></sub-title>
    <div class="content">
      <Form :model="formItem" label-position="left" :label-width="100" style="margin-left: 30px;">
        <FormItem label="车主姓名" style="width: 450px;">
          <Input v-model="formItem.name" style="margin-left: -30px" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" style="width: 450px;">
          <Input v-model="formItem.tel" style="margin-left: -30px"  placeholder="请输入联系方式"></Input>
        </FormItem>
        <FormItem label="联系地址" style="width: 450px;">
          <Input v-model="formItem.address" style="margin-left: -30px"  placeholder="请输入详细地址"></Input>
        </FormItem>
        <FormItem label="服务内容">
          <CheckboxGroup v-model="formItem.content">
            <Checkbox label="上门故障诊断"  style="margin-left: -30px"></Checkbox>
            <Checkbox label="上门取送车服务"></Checkbox>
            <Checkbox label="上门更换备胎"></Checkbox>
            <Checkbox label="上门更换电灯泡"></Checkbox>
            <Checkbox label="上门更换雨刮片"></Checkbox>
            <Checkbox label="上门更换电池"></Checkbox>
            <Checkbox label="上门泵电"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem style="width: 810px">
          <Button type="primary" @click="Submit" style="float: right;">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "visitingService",
    data(){
      return {
        formItem: {
          name: '',
          tel: '',
          address: '',
          content: []
        }
      }
    },
    methods: {
      Submit(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  #visitingService {
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
