<template>
<div id="company-contact-count">
  <sub-title title="首页" :link="[{name:'管理中心',to: '/center/manHome'},{name:'区域对接情况',to:''}]"></sub-title>
  <Select @on-change="selectChange" v-model="choosedArea" style="width:300px">
    <Option v-for="(item, key) in areas" :value="item.areakey" :key="key">{{ item.areaname }}</Option>
  </Select>
  <Table border :columns="columns" :data="tableData"></Table>
  <Page :total="total" show-elevator show-total @on-change="pageChange"></Page>
</div>
</template>

<script>
export default {
  name: "companyContactCount",
  data(){
    return{
      areas: [
        {areakey: '310000', areaname: '市辖区'},
        {areakey: '310115', areaname: '浦东新区'},
        {areakey: '310112', areaname: '闵行区'},
        {areakey: '310113', areaname: '宝山区'},
        {areakey: '310116', areaname: '金山区'},
        {areakey: '310114', areaname: '嘉定区'},
        {areakey: '310118', areaname: '青浦区'},
        {areakey: '310230', areaname: '崇明区'},
        {areakey: '310117', areaname: '松江区'},
        {areakey: '310120', areaname: '奉贤区'},
      ],
      choosedArea: '',
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
      limit: 10,
      page: 1,
      total: 0
    }
  },
  created(){
    this.choosedArea= this.$route.query.areaName
    for(let i in this.areas){
      if(this.areas[i].areaname== this.$route.query.areaName){
        this.choosedArea= this.areas[i].areakey
      }
    }

    this.getData()
  },
  methods:{
    getData(){
       // 获取区域对接企业数量
      let self=this, param={
        accessToken: localStorage.getItem("ACCESSTOKEN"),
        areakey: this.choosedArea,
        limit: this.limit,
        page: this.page
      }
      this.axios({
        method: 'post',
        url: '/statistics/admin/areaCompany',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify(param)
      }).then(res=>{
        if(res.data.code=='000000'){
          let msg = res.data.data.content
          console.log(msg)
          self.total= res.data.data.totalElements
          self.tableData=[]
          for(let i = 0; i < msg.length; i++){
            self.tableData.push({
              number: i+1,
              todayCount: msg[i].currentButt,
              totalCount: msg[i].totalButt,
              companyName: msg[i].companyname,
            })
          }
        }else{
          self.tableData=[]
          this.total=0
        }
      })

    },
    selectChange(){
      this.getData()
    },
    pageChange(page){
      console.log(page)
      this.page= page
      this.getData()
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
