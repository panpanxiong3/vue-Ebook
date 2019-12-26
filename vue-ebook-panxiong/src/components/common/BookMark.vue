<template>
  <div class="book-mark" :style="style" ref="bookmark"></div>
</template>

<script>
  import {px2rem} from "../../utils/utils";

  export default {
    name: "BookMark",
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style () {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`
        }
      }
    },
    methods: {
      refresh () {
        if (this.height && this.width) {
          this.$refs.bookmark.style.borderWidth = `${px2rem (this.height - 10)}rem ${px2rem (this.width / 2)}rem ${px2rem (10)}rem ${px2rem (this.width / 2)}rem`
        }
      }
    },
    mounted () {
      this.refresh ();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .book-mark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(20) px2rem(20) px2rem(20);
    border-style: solid;
    border-color: #333333 #333333 transparent #333333;
  }
</style>
