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
      this.getList()
    },
    watch:{
		  $route(to){
        this.getList()
      }
    },
    methods:{
		  getList(){
        this.path= this.$route.matched[1].path + '/article'
        let self= this, systok= localStorage.getItem('SYSTEMTOKEN'), id= this.id= this.$route.query.id;
        this.axios({
          method: 'get',
          url: '/article/writing/querylist/'+systok+'/'+id,
        }).then(function (res) {
          console.log(res)
          if(res.data.data.length==1){
            self.$router.replace({
              path: self.path, query: {id: id, articleId: res.data.data[0].articleId}
            })
          }
          self.list= res.data.data
        })
      }
    }
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
