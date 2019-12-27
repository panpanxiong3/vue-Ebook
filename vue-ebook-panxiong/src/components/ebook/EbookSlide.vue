<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible===3">
      <transition name="fade-slide-right">
        <div class="content" v-show="settingVisible===3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 1?content:contentMark"></component>
            </div>
            <div class="content-page-table">
              <div class="content-page-tab-item" @click="selectTab(1)" :class="{'selected': currentTab === 1}">
                {{$t('book.navigation')}}
              </div>
              <div class="content-page-tab-item" @click="selectTab(2)" :class="{'selected': currentTab === 2}">
                {{$t('book.bookmark')}}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>

<script>
  import {eookMixin} from "../../utils/mixin";
  import EbookSlideContents from "./EbookSlideContents";
  import EbookLoading from "./EbookLoading";
  import EbookSlideBookmark from "./EbookSlideBookmark";

  export default {
    name: "EbookSlide",
    components: {EbookLoading},
    mixins: [eookMixin],
    data () {
      return {
        currentTab: 1,
        content: EbookSlideContents,
        contentMark: EbookSlideBookmark
      }
    },
    methods: {
      selectTab ( tab ) {
        this.currentTab = tab;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";

  .slide-content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 100%;
    display: flex;

    .content {
      flex: 0 0 85%;
      width: 85%;
      height: 100%;

      .content-page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }

        .content-page-table {
          flex: 0 0 px2rem(96);
          width: 100%;
          height: px2rem(96);
          display: flex;
          border-top: 1px solid #d1d1d1;

          .content-page-tab-item {
            flex: 1;
            @include center;
            font-size: px2rem(24);
          }
        }
      }

      .content-empty {
        width: 100%;
        height: 100%;
        @include center;
      }
    }

    .content-bg {
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
    }
  }
</style>
