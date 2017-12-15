<template>
  <div id="carDoctor">
    <div class="wrap clearFix">
      <div class="problem_left">
        <sub-title title="车大夫门诊" :link="[{name:'公共服务',to: ''},{name:'车大夫门诊',to:''}]"></sub-title>
        <div class="problem_ask clearFix">
          <p>问题咨询</p>
          <textarea name="" id="" v-model="content"></textarea>
          <span style="margin-right: 10px;">选择问题分类:</span>
          <!--<div :data-code="index+207" class="problem_category_item" @click="chooseCategory($event)"-->
               <!--v-for="(item, index) in problems" :key="index">{{ item }}-->
          <!--</div>-->
          <RadioGroup v-model="problemCategory" type="button" size="small">
            <Radio v-for="(item, index) in problems" :key="index" :label="item.dictId">{{item.value}}</Radio>
          </RadioGroup>
          <div class="problem_select" style="float: right;">
            <span style="margin-right: 10px">问题类别:</span>
            <Select v-model="problemCategory2" style="width:120px">
              <Option :value="'车辆故障诊断'">车辆故障诊断</Option>
              <Option :value="'车辆维修指导'">车辆维修指导</Option>
            </Select>
          </div>
          <Button type="primary" size="large" @click="submit" style="position: absolute; right: 10px; bottom: 10px;">提交问题</Button>
        </div>
        <div class="sub_title clearFix">
          <p class="">问题集锦</p>
          <a href="javascript:;">查看更多>></a>
        </div>
        <div class="problem_jijin">
          <Table border :columns="columns" :data="tableData"></Table>
        </div>
      </div>
      <div class="problem_right">
        <div class="title clearFix">
          <p>问答专家团</p>
          <a href="javascript:;">更多>></a>
        </div>
        <div class="professors_wrap">
          <ul>
            <li>
              <a href="/cdf/expert/6"><img src="http://static.shanghaiqixiu.org/images/2017/11/7/pic_1512642706078.jpg" alt="" width=70 height=70></a>
              <div class="professor_r">
                <a class="name" href="/cdf/expert/6">蔡振华<span></span></a>
                <p>售后经理,注册工程师</p>
                <a class="askForHe" href="/cdf/expert/6">向TA提问</a>
              </div>
            </li>
            <li>
              <a href="/cdf/expert/6"><img src="http://static.shanghaiqixiu.org/images/2017/11/7/pic_1512642706078.jpg" alt="" width=70 height=70></a>
              <div class="professor_r">
                <a class="name" href="/cdf/expert/6">蔡振华<span></span></a>
                <p>售后经理,注册工程师</p>
                <a class="askForHe" href="/cdf/expert/6">向TA提问</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "carDoctor",
    data(){
      return {
        content: '',
        problems: [],
        problemCategory: '',
        problemCategory2: '',
        problemList: ["车辆故障诊断", "车辆维修指导"],
        columns: [
          {
            title: '问题',
            key: 'problem',
            width: 400
          },
          {
            title: '时间',
            key: 'date',
            align: 'center'
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
          padding: 10px;
          position: relative;
          height: 370px;
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
          min-height: 600px;
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
        .professors_wrap {
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
                background: url(../../assets/service/r.jpg) no-repeat left center;
                padding-left: 18px;
                span {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background: url(../../assets/service/vip.png) no-repeat left center;
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
