<template>
<div>
  <sub-title v-if="userType()==3" title="首页"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="首页"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="首页"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <Form :model="formItem" :label-width="80" inline style="margin: 20px 0">
    <FormItem label="车牌号">
      <Input v-model="formItem.vehicleplatenumber" placeholder="请输入"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="search" >搜索</Button>
    </FormItem>
  </Form>

  <Table :columns="columns" :data="data" border></Table>
  <Page :total="total" show-sizer style="margin: 10px 0" @on-change="onchange" @on-page-size-change="sizechange"></Page>
</div>
</template>

<script>
export default {
  name: "e-record-list",
  data(){
    return{
      formItem:{
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        vehicleplatenumber:"",
        limit: 10,
        page: 1
      },
      columns:[
        {title: '序号', key: 'order'},
        {title: '车牌号码', key: 'card'},
        {title: '车架号', key: 'vin'},
        {title: '维修企业名称', key: 'comname'},
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
                      path:'/center/eRecordDetail',
                      query:{id: params.row.id}
                    })
                  }
                }
              }, '查看'),
            ]);
          }
        }
      ],
      data:[],
      total:0,

    }
  },
  beforeMount(){
    this.search()
  },
  methods:{
    userType(){
      return this.$store.getters.userType
    },
    search(){
      let self= this
      this.axios({
        method: 'post',
        url: '/vehicle/carfile/query',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(self.formItem)
      }).then(function (response) {
        console.log(response)
        let info= response.data.data, datas= response.data.data.content;
        self.total=info.totalElements;
        self.data=[]
        for (let i in datas){
          self.data.push({
            id: datas[i].repairbasicinfoId,
            order:  parseInt(i)+1,
            card: datas[i].vehicleplatenumber,
            vin: datas[i].vin,
            comname: datas[i].companyname
          })
        }
      })
    },
    onchange(page){
      console.log(page)
      this.formItem.page= page
      this.search()
    },
    sizechange(limit){
      this.formItem.limit= limit
      this.search()
    }
  },
}
</script>

<style scoped>

</style>
