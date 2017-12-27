<template>
  <div id="professors_list">
    <div class="title clearFix">
      <p>问答专家团</p>
      <a href="#/association/article?id=24&articleId=157">更多>></a>
    </div>
    <div class="professors-wrap">
      <ul>
        <li>
          <a href="#/service/ProfessorDetail">
            <img src="http://static.shanghaiqixiu.org/images/2017/11/7/pic_1512642706078.jpg" alt="" width=70 height=70>
            <div class="professor_r">
              <a class="name">蔡振华<span></span></a>
              <p>售后经理,注册工程师</p>
              <span class="askForHe">向TA提问</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#/service/ProfessorDetail">
            <img src="http://static.shanghaiqixiu.org/images/2017/11/7/pic_1512642706078.jpg" alt="" width=70 height=70>
            <div class="professor_r">
              <a class="name">蔡振华<span></span></a>
              <p>售后经理,注册工程师</p>
              <span class="askForHe">向TA提问</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfessorList",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  #professors_list {
    width: 280px;
    float: right;
    min-height: 800px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #d4d4d4;
    overflow: hidden;
    .clearFix {
      &:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
      }
      zoom: 1;
    }
    .title {
      border-bottom: 1px solid #d4d4d4;
      p {
        float: left;
        font-size: 16px;
        margin: 5px 0;
        padding-left: 28px;
        background: url(../assets/service/hn.png) no-repeat left center;
      }
      a {
        float: right;
        margin: 5px 0;
        font-size: 14px;
      }
    }
    .professors-wrap {
      ul li {
        border-bottom: 1px solid #d4d4d4;
        padding: 10px 0;
        .professor_r {
          float: right;
          width: 175px;
          height: 70px;
          .name {
            color: #000;
            display: block;
            background: url(../assets/service/r.jpg) no-repeat left center;
            padding-left: 18px;
            span {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url(../assets/service/vip.png) no-repeat left center;
              margin-left: 5px;
            }
          }
          p {
            color: #c2c2c2;
            line-height: 26px;
          }
          .askForHe {
            border: 1px solid #c2c2c2;
            padding: 2px 5px;
          }
        }
      }
    }
  }
</style>

