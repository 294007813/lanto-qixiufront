<template>
  <div id='sell'>
    <sub-title title="汽车销售" :link="[{name:'在线商务',to: ''},{name:'汽车销售',to:''}]"></sub-title>
    <div class="content">
      <div class="examine" style="height: 628px;">
        <ul class="zhengwu_c" id="databody" style='margin-left: 10px'>
          <li style='list-style: square'><a href="#/business/sell1">上海永达汽车浦东销售服务有限公司介绍</a></li>
          <li style='list-style: square'><a href="#/business/sell2">上海万兴汽车实业有限公司简介</a></li>
          <li style='list-style: square'><a href="#/business/sell3">上海东昌汽车服务有限公司简介</a></li>
        </ul>
        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sell",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #sell {
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
