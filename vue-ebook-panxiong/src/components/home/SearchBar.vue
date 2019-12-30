<template>
  <div>
    <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow':shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-icon-text-wrapper">
            <span class="title-text ">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title':!titleVisible}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title':!titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input" :placeholder="$t('home.hint')" v-model="searchText"
                 @click="showHotSearchVisible">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
  import {storeHomeMixin} from "../../utils/mixin";
  import HotSearchList from "./HotSearchList";

  export default {
    name: "SearchBar",
    mixins: [storeHomeMixin],
    watch: {
      offsetY ( offsetY ) {
        if (offsetY > 0) {
          this.hideTitle ();
          this.showShadow ();
        } else {
          this.showTitle ();
          this.hideShadow ();
        }
      },
      hotSearchOffsetY ( offsetY ) {
        if (offsetY > 0) {
          this.showShadow ();
        } else {
          this.hideShadow ();
        }
      }
    },
    data () {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: false,
        hotSearchVisible: false
      }
    },
    methods: {
      showFlapCard () {
        this.setFlapCardVisible (true);
      },
      back () {
        this.hideHotSearchVisible ();
      },
      hideHotSearchVisible () {
        this.hotSearchVisible = false;
        if (this.offsetY > 0) {
          this.hideTitle ();
          this.showShadow ();
        } else {
          this.showTitle ();
          this.hideShadow ();
        }
      },
      showHotSearchVisible () {
        this.hideTitle ();
        this.hideShadow ();
        this.hotSearchVisible = true;
        this.$nextTick (() => {
          this.$refs.hotSearch.reset ()
        });
      },
      showTitle () {
        this.titleVisible = true
      },
      hideTitle () {
        this.titleVisible = false
      },
      hideShadow () {
        this.shadowVisible = false
      },
      showShadow () {
        this.shadowVisible = true;
      }
    },
    components: {
      HotSearchList
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    width: 100%;
    height: px2rem(188);
    z-index: 150;
    box-shadow: none;

    &.hide-title {
      height: px2rem(108);
    }

    &.hide-shadow {
      box-shadow: 0 px2rem(2) px2rem(10) 0 rgba(0, 0, 0, .1);
    }

    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(84);
      position: absolute;
      top: 0;
      left: 0;


      .title-icon-text-wrapper {
        width: 100%;
        height: px2rem(84);
        @include center;
      }

      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(30);
        top: 0;
        height: px2rem(84);
        @include center;
      }
    }

    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(30);
      top: 0;
      z-index: 200;
      height: px2rem(84);
      @include center;
      transition: top .2s linear;

      &.hide-title {
        top: px2rem(10);
      }
    }

    .search-bar-input-wrapper {
      width: 100%;
      height: px2rem(104);
      padding: px2rem(20);
      margin-bottom: px2rem(30);
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: px2rem(84);
      transition: top .2s linear;
      display: flex;

      &.hide-title {
        top: 0;
      }

      .search-bar-blank {
        flex: 0 0 px2rem(0);
        width: px2rem(0);
        transition: all .2s linear;

        &.hide-title {
          flex: 0 0 px2rem(62);
          width: px2rem(62);
        }
      }

      .search-bar-input {
        flex: 1;
        border-radius: px2rem(30);
        width: 100%;
        background-color: #f4f4f4;
        padding: px2rem(20) px2rem(20);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;

        .icon-search {
          color: #999;
        }

        .input {
          width: 100%;
          height: px2rem(44);
          border: none;
          background: transparent;
          margin-left: px2rem(15);

          &:focus {
            outline: none;
          }

          &::-webkit-input-placeholder {
            color: #666;
          }
        }
      }
    }
  }
</style>
