<template>
  <div id="professorDetail">
    <div class="detail_wrap clearFix">
      <div class="detail_left">
        <sub-title title="专家咨询" :link="[{name:'车大夫门诊',to: 'carDoctor'},{name:'专家咨询',to:''}]"></sub-title>
        <div class="introduce_title">专家简介</div>
        <div class="introduce_content clearFix">
          <div class="img_wrap">
            <img src="http://static.shanghaiqixiu.org/images/2017/11/7/pic_1512642706078.jpg" alt="">
            <p>专家认证</p>
          </div>
          <ul>
            <li>
              <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
              洪永楠
            </li>
            <li>
              <span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</span>
              高级技师 注册工程师
            </li>
            <li>
              <span>就职企业:</span>
              上海吴安综合服务中心
            </li>
            <li>
              <span>专业擅长:</span>
              全国交通技术能手、第七届上海市杰出技术能手。 “洪永楠上海市技能大师工作室”上海市人力资源和社会保障局命名 上海市技师协会汽车修理专业委员会副主任、上海市技师协会理事、上海市职业技能鉴定中心汽车维修专业考评组组长、上海市汽车维修行业协会专家委员会组长、上海市高职高专院校汽车类专业教学指导委员会副主任、上海市消保委汽车专业办公室专业顾问、上海市职业技能鉴定研发工作咨询专家、上海市政府采购评审专家、全国机动车检测维修专业技术人员职业水平实际操作考官、上海大众汽车专家级技术经理认证考官、上海市交通运输企业安全生产标准化考评员、上海市交通委员会安全生产专家、上海市闵行区职业技能培训“助力导师团”导师、上海吴安综合服务中心汽修厂技术经理、上海开放大学汽车故障诊断课程特聘主持教师、上海电视台、第一财经广播FM97.7和上海交通广播105.7汽车类节目特邀嘉宾
            </li>
            <li>
              <span>主要荣誉:</span>
              上海市一类大赛和上海市教委星光杯大赛裁判、裁判长；上海市一类大赛命题专家、上海市教委星光杯大赛命题专家、全国职业院校技能大赛裁判、全国职业院校技能大赛上海选拔赛裁判长、交通部全国交通运输行业职业技能竞赛裁判、第43届、第44届世界技能大赛上海市选拔赛命题专家、裁判：主编汽车维修工“1+X ”职业技术中级职业资格培训教材 中国劳动和社会保障部出版社 发明专利号：201010101303.4 “一种机动车坡道起停辅助安全系统”和 ZL201320126430.9 “刹车油更换机”等。
            </li>
          </ul>
        </div>
        <div class="introduce_title">我要咨询</div>
        <div class="problem_ask clearFix">
          <p>问题咨询</p>
          <textarea name="" id="" v-model="content"></textarea>
          <span style="margin-right: 10px;">选择问题分类:</span>
          <RadioGroup v-model="problemCategory" type="button" size="small">
            <Radio v-for="(item, index) in problems" :key="index" :label="item.dictId">{{item.value}}</Radio>
          </RadioGroup>
          <div class="problem_select" style="float: right;">
            <span style="margin-right: 10px">问题类别:</span>
            <Select v-model="problemCategory2" style="width:120px">
              <Option :value="'车辆故障诊断'"></Option>
              <Option :value="'车辆维修指导'"></Option>
            </Select>
          </div>
          <Button type="primary" size="large" @click="submit" style="position: absolute; right: 10px; bottom: 10px;">提交问题</Button>
        </div>
        <div class="introduce_title">咨询问答</div>
        <div class="problem_jijin">
          <Table border :columns="columns" :data="tableData"></Table>
        </div>
      </div>
      <Professor-list></Professor-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "professorDetail",
  data(){
    return{
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
    
    this.getList()
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
