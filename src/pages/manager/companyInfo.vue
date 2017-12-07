<template>
  <div id="companyInfo">
    <sub-title title="维修企业信息管理" :link="[{name:'管理中心',to: '/center/manHome'},{name:'维修企业信息管理',to:''}]"></sub-title>
    <Table border :columns="columns1" :data="data1" ></Table>
  </div>
</template>

<script>
export default {
  name: "companyInfo",
  data(){
    return{
      columns1: [
        {title: '企业名称', key: 'companyName',width: 200},
        {title: '许可证号', key: 'permitID', width: 200},
        {title: '经营地址', key: 'address'},
        {title: '法定代表人', key: 'legalPerson', },
        {title: '联系方式', key: 'tel', }
      ],
      data1: [],
    }
  },
  beforeMount(){
    let self= this
    this.axios({
      method: 'get',
      url: '/company/repaircompany/querydetail/'+ localStorage.getItem('ACCESSTOKEN')
    }).then(function (res) {
      console.log(res)
      let datas= res.data.data
      for (let i in datas){
        self.data1.push({
          companyName: datas[i].companyname,
          permitID: datas[i].companyroadtransportationlicense
        })
      }
    })
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>
