<template>
  <div>
    <sub-title title="我的上门服务"
               :link="[{name:'车主中心',to: '/center/eRecordList'},{name:'我的上门服务',to:''}]"></sub-title>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  export default {
    name: "myvisit",
    data(){
      return{
        columns1:[
          {title: '服务内容', key: 'content'},
          {title: '服务状态', key: 'state', width: 100},
          {title: '公司名称', key: 'comname', width: 250},
          {title: '申请日期', key: 'time', width: 100},
        ],
        data1:[]
      }
    },
    beforeMount(){
      let self= this;
      this.axios({
        method: 'get',
        url: '/company/serviceList/'+ localStorage.getItem("ACCESSTOKEN")
      }).then(function (res) {
        console.log(res.data)
        for(let i in res.data.data){
          let item= res.data.data[i]
          self.data1.push({
            content: item.content,
            time: (new Date(item.servicetime).toISOString().split(".")[0].split("T")[0]),
            comname: item.companyname
          })
        }
      })
    }
  }
</script>

<style scoped>

</style>

