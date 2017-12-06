<template>
<div>
  <sub-title title="通知发布" :link="[{name:'管理中心',to: '/center/manHome'},{name:'通知发布',to:''}]"></sub-title>
  <Form :model="formItem" :label-width="80" style="width: 500px;overflow: hidden;margin: 10px 0">
    <FormItem label="通知标题">
      <Input v-model="formItem.title" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="通知内容">
      <Input v-model="formItem.context" type="textarea" placeholder="请输入" class="textarea"></Input>
    </FormItem>
    <FormItem label="发送对象">
      <Cascader :data="select" v-model="selectv"></Cascader>
    </FormItem>
    <FormItem label="上传附件">
      <Upload :action="this.axios.defaults.baseURL+'/file/add/'+acctok"

      >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
      </Upload>
    </FormItem>
    <FormItem label="发送通知">
      <Button type="primary" @click="send" >发送</Button>
    </FormItem>
  </Form>
</div>
</template>

<script>
	export default {
		name: "notify",
    data(){
		  return{
        formItem:{
          title:"",
          context:""
        },
        acctok: localStorage.getItem('ACCESSTOKEN'),
        selectv:[],
        selectv:[
          {label: '全部', value: 'all' },
          {label: '车主', value: '1' },
          {label: '维修企业', value: '2' },
          {label: '管理部门', value: '3' },
        ]
      }
    },
    methods:{
		  send(){

      }
    }
	}
</script>

<style  lang="scss">
.textarea{
  textarea{
    height: 300px;
  }
}
</style>
