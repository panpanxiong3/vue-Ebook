<template>
  <div class="shelf-list" :style="{top:shelfListTop}">
    <transition-group name="list" tag="div" id="shelf-list">
      <div class="shelf-list--item-wrapper" v-for="item in data" :key="item.id" :style="{height: itemHeight}">
        <shelf-item :data="item"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import ShelfItem from "./ShelfItem";
  import {storeShelfMixin} from "../../utils/mixin";
  import {px2rem, realPx} from "../../utils/utils";
  import {shelf} from "../../api/store";

  export default {
    name: "ShelfList",
    mixins: [storeShelfMixin],
    props: {
      top: {
        type: Number,
        default: 188
      },
      data:{
        type: Array
      }
    },
    computed: {
      itemHeight () {
        return ( ( window.innerWidth - realPx (60) ) / 3 ) / 250 * 350 + 'px';
      },
      shelfListTop () {
        return px2rem (this.top) + 'rem'
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
    z-index: 100;

    #shelf-list {
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

        &.list-leave-active {
          display: none;
        }

        &.list-move {
          transition: transform .5s;
        }

        .shelf-list-title-wrapper {
          margin-top: px2rem(20);
        }
      }
    }

  }
</style>
