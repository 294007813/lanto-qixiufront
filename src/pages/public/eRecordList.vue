<template>
<div>
  <sub-title v-if="userType()==3" title="汽车维修电子健康档案"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="汽车维修电子健康档案"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="汽车维修电子健康档案"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <Form :model="formItem" :label-width="80" inline style="margin: 20px 0">
    <FormItem label="送修日期">
      <DatePicker type="daterange" v-model="repDate" format="yyyy年MM月dd日" placeholder="请选择日期范围" style="width: 230px"></DatePicker>
    </FormItem>
    <FormItem label="结算日期">
      <DatePicker type="daterange" v-model="setDate" format="yyyy年MM月dd日" placeholder="请选择日期范围" style="width: 230px"></DatePicker>
    </FormItem>
    <Button type="primary" @click="search" >搜索</Button>
    <Button  @click="reset" >重置</Button>
  </Form>

  <Table :columns="columns" :data="data" border></Table>
  <Page :total="total" show-sizer style="margin: 10px 0" @on-change="onchange" @on-page-size-change="sizechange"></Page>

  <Button type="primary" @click="back" >后退</Button>
</div>
</template>

<script>
export default {
  name: "e-record-list",
  data(){
    return{
      repDate:[],
      setDate: [],
      formItem:{
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        repairStartTime:'',
        repairEndTime:'',
        settleStartTime:'',
        settleEndTime:'',
        vin: this.$route.query.id,
        limit: 10,
        page: 1
      },
      columns:[
        {title: '序号', key: 'order', width: 70},
        {title: '车牌号码', key: 'card'},
        {title: '车架号', key: 'vin'},
        {title: '送修日期', key: 'repairdate'},
        {title: '结算日期', key: 'settledate'},
        {title: '操作', key: 'id', width: 90, align: 'center',
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
              }, '详情'),
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
      if(this.repDate.length){
        this.formItem.repairStartTime= this.repDate[0]
        this.formItem.repairEndTime= this.repDate[1]
      }else{
        this.formItem.repairStartTime= ''
        this.formItem.repairEndTime= ''
      }
      if(this.setDate.length){
        this.formItem.settleStartTime= this.setDate[0]
        this.formItem.settleEndTime= this.setDate[1]
      }else{
        this.formItem.settleStartTime= ''
        this.formItem.settleEndTime= ''
      }
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
            comname: datas[i].companyname,
            repairdate: datas[i].repairdate,
            settledate: datas[i].settledate
          })
        }
      })
    },
    reset(){
      this.repDate=[]
      this.setDate=[]
      this.search()
    },
    onchange(page){
      console.log(page)
      this.formItem.page= page
      this.search()
    },
    sizechange(limit){
      this.formItem.limit= limit
      this.search()
    },
    back(){
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
  .ivu-page:after{
    display: inline;
  }
</style>
