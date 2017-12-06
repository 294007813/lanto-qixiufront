<template>
<div id="notes">
  <sub-title v-if="userType()==3" title="通知管理"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="通知管理"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="通知管理"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'通知管理',to:''}]"></sub-title>

  <div v-if="userType()==3" class="send_notes_wrap">
    <div class="dblock">
      <h1 class="dtitle">我发送的通知</h1>
    </div>
    <template>
      <Table border :columns="columns1" :data="data1"></Table>
    </template>
  </div>
  <div class="dblock">
    <h1 class="dtitle">我收到的通知</h1>
  </div>
  <template>
    <Table border :columns="columns2" :data="data2"></Table>
  </template>
</div>
</template>

<script>
	export default {
		name: "notes",
    data(){
		  return{
        columns1: [
          {title: '通知标题', key: 'title', align: 'center',},
          {title: '通知内容', key: 'content', align: 'center',},
          {title: '通知日期', key: 'date', align: 'center',}
        ],
        data1: [],
        columns2: [
          {title: '通知标题', key: 'title', align: 'center',},
          {title: '通知内容', key: 'content', align: 'center'},
          {title: '通知发送人', key: 'sendMan', align: 'center'},
          {title: '通知日期', key: 'date', align: 'center'},
          {title: '是否已读', key: 'isReaded', align: 'center', className: 'readed'}
        ],
        data2: []
      }
    },
    methods:{
      userType(){
        return this.$store.getters.userType
      },
    }
	}
</script>

<style scoped lang='scss'>

</style>

<style lang='scss'>
  #notes {
    .dblock {
      margin-bottom: 10px;
    }
    .ivu-table-wrapper .ivu-table-body .readed {
      color: forestgreen;
    }
    .ivu-table-wrapper .ivu-table-body .unReaded {
      color: red;
    }
  }
</style>
