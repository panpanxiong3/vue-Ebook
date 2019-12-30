<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item,'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item,'right')"
               ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import {storeHomeMixin} from "../../utils/mixin";
  import {flapCardList} from "../../utils/store";

  export default {
    name: "FlapCard",
    mixins: [storeHomeMixin],
    data () {
      return {
        flapCardList,
        front: 0,
        back: 1,
        intervalTime: 80
      }
    },
    watch: {
      flapCardVisible ( v ) {
        if (v) {
          this.startFlapCardAnimate ();
        } else {

        }
      }
    },
    methods: {
      close () {
        this.setFlapCardVisible (false);
        this.stopFlapAnimate ();
      },
      semiCircleStyle ( item, dir ) {
        return {
          backgroundColor: `rgba(${item.r},${item.g},${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight,
        }
      },
      rotate ( index, type ) {
        const item = flapCardList[ index ];
        let dom;
        if (type === 'front') {
          dom = this.$refs.right[ index ]
        } else {
          dom = this.$refs.left[ index ]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
        dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`
      },
      flapCardRotate () {
        const frontFlapCard = this.flapCardList[ this.front ];
        const backFlapCard = this.flapCardList[ this.back ];
        frontFlapCard.rotateDegree += 10;
        frontFlapCard._g -= 5;
        backFlapCard.rotateDegree -= 10;
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5;
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2;
        }
        this.rotate (this.front, 'front');
        this.rotate (this.back, 'back');
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next ();
        }
      },
      next () {
        const frontFlapCard = this.flapCardList[ this.front ];
        const backFlapCard = this.flapCardList[ this.back ];
        frontFlapCard.rotateDegree = 0;
        frontFlapCard._g = frontFlapCard.g;
        backFlapCard.rotateDegree = 0;
        backFlapCard._g = backFlapCard.g;
        this.rotate (this.front, 'front');
        this.rotate (this.back, 'back');
        this.front++;
        this.back++;
        const len = this.flapCardList.length;
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0;
        }
        //z-index
        // 100 -> 96
        // 99 ->100
        // 98 ->99
        // 97 -> 98
        this.flapCardList.forEach (( item, index ) => {
          item.zIndex = 100 - ( ( index - this.front + len ) % len );
        });
        this.prepare ();
      },
      prepare () {
        const backFlapCard = this.flapCardList[ this.back ];
        backFlapCard.rotateDegree = 180;
        backFlapCard._g = backFlapCard.g - 5 * 9;
        this.rotate (this.back, 'back');
      },
      reset () {
        this.front = 0;
        this.back = 1;
        flapCardList.forEach (( item, index ) => {
          item.zIndex = 100 - index;
          item._g = item.g;
          item.rotateDegree = 0;
          this.rotate (index, 'left');
          this.rotate (index, 'right');
        })
      },
      startFlapCardAnimate () {
        this.prepare ();
        this.task = setInterval (() => {
          this.flapCardRotate ();
        }, this.intervalTime)
      },
      stopFlapAnimate () {
        if (this.task) {
          clearInterval (this.task);
        }
        this.reset ()
      }
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../assets/styles/global";

  .flap-card-wrapper {
    @include absCenter;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;

    .flap-card-bg {
      position: relative;
      width: px2rem(128);
      height: px2rem(128);
      border-radius: px2rem(10);
      background-color: white;

      .flap-card {
        width: px2rem(96);
        height: px2rem(96);
        @include absCenter;

        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;

          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            backface-visibility: hidden;
          }

          .flap-card-semi-circle-left {
            border-radius: px2rem(48) 0 0 px2rem(48);
            background-position: center right;
            transform-origin: right;
          }

          .flap-card-semi-circle-right {
            border-radius: 0 px2rem(48) px2rem(48) 0;
            background-position: center left;
            transform-origin: left;
          }
        }
      }
    }

    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(60);
      z-index: 1100;
      width: 100%;
      @include center;

      .icon-close {
        width: px2rem(90);
        height: px2rem(90);
        font-size: px2rem(30);
        border-radius: 50%;
        background-color: #333;
        color: white;
        @include center;
      }
    }
  }
</style>
