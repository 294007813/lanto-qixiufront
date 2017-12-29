<template>
<div class="index">
  <div class="banner">
    <div class="frame">
      <Carousel v-model="banner" loop autoplay :autoplay-speed="8000">
        <CarouselItem>
          <div class="content">
            <img src="../assets/index/banner1.jpg"/>
            <div class="words">
              <p>上海市机动车维修公共服务平台</p>
              <p>为您的美好汽车生活服务</p>
            </div>
            <router-link class="tomore" tag="a" :to="{name: 'about'}">了解更多</router-link>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="content">
            <img src="../assets/index/banner2.jpg"/>
            <div class="words">
              <p>上海市汽车维修电子健康档案</p>
              <p>为每辆汽车建立“一车一档”维修电子健康档案 </p>
            </div>
            <router-link class="tomore" tag="a" :to="{name: 'eCarList'}">了解更多</router-link>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="content">
            <img src="../assets/index/banner3.jpg"/>
            <div class="words">
              <p>蓝途共享配件速运平台</p>
              <p>匹配汽车备件城市配送的多样化、个性化需求，降低物流成本，实现柔性配送</p>
            </div>
            <a class="tomore" href="http://www.lantoev.com/" target="_blank">了解更多</a>
          </div>
        </CarouselItem>
      </Carousel>

      <div class="big-button">
        <div class="button">
          <router-link tag="span" :to="{name: 'eCarList'}">上海市汽车维修电子健康档案登录</router-link>
        </div>
        <div class="button">
          <router-link tag="span" :to="{name: 'login'}">管理部门和行业协会登录</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="map">
    <div class="tit">维修服务</div><br/>
    <keep-alive>
    <my-map type="index" :tolimit="4"></my-map>
    </keep-alive>
  </div>
  <div class="cdf">
    <div class="title">
      <h2>车大夫门诊</h2>
      <a href="javascript:;">更多</a>
    </div>
    <div class="content">
      <div class="left">
        <div class="picWrap">
          <img src="../assets/index/jiuzheng.jpg" alt="">
          <!--<a href="javascript:;" class="click_diagnose">点击就诊</a>-->
          <!--<div class="input_wrap">-->
            <!--<input type="text" placeholder='我的负担车型'>-->
            <!--<input type="text" placeholder='输入描述问题'>-->
          <!--</div>-->
        </div>
        <div class="problemWrap">
          <div class="problems">
            <h3>问题集锦</h3>
            <ul>
              <li>
                <a href="javascript:;">
                  <p ><span>[传动转向]</span>我的汽车排气管冒黑烟，请问怎么回事？该怎么处理？</p>
                  <span>2017-06-23</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p ><span>[车身车架]</span>新车开了5个月左右、四千多公里，还没拉过高速，4S店电话催我去快去做首保。请问这样符合首保要求嘛？另，汽车首保要注意些什么呢?</p>
                  <span>2017-05-28</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p ><span>[传动转向]</span>我的汽车排气管冒黑烟，请问怎么回事？该怎么处理？</p>
                  <span>2017-06-23</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p ><span>[传动转向]</span>转向灯开起来不闪，过几秒就不亮了是什么原因？</p>
                  <span>2017-06-23</span>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <p ><span>[传动转向]</span>我的宝迪依维柯22000公里左右，后右刹车片只要下雨天刹车轻轻的踩上去就抱死，维修站去了二次，就搓搓沙皮打打没几天又毛病重犯了！</p>
                  <span>2017-06-23</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="hot_problem">
            <h3>热门问题</h3>
            <div class="ask">
              <a href="javascript:;">
                <p>我的宝迪依维柯22000公里左右，后右刹车片只要下雨天刹车轻轻的踩上去就抱死，维修站去了二次，就搓搓沙皮打打没几天又毛病重犯了！</p>
                <span>2个回答 179人浏览 发布时间： 2017年05月27日</span>
              </a>
            </div>
            <div class="answer">
              <a href="javascript:;">
                <p>首先检查付水箱里有无机油，如果没有说明机油冷却器没问题。那就要看你所换的机油是什么品牌的，是否两次都在一家单位换的机油。还要注意更换的机油粘度是否过稀。以前你每次保养间隔的公里数是多少等。能提供详细的信息可以帮您的爱车更准确的判断。</p>
                <span>回复时间：2017年05月28日</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <router-link tag="a" :to="{name: 'eRecordList'}" class="car_record" ></router-link>
        <a class="download" ></a>
        <router-link tag="a" :to="{path: '/business/fittings'}" class="mall" ></router-link>
        <a class="lanto_share" href="http://www.lantoev.com/" target="_blank"></a>
      </div>
    </div>
  </div>
  <div class="bottom">
    <ul>
      <li class='public_control'>
        <div class="title">
          <h2>公共管理</h2>
          <a href="javascript:;">更多</a>
        </div>
        <div class="content">
          <div class="wrap">
            <img src="../assets/index/car.png" alt="">
            <div class="detail">
              <h3><router-link tag="a"
                               :to="{path: '/public/article', query: {id: '4', articleId: article1.id}}"
              >{{article1.title}}</router-link></h3>
              <p>{{article1.content}}
                <router-link tag="a"
                             :to="{path: '/public/article', query: {id: '4', articleId: article1.id}}"
              >[详情]</router-link></p>
            </div>
          </div>
          <ul>
            <li v-for="(item, key) in article1.list" :key="key">
              <router-link tag="a"
                           :to="{path: '/public/article', query: {id: '4', articleId: item.articleId}}"
              >{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class='industry_info'>
        <div class="title">
          <h2>行业信息</h2>
          <a href="javascript:;">更多</a>
        </div>
        <div class="content">
          <div class="wrap">
            <img src="../assets/index/machine.jpg" alt="">
            <div class="detail">
              <h3><router-link tag="a"
                               :to="{path: '/association/article', query: {id: '22', articleId: article2.id}}">
                {{article2.title}}</router-link></h3>
              <p>{{article2.content}}
                <router-link tag="a"
                             :to="{path: '/association/article', query: {id: '22', articleId: article2.id}}"
              >[详情]</router-link></p>
            </div>
          </div>
          <ul>
            <li v-for="(item, key) in article2.list" :key="key">
              <router-link tag="a"
                           :to="{path: '/association/article', query: {id: '22', articleId: item.articleId}}"
              >{{item.title}}</router-link>
            </li>

          </ul>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import myMap from '../components/Map.vue'
export default {
  name: 'index',
  data(){
    return{
      banner:0,
      article1:{
        title: '',
        content: '',
        id: '',
        list: []
      },
      article2:{
        title: '',
        content: '',
        id: '',
        list: []
      },
    }
  },
  created(){
    let self=this, systok= localStorage.getItem('SYSTEMTOKEN')
    this.axios({
      method: 'get',
      url: '/article/writing/querylist/'+systok+'/4',
    }).then(function (res) {
      // console.log(res)
      let datas= res.data.data
      self.article1.title= datas[0].title
      self.article1.content= datas[0].content.replace(/<[^>]+>/g,"").substring(0,100)+'...'
      self.article1.id = datas[0].articleId
      datas.shift()
      self.article1.list= datas
    })

    this.axios({
      method: 'get',
      url: '/article/writing/querylist/'+systok+'/22',
    }).then(function (res) {
      // console.log(res)
      let datas= res.data.data
      self.article2.title= datas[0].title
      self.article2.content= datas[0].content.replace(/<[^>]+>/g,"").substring(0,100)+'...'
      self.article2.id = datas[0].articleId
      datas.shift()
      self.article2.list= datas
    })
  },
  mounted(){

  },
  components: {
    myMap
  }
}
</script>

<style lang="scss" scoped>
  .cdf {
    min-width: 800px;
    max-width: 1200px;
    margin: 0 auto;
    .content {
      width: 100%;
      position: relative;
      .left {
        width: 940px;
        height: 400px;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        padding: 10px;
        .picWrap {
          width: 400px;
          height: 287px;
          margin-top: 20px;
          float: left;
          position: absolute;
          img {
            width: 100%;
            height: 100%;
          }
          .click_diagnose {
            width: 110px;
            height: 35px;
            background-color: rgb(114,170,49);
            border-radius: 5px;
            position: absolute;
            left: 0;
            bottom: 0;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 35px;
          }
          .input_wrap {
            width: 100%;
            font-size: 0;
            position: absolute;
            left: 0;
            bottom: -50px;
            input {
              height: 30px;
              text-indent: 2.5em;
              background: url(../assets/index/DLTP.png) no-repeat left center;
              outline: none;
              border: 1px solid #ccc;
              font-size: 12px;
              &:first-child {
                width: 150px;
              }
              &:last-child {
                margin-left: 10px;
                width: 240px;
              }
            }
          }
        }
        .problemWrap {
          margin-left: 420px;
          h3 {
            width: 92px;
            height: 55px;
            font-size: 16px;
            font-weight: 500;
            text-indent: 1.5em;
            line-height: 55px;
            background: url(../assets/index/DLTP1.png) no-repeat left center;
          }
          .problems {
            ul li {
              padding: 0 10px;
              font-size: 12px;
              overflow: hidden;
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              a {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
                color: rgb(2,2,2);
                position: relative;
                p {
                  /*width: 350px;*/
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  /*float: left;*/
                  margin-right: 65px;
                  > span {
                    color: gray;
                    margin-right: 3px;
                  }
                }
                >span {
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
            }
          }
          .hot_problem {
            >div {
              background-color: #fff;
              width: 100%;
              height: 35px;
              margin: 10px 0 0 10px;
              padding: 0 15px 0 35px;
              p {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              span {
                font-size: 12px;
                color: #bbb;
              }
            }
            .ask {
              margin-top: 0;
              background: url(../assets/index/case_ask.jpg) no-repeat left center;
              p {
                color: #4ba7f5;
                font-size: 16px;
                line-height: 20px;
              }
            }
            .answer {
              background: url(../assets/index/case_answer.jpg) no-repeat left center;
              p {
                color: #000;
              }
            }
          }
        }
      }
      .right {
        width: 250px;
        position: absolute;
        right: 0;
        top: 0;
        >a {
          display: block;
          width: 100%;
          height: 200px;
          border-bottom: 1px solid #ccc;
        }
        .car_record {
          background: url(../assets/index/car_record.jpg) no-repeat center;
          -webkit-background-size: contain;
          background-size: contain;
        }
        .download {
          background: url(../assets/index/download.jpg) no-repeat center;
          -webkit-background-size: contain;
          background-size: contain;
        }
        .mall {
          background: url(../assets/index/mall.jpg) no-repeat center;
          -webkit-background-size: contain;
          background-size: contain;
        }
        .lanto_share {
          background: url(../assets/index/lanto_share.jpg) no-repeat center;
          -webkit-background-size: contain;
          background-size: contain;
          border-bottom: none;
        }
      }
    }
  }
  /* 公用头部样式 */
  .title {
    height: 40px;
    &:before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 60%;
      transform: translateY(5px);
      background-color: #ff8330;
      margin-right: 10px;
    }
    h2 {
      display: inline-block;
      font-weight: 500;
      line-height: 40px;
      margin-right: 15px;
    }
    >a {
      font-size: 18px;
      color: #999;
    }
  }
  .bottom {
    max-width: 1200px;
    margin: 15px auto 60px;
    >ul {
      width: 940px;
      &:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
      }
      >li {
        height: 350px;
        width: 50%;
        float: left;
        &:last-child .content{
          margin-left: 0;
        }
        .title {
          &:before {
            background-color: rgb(1,228,167);
          }
        }
        .content {
          border: 1px solid #eee;
          margin-left: 15px;
          padding: 10px;
          overflow: hidden;
          height: 350px;
          .wrap {
            height: 140px;
            border-bottom: 1px solid #ccc;
            img {
              width: 160px;
              height: 120px;
              float: left;
            }
            .detail {
              margin-left: 170px;
              h3 a {
                color: #4ba7f5;
                font-size: 16px;
                font-weight: normal;
                line-height: 32px;
              }
              p {
                color: #999;
                a {
                  font-size: 16px;
                  color: #4ba7f5;
                }
              }
            }
          }
          ul {
            li {
              &:before {
                content: '';
                display: inline-block;
                width: 4px;
                height: 4px;
                background-color: red;
                margin-right: 8px;
                position: relative;
                top: -7px;
              }
              margin: 10px 0;
              a {
                color: #333;
                display: inline-block;
                width: 80%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }

  /*媒体查询*/
  @media screen and (max-width: 1200px){
    .cdf .content .left{
      width: 100%;
    }
    .cdf .content .right{
      position: relative;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      text-align: center;
      a{
        width: 24%;
        display: inline-block;
        margin: 0;
        padding: 0;
        border-bottom: 0 ;
        border-right: 1px solid #e6e6e6;
      }
      a:last-child{
        border:0
      }
    }
    .bottom>ul{
      width: 100%;
    }
  }
</style>

<style  lang="scss">
  .banner{
    text-align: center;
    .frame{
      position: relative;
      width: 100%;
      min-width: 800px;
      max-width: 1200px;
      display: inline-block;
      .ivu-carousel{
        width: 100%;
        height: 300px;
        text-align: left;
        overflow: hidden;
        position: relative;
        .content{
          width: 100%;
          height: 300px;
          overflow: hidden;
          position: relative;
          .words {
            position: absolute;
            left: 10%;
            top: 80px;
            color: white;
            font-size: 32px;
            padding: 5px 25px 5px 0;
            text-align: left;
            p:last-child {
              font-size: 12px;
              margin-top: 10px;
            }
          }
          .tomore {
            position: absolute;
            display: block;
            left: 10%;
            top: 180px;
            color: white;
            font-size: 14px;
            padding: 5px 25px;
            border: 1px solid white;
          }
          .tomore:hover{
            background-color: white;
            color: #2d8cf0;
          }
        }
        img{
          width: auto;
          height: 100%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
        .ivu-carousel-dots{
          bottom: 10px;
          li button{
            background-color: white;
          }
        }
      }
      .big-button{
        width: 250px;
        overflow: hidden;
        height: auto;
        position: absolute;
        top: 0;
        right: 0;
        .button{
          display: table;
          height: 145px;
          width: 100%;
          color: #FFF;
          cursor: pointer;
          text-align: center;
          background: #01e4a7;
          font-size: 24px;
          span{
            display: table-cell;
            vertical-align: middle;
            text-align: center;
          }
        }
        .button:last-child{
          background-color: #03a0f1;
          margin-top: 10px;
        }
      }
    }

  }
  .map{
    text-align: center;
    margin-top: 10px;
    .tit{
      width: 100%;
      min-width: 800px;
      max-width: 1200px;
      padding-left: 5px;
      text-align: left;
      border-left: 5px solid #03a0f1;
      display: inline-block;
      font-size: 18px;
      height: 25px;
      line-height: 25px;
    }
  }
</style>




















