<template>
<div>
  <sub-title title="绑定车辆" :link="[{name:'车主中心',to: '/center/eRecordList'},{name:'绑定车辆',to:''}]"></sub-title>
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
</template>

<script>
export default {
  name: "bindcar",
  data(){
    return{
      carcard:"",
      vin:""
    }
  },
  methods:{
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
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
