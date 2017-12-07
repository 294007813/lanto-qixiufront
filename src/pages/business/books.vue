<template>
  <div id='books'>
    <sub-title title="汽车读物" :link="[{name:'在线商务',to: ''},{name:'汽车读物',to:''}]"></sub-title>
    <div class="content">
      <div class="examine">
        <img src="http://static.shanghaiqixiu.org/images/2017/10/28/pic_1511882252391.jpg" style='width: 100%;'>
    
        <img src="http://static.shanghaiqixiu.org/images/2017/10/29/pic_1511938215920.jpg">
    
        <img src="http://static.shanghaiqixiu.org/images/2017/10/29/pic_1511954706176.jpg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "books",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #books {
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
