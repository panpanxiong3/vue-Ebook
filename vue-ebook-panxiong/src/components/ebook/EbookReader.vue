<template>
  <div class="ebook-reader">
    <div id="read">

    </div>
    <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd" @touchstart="moveStart"
         @mousemove.left="onMouseMove" @mousedown.left="onMouseEnter" @mouseup.left="onMouseEnd"></div>
  </div>
</template>

<script>

  import Epub from 'epubjs'
  import {eookMixin} from "../../utils/mixin";
  import {
    getFontFamily,
    getFontSize, getLocation,
    getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from "../../utils/localStorage";
  import {flatten} from "../../utils/book";
  import {getLocalForage} from "../../utils/localForage";

  global.ePub = Epub;
  export default {
    name: "EbookReader",
    mixins: [eookMixin],
    methods: {
      // 1- 鼠标进入
      // 2- 鼠标进入后的移动
      // 3- 鼠标从移动状态松手
      // 4- 鼠标还原
      onMouseMove ( e ) {
        if (this.moveState === 1) {
          this.moveState = 2
        } else if (this.moveState === 2) {
          let offsetY = 0;
          if (this.firstOffsetY) {
            offsetY = e.clientY - this.firstOffsetY;
            this.setOffsetY (offsetY);
          } else {
            this.firstOffsetY = e.clientY;
          }
        }
        e.preventDefault ();
        e.stopPropagation ();
      },
      onMouseEnter ( e ) {
        this.moveState = 1;
        this.moveStateTime = e.timeStamp;
        e.preventDefault ();
        e.stopPropagation ();
      },
      onMouseEnd ( e ) {
        if (this.moveState === 2) {
          this.setOffsetY (0);
          this.firstOffsetY = 0;
          this.moveState = 3;
        }
        ;
        const time = e.timeStamp - this.moveStateTime;
        if (time <= 200) {
          this.moveState = 4;
        }
        e.preventDefault ();
        e.stopPropagation ();
      },
      move ( e ) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[ 0 ].clientY - this.firstOffsetY;
          this.setOffsetY (offsetY);
        } else {
          this.firstOffsetY = e.changedTouches[ 0 ].clientY;
        }
        e.preventDefault ();
        e.stopPropagation ();
      },
      moveStart ( e ) {
        this.touchStartX = e.changedTouches[ 0 ].clientX;
        this.touchStartTime = e.timeStamp;
      },
      moveEnd ( e ) {
        this.setOffsetY (0);
        this.firstOffsetY = 0;
        const offsetX = e.changedTouches[ 0 ].clientX - this.touchStartX;
        const touchTime = e.timeStamp - this.touchStartTime;
        if (touchTime < 500 && offsetX > 40) {
          this.prevPage ();
        } else if (touchTime < 500 && offsetX < -40) {
          this.nextPage ();
        }
      },
      onMaskClick ( e ) {
        if (this.moveState && ( this.moveState === 2 || this.moveState === 3 )) {
          return;
        }
        const offsetX = e.offsetX;
        const width = window.innerWidth;
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage ();
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage ();
        } else {
          this.showTitleAndMenu ();
        }
      },
      initFontSize () {
        let fontSize = getFontSize (this.fileName);
        if ( !fontSize) {
          saveFontSize (this.fileName, this.defaultFontSize);
        } else {
          this.rendition.themes.fontSize (fontSize);
          this.setDefaultFontSize (fontSize);
        }
      },
      initFontFamily () {
        let font = getFontFamily (this.fileName);
        if ( !font) {
          saveFontFamily (this.fileName, this.defaultFontFamily);
        } else {
          this.rendition.themes.font (font);
          this.setDefaultFontFamily (font);
        }
      },
      initTheme () {
        let defaultTheme = getTheme (this.fileName);
        if ( !defaultTheme) {
          defaultTheme = this.themeList[ 0 ].name;
          saveTheme (this.fileName, defaultTheme);
        } else {
          this.setDefaultTheme (defaultTheme);
        }
        this.themeList.forEach (theme => {
          this.rendition.themes.register (theme.name, theme.style);
        });
        this.rendition.themes.select (defaultTheme);
      },
      initRendition () {
        this.rendition = this.book.renderTo ('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          method: 'default'// 微信的兼容性，可以在微信上正常使用
        });
        const location = getLocation (this.fileName);
        this.renditionDisplay (location, () => {
          this.initFontSize ();
          this.initFontFamily ();
          this.initTheme ();
          this.initGlobStyle ();
        });
        this.rendition.hooks.content.register (contents => {
          Promise.all ([
            contents.addStylesheet (`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
            contents.addStylesheet (`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet (`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet (`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
          ]).then (() => {

          });
        })
      },
      initGestart () {
        //手势操作
        this.rendition.on ('touchstart', event => {
          this.touchStartX = event.changedTouches[ 0 ].clientX;
          this.touchStartTime = event.timeStamp;
        });
        this.rendition.on ('touchend', event => {
          event.stopPropagation ();
          const offsetX = event.changedTouches[ 0 ].clientX - this.touchStartX;
          const touchTime = event.timeStamp - this.touchStartTime;
          if (touchTime < 500 && offsetX > 40) {
            this.prevPage ();
          } else if (touchTime < 500 && offsetX < -40) {
            this.nextPage ();
          } else {
            this.showTitleAndMenu ()
          }
        });
      },
      parseBook () {
        //获取阅读器封面
        this.book.loaded.cover.then (cover => {
          this.book.archive.createUrl (cover).then (url => {
            this.setCover (url);
          })
        });
        //获取图书基本信息
        this.book.loaded.metadata.then (metadata => {
          this.setMetadata (metadata);
        });


        //获取图书列表信息
        this.book.loaded.navigation.then (nav => {
          const navItem = flatten (nav.toc);

          function find ( item, level = 0 ) {
            return !item.parent ? level : find (navItem.filter (parentItem => parentItem.id === item.parent)[ 0 ], ++level);
          }

          navItem.forEach (item => {
            item.level = find (item);
          });
          this.setNavigation (navItem);
        })
      },
      initEpub () {
        const baseUrl = `${process.env.VUE_APP_EPUB_URL}/${this.fileName}.epub`;
        this.book = new Epub (baseUrl);
        this.parseBook ();
        this.setCurrentBook (this.book);
        this.initRendition ();
        //this.initGestart ();
        this.book.ready.then (() => {
          return this.book.locations.generate (750 * ( window.innerWidth / 375 ) * ( getFontSize (this.fileName / 16) ))
        }).then (locations => {
          this.setBookAvailable (true);
          this.refreshLocation ();
        })
      },
      prevPage () {
        this.rendition.prev ().then (() => {
          this.refreshLocation ();
        });
        this.hideTitleAndMenu ();
      },
      nextPage () {
        this.rendition.next ().then (() => {
          this.refreshLocation ();
        });
        this.hideTitleAndMenu ();
      },
      showTitleAndMenu () {
        this.setMenuVisible ( !this.menuVisible);
        this.setSettingVisible (-1);
        this.setFontFamilyVisible (false);
      },
    },
    mounted () {
      const books = this.$route.params.fileName.split ('|');
      const fileName = books[ 1 ];
      getLocalForage (fileName, ( err, blob ) => {
        if ( !err && blob) {
          console.log ('找到离线缓存数据');
          this.setFileName (books.join ('/')).then (() => {
            this.initEpub (blob);
          })
        } else {
          console.log ('在线获取缓存数据');
          this.setFileName (books.join ('/')).then (() => { //修改vuex 变量['fileNames']，并且异步调用函数
            const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub';
            this.initEpub (url);//调用函数
          });
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .ebook-reader-mask {
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }
</style>
