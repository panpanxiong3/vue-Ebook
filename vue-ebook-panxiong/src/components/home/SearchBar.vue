<template>
  <div class="search-bar">
    <div class="search-bar-title-wrapper">
      <div class="title-icon-back-wrapper">
        <span class="icon-back icon"></span>
      </div>
      <div class="title-icon-text-wrapper">
        <span class="title-text ">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper">
        <span class="icon-shake icon"></span>
      </div>
    </div>
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text" class="input" :placeholder="$t('home.hint')" v-model="searchText">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",
    data () {
      return {
        searchText: ''
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    width: 100%;

    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(84);
      position: relative;
      top: 0;
      left: 0;

      .title-icon-back-wrapper {
        position: absolute;
        left: px2rem(30);
        top: 0;
        height: px2rem(84);
        @include center;
      }

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

    .search-bar-input-wrapper {
      width: 100%;
      height: px2rem(104);
      padding: px2rem(30);
      box-sizing: border-box;
      .search-bar-input {
        border-radius: px2rem(30);
        width: 100%;
        background-color: #f4f4f4;
        padding: px2rem(20) px2rem(20);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;
        .icon-search{
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(44);
          border: none;
          background: transparent;
          margin-left: px2rem(15);
          &:focus{
            outline: none;
          }
          &::-webkit-input-placeholder{
            color: #666;
          }
        }
      }
    }
  }
</style>
