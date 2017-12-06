<template>
  <div id='complain'>
    <sub-title title="质量服务投诉" :link="[{name:'管理中心',to: '/center/manHome'},{name:'质量服务投诉',to:''}]"></sub-title>
    <template>
      <Table border :columns="columns1" :data="data1"></Table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'complain',
  data(){
    return {
      columns1: [
        {
          title: '投诉人',
          key: 'man'
        },
        {
          title: '投诉人联系方式',
          key: 'tel'
        },
        {
          title: '被投诉企业名',
          key: 'companyName'
        },
        {
          title: '企业地址',
          key: 'companyAddress'
        }
      ],
      data1: [
        {
          man: '张三',
          tel: 15000000000,
          companyName: '百度',
          companyAddress: '上海市浦东新区'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped></style>
