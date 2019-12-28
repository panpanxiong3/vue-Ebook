<template>
    <div class="store">
      <router-view/>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
  .store{
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
