<template>
  <div id='study'>
    <sub-title title="学驾推荐" :link="[{name:'在线商务',to: ''},{name:'学驾推荐',to:''}]"></sub-title>
    <div class="content">
      <div class="examine">
        <ul class="zhengwu_c" id="databody" style='margin-left: 15px'>
          <li style='list-style: square;height: 30px'><a href="#/business/study1">上海云之驾科技股份有限公司</a></li>
          <li style='list-style: square;height: 30px'><a href="#/business/study2">安亭驾校简介</a></li>
          <li style='list-style: square;height: 30px'><a href="#/business/study3">翔茂驾校风采</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "study",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #study {
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
    }
  }
</style>
