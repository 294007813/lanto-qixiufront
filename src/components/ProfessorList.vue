<template>
  <div id="professors_list">
    <div class="title clearFix">
      <p>问答专家团</p>
      <a href="#/association/article?id=24&articleId=157">更多>></a>
    </div>
    <div class="professors-wrap">
      <ul>
        <li v-for="(item, key) in list" :key="key">
          <router-link tag="a" :to="{path: '/service/ProfessorDetail', query:{id: item.ownerId}}">
            <img :src="item.photo?item.photo: '/static/img/defaultUser.jpg'" width=70 height=70>
            <div class="professor_r">
              <a class="name">{{item.name}}<span></span></a>
              <p>{{item.professor}}</p>
              <span class="askForHe">向TA提问</span>
            </div>
          </router-link>
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
      list:[]
    }
  },
  beforeMount(){
    let self=this;
    this.axios({
      method: 'get',
      url: '/cdf/queryexpertlist/'+ localStorage.getItem('SYSTEMTOKEN')
    }).then(res =>{
      console.log(res.data)
      self.list= res.data.data
    })
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
          overflow: hidden;
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
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
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

