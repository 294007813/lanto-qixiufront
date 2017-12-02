<template>
<div class="map-frame">
<div class="left">
  <Input v-model="search1" placeholder="输入维修企业名称/地址/车型">
    <Button slot="append" icon="ios-search"></Button>
  </Input>
  <div class="select-bar">
    <Select v-model="search2">
      <Option value="1"></Option>
    </Select>
    <Select v-model="search3">
      <Option value="1"></Option>
    </Select>
    <Select v-model="search4">
      <Option value="1"></Option>
    </Select>
    <Select v-model="search5">
      <Option value="1"></Option>
    </Select>
  </div>
  <div class="res">查询结果：共<span>{{resnum}}</span>条记录，请在企业列表或地图中选择查看</div>
  <ul>
    <li>
      <img src="../assets/map/nopic.jpg">
      <div class="list-right">
      <span class="name">上海申海汽车修理有限公司</span>
      <span>地址：徐汇区上中路509号</span>
      <span>电话：15601816098</span>
      <span>星级：</span>
      <div class="appraise">我要评价</div>
      </div>
    </li>
  </ul>
</div>
<div class="right" id="map"></div>
</div>
</template>

<script>
  export default {
    data(){
      return{
        search1:"",
        search2:"",
        search3:"",
        search4:"",
        search5:"",
        resnum:"0"
      }
    },
    mounted(){
      let map = new BMap.Map("map");
      let point = new BMap.Point(121.480201, 31.236336);// 上海
      map.centerAndZoom(point, 12);
    }
  }
</script>

<style scoped lang="scss">
.map-frame{
  width: 100%;
  padding: 10px;
  overflow: hidden;
  position: relative;
  min-width: 800px;
  max-width: 1200px;
  display: inline-block;
  text-align: left;
  box-sizing: border-box;
  .left{
    float: left;
    border: 1px solid #e6e6e6;
    position: relative;
    padding: 5px;
    background: #FFF;
    z-index: 9999;
    width: 380px;
    height: 600px;
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
      li{
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
            color: #4ba7f5;
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
    border: 1px solid #e6e6e6;
    border-left: 0;
    position: relative;
    margin-left: 380px;
    min-width: 400px;
  }
}
</style>
