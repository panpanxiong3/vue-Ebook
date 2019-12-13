import { mapGetters, mapActions } from "vuex";
export const eookMixin = {
  computed: {
    ...mapGetters(['fileNames', 'menuVisitor'])//vuex插件
  },
  methods: {
    ...mapActions(['setFileName', 'setMenuVisitor'])
  }
};
