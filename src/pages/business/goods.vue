<template>
  <div id='goods'>
    <sub-title title="汽车用品" :link="[{name:'在线商务',to: ''},{name:'汽车用品',to:''}]"></sub-title>
    <div class="content">
      <div class="examine">
        <img src="http://static.shanghaiqixiu.org/images/2017/10/30/pic_1512010971047.jpg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #goods {
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
      li:before {
      
      }
    }
  }
</style>
