<template>
<div class="maintain">
  <keep-alive>
  <my-map type="maintain" :tolimit="6"></my-map>
  </keep-alive>
</div>
</template>

<script>
import myMap from '../../components/Map.vue'
export default {
  name: "maintain",
  components: {
    myMap
  }
}
</script>

<style scoped>
.maintain{
  text-align: center;
  padding: 10px;
}
</style>
