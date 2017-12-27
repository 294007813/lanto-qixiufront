<template>
  <div id="carDoctor">
    <div class="wrap clearFix">
      <div class="problem_left">
        <sub-title title="车大夫门诊" :link="[{name:'公共服务',to: ''},{name:'车大夫门诊',to:''}]"></sub-title>
        <questions></questions>
      </div>

      <!-- 专家列表 -->
      <professor-list></professor-list>
    </div>
  </div>
</template>

<script>
  import ProfessorList from "../../components/ProfessorList";
  import Questions from "./Questions";

  export default {
    components: {
      Questions,
      ProfessorList},
    name: "carDoctor",
  }
</script>

<style lang="scss" scoped>
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
      }
    }
  }
</style>

