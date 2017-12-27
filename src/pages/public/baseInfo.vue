<template>
  <div id="baseInfo">
    <sub-title title="基本信息" :link="[{name: titleName(),to: ''},{name:'基本信息',to:''}]"></sub-title>
    <Form :model="formItem" :label-width="100" style='margin-left: 15px; height: 220px'>
      <FormItem label="用户账户" style='height: 32px; margin: 15px 0;'>
        <Input readonly v-model="formItem.account" style='width: 300px;'></Input>
      </FormItem>
      <FormItem label="用户昵称" style='height: 32px; margin-bottom: 15px'>
        <Input v-model="formItem.nickName" placeholder="请输入昵称" style='width: 300px; '></Input>
      </FormItem>
      <!--<FormItem label="电子邮箱" style='height: 32px; margin-bottom: 15px'>-->
        <!--<Input v-model="formItem.email" prop='mail' placeholder="请输入电子邮箱" style='width: 300px;'></Input>-->
      <!--</FormItem>-->
      <FormItem>
        <Button type="primary" icon='edit' @click="edit">确认修改</Button>
      </FormItem>
    </Form>
    <div class='line'>
      <div class='uploadHead'>上传头像</div>
    </div>
    <Upload :action="this.axios.defaults.baseURL+'/image/add/'+ acctok"
            :show-upload-list="false"
            :format="['jpg','png','jpeg','bmp']"
            :on-success="upsuccess"
            ref="upload">
      <img :src="url" alt="" style='border-radius: 50%; width: 200px; height: 200px; margin: 30px 30px 0 30px'>
    </Upload>
    <div class='reminder'>请上传小于2M图片，头像将显示在车大夫、维修服务等板块</div>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return{
      formItem: {
        account: this.$store.getters.loginName,
        nickName: this.$store.getters.nickName? this.$store.getters.nickName: '',
        email: ''
      },
      url: this.$store.getters.userHead? this.$store.getters.userHead: '/static/img/defaultUser.jpg',
      acctok: localStorage.getItem('ACCESSTOKEN')
    }
  },
  beforeMount(){

  },
  methods:{
    titleName(){
      // console.log(this.userType())
      let name;
      switch (this.userType()){
        case 1: name= '车主中心'; break;
        case 2: name= '企业中心'; break;
        case 3: name= '管理中心'; break;
      }
      return name
    },
    edit(){
      let self= this
      if(!self.formItem.nickName.trim()) return
      this.axios({
        method: 'get',
        url: '/user/useraccount/update/'+ self.acctok+ '/'+ self.formItem.nickName.trim(),
      }).then(function (res) {
        console.log(res.data)
        if(res.data.code=='000000'){
          self.$Message.success('修改成功')
          self.upInfo()
        }
      })
    },
    upsuccess(res){
      // console.log(res)
      if(res.code='000000'){
        let self= this, param={
          accessToken: this.acctok,
          url: res.data.picPath
        }
        this.axios({
          method: 'post',
          url: '/user/useraccount/upload',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(param)
        }).then(function (res) {
          // console.log(res.data)
          if(res.data.code=='000000'){
            self.$Message.success('头像上传成功')
            self.upInfo()
          }else{
            self.$Message.error('上传失败，请重试')
          }
        })
      }
    },
    upInfo(){
      let self= this
      this.axios({
        method: 'get',
        url: '/user/useraccount/userinfo/'+ self.acctok,
      }).then(function (res) {
        console.log(res.data)
        if(res.data.code=='000000'){
          localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
          self.$store.commit("putUserInfo",res.data.data)
          self.url= self.$store.getters.userHead
        }
      })
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
