<template>
<div>
  <sub-title title="首页" :link="[{name:'管理中心',to: '/center/manHome'},{name:'通知发布',to:''}]"></sub-title>
  <Form :model="formItem" :label-width="80" style="width: 500px;overflow: hidden;margin: 10px 0;min-height: 600px">
    <FormItem label="通知标题">
      <Input v-model="formItem.title" placeholder="请输入"></Input>
    </FormItem>
    <FormItem label="通知内容">
      <Input v-model="formItem.context" type="textarea" placeholder="请输入" class="textarea"></Input>
    </FormItem>
    <FormItem label="发送对象">
      <Cascader :data="select" v-model="selectv" trigger="hover"></Cascader>
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
        if(this.selectv.length==0){
          this.$Message.error('请选择发送对象！');
          return
        }
        let self= this
        this.$Modal.confirm({
          title: '确定',
          content: '<p>确定发送此通知？</p>',
          onOk: () => {
            //发送对象
            let roleId= this.selectv[0], companyCategory=''
            if (roleId=='2') companyCategory=this.selectv[1]

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
