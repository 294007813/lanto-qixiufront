<template>
  <div id="complaint">
    <sub-title title="维修投诉" :link="[{name:'公众监督',to: ''},{name:'维修投诉',to:''}]"></sub-title>
    <div class="content">
      <div class="examine" style="height: 628px;">
        <div>
          <h2 style="color:#6f6b6b;font-size:16px;padding:0px 20px;margin-top:10px;"><b>投诉电话：</b></h2>
          <div style="font-size:15px;line-height:25px;margin:5px 0px 10px 0px;padding:0px 16px;">
            市民热线：<span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12345</b></span>
            城建热线：<span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12319</b></span>
            全国运输客服电话：<span style="font-style: italic;color:#03a9f4;font-size:20px;"><b>12328</b></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #complaint {
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

