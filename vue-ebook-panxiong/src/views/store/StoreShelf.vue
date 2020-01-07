<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll :top="0" class="store-shelf-scroll-wrapper">
      <shelf-search></shelf-search>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import {storeShelfMixin} from "../../utils/mixin";
  import Scroll from "../../components/common/Scroll";
  import ShelfSearch from "../../components/shelf/ShelfSearch";

  export default {
    name: "StoreShelf",
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfSearch
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: white;

    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
