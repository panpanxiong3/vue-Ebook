<template>
  <div class="shelf-item">
    <component :is="item"></component>
  </div>
</template>

<script>
  import ShelfItemImage from "./ShelfItemImage";
  import ShelfItemCategory from "./ShelfItemCategory";
  import ShelfItemAdd from "./ShelfItemAdd";

  export default {
    name: "ShelfItem",
    data () {
      return {
        book: ShelfItemImage,
        category: ShelfItemCategory,
        add: ShelfItemAdd
      }
    },
    props: {
      data: Object
    },
    computed: {
      item () {
        return this.data.type === 1 ? this.book : ( this.data.type === 2 ? this.category : this.add );
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .shelf-item {
    width: 100%;
    height: 100%;
    background-color: #0070ff;
  }
</style>
