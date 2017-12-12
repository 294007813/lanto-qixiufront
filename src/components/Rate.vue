<template>
<div class="rate">
  <div class="title">评价企业：<span>【{{comname}}】</span></div>
  <ul>
    <li>
      <div class="left">履约情况</div>
      <el-rate v-model="promise" show-text></el-rate>
    </li>
    <li>
      <div class="left">服务态度</div>
      <el-rate v-model="serviceQuality" show-text></el-rate>
    </li>
    <li>
      <div class="left">维修质量</div>
      <el-rate v-model="repairQuality" show-text></el-rate>
    </li>
    <li>
      <div class="left">维修速度</div>
      <el-rate v-model="repairSpeed" show-text></el-rate>
    </li>
    <li>
      <div class="left">维修价格</div>
      <el-rate v-model="repairPrice" show-text></el-rate>
    </li>
  </ul>
  <div class="title">综合评价</div>
  <Input v-model="text" placeholder="企业的服务还满意吗?点评一下吧,您的意见很重要哦~"
         type="textarea" :rows="6" :autosize="{ minRows: 6, maxRows: 6 }"></Input>
  <Button type="primary" class="submit" @click="submit">提交</Button>
</div>
</template>

<script>
	export default {
	  props:['comname','comid'],
		name: "rate",
    data(){
		  return{
        promise: 3,           // 履约情况
        serviceQuality: 3,    // 服务态度
        repairQuality: 3,     // 维修质量
        repairSpeed: 3,       // 维修速度
        repairPrice: 3,       // 维修价格
        text: '',
      }
    },
    methods:{
      submit(){
        let self= this
        if(!this.text.trim()){
          this.$Message.error('请输入综合评价')
          return
        }
        let param = {
          accessToken: localStorage.getItem('ACCESSTOKEN'), // 用户票据
          companyId: this.comid,              // 企业ID
          performance: this.promise*10,                        // 履约情况
          attitude: this.serviceQuality*10,                    // 服务质量
          quality: this.repairQuality*10,                      // 维修质量
          speed: this.repairSpeed*10,                          // 维修速度
          price: this.repairPrice*10,                          // 维修价格
          jsoninfo: {
            content: this.text,                          // 评论文字
            images: []                               // 照片路径
          },
          composite: Math.round(this.promise*6+this.serviceQuality+this.repairQuality*2+this.repairSpeed*0.5+this.repairPrice*0.5) //  综合评分
        }
        this.axios({
          method: 'post',
          url: '/company/review/submit',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
          .then(res => {
            console.log(res);
            if(res.data.code=='120513'){
              self.$Message.error('提交评论失败,您还未绑定车辆')
            }else if(res.data.code=='120509'){
              self.$Message.error('提交评论失败,评论内容过长')
            }else if(res.data.code=='120500'){
              self.$Message.success({content:'提交评论成功', duration:5})
              self.$emit('success')
            }else{
              self.$Message.error(res.data.status)

            }
          })
      }
    }
	}
</script>

<style scoped lang="scss">
.rate{
  width: 100%;
  .title{
    background: #f8f8f8;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    span{
      color: #1E9FFF;
    }
  }
  ul{
    padding: 10px 0;
    li{
      padding: 4px 15px;
      text-align: center;
      .left{
        float: left;
        width: 150px;
        font-size: 14px;
        text-align: right;
      }
    }
  }
  .submit{
    float: right;
    margin: 10px;
  }
}
</style>
