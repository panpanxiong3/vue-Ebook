<template>
  <div class="store-home">
    <search-bar></search-bar>
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
  import Scroll from "../../components/common/Scroll";
  import {storeHomeMixin} from "../../utils/mixin";

  export default {
    name: "storeHome",
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll
    },
    data () {
      return {
        scrollTop: 188
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
    }
  }
</script>

<style scoped lang="scss">
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
