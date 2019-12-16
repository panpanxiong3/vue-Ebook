import {mapGetters, mapActions} from "vuex";
import {addCss, removeAllCss, themeList} from "./book";
import {getTheme} from "./localStorage";

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
    }
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
      removeAllCss();
      let defTheme = getTheme();
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
  }
};
