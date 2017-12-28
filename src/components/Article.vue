<template>
<div>
  <!--<sub-title title="法律法规" :link="[{name:'公共管理',to: ''},{name:'法律法规',to:''}]"></sub-title>-->
  <div class="detail" v-html="content">
    {{content}}
  </div>
</div>
</template>

<script>
	export default {
		name: "article",
    data(){
		  return{
        content:""
      }
    },
    created(){
		  let self=this, systok= localStorage.getItem('SYSTEMTOKEN'), id= this.$route.query.articleId
      this.axios({
        method: 'get',
        url: '/article/writing/queryDetail/'+systok+'/'+id,
      }).then(function (res) {
        console.log(res)
        self.content=res.data.data.content
      })
    },
    mounted(){
      $(".detail").on("contextmenu", "img",function(e){
        return false;
      });
    }
	}
</script>

<style lang="scss">
.detail{
  padding: 10px 20px;
  overflow: hidden;
  font-size: 16px;
  img{
    max-width: 100%;
  }
  table td{border:1px solid #CCCCCC;}
  a{
    font-weight: bold;
    font-size: 14px;
    color: #4ba7f5;
  }
}
</style>
