<template>
  <div>
    <sub-title title="我的咨询" :link="[{name:'车主中心',to: '/center/eRecordList'},{name:'我的咨询',to:''}]"></sub-title>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  export default {
    name: "myquestion",
    data(){
      return{
        columns1:[
          {title: '问题', key: 'qu'},
          {title: '咨询专家', key: 'to'},
          {title: '提问时间', key: 'time'},
          {title: '问题状态', key: 'state'},
        ],
        data1:[]
      }
    },

  }
</script>

<style scoped>

</style>
