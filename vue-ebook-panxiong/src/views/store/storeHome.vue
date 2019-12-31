<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
      </div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";
  import FlapCard from "../../components/home/FlapCard";
  import Scroll from "../../components/common/Scroll";
  import {storeHomeMixin} from "../../utils/mixin";
  import {home} from "../../api/store";

  export default {
    name: "storeHome",
    mixins: [storeHomeMixin],
    components: {
      FlapCard,
      SearchBar,
      Scroll
    },
    data () {
      return {
        scrollTop: 188,
        random: null
      }
    },
    methods: {
      onScroll ( offsetY ) {
        this.setOffsetY (offsetY);
        if (offsetY > 0) {
          this.scrollTop = 108;
        } else {
          this.scrollTop = 188;
        }
        this.$refs.scroll.refresh ();
      }
    },
    mounted () {
      home ().then (response => {
        if (response && response.status === 200) {
          const data = response.data;
          const randomIndex = Math.floor (Math.random () * data.random.length);
          this.random = data.random[ randomIndex ];
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
