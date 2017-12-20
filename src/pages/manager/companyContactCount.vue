<template>
  <div id="company-contact-count">
    <sub-title title="首页" :link="[{name:'管理中心',to: '/center/manHome'},{name:'区域对接情况',to:''}]"></sub-title>
    <Select @on-change="selectChange" v-model="choosedArea" style="width:300px">
      <Option v-for="item in areas" :value="item.areaname" :key="item.areakey">{{ item.areaname }}</Option>
    </Select>
    <Table border :columns="columns" :data="tableData"></Table>
    <Page :total="100" show-elevator show-total @on-change="pageChange"></Page>
  </div>
</template>

<script>
export default {
  name: "companyContactCount",
  data(){
    return{
      areas: [],
      areaKey: '',
      columns: [
        {
          title: '序号',
          key: 'number',
          width: 70,
          align: "center"
        },
        {
          title: '对接企业名称',
          key: 'companyName',
          align: "center"
        },
        {
          title: '今日上传维修记录数量',
          key: 'todayCount',
          width: 160,
          align: "center"
        },
        {
          title: '已上传维修记录总数量',
          key: 'totalCount',
          width: 160,
          align: "center"
        }
      ],
      tableData: [],
      choosedArea: ''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(v){
      // 获取区域
      var self=this
      this.choosedArea=this.$route.query.areaName
      var actok = localStorage.getItem("ACCESSTOKEN")
      this.axios({
        method: 'get',
        url: '/area/county/'+ actok + '/310100',
      })
        .then(res=> {
          this.areas=res.data.data
          console.log(this.areas);
          for(var i = 0; i < this.areas.length; i++){
            if(!arguments.length){
              if(this.areas[i].areaname===this.$route.query.areaName){
                this.areaKey=this.areas[i].areakey
              }
            }else{
              if(this.areas[i].areaname===v){
                this.areaKey=this.areas[i].areakey
              }
            }
          }
        })
        .then(()=>{     // 获取区域对接企业数量
          this.axios({
            method: 'get',
            url: '/statistics/admin/areaCompany/'+ actok + "/" + this.areaKey
          }).then(res=>{
            var msg = res.data.data
            console.log(msg)
            self.tableData=[]
            for(var i = 0; i < msg.length; i++){
              self.tableData.push({
                number: i+1,
                todayCount: '',
                totalCount: '',
                companyName: msg[i].companyname,
              })
            }
          })
        })
    },
    selectChange(v){
      this.getData(v)
    },
    pageChange(page){
      console.log(page)
    }
  }
}
</script>

<style lang="scss" scoped>
  #company-contact-count {
    .sub-title {
      margin-bottom: 15px;
    }
    .ivu-select-single {
      margin-bottom: 15px;
    }
    .ivu-page {
      margin: 15px;
    }
  }
</style>
