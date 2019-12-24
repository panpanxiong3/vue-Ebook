<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
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
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <EbookSlide></EbookSlide>
  </div>

</template>

<script>
    import EbookSettingFont from "./EbookSettingFont";
    import EbookSettingTheme from "./EbookSettingTheme";
    import EbookSettingProgress from "./EbookSettingProgress";
    import EbookSlide from "./EbookSlide";
    import { eookMixin } from "../../utils/mixin";
    export default {
        mixins: [ eookMixin ],
        name: "EbookMenu",
        methods: {
          showSetting(key){
            switch (key) {
                case 0:
                this.settingVisible !== 0 ? this.setSettingVisible(key) : this.setSettingVisible(-1);
                break;
              case 1:
                this.settingVisible !== 1 ? this.setSettingVisible(key) : this.setSettingVisible(-1);
                break;
              case 2:
                this.settingVisible !== 2 ? this.setSettingVisible(key) : this.setSettingVisible(-1);
                break;
              case 3:
                this.settingVisible !== 3 ? this.setSettingVisible(key) : this.setSettingVisible(-1);
                break;
            }
          }
        },
        components: {
          EbookSettingFont,
          EbookSettingTheme,
          EbookSettingProgress,
          EbookSlide
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
