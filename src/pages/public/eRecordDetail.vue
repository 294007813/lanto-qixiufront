<template>
<div class="record-detail">
  <sub-title v-if="this.userType()==3" title="电子健康档案详情"
             :link="[{name:'管理中心',to: '/center/manHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>
  <sub-title v-if="this.userType()==2" title="电子健康档案详情"
             :link="[{name:'企业中心',to: '/center/comHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>
  <sub-title v-if="this.userType()==1" title="电子健康档案详情"
             :link="[{name:'车主中心',to: '/center/perHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>

  <div class="dblock">
    <h1 class="dtitle">维修记录</h1>
    <Form  :label-width="150"
           label-position="left"
           style="width: 500px;overflow: hidden;margin: 10px 0">
      <FormItem label="维修企业名称：">{{companyname}}</FormItem>
      <FormItem label="车牌号码：">{{vehicleplatenumber}}</FormItem>
      <FormItem label="车辆识别号VIN：">{{vin}}</FormItem>
      <FormItem label="送修日期：">{{repairdate}}</FormItem>
      <FormItem label="结算日期：">{{settledate}}</FormItem>
      <FormItem label="结算编号：">{{costlistcode}}</FormItem>
      <FormItem label="故障描述：">{{faultdescription}}</FormItem>

    </Form>
  </div>
  <div class="dblock">
    <h1 class="dtitle">维修项目</h1>
    <Table :columns="procolumns" :data="prodata" border size="small" width="601"></Table>
  </div>
  <div class="dblock">
    <h1 class="dtitle">维修配件</h1>
    <Table :columns="partcolumns" :data="partdata" border size="small" width="601"></Table>
  </div>
  <Button type="primary" @click="back" >后退</Button>
</div>
</template>

<script>
export default {
  name: "e-record-detail",
  data(){
    return{
      companyname:"",
      vehicleplatenumber:"",
      vin:"",
      repairdate:"",
      settledate:"",
      costlistcode:"",
      faultdescription:"",
      procolumns:[
        {title: '项目名称', key: 'name', width: 300},
        {title: '工时', key: 'time', width: 300},
      ],
      prodata:[],
      partcolumns:[
        {title: '配件名称', key: 'name', width: 200},
        {title: '编号', key: 'code', width: 200},
        {title: '数量', key: 'num', width: 200},
      ],
      partdata:[]
    }
  },
  beforeMount(){
    let self= this,
      param={
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        repairbasicinfoId: this.$route.query.id
      }
    this.axios({
      method: 'post',
      url: '/vehicle/carfile/queryDetail',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify(param)
    }).then(function (res) {
        console.log(res)
      let info= res.data.data.repairBasicinfo,
        project= res.data.data.repairprojectlist,
        part= res.data.data.vehiclepartslist;
        for (let name in info){
          self[name]= info[name]
        }
        for (let i in project){
          self.prodata.push({name: project[i].repairproject, time: project[i].workinghours})
        }
      for (let i in part){
        self.partdata.push({name: part[i].partsname, code: part[i].partscode, num: part[i].partsquantity})
      }
    })
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.record-detail{
  .ivu-form-item{
    margin-bottom: 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .ivu-form .ivu-form-item-label, .ivu-form-item-content{
    font-size: 16px;
  }
}

</style>
