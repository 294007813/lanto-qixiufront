<template>
<div id="carDoctor">
  <div class="wrap clearFix">
    <div class="problem_left">
      <sub-title title="问题详情" :link="[{name:'公共服务',to: ''},{name:'车大夫门诊',to:'/service/carDoctor'},{name:'问题详情',to:''}]"></sub-title>
      <div class="que">
        <div class="img"><img :src="info.head?info.head: '/static/img/head.jpg'"/></div>
        <div class="question">
          <ul class="info"><li>{{info.username}}</li><li>浏览 {{info.views}} 次</li><li>{{info.publish | calcDate}}</li></ul>
          <div class="content">{{info.content}}</div>
        </div>
      </div>
      <div class="answer">
        <p>回答问题</p>
        <textarea v-model="answerContent"></textarea>
        <Button type="primary" size="large" @click="answer" style="position: absolute; right: 10px; bottom: 10px;">回答问题</Button>
      </div>
      <div class="other">
        <p>其他回答</p>
        <ul>
          <li v-for="(item, key) in info.questionAnswerPOS" :key="key">
            <div class="content">
              {{item.content}}
            </div>
            <div class="author">
              <img :src="item.head? item.head: '/static/img/head.jpg'"/>
              <span>{{item.name}}</span>
              <p>{{item.time | calcDate}}</p>
            </div>
          </li>
        </ul>
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
    name: "car-doctor-detail",
    data(){
      return{
        info:{},
        answerContent: ''
      }
    },
    beforeMount(){
      this.getInfo()
    },
    methods:{
      answer(){
        let self=this, param={
          accessToken: localStorage.getItem('ACCESSTOKEN'),
          content: this.answerContent.trim(),
          quesId: this.$route.query.id
        }
        if(!param.accessToken){
          this.$Message.error('请登录后再回答')
          return
        }
        if(!param.content){
          this.$Message.error('请填写内容')
          return
        }
        this.axios({
          method: 'post',
          url: '/cdf/addanswer',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(param)
        }).then(res=>{
          console.log(res)
          self.$Message.success('回答提交成功')
          self.getInfo()
        })
      },
      getInfo(){
        let self=this
        this.axios({
          method: 'get',
          url: '/cdf/queryquestiondetail/'+ this.$route.query.id+ '/'+ localStorage.getItem('SYSTEMTOKEN'),
        }).then(res=>{
          console.log(res)
          self.info= res.data.data
        })
      }
    }
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
      .que{
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
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
      .answer{
        margin-top: 10px;
        padding: 10px 10px 45px 10px;
        position: relative;
        overflow: hidden;
        p{height: 35px;
          line-height: 35px;
          font-size: 18px;
          color: #4ba7f5;
          background: url(../../assets/index/case_answer.jpg) no-repeat left center;
          text-indent: 40px;
        }
        textarea{
          /*width: 100%;*/
          max-width: 100%;
          min-width: 100%;
          min-height: 200px;
          border: 1px solid #999;
          margin: 10px 0;
          padding: 10px;
          font-size: 14px;
          outline: none;
        }
      }
      .other{
        border-top: 1px solid #e8ecee;
        margin-top: 10px;
        padding: 10px;
        position: relative;
        overflow: hidden;
        >p{height: 35px;
          line-height: 35px;
          font-size: 18px;
          color: #4ba7f5;
          background: url(../../assets/index/case_answer.jpg) no-repeat left center;
          text-indent: 40px;
        }
        ul{
          li{
            border-bottom: 1px dotted #e9e9e9;
            padding: 24px 0 20px;
            .content{
              min-height: 100px;
              border: 1px solid #ededed;
              padding: 10px;
              border-radius: 5px;
              font-size: 14px;
            }
            .author{
              margin-top: 10px;
              height: 40px;
              img{
                width: 40px;
                height: 40px;
                float: left;
                margin-right: 10px;
              }
              span{
                line-height: 40px;
              }
              p{
                float: right;
                line-height: 40px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
