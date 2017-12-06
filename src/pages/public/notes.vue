<template>
<div id="notes">
  <sub-title v-if="userType()==3" title="通知管理"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="通知管理"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'通知管理',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="通知管理"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'通知管理',to:''}]"></sub-title>

  <div v-if="userType()==3" class="dblock">
    <h1 class="dtitle">我发送的通知</h1>
    <Table border :columns="columns1" :data="data1"></Table>
  </div>

  <div class="dblock">
    <h1 class="dtitle">我收到的通知</h1>
    <Table border :columns="columns2" :data="data2"></Table>
  </div>

</div>
</template>

<script>
	export default {
		name: "notes",
    data(){
		  return{
        columns1: [
          {title: '通知标题', key: 'title', },
          {title: '通知内容', key: 'content', },
          {title: '通知日期', key: 'date', align: 'center',width: 150},
          {title: '查看详情', key: 'id', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id)
                      this.$router.push({
                        path:'/center/noteDetail',
                        query:{id: params.row.id, from: 'my'}
                      })
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        data1: [],
        columns2: [
          {title: '通知标题', key: 'title', },
          {title: '通知内容', key: 'content',},
          {title: '通知发送人', key: 'sendMan', align: 'center',width: 120},
          {title: '通知日期', key: 'date', align: 'center',width: 100},
          {title: '是否已读', key: 'isReaded', align: 'center',width: 100},
          {title: '查看详情', key: 'id', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id)
                      this.$router.push({
                        path:'/center/noteDetail',
                        query:{id: params.row.id}
                      })
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
        data2: []
      }
    },
    mounted(){
		  let self=this, acctok= localStorage.getItem('ACCESSTOKEN')
      //查询我发送的通知
      if(this.userType()=='3'){
        this.axios({
          method: 'get',
          url: '/message/notify/getSendNotify/'+acctok,
          headers: {
            'Content-type': 'application/json'
          },
        }).then(function (res) {
          // console.log(res)
          let datas=res.data.data, content=''
          for( let i in datas){
            content= JSON.parse(datas[i].content).content
            self.data1.push({
              id: datas[i].notifyId,
              title: datas[i].title,
              content: content.substring(0,10)+'...',
              date: (new Date(datas[i].sendtime).toISOString().split(".")[0].split("T")[0])
            })
          }
        })
      }

      //查询我收到的通知
      this.axios({
        method: 'get',
        url: '/message/notify/getReceiveNotify/'+acctok,
        headers: {
          'Content-type': 'application/json'
        },
      }).then(function (res) {
        console.log(res)
        let datas=res.data.data, content=''
        for( let i in datas){
          content= JSON.parse(datas[i].content).content
          self.data2.push({
            id: datas[i].notifyId,
            title: datas[i].title,
            content: content.substring(0,10)+'...',
            sendMan: (datas[i].nickName? datas[i].nickName: datas[i].mobile),
            date: (new Date(datas[i].sendtime).toISOString().split(".")[0].split("T")[0]),
            isReaded: (datas[i].read?'已读':'未读'),
            cellClassName: {
              isReaded: datas[i].read?'readed':'unReaded'
            }
          })
        }
      })
    },
    methods:{
      userType(){
        return this.$store.getters.userType
      },
    }
	}
</script>

<style scoped lang='scss'>

</style>

<style lang='scss'>
  #notes {
    .readed {
      color: forestgreen;
    }
    .unReaded {
      color: red;
    }
  }
</style>
