<template>
  <transition name="">
    <div class="shelf-footer" v-show="isEditMode">
      <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item"
           @click="onTabClick">
        <div class="shelf-footer-tab" :class="{'is-selected':isSelected}">
          <div class="icon-private tab-icon" v-if="item.index === 1"></div>
          <div class="icon-download tab-icon" v-if="item.index === 2"></div>
          <div class="icon-move tab-icon" v-if="item.index === 3"></div>
          <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
          <div class="tav-text">{{item.label}}</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import {storeShelfMixin} from "../../utils/mixin";

  export default {
    name: "ShelfFooter",
    mixins: [storeShelfMixin],
    computed: {
      isSelected () {
        return this.shelfSelected && this.shelfSelected.length > 0
      },
      tabs () {
        return [
          {
            label: this.$t ('shelf.private'),
            label2: this.$t ('shelf.noPrivate'),
            index: 1
          },
          {
            label: this.$t ('shelf.download'),
            label2: this.$t ('shelf.delete'),
            index: 2
          },
          {
            label: this.$t ('shelf.move'),
            index: 3
          },
          {
            label: this.$t ('shelf.remove'),
            index: 4
          }
        ]
      }
    },
    methods: {
      onTabClick () {
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    width: 100%;
    height: px2rem(96);
    background-color: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
    display: flex;

    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;


      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include columnCenter;

        &.is-selected {
          opacity: 1;
        }

        .tab-icon {
          font-size: px2rem(20);
          color: #666666;

        }

        .tav-text {
          margin-top: px2rem(10);
          font-size: px2rem(12);
          color: #666666;

        }
      }
    }
  }
</style>