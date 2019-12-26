<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
  </div>
</template>

<script>
  import EbookReader from "../../components/ebook/EbookReader";
  import EbookTitle from "../../components/ebook/EbookTitle";
  import EbookMenu from "../../components/ebook/EbookMenu";
  import EbookBookMark from "../../components/ebook/EbookBookMark";
  import {getReadTime, saveReadTime} from "../../utils/localStorage";
  import {eookMixin} from "../../utils/mixin";

  export default {
    name: "index",
    mixins: [eookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu,
      EbookBookMark
    },
    watch: {
      offsetY ( v ) {
        if ( !this.menuVisible && this.bookAvailable) {
          if (v > 0) {
            this.move (v);
          } else if (v === 0) {
            this.restore ();
          }
        }
      }
    },
    methods: {
      restore () {
        this.$refs.ebook.style.top = 0;
        this.$refs.ebook.style.transition = 'all .2s linear';
        setTimeout (() => {
          this.$refs.ebook.style.transition = '';
        }, 200)
      },
      move ( v ) {
        this.$refs.ebook.style.top = v + 'px';
      },
      startLoopReadTime () {
        let readTime = getReadTime (this.fileName);
        if ( !readTime) {
          readTime = 0
        }
        this.task = setInterval (() => {
          readTime++;
          if (readTime % 30 === 0) {
            saveReadTime (this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime ();
    },
    beforeDestroy () {
      if (this.task) {
        clearInterval (this.task);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
