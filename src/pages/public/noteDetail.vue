<template>
<div>
  <sub-title v-if="userType()==3" title="通知详情"
             :link="[{name:'管理中心',to: '/center/manHome'},
             {name:'通知管理',to:'/center/notes'},{name:'通知详情',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="通知详情"
             :link="[{name:'企业中心',to: '/center/comHome'},
             {name:'通知管理',to:'/center/notes'},{name:'通知详情',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="通知详情"
             :link="[{name:'车主中心',to: '/center/perHome'},
             {name:'通知管理',to:'/center/notes'},{name:'通知详情',to:''}]"></sub-title>
  <div class="dblock">
    <h1 v-if="this.$route.query.from" class="dtitle">我发送的通知</h1>
    <h1 v-else class="dtitle">我收到的通知</h1>
    <Form  :label-width="80" style="width: 500px;overflow: hidden;margin: 10px 0">
      <FormItem label="通知标题">
        <Input v-model="title" readonly></Input>
      </FormItem>
      <FormItem label="通知内容">
        <Input v-model="context" type="textarea" class="textarea" readonly></Input>
      </FormItem>
      <FormItem label="附件下载">
        <p v-for="(item, key) in url" :key="key"><a :href="item">{{item}}</a></p>
      </FormItem>
    </Form>
  </div>

  <div v-if="this.$route.query.from" class="dblock">
    <h1 class="dtitle">收件人列表</h1>
    <Table border :columns="columns" :data="data"></Table>
    <Page :total="total" show-sizer style="margin: 10px 0"
          @on-change="onchange" @on-page-size-change="sizechange"></Page>
  </div>
  <Button type="primary" @click="back" style="margin-bottom: 10px">后退</Button>
</div>
</template>

<script>
	export default {
		name: "note-detail",
    data(){
		  return{
        title:"",
        context:"",
        url:[],
        columns:[
          {title: '收件方', key: 'to'},
          {title: '是否已读', key: 'isreaded'},
          {title: '发送时间', key: 'date'}
        ],
        data:[],
        limit: 10,
        page: 1,
        total: 0
      }
    },
    beforeMount(){
      let id= this.$route.query.id, acctok= localStorage.getItem('ACCESSTOKEN'), url='',self= this
      if(this.$route.query.from=='my'){
        url='/message/notify/getSendNotify/'
        this.getList()
      }else{
        url='/message/notify/getReceiveNotify/'
        let param={
          accessToken: acctok,
          notifyId: id
        }
        this.axios({
          method: 'patch',
          url: '/message/notify/update',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then(function (res) {
          console.log(res)
        })
      }
      this.axios({
        method: 'get',
        url: url+ acctok
      }).then(function (res) {
        // console.log(res)
        let datas=res.data.data
        for(var i in datas){
          if(datas[i].notifyId== id ){
            // console.log(datas[i])
            self.title= datas[i].title
            self.context= JSON.parse(datas[i].content).content
            self.url= JSON.parse(datas[i].content).url

          }
        }
      })
    },
    methods:{
      userType(){
        return this.$store.getters.userType
      },
      getList(){
        let id= this.$route.query.id, acctok= localStorage.getItem('ACCESSTOKEN'), self=this,
          param={
            accessToken: acctok,
            noticeId: id,
            limit: this.limit,
            page: this.page
          }
        this.axios({
          method: 'post',
          url: '/message/notify/getReceiveList/'+id+"/"+acctok ,
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then(function (res) {
          // console.log(res)
          let datas= res.data.noticeReceiveDataPage.content
          self.data=[]
          for( let i in datas){
            self.data.push({
              to:(datas[i].companyname?datas[i].companyname:(datas[i].nickName?datas[i].nickName:datas[i].mobile)),
              isreaded:(datas[i].read?'已读':'未读'),
              date: (new Date(datas[i].receiveTime).toISOString().split(".")[0].split("T")[0]),
              cellClassName: {
                isreaded: datas[i].read?'readed':'unReaded'
              }
            })
          }
          self.total= res.data.noticeReceiveDataPage.totalElements
        })
      },
      onchange(page){
        this.page= page
        this.getList()
      },
      sizechange(limit){
        this.limit= limit
        this.getList()
      },
      back(){
        this.$router.go(-1)
      }
    }
	}
</script>

<style lang="scss">
.textarea{
  textarea{
    height: 300px;
  }
}
.readed {
  color: forestgreen;
}
.unReaded {
  color: red;
}
</style>
