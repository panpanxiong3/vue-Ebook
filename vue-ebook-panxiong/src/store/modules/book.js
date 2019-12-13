const book = {
  state: {
    fileNames: '', //文章路径
    menuVisitor: false //是否显示标题栏
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileNames = fileName //修改文章路径
    },
    'SET_MENUVISITOR': (state, menuVisitor) => {
      state.menuVisitor = menuVisitor //修改是否显示标题栏
    }
  }
};

export default book;
