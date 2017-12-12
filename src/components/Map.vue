<template>
<div class="map-frame" :class="{high: this.type=='maintain'}">
<div class="left">
  <Select v-model="sortV" placeholder="查询类别" @on-change="changeSelect" class="inline">
    <Option value="">维修企业</Option>
    <Option value="">综合检测站</Option>
    <Option value="">危运车辆维修</Option>
    <Option value="">新能源汽车维修</Option>
    <Option value="">汽车救援</Option>
  </Select>
  <Input v-model="inputV" placeholder="输入企业名称/地址" class="inline">
    <Button slot="append" icon="ios-search" @click="changeSelect"></Button>
  </Input>
  <div class="select-bar">
    <Select v-model="sortV" placeholder="企业排序" clearable @on-change="changeSelect">
      <Option value="信誉等级"></Option>
      <Option value="服务评价"></Option>
      <Option value="分数等级"></Option>
    </Select>
    <Select v-model="categoryV" placeholder="企业类型" clearable @on-change="changeSelect">
      <Option value="43">一类维修企业</Option>
      <Option value="44">二类维修企业</Option>
      <Option value="45">三类维修业户</Option>
      <Option value="46">摩托车维修业户</Option>
      <Option value="47">汽车快修业户</Option>
    </Select>
    <Select v-model="areaV" placeholder="企业区域" clearable @on-change="changeSelect">
      <Option v-for="(item, key) in area" :value="item.areakey" :key="key">{{item.areaname}}</Option>
    </Select>
    <Select v-model="brandV" placeholder="车辆品牌" clearable @on-change="changeSelect">
      <Option value="宝马"></Option>
      <Option value="别克"></Option>
      <Option value="大众"></Option>
    </Select>
  </div>
  <div class="res">查询结果：共<span>{{sum}}</span>条记录，请在企业列表或地图中选择查看</div>
  <ul>
    <li class="info" v-for="(item, key) in list" :key="key" @click="openMapInfo(item.corpId)">
      <img src="../assets/map/nopic.jpg">
      <div class="list-right">
      <span class="name">{{item.corpName}}</span>
      <span>地址：{{item.corpAdd}}</span>
      <span>电话：{{item.linkTel}}</span>
      <span>星级：</span>
      <div class="appraise">我要评价</div>
      </div>
    </li>
  </ul>
  <Page :total="sum" :current="page" :page-size="limit" show-elevator class-name="paging" @on-change="changePage"></Page>
</div>
<div class="right" id="map"></div>
</div>
</template>

<script>
  export default {
    props:['type','tolimit'],
    data(){
      return{
        inputV:"",
        sortV:"",
        categoryV:"",
        areaV:"",
        brandV:"",
        sum: 0,
        area:[],
        list:[],
        limit: this.tolimit,
        page: 1,
        points:{},
        map: null,
        icon:null
      }
    },
    destroyed(){
      window.location.reload()
    },
    mounted(){
      this.map = new BMap.Map("map");
      let point = new BMap.Point(121.480201, 31.236336);// 上海
      this.map.centerAndZoom(point, 13);
      let top_left_control = new BMap.ScaleControl({
        anchor : BMAP_ANCHOR_BOTTOM_RIGHT
      });//添加比例尺
      let top_left_navigation = new BMap.NavigationControl({offset: new BMap.Size(20, 20)}); // 添加缩放平移控件
      this.icon=new BMap.Icon("static/img/point-icon.png", new BMap.Size(20, 32));//自定义点图标
      this.icon.imageSize= new BMap.Size(20, 32)

      this.map.addControl(top_left_control);
      this.map.addControl(top_left_navigation);

      let systok= localStorage.getItem("SYSTEMTOKEN"),self= this
      if(systok){
        this.getArea(systok)
        this.getList(systok)
        this.getPoint(systok)
      }else{
        let data = {
          device: uuid(),
          password: "k5pg8kkN",
          username: "pcqixiu"
        }
        this.axios({
          method: 'post',
          url: '/system/terminalsystem/login',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        }).then(function (response) {
          let systok= response.data.data.systemToken
          localStorage.setItem("SYSTEMTOKEN", systok)
          self.getArea(systok)
          self.getList(systok)
          self.getPoint(systok)
        })
      }

      function  uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        // s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
      }
    },
    methods:{
      getArea(systok){
        let self=this
        this.axios({
          method: 'get',
          url: '/area/county/'+ systok+'/310100'
        }).then(function (res) {
          // console.log(res)
          self.area= res.data.data
        })
      },
      getList(systok){
        let self= this,
          param = {
          companycategory: this.categoryV,
          systemToken: systok? systok: localStorage.getItem("SYSTEMTOKEN"),
          corpAreaEq: this.areaV,
          corpName: this.inputV,
          magorBrandsLk: this.brandV,
          iSort: (this.sortV=='信誉等级'),
          starLevel:'',
          type: '164',
          limit: this.limit,
          page: this.page
        }
        this.axios({
          method: 'post',
          url: '/maintain/getRangeCorps',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then(function (res) {
          // console.log(res.data)
          let datas= res.data.data.content
          self.list= [];
          self.list= datas;
          self.sum= res.data.data.totalElements
          for (let i in datas){
            if(!self.points.hasOwnProperty( datas[i].corpId)){
              self.point(datas[i])
            }
          }
        })
      },
      getPoint(systok){
        let self= this,
          param = {
            systemToken: systok? systok: localStorage.getItem("SYSTEMTOKEN"),
            type: '164',
            limit: 300,
            page: 1
          }
        this.axios({
          method: 'post',
          url: '/maintain/getRangeCorps',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then(function (res) {
          console.log(res.data)
          let datas= res.data.data.content
          for (let i in datas){
            let corp= datas[i]
            self.point(corp)

          }
        })
      },
      point(corp){
        let self=this, point= new BMap.Point(corp.lng, corp.lat);
        let mar= new BMap.Marker(point, {icon: self.icon})
        let html=
          '<div class="info">' +
          '<div class="img">' +
          '<img src="/static/img/nopic.jpg" width="168" height="150" alt="">' +
          '</div>' +
          '<ul>' +
          '<li><span>企业名称：</span>' + (corp.corpName?corp.corpName:"") + '</li>' +
          '<li><span>经营范围：</span>' + (corp.companybusinessscope? corp.companybusinessscope: '') + '</li>' +
          // '<li><span>服务星级：</span>' + getStar(corp.STAR_LEVEL) + '</li>' +
          '<li><span>信誉等级：</span>' + (corp.creditLevel?corp.creditLevel:"" )+ '</li>' +
          '<li><span>主修品牌：</span>' + (corp.brand!="否"?corp.brand: "") + '</li>' +
          '<li><span>营业时间：</span>' + (corp.time?corp.time:"" )+ '</li>' +
          '<li><span>经营地址：</span>' + (corp.corpAdd? corp.corpAdd: "") + '</li>' +
          // '<li><span>联系电话：</span>' + (corp.linkTel?corp.linkTel:"") + '</li>' +
          '<li><span>联系电话：</span>' + '******' + '</li>' +
          '<li><span>经营状况：</span></li>' +
          '</ul>' +
          '</div>' +
          '<div class="button">' +
          '<a class=""  href="/maintain/visit" >上门服务</a>' +
          '<a class=""  href="javascript:void(0);" >预约服务</a>' +
          '<a class="blue"  href="/maintain/detail/' + corp.corpId + '">查看详情</a>' +

          '</div>';
        mar.searchInfoWindow =new BMapLib.SearchInfoWindow(self.map, html, {
          title: '<b>' + corp.corpName + '</b>', // 标题
          width: 500, // 宽度
          panel: "panel", // 检索结果面板
          enableAutoPan: true, // 自动平移
          enableSendToPhone: false,
          //enableMessage : false,
          searchTypes: [
            BMAPLIB_TAB_FROM_HERE,// 从这里出发
            BMAPLIB_TAB_SEARCH, // 周边检索
            BMAPLIB_TAB_TO_HERE // 到这里去
          ]
        });
        mar.addEventListener("click", function () {
          this.searchInfoWindow.open(mar);
        });
        this.map.addOverlay(mar);
        this.points[corp.corpId]= mar
      },
      openMapInfo(id){
        this.points[id].searchInfoWindow.open(this.points[id])
      },
      changePage(page){
        this.page= page
        this.getList()
      },
      changeSelect(){
        this.page=1
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
.map-frame{
  width: 100%;
  /*padding: 10px;*/
  overflow: hidden;
  position: relative;
  min-width: 800px;
  max-width: 1200px;
  display: inline-block;
  text-align: left;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  .left{
    float: left;

    position: relative;
    padding: 5px;
    background: #FFF;
    z-index: 888;
    width: 380px;
    /*height: 600px;*/
    .select-bar{
      display: flex;
      margin-top: 10px;
      .ivu-select{
        width: 25%;
        padding-right: 5px;
      }
    }
    .res{
      text-align: center;
      height: 40px;
      line-height: 40px;
      span{
        color: red;
      }
    }
    ul{
      li.info:hover{
        border: 1px solid #1E9FFF;
      }
      li.info{
        overflow: hidden;
        border: 1px solid #ededed;
        margin-bottom: 5px;
        img{
          float: left;
          margin: 8px;
          width: 100px;
          height: 70px;
        }
        .list-right{
          float: left;
          width: 250px;
          margin-top: 9px;
          font-size: 12px;
          line-height: 18px;
          position: relative;
          span{
            /*color: #020202;*/
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            display: block;
          }
          .name{
            background: url(../assets/map/house.png) no-repeat left center;
            color: #252525;
            padding-left: 20px;
            background-size: 15px;
          }
          .appraise{
            position: absolute;
            right: 10px;
            bottom: 0;
            background-color: white;
            color: #1E9FFF;
            border: 1px solid #1E9FFF;
            font-size: 12px;
            padding: 2px 10px;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .right{
    height: 600px;
    border-left: 1px solid #e6e6e6;
    border-left: 0;
    position: relative;
    margin-left: 380px;
    min-width: 400px;
  }
}
.map-frame.high{
  .right{
    height: 800px;
  }
}
</style>
<style lang="scss">
.paging {
  text-align: center;
  li{
    margin: 2px 0;
  }
}
.map-frame .right{
  .info{
    padding: 10px;
    .img{
      float: right;
      width: 150px;
      height: 150px;
      img{
        width: 100%;
      }
    }
    ul li{
      line-height: 30px;
    }
  }
  .button{
    padding: 10px;
    text-align: right;
    a{
      display: inline-block;
      height: 35px;
      line-height: 35px;
      color: #1E9FFF;
      border: 1px solid #1E9FFF;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
      padding: 0 10px;
      margin-left: 10px;
    }
    .blue{
      background-color: #1e9fff;
      color: white;
    }
  }
}
.map-frame .right .BMapLib_SearchInfoWindow table td:first-child{
  width: 40px;
}
.map-frame .right .BMapLib_SearchInfoWindow table td:last-child{
  width: 120px;
}
</style>
