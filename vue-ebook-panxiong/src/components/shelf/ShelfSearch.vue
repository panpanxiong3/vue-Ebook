<template>
  <div class="shelf-search-wrapper" :class="{'shelf-top':ifInputClicked,'hide-show':ifHideShadow}">
    <div class="shelf-search" :class="{'search-top':ifInputClicked}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input type="text" class="search-input" :placeholder="$t('shelf.search')" @click="onSearchClick"
                 v-model="searchText">
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancel" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-table-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item" v-for="(item,index ) in tabs" :key="index" @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text" :class="{'is-selected':item.id === selectedTab}">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {setLocalStorage} from "../../utils/localStorage";
  import {storeShelfMixin} from "../../utils/mixin";

  export default {
    name: "ShelfSearch",
    mixins: [storeShelfMixin],
    computed: {
      lang () {
        return this.$i18n.locale;
      },
      tabs () {
        return [
          {
            id: 1,
            text: this.$t ('shelf.default')
          },
          {
            id: 2,
            text: this.$t ('shelf.progress')
          },
          {
            id: 3,
            text: this.$t ('shelf.purchase')
          }
        ]
      }
    },
    data () {
      return {
        ifInputClicked: false,
        searchText: '',
        selectedTab: 1,
        ifHideShadow: false
      }
    },
    watch: {
      offsetY ( offsetY ) {
        if (offsetY > 0 && this.ifInputClicked) {
          this.ifHideShadow = false;
        } else {
          this.ifHideShadow = true;
        }
      }
    },
    methods: {
      onTabClick ( id ) {
        this.selectedTab = id;
      },
      clearSearchText () {
        this.searchText = ''
      },
      switchLocale () {
        if (this.lang === 'en') {
          this.$i18n.locale = 'cn';
        } else {
          this.$i18n.locale = 'en';
        }
        setLocalStorage ('locale', this.$i18n.locale);
      },
      onSearchClick () {
        this.ifInputClicked = true;
        this.setShelfTitleVisible (false);
      },
      onCancel () {
        this.ifInputClicked = false;
        this.setShelfTitleVisible (true);
        this.clearSearchText ();
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/styles/global";

  .shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(184);
    font-size: px2rem(16);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-show {
      box-shadow: none;
    }

    &.shelf-top {
      position: fixed;
      left: 0;
      top: 0;
    }

    .shelf-search {
      position: absolute;
      top: px2rem(84);
      left: 0;
      z-index: 105;
      width: 100%;
      height: px2rem(104);
      display: flex;
      transition: top .2s linear;

      &.search-top {
        top: 0;
      }

      .search-wrapper {
        flex: 1;
        display: flex;
        margin: px2rem(10) 0 px2rem(10) 0;
        padding: px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);

        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;

          .icon-search {
            font-size: px2rem(12);
          }
        }

        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;

          .search-input {
            width: 100%;
            font-size: px2rem(20);
            border: none;
            color: #333;

            &:focus {
              outline: none;
            }

            &::-webkit-input-placeholder {
              font-size: px2rem(20);
              color: #ccc;
            }
          }
        }

        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;

          .icon-close-circle-fill {
            font-size: px2rem(20);
            color: #666666;
          }
        }
      }

      .icon-locale-wrapper {
        flex: 0 0 px2rem(55);
        @include center;

        .icon-cn .icon-en {
          font-size: px2rem(22);
          color: #666666;
        }
      }

      .cancel-btn-wrapper {
        flex: 0 0 px2rem(85);
        @include center;

        .cancel-text {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }

    .shelf-search-table-wrapper {
      position: absolute;
      top: px2rem(104);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(84);

      .shelf-search-tab-item {
        flex: 1;
        @include center;

        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999999;

          &.is-selected {
            color: #0070ff;
          }
        }
      }
    }
  }

</style>
