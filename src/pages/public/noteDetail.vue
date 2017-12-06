<template>
<div>
  <sub-title v-if="userType()==3" title="通知管理"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="通知管理"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="通知管理"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'通知管理',to:''}]"></sub-title>
</div>
</template>

<script>
	export default {
		name: "note-detail"
	}
</script>

<style scoped>

</style>
