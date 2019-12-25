<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item,index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subitem,subindex) in item" :key="subindex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
  import {px2rem} from "../../utils/utils";

  export default {
    name: "EbookLoading",
    data () {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          {value: 0},
          {value: 0},
          {value: 0},
          {value: 0},
          {value: 0},
          {value: 0},
        ],
        lineWidth: [
          {value: 56},
          {value: 56},
          {value: 56},
          {value: 56},
          {value: 56},
          {value: 56},
        ],
        add: true,
        end: false
      }
    },
    mounted () {
      this.task = setInterval (() => {
        this.$refs.mask.forEach (( item, index ) => {
          const mask = this.$refs.mask[ index ];
          const line = this.$refs.line[ index ];
          let maskWidth = this.maskWidth[ index ];
          let lineWidth = this.lineWidth[ index ];
          if (index === 0) {
            if (this.add && maskWidth.value < 56) {
              maskWidth.value++;
              lineWidth.value--
            } else if ( !this.add && lineWidth.value < 56) {
              maskWidth.value--;
              lineWidth.value++
            }
          } else {
            if (this.add && maskWidth.value < 56) {
              let preMaskWidth = this.maskWidth[ index - 1 ];
              if (preMaskWidth.value >= 28) {
                maskWidth.value++
                lineWidth.value--
              }
            } else if ( !this.add && lineWidth.value < 56) {
              let preLineWidth = this.lineWidth[ index - 1 ];
              if (preLineWidth.value >= 28) {
                maskWidth.value--
                lineWidth.value++
              }
            }
          }
          mask.style.width = `${px2rem (maskWidth.value)}rem`;
          mask.style.flex = `0 0 ${px2rem (maskWidth.value)}rem`;
          line.style.width = `${px2rem (lineWidth.value)}rem`;
          line.style.flex = `0 0 ${px2rem (lineWidth.value)}rem`;
          if (index === this.maskWidth.length - 1) {
            if (this.add) {
              if (maskWidth.value === 56) {
                this.end = true
              }
            } else {
              if (maskWidth.value === 0) {
                this.end = true
              }
            }
          }
          if (this.end) {
            this.add = !this.add;
            this.end = false
          }
        })
      }, 5)
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .ebook-loading {
    position: relative;
    z-index: 400;
    width: px2rem(205);
    height: px2rem(120);
    background: transparent;
    border: px2rem(1.5) solid #0070ff;
    border-radius: px2rem(6);

    .ebook-loading-wrapper {
      display: flex;
      width: 100%;
      height: 100%;

      .ebook-loading-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(14) 0;
        box-sizing: border-box;

        .ebook-loading-line-wrapper {
          flex: 1;
          @include left;
          padding: 0 px2rem(14);
          box-sizing: border-box;

          .ebook-loading-line {
            flex: 0 0 px2rem(56);
            width: px2rem(56);
            height: px2rem(2);
            background: #0070ff;
          }

          .ebook-loading-mask {
            flex: 0 0 px2rem(0);
            width: px2rem(0);
            height: px2rem(2);
          }
        }
      }

      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: px2rem(2);
        height: 100%;
        background: #0070ff;
      }
    }
  }
</style>
