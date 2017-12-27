<template>
<div id="carDoctor">
  <div class="wrap clearFix">
    <div class="problem_left">
      <sub-title title="问题详情" :link="[{name:'公共服务',to: ''},{name:'车大夫门诊',to:''},{name:'问题详情',to:''}]"></sub-title>
      <div class="block">
        <div class="img"><img src="../../assets/service/head.jpg"/></div>
        <div class="question">
          <ul class="info"><li>lys</li><li>浏览 116 次</li><li>2017-06-23 10:06:32.0</li></ul>
          <div class="content">问题：我的汽车排气管冒黑烟，请问怎么回事？该怎么处理？</div>
        </div>
      </div>
    </div>
    <professor-list></professor-list>
  </div>
</div>
</template>

<script>
	import ProfessorList from "../../components/ProfessorList";

  export default {
    components: {ProfessorList},
    name: "car-doctor-detail"
	}
</script>

<style scoped lang="scss">
#carDoctor {
  .clearFix {
    &:after {
      content: '';
      clear: both;
      display: block;
      height: 0;
    }
    zoom: 1;
  }
  .wrap {
    width: 980px;
    margin: 0 auto;
    .problem_left {
      width: 690px;
      float: left;
      border: 1px solid #d4d4d4;
      padding: 10px;
      margin-top: 10px;
      .block{
        margin: 10px;
        position: relative;
        overflow: hidden;
        .img{
          width: 90px;
          height: 100px;
          position: absolute;
          img{ width: 100%}
        }
        .question{
          margin-left: 100px;
          .info{
            overflow: hidden;
            margin-bottom: 5px;
            li{
              width: 33%;
              float: left;
            }
          }
          .content{
            min-height: 100px;
            border: 1px solid #ededed;
            padding: 5px;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
