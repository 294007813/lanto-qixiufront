<template>
<div>
  <sub-title title="首页" :link="[{name:'管理中心',to: '/center/manHome'},{name:'首页',to:''}]"></sub-title>
  <div class="dblock">
    <h1 class="dtitle">电子健康档案状况</h1>
    <Table :columns="columns1" :data="data1" width="500"></Table>
    <chart :options="pie1" id="pie1" ref="pie11"></chart>
  </div>
</div>
</template>

<script>

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
            {value:4380, name:'维修数据完成对接'},
            {value:1620, name:'维修数据未完成对接'},
          ]
        }],
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['维修数据完成对接','维修数据未完成对接']
        },
      }
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
      console.log(res)
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
      document.getElementById("pie1").appendChild("<div style='position: absolute;left: 75px;top: 130px;font-size: 28px'>总数："+data.repairCompanySum+"</div>")
    })
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">
  .echarts {
    width: 300px;
    height: 300px;
    position: relative;
  }
</style>
