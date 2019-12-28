<template>
  <div class="store-home">
    <search-bar></search-bar>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";

  export default {
    name: "storeHome",
    components: {
      SearchBar
    }
  }
</script>

<style scoped lang="scss">
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
