<template>
<div class="my-frame">
  <sub-title title="请完善资料" :link="[{name:'企业中心',to: ''},{name:'完善资料',to:''}]"></sub-title>
<div class="content">
  <Form :model="formItem" :label-width="150">
    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业名称">
        <Input v-model="formItem.companyname" placeholder="companyname"></Input>
      </Form-item>
      </Col>
      <!--<Col :md="10" :sm="12" :lg="12">-->
      <!--<Form-item label="企业登录密码">-->
      <!--<Input v-model="formItem.companypassword" placeholder="companypassword"></Input>-->
      <!--</Form-item>-->
      <!--</Col>-->
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="道路运输经营许可证号">
        <Input v-model="formItem.companyroadtransportationlicense" placeholder="companyroadtransportationlicense"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业统一社会信用代码">
        <Input v-model="formItem.companyunifiedsocialcreditidentifier" placeholder="companyunifiedsocialcreditidentifier"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业地址(工商注册地址)">
        <Input v-model="formItem.companyaddress.address" placeholder="companyaddress"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业邮政编码">
        <Input v-model="formItem.companypostalcode" placeholder="companypostalcode"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业经济类型">
        <Select v-model="formItem.companyeconomiccategory" placeholder="请选择">
          <Option v-for="(item, key ) in economicCategory" :value="key" :key="item">{{item}}</Option>

        </Select>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业经营业务类别">
        <Select v-model="formItem.companycategory" placeholder="请选择">
          <Option v-for="(item, key ) in category" :value="key" :key="item">{{item}}</Option>

        </Select>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业联系人姓名">
        <Input v-model="formItem.companylinkmanname" placeholder="companylinkmanname"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业联系人联系方式">
        <Input v-model="formItem.companylinkmantel" placeholder="companylinkmantel"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业负责人姓名">
        <Input v-model="formItem.companysuperintendentname" placeholder="companysuperintendentname"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业负责人联系方式">
        <Input v-model="formItem.companysuperintendenttel" placeholder="companysuperintendenttel"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业经营范围">
        <Input v-model="formItem.companybusinessscope" placeholder="companysuperintendentname"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="道路经营许可证开始日期">
        <Input v-model="formItem.roadtransportationlicensestartdate" placeholder="格式:20100101"></Input>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="道路经营许可证结束日期">
        <Input v-model="formItem.roadtransportationlicenseenddate" placeholder="格式:20100101"></Input>
      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业经营状态">
        <Select v-model="formItem.companyoperationstate" placeholder="请选择">
          <Option v-for="(item, key ) in operationState" :value="key" :key="item">{{item}}</Option>

        </Select>
      </Form-item>
      </Col>
    </Row>

    <Row>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业注册区域">
        <Select placeholder="请选择" class="area" v-model="formItem.companyadministrativedivisioncode">
          <Option v-for="(item, key ) in area3" :value="item.areakey" :key="key">{{item.areaname}}</Option>
        </Select>

      </Form-item>
      </Col>
      <Col :md="10" :sm="12" :lg="12">
      <Form-item label="企业邮箱">
        <Input v-model="formItem.companyemail" placeholder="companyemail"></Input>
      </Form-item>
      </Col>
    </Row>

    <Form-item>
      <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
      <!--<Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>-->
    </Form-item>
  </Form>
</div>
</div>
</template>

<script>
	export default {
		name: "complete-info",
    data(){
      return{
        formItem: {
          accessToken: localStorage.getItem('ACCESSTOKEN'),
          companyname: '',
          companypassword: this.calcPass(),
          companyroadtransportationlicense:"31" +
          "",
          companyunifiedsocialcreditidentifier:"",
          companyaddress:{
            address: ''
          },
          companypostalcode:"",
          companyeconomiccategory:"",
          companycategory:"",
          companylinkmanname:"",
          companylinkmantel:"",
          companysuperintendentname:"",
          companysuperintendenttel:"",
          companybusinessscope:"",
          roadtransportationlicensestartdate:"",
          roadtransportationlicenseenddate:"",
          companyoperationstate:"",
          companyadministrativedivisioncode:"",
          companyemail:"",

        },
        economicCategory:{"100":"内资","110":"国有全资","120":"集体全资","130":"股份合作","140":"联营","141":"国有联营","142":"集体联营","143":"国有与集体联营","149":"其他联营","150":"有限责任(公司)","159":"其他有限责任(公司)","160":"股份有限(公司)","170":"私有","171":"私有独资","172":"私有合伙","173":"私营有限责任(公司)","174":"私营股份有限(公司)","175":"个体经营","179":"其他私有","190":"其他内资","200":"港、澳、台投资","210":"内地和港、澳或台合资","220":"内地和港、澳或台合作","230":"港、澳或台独资","240":"港、澳或台投资股份有限(公司)","290":"其他港澳台投资","300":"国外投资","310":"中外合资","320":"中外合作","330":"外资","340":"国外投资股份有限(公司)","390":"其他国外投资","900":"其他"},
        category:{"01":"一类维修经营业务","02":"二类维修经营业务","03":"三类维修经营业务"},
        operationState:{"1":"营业","2":"停业","3":"整改","4":"停业整顿","5":"歇业","6":"注销","9":"其他"},
        area3:[],

      }
    },

    methods:{
      handleSubmit(){
        let self= this;
        for(let key in this.formItem){
          if(!this.formItem[key]){
//				        console.log(this.formItem[key])
            this.$Message.error('请填写完整!');
            return
          }
        }
        this.axios({
          method: 'post',
          url: '/company/repaircompany/edit',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(this.formItem)
        }).then(function (response) {
          console.log(response);
          if(response.data.code!='000000'){
            self.$Modal.error({
              title: "提交失败",
              content: response.data.status
            })
          }else{
            self.$Modal.success({
              title: "提交成功",
              content: "提交成功，请等待审核"
            })
          }

        }).catch(function (response) {
          self.$Modal.error({
            title: "提交失败",
            content: response.response.data? response.response.data.status: "提交失败"
          })
          console.log(response);
        });

      },
      calcPass(){
        var len = 12;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      }
    },
    mounted(){
      var self = this
      this.axios({
        method: 'get',
        url: '/area/county/'+ localStorage.getItem("ACCESSTOKEN")+ '/310100',
      }).then(function (response) {
        if(response.data.code=='0'){
          console.log(response.data)
        }
        let res = response.data.data
        for (let i in res){
          self.area3.push(res[i])
        }
      })
    },
	}
</script>

<style scoped>
.content{
  background-color: #eff0f4;
}
</style>
