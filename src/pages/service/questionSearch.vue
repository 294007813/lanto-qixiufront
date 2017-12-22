<template>
  <div id="questionSearch">
    <div class="pro_wrap clearFix">
      <div class="pro_left">
        <sub-title title="问题集锦" :link="[{name:'车大夫门诊',to: 'carDoctor'},{name:'问题集锦',to:''}]"></sub-title>
        <div class="search_box">
          <Input v-model="searchKeyWords" placeholder="请输入问题关键字" style="width: 400px"></Input><Button type="primary" icon="ios-search">查询</Button>
        </div>
        <div class="search_category">
          <span>按汽车品牌查找:</span>
          <Select v-model="carBrand" size="small" style="width:100px">
            <Option v-for="item in carBrandList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span class="sc_pro_type">按故障类型查找:</span>
          <Select v-model="troubleType" size="small" style="width:100px">
            <Option v-for="item in troubleTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Table border :columns="columns" :data="tableData"></Table>
      </div>
      <professor-list></professor-list>
    </div>
  </div>
</template>

<script>
import ProfessorList from "../../components/ProfessorList";

export default {
  components: {ProfessorList},
  name: "questionSearch",
  data(){
    return{
      searchKeyWords: '',  // 查询关键字
      carBrand: '',        // 汽车品牌查找
      troubleType: '',      // 故障类型查找
      carBrandList: [
        {
          value: '全部品牌',
          label: '全部品牌'
        },
        {
          value: '奥迪',
          label: '奥迪'
        },
        {
          value: '宝骏',
          label: '宝骏'
        },
        {
          value: '宝马',
          label: '宝马'
        },
        {
          value: '别克',
          label: '别克'
        },
        {
          value: '长安',
          label: '长安'
        }
      ],
      troubleTypeList: [
        {
          value: '',
          label: '--请选择--'
        },
        {
          value: '发动机',
          label: '发动机'
        },
        {
          value: '变速箱',
          label: '变速箱'
        },
        {
          value: '空调',
          label: '空调'
        },
        {
          value: '传动转向',
          label: '传动转向'
        },
        {
          value: '车身车架',
          label: '车身车架'
        },
      ],
      columns: [
        {
          title: '问题',
          key: 'problem',
          width: 350
        },
        {
          title: '时间',
          key: 'date',
          align: 'center',
          width: 100
        },
        {
          title: '查看次数',
          key: 'count',
          align: 'center'
        },
        {
          title: '查看详情',
          align: 'center',
          key: 'id',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: ()=> {
                    console.log(params.row.id)
                    this.$router.push({
                      path:'',
                      query:{id: params.row.id}
                    })
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      tableData: [
        {
          problem: '新车怎么保养?',
          date: '2017-10-12',
          count: '0',
          id: 1
        },
        {
          problem: '新车怎么保养?',
          date: '2017-10-12',
          count: '0',
          id: 2
        }
      ]
    }
  },
  beforeCreate(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  #questionSearch {
    .clearFix {
      &:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
      }
      zoom: 1;
    }
    .pro_wrap {
      width: 980px;
      margin: 0 auto;
      .pro_left {
        width: 690px;
        min-height: 800px;
        border: 1px solid #d4d4d4;
        margin: 10px 0;
        float: left;
        padding: 10px;
        .search_box {
          width: 473px;
          margin: 20px auto;
        }
        .search_category {
          width: 420px;
          margin: 0 auto 30px;
          .sc_pro_type {
            margin-left: 30px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  #questionSearch {
    .pro_left .search_box {
      input, button{
        border-radius: 0;
      }
    }
  }
</style>
