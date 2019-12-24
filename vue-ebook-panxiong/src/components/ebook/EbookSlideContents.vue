<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text"
               class="slide-contents-search-input"
               :placeholder="$t('book.searchHint')"
               @click="showSearchVisible(true)">
      </div>
      <div class="slide-contents-search-cancel" v-if='searchVisible' @click="hideSearchVisible">{{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{ metadata.title }}</div>
        <div class="slide-contents-book-author">{{ metadata.creator }}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span


            class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="108" :bottom="40.5">
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span class="slide-contents-items-label" :style="contItemStyle(item)"
              :class="{'selected': section === index}" @click="switchChapters(item[0].href)">{{item[0].label}}</span>
        <span class="slide-contents-items-page"></span>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {eookMixin} from "../../utils/mixin";
  import Scroll from "../common/Scroll";
  import {px2rem} from "../../utils/utils";

  export default {
    name: "EbookSlideContents",
    mixins: [eookMixin],
    data () {
      return {
        searchVisible: false
      }
    },
    methods: {
      showSearchVisible () {
        this.searchVisible = true;
      },
      hideSearchVisible () {
        this.searchVisible = false;
      },
      contItemStyle ( item ) {
        return {
          marginLeft: `${px2rem (item.level * 15)}rem`
        }
      },
      switchChapters(navigation){
        this.renditionDisplay(navigation);
        this.hideTitleAndMenu ();
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    font-size: 0;

    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(72);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(14);
        margin: 0 px2rem(12);
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 px2rem(56);
          font-size: px2rem(14);
          @include center;
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(38);
          font-size: px2rem(14);
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }

    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(150);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;

      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);

        .slide-contents-book-img {
          width: px2rem(90);
          height: px2rem(120);
        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;

        .slide-contents-book-title {
          font-size: px2rem(14);
          width: px2rem(307.5);
          margin-top: px2rem(15);
          @include ellipsis2(2)
        }

        .slide-contents-book-author {
          font-size: px2rem(12);
          width: px2rem(307.5);
          margin-top: px2rem(15);
          @include ellipsis
        }
      }

      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(220);
        margin-top: px2rem(15);

        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
          }

          .progress-text {
            font-size: px2rem(12);
          }
        }

        .slide-contents-book-time {
          font-size: px2rem(12);
        }
      }
    }

    .slide-contents-list {
      padding: 0 px2rem(16);
      box-sizing: border-box;

      .slide-contents-item {
        padding: px2rem(40);
        display: flex;

        .slide-contents-items-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(25);
          @include ellipsis;
          &.selected {
            color: #0070ff;
          }
        }



        .slide-contents-items-page {

        }
      }
    }
  }
</style>
