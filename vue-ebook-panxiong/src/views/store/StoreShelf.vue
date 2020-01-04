<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";

  export default {
    name: "StoreShelf",
    components: {
      ShelfTitle
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .store-shelf {
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
