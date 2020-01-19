<template>
  <transition name="fade">
    <div class="shelf-title" :class="{'hide-show':ifHideShadow}" v-show="shelfTitleVisible">
      <div class="shelf-title-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="!isShowBack">
        <span class="shelf-title-btn-text " @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="isShowBack">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span class="shelf-title-btn-text "
              @click="onEditClick">{{isEditMode?$t('shelf.cancel'):$t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import {storeShelfMixin} from "../../utils/mixin";
  import {clearLocalForage} from "../../utils/localForage";
  import {clearLocalStorage} from "../../utils/localStorage";

  export default {
    name: "ShelfTitle",
    mixins: [storeShelfMixin],
    props: {
      title: String,
      isShowBack: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        ifHideShadow: true
      }
    },
    watch: {
      offsetY ( offsetY ) {
        if (offsetY > 0) {
          this.ifHideShadow = false;
        } else {
          this.ifHideShadow = true;
        }
      }
    },
    computed: {
      selectedText () {
        const selectedNumber = this.shelfSelected ? this.shelfSelected.length : '0';
        return selectedNumber <= 0 ? this.$t ('shelf.selectBook') : selectedNumber === 1 ? this.$t ('shelf.haveSelectedBook').replace ('$1', selectedNumber) : this.$t ('shelf.haveSelectedBooks').replace ('$1', selectedNumber);
      }
    },
    methods: {
      back () {
        this.$router.go (-1);
        this.setIsEditMode (false);
      },
      onEditClick () {
        if (this.isEditMode) {
          this.setShelfSelected ([]);
          this.shelfList.forEach (item => {
            item.isSelected = false;
            if (item.itemList) {
              item.itemList.forEach (subItem => {
                subItem.selected = false;
              })
            }
          });
        }
        this.setIsEditMode ( !this.isEditMode);
      },
      clearCache () {
        clearLocalForage ();
        clearLocalStorage ();
        this.setShelfList ([]);
        this.setShelfSelected ([]);
        this.getShelfList ();
        this.simpToast (this.$t ('shelf.clearCacheSuccess'));
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .shelf-title {
    position: relative;
    width: 100%;
    top: px2rem(-5);
    height: px2rem(82);
    background-color: white;
    z-index: 130;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-show {
      box-shadow: none;
    }

    .shelf-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(82);
      @include columnCenter;

      .shelf-title-text {
        font-size: px2rem(20);
        line-height: px2rem(40);
        font-weight: bold;
        color: #333333;
      }

      .shelf-title-sub-text {
        font-size: px2rem(16);
        color: #333333;
      }
    }

    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;

      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666666;
      }

      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(30);
      }

      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(30);
      }
    }
  }
</style>
