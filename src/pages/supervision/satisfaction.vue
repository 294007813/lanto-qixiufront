<template>
  <div id="satisfaction">
    <sub-title title="满意度调查" :link="[{name:'公众监督',to: ''},{name:'满意度调查',to:''}]"></sub-title>
    <div class="content">
      <div class="examine">
        <ul class="zhengwu_c" id="databody" style='margin-left: 15px'>
          <li style='list-style: square;height: 30px'><a href="#/supervision/satisfaction1">2016年汽修行业服务质量顾客满意度结果公布</a></li>
        </ul>
        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "satisfaction",
    data(){
      return {
      
      }
    },
    methods: {
    
    }
  }
</script>

<style lang="scss" scoped>
  #satisfaction {
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
