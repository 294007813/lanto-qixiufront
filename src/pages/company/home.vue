<template>
<div>
  <sub-title title="首页" :link="[{name:'企业中心',to: '/center/comHome'},{name:'首页',to:''}]"></sub-title>
  <div class="dblock">
    <h1 class="dtitle">未读通知</h1>
    <Table :columns="columns0" :data="data0"></Table>
  </div>

  <div class="dblock">
    <h1 class="dtitle">数据对接情况</h1>
    <chart :options="bar1" class="bar"></chart>
    <Table :columns="columns1" :data="data1" width="250"></Table>
  </div>

  <div class="dblock">
    <h1 class="dtitle">投诉情况</h1>
    <chart :options="bar2" class="bar"></chart>
    <Table :columns="columns2" :data="data2" width="250"></Table>
  </div>

  <div class="dblock">
    <h1 class="dtitle">上门服务申请业务（仅限于法律法规允许的业务）</h1>
    <chart :options="bar3" class="bar"></chart>

    <div class="scollbar" id="scoll1">
      <h2 class="stitle">上门服务维修申请</h2>
      <div class="list">
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>
        </div>
      </div>
    </div>

  </div>

  <div class="dblock">
    <h1 class="dtitle">预约维修业务</h1>
    <chart :options="bar4" class="bar"></chart>

    <div class="scollbar" id="scoll2">
      <h2 class="stitle">预约维修申请</h2>
      <div class="list">
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 预约维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 预约维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 预约维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 预约维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 预约维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 预约维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 预约维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 预约维修</div>
        </div>
        <div class="group">
          <div class="item">1.姓名：张三 电话：13857463557 预约维修</div>
          <div class="item">2.姓名：李四 电话：15096747948 预约维修</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
	export default {
		name: "comhome",
    data(){
		  return{
        columns0:[
          {title:'通知标题',key:'title'},
          {title:'通知内容',key:'content'},
          {title:'通知发送人',key:'from'},
          {title:'通知日期',key:'date'},
        ],
        data0:[],

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
              data : [],
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
              data:[]
            }
          ]
        },
        columns1:[
          {title:'日期',key:'date'},
          {title:'数据条数',key:'count'},
        ],
        data1:[],

        bar2:{
          color: ['#fdc12f'],
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
              data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
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
              name:'投诉数',
              type:'bar',
              //barWidth: '60%',
              data:[10,6,6,7,8,9,1]
            }
          ]
        },
        columns2:[
          {title:'日期',key:'date'},
          {title:'投诉条数',key:'count'},
        ],
        data2:[
          {date: '2017/10/12', count: '10'},
          {date: '2017/10/13', count: '6'},
          {date: '2017/10/14', count: '6'},
          {date: '2017/10/15', count: '7'},
          {date: '2017/10/16', count: '8'},
          {date: '2017/10/17', count: '9'},
          {date: '2017/10/18', count: '1'},
        ],

        bar3:{
          color: ['#82d03c'],
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
              data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
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
              name:'上门申请数',
              type:'bar',
              //barWidth: '60%',
              data:[3,5,7,2,4,1,3]
            }
          ]
        },

        bar4:{
          color: ['#ff8e1e'],
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
              data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
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
              name:'预约数',
              type:'bar',
              //barWidth: '60%',
              data:[4,3,1,2,5,7,2]
            }
          ]
        },
      }
    },
    beforeMount(){
      let self= this, acctok= localStorage.getItem("ACCESSTOKEN");
      //未读通知
      this.axios({
        method: 'get',
        url: '/message/notify/getReceiveNotify/'+ acctok,
        headers: {
          'Content-type': 'application/json'
        },
      }).then(function (res) {
        // console.log(res)
        let datas=res.data.data, content='';
        for( let i in datas){
          if(datas[i].read) continue
          content= JSON.parse(datas[i].content).content;
          self.data0.push({
            title: datas[i].title,
            content: (content.substring(0,10)+'...'),
            from: (datas[i].nickName? datas[i].nickName: datas[i].mobile),
            date: (new Date(datas[i].sendtime).toISOString().split(".")[0].split("T")[0])
          })
        }
      })

      //数据对接情况
      this.axios({
        method: 'get',
        url: '/statistics/admin/comStatistics/'+ acctok,
        headers: {
          'Content-type': 'application/json'
        },
      }).then(function (res) {
        console.log(res)
        let data0='', data1=[], data2=[];
        for (var i in res.data.data){
          data0= new Date( res.data.data[i].statisticsDate).toISOString().split('T')[0]
          data1.push(data0)
          data2.push(res.data.data[i].dataNum)
          self.data1.push({date: data0, count: res.data.data[i].dataNum})
        }
        self.bar1.xAxis[0].data= data1
        self.bar1.series[0].data= data2
      })
    }
	}
</script>

<style scoped lang="scss">
.bar{
  width: 500px;
  height: 300px;
}
.scollbar{
  h2{
    line-height: 32px;
    padding: 0 20px;
  }
  .list {
    height: 352px;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    .item {
      height: 35px;
      line-height: 35px;
    }
  }
}
</style>
