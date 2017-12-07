<template>
  <div>
    <l-header></l-header>
    <transition name="fade">
      <router-view/>
    </transition>
    <l-footer></l-footer>
  </div>
</template>

<script>
  import LHeader from './Header.vue'
  import LFooter from './Footer.vue'

  export default {
    name: 'bone',
    components: {
      LHeader,
      LFooter
    },
    beforeCreate(){
      if(!localStorage.getItem("SYSTEMTOKEN")){
        let data = {
          device: uuid(),
          password: "k5pg8kkN",
          username: "pcqixiu"
        }
        this.axios({
          method: 'post',
          url: '/system/terminalsystem/login',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        }).then(function (response) {
          localStorage.setItem("SYSTEMTOKEN", response.data.data.systemToken)
        })
      }

      function  uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        // s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
      }
    },
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
