<template>
<div>
  <sub-title title="上传维修记录" :link="[{name:'管理中心',to: '/center/manHome'},{name:'上传维修记录',to:''}]"></sub-title>
  <Form :model="formItem" :label-width="150">
    <h5>维修基础信息</h5>
    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="车牌号码">
        <Input v-model="formItem.basicInfo.vehicleplatenumber" placeholder="vehicleplatenumber" ></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="维修企业名称">
        <Input v-model="formItem.basicInfo.companyname" placeholder="companyname"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="车辆识别代码">
        <Input v-model="formItem.basicInfo.vin" placeholder="vin"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">

      <Form-item label="送修里程">
        <Input v-model="formItem.basicInfo.repairmileage" placeholder="repairmileage"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="送修日期">
        <Input v-model="formItem.basicInfo.repairdate" placeholder="格式:20100101"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="结算日期">
        <Input v-model="formItem.basicInfo.settledate" placeholder="格式:20100101"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="故障描述">
        <Input v-model="formItem.basicInfo.faultdescription" placeholder="faultdescription"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="结算清单编号">
        <Input v-model="formItem.basicInfo.costlistcode" placeholder="costlistcode"></Input>
      </Form-item>
      </Col>
    </Row>

    <h5>维修配件列表</h5>
    <Table stripe :columns="columns1" :data="formItem.vehiclepartslist"></Table>
    <Button @click="showModal1(false)" style="margin-top: 5px">添加配件</Button>


    <h5>维修项目列表</h5>
    <Table stripe :columns="columns2" :data="formItem.repairprojectlist"></Table>
    <Button @click="showModal2(false)" style="margin-top: 5px">添加项目</Button>


    <Form-item>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
    </Form-item>
  </Form>

  <Modal
    v-model="showModal"
    title="新增维修配件"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <Form :model="modal" :label-width="100">
      <Row v-for="(item, index) in row" :key="index">
        <Col>
        <Form-item v-if="item.type=='input'" :label="item.label" >
          <Input v-model="modal[item.key]" :placeholder="item.key"></Input>
        </Form-item>
        </Col>
      </Row>
    </Form>
  </Modal>
</div>
</template>

<script>
export default {
name: "upload-record",
data() {
  return {
    formItem: {
      access_token: localStorage.getItem("ACCESSTOKEN"),
      basicInfo: {
        vehicleplatenumber: "",
        companyname: this.$store.getters.nickName,
        vin: "",
        repairdate: "",
        repairmileage: "",
        settledate: "",
        faultdescription: "",
        costlistcode: "",
      },
      vehiclepartslist: [],
      repairprojectlist: []
    },
    columns1: [
      {title: '配件名', key: 'partsname'},
      {title: '配件数量', key: 'partsquantity'},
      {title: '配件型号', key: 'partscode'},
      {
        title: '操作', key: 'action', width: 150, align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {type: 'primary', size: 'small'},
              style: {marginRight: '5px'},
              on: {
                click: () => {
                  this.showModal1(params.row)
                  console.log(params.row)
                }
              }
            }, '修改'),
            h('Button', {
              props: {type: 'error', size: 'small'},
              on: {
                click: () => {
                  this.remove(params.index, this.formItem.vehiclepartslist)
                }
              }
            }, '删除')
          ]);
        }
      }
    ],
    columns2: [
      {title: '维修项目', key: 'repairproject'},
      {title: '维修工时', key: 'workinghours'},
      {
        title: '操作', key: 'action', width: 150, align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {type: 'primary', size: 'small'},
              style: {marginRight: '5px'},
              on: {
                click: () => {
                  this.showModal2(params.row)
                  console.log(params.row)
                }
              }
            }, '修改'),
            h('Button', {
              props: {type: 'error', size: 'small'},
              on: {
                click: () => {
                  this.remove(params.index, this.formItem.repairprojectlist)
                }
              }
            }, '删除')
          ]);
        }
      }
    ],
    showModal: false,
    modal:{},//弹出框的临时数据
    row: [],
    tableRow: {table: "1", index: 0, delete: 0}
  }
},
  methods:{
    showModal1(item){
      console.log(item)
      this.row=[
        {label: "配件名", key:"partsname", type:"input", val:(item? item.partsname: "")},
        {label: "配件数量", key:"partsquantity", type:"input", val:(item? item.partsquantity: "")},
        {label: "配件型号", key:"partscode", type:"input", val:(item? item.partscode: "")}
      ]
      if(item){
        this.modal={}
        for(let val of this.row ){
          this.modal[val.key]= val.val
        }
      }else this.modal={}
      this.tableRow= {
        table:"1",
        index: item?item._index:this.formItem.vehiclepartslist.length,
        delete: item? 1: 0
      }
      this.showModal=true
    },
    showModal2(item){
      this.row=[
        {label: "维修项目", key:"repairproject", type:"input", val:(item? item.repairproject: "")},
        {label: "维修工时", key:"workinghours", type:"input", val:(item? item.workinghours: "")},
      ]
      if(item){
        this.modal={}
        for(let val of this.row ){
          this.modal[val.key]= val.val
        }
      }else this.modal={}
      this.tableRow= {
        table:"2",
        index: item?item._index:this.formItem.repairprojectlist.length,
        delete: item? 1: 0
      }
      this.showModal=true
    },
    remove(id, data){
      data.splice(id, 1);
    },
    handleSubmit(){
      let self=this;
      this.axios({
        method: 'post',
        url: '/restservices/lcipprodatarest/lcipprocarfixrecordadd/query',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify(this.formItem)
      }).then(function (response) {
        console.log(response);
        if(response.data.code!='1'){
          self.$Modal.error({
            title: "提交失败",
            content: response.data.status
          })
        }else {
          self.$Modal.success({
            title: "提交成功",
            content: "提交成功"
          })
          self.handleReset()
        }

      }).catch(function (response) {
        self.$Modal.error({
          title: "提交失败",
          content: JSON.stringify(response.response.data.status)
        })
        console.log(response);
      });
    },
    handleReset(){
      for(let key in this.formItem.basicInfo){
        this.formItem.basicInfo[key]=''
      }
      this.formItem.vehiclepartslist= []
      this.formItem.repairprojectlist= []
    },
    ok(){
      for(let key in this.modal){
        if(!this.modal[key]){
          this.$Message.error('请填写完整!');
          return
        }
      }
      this.pushInfo(this.modal)
      this.showModal=false
    },
    pushInfo(data){
      //console.log(data)
      switch (this.tableRow.table){
        case "1": this.formItem.vehiclepartslist.splice(
          this.tableRow.index, this.tableRow.delete,
          {id:data.id, partsname:data.partsname, partsquantity:data.partsquantity, partscode:data.partscode}
        ); break;
        case "2": this.formItem.repairprojectlist.splice(
          this.tableRow.index, this.tableRow.delete,
          {id:data.id, repairproject:data.repairproject, workinghours:data.workinghours,}
        ); break;
      }
    },
    cancel(){
//	        this.$Message.info('点击了取消');
    }
  },
}
</script>

<style scoped>
  h5{
    margin-top: 15px;
    font-size: 22px;
  }
</style>
