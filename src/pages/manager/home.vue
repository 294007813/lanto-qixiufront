<template>
<div>
  <sub-title title="首页" :link="[{name:'管理中心',to: '/center/manHome'},{name:'首页',to:''}]"></sub-title>
  <div class="dblock">
    <h1 class="dtitle">电子健康档案状况</h1>
    <Table :columns="columns1" :data="data1" width="500"></Table>
    <chart :options="pie1" class="pie" id="pie1" ref="pie11"></chart>
  </div>
  <div class="dblock">
    <h1 class="dtitle">区域对接状况</h1>
    <chart :options="bar1" class="bar" @click="clickArea"></chart>
    <div class="comList"><p>
      <Select v-model="areaV" style="width:100px" @on-change="queryComp">
        <Option v-for="item in areas" :value="item.areakey" :key="item.areakey">{{item.areaname}}</Option>
      </Select>
      <span>对接企业名单：</span></p><ul class="list"><li v-for="(item, key) in comList" :key="key">{{item.companyname}}</li></ul>
    </div>
  </div>
  <!--<div class="dblock">-->
    <!--<h1 class="dtitle">ERP公司对接情况</h1>-->
    <!--<Table :columns="columns2" :data="data2" width="500"></Table>-->
    <!--<chart :options="pie2" class="pie" ></chart>-->
  <!--</div>-->
  <div class="dblock">
    <h1 class="dtitle">本月投诉维修厂排行榜</h1>
    <Table :columns="columns3" :data="data3" width="500"></Table>
    <chart :options="pie3" class="pie" ></chart>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "index",
  data(){
    return{
      columns1:[
        {title:'类型',key:'type'},
        {title:'总数',key:'sum'},
        {title:'已对接数量',key:'count'},
        {title:'完成率',key:'odds'},
      ],
      data1:[
        {type:'所有维修企业', sum:'', count:'', odds:''},
        {type:'一类维修企业', sum:'', count:'', odds:''},
        {type:'二类维修企业', sum:'', count:'', odds:''},
        {type:'三类维修业户', sum:'', count:'', odds:''},
        {type:'汽车快修业户', sum:'', count:'', odds:''},
        {type:'摩托车维修业户', sum:'', count:'', odds:''}
      ],

      pie1:{
        title: {
          text:'维修企业注册数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        color:['#6eb4f2','#fdc12f','#82d03c'],
        series: [{
          name:'数据对接完成情况',
          type:'pie',
          radius: ['50%', '65%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: ''
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:4380, name:'维修企业完成对接'},
            {value:1620, name:'维修企业未完成对接'},
          ]
        }],
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['维修企业完成对接','维修企业未完成对接']
        },
      },

      bar1:{
        color: ['#6eb4f2'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
        },
        xAxis : [
          {
            type : 'category',
            // data : ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区',  '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区',  '奉贤区', '崇明区'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            name:'对接数',
            type:'bar',
            //barWidth: '60%',
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      areas:[],
      areaV:"",
      comList:[],

      columns2:[
        {title:'完成对接名单(9家)',key:'fin'},
        {title:'对接进行中名单(7家)',key:'on'},
        {title:'还未对接名单(8家)',key:'never'},
      ],
      data2:[
        {fin:'驷惠软件', on: '车保无忧', never: '上海瑞龙'},
        {fin:'理工华泰', on: '奇策', never: '江淮汽车 JAC DMS'},
        {fin:'软平', on: '全智通', never: '慧与（中国）有限公司软件商公司'},
        {fin:'汽修通', on: '翰都', never: '卓越软件'},
        {fin:'大智慧', on: '思顶', never: '宝马主机厂ERP系统'},
        {fin:'偲腾', on: 'Autoplus', never: 'ERP路虎捷豹主机厂'},
      ],

      pie2:{
        title: {
          text:'ERP对接情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['数据对接完成','数据对接进行中','数据对接未开始']
        },
        color:['#6eb4f2','#fdc12f','#82d03c'],
        series: [{
          name:'数据对接完成情况',
          type:'pie',
          radius: ['50%', '65%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: ''
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
              {value:9, name:'数据对接完成'},
              {value:7, name:'数据对接进行中'},
              {value:8, name:'数据对接未开始'},
          ]
        }]
      },

      columns3:[
        {title:'排名',key:'no'},
        {title:'名称',key:'name'},
        {title:'数量(次)',key:'times'},
      ],
      data3:[
        {no:'1', name:'无', times:'0'}
        ],

      pie3:{
        title: {
          text:'投诉情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['一类维修企业','二类维修企业','三类维修业户']
        },
        color:['#6eb4f2','#fdc12f','#82d03c'],
        series: [{
          name:'投诉情况',
          type:'pie',
          radius: ['50%', '65%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: ''
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:0, name:'一类维修企业'},
            {value:0, name:'二类维修企业'},
            {value:0, name:'三类维修业户'},
          ]
        }]
      },
    }
  },
  mounted(){
    let self= this, acctok= localStorage.getItem("ACCESSTOKEN");
    //获取对接状况
    this.axios({
      method: 'get',
      url: '/statistics/admin/adminStatistics/'+ acctok,
      headers: {
        'Content-type': 'application/json'
      },
    }).then(function (res) {
      // console.log(res)
      let data= res.data.statisticsDataPO,td= self.data1
      td[0].sum= data.repairCompanySum; td[0].count= data.repairCompany; td[0].odds= data.repairCompanyrate+"%";
      td[1].sum= data.companyISum; td[1].count= data.companyIcount; td[1].odds= data.companyIrate+"%";
      td[2].sum= data.companyIISum; td[2].count= data.companyIIcount; td[2].odds= data.companyIIrate+"%";
      td[3].sum= data.companyIIISum; td[3].count= data.companyIIIcount; td[3].odds= data.companyIIIrate+"%";
      td[4].sum= data.carCompanySum; td[4].count= data.carCompanyCount; td[4].odds= data.carCompanyrate+"%";
      td[5].sum= data.motorCompanySum; td[5].count= data.motorCompanyCount; td[5].odds= data.motorCompanyrate+"%";

      self.pie1.series[0].data=[
        {value:parseInt(data.repairCompany), name:'维修企业完成对接'},
        {value:parseInt(data.repairCompanySum) - parseInt(data.repairCompany), name:'维修企业未完成对接'},
      ]
      // self.$refs.pie11.mergeOptions(self.pie1)
      $("#pie1").append("<div style='position: absolute;left: 75px;top: 130px;font-size: 28px'>总数："+data.repairCompanySum+"</div>")
    })

    //区域对接情况
    this.axios({
      method: 'get',
      url: '/statistics/admin/areaStatistics/'+ acctok,
    }).then(function (res) {
      // console.log(res)
      let area=[], num=[]
      for (let i in res.data.data){
        area.push(res.data.data[i].statisticsArea);
        num.push(res.data.data[i].dataNum)
      }
      self.bar1.xAxis[0].data= area;
      self.bar1.series[0].data=num
    })

    this.axios({
      method: 'get',
      url: '/area/county/'+ acctok+ '/310100',
    }).then(function (res) {
      console.log(res)
      self.areas=res.data.data
    })

  },
  methods:{
    clickArea(val){
      console.log("val=", val)
      this.$router.push({
        path: "/center/companyContactCount",
        query: {
          areaName: val.name
        }
      })
      for(let i in this.areas){
        if(this.areas[i].areaname==val.name)
          this.areaV=this.areas[i].areakey
      }
    },
    queryComp(val){
      let self= this, acctok= localStorage.getItem("ACCESSTOKEN");
      console.log(val)
      this.axios({
        method: 'get',
        url: '/statistics/admin/areaCompany/'+ acctok+ '/'+ val,
      }).then(function (res) {
        console.log(res)
        self.comList=res.data.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.comList{
  width: 600px;
  ul.list{
    li{
      display: inline-block;
      margin: 0 5px;
      line-height: 25px;
    }
    li:before{
      content: '';
      width: 5px;
      height: 5px;
      margin-right: 2px;
      background-color: #6eb4f2;
      display: inline-block;
      line-height: 25px;
      position: relative;
      top: -2px;
    }
  }
}
.pie {
  width: 300px;
  height: 300px;
  position: relative;
}
.bar{
  width: 600px;
  height: 300px;
}
</style>
