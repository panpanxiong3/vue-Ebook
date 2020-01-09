<template>
  <div class="shelf-item-image">
    <img class="shelf-item-image-cover" :src="data.cover" :alt="data.cover">
  </div>
</template>

<script>
  export default {
    name: "ShelfItemImage",
    props: {
      data: Object
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .shelf-item-image {
    width: 100%;
    height: 100%;

    .shelf-item-image-cover {
      width: 100%;
      height: 100%;
    }
  }
</style>
