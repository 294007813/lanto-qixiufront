<template>
  <div id="visitingService">
    <sub-title title="上门服务" :link="[{name:'公共服务',to: ''},{name:'上门服务',to:''}]"></sub-title>
    <div class="content">
      <Form :model="formItem" label-position="left" :label-width="100" style="margin-left: 30px;">
        <FormItem label="车主姓名" style="width: 450px;">
          <Input v-model="formItem.ownername" style="margin-left: -30px" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" style="width: 450px;">
          <Input v-model="formItem.linkTel" style="margin-left: -30px"  placeholder="请输入联系方式"></Input>
        </FormItem>
        <FormItem label="联系地址" style="width: 450px;">
          <Input v-model="formItem.linkAddress" style="margin-left: -30px"  placeholder="请输入详细地址"></Input>
        </FormItem>
        <FormItem label="服务内容">
          <CheckboxGroup v-model="formItem.serviceCategory">
            <Checkbox label="200"  style="margin-left: -30px">上门故障诊断</Checkbox>
            <Checkbox label="201">上门取送车服务</Checkbox>
            <Checkbox label="202">上门更换备胎</Checkbox>
            <Checkbox label="203">上门更换电灯泡</Checkbox>
            <Checkbox label="204">上门更换雨刮片</Checkbox>
            <Checkbox label="205">上门更换电池</Checkbox>
            <Checkbox label="206">上门泵电</Checkbox>
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
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          companyid: this.$route.query.id,
          ownername: '',
          linkTel: '',
          linkAddress: '',
          serviceCategory: []
        }
      }
    },
    methods: {
      Submit(){
        let self= this
        this.axios({
          method: 'post',
          url: '/company/service',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(self.formItem)
        }).then(function (res) {
          console.log(res)
          if(res.data.code=='000000'){
            self.$Message.success("申请成功")
            self.$router.push({
              path: '/center/perMyvisit'
            })
          }
        })
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
