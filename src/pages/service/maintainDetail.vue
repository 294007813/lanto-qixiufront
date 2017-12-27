<template>
<div id="maintainDetail" class="my-frame">
  <sub-title title="公司详情" :link="[{name:'维修服务',to: ''},{name:'公司详情',to:''}]"></sub-title>
  <div class="content">
    <div class="above">
      <div class="img">
        <img src="../../assets/map/nopic.jpg"/>
      </div>
      <ul>
        <h1>{{comName}}</h1>
        <li>许可证号：{{comCode}}</li>
        <li>经营地址：{{comAddress}}</li>
        <li>联系电话：{{comTel}}</li>
        <li>联系人：{{comLinkName}}</li>
        <div>
          <router-link tag="a" :to="{path: '/service/visitingService'}" class="to-visit">上门服务</router-link>
          <router-link tag="a" :to="{path: '/service/reservationFix'}" class="to">预约服务</router-link>
        </div>
      </ul>
    </div>
    <div class="under">
      <h2><span>企业介绍</span></h2>
      <ul>
        <li><span>服务优势:</span><p></p></li>
        <li><span>特色服务:</span><p></p></li>
        <li><span>服务标准:</span><p></p></li>
        <li><span>服务承诺:</span><p></p></li>
        <li><span>质量控制体系:</span><p></p></li>
        <li><span>安全达标:</span><p></p></li>
        <li><span>维修救援:</span><p></p></li>
        <li><span>技术人员状况:</span><p></p></li>
        <li><span>维修设备情况:</span><p></p></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "maintain-detail",
  data(){
    return{
      comName:'',
      comCode:'',
      comAddress:'',
      comTel:'',
      comLinkName:''
    }
  },
  beforeMount(){
    let self=this
    let param={
      corpId: this.$route.query.id,
      systemToken: localStorage.getItem("SYSTEMTOKEN")
    }
    this.axios({
      method: 'post',
      url: '/maintain/corpDetail',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify(param)
    }).then(function (res) {
      console.log(res)
      let data= res.data.data
      self.comName= data.corpName
      self.comCode= data.businessNum
      self.comAddress= data.corpAdd
      // self.comTel= data.linkTel
      self.comTel='******'
      self.comLinkName= data.linkMan
    })
  }
}
</script>

<style scoped lang="scss">
.above{
  .img{
    width: 350px;
    height: 250px;
    float: left;
    img{
      width: 100%;
    }
  }
  ul{
    margin-left: 350px;
    height: 250px;
    padding: 10px;
    li{
      line-height: 30px;
      font-size: 14px;
    }
    div{
      text-align: right;
      a{
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        background-color: #1E9FFF;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        margin-left: 5px;
      }
    }
  }

}
.under{
  h2{
    height: 20px;
    font-size: 12px;
    display: inline-block;
    span{
      display: inline-block;
      width: 100px;
      height: 20px;
      background: white;
      text-align: center;
      cursor: pointer;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      line-height: 20px;
      border: 1px solid #e5eff8;
      margin-left: 10px;
      border-bottom: none;
      color: #4ba7f5;
    }
  }
  ul{
    /*width: 668px;*/
    border: 1px solid #e5eff8;
    padding: 10px;
    li{
      line-height: 30px;
      font-size: 14px;
      p{
        display: inline;
      }
    }
  }
}
</style>
