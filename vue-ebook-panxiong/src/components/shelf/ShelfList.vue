<template>
  <div class="shelf-list">
    <div class="shelf-list--item-wrapper" v-for="item in shelfList " :key="item.id" :style="{height: itemHeight}">
      <shelf-item :data="item"></shelf-item>
      <div class="shelf-list-title-wrapper">
        <span class="shelf-list-title title-small">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import ShelfItem from "./ShelfItem";
  import {storeShelfMixin} from "../../utils/mixin";
  import {realPx} from "../../utils/utils";

  export default {
    name: "ShelfList",
    mixins: [storeShelfMixin],
    computed: {
      itemHeight () {
        return ( ( window.innerWidth - realPx (60) ) / 3 ) / 250 * 350 + 'px';
      }
    },
    components: {ShelfItem}
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .shelf-list {
    position: absolute;
    left: 0;
    width: 100%;
    top: px2rem(188);
    z-index: 100;
    display: flex;
    flex-flow: row wrap;
    padding: 0 px2rem(30);
    box-sizing: border-box;

    .shelf-list--item-wrapper {
      flex: 0 0 33.33;
      width: 33.33%;
      padding: px2rem(30);
      box-sizing: border-box;
      margin-bottom: px2rem(45);

      .shelf-list-title-wrapper {
        margin-top: px2rem(20);
      }
    }
  }
</style>
