<template>
<div>
  <sub-title title="维修数据上报查询"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'维修数据上报查询',to:''}]"></sub-title>
  <Table :columns="columns1" :data="data1"></Table>
</div>

</template>

<script>
	export default {
    data(){
      return{
        columns1:[
          {title: '上传时间', key: 'time'},
          {title: '维修单号', key: 'no'},
          {title: '维修内容', key: 'content'},
          {title: '维修车牌', key: 'card'},
        ],
        data1:[]
      }
    },
	}
</script>

<style scoped>

</style>
