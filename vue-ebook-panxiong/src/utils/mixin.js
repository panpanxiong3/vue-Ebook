import {mapGetters, mapActions} from "vuex";
import {addCss, removeAllCss, themeList, getReadTimeByMinute} from "./book";
import {getBookmark, getBookShelf, getTheme, saveBookShelf, saveLocation} from "./localStorage";
import {appendAddToShelf, computeId, gotoBookDetail, removeAddFromShelf} from "./store";
import {shelf} from "../api/store";

export const storeHomeMixin = {
  computed: {
    ...mapGetters ([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions ([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail ( book ) {
      gotoBookDetail (this, book)
    },
  }
};


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
      return this.$t ('book.haveRead').replace ('$1', getReadTimeByMinute (this.fileName));
    },
    getSectionName () {
      if (this.navigation && this.navigation[ this.section ] && this.navigation[ this.section ][ 0 ]) {
        return this.section ? this.navigation[ this.section ][ 0 ].label : '';
      }
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
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi;
        const progress = this.currentBook.locations.percentageFromCfi (startCfi);
        this.setProgress (Math.floor (progress * 100));
        this.setSection (currentLocation.start.index);
        saveLocation (this.fileName, startCfi);
        const bookmark = getBookmark (this.fileName);
        if (bookmark) {
          if (bookmark.some (item => item.cfi === startCfi)) {
            this.setIsBookmark (true);
          } else {
            this.setIsBookmark (false)
          }
        } else {
          this.setIsBookmark (false);
        }
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

export const storeShelfMixin = {
  computed: {
    ...mapGetters ([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions ([
      'setIsEditMode',
      'setShelfTitleVisible',
      'setShelfList',
      'setShelfSelected',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail ( book ) {
      gotoBookDetail (this, book)
    },
    getCategoryList ( title ) {
      const categoryList = this.shelfList.filter (book => book.type === 2 && book.title === title)[ 0 ]
      this.setShelfCategory (categoryList)
    },
    getShelfList () {
      let shelfList = getBookShelf ();
      if ( !shelfList) {
        shelf ().then (response => {
          if (response.status === 200 && response.data && response.data.bookList) {
            shelfList = appendAddToShelf (response.data.bookList);
            saveBookShelf (shelfList);
            return this.setShelfList (shelfList)
          }
        })
      } else {
        return this.setShelfList (shelfList)
      }
    },
    moveOutOfGroup ( f ) {
      this.setShelfList (this.shelfList.map (book => {
        if (book.type === 2 && book.itemList) {
          book.itemList = book.itemList.filter (subbook => !subbook.selected);
        }
        return book;
      })).then (() => {
        const list = computeId (appendAddToShelf ([].concat (removeAddFromShelf (this.shelfList), ...this.shelfSelected)));
        this.setShelfList (list).then (() => {
          this.simpToast (this.$t ('shelf.moveBookOutSuccess'));
          if (f) {
            f ()
          }
        })
      })
    }
  },
};
