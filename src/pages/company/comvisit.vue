<template>
<div>
  <sub-title title="上门服务管理"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'上门服务管理',to:''}]"></sub-title>
  <Table :columns="columns1" :data="data1"></Table>
</div>

</template>

<script>
	export default {
		name: "comvisit",
    data(){
      return{
        columns1:[
          {title: '上门服务联系人', key: 'name'},
          {title: '联系方式', key: 'phone'},
          {title: '服务地址', key: 'address'},
          {title: '服务内容', key: 'content'},
          {title: '服务状态', key: 'state'},
          {title: '申请日期', key: 'time'},
        ],
        data1:[]
      }
    },
    beforeMount(){
		  let self= this
      this.axios({
        method: 'get',
        url: '/company/comServiceList/'+ localStorage.getItem("ACCESSTOKEN")
      }).then(function (res) {
        console.log(res.data)
        for(let i in res.data.data) {
          let item = res.data.data[i]
          self.data1.push({
            name: item.linkman,
            phone: item.linktel,
            address: item.address,
            content: item.content,
            state: item.status,
            time: (new Date(item.servicetime).toISOString().split(".")[0].split("T")[0])
          })
        }
      })
    }
	}
</script>

<style scoped>

</style>
