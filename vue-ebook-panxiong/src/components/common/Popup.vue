<template>
  <div class="popup" v-if="popupVisible">
    <transition name="fade">
      <div class="popup-bg" v-if="Visible" @click.stop.prevent="hide"></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper" v-if="Visible">
        <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
        <div class="popup-btn" :class="{'danger':item.type === 'danger'}" v-for="(item,index) in btn" :key="index"
             @click="item.click">{{item.text}}
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    name: "Popup",
    props: {
      title: String,
      btn: Array
    },
    data () {
      return {
        popupVisible: false,
        Visible: false
      }
    },
    methods: {
      show () {
        this.popupVisible = true;
        setTimeout (() => {
          this.Visible = true
        }, 200);
      },
      hide () {
        this.Visible = false;
        setTimeout (() => {
          this.popupVisible = false;
        }, 200);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);

    .popup-bg {
      width: 100%;
      height: 100%;
    }

    .popup-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 2000;
      width: 100%;
      background-color: white;

      .popup-title {
        width: 100%;
        height: px2rem(88);
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(8);
        line-height: px2rem(16);
        padding: px2rem(16);
        color: #666666;
        box-sizing: border-box;
        @include center;

      }

      .popup-btn {
        width: 100%;
        height: px2rem(120);
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(16);
        color: #666666;
        font-weight: bold;
        @include center;

        &.danger {
          color: $color-pink;
        }
      }
    }
  }
</style>
