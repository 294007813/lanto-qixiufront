<template>
<div>
<Row>
  <div class="left-block" v-show="patch()=='/public'">
    <div class="title">公共管理</div>
    <Menu theme="light" class="left-menu"
          :active-name="activeName" @on-select="select" :open-names="['1']">
      <Submenu name="1">
        <template slot="title"><Icon type="ios-paper"></Icon>政务公开</template>
        <MenuItem name="10">法律法规</MenuItem>
        <MenuItem name="11">管理规范</MenuItem>
        <MenuItem name="12">行业政策</MenuItem>
        <MenuItem name="13">技术标准</MenuItem>
      </Submenu>
      <MenuItem name="4"><Icon type="ios-paper"></Icon>办事指南</MenuItem>
      <MenuItem name="5"><Icon type="ios-paper"></Icon>管理职责</MenuItem>
      <MenuItem name="6"><Icon type="ios-paper"></Icon>行业概况</MenuItem>
      <Submenu name="2">
        <template slot="title"><Icon type="ios-paper"></Icon>管理动态</template>
        <MenuItem name="/center/eRecordList">电子维修档案</MenuItem>
        <MenuItem name="">客货运车辆技术管理</MenuItem>
        <MenuItem name="">企业合格证使用信息管理</MenuItem>
        <MenuItem name="14">质量信誉考核信息</MenuItem>
        <MenuItem name="15">违法违规公告</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title"><Icon type="ios-paper"></Icon>创先争优</template>
        <MenuItem name="16">优质企业</MenuItem>
      </Submenu>
      <MenuItem name="17"><Icon type="ios-paper"></Icon>行业文明创建</MenuItem>
    </Menu>
  </div>

  <div class="left-block" v-show="patch()=='/association'">
    <div class="title">协会治理</div>
    <Menu theme="light" class="left-menu"
          :active-name="activeName" @on-select="select2" >
      <MenuItem name="18"><Icon type="ios-paper"></Icon>协会简介</MenuItem>
      <MenuItem name="19"><Icon type="ios-paper"></Icon>协会职能</MenuItem>
      <MenuItem name="20"><Icon type="ios-paper"></Icon>工作动态</MenuItem>
      <MenuItem name="22"><Icon type="ios-paper"></Icon>行业风采</MenuItem>
      <MenuItem name="23"><Icon type="ios-paper"></Icon>行业党建</MenuItem>
      <MenuItem name="17"><Icon type="ios-paper"></Icon>行业能手</MenuItem>
      <MenuItem name="24"><Icon type="ios-paper"></Icon>专家组</MenuItem>
    </Menu>
  </div>

  <div class="right-block">
    <router-view/>
  </div>
</Row>
</div>
</template>

<script>
	export default {
		name: "article-menu",
    data(){
		  return{
        activeName: this.$route.query.id
      }
    },
    watch:{
		  $route(newV){
		    this.activeName= newV.query.id
        // console.log(this.activeName)
      }
    },
    beforeMount(){
      // this.activeName= this.$route.query.id
		  // console.log(this.$route.matched)
    },
    methods:{
		  patch(){
		    return this.$route.matched[1].path
      },
      select(id){
		    if(!id) return
        switch (id){
          case '/center/eRecordList':{
            this.$router.push({
              path: id,
            })
            break
          }
          default :{
            this.$router.push({
              path: '/public/articleList',
              query: {id: id}
            })
          }
        }

      },
      select2(id){
        if(!id) return
        this.$router.push({
          path: '/association/articleList',
          query: {id: id}
        })
      },
    }
	}
</script>

<style scoped lang="scss">
  .left-block{
    float: left;
    border-right: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    .title{
      width: 215px;
      height: 45px;
      background: url(../assets/leftmenu/banner.png) no-repeat;
      margin: 15px auto 0 auto;
      position: relative;
      color: #FFF;
      font-size: 16px;
      padding-left: 40px;
      line-height: 38px;
    }
    .title:after {
      content: "";
      width: 24px;
      height: 24px;
      position: absolute;
      top: 6px;
      left: 10px;
      background: url(../assets/leftmenu/book.png) no-repeat;
    }
    .left-menu{
      min-height: 520px;
    }
    .ivu-menu::-webkit-scrollbar{

    }
  }
  .right-block{
    margin: 10px 10px 10px 250px;
    padding: 0 10px;
    border: 1px solid #dddee1;
    min-height: 560px;
    min-width: 550px;
  }

  .ivu-menu-vertical.ivu-menu-light:after{
    background: none;
  }
</style>
