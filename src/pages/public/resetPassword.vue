<template>
  <div id="resetPassword">
    <sub-title title="基本信息" :link="[{name:'管理中心',to: '/center/manHome'},{name:'基本信息',to:''}]"></sub-title>
    <Form :model="formItem" :label-width="100" style='margin-left: 15px; height: 220px'>
      <FormItem label="用户账户" style='height: 32px; margin: 15px 0;'>
        <Input readonly v-model="formItem.account" style='width: 300px;'></Input>
      </FormItem>
      <!--<FormItem label="旧密码" style='height: 32px; margin-bottom: 15px'>-->
        <!--<Input v-model="formItem.oldPassword" placeholder="请输入旧密码" style='width: 300px; '></Input>-->
      <!--</FormItem>-->
      <FormItem label="新密码" style='height: 32px; margin-bottom: 15px'>
        <Input v-model="formItem.newPassword" type="password" placeholder="请输入6~18位新密码" style='width: 300px;'></Input>
      </FormItem>
      <FormItem label="确认新密码" style='height: 32px; margin-bottom: 15px'>
        <Input v-model="formItem.renewPassword" type="password" placeholder="请确认新密码" style='width: 300px;'></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" icon='edit' @click="commit">确认修改</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "resetPassword",
    data(){
      return{
        formItem: {
          account: this.$store.getters.loginName,
          oldPassword: '',
          newPassword: '',
          renewPassword: ''
        }
      }
    },
    methods:{
      commit(){
        if( !this.formItem.newPassword.trim() || !this.formItem.renewPassword.trim()){
          this.$Message.error("请填写密码")
          return
        }
        if(this.formItem.newPassword.trim()!= this.formItem.renewPassword.trim()){
          this.$Message.error("两次密码不一致")
          return
        }
        this.$Modal.confirm({
          title: '修改密码',
          content: '确定修改密码？',
          onOk: () => {
            let self= this, param={
              accessToken: localStorage.getItem("ACCESSTOKEN"),
              userpassword: this.formItem.newPassword.trim()
            }
            this.axios({
              method: 'patch',
              url: '/user/useraccount/modify',
              headers: {'Content-type': 'application/json'},
              data: JSON.stringify(param)
            }).then(function (res) {
              console.log(res.data)
              if(res.data.code=='000000'){
                self.$Message.success('修改成功')
                localStorage.removeItem("ACCESSTOKEN");
                localStorage.removeItem("USERINFO");
                self.$store.commit("putUserInfo",{})
                self.$router.replace({
                  path: '/login',
                });
              }
            })
          },
          onCancel: () => {
//          this.$Message.info('Clicked cancel');
          }
        });

      }
    }
  }
</script>

<style lang="scss">
  #resetPassword {
    .ivu-form-item {
      label {
        background-color: #fbfbfb;
        border: 1px solid #e6e6e6;
        text-align: center;
        padding-right: 0;
      }
      .ivu-form-item-content {
        .ivu-input-wrapper {
          border: none;
          input {
            border-radius: 0;
          }
        }
      }
      &:nth-child(1) input{
        border: 1px dashed #dddee1;
      }
    }
  }
</style>
