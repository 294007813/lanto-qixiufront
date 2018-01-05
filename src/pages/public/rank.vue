<template>
<div>
  <sub-title title="2016年度全市机动车维修企业诚信考核等级" :link="[{name:'公共管理',to: ''},{name:'质量信誉考核信息',to:''}]"></sub-title>
  <Table size="small" :columns="columns1" :data="data1" :loading="loading" border stripe></Table>
  <Page :total="total" show-sizer placement="top"
        @on-change="change" @on-page-size-change="sizeChange"
        style="margin: 10px 0"></Page>
</div>
</template>

<script>
	export default {
		name: "rank",
    data(){
		  return{
        columns1:[
          {title: '排名', key: 'rank', width: 80},
          {title: '业户名称', key: 'name'},
          {title: '经营地址', key: 'address'},
          {title: '信誉等级', key: 'level', width: 100},
        ],
        data1:[],
        total: 0,
        limit: 10,
        page: 1,
        loading: true
      }
    },
    beforeMount(){
      this.getInfo()
    },
    methods:{
      getInfo(){
        let self= this, param={
          accessToken: localStorage.getItem('SYSTEMTOKEN'),
          limit: this.limit,
          page: this.page
        }
        this.loading= true
        this.axios({
          method: 'post',
          url: '/company/getRangeCompany',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(param)
        }).then(function (res) {
          console.log(res.data)
          let data= res.data.data.content
          self.total= res.data.data.totalElements;
          self.data1= []
          for( let i in data){
            self.data1.push({
              rank: data[i].id,
              name: data[i].companyname,
              address: data[i].businessAddress,
              level: self.grad(data[i].grade),
            })
          }
          self.loading=false
        })
      },
      grad(level){
        let res=''
        switch (level){
          case 97: res='AAA'; break
          case 98: res='AA'; break
          case 99: res='A'; break
          case 100: res='B'; break
          case 101: res='未考核'; break
          default: res='未考核';
        }
        return res
      },
      change(page){
        this.page= page
        this.getInfo()
      },
      sizeChange(limit){
        this.limit= limit
        this.getInfo()
      }
    }
	}
</script>

<style scoped>

</style>
