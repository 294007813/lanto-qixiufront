<template>
  <div id="baseInfo">
    <sub-title title="基本信息" :link="[{name:'管理中心',to: '/center/manHome'},{name:'基本信息',to:''}]"></sub-title>
    <Form :model="formItem" :label-width="100" style='margin-left: 15px; height: 220px'>
      <FormItem label="用户账户" style='height: 32px; margin: 15px 0;'>
        <Input readonly v-model="formItem.account" style='width: 300px;'></Input>
      </FormItem>
      <FormItem label="用户昵称" style='height: 32px; margin-bottom: 15px'>
        <Input v-model="formItem.userName" placeholder="请输入昵称" style='width: 300px; '></Input>
      </FormItem>
      <FormItem label="电子邮箱" style='height: 32px; margin-bottom: 15px'>
        <Input v-model="formItem.email" prop='mail' placeholder="请输入电子邮箱" style='width: 300px;'></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" icon='edit'>确认修改</Button>
      </FormItem>
    </Form>
    <div class='line'>
      <div class='uploadHead'>上传头像</div>
    </div>
    <Upload :action="hehe"
            :format="['jpg','png','jpeg','bmp']"
            :on-success="upsuccess"
            ref="upload">
      <img src="../../assets/leftmenu/defaultUser.jpg" alt="" style='border-radius: 50%; width: 200px; height: 200px; margin: 30px 30px 0 30px'>
    </Upload>
    <div class='reminder'>图片文件小于1M(建议使用高质量图片)</div>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return{
      formItem: {
        account: '15033333333',
        userName: '',
        email: ''
      }
    }
  },
  methods:{
    upsuccess(){
    
    }
  }
}
</script>

<style lang="scss">
  #baseInfo {
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
    >.line {
      border-top: 1px solid #e2e2e2;
      position: relative;
      .uploadHead {
        width: 85px;
        height: 22px;
        position: absolute;
        top: 0;
        left: 60px;
        transform: translateY(-50%);
        background-color: #fff;
        text-align: center;
        font-size: 16px;
      }
    }
    >.reminder {
      height: 50px;
      border-left: 5px solid #35a9ff;
      background-color: #f2f2f2;
      margin-bottom: 80px;
      line-height: 50px;
      text-indent: 15px;
    }
  }
</style>
