import CreateAPI from 'vue-create-api';
import Vue from 'vue'
import Toast from "../components/common/Toast";
import Popup from "../components/common/Popup";

Vue.use (CreateAPI);
Vue.createAPI (Toast, true);
Vue.createAPI (Popup, true);
Vue.mixin ({
  methods: {
    toast ( setting ) {
      return this.$createToast ({
        $props: setting
      })
    },
    popup ( setting ) {
      return this.$createPopup ({
        $props: setting
      })
    },
    simpToast ( text ) {
      this.toast ({
        text: text
      }).show ();
    }
  }
});
