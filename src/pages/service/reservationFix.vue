<template>
  <div id="reservationFix">
    <sub-title title="在线预约维修" :link="[{name:'公共服务',to: ''},{name:'在线预约维修',to:''}]"></sub-title>
    <div class="content">
      <Form :model="formItem" label-position="left" :label-width="100" style="margin-left: 30px;">
        <FormItem label="车主姓名" style="width: 450px;">
          <Input v-model="formItem.ownername" style="margin-left: -15px" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="联系电话" style="width: 450px;">
          <Input v-model="formItem.linkTel" style="margin-left: -15px"  placeholder="请输入联系方式"></Input>
        </FormItem>
        <FormItem label="预约服务内容" style="width: 450px;">
          <Input v-model="formItem.serviceCategory" style="margin-left: -15px"  placeholder="请输入预约服务内容"></Input>
        </FormItem>
        <FormItem style="width: 500px">
          <Button type="primary" @click="Submit" style="float: right;">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "reservationFix",
    data(){
      return {
        formItem: {
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          companyid: this.$route.query.id,
          ownername: '',
          linkTel: '',
          serviceCategory: '',
        }
      }
    },
    methods: {
      Submit(){
        let self= this
        this.axios({
          method: 'post',
          url: '/company/online',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(self.formItem)
        }).then(function (res) {
          console.log(res)
          if(res.data.code=='000000'){
            self.$Message.success("申请成功")
            self.$router.push({
              path: '/center/perMyappoint'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #reservationFix {
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
