<template>
  <transition name="slide-up">
    <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisitor}" v-show="menuVisitor">
      <div class="icon-wrapper">
        <span class="icon-menu" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress" @click="showSetting(2)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright" @click="showSetting(1)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-a" @click="showSetting(0)">A</span>
      </div>
    </div>
  </transition>
</template>

<script>
    import { eookMixin } from "../../unils/mixin";
    export default {
        mixins: [ eookMixin ],
        name: "EbookMenu",
        methods: {
          showSetting(key){

          }
        }
    }
</script>

<style scoped lang="scss">
   @import "../../assets/styles/global";
   .menu-wrapper {
     position: absolute;
     bottom: 0;
     left: 0;
     z-index: 102;
     display: flex;
     width: 100%;
     height: px2rem(96);
     background: white;
     box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
     font-size: px2rem(48);
     &.hide-box-shadow {
       box-shadow: none;
     }
     .icon-wrapper {
       flex: 1;
       @include center;
       .icon-progress {
         font-size: px2rem(48);
       }
       .icon-bright {
         font-size: px2rem(48);
       }
     }
   }
</style>
