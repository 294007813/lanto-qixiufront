<template>
  <div id="companyInfo">
    <sub-title title="维修企业信息管理" :link="[{name:'管理中心',to: '/center/manHome'},{name:'维修企业信息管理',to:''}]"></sub-title>
    <Table border :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  name: "companyInfo",
  data(){
    return{
      columns1: [
        {title: '企业名称', key: 'companyName'},
        {title: '许可证号', key: 'permitID', width: 200},
        {title: '经营地址', key: 'address'},
        {title: '法定代表人', key: 'legalPerson', width: 180},
        {title: '联系方式', key: 'tel', width: 180}
      ],
      data1: [
        {
          companyName: '百度',
          permitID: 151562341895,
          address: '上海市黄浦区',
          legalPerson: '哈哈',
          tel: '15033333333'
        },
      ],
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>
