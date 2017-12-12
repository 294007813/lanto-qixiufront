<template>
  <div id="satisfaction1">
    <sub-title title="满意度调查" :link="[{name:'公众监督',to: ''},{name:'满意度调查',to:''}]"></sub-title>
    <div class="content">
      <div class="examine">
        <p style="line-height: 2em;">
          <span style="font-family: 微软雅黑;"><br></span>
        </p>
        <p style="line-height: 2em; text-align: center;">
          <span style="font-family: 微软雅黑; font-size: 24px;">2016年汽修行业服务质量顾客满意度结果公布</span>
        </p>
        <p style="line-height: 2em;">
          <span style="font-family: 微软雅黑;"><br></span>
        </p>
        <p style="line-height: 2em; text-indent: 2em;">
          <span style="font-family: 微软雅黑;font-size: 16px;">市运输管理处委托第三方机构对汽车维修行业的服务质量顾客满意度开展测评，在双方的共同努力和密切配合下，2016年测评工作基本完成。2016年上海市汽车维修行业的服务质量顾客满意度为85.26，处于较满意状态，较上一年的84.64相比稍有上升。</span>
        </p>
        <p style="line-height: 2em; text-indent: 2em;">
          <span style="font-family: 微软雅黑;font-size: 16px;">测评结果显示，2016年度上海市汽车维修服务质量各大类指标的满意度中，“规范经营”方面的满意度明显处于较高水平；而“维修质量”和“环境整洁”的满意度相对较低。与2015年比较，各项大类指标中，除了“规范经营”的满意度较2015年出现了一定幅度的下降，其他各大类指标的满意度均有不同幅度的上升。</span>
        </p>
        <p style="line-height: 2em; text-indent: 2em;">
          <span style="font-family: 微软雅黑;font-size: 16px;">通过测评，不仅可以帮助发现维修企业存在的不足之处，不断地完善和提高维修企业管理水平。同时也有利于各级道路运输管理机构明确下一步的工作重点和监管方向，进一步提升行业客户满意度。</span>
        </p>
        <p style="line-height: 2em;">
          <span style="font-family: 微软雅黑;">&nbsp;</span>
        </p>
        <p>
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "satisfaction1",
    data(){
      return {
      
      }
    },
    methods: {
    
    }
  }
</script>

<style lang="scss" scoped>
  #satisfaction1 {
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
