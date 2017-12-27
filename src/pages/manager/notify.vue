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
      <!--<Cascader :data="select" v-model="selectv" trigger="hover"></Cascader>-->
      <Select v-model="select1" style="width:100px;float: left;margin-right: 5px">
        <Option value="all" >全部</Option>
        <Option value="1" >车主</Option>
        <Option value="2" >维修企业</Option>
        <Option value="3" >管理部门</Option>
      </Select>
      <Select v-show="select1=='2'" v-model="select2" multiple style="width: 310px;float: left">
        <Option value="43" >一类维修企业</Option>
        <Option value="44" >二类维修企业</Option>
        <Option value="45" >三类维修业户</Option>
      </Select>
    </FormItem>
    <FormItem label="上传附件">
      <Upload :action="this.axios.defaults.baseURL+'/file/add/'+acctok"
              :format="['txt','zip','doc','docx','xls', 'xlsx', 'pdf', 'html']"
              :on-success="upsuccess"
              ref="upload"

      >
        <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
        （仅支持txt、zip、doc、docx、xls、xlsx、pdf）
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
        select:[
          {label: '全部', value: 'all' },
          {label: '车主', value: '1' },
          {label: '维修企业', value: '2', children:[
              {label: '全部', value: 'all' },
              {label: '一类维修企业', value: '43' },
              {label: '二类维修企业', value: '44' },
              {label: '三类维修业户', value: '45' },
            ]},
          {label: '管理部门', value: '3' },
        ],
        select1:'',
        select2:[]
      }
    },
    mounted(){
      this.$Message.config({
        top: 300,
      });
    },
    methods:{
      upsuccess(res,file){
        console.log(res)
        if(res.code=='000000'){
          file.url=res.data.docPath
        }else{
          this.$Message.error(res.status)
          this.$refs.upload.fileList.pop()
        }
      },
		  send(){
        // console.log(this.$refs.upload.fileList)
        //验证
        if(!this.formItem.title) {
          this.$Message.error('请输入标题！');
          return
        }
        if(!this.formItem.context) {
          this.$Message.error('请输入内容！');
          return
        }
        if(!this.select1){
          this.$Message.error('请选择发送对象！');
          return
        }
        if(this.select1=='2' && this.select2.length==0){
          this.$Message.error('请选择维修企业！');
          return
        }
        let self= this
        this.$Modal.confirm({
          title: '确定',
          content: '<p>确定发送此通知？</p>',
          onOk: () => {
            //发送对象
            let roleId= this.select1, companyCategory=[]
            if (roleId=='2') companyCategory=this.select2

            //附件
            let url=[], fileList= this.$refs.upload.fileList
            for (let i in fileList){
              url.push(fileList[i].url)
            }

            //提交
            let param={
              accessToken: this.acctok,
              title: this.formItem.title,
              content: this.formItem.context,
              roleId: roleId,
              companyCategory: companyCategory,
              url: url
            }
            this.axios({
              method: 'post',
              url: '/message/notify/sendNotice',
              headers: {
                'Content-type': 'application/json'
              },
              data: JSON.stringify(param)
            }).then(function (res) {
              console.log(res)
              if(res.data.code= '000000'){
                self.$Message.success("发送成功")
              }else{
                self.$Message.error(res.data.status);
              }
            })
          },
          onCancel: () => {

          }
        });


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
