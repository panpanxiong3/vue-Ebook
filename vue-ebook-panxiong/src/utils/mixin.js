import {mapGetters, mapActions} from "vuex";
import {addCss, removeAllCss, themeList, getReadTimeByMinute} from "./book";
import {getTheme, saveLocation} from "./localStorage";


export const eookMixin = {
  computed: {
    ...mapGetters ([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList () {
      return themeList (this)
    },
    getReadTimeText () {
      return this.$t ('book.haveRead').replace ('$1', getReadTimeByMinute(this.fileName));
    },
  },
  methods: {
    ...mapActions ([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobStyle () {
      removeAllCss ();
      let defTheme = getTheme ();
      switch (this.defaultTheme) {
        case "Default":
          addCss (`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
        case "Gold":
          addCss (`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
          break;
        case "Eye":
          addCss (`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
          break;
        case "Night":
          addCss (`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
          break;
      }
    },
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation ();
      if(currentLocation && currentLocation.start){
        const startCfi = currentLocation.start.cfi;
        const progress = this.currentBook.locations.percentageFromCfi (startCfi);
        this.setProgress (Math.floor (progress * 100));
        this.setSection (currentLocation.start.index);
        saveLocation (this.fileName, startCfi);
      }
    },
    renditionDisplay ( target, cb ) {
      if (target) {
        this.currentBook.rendition.display (target).then (() => {
          this.refreshLocation ();
          if (cb) cb ();
        })
      } else {
        this.currentBook.rendition.display ().then (() => {
          this.refreshLocation ();
          if (cb) cb ();
        })
      }
    },
    hideTitleAndMenu () {
      this.setSettingVisible (-1);
      this.setFontFamilyVisible (false);
      this.setMenuVisible (false);
    }
  }
};
