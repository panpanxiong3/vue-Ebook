<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title" :is-show-back="true"></shelf-title>
    <scroll :top="0" :bottom="scrollBottom" class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll"
            v-if="isShowList">
      <shelf-list :top="94" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import {storeShelfMixin} from "../../utils/mixin";
  import Scroll from "../../components/common/Scroll";
  import {shelf} from "../../api/store";
  import ShelfList from "../../components/shelf/ShelfList";
  import {appendAddToShelf} from "../../utils/store";
  import ShelfFooter from "../../components/shelf/ShelfFooter";
  import {getBookShelf, saveBookShelf} from "../../utils/localStorage";

  export default {
    name: "StoreCategory",
    mixins: [storeShelfMixin],
    watch: {
      isEditMode ( boolean ) {
        this.scrollBottom = boolean ? 32 : 0;
        this.$nextTick (() => {
          this.$refs.scroll.refresh ();
        })
      }
    },
    computed: {
      isShowList () {
        return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      }
    },
    data () {
      return {
        scrollBottom: 0
      }
    },
    components: {
      ShelfFooter,
      ShelfList,
      Scroll,
      ShelfTitle,
    },
    methods: {
      getShelfList () {
        let shelfList = getBookShelf ();
        if ( !shelfList) {
          shelf ().then (response => {
            if (response.status === 200 && response.data && response.data.bookList) {
              shelfList = appendAddToShelf (response.data.bookList);
              saveBookShelf (shelfList);
              this.setShelfList (shelfList);
            }
          })
        } else {
          this.setShelfList (shelfList);
        }
      },
      onScroll ( offsetY ) {
        this.setOffsetY (offsetY);
      }
    },
    mounted () {
      this.getCategoryList (this.$route.query.title);
      this.setCurrentType (2);
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

    .store-shelf-empty-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: px2rem(16);
      color: #333333;
      @include center;
    }
  }
</style>
