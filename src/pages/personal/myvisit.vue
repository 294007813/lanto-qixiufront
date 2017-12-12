<template>
  <div>
    <sub-title title="我的上门服务"
               :link="[{name:'车主中心',to: '/center/eRecordList'},{name:'我的上门服务',to:''}]"></sub-title>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  export default {
    name: "myquestion",
    data(){
      return{
        columns1:[
          {title: '服务内容', key: 'qu'},
          {title: '服务时间', key: 'time'},
          {title: '服务状态', key: 'state'},
        ],
        data1:[]
      }
    },

  }
</script>

<style scoped>

</style>

