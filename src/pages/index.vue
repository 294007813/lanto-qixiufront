<template>
<div class="index">
<div class="banner">
  <Carousel v-model="banner" loop>
    <CarouselItem>
      <div class="content">
        <img src="../assets/index/banner1.jpg"/>
        <div class="words">
          <p>上海市机动车维修公共服务平台</p>
          <p>足不出户，为您的爱车排忧解难</p>
        </div>
        <div class="tomore">了解更多</div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="content">
        <img src="../assets/index/banner2.jpg"/>
        <div class="words">
          <p>上海市汽车维修电子健康档案</p>
          <p>为每辆汽车建立“一车一档”维修电子健康档案 </p>
        </div>
        <div class="tomore">了解更多</div>
      </div>
    </CarouselItem>
    <CarouselItem>
      <div class="content">
        <img src="../assets/index/banner3.jpg"/>
        <div class="words">
          <p>蓝途共享配件速运平台</p>
          <p>匹配汽车备件城市配送的多样化、个性化需求，降低物流成本，实现柔性配送</p>
        </div>
        <div class="tomore">了解更多</div>
      </div>
    </CarouselItem>
  </Carousel>
</div>
<div class="map">
<div class="title">维修服务</div>
<my-map></my-map>
</div>

</div>
</template>

<script>
import myMap from './map.vue'
export default {
  name: 'index',
  data(){
    return{
      banner:0
    }
  },
  components: {
    myMap
  }
}
</script>

<style  lang="scss">
.banner{
  text-align: center;
  .ivu-carousel{
    width: 100%;
    height: 300px;
    min-width: 800px;
    max-width: 1200px;
    display: inline-block;
    text-align: left;
    overflow: hidden;
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
}
.map{
  text-align: center;
  margin-top: 10px;
  .title{
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
