<template>
  <div id='insurance'>
    <sub-title title="汽车保险" :link="[{name:'在线商务',to: ''},{name:'汽车保险',to:''}]"></sub-title>
    <div class="content">
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">中国人寿：95519</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">中国平安：95511</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">中国太平洋保险：95500</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">中国人民保险：95518</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">新华保险：95567</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">泰康保险：95522</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">友邦保险：800-820-3588</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">中国太平：95589</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">阳光保险：95510</span>
        </p>
        <p style="text-indent: 2em;">
          <span style="font-size: 16px;">生命人寿：95535</span>
        </p>
        <p>
          <br>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "insurance",
  data(){
    return{
    
    }
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
  #insurance {
    width: 980px;
    min-height: 700px;
    margin: 10px auto;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 10px;
    .content {
      border: 1px solid #ddd;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      min-height: 620px;
      img {
        width: 100%;
      }
    }
  }
</style>
