<template>
  <div id="professorDetail">
    <div class="detail_wrap clearFix">
      <div class="detail_left">
        <sub-title title="专家咨询" :link="[{name:'车大夫门诊',to: 'carDoctor'},{name:'专家咨询',to:''}]"></sub-title>
        <div class="introduce_title">专家简介</div>
        <div class="introduce_content clearFix">
          <div class="img_wrap">
            <img :src="detail.photo? detail.photo: '/static/img/defaultUser.jpg'">
            <p>专家认证</p>
          </div>
          <ul>
            <li>
              <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
              {{detail.name}}
            </li>
            <li>
              <span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</span>
              {{detail.professor}}
            </li>
            <li>
              <span>就职企业:</span>
              {{detail.empUnit}}
            </li>
            <li>
              <span>专业擅长:</span>
              {{detail.goodAt}}
            </li>
            <li>
              <span>主要荣誉:</span>
              {{detail.honor}}
            </li>
          </ul>
        </div>
        <questions></questions>
      </div>
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
  name: "professorDetail",
  data(){
    return{
      detail: {},
      content: '',
      problems: [],
      problemCategory: '',
      problemCategory2: '',
      columns: [
        {
          title: '问题',
          key: 'problem',
          width: 350
        },
        {
          title: '时间',
          key: 'date',
          align: 'center',
          width: 100
        },
        {
          title: '查看次数',
          key: 'count',
          align: 'center'
        },
        {title: '查看详情', key: 'id', align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params.row.id)
                    this.$router.push({
                      path:'',
                      query:{id: params.row.id}
                    })
                  }
                }
              }, '查看'),
            ]);
          }
        }
      ],
      tableData: []
    }
  },
  created(){
    let self=this, systok=localStorage.getItem("SYSTEMTOKEN")
    this.axios({
      method: 'get',
      url: '/cdf/questype/'+ systok,
    }).then(function (res) {
      self.problems= res.data.data
    })

    this.getDetail()

    this.getList()
  },
  watch:{
    $route:function (val){
      this.getDetail()
    }
  },
  methods: {
    submit(){
      if(!this.content.trim()){
        this.$Message.error('请输入问题')
        return
      }
      if(!this.problemCategory){
        this.$Message.error('请选择问题分类')
        return
      }
      let self=this, systok=localStorage.getItem("SYSTEMTOKEN"), acctok=localStorage.getItem("ACCESSTOKEN"),
        param={
          accessToken: acctok? acctok: systok,
          anonymity: acctok? false: true,
          content: this.content.trim(),
          questionTypeId: this.problemCategory
        }
      this.axios({
        method: 'post',
        url: '/cdf/addquestion/',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify(param)
      }).then(function (res) {
        console.log(res.data)
        if(res.data.code=='000000'){
          self.$Message.success("添加问题成功")
          self.getList()
        }
      })
    },
    getList(){
      let self=this, systok=localStorage.getItem("SYSTEMTOKEN")
      this.axios({
        method: 'get',
        url: '/cdf/queryquestionlist/'+ systok,
      }).then(function (res) {
        console.log(res.data)
        let datas= res.data.data
        self.tableData= []
        for(let i in datas){
          self.tableData.push({
            problem: datas[i].content,
            date: (new Date( datas[i].publish).toISOString().split(".")[0].split("T")[0]),
            count: datas[i].views,
            id: datas[i].questionId
          })
        }
      })
    },
    getDetail(){
      let self=this, systok=localStorage.getItem("SYSTEMTOKEN")
      this.axios({
        method: 'get',
        url: '/cdf/queryexpertdetail/'+ systok+ '/'+ self.$route.query.id,
      }).then(function (res) {
        self.detail= res.data.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  #professorDetail {
    .clearFix {
      &:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
      }
      zoom: 1;
    }
    .detail_wrap {
      width: 980px;
      margin: 0 auto;
      .detail_left {
        width: 690px;
        min-height: 800px;
        border: 1px solid #d4d4d4;
        margin: 10px 0;
        float: left;
        padding: 10px;
        .introduce_title {
          background-color: rgba(51,137,255,.4);
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
          font-weight: 600;
        }
        .introduce_content {
          padding: 15px 15px 0 15px;
          border: 1px solid #ededed;
          .img_wrap {
            width: 127px;
            text-align: center;
            float: left;
            img {
              width: 127px;
              height: 127px;
              margin-bottom: 10px;
            }
            p {
              background: url(../../assets/service/vip.png) no-repeat right center;
              width: 90px;
              margin-left: 10px;
            }
          }
          >ul{
            margin-left: 142px;
            li {
              line-height: 22px;
              margin-bottom: 5px;
              span {
                font-weight: 600;
              }

            }
          }
        }
        .problem_ask {
          border: 1px solid #d4d4d4;
          padding: 10px 10px 65px 10px;
          position: relative;
          min-height: 370px;
          p {
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            color: #4ba7f5;
            background: url(../../assets/service/case_ask.jpg) no-repeat left center;
            text-indent: 40px;
          }
          textarea {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            min-height: 200px;
            border: 1px solid #999;
            margin: 10px 0;
            padding: 10px;
            font-size: 14px;
            outline: none;
          }
          .problem_category_item {
            display: inline-block;
            border: 1px solid #e5e5e5;
            padding: 3px 6px;
            color: #999;
            background-color: #f4f4f4;
            margin-right: 5px;
            &:hover {
              cursor: pointer;
            }
          }
          .active {
            background-color: #1e9fff;
            border: 1px solid #1e9fff;
            color: #fff;
          }
        }
        .problem_jijin {
          min-height: 240px;
          border: 1px solid #d4d4d4;
          padding: 10px;
        }
      }
    }
  }
</style>
