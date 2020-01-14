<template>
  <div class="shelf-item " :class="{'shelf-item-shadow':data.type===1 || data.type===2}" @click="onClickItem">
    <component class="shelf-item-comp" :class="{'is-edit':isEditMode && data.type ===2 }" :is="item"
               :data="data"></component>
    <div class="icon-selected" :class="{'is-selected':selected}" v-show="data.type===1 && isEditMode">
    </div>
  </div>
</template>

<script>
  import ShelfItemImage from "./ShelfItemImage";
  import ShelfItemCategory from "./ShelfItemCategory";
  import ShelfItemAdd from "./ShelfItemAdd";
  import {gotoStoreHome} from "../../utils/store";
  import {storeShelfMixin} from "../../utils/mixin";

  export default {
    name: "ShelfItem",
    mixins: [storeShelfMixin],
    props: {
      data: Object
    },
    data () {
      return {
        book: ShelfItemImage,
        category: ShelfItemCategory,
        add: ShelfItemAdd
      }
    },
    watch: {
      isEditMode ( boolean ) {
        if (boolean) {
          this.data.selected = false;
        }
      }
    },
    computed: {
      item () {
        return this.data.type === 1 ? this.book : ( this.data.type === 2 ? this.category : this.add );
      },
      selected () {
        return this.data.selected;
      }
    },
    methods: {
      onClickItem () {
        if (this.isEditMode) {
          this.data.selected = !this.data.selected;
          if (this.data.selected) {
            this.shelfSelected.pushWithOutDuplicate (this.data)
          } else {
            this.setShelfSelected (this.shelfSelected.filter (item => item.id !== this.data.id));
          }
        } else {
          if (this.data.type === 1) {
            this.showBookDetail (this.data)
          } else if (this.data.type === 2) {

          } else if (this.data.type === 3) {
            gotoStoreHome (this)
          }
        }
      }
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .shelf-item {
    width: 100%;
    height: 100%;
    position: relative;

    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(100, 100, 100, .3);
    }

    .shelf-item-comp {
      opacity: 1;

      &.is-edit {
        opacity: .5;
      }
    }

    .icon-selected {
      position: absolute;
      bottom: px2rem(4);
      right: px2rem(4);
      font-size: px2rem(24);
      color: rgba(0, 0, 0, .4);

      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>
