<template>
<div class="sub-title">
  <span class="left">{{title}}</span>
    <Breadcrumb class="right">您的位置：
      <BreadcrumbItem v-for="(item, index) in link" :to="item.to" :key="index">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
</div>
</template>

<script>
export default {
  name: "sub-title",
  props:['title', 'link'],
  mounted(){
    // console.log( this.link)
  }
}
</script>

<style scoped lang="scss">
.sub-title{
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #4ba7f5;
  .left{
    font-size: 18px;
    color: #4ba7f5;
  }
  .right{
    float: right;
  }
}
</style>
