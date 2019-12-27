<template>
  <div class="ebook-bookmark" ref="ebookBookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <div class="icon-down"></div>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFlexed ? flexStyle : {}">
      <BookMark :color="markColor" :width="30" :height="65"></BookMark>
    </div>
  </div>
</template>

<script>
  import BookMark from "../common/BookMark";
  import {eookMixin} from "../../utils/mixin";
  import {px2rem, realPx} from "../../utils/utils";
  import {getBookmark, saveBookmark} from "../../utils/localStorage";

  export default {
    name: "EbookBookMark",
    mixins: [eookMixin],
    data () {
      return {
        text: '',
        markColor: '#333333',
        isFlexed: false
      }
    },
    computed: {
      height () {
        return realPx (30)
      },
      threshold () {
        return realPx (55)
      },
      flexStyle () {
        return {
          position: 'fixed',
          right: `${px2rem (45)}px`,
          top: 0
        }
      }
    },
    watch: {
      offsetY ( v ) {
        if (this.bookAvailable && !this.menuVisible) {
          if (v >= this.height && v < this.threshold) {
            this.beforeThreshold (v);
          } else if (v >= this.threshold) {
            this.afterThreshold (v);
          } else if (v > 0 && v < this.height) {
            this.beforeHeight ()
          } else if (v === 0) {
            this.restore ()
          }
        }
      },
      isBookmark ( isBookMark ) {
        this.isFlexed = isBookMark;
        if (isBookMark) {
          this.markColor = '#0070ff';
        } else {
          this.markColor = '#333333';
        }
      }
    },
    components: {
      BookMark
    },
    methods: {
      addBookMark () {
        this.bookmark = getBookmark (this.fileName);
        if ( !this.bookmark) {
          this.bookmark = [];
        }
        const currentLocation = this.currentBook.rendition.currentLocation ();
        const cfiBase = currentLocation.start.cfi.replace (/!.*/, '');
        const cfiStart = currentLocation.start.cfi.replace (/.*!/, '').replace (/\)$/, '');
        const cfiEnd = currentLocation.end.cfi.replace (/.*!/, '').replace (/\)$/, '');
        const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`;
        this.currentBook.getRange (cfiRange).then (range => {
          const text = range.toString ().replace (/\s\s/g, '');
          this.bookmark.map (item => {
            if (item.cfi === currentLocation.start.cfi) return;
          });
          this.bookmark.push ({
            cfi: currentLocation.start.cfi,
            text: text
          });
          saveBookmark (this.fileName, this.bookmark);
        })
      },
      removeBookMark () {
        const currentLocation = this.currentBook.rendition.currentLocation ();
        const cfi = currentLocation.start.cfi;
        this.bookmark = getBookmark (this.fileName);
        if (this.bookmark) {
          saveBookmark (this.fileName, this.bookmark.filter (item => item.cfi !== cfi));
          this.setIsBookmark (false);
        }
      },
      restore () {
        //归位：状态4
        setTimeout (() => {
          this.$refs.ebookBookmark.style.top = `${-this.height}px`;
          this.$refs.ebookBookmark.style.transform = `rotate(0deg)`;
        }, 200);
        if (this.isFlexed) {
          this.setIsBookmark (true);
          this.flexStyle.top = `${this.height}px`;
          this.addBookMark ();
        } else {
          this.setIsBookmark (false);
          this.removeBookMark ()
        }
      },
      beforeHeight () {
        //恢复状态：状态1
        if (this.isBookmark) {
          this.text = this.$t ('book.pulldownDeleteMark');
          this.markColor = '#0070ff';
          this.isFlexed = true
        } else {
          this.text = this.$t ('book.pulldownAddMark');
          this.markColor = '#333333';
          this.isFlexed = false;
        }
      },
      beforeThreshold ( v ) {
        //未到达临界状态 ,
        this.$refs.ebookBookmark.style.top = `${-v}px`;
        this.beforeHeight ();
        this.flexStyle.top = `${this.height - 28}px`;
        const iconDown = this.$refs.iconDown;
        if (iconDown.style.transform === 'rotate(180deg)') {
          iconDown.style.transform = 'rotate(0deg)';
        }
      },
      afterThreshold ( v ) {
        //超越临界状态
        this.$refs.ebookBookmark.style.top = `${-v}px`;
        if (this.isBookmark) {
          this.text = this.$t ('book.releaseDeleteMark');
          this.markColor = '#333333';
          this.isFlexed = false;
          this.flexStyle.top = `${this.height - 28}px`;
        } else {
          this.text = this.$t ('book.releaseAddMark');
          this.markColor = '#0070ff';
          this.isFlexed = true;
          this.flexStyle.top = `${this.height}px`;
        }
        const iconDown = this.$refs.iconDown;
        if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
          iconDown.style.transform = 'rotate(180deg)';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-70);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(70);

    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(90);
      bottom: 0;
      display: flex;

      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: #333333;
        transition: all .2s linear;
      }

      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: #333333;
      }
    }

    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(45);
    }
  }
</style>
