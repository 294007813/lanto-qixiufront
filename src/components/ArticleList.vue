<template>
<div>
  <!--<sub-title title="法律法规" :link="[{name:'公共管理',to: ''},{name:'法律法规',to:''}]"></sub-title>-->
  <ul>
    <li v-for="(item, key) in list" :key="key">
      <router-link tag="a" :to="{path: path, query: {id: id, articleId: item.articleId}}">{{item.title}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
	export default {
		name: "article-list",
    data(){
		  return{
        list:[],
        path:'',
        id:''
      }
    },
    beforeMount(){
      this.path= this.$route.matched[1].path + '/article'
      let self= this, systok= localStorage.getItem('SYSTEMTOKEN'), id= this.id= this.$route.query.id;
      this.axios({
        method: 'get',
        url: '/article/writing/querylist/'+systok+'/'+id,
      }).then(function (res) {
        console.log(res)
        self.list= res.data.data
      })
    },
    beforeRouteUpdate (to, from, next) {
		  // console.log(to.query.id)
      this.path= to.matched[1].path + '/article'
      let self= this, systok= localStorage.getItem('SYSTEMTOKEN'), id= this.id= to.query.id;
      this.axios({
        method: 'get',
        url: '/article/writing/querylist/'+systok+'/'+id,
      }).then(function (res) {
        console.log(res)
        self.list= res.data.data
      })
      next()
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
	}
</script>

<style scoped lang="scss">
li{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dddddd;
  padding-right: 10px;
  padding-left: 20px;
  position: relative;
  a{
    float: left;
    color: #020202;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
li:after{
  content: "";
  width: 5px;
  height: 5px;
  background: #4ba7f5;
  position: absolute;
  left: 10px;
  top: 22px;
}
</style>
