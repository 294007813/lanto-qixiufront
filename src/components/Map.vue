<template>
<div class="map-frame" :class="{high: this.type=='maintain'}">
<div class="left">
  <Select v-model="typeV" placeholder="企业类别" @on-change="changeSelectAll" class="type" v-if="this.type=='maintain'">
    <Option value="164">维修企业</Option>
    <Option value="166">综合检测站</Option>
    <Option value="214">危运车辆维修</Option>
    <Option value="215">新能源汽车维修</Option>
    <Option value="213">施救牵引企业</Option>
  </Select>
  <Input v-model="inputV" placeholder="输入企业名称/地址" :class="{inline: this.type=='maintain'}"
         @on-enter="changeSelectAll">
    <Button slot="append" icon="ios-search" @click="changeSelectAll"></Button>
  </Input>
  <div class="select-bar" v-show="this.type=='index'||(this.type=='maintain'&&this.typeV=='164')">
    <Select v-model="sortV" placeholder="企业排序" clearable @on-change="changeSelectAll">
      <Option value="1">信誉等级</Option>
      <Option value="2">服务评价</Option>
      <Option value="3">分数等级</Option>
    </Select>
    <Select v-model="categoryV" placeholder="企业类型" clearable @on-change="changeSelectAll">
      <Option value="43">一类维修企业</Option>
      <Option value="44">二类维修企业</Option>
      <Option value="45">三类维修业户</Option>
      <Option value="46">摩托车维修业户</Option>
      <Option value="47">汽车快修业户</Option>
    </Select>
    <Select v-model="areaV" placeholder="企业区域" clearable @on-change="changeSelectAll">
      <Option v-for="(item, key) in area" :value="item.areakey" :key="key">{{item.areaname}}</Option>
    </Select>
    <Select v-model="brandV" placeholder="输入品牌" clearable @on-change="changeSelectAll" filterable class="brand">
      <Option v-for="(item, key) in brands" :value="item" :key="key"></Option>
    </Select>
  </div>
  <div class="res">查询结果：共<span>{{sum}}</span>条记录，请在企业列表或地图中选择查看</div>
  <ul>
    <li class="info" v-for="(item, key) in list" :key="key" @click.stop="openMapInfo(item.corpId)">
      <img :src="item.frontPhoto? item.frontPhoto:'/static/img/nopic.jpg'">
      <div class="list-right">
        <span class="name">{{item.corpName}}</span>
        <span>地址：{{item.corpAdd}}</span>
        <!--<span>电话：{{item.linkTel}}</span>-->
        <span>电话：******</span>
        <span v-show="item.apart>=0">距离：{{calcApart(item.apart)}}</span>
      </div>
      <div class="appraise" @click.stop="appraise(item.corpId, item.corpName)">我要评价</div>
    </li>
  </ul>
  <Page :total="sum" :current="page" :page-size="limit" show-elevator class-name="paging" @on-change="changePage"></Page>
</div>
<div class="right" id="map"></div>
<div class="rates">
  <i @click="closeRates">×</i>
  <rate :comname="rateName" :comid="rateId" @success="closeRates"></rate>
</div>

<!--<Spin v-show="loading" fix >-->
  <!--<Icon type="load-a" size=30 class="demo-spin-icon-load"></Icon>-->
  <!--<div>Loading</div>-->
<!--</Spin>-->
  <Spin v-show="loading" size="large" fix></Spin>
</div>
</template>

<script>
  import Rate from "./Rate";
  import $ from 'jquery'
  export default {
    components: {Rate},
    props:['type','tolimit'],
    data(){
      return{
        typeV:"164",
        inputV:"",
        sortV: "",
        categoryV:"",
        areaV:"",
        brandV:"",
        brands:['奥迪','阿尔法·罗密欧','阿斯顿·马丁','AC Schnitzer','安凯','ALPINA','标致','本田','宝马','北京','奔驰','布加迪','别克','宾利','保时捷','比亚迪','奔腾','宝骏','巴博斯','北汽威旺','北汽制造','北汽绅宝','北汽幻速','北汽新能源','宝沃','比速汽车','长安','长城','昌河','长安欧尚','成功汽车','长安轻型车','大众','东风','道奇','东南','大发','东风风神','东风小康','东风风行','DS','东风风度','东风风光','丰田','福特','菲亚特','法拉利','福田','福迪','福汽启腾','福田乘用车','广汽传祺','广汽吉奥','GMC','光冈','观致','哈飞','悍马','华普','海马','华泰','红旗','黄海','海格','恒天','哈弗','华颂','华利','华凯','华泰新能源','汉腾汽车','Icona','吉利汽车','捷豹','Jeep','金杯','江淮','江铃','金龙','九龙','金旅','江铃集团轻汽','江铃集团新能源','克莱斯勒','凯迪拉克','科尼塞克','开瑞','KTM','卡尔森','卡威','凯翼','康迪全球鹰','卡升','雷诺','兰博基尼','路虎','路特斯','林肯','雷克萨斯','铃木','劳斯莱斯','猎豹汽车','力帆汽车','陆风','莲花汽车','Lorinser','理念','陆地方舟','LOCAL MOTORS','名爵','迈巴赫','MINI','玛莎拉蒂','马自达','迈凯伦','摩根','纳智捷','南京金龙','欧宝','讴歌','欧朗','帕加尼','奇瑞','起亚','启辰','前途','荣威','日产','瑞麒','如虎','瑞驰新能源','smart','萨博','斯巴鲁','世爵','斯柯达','三菱','双龙','双环','陕汽通家','上汽大通','思铭','赛麒','斯达泰克','SWM斯威汽车','特斯拉','腾势','泰卡特','沃尔沃','威兹曼','威麟','五菱汽车','五十铃','潍柴英致','WEY','蔚来','现代','雪佛兰','雪铁龙','西雅特','新凯','英菲尼迪','永源','一汽','野马汽车','依维柯','驭胜','中华','中兴','众泰','芝诺','知豆'],
        sum: 0,
        area:[
          {areakey: '310000', areaname: '市辖区'},
          {areakey: '310115', areaname: '浦东新区'},
          {areakey: '310112', areaname: '闵行区'},
          {areakey: '310113', areaname: '宝山区'},
          {areakey: '310116', areaname: '金山区'},
          {areakey: '310114', areaname: '嘉定区'},
          {areakey: '310118', areaname: '青浦区'},
          {areakey: '310230', areaname: '崇明区'},
          {areakey: '310117', areaname: '松江区'},
          {areakey: '310120', areaname: '奉贤区'},
          ],
        list:[],
        limit: this.tolimit,
        page: 1,
        points:{},
        map: null,
        icon:null,
        rateName:"",
        rateId: "",
        loading: true
      }
    },
    watch:{
      $route:function (val) {
        // console.log(val.query.type)
        switch (val.query.type){
          case 'maintain': this.typeV= '164';break;
          case 'check': this.typeV= '166';break;
          case 'danger': this.typeV= '214';break;
          case 'newenergy': this.typeV= '215';break;
          case 'rescue': this.typeV= '213';break;
        }
      }
    },
    beforeMount(){
      switch (this.$route.query.type){
        case 'maintain': this.typeV= '164';break;
        case 'check': this.typeV= '166';break;
        case 'danger': this.typeV= '214';break;
        case 'newenergy': this.typeV= '215';break;
        case 'rescue': this.typeV= '213';break;
      }
    },
    mounted(){
      this.map = new BMap.Map("map");
      let point = new BMap.Point(121.480201, 31.236336);// 上海
      this.map.centerAndZoom(point, 13);
      let top_left_control = new BMap.ScaleControl({
        anchor : BMAP_ANCHOR_BOTTOM_RIGHT
      });//添加比例尺
      let top_left_navigation = new BMap.NavigationControl({offset: new BMap.Size(20, 20)}); // 添加缩放平移控件
      this.icon=new BMap.Icon("static/img/point-icon.png", new BMap.Size(32, 32));//自定义点图标
      this.icon.imageSize= new BMap.Size(32, 32)

      this.map.addControl(top_left_control);
      this.map.addControl(top_left_navigation);

      let systok= localStorage.getItem("SYSTEMTOKEN"),self= this
      if(systok){
        // this.getArea(systok)
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
          // self.getArea(systok)
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
      //获取区域
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

      //获取左边列表数据
      getList(systok){
        let self= this,
          param = {
          systemToken: systok? systok: localStorage.getItem("SYSTEMTOKEN"),
          companycategory: this.categoryV,
          corpAreaEq: this.areaV,
          corpName: this.inputV,
          magorBrandsLk: this.brandV,
          isort: parseInt(this.sortV),
          // starLevel:'',
          type: this.typeV,
          limit: this.limit,
          page: this.page
        }
        if(this.typeV!='164'){
          param.companycategory= param.corpAreaEq= param.corpName= param.magorBrandsLk= param.isort= ''
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

      //获取右边点数据
      getPoint(systok){
        let self= this,
          param = {
            systemToken: systok? systok: localStorage.getItem("SYSTEMTOKEN"),
            type: this.typeV,
            companycategory: this.categoryV,
            corpAreaEq: this.areaV,
            corpName: this.inputV,
            magorBrandsLk: this.brandV,
            isort: parseInt(this.sortV),
            limit: 200,
            page: 1
          }
        if(this.typeV!='164'){
          param.companycategory= param.corpAreaEq= param.corpName= param.magorBrandsLk= param.isort= ''
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
          self.loading= false
        })
      },

      //将点渲染到地图
      point(corp){
        let self=this, point= new BMap.Point(corp.lng, corp.lat);
        let mar= new BMap.Marker(point, {icon: self.icon})
        let html=
          '<div class="info">' +
          '<div class="img">' +
          '<img src='+ (corp.frontPhoto? corp.frontPhoto: "/static/img/nopic.jpg") +' width="170" height="140" />' +
          '</div>' +
          '<ul>' +
          '<li><span>企业名称：</span>' + (corp.corpName?corp.corpName:"") + '</li>' +
          '<li><span>经营范围：</span>' + (corp.companybusinessscope? corp.companybusinessscope: '') + '</li>' +
          // '<li><span>服务星级：</span>' + getStar(corp.STAR_LEVEL) + '</li>' +
          '<li><span>信誉等级：</span>' + (corp.creditLevel?corp.creditLevel:"" )+ '</li>' +
          '<li><span>主修品牌：</span>' + (corp.vehicleband!="否"?corp.vehicleband?corp.vehicleband:"": "") + '</li>' +
          '<li><span>营业时间：</span>' + (corp.time?corp.time:"" )+ '</li>' +
          '<li><span>经营地址：</span>' + (corp.corpAdd? corp.corpAdd: "") + '</li>' +
          // '<li><span>联系电话：</span>' + (corp.linkTel?corp.linkTel:"") + '</li>' +
          '<li><span>联系电话：</span>' + '******' + '</li>' +
          '<li><span>经营状况：</span></li>' +
          '</ul>' +
          '</div>' +
          '<div class="button">' +
          '<a class=""  href="/#/service/visitingService?id=' + corp.corpId + '" >上门服务</a>' +
          '<a class=""  href="/#/service/reservationFix?id=' + corp.corpId + '" >预约服务</a>' +
          '<a class="blue"  href="/#/maintainDetail?id=' + corp.corpId + '">查看详情</a>' +

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

      //计算显示距离
      calcApart(ap){
        let flap= parseFloat(ap)
        if(flap>=1000){
          return (flap/1000).toFixed(1)+' km'
        }else{
          return ap+' 米'
        }
      },
      //地图上显示点信息
      openMapInfo(id){
        this.points[id].searchInfoWindow.open(this.points[id])
      },
      //点击页码
      changePage(page){
        this.page= page
        this.getList()
      },
      //点击选项
      changeSelect(){
        this.page=1
        this.getList()
      },
      //重置地图点
      changeSelectAll(val){
        this.loading= true
        this.page=1
        this.map.clearOverlays();
        this.getList()
        // if(val=='164'){
          this.getPoint()
        // }
      },
      //打开评价
      appraise(id,name){
        let acctok= localStorage.getItem("ACCESSTOKEN"), self= this ;
        if(!acctok) {
          this.$Message.error({content:'请登录后评价'})
          return
        }
        this.rateId= id
        this.rateName= name
        $(".rates").show()
      },
      //关闭评价
      closeRates(){
        $(".rates").hide()
      }
    },
    beforeDestroy(){
      this.map= null
      $("#map").remove()
    },
    destroyed() {
      // this.map.reset();
      // this.map= null
      // delete this.map
      // this.$destroy()
      // window.location.reload()
      // this.$router.go(0)
    },
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
        position: relative;
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
            cursor: default;
          }
          .name{
            background: url(../assets/map/house.png) no-repeat left center;
            color: #252525;
            padding-left: 20px;
            background-size: 15px;
          }
        }
        .appraise{
          position: absolute;
          right: 10px;
          bottom: 10px;
          background-color: white;
          color: #1E9FFF;
          border: 1px solid #1E9FFF;
          font-size: 12px;
          padding: 2px 10px;
          border-radius: 2px;
          cursor: pointer;
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
  .rates{
    width: 500px;
    height: 450px;
    position: absolute;
    margin: auto;
    background-color: white;
    border-radius: 10px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 890;
    border:  1px solid #e6e6e6;
    display: none;
    i{
      font-size: 20px;
      width: 500px;
      text-align: right;
      display: block;
      padding-right: 10px;
      line-height: 20px;
      height: 25px;
      border-bottom:  1px solid #e6e6e6;
      cursor: pointer;
    }
  }
}
.map-frame.high{
  .left{
    .type{
      width: 30%;
      padding-right: 5px;
    }
    .inline{
      width: 69%;
      display: inline-table;
    }
    .select-bar{

    }
  }
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
.map-frame .brand .ivu-select-dropdown{
  overflow-x: hidden;
}
.map-frame .right{
  .info{
    padding: 10px;
    .img{
      float: right;
      width: 170px;
      height: 140px;
      img{
        width: 100%;
      }
    }
    ul {
      width: 300px;
      li{
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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

.ivu-spin{
  z-index: 889;
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
}

</style>
