<template>

  <div class="home">
    <span class="text">aaddjd</span>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
  name: 'home',
  computed: {
    ...mapGetters(['test'])
  },
  mounted () {
    this.$store.dispatch('setTest', 9).then(() => {
      console.log(this.test);
    })
  }
  }
  document.addEventListener('DOMContentLoad', () => {
    const html = document.querySelector('html');
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    console.log(fontSize);
    html.style.fontSize = fontSize;
  })
</script>

<style lang="scss" scoped>
  @import './../assets/styles/global';
  .text{
    color: #42b983;
    font-size: px2rem(60);
    font-weight: bold;
  }
</style>
