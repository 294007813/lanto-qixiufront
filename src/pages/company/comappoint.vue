<template>
  <div>
    <sub-title title="预约管理"
               :link="[{name:'企业中心',to: '/center/comHome'},{name:'预约管理',to:''}]"></sub-title>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
	export default {
		name: "comvisit",
    data(){
      return{
        columns1:[
          {title: '预约时间', key: 'time'},
          {title: '预约联系人', key: 'name'},
          {title: '联系方式', key: 'phone'},
          {title: '预约内容', key: 'content'},
          {title: '预约状态', key: 'state'},
        ],
        data1:[]
      }
    },
	}
</script>

<style scoped>

</style>
