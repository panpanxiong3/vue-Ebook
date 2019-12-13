<template>
    <div class="ebook-reader">
     <div id="read">

     </div>
    </div>
</template>

<script>

  import Epub from 'epubjs'
  import { eookMixin } from "../../unils/mixin";
  global.ePub = Epub;
    export default {
        name: "EbookReader",
        mixins: [ eookMixin ],
        methods: {
          initEpub() {
            const baseUrl = 'http://192.168.1.15:7071/epub/' + this.fileNames + '.epub';
            this.book = new Epub(baseUrl);
            this.rendition = this.book.renderTo('read', {
              width: window.innerWidth,
              height: window.innerHeight,
              method: 'default'// 微信的兼容性，可以在微信上正常使用
            });
            this.rendition.display();
            //手势操作
            this.rendition.on('touchstart', event => {
              this.touchStartX = event.changedTouches[0].clientX;
              this.touchStartTime = event.timeStamp;
            });
            this.rendition.on('touchend', event => {
              event.stopPropagation();
              const offsetX = event.changedTouches[0].clientX - this.touchStartX;
              const touchTime = event.timeStamp - this.touchStartTime;
              if(touchTime < 500 && offsetX > 40 ){
                this.prevPage();
              } else if (touchTime < 500 && offsetX < -40 ){
                this.nextPage();
              } else {
                this.showTitleAndMenu()
              }
            });
          },
          prevPage() {
            this.rendition.prev();
            this.hideTitleAndMenu();
          },
          nextPage() {
            this.rendition.next();
            this.hideTitleAndMenu();
          },
          showTitleAndMenu() {
            this.setMenuVisitor(!this.menuVisitor);
          },
          hideTitleAndMenu(){
            this.setMenuVisitor(false);
          }
        },
        mounted() {
          const fileName = this.$route.params.fileName.split('|').join('/'); //修改路由参数
          this.setFileName(fileName).then(() => { //修改vuex 变量['fileNames']，并且异步调用函数
            this.initEpub();//调用函数
          });
        }
    }
</script>

<style scoped>

</style>
