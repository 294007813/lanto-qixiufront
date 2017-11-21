<template>
  <div>
    <l-header></l-header>
    <transition name="fade">
      <router-view/>
    </transition>
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
