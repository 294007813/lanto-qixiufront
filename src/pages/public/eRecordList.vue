<template>
<div>
  <sub-title v-if="userType()==3" title="首页"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="首页"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="首页"
             :link="[{name:'个人中心',to: '/center/perHome'},{name:'电子健康档案',to:''}]"></sub-title>
  
</div>
</template>

<script>
export default {
  name: "e-record-list",
  methods:{
    userType(){
      return this.$store.getters.userType
    },
  },
}
</script>

<style scoped>

</style>
