<template>
<div>
  <sub-title v-if="this.userType()==3" title="电子健康档案详情"
             :link="[{name:'管理中心',to: '/center/manHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>
  <sub-title v-if="this.userType()==2" title="电子健康档案详情"
             :link="[{name:'企业中心',to: '/center/comHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>
  <sub-title v-if="this.userType()==1" title="电子健康档案详情"
             :link="[{name:'车主中心',to: '/center/perHome'},
             {name:'电子健康档案',to:'/center/eRecordList'},{name:'电子健康档案详情',to:''}]"></sub-title>


</div>
</template>

<script>
export default {
  name: "e-record-detail",
  mounted(){
    console.log(this.userType())
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
