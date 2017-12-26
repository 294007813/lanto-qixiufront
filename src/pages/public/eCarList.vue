<template>
<div>
  <sub-title v-if="userType()==3" title="首页"
             :link="[{name:'管理中心',to: '/center/manHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==2" title="首页"
             :link="[{name:'企业中心',to: '/center/comHome'},{name:'电子健康档案',to:''}]"></sub-title>
  <sub-title v-if="userType()==1" title="首页"
             :link="[{name:'车主中心',to: '/center/perHome'},{name:'电子健康档案',to:''}]"></sub-title>

  <div class="dblock" v-if="userType()==1">
    <h1 class="dtitle">绑定车辆</h1>
    <Form  :label-width="80" style="width: 500px;overflow: hidden;margin: 10px 0">
      <FormItem label="车牌号码">
        <Input v-model="carcard" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="车架号（VIN）">
        <Input v-model="vin" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="绑定车辆">
        <Button type="primary" @click="bindCar" >绑定</Button>
      </FormItem>
    </Form>
  </div>

  <div class="dblock" style="display: block">
    <h1 class="dtitle" v-if="userType()==1">汽车列表</h1>
  <Form :model="formItem" :label-width="80" inline style="margin: 20px 0">
    <FormItem label="车牌号">
      <Input v-model="formItem.vehicleplatenumber" placeholder="请输入"></Input>
    </FormItem>
    <!--<FormItem>-->
      <Button type="primary" @click="search" >搜索</Button>
    <!--</FormItem>-->
  </Form>
  <Table :columns="columns" :data="data" border></Table>
  <Page :total="total" show-sizer style="margin: 10px 0" @on-change="onchange" @on-page-size-change="sizechange"></Page>
  </div>
</div>
</template>

<script>
export default {
  name: "e-record-list",
  data(){
    return{
      carcard: '',
      vin:'',
      formItem:{
        accessToken: localStorage.getItem('ACCESSTOKEN'),
        vehicleplatenumber:"",
        limit: 10,
        page: 1
      },
      columns:[
        {title: '序号', key: 'order', width: 70},
        {title: '车牌号码', key: 'card'},
        {title: '车架号', key: 'vin'},
        {title: '操作', key: 'id', width: 150, align: 'center',
          render: (h, params) => {
            if(this.userType()=='1')
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row.id)
                    this.$router.push({
                      path:'/center/eRecordList',
                      query:{id: params.row.vin}
                    })
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // console.log(params.row.id)
                    this.unBind(params.row.id)
                  }
                }
              }, '解绑'),
            ]);
            else
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id)
                      this.$router.push({
                        path:'/center/eRecordList',
                        query:{id: params.row.vin}
                      })
                    }
                  }
                }, '查看'),
              ])
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
        url: '/vehicle/owner/queryVehicelist',
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
            id: datas[i].vehicleId,
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
    },
    bindCar(){
      if(!this.carcard.trim()||!this.vin.trim()){
        this.$Message.error("请填写完整")
        return
      }
      let self=this, param={
        "accessToken": localStorage.getItem('ACCESSTOKEN'),
        "vehicleplatenumber": this.carcard.trim(),
        "vin": this.vin.trim()
      }
      this.axios({
        method: 'post',
        url: '/vehicle/owner/bind',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(param)
      }).then(function (res) {
        console.log(res)
        if(res.data.code='000000'){
          self.$Message.success(res.data.status)
          self.search()
        }
      })
    },
    unBind(id){
      let self= this
      this.axios({
        method: 'get',
        url: '/vehicle/owner/unbund/'+ id+ '/'+ localStorage.getItem('ACCESSTOKEN')
      }).then(res =>{
        console.log(res)
        self.$Message.success('解绑成功')
        self.formItem.page= 1
        self.search()
      })
    }
  },
}
</script>

<style scoped>

</style>
