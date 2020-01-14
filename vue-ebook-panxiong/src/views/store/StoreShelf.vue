<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll :top="0" :bottom="scrollBottom" class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
      <shelf-footer></shelf-footer>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import {storeShelfMixin} from "../../utils/mixin";
  import Scroll from "../../components/common/Scroll";
  import ShelfSearch from "../../components/shelf/ShelfSearch";
  import {shelf} from "../../api/store";
  import ShelfList from "../../components/shelf/ShelfList";
  import {appendAddToShelf} from "../../utils/store";
  import ShelfFooter from "../../components/shelf/ShelfFooter";
  import {getBookShelf, saveBookShelf} from "../../utils/localStorage";

  export default {
    name: "StoreShelf",
    mixins: [storeShelfMixin],
    watch: {
      isEditMode ( boolean ) {
        this.scrollBottom = boolean ? 32 : 0;
        this.$nextTick (() => {
          this.$refs.scroll.refresh ();
        })
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
      ShelfSearch
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
      this.getShelfList ();
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
