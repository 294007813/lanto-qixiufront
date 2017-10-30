<template>
  <div>
    <l-header></l-header>
      <router-view/>
    <l-footer></l-footer>
  </div>
</template>

<script>
  import LHeader from './Header.vue'
  import LFooter from './Footer.vue'

  export default {
    name: 'bone',
    components: {
      LHeader,
      LFooter
    }
  }
</script>

<style>

</style>
