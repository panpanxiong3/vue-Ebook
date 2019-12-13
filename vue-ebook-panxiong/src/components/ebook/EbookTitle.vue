<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisitor">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-share"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
   import { eookMixin } from "../../unils/mixin";
    export default {
      name: "EbookTitle",
      mixins: [ eookMixin ],
      methods: {
          back(){

          }
      }
    }
</script>

<style scoped lang="scss">
  @import '../../assets/styles/global';
  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(115);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: 20px;
  .left {
    flex: 0 0 px2rem(100);
  @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  .icon-wrapper {
    flex: 0 0 px2rem(100);
  @include center;
  .icon-cart {
    font-size: px2rem(40);
  }
  }
  }
  }
</style>
