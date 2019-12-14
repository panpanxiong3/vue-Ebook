<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="( item , index) in fontFamilyList" :key="index" @click="setFontFamily( item.font )">
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}" >{{item.font}}</div>
          <div class="ebook-popup-item-check" :class="{'selected':isSelected(item)}" v-if="isSelected(item)" >
            <div class="icon-check" ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import { FONT_FAMILY } from "../../utils/book";
    import { eookMixin } from "../../utils/mixin";
    export default {
        name: "EbookSettingFontPopul",
        mixins: [ eookMixin ],
        data(){
          return{
             fontFamilyList: FONT_FAMILY
          }
        },
        methods: {
          hide(){
            this.setFontFamilyVisible(false)
          },
          isSelected(item){
            return this.defaultFontFamily === item.font;
          },
          setFontFamily(font){
            this.setDefaultFontFamily(font);
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .ebook-popup-list{
    position: absolute;
    background-color: white;
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba( 0 , 0 ,0 , .1);
    .ebook-popup-title{
      display: flex;
      @include center;
      text-align: center;
      position: relative;
      padding: px2rem(15);
      border-bottom:px2rem(1) solid #b8b9bb;
      .ebook-popup-title-icon{
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(16);
        font-weight: bold;
        @include center;
      }
      .ebook-popup-title-text{

        font-size: px2rem(14);
        font-weight: bold;
      }
    }
    .ebook-popup-list-wrapper{
      .ebook-popup-item{
        display: flex;
        padding: px2rem(15);
        .ebook-popup-item-text{
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected{
            color: #0070ff;
          }
        }
        .ebook-popup-item-check{
          flex: 1;
          font-size: px2rem(14);
          text-align: right;
          color: #0070ff;
        }
      }
    }
  }
</style>
