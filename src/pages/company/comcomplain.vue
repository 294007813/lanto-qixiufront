<template>
<div>
  <sub-title title="投诉管理"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'投诉管理',to:''}]"></sub-title>
  <Table :columns="columns1" :data="data1"></Table>
</div>

</template>

<script>
	export default {
		name: "comvisit",
    data(){
      return{
        columns1:[
          {title: '投诉人', key: 'name'},
          {title: '联系方式', key: 'phone'},
          {title: '投诉原因', key: 'reason'},
          {title: '投诉状态', key: 'state'},
          {title: '投诉时间', key: 'time'},
        ],
        data1:[]
      }
    },
	}
</script>

<style scoped>

</style>
