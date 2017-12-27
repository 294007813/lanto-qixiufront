<template>
  <div id="carDoctor">
    <div class="wrap clearFix">
      <div class="problem_left">
        <sub-title title="车大夫门诊" :link="[{name:'公共服务',to: ''},{name:'车大夫门诊',to:''}]"></sub-title>
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
        <div class="sub_title clearFix">
          <p class="">问题集锦</p>
          <a href="#/service/questionSearch">查看更多>></a>
        </div>
        <div class="problem_jijin">
          <Table border :columns="columns" :data="tableData"></Table>
        </div>
      </div>
      <!-- 专家列表 -->
      <professor-list></professor-list>
    </div>
  </div>
</template>

<script>
  import ProfessorList from "../../components/ProfessorList";

  export default {
    components: {ProfessorList},
    name: "carDoctor",
    data(){
      return {
        content: '',
        problems: [],
        problemCategory: '',
        problemCategory2: '',
        columns: [
          {
            title: '问题',
            key: 'problem',
            render: (h, params) => {
              return h('router-link',{
                props: {
                  tag: 'a',
                  to: {path: '/service/carDoctorDetail', query: {id: params.row.id}}
                }
              }, params.row.problem)
            }
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
            align: 'center',
            width: 80
          },
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
        .problem_ask {
          border: 1px solid #d4d4d4;
          margin-top: 10px;
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
        .sub_title {
          margin-top: 20px;
          padding: 10px;
          border-bottom: 2px solid #4ba7f5;
          p {
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            color: #4ba7f5;
            background: url(../../assets/service/W.png) no-repeat left center;
            text-indent: 20px;
            float: left;
          }
          a {
            float: right;
            margin-top: 10px;
          }
        }
        .problem_jijin {
          min-height: 261px;
          border: 1px solid #d4d4d4;
          padding: 10px;
          margin-top: 10px;
        }
      }
      .problem_right {
        width: 280px;
        float: right;
        height: 800px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #d4d4d4;
        overflow: hidden;
        .title {
          border-bottom: 1px solid #d4d4d4;
          p {
            float: left;
            font-size: 16px;
            margin: 5px 0;
            padding-left: 28px;
            background: url(../../assets/service/hn.png) no-repeat left center;
          }
          a {
            float: right;
            margin: 5px 0;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  #carDoctor .problem_jijin .ivu-table-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
