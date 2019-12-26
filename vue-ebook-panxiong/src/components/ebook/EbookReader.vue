<template>
  <div class="ebook-reader">
    <div id="read">

    </div>
    <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd" @touchstart="moveStart"></div>
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

  global.ePub = Epub;
  export default {
    name: "EbookReader",
    mixins: [eookMixin],
    methods: {
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
        const baseUrl = 'http://192.168.1.15:7071/epub/' + this.fileName + '.epub';
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
      const fileName = this.$route.params.fileName.split ('|').join ('/'); //修改路由参数
      this.setFileName (fileName).then (() => { //修改vuex 变量['fileNames']，并且异步调用函数
        this.initEpub ();//调用函数
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
