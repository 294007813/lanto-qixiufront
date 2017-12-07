<template>
  <div id='equipment'>
    <sub-title title="汽保设备" :link="[{name:'在线商务',to: ''},{name:'汽保设备',to:''}]"></sub-title>
    <div class="content">
      <img src="http://static.shanghaiqixiu.org/images/2017/10/29/pic_1511959923162.jpg">
      <img src="http://static.shanghaiqixiu.org/images/2017/10/29/pic_1511959897722.jpg">
    </div>
  </div>
</template>

<script>
export default {
  name: "equipment",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #equipment {
    width: 980px;
    min-height: 700px;
    margin: 10px auto;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;
    .content {
      border: 1px solid #ddd;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      min-height: 620px;
      img {
        width: 100%;
      }
    }
  }
</style>
