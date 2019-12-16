<template>
  <div class="ebook-reader">
    <div id="read">

    </div>
  </div>
</template>

<script>

  import Epub from 'epubjs'
  import {eookMixin} from "../../utils/mixin";
  import {
    getFontFamily,
    getFontSize,
    getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from "../../utils/localStorage";
  import {addCss} from "../../utils/book";

  global.ePub = Epub;
  export default {
    name: "EbookReader",
    mixins: [eookMixin],
    methods: {
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
        }else {
          this.setDefaultTheme(defaultTheme);
        }
        this.themeList.forEach (theme => {
          this.rendition.themes.register (theme.name, theme.style);
        });
        this.rendition.themes.select (defaultTheme);
      },
      initEpub () {
        const baseUrl = 'http://192.168.1.15:7071/epub/' + this.fileName + '.epub';
        this.book = new Epub (baseUrl);
        this.setCurrentBook (this.book);
        this.rendition = this.book.renderTo ('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          method: 'default'// 微信的兼容性，可以在微信上正常使用
        });
        this.rendition.display ().then (() => {
          this.initFontSize ();
          this.initFontFamily ();
          this.initTheme ();
          this.initGlobStyle ();
        });
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
      prevPage () {
        this.rendition.prev ();
        this.hideTitleAndMenu ();
      },
      nextPage () {
        this.rendition.next ();
        this.hideTitleAndMenu ();
      },
      showTitleAndMenu () {
        this.setMenuVisible ( !this.menuVisible);
        this.setSettingVisible (-1);
        this.setFontFamilyVisible (false);
      },
      hideTitleAndMenu () {
        this.setSettingVisible (-1);
        this.setFontFamilyVisible (false);
        this.setMenuVisible (false);
      }
    },
    mounted () {
      const fileName = this.$route.params.fileName.split ('|').join ('/'); //修改路由参数
      this.setFileName (fileName).then (() => { //修改vuex 变量['fileNames']，并且异步调用函数
        this.initEpub ();//调用函数
      });
    }
  }
</script>

<style scoped>

</style>
