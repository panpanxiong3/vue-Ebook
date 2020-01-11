<template>
  <transition name="">
    <div class="shelf-footer" v-show="isEditMode">
      <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index"
           @click="onTabClick(item)">
        <div class="shelf-footer-tab" :class="{'is-selected':isSelected}">
          <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
          <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
          <div class="icon-download tab-icon" v-if="item.index === 2 && !isDownload"></div>
          <div class="icon-download icon-download-remove tab-icon" v-if="item.index === 2 && isDownload"></div>
          <div class="icon-move tab-icon" v-if="item.index === 3"></div>
          <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
          <div class="tav-text" :class="{'remove-text':item.index===4}">{{lable(item)}}</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import {storeShelfMixin} from "../../utils/mixin";
  import {removeLocalStorage, saveBookShelf} from "../../utils/localStorage";
  import {download, shelf} from "../../api/store";
  import {removeLocalForage} from "../../utils/localForage";

  export default {
    name: "ShelfFooter",
    mixins: [storeShelfMixin],
    computed: {
      isSelected () {
        return this.shelfSelected && this.shelfSelected.length > 0
      },
      tabs () {
        return [
          {
            label: this.$t ('shelf.private'),
            label2: this.$t ('shelf.noPrivate'),
            index: 1
          },
          {
            label: this.$t ('shelf.download'),
            label2: this.$t ('shelf.delete'),
            index: 2
          },
          {
            label: this.$t ('shelf.move'),
            index: 3
          },
          {
            label: this.$t ('shelf.remove'),
            index: 4
          }
        ]
      },
      isPrivate () {
        if ( !this.isSelected) {
          return false
        } else {
          return this.shelfSelected.every (item => item.private);
        }
      },
      isDownload () {
        if ( !this.isSelected) {
          return false
        } else {
          return this.shelfSelected.every (item => item.cache);
        }
      }
    },
    data () {
      return {
        popupMenu: null
      }
    },
    methods: {
      lable ( item ) {
        switch (item.index) {
          case 1:
            return this.isPrivate ? item.label2 : item.label;
            break;
          case 2:
            return this.isDownload ? item.label2 : item.label;
            break;
          default:
            return item.label;
            break;
        }
      },
      async downloadSelectedBook () {
        for (let i = 0; i < this.shelfSelected.length; i++) {
          await this.downloadBook (this.shelfSelected[ i ]).then (book => {
            book.cache = true;
          })
        }
      },
      downloadBook ( book ) {
        let text = '';
        const toast = this.toast ({
          text
        });
        toast.continueShow ();
        return new Promise (( resolve, reject ) => {
          download (book, () => {
            toast.remove ();
            resolve (book)
          }, progressEvent => {
            const process = Math.floor (progressEvent.loaded / progressEvent.total * 100) + '%';
            text = this.$t ('shelf.progressDownload').replace ('$1', `${book.fileName}.epub(${process})`);
            toast.updateText (text);
          })
        })
      },
      removeSelectedBook () {
        Promise.all (this.shelfSelected.map (book => this.removeBook (book))).then (books => {
          books.map (book => {
            book.cache = false;
          });
          saveBookShelf (this.shelfList);
          this.simpToast (this.$t ('shelf.removeDownloadTitle'));
        })
      },
      removeBook ( book ) {
        return new Promise (( resolve, reject ) => {
          removeLocalStorage (`${book.categoryText}/${book.fileName}`);
          removeLocalForage (`${book.fileName}`, resolve, reject);
          resolve (book)
        })
      },
      hidePopup () {
        this.popupMenu.hide ()
      },
      onComplete () {
        this.hidePopup ();
        this.setIsEditMode (false);
        saveBookShelf (this.shelfList);
        this.setShelfSelected ([]);
        this.shelfList.forEach (item => {
          item.isSelected = false;
        })
      },
      setPrivate () {
        let isPrivate;
        if (this.isPrivate) {
          isPrivate = false;
        } else {
          isPrivate = true;
        }
        this.shelfSelected.forEach (book => {
          book.private = isPrivate;
        });
        this.onComplete ();
        if (isPrivate) {
          this.simpToast (this.$t ('shelf.setPrivateSuccess'));
        } else {
          this.simpToast (this.$t ('shelf.closePrivateSuccess'))
        }
      },
      async setDownload () {
        if (this.isDownload) {
          this.removeSelectedBook ();
        } else {
          await this.downloadSelectedBook ();
          saveBookShelf (this.shelfList);
          this.simpToast (this.$t ('shelf.setDownloadSuccess'))
        }
        this.onComplete ();
      },
      setRemoveSelect () {
        this.shelfSelected.forEach (selected => {
          this.setShelfList (this.shelfList.filter (book => book !== selected));
        });
        this.onComplete ();
      },
      showPrivate () {
        this.popupMenu = this.popup ({
          title: this.isPrivate ? this.$t ('shelf.closePrivateTitle') : this.$t ('shelf.setPrivateTitle'),
          btn: [
            {
              text: this.isPrivate ? this.$t ('shelf.close') : this.$t ('shelf.open'),
              click: () => {
                this.setPrivate ()
              }
            },
            {
              text: this.$t ('shelf.close'),
              click: () => {
                this.toast ({text: '正在取消'}).show ();
                this.hidePopup ()
              }
            },
          ]
        }).show ()
      },
      showDownLoad () {
        this.popupMenu = this.popup ({
          title: this.isDownload ? this.$t ('shelf.removeDownloadTitle') : this.$t ('shelf.setDownloadTitle'),
          btn: [
            {
              text: this.isDownload ? this.$t ('shelf.delete') : this.$t ('shelf.open'),
              click: () => {
                this.setDownload ()
              }
            },
            {
              text: this.$t ('shelf.close'),
              click: () => {
                this.toast ({text: '正在取消'}).show ();
                this.hidePopup ()
              }
            },
          ]
        }).show ()
      },
      showRemove () {
        let title;
        if (this.shelfSelected.length === 1) {
          title = this.$t ('shelf.removeBookTitle').replace ('$1', `《${this.shelfSelected[ 0 ].title}》`)
        } else {
          title = this.$t ('shelf.removeBookTitle').replace ('$1', this.$t ('shelf.selectedBooks'))
        }
        this.popupMenu = this.popup ({
          title: title,
          btn: [
            {
              text: this.$t ('shelf.removeBook'),
              type: 'danger',
              click: () => {
                this.setRemoveSelect ()
              }
            },
            {
              text: this.$t ('shelf.close'),
              click: () => {
                this.toast ({text: '正在取消'}).show ();
                this.hidePopup ()
              }
            },
          ]
        }).show ()
      },
      onTabClick ( item ) {
        if ( !this.isSelected) {
          return
        }

        switch (item.index) {
          case 1:
            this.showPrivate ();
            break;
          case 2:
            this.showDownLoad ();
            break;
          case 3:
            break;
          case 4:
            this.showRemove ();
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    width: 100%;
    height: px2rem(96);
    background-color: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
    display: flex;

    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;


      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include columnCenter;

        &.is-selected {
          opacity: 1;
        }

        .tab-icon {
          font-size: px2rem(20);
          color: #666666;

        }

        .tav-text {
          margin-top: px2rem(10);
          font-size: px2rem(12);
          color: #666666;

          &.remove-text {
            color: $color-pink
          }
        }

        .icon-shelf {
          color: $color-pink;
        }
      }
    }
  }
</style>
